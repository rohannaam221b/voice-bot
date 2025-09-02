import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Alert, AlertDescription } from '../ui/alert'
import { Separator } from '../ui/separator'
import { useVoiceRecognition } from '../hooks/useVoiceRecognition'
import { useVoiceCommands, PaymentCommand, VoiceResponse } from '../hooks/useVoiceCommands'
import { VoiceVisualizer } from '../VoiceVisualizer'
import { VoicePermissionPrompt } from '../VoicePermissionPrompt'
import { VoiceTestingSuite } from '../VoiceTestingSuite'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  CreditCard, 
  Zap, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Bell,
  Shield,
  User,
  Users,
  Banknote,
  TrendingUp,
  AlertTriangle,
  Phone,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Home,
  Settings,
  Brain,
  MessageSquare,
  Sparkles,
  TestTube
} from 'lucide-react'

export function SmartPaymentAssistant() {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [currentCommand, setCurrentCommand] = useState<PaymentCommand | null>(null)
  const [currentResponse, setCurrentResponse] = useState<VoiceResponse | null>(null)
  const [conversationHistory, setConversationHistory] = useState<Array<{
    type: 'user' | 'assistant'
    message: string
    timestamp: Date
    command?: PaymentCommand
  }>>([])

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
    microphonePermission,
    requestMicrophonePermission,
    hasPermissionError
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

  // Sample data for payment reminders
  const upcomingPayments = [
    {
      id: 1,
      type: 'Utility Bill',
      provider: 'Maharashtra State Electricity Board',
      amount: 1250,
      dueDate: '2025-01-02',
      status: 'due-tomorrow',
      accountFrom: 'Savings Account ****4567',
      category: 'electricity'
    },
    {
      id: 2,
      type: 'EMI',
      provider: 'HDFC Home Loan',
      amount: 8400,
      dueDate: '2025-01-05',
      status: 'due-soon',
      accountFrom: 'Savings Account ****4567',
      category: 'loan'
    },
    {
      id: 3,
      type: 'SIP',
      provider: 'Tata Equity Fund',
      amount: 5000,
      dueDate: '2025-01-05',
      status: 'scheduled',
      accountFrom: 'Savings Account ****4567',
      category: 'investment'
    },
    {
      id: 4,
      type: 'Credit Card',
      provider: 'ICICI Bank Credit Card',
      amount: 12450,
      dueDate: '2025-01-08',
      status: 'upcoming',
      accountFrom: 'Savings Account ****4567',
      category: 'credit-card'
    }
  ]

  const userPersonas = [
    {
      id: 'rohit',
      name: 'Rohit (25)',
      profile: 'Tech-savvy Professional',
      preferences: ['Auto-reminders for credit cards', 'UPI payments', 'Quick voice commands'],
      avatar: '👨‍💻',
      language: 'English',
      scenario: 'Wants to set up auto-pay for recurring bills'
    },
    {
      id: 'meena',
      name: 'Meena (40)',
      profile: 'Homemaker',
      preferences: ['Simple voice prompts', 'Utility bill payments', 'Regional language support'],
      avatar: '👩‍🏠',
      language: 'Hindi/Regional',
      scenario: 'Needs help paying electricity bill in Hindi'
    },
    {
      id: 'arun',
      name: 'Arun (60)',
      profile: 'Retired Banker',
      preferences: ['Clear confirmations', 'Transaction success assurance', 'Detailed voice feedback'],
      avatar: '👨‍💼',
      language: 'English',
      scenario: 'Wants step-by-step confirmation for EMI payment'
    }
  ]

  const paymentFlows = [
    {
      id: 'bill-reminder',
      title: 'Bill Reminder & Payment',
      description: 'Proactive reminder with instant payment option',
      steps: [
        {
          speaker: 'Assistant',
          message: 'Your electricity bill of ₹1,250 is due tomorrow. Do you want to pay now?',
          options: ['Yes, pay now', 'Remind me later', 'Set auto-pay']
        },
        {
          speaker: 'User',
          message: 'Yes, pay now.',
          action: 'voice-input'
        },
        {
          speaker: 'Assistant',
          message: 'Payment will be made from your linked savings account ****4567. Please confirm by saying "Confirm Payment".',
          showDetails: true
        },
        {
          speaker: 'User',
          message: 'Confirm Payment',
          action: 'voice-confirmation'
        },
        {
          speaker: 'System',
          message: 'Processing payment... OTP sent to your registered mobile number.',
          action: 'processing'
        },
        {
          speaker: 'Assistant',
          message: 'Electricity bill paid successfully! ✅ Reference ID: TXN12345',
          action: 'success'
        }
      ]
    },
    {
      id: 'emi-reminder',
      title: 'EMI Auto-Pay Setup',
      description: 'Schedule recurring EMI payments',
      steps: [
        {
          speaker: 'Assistant',
          message: 'Your EMI of ₹8,400 for Home Loan is due in 3 days. Do you want me to auto-pay on due date?',
          options: ['Yes, schedule it', 'Pay now instead', 'Cancel']
        },
        {
          speaker: 'User',
          message: 'Yes, schedule it.',
          action: 'voice-input'
        },
        {
          speaker: 'Assistant',
          message: 'Auto-pay scheduled for ₹8,400 on January 5th from your Savings Account. You will receive a confirmation 1 day before.',
          action: 'confirmation'
        },
        {
          speaker: 'System',
          message: 'Scheduled task added to "Upcoming Payments" dashboard.',
          action: 'success'
        }
      ]
    },
    {
      id: 'sip-setup',
      title: 'SIP Investment Setup',
      description: 'Voice-activated investment planning',
      steps: [
        {
          speaker: 'User',
          message: 'Set a SIP of ₹5,000 in Tata Equity Fund on 5th every month.',
          action: 'voice-input'
        },
        {
          speaker: 'Assistant',
          message: 'Sure! SIP of ₹5,000 will be deducted on 5th of every month from your Savings Account. Confirm?',
          showDetails: true
        },
        {
          speaker: 'User',
          message: 'Confirm',
          action: 'voice-confirmation'
        },
        {
          speaker: 'System',
          message: 'SIP created successfully! First deduction: January 5th, 2025',
          action: 'success'
        }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'due-tomorrow': return 'bg-destructive text-destructive-foreground'
      case 'due-soon': return 'bg-warning text-warning-foreground'
      case 'scheduled': return 'bg-success text-success-foreground'
      case 'upcoming': return 'bg-secondary text-secondary-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'electricity': return Zap
      case 'loan': return Home
      case 'investment': return TrendingUp
      case 'credit-card': return CreditCard
      default: return Banknote
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    })
  }

  const getDaysUntilDue = (dateString: string) => {
    const today = new Date()
    const dueDate = new Date(dateString)
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays <= 0) return 'Due today'
    if (diffDays === 1) return 'Due tomorrow'
    return `Due in ${diffDays} days`
  }

  const playFlow = (flowId: string) => {
    setSelectedFlow(flowId)
    setCurrentStep(0)
  }

  const nextStep = () => {
    const flow = paymentFlows.find(f => f.id === selectedFlow)
    if (flow && currentStep < flow.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const resetFlow = () => {
    setCurrentStep(0)
  }

  // Process voice commands when transcript is available
  useEffect(() => {
    if (lastCommand && lastCommand.command.trim() && confidence > 0.7) {
      const command = processCommand(lastCommand.command, lastCommand.confidence)
      if (command) {
        setCurrentCommand(command)
        const response = getResponse(command)
        setCurrentResponse(response)
        
        // Add to conversation history
        setConversationHistory(prev => [
          ...prev,
          {
            type: 'user',
            message: lastCommand.command,
            timestamp: lastCommand.timestamp,
            command
          },
          {
            type: 'assistant',
            message: response.text,
            timestamp: new Date()
          }
        ])

        // Speak the response
        speak(response.text, { rate: 0.9, pitch: 1.1 })
        
        // Reset transcript after processing
        setTimeout(() => {
          resetTranscript()
        }, 1000)
      }
    }
  }, [lastCommand, confidence, processCommand, getResponse, speak, resetTranscript])

  // Handle voice control actions
  const handleVoiceToggle = async () => {
    if (isListening) {
      stopListening()
    } else {
      if (isSpeaking) {
        window.speechSynthesis.cancel()
      }
      
      // Ensure this is called from a user interaction
      try {
        await startListening()
      } catch (err) {
        console.error('Failed to start listening:', err)
        // Error is already handled in the hook
      }
    }
  }

  const handleSpeakToggle = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
    } else if (currentResponse) {
      speak(currentResponse.text)
    }
  }

  // Execute payment action based on voice response
  const executeVoiceAction = (response: VoiceResponse) => {
    switch (response.action) {
      case 'show_confirmation':
        // Show payment confirmation modal
        break
      case 'process_payment':
        // Process the actual payment
        break
      case 'schedule_task':
        // Add to scheduled payments
        break
      case 'show_dashboard':
        // Navigate to relevant dashboard section
        break
      case 'show_help':
        // Show help information
        break
    }
  }

  return (
    <Tabs defaultValue="live-demo" className="space-y-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="live-demo">Live Demo</TabsTrigger>
        <TabsTrigger value="voice-testing">Voice Testing Suite</TabsTrigger>
        <TabsTrigger value="payment-flows">Payment Flows</TabsTrigger>
        <TabsTrigger value="personas">User Personas</TabsTrigger>
        <TabsTrigger value="analytics">Voice Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="live-demo" className="space-y-8">
        {/* Voice Interface Header */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <span>Smart Payment Assistant - Live Demo</span>
                  {!isSupported && (
                    <Badge variant="destructive" className="text-xs">
                      Voice not supported
                    </Badge>
                  )}
                  {microphonePermission === 'denied' && (
                    <Badge variant="warning" className="text-xs">
                      Microphone blocked
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Real-time voice recognition with intelligent payment processing
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={isListening ? "destructive" : "default"}
                  size="lg"
                  onClick={handleVoiceToggle}
                  disabled={!isSupported}
                  className="flex items-center space-x-2"
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  <span>
                    {isListening 
                      ? 'Stop Listening' 
                      : microphonePermission === 'denied' 
                        ? 'Request Permission' 
                        : 'Start Listening'
                    }
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSpeakToggle}
                  disabled={!currentResponse}
                >
                  {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {(microphonePermission !== 'granted' || hasPermissionError) ? (
              <VoicePermissionPrompt
                microphonePermission={microphonePermission}
                hasPermissionError={hasPermissionError}
                onRequestPermission={requestMicrophonePermission}
                isSupported={isSupported}
              />
            ) : (
              <VoiceVisualizer
                isListening={isListening}
                isSpeaking={isSpeaking}
                voiceLevel={voiceLevel}
                confidence={confidence}
                transcript={transcript}
                error={error}
              />
            )}
          </CardContent>
        </Card>

        {/* Quick Voice Commands */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mic className="h-5 w-5" />
              <span>Try These Voice Commands</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "Pay my electricity bill",
                "Check my balance", 
                "Show upcoming payments",
                "Set up SIP of ₹5000",
                "Schedule water bill payment",
                "Pay ₹2500 for mobile bill",
                "Confirm payment",
                "Help me with payments"
              ].map((command, index) => (
                <button
                  key={index}
                  className="p-3 text-sm text-left border rounded-lg hover:bg-accent transition-colors"
                  onClick={() => {
                    const cmd = processCommand(command, 1.0)
                    if (cmd) {
                      setCurrentCommand(cmd)
                      const response = getResponse(cmd)
                      setCurrentResponse(response)
                      
                      setConversationHistory(prev => [
                        ...prev,
                        {
                          type: 'user',
                          message: command,
                          timestamp: new Date(),
                          command: cmd
                        },
                        {
                          type: 'assistant',
                          message: response.text,
                          timestamp: new Date()
                        }
                      ])
                      
                      speak(response.text)
                    }
                  }}
                >
                  "{command}"
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Voice Interaction */}
        <AnimatePresence>
          {(currentCommand || currentResponse) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span>Active Voice Interaction</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentCommand && (
                    <div className="p-3 bg-accent rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-muted-foreground">Command Understood</div>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(currentCommand.confidence * 100)}% confidence
                        </Badge>
                      </div>
                      <div className="text-sm">{currentCommand.originalText}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {currentCommand.type.replace('_', ' ')}
                        </Badge>
                        {currentCommand.entity && (
                          <Badge variant="outline" className="text-xs">
                            {currentCommand.entity}
                          </Badge>
                        )}
                        {currentCommand.amount && (
                          <Badge variant="outline" className="text-xs">
                            ₹{currentCommand.amount.toLocaleString()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {currentResponse && (
                    <div className="p-3 bg-card border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <div className="text-sm font-medium">Assistant Response</div>
                      </div>
                      <div className="text-sm">{currentResponse.text}</div>
                      {currentResponse.action && (
                        <div className="mt-2">
                          <Button 
                            size="sm" 
                            onClick={() => executeVoiceAction(currentResponse)}
                            className="mr-2"
                          >
                            Execute Action
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setCurrentCommand(null)
                              setCurrentResponse(null)
                            }}
                          >
                            Dismiss
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversation History */}
        {conversationHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Conversation History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {conversationHistory.slice(-6).map((entry, index) => (
                  <div key={index} className={`p-3 rounded-lg ${
                    entry.type === 'user' 
                      ? 'bg-secondary/10 ml-8' 
                      : 'bg-accent mr-8'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs font-medium text-muted-foreground">
                        {entry.type === 'user' ? 'You' : 'Assistant'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {entry.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="text-sm">{entry.message}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="voice-testing">
        <VoiceTestingSuite />
      </TabsContent>

      <TabsContent value="payment-flows" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Payment Flow Demonstrations</CardTitle>
            <CardDescription>
              Step-by-step voice payment scenarios for different use cases
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {paymentFlows.map((flow) => (
            <Card key={flow.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{flow.title}</CardTitle>
                    <CardDescription>{flow.description}</CardDescription>
                  </div>
                  <Button 
                    onClick={() => playFlow(flow.id)}
                    className="flex items-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Play Flow</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {flow.steps.map((step, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border ${
                        selectedFlow === flow.id && index === currentStep 
                          ? 'border-primary bg-primary/5' 
                          : 'border-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          Step {index + 1}: {step.speaker}
                        </Badge>
                        {selectedFlow === flow.id && index === currentStep && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm">{step.message}</div>
                      {step.options && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {step.options.map((option, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {option}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {selectedFlow === flow.id && (
                  <div className="mt-4 flex items-center space-x-2">
                    <Button size="sm" onClick={nextStep}>
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Next Step
                    </Button>
                    <Button size="sm" variant="outline" onClick={resetFlow}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="personas" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>User Personas & Voice Scenarios</CardTitle>
            <CardDescription>
              Different user types and their voice interaction preferences
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {userPersonas.map((persona) => (
            <Card key={persona.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{persona.avatar}</div>
                  <div>
                    <CardTitle className="text-lg">{persona.name}</CardTitle>
                    <CardDescription>{persona.profile}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Language Preference</h4>
                  <Badge variant="outline">{persona.language}</Badge>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Voice Preferences</h4>
                  <div className="space-y-1">
                    {persona.preferences.map((pref, index) => (
                      <div key={index} className="text-sm flex items-center space-x-2">
                        <CheckCircle2 className="h-3 w-3 text-success" />
                        <span>{pref}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Use Case Scenario</h4>
                  <p className="text-sm text-muted-foreground">{persona.scenario}</p>
                </div>
                
                <Button className="w-full">
                  Test {persona.name}'s Scenario
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="analytics" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">94%</div>
                <div className="text-sm text-muted-foreground">Voice Recognition Accuracy</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-success" />
              <div>
                <div className="text-2xl font-bold">1.2s</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-warning" />
              <div>
                <div className="text-2xl font-bold">87%</div>
                <div className="text-sm text-muted-foreground">Successful Transactions</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-secondary" />
              <div>
                <div className="text-2xl font-bold">2,450</div>
                <div className="text-sm text-muted-foreground">Monthly Voice Commands</div>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Voice Command Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Bill Payments</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Balance Inquiries</span>
                  <span>28%</span>
                </div>
                <Progress value={28} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Investment Setup</span>
                  <span>15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Payment Scheduling</span>
                  <span>12%</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}