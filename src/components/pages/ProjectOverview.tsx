import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { 
  Target, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe,
  Clock,
  CheckCircle2,
  Circle
} from 'lucide-react'

export function ProjectOverview() {
  const objectives = [
    {
      title: 'Automated Call Resolution',
      description: 'Achieve 70% automated resolution rate for customer inquiries',
      progress: 85,
      status: 'on-track',
      icon: Target
    },
    {
      title: 'Response Time Optimization',
      description: 'Reduce average response time to under 10 seconds',
      progress: 92,
      status: 'on-track',
      icon: Clock
    },
    {
      title: 'Customer Satisfaction',
      description: 'Maintain 4.5+ star rating for automated interactions',
      progress: 78,
      status: 'on-track',
      icon: Users
    },
    {
      title: 'Multi-language Support',
      description: 'Support 5+ regional languages with 95% accuracy',
      progress: 65,
      status: 'in-progress',
      icon: Globe
    },
    {
      title: 'System Reliability',
      description: 'Ensure 99.5% uptime with robust failover mechanisms',
      progress: 95,
      status: 'on-track',
      icon: Shield
    },
    {
      title: 'Integration Efficiency',
      description: 'Seamless integration with existing banking infrastructure',
      progress: 72,
      status: 'in-progress',
      icon: Zap
    }
  ]

  const businessNeeds = [
    {
      title: 'Operational Efficiency',
      description: 'Reduce manual intervention in routine customer service tasks while maintaining service quality.',
      impact: 'High',
      urgency: 'Critical'
    },
    {
      title: 'Customer Experience Enhancement',
      description: 'Provide 24/7 instant support with personalized sentiment-aware responses.',
      impact: 'High',
      urgency: 'High'
    },
    {
      title: 'Cost Optimization',
      description: 'Reduce operational costs by automating repetitive customer service interactions.',
      impact: 'Medium',
      urgency: 'Medium'
    },
    {
      title: 'Scalability Requirements',
      description: 'Handle increasing customer volume without proportional increase in support staff.',
      impact: 'High',
      urgency: 'High'
    }
  ]

  const timeline = [
    { phase: 'Discovery & Planning', status: 'completed', duration: '4 weeks' },
    { phase: 'Architecture Design', status: 'completed', duration: '3 weeks' },
    { phase: 'Core Development', status: 'in-progress', duration: '8 weeks' },
    { phase: 'Integration Testing', status: 'pending', duration: '4 weeks' },
    { phase: 'User Acceptance Testing', status: 'pending', duration: '2 weeks' },
    { phase: 'Production Deployment', status: 'pending', duration: '1 week' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success'
      case 'in-progress': return 'text-warning'
      case 'on-track': return 'text-success'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      'completed': 'bg-success text-success-foreground',
      'in-progress': 'bg-warning text-warning-foreground',
      'on-track': 'bg-success text-success-foreground',
      'pending': 'bg-muted text-muted-foreground',
      'Critical': 'bg-destructive text-destructive-foreground',
      'High': 'bg-warning text-warning-foreground',
      'Medium': 'bg-secondary text-secondary-foreground'
    }
    return colors[status as keyof typeof colors] || colors.pending
  }

  return (
    <div className="space-y-8">
      {/* Project Summary */}
      <Card>
        <CardHeader>
          <CardTitle>AI Voice Bot Customer Sentiment Analysis Platform</CardTitle>
          <CardDescription>
            An enterprise-grade solution for automated customer service with real-time sentiment analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">Q2 2025</div>
              <div className="text-sm text-muted-foreground">Target Deployment</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-secondary">₹2.5Cr</div>
              <div className="text-sm text-muted-foreground">Project Budget</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-success">68%</div>
              <div className="text-sm text-muted-foreground">Progress Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Needs */}
      <Card>
        <CardHeader>
          <CardTitle>Business Needs Assessment</CardTitle>
          <CardDescription>Critical business requirements driving this initiative</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businessNeeds.map((need, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold">{need.title}</h4>
                  <div className="flex space-x-2">
                    <Badge className={getStatusBadge(need.urgency)}>
                      {need.urgency}
                    </Badge>
                    <Badge className={getStatusBadge(need.impact)}>
                      {need.impact}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{need.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Objectives Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Project Objectives</CardTitle>
          <CardDescription>Key objectives and their current progress status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {objectives.map((objective, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <objective.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{objective.title}</h4>
                    <Badge className={getStatusBadge(objective.status)} variant="secondary">
                      {objective.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{objective.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className={getStatusColor(objective.status)}>{objective.progress}%</span>
                  </div>
                  <Progress value={objective.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>Development phases and current progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeline.map((phase, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {phase.status === 'completed' ? (
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  ) : phase.status === 'in-progress' ? (
                    <div className="h-6 w-6 border-2 border-warning rounded-full flex items-center justify-center">
                      <div className="h-2 w-2 bg-warning rounded-full"></div>
                    </div>
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{phase.phase}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusBadge(phase.status)} variant="secondary">
                        {phase.status.replace('-', ' ')}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{phase.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}