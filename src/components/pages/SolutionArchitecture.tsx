import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { 
  Phone, 
  MessageSquare, 
  Brain, 
  Database, 
  Users, 
  Settings,
  ArrowRight,
  Cloud,
  Shield,
  Zap
} from 'lucide-react'

export function SolutionArchitecture() {
  const architectureComponents = [
    {
      name: 'Twilio Flex',
      description: 'Contact center platform handling voice calls and routing',
      type: 'Integration',
      status: 'Active',
      icon: Phone,
      connections: ['Google Speech-to-Text', 'NLP Engine']
    },
    {
      name: 'Google Speech-to-Text',
      description: 'Real-time speech recognition and transcription service',
      type: 'AI Service',
      status: 'Active',
      icon: MessageSquare,
      connections: ['NLP Engine']
    },
    {
      name: 'NLP Engine',
      description: 'Natural language processing for sentiment analysis',
      type: 'Core AI',
      status: 'Active',
      icon: Brain,
      connections: ['Core Banking System', 'CRM Integration']
    },
    {
      name: 'Core Banking System',
      description: 'Integration with existing banking infrastructure',
      type: 'Backend',
      status: 'Active',
      icon: Database,
      connections: ['CRM Integration']
    },
    {
      name: 'CRM Integration',
      description: 'Customer relationship management system integration',
      type: 'Backend',
      status: 'Active',
      icon: Users,
      connections: ['LMS Integration']
    },
    {
      name: 'LMS Integration',
      description: 'Learning management system for continuous improvement',
      type: 'Analytics',
      status: 'Development',
      icon: Settings,
      connections: []
    }
  ]

  const technologyStack = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React.js', version: '18.x', purpose: 'User interface development' },
        { name: 'TypeScript', version: '5.x', purpose: 'Type-safe development' },
        { name: 'Tailwind CSS', version: '4.x', purpose: 'Responsive design system' }
      ]
    },
    {
      category: 'Backend',
      technologies: [
        { name: 'Node.js', version: '20.x', purpose: 'Runtime environment' },
        { name: 'Express.js', version: '4.x', purpose: 'Web application framework' },
        { name: 'Python', version: '3.11', purpose: 'AI/ML model development' }
      ]
    },
    {
      category: 'AI/ML',
      technologies: [
        { name: 'TensorFlow', version: '2.15', purpose: 'Machine learning framework' },
        { name: 'NLTK', version: '3.8', purpose: 'Natural language processing' },
        { name: 'Hugging Face', version: 'Latest', purpose: 'Pre-trained models' }
      ]
    },
    {
      category: 'Cloud & Infrastructure',
      technologies: [
        { name: 'Google Cloud Platform', version: 'Current', purpose: 'Cloud infrastructure' },
        { name: 'Docker', version: '24.x', purpose: 'Containerization' },
        { name: 'Kubernetes', version: '1.28', purpose: 'Container orchestration' }
      ]
    }
  ]

  const integrationPoints = [
    {
      source: 'Customer Call',
      target: 'Twilio Flex',
      method: 'Voice API',
      description: 'Incoming customer calls routed through contact center'
    },
    {
      source: 'Twilio Flex',
      target: 'Speech-to-Text',
      method: 'Real-time Stream',
      description: 'Live audio stream processing for transcription'
    },
    {
      source: 'Speech-to-Text',
      target: 'NLP Engine',
      method: 'REST API',
      description: 'Text analysis for sentiment and intent recognition'
    },
    {
      source: 'NLP Engine',
      target: 'Core Banking',
      method: 'Secure API',
      description: 'Customer data retrieval and transaction processing'
    },
    {
      source: 'Core Banking',
      target: 'CRM System',
      method: 'Database Sync',
      description: 'Customer interaction history and preferences'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground'
      case 'Development': return 'bg-warning text-warning-foreground'
      case 'Planned': return 'bg-secondary text-secondary-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Integration': return Phone
      case 'AI Service': return Brain
      case 'Core AI': return Zap
      case 'Backend': return Database
      case 'Analytics': return Settings
      default: return Cloud
    }
  }

  return (
    <div className="space-y-8">
      {/* Architecture Overview */}
      <Card>
        <CardHeader>
          <CardTitle>System Architecture Overview</CardTitle>
          <CardDescription>
            Comprehensive view of the AI voice bot solution architecture and component interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {architectureComponents.map((component, index) => {
              const IconComponent = component.icon
              return (
                <div key={index} className="p-4 border rounded-lg space-y-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{component.name}</h4>
                        <p className="text-xs text-muted-foreground">{component.type}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(component.status)} variant="secondary">
                      {component.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{component.description}</p>
                  {component.connections.length > 0 && (
                    <div className="pt-2 border-t">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Connects to:</p>
                      <div className="flex flex-wrap gap-1">
                        {component.connections.map((connection, connIndex) => (
                          <Badge key={connIndex} variant="outline" className="text-xs">
                            {connection}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
          <CardDescription>Technologies and frameworks used in the solution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technologyStack.map((stack, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>{stack.category}</span>
                </h4>
                <div className="space-y-3">
                  {stack.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="p-3 bg-accent rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{tech.name}</span>
                        <Badge variant="outline">{tech.version}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{tech.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Flow */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Points</CardTitle>
          <CardDescription>Data flow and integration methods between system components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrationPoints.map((integration, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex items-center space-x-2 flex-1">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Database className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">{integration.source}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline">{integration.method}</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                
                <div className="flex items-center space-x-2 flex-1">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Cloud className="h-4 w-4 text-secondary" />
                  </div>
                  <span className="font-medium">{integration.target}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-accent rounded-lg">
            <h5 className="font-semibold mb-2 flex items-center space-x-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Security & Compliance</span>
            </h5>
            <p className="text-sm text-muted-foreground">
              All integrations implement end-to-end encryption, OAuth 2.0 authentication, and comply with 
              banking security standards including PCI DSS and RBI guidelines for customer data protection.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Performance Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Specifications</CardTitle>
          <CardDescription>Technical performance requirements and capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2 p-4 border rounded-lg">
              <Zap className="h-8 w-8 text-primary mx-auto" />
              <div className="text-2xl font-bold text-primary">&lt;500ms</div>
              <div className="text-sm text-muted-foreground">API Response Time</div>
            </div>
            <div className="text-center space-y-2 p-4 border rounded-lg">
              <Users className="h-8 w-8 text-success mx-auto" />
              <div className="text-2xl font-bold text-success">10K+</div>
              <div className="text-sm text-muted-foreground">Concurrent Users</div>
            </div>
            <div className="text-center space-y-2 p-4 border rounded-lg">
              <Shield className="h-8 w-8 text-warning mx-auto" />
              <div className="text-2xl font-bold text-warning">99.9%</div>
              <div className="text-sm text-muted-foreground">Security Compliance</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}