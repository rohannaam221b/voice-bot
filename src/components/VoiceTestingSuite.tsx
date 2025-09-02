import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Alert, AlertDescription } from './ui/alert'
import { Separator } from './ui/separator'
import { useVoiceRecognition } from './hooks/useVoiceRecognition'
import { useVoiceCommands, PaymentCommand, VoiceResponse } from './hooks/useVoiceCommands'
import { VoiceVisualizer } from './VoiceVisualizer'
import { motion, AnimatePresence } from 'motion/react'
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Target,
  Zap,
  CreditCard,
  TrendingUp,
  DollarSign,
  User,
  MessageSquare,
  TestTube,
  Sparkles,
  Brain,
  Shield,
  CheckCheck,
  X
} from 'lucide-react'

interface TestScenario {
  id: string
  name: string
  description: string
  voiceCommand: string
  expectedResponse: string
  category: 'payment' | 'inquiry' | 'setup' | 'confirmation'
  difficulty: 'easy' | 'medium' | 'hard'
  steps: Array<{
    step: number
    userSays: string
    expectedResponse: string
    action?: string
    requiresConfirmation?: boolean
  }>
}

interface TestResult {
  scenarioId: string
  success: boolean
  timestamp: Date
  recognitionAccuracy: number
  responseTime: number
  errors?: string[]
}

