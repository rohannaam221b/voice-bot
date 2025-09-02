import { Shield, Lock, FileCheck, AlertTriangle, Users, Database, Mic, Eye, CheckCircle2, Clock, AlertCircle, Zap } from 'lucide-react'
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Alert, AlertDescription } from "../ui/alert"

export function Compliance() {
  const complianceFrameworks = [
    { name: 'SOX (Sarbanes-Oxley)', status: 'Compliant', score: 98, color: 'bg-success' },
    { name: 'PCI DSS Level 1', status: 'Compliant', score: 95, color: 'bg-success' },
    { name: 'GDPR', status: 'Compliant', score: 97, color: 'bg-success' },
    { name: 'CCPA', status: 'Compliant', score: 94, color: 'bg-success' },
    { name: 'Basel III', status: 'In Progress', score: 87, color: 'bg-warning' },
    { name: 'ISO 27001', status: 'Certified', score: 99, color: 'bg-success' }
  ]

  const securityMetrics = [
    { name: 'Encryption Coverage', value: 100, icon: Lock },
    { name: 'Access Control', value: 98, icon: Users },
    { name: 'Data Masking', value: 95, icon: Eye },
    { name: 'Audit Trail Coverage', value: 100, icon: FileCheck }
  ]

  const voiceSecurityFeatures = [
    {
      title: 'Voice Biometric Authentication',
      description: 'Multi-factor voice authentication with 99.7% accuracy',
      status: 'Active',
      icon: Mic
    },
    {
      title: 'Real-time Speech Encryption',
      description: 'End-to-end AES-256 encryption for all voice data',
      status: 'Active',
      icon: Shield
    },
    {
      title: 'Voice Data Anonymization',
      description: 'Automatic PII removal and voice pattern obfuscation',
      status: 'Active',
      icon: Database
    },
    {
      title: 'Consent Management',
      description: 'Granular consent tracking for voice data processing',
      status: 'Active',
      icon: CheckCircle2
    }
  ]

  const recentAudits = [
    {
      date: '2024-01-15',
      auditor: 'EY Compliance',
      scope: 'PCI DSS Annual Assessment',
      result: 'Pass',
      findings: 0
    },
    {
      date: '2024-01-08',
      auditor: 'Internal Security',
      scope: 'Voice Data Privacy Review',
      result: 'Pass',
      findings: 2
    },
    {
      date: '2023-12-20',
      auditor: 'Deloitte Risk',
      scope: 'SOX Controls Testing',
      result: 'Pass',
      findings: 1
    }
  ]

  const riskAlerts = [
    {
      level: 'Medium',
      title: 'API Rate Limiting Threshold',
      description: 'Voice API approaching 80% of monthly quota',
      time: '2 hours ago'
    },
    {
      level: 'Low',
      title: 'Certificate Renewal',
      description: 'SSL certificate expires in 45 days',
      time: '1 day ago'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Compliance & Security Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive compliance monitoring and security controls for banking operations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-success text-success-foreground">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            All Systems Secure
          </Badge>
        </div>
      </div>

      {/* Risk Alerts */}
      {riskAlerts.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>{riskAlerts.length} active alert(s)</strong> requiring attention
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="voice-security">Voice Security</TabsTrigger>
          <TabsTrigger value="data-protection">Data Protection</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Security Metrics Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {securityMetrics.map((metric) => {
              const Icon = metric.icon
              return (
                <Card key={metric.name} className="p-6">
                  <div className="flex items-center justify-between space-y-0 pb-2">
                    <h3 className="tracking-tight">{metric.name}</h3>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{metric.value}%</div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Compliance Status Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {complianceFrameworks.map((framework) => (
              <Card key={framework.name} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3>{framework.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={framework.status === 'Compliant' || framework.status === 'Certified' ? 'default' : 'secondary'}
                        className={framework.status === 'Compliant' || framework.status === 'Certified' ? 'bg-success text-success-foreground' : ''}
                      >
                        {framework.status}
                      </Badge>
                      <span className="font-semibold">{framework.score}%</span>
                    </div>
                  </div>
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div className="mt-4">
                  <Progress value={framework.score} className="h-2" />
                </div>
              </Card>
            ))}
          </div>

          {/* Recent Risk Alerts */}
          <Card className="p-6">
            <h3 className="mb-4">Recent Risk Alerts</h3>
            <div className="space-y-4">
              {riskAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <AlertCircle className={`h-5 w-5 mt-0.5 ${
                    alert.level === 'High' ? 'text-destructive' : 
                    alert.level === 'Medium' ? 'text-warning' : 'text-muted-foreground'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4>{alert.title}</h4>
                      <Badge variant={alert.level === 'High' ? 'destructive' : alert.level === 'Medium' ? 'secondary' : 'outline'}>
                        {alert.level}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{alert.description}</p>
                    <p className="text-sm text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-6">Regulatory Compliance Frameworks</h3>
            <div className="space-y-6">
              {complianceFrameworks.map((framework) => (
                <div key={framework.name} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4>{framework.name}</h4>
                      <p className="text-muted-foreground mt-1">
                        {framework.name === 'SOX (Sarbanes-Oxley)' && 'Financial reporting and internal controls'}
                        {framework.name === 'PCI DSS Level 1' && 'Payment card industry data security standards'}
                        {framework.name === 'GDPR' && 'General Data Protection Regulation compliance'}
                        {framework.name === 'CCPA' && 'California Consumer Privacy Act compliance'}
                        {framework.name === 'Basel III' && 'International banking regulations'}
                        {framework.name === 'ISO 27001' && 'Information security management systems'}
                      </p>
                    </div>
                    <Badge 
                      variant={framework.status === 'Compliant' || framework.status === 'Certified' ? 'default' : 'secondary'}
                      className={framework.status === 'Compliant' || framework.status === 'Certified' ? 'bg-success text-success-foreground' : ''}
                    >
                      {framework.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Compliance Score</span>
                      <span className="font-semibold">{framework.score}%</span>
                    </div>
                    <Progress value={framework.score} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="voice-security" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-6">Voice Data Security Features</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {voiceSecurityFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="border rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                      <Icon className="h-6 w-6 text-primary mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4>{feature.title}</h4>
                          <Badge className="bg-success text-success-foreground">{feature.status}</Badge>
                        </div>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Voice Privacy Controls</h3>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border rounded-lg p-4">
                  <h4 className="mb-2">Data Retention</h4>
                  <p className="text-muted-foreground mb-2">Voice recordings automatically deleted after 90 days</p>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="mb-2">Consent Tracking</h4>
                  <p className="text-muted-foreground mb-2">Granular consent for each voice interaction</p>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="mb-2">Right to Erasure</h4>
                  <p className="text-muted-foreground mb-2">Immediate voice data deletion on request</p>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="data-protection" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="mb-4">Encryption Standards</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4>Data at Rest</h4>
                    <p className="text-muted-foreground">AES-256 encryption</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4>Data in Transit</h4>
                    <p className="text-muted-foreground">TLS 1.3 encryption</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4>Voice Streams</h4>
                    <p className="text-muted-foreground">End-to-end encryption</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Access Controls</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4>Multi-Factor Authentication</h4>
                    <p className="text-muted-foreground">Required for all access</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4>Role-Based Access</h4>
                    <p className="text-muted-foreground">Principle of least privilege</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4>Session Management</h4>
                    <p className="text-muted-foreground">Automatic timeout and monitoring</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="mb-4">Data Classification & Handling</h3>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="border rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-destructive rounded-full mx-auto mb-2 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-destructive-foreground" />
                </div>
                <h4>Restricted</h4>
                <p className="text-sm text-muted-foreground">Customer PII, voice biometrics</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-warning rounded-full mx-auto mb-2 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-warning-foreground" />
                </div>
                <h4>Confidential</h4>
                <p className="text-sm text-muted-foreground">Transaction data, account info</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-secondary rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Eye className="h-4 w-4 text-secondary-foreground" />
                </div>
                <h4>Internal</h4>
                <p className="text-sm text-muted-foreground">System logs, metadata</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-success rounded-full mx-auto mb-2 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-success-foreground" />
                </div>
                <h4>Public</h4>
                <p className="text-sm text-muted-foreground">Marketing materials, docs</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-6">Recent Audit Results</h3>
            <div className="space-y-4">
              {recentAudits.map((audit, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4>{audit.scope}</h4>
                    <Badge className={audit.result === 'Pass' ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}>
                      {audit.result}
                    </Badge>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Date:</span> {audit.date}
                    </div>
                    <div>
                      <span className="font-medium">Auditor:</span> {audit.auditor}
                    </div>
                    <div>
                      <span className="font-medium">Findings:</span> {audit.findings}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Upcoming Audits</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4>ISO 27001 Recertification</h4>
                  <p className="text-muted-foreground">March 15, 2024 - External Auditor</p>
                </div>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4>Voice Data Privacy Assessment</h4>
                  <p className="text-muted-foreground">February 28, 2024 - Internal Security</p>
                </div>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="mb-4">Real-time Security Monitoring</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Active Security Events</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Failed Login Attempts (24h)</span>
                  <Badge variant="outline">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>API Anomalies Detected</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Voice Data Breaches</span>
                  <Badge className="bg-success text-success-foreground">0</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Compliance Monitoring</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Policy Violations (30d)</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Regulatory Changes</span>
                  <Badge variant="outline">2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Control Effectiveness</span>
                  <Badge className="bg-success text-success-foreground">98%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Audit Readiness</span>
                  <Badge className="bg-success text-success-foreground">Ready</Badge>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="mb-4">Automated Security Controls</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <h4>Threat Detection</h4>
                </div>
                <p className="text-muted-foreground mb-2">AI-powered anomaly detection</p>
                <Badge className="bg-success text-success-foreground">Active</Badge>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <h4>Auto-blocking</h4>
                </div>
                <p className="text-muted-foreground mb-2">Automatic threat isolation</p>
                <Badge className="bg-success text-success-foreground">Active</Badge>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FileCheck className="h-4 w-4 text-primary" />
                  <h4>Compliance Scanning</h4>
                </div>
                <p className="text-muted-foreground mb-2">Continuous compliance monitoring</p>
                <Badge className="bg-success text-success-foreground">Active</Badge>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}