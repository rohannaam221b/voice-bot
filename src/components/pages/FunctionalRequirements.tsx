import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { 
  ChevronDown, 
  ChevronRight, 
  MessageSquare, 
  Phone, 
  Brain, 
  Globe, 
  Shield, 
  Database,
  BarChart3,
  Settings,
  Users,
  CheckCircle2
} from 'lucide-react'

export function FunctionalRequirements() {
  const [expandedItems, setExpandedItems] = useState<string[]>(['voice-recognition'])

  const requirementCategories = [
    {
      id: 'voice-recognition',
      title: 'Voice Recognition & Processing',
      icon: MessageSquare,
      count: 5,
      requirements: [
        {
          id: 'VR-001',
          title: 'Real-time Speech Recognition',
          priority: 'Critical',
          status: 'Implemented',
          businessRationale: 'Essential for immediate customer service response and maintaining conversation flow.',
          technicalSpec: 'Integration with Google Speech-to-Text API with <500ms latency for real-time processing.',
          successCriteria: [
            '95% accuracy in speech recognition',
            'Support for Indian English and regional accents',
            'Real-time processing with <500ms delay'
          ]
        },
        {
          id: 'VR-002',
          title: 'Multi-language Support',
          priority: 'High',
          status: 'In Progress',
          businessRationale: 'Support diverse customer base across different regions and language preferences.',
          technicalSpec: 'Support for Hindi, English, Tamil, Telugu, and Bengali with 90%+ accuracy.',
          successCriteria: [
            'Support for 5 major Indian languages',
            '90% accuracy for each supported language',
            'Automatic language detection'
          ]
        }
      ]
    },
    {
      id: 'sentiment-analysis',
      title: 'Sentiment Analysis',
      icon: Brain,
      count: 4,
      requirements: [
        {
          id: 'SA-001',
          title: 'Real-time Sentiment Detection',
          priority: 'Critical',
          status: 'Implemented',
          businessRationale: 'Enable proactive customer service by detecting emotional states during conversations.',
          technicalSpec: 'NLP models capable of detecting positive, negative, neutral, frustrated, and satisfied sentiments.',
          successCriteria: [
            '92% accuracy in sentiment classification',
            'Real-time analysis during call',
            'Confidence score >0.8 for automated actions'
          ]
        },
        {
          id: 'SA-002',
          title: 'Emotion Escalation Triggers',
          priority: 'High',
          status: 'Testing',
          businessRationale: 'Automatically escalate calls when customer frustration is detected to prevent service failures.',
          technicalSpec: 'Configurable sentiment thresholds that trigger alerts and escalation workflows.',
          successCriteria: [
            'Automatic escalation for negative sentiment >0.7',
            'Real-time alerts to supervisors',
            '95% accuracy in escalation decisions'
          ]
        }
      ]
    },
    {
      id: 'call-routing',
      title: 'Intelligent Call Routing',
      icon: Phone,
      count: 3,
      requirements: [
        {
          id: 'CR-001',
          title: 'Context-aware Routing',
          priority: 'High',
          status: 'In Progress',
          businessRationale: 'Route calls to appropriate agents or automated systems based on customer intent and history.',
          technicalSpec: 'Integration with CRM for customer history and NLP for intent classification.',
          successCriteria: [
            '85% accurate intent classification',
            'Integration with existing CRM system',
            'Routing decision in <3 seconds'
          ]
        }
      ]
    },
    {
      id: 'integration',
      title: 'System Integration',
      icon: Database,
      count: 6,
      requirements: [
        {
          id: 'SI-001',
          title: 'Core Banking System Integration',
          priority: 'Critical',
          status: 'In Progress',
          businessRationale: 'Access customer account information and transaction history for personalized service.',
          technicalSpec: 'Secure API integration with existing CBS using OAuth 2.0 and encrypted data transmission.',
          successCriteria: [
            'Real-time account data access',
            'Sub-second response times',
            '99.9% uptime integration'
          ]
        },
        {
          id: 'SI-002',
          title: 'CRM System Integration',
          priority: 'High',
          status: 'Planning',
          businessRationale: 'Maintain comprehensive customer interaction history and preferences.',
          technicalSpec: 'Bidirectional data sync with existing CRM platform via REST APIs.',
          successCriteria: [
            'Real-time data synchronization',
            'Complete interaction history capture',
            'Customer preference tracking'
          ]
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      icon: Shield,
      count: 4,
      requirements: [
        {
          id: 'SC-001',
          title: 'Data Encryption',
          priority: 'Critical',
          status: 'Implemented',
          businessRationale: 'Protect sensitive customer data and comply with banking security regulations.',
          technicalSpec: 'End-to-end encryption using AES-256 for data at rest and TLS 1.3 for data in transit.',
          successCriteria: [
            'AES-256 encryption for all stored data',
            'TLS 1.3 for all API communications',
            'Zero data breaches or security incidents'
          ]
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Reporting',
      icon: BarChart3,
      count: 5,
      requirements: [
        {
          id: 'AR-001',
          title: 'Real-time Dashboard',
          priority: 'High',
          status: 'In Progress',
          businessRationale: 'Provide real-time visibility into system performance and customer satisfaction metrics.',
          technicalSpec: 'Interactive dashboard with live metrics, alerts, and customizable views.',
          successCriteria: [
            'Real-time metric updates',
            'Customizable dashboard views',
            'Export capabilities for reports'
          ]
        }
      ]
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: Users,
      count: 3,
      requirements: [
        {
          id: 'UM-001',
          title: 'Role-based Access Control',
          priority: 'High',
          status: 'Planning',
          businessRationale: 'Ensure appropriate access levels for different user roles and maintain security.',
          technicalSpec: 'RBAC system with administrator, supervisor, agent, and analyst roles.',
          successCriteria: [
            'Defined roles with specific permissions',
            'Single sign-on integration',
            'Audit trail for all access'
          ]
        }
      ]
    },
    {
      id: 'configuration',
      title: 'System Configuration',
      icon: Settings,
      count: 4,
      requirements: [
        {
          id: 'SC-001',
          title: 'Dynamic Configuration Management',
          priority: 'Medium',
          status: 'Planning',
          businessRationale: 'Allow system administrators to modify settings without requiring code deployments.',
          technicalSpec: 'Web-based configuration interface with validation and rollback capabilities.',
          successCriteria: [
            'Runtime configuration changes',
            'Configuration validation',
            'Rollback capabilities'
          ]
        }
      ]
    },
    {
      id: 'performance',
      title: 'Performance & Scalability',
      icon: BarChart3,  
      count: 3,
      requirements: [
        {
          id: 'PS-001',
          title: 'Concurrent User Support',
          priority: 'Critical',
          status: 'Testing',
          businessRationale: 'Handle peak call volumes without performance degradation.',
          technicalSpec: 'Support for 10,000+ concurrent users with auto-scaling infrastructure.',
          successCriteria: [
            'Support 10K+ concurrent users',
            'Auto-scaling based on load',
            '<2 second response times under load'
          ]
        }
      ]
    }
  ]

  const toggleExpanded = (categoryId: string) => {
    setExpandedItems(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Implemented': return 'bg-success text-success-foreground'
      case 'In Progress': return 'bg-warning text-warning-foreground'
      case 'Testing': return 'bg-secondary text-secondary-foreground'
      case 'Planning': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-destructive text-destructive-foreground'
      case 'High': return 'bg-warning text-warning-foreground'
      case 'Medium': return 'bg-secondary text-secondary-foreground'
      case 'Low': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Functional Requirements Overview</CardTitle>
          <CardDescription>
            Comprehensive functional requirements organized by system capabilities and business domains
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">37</div>
              <div className="text-sm text-muted-foreground">Total Requirements</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-success">12</div>
              <div className="text-sm text-muted-foreground">Implemented</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-warning">18</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-secondary">7</div>
              <div className="text-sm text-muted-foreground">Planned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements Categories */}
      <div className="space-y-4">
        {requirementCategories.map((category) => (
          <Card key={category.id}>
            <Collapsible
              open={expandedItems.includes(category.id)}
              onOpenChange={() => toggleExpanded(category.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <category.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-left">{category.title}</CardTitle>
                        <CardDescription>{category.count} requirements</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {expandedItems.includes(category.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  {category.requirements.map((requirement) => (
                    <div key={requirement.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{requirement.id}</Badge>
                            <h4 className="font-semibold">{requirement.title}</h4>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(requirement.priority)}>
                              {requirement.priority}
                            </Badge>
                            <Badge className={getStatusColor(requirement.status)}>
                              {requirement.status}
                            </Badge>
                          </div>
                        </div>
                        {requirement.status === 'Implemented' && (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-1">Business Rationale</h5>
                          <p className="text-sm text-muted-foreground">{requirement.businessRationale}</p>
                        </div>

                        <div>
                          <h5 className="font-medium text-sm mb-1">Technical Specification</h5>
                          <p className="text-sm text-muted-foreground">{requirement.technicalSpec}</p>
                        </div>

                        <div>
                          <h5 className="font-medium text-sm mb-2">Success Criteria</h5>
                          <ul className="space-y-1">
                            {requirement.successCriteria.map((criteria, index) => (
                              <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                <span>{criteria}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  )
}