export function VoiceTestingSuite() {
  const [activeScenario, setActiveScenario] = useState<TestScenario | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunningTest, setIsRunningTest] = useState(false)
  const [testStartTime, setTestStartTime] = useState<Date | null>(null)
  const [commandHistory, setCommandHistory] = useState<Array<{
    command: string
    response: string
    accuracy: number
    timestamp: Date
  }>>([])

  const startTimeRef = useRef<Date>()

  // Voice recognition hook
  const {
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
    microphonePermission
  } = useVoiceRecognition({
    language: 'en-US',
    continuous: false,
    interimResults: true
  })

  // Voice commands processor
  const {
    processCommand,
    getResponse,
    isProcessing,
    lastProcessedCommand
  } = useVoiceCommands()

  const testScenarios: TestScenario[] = [
    {
      id: 'bill-payment-basic',
      name: 'Basic Bill Payment',
      description: 'Test simple bill payment with voice commands',
      voiceCommand: 'Pay my electricity bill',
      expectedResponse: 'I found your electricity bill',
      category: 'payment',
      difficulty: 'easy',
      steps: [
        {
          step: 1,
          userSays: 'Pay my electricity bill',
          expectedResponse: 'I found your electricity bill of ₹1,250. Do you want to pay it now?',
          requiresConfirmation: true
        },
        {
          step: 2,
          userSays: 'Yes, pay now',
          expectedResponse: 'Payment confirmed. Processing your transaction now.',
          action: 'process_payment'
        }
      ]
    },
    {
      id: 'amount-specific-payment',
      name: 'Amount-Specific Payment',
      description: 'Test payment with specific amount mentioned',
      voiceCommand: 'Pay ₹2500 for my mobile bill',
      expectedResponse: 'I found your mobile bill of ₹2500',
      category: 'payment',
      difficulty: 'medium',
      steps: [
        {
          step: 1,
          userSays: 'Pay ₹2500 for my mobile bill',
          expectedResponse: 'I found your mobile bill of ₹2,500. Do you want to pay it now?',
          requiresConfirmation: true
        },
        {
          step: 2,
          userSays: 'Confirm payment',
          expectedResponse: 'Payment confirmed. Processing your transaction now.',
          action: 'process_payment'
        }
      ]
    },
    {
      id: 'sip-setup-complex',
      name: 'SIP Investment Setup',
      description: 'Test complex SIP setup with amount and date',
      voiceCommand: 'Set up a SIP of ₹5000 in equity funds',
      expectedResponse: 'I\'ll help you set up a SIP of ₹5,000',
      category: 'setup',
      difficulty: 'medium',
      steps: [
        {
          step: 1,
          userSays: 'Set up a SIP of ₹5000 in equity funds',
          expectedResponse: 'I\'ll help you set up a SIP of ₹5,000. Which mutual fund would you like to invest in?',
          requiresConfirmation: true
        },
        {
          step: 2,
          userSays: 'Tata equity fund',
          expectedResponse: 'SIP of ₹5,000 in Tata Equity Fund has been set up successfully.',
          action: 'schedule_task'
        }
      ]
    },
    {
      id: 'balance-inquiry',
      name: 'Balance Inquiry',
      description: 'Test account balance checking',
      voiceCommand: 'Check my balance',
      expectedResponse: 'Your current account balance is ₹45,670',
      category: 'inquiry',
      difficulty: 'easy',
      steps: [
        {
          step: 1,
          userSays: 'Check my balance',
          expectedResponse: 'Your current account balance is ₹45,670. Would you like to see a breakdown by account?'
        }
      ]
    },
    {
      id: 'payments-overview',
      name: 'Payments Overview',
      description: 'Test showing upcoming payments',
      voiceCommand: 'Show my upcoming payments',
      expectedResponse: 'You have 4 upcoming payments this month',
      category: 'inquiry',
      difficulty: 'easy',
      steps: [
        {
          step: 1,
          userSays: 'Show my upcoming payments',
          expectedResponse: 'You have 4 upcoming payments this month totaling ₹27,100. Your electricity bill is due tomorrow.'
        }
      ]
    },
    {
      id: 'schedule-payment',
      name: 'Schedule Future Payment',
      description: 'Test scheduling payment for future date',
      voiceCommand: 'Schedule my water bill payment for 5th of every month',
      expectedResponse: 'I\'ll schedule your water payment',
      category: 'setup',
      difficulty: 'hard',
      steps: [
        {
          step: 1,
          userSays: 'Schedule my water bill payment for 5th of every month',
          expectedResponse: 'I\'ll schedule your water payment for 5th of every month. Should I proceed?',
          requiresConfirmation: true
        },
        {
          step: 2,
          userSays: 'Yes, proceed',
          expectedResponse: 'Water bill payment has been scheduled for 5th of every month.',
          action: 'schedule_task'
        }
      ]
    }
  ]

  const getCategoryIcon = (category: TestScenario['category']) => {
    switch (category) {
      case 'payment': return CreditCard
      case 'inquiry': return MessageSquare
      case 'setup': return TrendingUp
      case 'confirmation': return Shield
      default: return DollarSign
    }
  }

  const getDifficultyColor = (difficulty: TestScenario['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-success text-success-foreground'
      case 'medium': return 'bg-warning text-warning-foreground'
      case 'hard': return 'bg-destructive text-destructive-foreground'
      default: return 'bg-secondary text-secondary-foreground'
    }
  }

  const startTest = async (scenario: TestScenario) => {
    setActiveScenario(scenario)
    setCurrentStep(0)
    setIsRunningTest(true)
    setTestStartTime(new Date())
    startTimeRef.current = new Date()
    resetTranscript()

    // Speak initial instruction
    speak(`Let's test the ${scenario.name} scenario. ${scenario.description}. When ready, say: ${scenario.steps[0].userSays}`)
  }

  const nextStep = () => {
    if (activeScenario && currentStep < activeScenario.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      resetTranscript()
    } else {
      completeTest()
    }
  }

  const completeTest = () => {
    if (activeScenario && testStartTime) {
      const endTime = new Date()
      const responseTime = endTime.getTime() - testStartTime.getTime()
      
      const result: TestResult = {
        scenarioId: activeScenario.id,
        success: true, // You could implement more sophisticated success detection
        timestamp: endTime,
        recognitionAccuracy: confidence,
        responseTime,
        errors: error ? [error.message] : undefined
      }

      setTestResults(prev => [...prev, result])
      setIsRunningTest(false)
      setActiveScenario(null)
      setCurrentStep(0)
      setTestStartTime(null)

      speak('Test completed successfully!')
    }
  }

  const handleVoiceToggle = async () => {
    if (isListening) {
      stopListening()
    } else {
      if (isSpeaking) {
        window.speechSynthesis.cancel()
      }
      try {
        await startListening()
      } catch (err) {
        console.error('Failed to start listening:', err)
      }
    }
  }

  // Process voice commands
  useEffect(() => {
    if (lastCommand && lastCommand.command.trim() && confidence > 0.6) {
      const command = processCommand(lastCommand.command, lastCommand.confidence)
      if (command) {
        const response = getResponse(command)
        
        // Add to command history
        setCommandHistory(prev => [...prev, {
          command: lastCommand.command,
          response: response.text,
          accuracy: confidence,
          timestamp: lastCommand.timestamp
        }])

        // Speak response
        speak(response.text, { rate: 0.9, pitch: 1.1 })
        
        // Auto advance to next step if in active test
        if (isRunningTest && activeScenario) {
          setTimeout(() => {
            nextStep()
          }, 2000)
        }

        resetTranscript()
      }
    }
  }, [lastCommand, confidence, processCommand, getResponse, speak, resetTranscript, isRunningTest, activeScenario])

  const getTestSuccessRate = () => {
    if (testResults.length === 0) return 0
    return Math.round((testResults.filter(r => r.success).length / testResults.length) * 100)
  }

  const getAverageAccuracy = () => {
    if (commandHistory.length === 0) return 0
    return Math.round(commandHistory.reduce((sum, cmd) => sum + cmd.accuracy, 0) / commandHistory.length * 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TestTube className="h-6 w-6 text-primary" />
                </div>
                <span>Voice Command Testing Suite</span>
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Comprehensive testing for voice-activated payment flows
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={isListening ? "destructive" : "default"}
                size="lg"
                onClick={handleVoiceToggle}
                disabled={!isSupported}
              >
                {isListening ? <MicOff className="h-5 w-5 mr-2" /> : <Mic className="h-5 w-5 mr-2" />}
                {isListening ? 'Stop Listening' : 'Start Listening'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <VoiceVisualizer
            isListening={isListening}
            isSpeaking={isSpeaking}
            voiceLevel={voiceLevel}
            confidence={confidence}
            transcript={transcript}
            error={error}
          />
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold">{getTestSuccessRate()}%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-success" />
            <div>
              <div className="text-2xl font-bold">{getAverageAccuracy()}%</div>
              <div className="text-sm text-muted-foreground">Avg Accuracy</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <CheckCheck className="h-5 w-5 text-warning" />
            <div>
              <div className="text-2xl font-bold">{testResults.length}</div>
              <div className="text-sm text-muted-foreground">Tests Run</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-secondary" />
            <div>
              <div className="text-2xl font-bold">{commandHistory.length}</div>
              <div className="text-sm text-muted-foreground">Commands</div>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="scenarios" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scenarios">Test Scenarios</TabsTrigger>
          <TabsTrigger value="active-test">Active Test</TabsTrigger>
          <TabsTrigger value="history">Command History</TabsTrigger>
          <TabsTrigger value="results">Test Results</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testScenarios.map((scenario) => {
              const CategoryIcon = getCategoryIcon(scenario.category)
              return (
                <Card key={scenario.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-accent rounded-lg">
                          <CategoryIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{scenario.name}</CardTitle>
                          <Badge className={getDifficultyColor(scenario.difficulty)}>
                            {scenario.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{scenario.description}</p>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Test Command:</div>
                      <div className="text-sm bg-accent p-2 rounded italic">
                        "{scenario.voiceCommand}"
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Steps: {scenario.steps.length}</div>
                      <div className="flex flex-wrap gap-1">
                        {scenario.steps.map((step, index) => (
                          <div key={index} className="w-6 h-6 rounded-full bg-secondary/20 text-xs flex items-center justify-center">
                            {step.step}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={() => startTest(scenario)} 
                      className="w-full"
                      disabled={isRunningTest}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Test
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="active-test" className="space-y-4">
          {isRunningTest && activeScenario ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TestTube className="h-5 w-5" />
                  <span>Testing: {activeScenario.name}</span>
                  <Badge variant="outline">
                    Step {currentStep + 1} of {activeScenario.steps.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Progress 
                  value={(currentStep / activeScenario.steps.length) * 100} 
                  className="h-2"
                />

                <div className="space-y-4">
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="text-sm font-medium mb-2">Current Step:</div>
                    <div className="text-lg mb-2">
                      Say: "{activeScenario.steps[currentStep].userSays}"
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Expected: {activeScenario.steps[currentStep].expectedResponse}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      onClick={nextStep}
                      disabled={currentStep >= activeScenario.steps.length - 1}
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Next Step
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={completeTest}
                    >
                      Complete Test
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        setIsRunningTest(false)
                        setActiveScenario(null)
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <TestTube className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Test</h3>
                <p className="text-muted-foreground mb-4">
                  Select a scenario from the Test Scenarios tab to begin testing
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Command History</CardTitle>
            </CardHeader>
            <CardContent>
              {commandHistory.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {commandHistory.slice(-10).reverse().map((entry, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {Math.round(entry.accuracy * 100)}% accuracy
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {entry.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">You said:</span> "{entry.command}"
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Response:</span> {entry.response}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No commands recorded yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              {testResults.length > 0 ? (
                <div className="space-y-3">
                  {testResults.map((result, index) => {
                    const scenario = testScenarios.find(s => s.id === result.scenarioId)
                    return (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {result.success ? (
                              <CheckCircle2 className="h-4 w-4 text-success" />
                            ) : (
                              <X className="h-4 w-4 text-destructive" />
                            )}
                            <span className="font-medium">{scenario?.name}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {result.timestamp.toLocaleString()}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Accuracy:</span> {Math.round(result.recognitionAccuracy * 100)}%
                          </div>
                          <div>
                            <span className="text-muted-foreground">Time:</span> {Math.round(result.responseTime / 1000)}s
                          </div>
                        </div>
                        {result.errors && result.errors.length > 0 && (
                          <div className="mt-2">
                            <div className="text-xs text-destructive">
                              Errors: {result.errors.join(', ')}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No test results yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}