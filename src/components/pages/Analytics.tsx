import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Phone, 
  Clock, 
  ThumbsUp,
  Download,
  Calendar,
  BarChart3
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function Analytics() {
  // Sample data for charts
  const sentimentTrendData = [
    { month: 'Jan', positive: 78, negative: 12, neutral: 10 },
    { month: 'Feb', positive: 82, negative: 10, neutral: 8 },
    { month: 'Mar', positive: 85, negative: 8, neutral: 7 },
    { month: 'Apr', positive: 88, negative: 7, neutral: 5 },
    { month: 'May', positive: 91, negative: 5, neutral: 4 },
    { month: 'Jun', positive: 94, negative: 4, neutral: 2 }
  ]

  const callVolumeData = [
    { time: '00:00', calls: 120 },
    { time: '04:00', calls: 80 },
    { time: '08:00', calls: 450 },
    { time: '12:00', calls: 680 },
    { time: '16:00', calls: 520 },
    { time: '20:00', calls: 280 }
  ]

  const resolutionData = [
    { category: 'Account Balance', automated: 95, manual: 5 },
    { category: 'Transaction History', automated: 88, manual: 12 },
    { category: 'Card Services', automated: 72, manual: 28 },
    { category: 'Loan Inquiries', automated: 45, manual: 55 },
    { category: 'Complaints', automated: 15, manual: 85 }
  ]

  const languageDistribution = [
    { name: 'English', value: 45, color: '#1E40AF' },
    { name: 'Hindi', value: 25, color: '#3B82F6' },
    { name: 'Tamil', value: 12, color: '#059669' },
    { name: 'Telugu', value: 10, color: '#D97706' },
    { name: 'Bengali', value: 8, color: '#DC2626' }
  ]

  const kpiData = [
    {
      title: 'Call Resolution Rate',
      value: '94.2%',
      change: '+2.3%',
      trend: 'up',
      description: 'Automated resolution success',
      icon: Phone,
      color: 'text-success'
    },
    {
      title: 'Average Response Time',
      value: '8.4s',
      change: '-1.2s',
      trend: 'down',
      description: 'Time to first response',
      icon: Clock,
      color: 'text-primary'
    },
    {
      title: 'Customer Satisfaction',
      value: '4.6/5',
      change: '+0.2',
      trend: 'up',
      description: 'Average rating',
      icon: ThumbsUp,
      color: 'text-warning'
    },
    {
      title: 'Daily Active Users',
      value: '12,847',
      change: '+8.5%',
      trend: 'up',
      description: 'Unique callers today',
      icon: Users,
      color: 'text-secondary'
    }
  ]

  const performanceMetrics = [
    { metric: 'Speech Recognition Accuracy', value: 96.8, target: 95 },
    { metric: 'Sentiment Analysis Accuracy', value: 94.2, target: 90 },
    { metric: 'Intent Classification Accuracy', value: 92.5, target: 88 },
    { metric: 'System Uptime', value: 99.7, target: 99.5 },
    { metric: 'Response Time SLA', value: 95.3, target: 90 }
  ]

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown
  }

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-success' : 'text-destructive'
  }

  return (
    <div className="space-y-8">
      {/* Header with Export Options */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Real-time insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const TrendIcon = getTrendIcon(kpi.trend)
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <kpi.icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${kpi.color}`}>
                  {kpi.value}
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendIcon className={`h-4 w-4 ${getTrendColor(kpi.trend)}`} />
                  <span className={`text-sm ${getTrendColor(kpi.trend)}`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-muted-foreground">vs last month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {kpi.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Analysis Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis Trends</CardTitle>
            <CardDescription>Monthly sentiment distribution over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={sentimentTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="positive" 
                  stackId="1" 
                  stroke="#059669" 
                  fill="#059669" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="neutral" 
                  stackId="1" 
                  stroke="#D97706" 
                  fill="#D97706" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="negative" 
                  stackId="1" 
                  stroke="#DC2626" 
                  fill="#DC2626" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Call Volume Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Call Volume Pattern</CardTitle>
            <CardDescription>Hourly call distribution throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={callVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="calls" 
                  stroke="#1E40AF" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resolution Type Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Resolution Type by Category</CardTitle>
            <CardDescription>Automated vs manual resolution rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resolutionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="automated" stackId="a" fill="#059669" />
                <Bar dataKey="manual" stackId="a" fill="#DC2626" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Language Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Language Usage Distribution</CardTitle>
            <CardDescription>Customer language preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={languageDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {languageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-2">
                {languageDistribution.map((lang, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: lang.color }}
                      ></div>
                      <span className="text-sm">{lang.name}</span>
                    </div>
                    <span className="text-sm font-medium">{lang.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics vs Targets</CardTitle>
          <CardDescription>Key performance indicators against defined targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.metric}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      Target: {metric.target}%
                    </span>
                    <Badge 
                      variant={metric.value >= metric.target ? 'default' : 'secondary'}
                      className={metric.value >= metric.target ? 'bg-success text-success-foreground' : ''}
                    >
                      {metric.value}%
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={metric.value} className="flex-1" />
                  <Progress 
                    value={metric.target} 
                    className="flex-1 opacity-30" 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Business Impact Summary</CardTitle>
          <CardDescription>Quantified benefits and ROI metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2 p-4 border rounded-lg">
              <BarChart3 className="h-8 w-8 text-success mx-auto" />
              <div className="text-2xl font-bold text-success">₹2.8Cr</div>
              <div className="text-sm text-muted-foreground">Annual Cost Savings</div>
              <div className="text-xs text-muted-foreground">Reduced manual interventions</div>
            </div>
            <div className="text-center space-y-2 p-4 border rounded-lg">
              <Clock className="h-8 w-8 text-primary mx-auto" />
              <div className="text-2xl font-bold text-primary">68%</div>
              <div className="text-sm text-muted-foreground">Faster Resolution</div>
              <div className="text-xs text-muted-foreground">Average time reduction</div>
            </div>
            <div className="text-center space-y-2 p-4 border rounded-lg">
              <Users className="h-8 w-8 text-warning mx-auto" />
              <div className="text-2xl font-bold text-warning">4.6/5</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
              <div className="text-xs text-muted-foreground">Improved service quality</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}