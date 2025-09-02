import { useState, useEffect, useRef, useCallback } from 'react'

interface VoiceCommand {
  command: string
  confidence: number
  timestamp: Date
}

interface VoiceRecognitionConfig {
  language?: string
  continuous?: boolean
  interimResults?: boolean
  maxAlternatives?: number
}

interface UseVoiceRecognitionReturn {
  isListening: boolean
  isSupported: boolean
  transcript: string
  confidence: number
  error: string | null
  startListening: () => void
  stopListening: () => void
  speak: (text: string, options?: SpeechSynthesisUtteranceOptions) => Promise<void>
  isSpeaking: boolean
  lastCommand: VoiceCommand | null
  voiceLevel: number
  resetTranscript: () => void
  microphonePermission: 'granted' | 'denied' | 'prompt' | 'unknown'
  requestMicrophonePermission: () => Promise<void>
  hasPermissionError: boolean
}

interface SpeechSynthesisUtteranceOptions {
  rate?: number
  pitch?: number
  volume?: number
  voice?: SpeechSynthesisVoice
}

export function useVoiceRecognition(config: VoiceRecognitionConfig = {}): UseVoiceRecognitionReturn {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [lastCommand, setLastCommand] = useState<VoiceCommand | null>(null)
  const [voiceLevel, setVoiceLevel] = useState(0)
  const [microphonePermission, setMicrophonePermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown')
  const [hasPermissionError, setHasPermissionError] = useState(false)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number>()

  const {
    language = 'en-US',
    continuous = true,
    interimResults = true,
    maxAlternatives = 1
  } = config

  // Check microphone permission status
  useEffect(() => {
    const checkPermission = async () => {
      if (typeof navigator !== 'undefined' && navigator.permissions) {
        try {
          const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName })
          setMicrophonePermission(permission.state)
          
          permission.addEventListener('change', () => {
            setMicrophonePermission(permission.state)
            if (permission.state === 'denied') {
              setHasPermissionError(true)
              setError('Microphone access is required for voice commands. Please enable microphone access in your browser settings.')
            } else if (permission.state === 'granted') {
              setHasPermissionError(false)
              setError(null)
            }
          })
        } catch (err) {
          // Fallback for browsers that don't support permissions API
          setMicrophonePermission('unknown')
        }
      }
    }
    
    checkPermission()
  }, [])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSupported(true)
        const recognition = new SpeechRecognition()
        recognition.lang = language
        recognition.continuous = continuous
        recognition.interimResults = interimResults
        recognition.maxAlternatives = maxAlternatives

        recognition.onstart = () => {
          setIsListening(true)
          setError(null)
          setHasPermissionError(false)
        }

        recognition.onend = () => {
          setIsListening(false)
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
          }
        }

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
          
          switch (event.error) {
            case 'not-allowed':
              setHasPermissionError(true)
              setError('Microphone access denied. Please click the microphone icon in your browser address bar and allow access.')
              setMicrophonePermission('denied')
              break
            case 'no-speech':
              setError('No speech detected. Please try speaking louder or check your microphone.')
              break
            case 'audio-capture':
              setError('Microphone not found. Please check your microphone connection.')
              break
            case 'network':
              setError('Network error. Speech recognition requires an internet connection.')
              break
            case 'service-not-allowed':
              setError('Speech recognition service not allowed. Please try again.')
              break
            default:
              setError(`Speech recognition error: ${event.error}`)
          }
        }

        recognition.onresult = (event) => {
          let finalTranscript = ''
          let interimTranscript = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i]
            const transcriptText = result[0].transcript

            if (result.isFinal) {
              finalTranscript += transcriptText
              setConfidence(result[0].confidence)
              
              // Create voice command
              const command: VoiceCommand = {
                command: transcriptText.trim(),
                confidence: result[0].confidence,
                timestamp: new Date()
              }
              setLastCommand(command)
            } else {
              interimTranscript += transcriptText
            }
          }

          setTranscript(finalTranscript || interimTranscript)
        }

        recognitionRef.current = recognition
      } else {
        setIsSupported(false)
        setError('Speech recognition not supported in this browser. Please use Chrome, Safari, or Edge.')
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [language, continuous, interimResults, maxAlternatives])

  // Request microphone permission
  const requestMicrophonePermission = useCallback(async () => {
    // Don't attempt if we know it's already denied and this isn't a user gesture
    if (microphonePermission === 'denied') {
      setError('Microphone access was previously denied. Please enable it in your browser settings and refresh the page.')
      setHasPermissionError(true)
      return Promise.reject(new Error('Permission previously denied'))
    }

    try {
      setError(null)
      setHasPermissionError(false)
      
      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia not supported')
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })
      
      // Stop the stream immediately, we just needed to get permission
      stream.getTracks().forEach(track => track.stop())
      
      setMicrophonePermission('granted')
      setError(null)
      setHasPermissionError(false)
      return Promise.resolve()
    } catch (err: any) {
      console.error('Error requesting microphone permission:', err)
      setHasPermissionError(true)
      setMicrophonePermission('denied')
      
      let errorMessage = ''
      switch (err.name) {
        case 'NotAllowedError':
          errorMessage = 'Microphone access denied. Please enable microphone access in your browser settings.'
          break
        case 'NotFoundError':
          errorMessage = 'No microphone found. Please connect a microphone and try again.'
          break
        case 'NotReadableError':
          errorMessage = 'Microphone is already in use by another application.'
          break
        case 'SecurityError':
          errorMessage = 'Microphone access blocked due to security restrictions.'
          break
        case 'AbortError':
          errorMessage = 'Microphone access request was cancelled.'
          break
        default:
          errorMessage = `Error accessing microphone: ${err.message || 'Unknown error'}`
      }
      
      setError(errorMessage)
      return Promise.reject(err)
    }
  }, [microphonePermission])

  // Audio level monitoring
  const startAudioMonitoring = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaStreamSource(stream)
      
      analyser.fftSize = 256
      source.connect(analyser)
      
      audioContextRef.current = audioContext
      analyserRef.current = analyser

      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      
      const updateVoiceLevel = () => {
        if (analyserRef.current && isListening) {
          analyserRef.current.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length
          setVoiceLevel(Math.min(100, (average / 255) * 100))
          animationFrameRef.current = requestAnimationFrame(updateVoiceLevel)
        }
      }
      
      updateVoiceLevel()
      setMicrophonePermission('granted')
    } catch (err: any) {
      console.error('Error accessing microphone:', err)
      setHasPermissionError(true)
      setMicrophonePermission('denied')
      
      if (err.name === 'NotAllowedError') {
        setError('Microphone access denied. Please enable microphone access in your browser settings.')
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found. Please connect a microphone.')
      } else {
        setError('Error accessing microphone. Please check your device settings.')
      }
    }
  }, [isListening])

  const startListening = useCallback(async () => {
    if (!isSupported) {
      setError('Speech recognition not supported in this browser. Please use Chrome, Safari, or Edge.')
      return
    }

    if (isListening) {
      return
    }

    // Request permission if not granted (this must be called from user interaction)
    if (microphonePermission !== 'granted') {
      try {
        await requestMicrophonePermission()
      } catch (err) {
        // Error is already set in requestMicrophonePermission
        return
      }
    }

    if (!recognitionRef.current) {
      setError('Speech recognition not initialized')
      return
    }

    setError(null)
    setTranscript('')
    setConfidence(0)
    setHasPermissionError(false)
    
    try {
      // Check if recognition is already running
      if (isListening) {
        recognitionRef.current.stop()
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      recognitionRef.current.start()
      
      // Start audio monitoring after recognition starts
      setTimeout(() => {
        startAudioMonitoring()
      }, 100)
      
    } catch (err: any) {
      console.error('Error starting speech recognition:', err)
      
      if (err.name === 'InvalidStateError') {
        // Recognition is already running, stop and restart
        try {
          recognitionRef.current.stop()
          setTimeout(() => {
            try {
              recognitionRef.current?.start()
              setTimeout(() => {
                startAudioMonitoring()
              }, 100)
            } catch (retryErr) {
              setError('Failed to start speech recognition. Please refresh the page and try again.')
            }
          }, 200)
        } catch (stopErr) {
          setError('Failed to reset speech recognition. Please refresh the page.')
        }
      } else {
        setError(`Failed to start speech recognition: ${err.message || 'Unknown error'}`)
      }
    }
  }, [isSupported, isListening, microphonePermission, requestMicrophonePermission, startAudioMonitoring])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      setVoiceLevel(0)
    }
  }, [isListening])

  const speak = useCallback(async (
    text: string, 
    options: SpeechSynthesisUtteranceOptions = {}
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('Speech synthesis not supported'))
        return
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      
      // Apply options
      utterance.rate = options.rate || 1
      utterance.pitch = options.pitch || 1
      utterance.volume = options.volume || 1
      if (options.voice) {
        utterance.voice = options.voice
      }

      utterance.onstart = () => {
        setIsSpeaking(true)
      }

      utterance.onend = () => {
        setIsSpeaking(false)
        resolve()
      }

      utterance.onerror = (event) => {
        setIsSpeaking(false)
        reject(new Error(`Speech synthesis error: ${event.error}`))
      }

      window.speechSynthesis.speak(utterance)
    })
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript('')
    setConfidence(0)
    setLastCommand(null)
  }, [])

  return {
    isListening,
    isSupported,
    transcript,
    confidence,
    error,
    startListening,
    stopListening,
    speak,
    isSpeaking,
    lastCommand,
    voiceLevel,
    resetTranscript,
    microphonePermission,
    requestMicrophonePermission,
    hasPermissionError
  }
}

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}