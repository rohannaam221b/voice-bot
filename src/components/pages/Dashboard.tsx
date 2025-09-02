import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { 
  Phone, 
  Clock, 
  Globe, 
  Activity, 
  TrendingUp, 
  Users, 
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Clock3
} from 'lucide-react'

export function Dashboard() {
  const keyMetrics = [
    {
      title: 'Target Call Resolution',
      value: '70%',
      description: 'Automated resolution target',
      icon: Phone,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Response Time Goal',
      value: '<10s',
      description: 'Average response time',
      icon: Clock,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Language Support',
      value: '5+',
      description: 'Supported languages',
      icon: Globe,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Uptime Target',
      value: '99.5%',
      description: 'System availability',
      icon: Activity,
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ]

  const quickActions = [
    { label: 'Deploy New Model', variant: 'default' as const },
    { label: 'View Analytics', variant: 'outline' as const },
    { label: 'System Configuration', variant: 'outline' as const },
    { label: 'Generate Report', variant: 'outline' as const }
  ]

  const recentActivities = [
    {
      id: 1,
      title: 'NLP Model Updated',
      description: 'Sentiment analysis accuracy improved to 94.2%',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      title: 'System Health Check',
      description: 'All services running optimally',
      time: '4 hours ago',
      status: 'success'
    },
    {
      id: 3,
      title: 'Integration Test',
      description: 'Twilio Flex connection verified',
      time: '6 hours ago',
      status: 'success'
    },
    {
      id: 4,
      title: 'Scheduled Maintenance',
      description: 'Database optimization completed',
      time: '1 day ago',
      status: 'warning'
    }
  ]

  const systemHealth = [
    { component: 'Voice Recognition', status: 'operational', uptime: 99.8 },
    { component: 'NLP Engine', status: 'operational', uptime: 99.9 },
    { component: 'CBS Integration', status: 'operational', uptime: 99.5 },
    { component: 'Analytics Service', status: 'maintenance', uptime: 98.2 }
  ]

  return (
    <div className="space-y-8">
      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${metric.color}`}>
                {metric.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button 
                key={index} 
                variant={action.variant} 
                className="w-full justify-start"
              >
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system updates and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {activity.status === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : activity.status === 'warning' ? (
                      <AlertCircle className="h-4 w-4 text-warning" />
                    ) : (
                      <Clock3 className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health Overview */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Service status and uptime</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((service, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{service.component}</span>
                    <Badge 
                      variant={service.status === 'operational' ? 'default' : 'secondary'}
                      className={service.status === 'operational' ? 'bg-success text-success-foreground' : ''}
                    >
                      {service.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={service.uptime} className="flex-1" />
                    <span className="text-xs text-muted-foreground min-w-0">
                      {service.uptime}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Key performance indicators at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
              <div className="text-2xl font-bold text-success">94.2%</div>
              <div className="text-sm text-muted-foreground">Sentiment Analysis Accuracy</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Daily Active Users</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-secondary">3,856</div>
              <div className="text-sm text-muted-foreground">Conversations Processed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}