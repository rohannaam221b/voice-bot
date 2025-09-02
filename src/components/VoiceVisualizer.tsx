import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react'

interface VoiceVisualizerProps {
  isListening: boolean
  isSpeaking: boolean
  voiceLevel: number
  confidence: number
  transcript: string
  error: string | null
  className?: string
}

export function VoiceVisualizer({
  isListening,
  isSpeaking,
  voiceLevel,
  confidence,
  transcript,
  error,
  className = ''
}: VoiceVisualizerProps) {
  const [animationBars, setAnimationBars] = useState<number[]>(Array(8).fill(0))

  // Animate voice level bars
  useEffect(() => {
    if (isListening && voiceLevel > 0) {
      const interval = setInterval(() => {
        setAnimationBars(prev => prev.map((_, index) => {
          const baseHeight = Math.random() * 0.3 + 0.1
          const voiceInfluence = (voiceLevel / 100) * (Math.random() * 0.6 + 0.4)
          const decay = Math.max(0, 1 - (index * 0.1))
          return Math.min(1, baseHeight + (voiceInfluence * decay))
        }))
      }, 100)
      return () => clearInterval(interval)
    } else {
      setAnimationBars(Array(8).fill(0))
    }
  }, [isListening, voiceLevel])

  const getStatusColor = () => {
    if (error) return 'text-destructive'
    if (isSpeaking) return 'text-warning'
    if (isListening) return 'text-success'
    return 'text-muted-foreground'
  }

  const getStatusMessage = () => {
    if (error) {
      if (error.includes('denied') || error.includes('not-allowed')) {
        return 'Microphone access needed'
      }
      return error
    }
    if (isSpeaking) return 'Speaking...'
    if (isListening) return 'Listening...'
    return 'Ready'
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Voice Level Visualization */}
      <div className="flex items-center justify-center space-x-1 h-16">
        <div className="flex items-end space-x-1 h-12">
          {animationBars.map((height, index) => (
            <motion.div
              key={index}
              className={`w-1 rounded-full ${
                isListening 
                  ? height > 0.3 
                    ? 'bg-success' 
                    : 'bg-success/50'
                  : 'bg-muted'
              }`}
              animate={{
                height: `${Math.max(4, height * 48)}px`,
                opacity: isListening ? 1 : 0.3
              }}
              transition={{
                duration: 0.1,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      </div>

      {/* Status Indicator */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <motion.div
            animate={{
              scale: isListening || isSpeaking ? 1.1 : 1,
              rotate: isSpeaking ? 360 : 0
            }}
            transition={{
              scale: { duration: 0.2 },
              rotate: { duration: 2, repeat: isSpeaking ? Infinity : 0, ease: 'linear' }
            }}
          >
            {isListening ? (
              <Mic className={`h-5 w-5 ${getStatusColor()}`} />
            ) : isSpeaking ? (
              <Volume2 className={`h-5 w-5 ${getStatusColor()}`} />
            ) : (
              <MicOff className={`h-5 w-5 ${getStatusColor()}`} />
            )}
          </motion.div>
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusMessage()}
          </span>
        </div>

        {/* Confidence Indicator */}
        {confidence > 0 && (
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Confidence</div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <motion.div
                className="h-1.5 rounded-full bg-success"
                initial={{ width: 0 }}
                animate={{ width: `${confidence * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.round(confidence * 100)}%
            </div>
          </div>
        )}
      </div>

      {/* Live Transcript */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-accent rounded-lg border"
          >
            <div className="text-xs font-medium text-muted-foreground mb-1">
              {isListening ? 'Live Transcript' : 'Last Command'}
            </div>
            <div className="text-sm">
              {transcript}
              {isListening && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-1 text-primary"
                >
                  |
                </motion.span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      <AnimatePresence>
        {error && !error.includes('denied') && !error.includes('not-allowed') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
          >
            <div className="text-sm text-destructive font-medium">
              Voice Recognition Error
            </div>
            <div className="text-xs text-destructive/80 mt-1">
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Tips */}
      {!isListening && !transcript && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-2 text-xs text-muted-foreground"
        >
          <div>Try saying:</div>
          <div className="space-y-1">
            <div>"Pay my electricity bill"</div>
            <div>"Show my upcoming payments"</div>
            <div>"Set up a SIP of ₹5000"</div>
          </div>
        </motion.div>
      )}
    </div>
  )
}