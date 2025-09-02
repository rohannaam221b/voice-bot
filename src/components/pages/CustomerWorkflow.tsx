import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { 
  Phone, 
  MessageSquare, 
  Brain, 
  User, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight,
  Clock,
  Users,
  Zap
} from 'lucide-react'

export function CustomerWorkflow() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null)

  const workflowSteps = [
    {
      id: 1,
      title: 'Customer Initiates Call',
      description: 'Customer dials the banking helpline number',
      icon: Phone,
      details: {
        duration: '0-5 seconds',
        systems: ['Twilio Flex', 'Call Routing'],
        actions: [
          'Call received by contact center',
          'Basic caller identification',
          'Queue position assignment if needed'
        ],
        outputs: ['Call ID generated', 'Initial customer data retrieved']
      }
    },
    {
      id: 2,
      title: 'Voice Recognition Activation',
      description: 'System activates speech-to-text processing',
      icon: MessageSquare,
      details: {
        duration: '1-2 seconds',
        systems: ['Google Speech-to-Text', 'Audio Processing'],
        actions: [
          'Audio stream capture initiated',
          'Language detection performed',
          'Real-time transcription begins'
        ],
        outputs: ['Text transcription stream', 'Language identification', 'Audio quality metrics']
      }
    },
    {
      id: 3,
      title: 'Intent Recognition',
      description: 'NLP engine analyzes customer intent and sentiment',
      icon: Brain,
      details: {
        duration: '2-3 seconds',
        systems: ['NLP Engine', 'Intent Classification', 'Sentiment Analysis'],
        actions: [
          'Text analysis for intent classification',
          'Sentiment scoring calculation',
          'Context extraction from conversation'
        ],
        outputs: ['Intent classification', 'Sentiment score', 'Confidence levels', 'Context data']
      }
    },
    {
      id: 4,
      title: 'Customer Data Retrieval',
      description: 'System fetches relevant customer information',
      icon: User,
      details: {
        duration: '1-2 seconds',
        systems: ['Core Banking System', 'CRM Integration', 'Customer Database'],
        actions: [
          'Customer identification verification',
          'Account information retrieval',
          'Transaction history access',
          'Previous interaction history'
        ],
        outputs: ['Customer profile', 'Account details', 'Transaction history', 'Service preferences']
      }
    },
    {
      id: 5,
      title: 'Response Generation',
      description: 'AI generates appropriate response based on analysis',
      icon: MessageSquare,
      details: {
        duration: '2-4 seconds',
        systems: ['Response Engine', 'Knowledge Base', 'Business Rules'],
        actions: [
          'Context-aware response generation',
          'Personalization based on customer data',
          'Compliance check for banking regulations',
          'Multi-language response preparation'
        ],
        outputs: ['Personalized response', 'Action recommendations', 'Escalation flags']
      }
    },
    {
      id: 6,
      title: 'Response Delivery',
      description: 'System delivers response to customer via voice',
      icon: Phone,
      details: {
        duration: '5-30 seconds',
        systems: ['Text-to-Speech', 'Voice Synthesis', 'Audio Delivery'],
        actions: [
          'Text-to-speech conversion',
          'Voice quality optimization',
          'Audio stream delivery to customer',
          'Real-time sentiment monitoring'
        ],
        outputs: ['Voice response', 'Customer reaction monitoring', 'Satisfaction indicators']
      }
    },
    {
      id: 7,
      title: 'Interaction Completion',
      description: 'Call resolution and follow-up actions',
      icon: CheckCircle,
      details: {
        duration: '10-60 seconds',
        systems: ['CRM Update', 'Analytics Engine', 'Feedback System'],
        actions: [
          'Interaction logging and documentation',
          'Customer satisfaction assessment',
          'Follow-up action scheduling if needed',
          'Performance metrics updating'
        ],
        outputs: ['Interaction record', 'Satisfaction score', 'Follow-up tasks', 'Analytics data']
      }
    }
  ]

  const useCaseScenarios = [
    {
      id: 'account-balance',
      title: 'Account Balance Inquiry',
      description: 'Customer calls to check their account balance',
      complexity: 'Simple',
      expectedResolution: 'Automated',
      steps: [
        'Customer: "I want to check my account balance"',
        'System: Intent recognized as "balance_inquiry"',
        'System: Retrieves account information',
        'System: "Your current account balance is ₹45,230"',
        'Customer: "Thank you"',
        'System: Call completed successfully'
      ],
      metrics: {
        averageTime: '45 seconds',
        successRate: '98%',
        customerSatisfaction: '4.6/5'
      }
    },
    {
      id: 'transaction-dispute',
      title: 'Transaction Dispute',
      description: 'Customer reports an unauthorized transaction',
      complexity: 'Complex',
      expectedResolution: 'Agent Escalation',
      steps: [
        'Customer: "I see an unauthorized charge on my account"',
        'System: Intent recognized as "dispute_transaction"',
        'System: Identifies negative sentiment and high priority',
        'System: Retrieves recent transaction history',
        'System: "I understand your concern. Let me connect you with a specialist"',
        'System: Escalates to fraud prevention team'
      ],
      metrics: {
        averageTime: '3.2 minutes',
        successRate: '95%',
        customerSatisfaction: '4.3/5'
      }
    },
    {
      id: 'loan-inquiry',
      title: 'Loan Information Request',
      description: 'Customer inquires about loan products and eligibility',
      complexity: 'Medium',
      expectedResolution: 'Mixed (Info + Callback)',
      steps: [
        'Customer: "I want to know about personal loans"',
        'System: Intent recognized as "loan_inquiry"',
        'System: Retrieves customer eligibility data',
        'System: Provides loan options and basic eligibility',
        'Customer: Shows interest in detailed discussion',
        'System: Schedules callback with loan specialist'
      ],
      metrics: {
        averageTime: '2.1 minutes',
        successRate: '92%',
        customerSatisfaction: '4.4/5'
      }
    }
  ]

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Simple': return 'bg-success text-success-foreground'
      case 'Medium': return 'bg-warning text-warning-foreground'
      case 'Complex': return 'bg-destructive text-destructive-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getResolutionColor = (resolution: string) => {
    switch (resolution) {
      case 'Automated': return 'bg-success text-success-foreground'
      case 'Agent Escalation': return 'bg-destructive text-destructive-foreground'
      case 'Mixed (Info + Callback)': return 'bg-warning text-warning-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-8">
      {/* Workflow Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Interaction Workflow</CardTitle>
          <CardDescription>
            Interactive visualization of the 7-step customer service process flow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <Card 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedStep === step.id 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground">
                          Step {step.id}
                        </div>
                        <h4 className="font-semibold text-sm leading-tight">
                          {step.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Details */}
      {selectedStep && (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                {(() => {
                  const IconComponent = workflowSteps.find(s => s.id === selectedStep)?.icon
                  return IconComponent && <IconComponent className="h-5 w-5 text-primary" />
                })()}
              </div>
              <div>
                <CardTitle>Step {selectedStep}: {workflowSteps.find(s => s.id === selectedStep)?.title}</CardTitle>
                <CardDescription>{workflowSteps.find(s => s.id === selectedStep)?.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {(() => {
              const step = workflowSteps.find(s => s.id === selectedStep)
              if (!step) return null
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2 flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Duration & Systems</span>
                      </h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Expected Duration:</span>
                          <Badge variant="outline">{step.details.duration}</Badge>
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">Systems Involved:</span>
                          <div className="flex flex-wrap gap-1">
                            {step.details.systems.map((system, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {system}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2 flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span>Actions Performed</span>
                      </h5>
                      <ul className="space-y-1">
                        {step.details.actions.map((action, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2 flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>Expected Outputs</span>
                    </h5>
                    <ul className="space-y-1">
                      {step.details.outputs.map((output, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-success rounded-full mt-2"></div>
                          <span>{output}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}

      {/* Use Case Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Use Case Scenarios</CardTitle>
          <CardDescription>Common customer interaction scenarios and their expected outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account-balance" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              {useCaseScenarios.map((scenario) => (
                <TabsTrigger key={scenario.id} value={scenario.id} className="text-xs">
                  {scenario.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {useCaseScenarios.map((scenario) => (
              <TabsContent key={scenario.id} value={scenario.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{scenario.title}</h4>
                    <p className="text-sm text-muted-foreground">{scenario.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getComplexityColor(scenario.complexity)}>
                      {scenario.complexity}
                    </Badge>
                    <Badge className={getResolutionColor(scenario.expectedResolution)}>
                      {scenario.expectedResolution}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h5 className="font-semibold mb-3">Conversation Flow</h5>
                    <div className="space-y-3">
                      {scenario.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-accent rounded-lg">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <p className="text-sm">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-3">Performance Metrics</h5>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Average Time</span>
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div className="font-semibold">{scenario.metrics.averageTime}</div>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Success Rate</span>
                          <CheckCircle className="h-4 w-4 text-success" />
                        </div>
                        <div className="font-semibold text-success">{scenario.metrics.successRate}</div>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                          <Users className="h-4 w-4 text-warning" />
                        </div>
                        <div className="font-semibold text-warning">{scenario.metrics.customerSatisfaction}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}