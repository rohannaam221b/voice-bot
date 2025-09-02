import { useState } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Alert, AlertDescription } from './ui/alert'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { 
  Mic, 
  Shield, 
  Chrome, 
  Globe, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw,
  Settings,
  Info
} from 'lucide-react'

interface VoicePermissionPromptProps {
  microphonePermission: 'granted' | 'denied' | 'prompt' | 'unknown'
  hasPermissionError: boolean
  onRequestPermission: () => Promise<void>
  isSupported: boolean
  className?: string
}

export function VoicePermissionPrompt({
  microphonePermission,
  hasPermissionError,
  onRequestPermission,
  isSupported,
  className = ''
}: VoicePermissionPromptProps) {
  const [isRequesting, setIsRequesting] = useState(false)

  const handleRequestPermission = async () => {
    setIsRequesting(true)
    try {
      await onRequestPermission()
    } catch (err: any) {
      // Error handling is done in the hook
      console.log('Permission request failed:', err.message)
    } finally {
      setIsRequesting(false)
    }
  }

  const getBrowserInstructions = () => {
    const userAgent = navigator.userAgent
    if (userAgent.includes('Chrome')) {
      return {
        browser: 'Chrome',
        icon: Chrome,
        steps: [
          'Look for a microphone icon with an "X" in the address bar',
          'Click the microphone icon',
          'Select "Always allow on this site"',
          'Click "Done" and refresh this page'
        ]
      }
    } else if (userAgent.includes('Safari')) {
      return {
        browser: 'Safari',
        icon: Globe,
        steps: [
          'Click Safari in the menu bar',
          'Select "Settings for This Website..."',
          'Change "Microphone" from "Deny" to "Allow"',
          'Close the popup and refresh this page'
        ]
      }
    } else if (userAgent.includes('Firefox')) {
      return {
        browser: 'Firefox',
        icon: Globe,
        steps: [
          'Look for a blocked microphone icon in the address bar',
          'Click the icon and select "Allow"',
          'Check "Remember this decision" if available',
          'Refresh this page'
        ]
      }
    } else {
      return {
        browser: 'Browser',
        icon: Globe,
        steps: [
          'Check for a microphone icon in your browser\'s address bar',
          'Click the icon and change setting to "Allow"',
          'Refresh this page to apply the changes'
        ]
      }
    }
  }

  if (!isSupported) {
    const isHttps = window.location.protocol === 'https:'
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    
    return (
      <Card className={`border-warning ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-warning">
            <AlertTriangle className="h-5 w-5" />
            <span>Voice Recognition Not Available</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!isHttps && !isLocalhost && (
              <Alert className="border-destructive/50 bg-destructive/5">
                <Shield className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">
                  <strong>HTTPS Required:</strong> Voice recognition requires a secure connection. This site must be served over HTTPS.
                </AlertDescription>
              </Alert>
            )}
            
            <p className="text-sm text-muted-foreground">
              Your browser doesn't support voice recognition. Please use a modern browser like Chrome, Safari, or Edge for the best experience.
            </p>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                <Chrome className="h-3 w-3 mr-1" />
                Chrome (Recommended)
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Globe className="h-3 w-3 mr-1" />
                Safari
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Globe className="h-3 w-3 mr-1" />
                Edge
              </Badge>
            </div>
            
            {!isHttps && !isLocalhost && (
              <div className="text-xs text-muted-foreground">
                Current protocol: {window.location.protocol} (needs https:)
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (microphonePermission === 'granted') {
    return (
      <Alert className={`border-success bg-success/5 ${className}`}>
        <CheckCircle2 className="h-4 w-4 text-success" />
        <AlertDescription className="text-success">
          Microphone access granted. Voice commands are ready to use!
        </AlertDescription>
      </Alert>
    )
  }

  if (microphonePermission === 'denied' || hasPermissionError) {
    const { browser, icon: BrowserIcon, steps } = getBrowserInstructions()
    
    return (
      <Card className={`border-destructive ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-destructive">
            <Shield className="h-5 w-5" />
            <span>Microphone Access Required</span>
          </CardTitle>
          <CardDescription>
            Voice commands need microphone access to work properly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-destructive/50 bg-destructive/5">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              Microphone access has been blocked. To enable voice features, you'll need to manually allow microphone access in your browser.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <BrowserIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">How to enable microphone access in {browser}:</span>
            </div>
            <ol className="space-y-2 text-sm text-muted-foreground">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Badge variant="outline" className="text-xs mt-0.5 min-w-[20px] justify-center">
                    {index + 1}
                  </Badge>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <Alert className="border-primary/50 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription>
              <strong>Important:</strong> After enabling microphone access, please refresh this page for the changes to take effect.
            </AlertDescription>
          </Alert>

          <Separator />

          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2 flex-1"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Page</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRequestPermission}
              disabled={isRequesting}
              className="flex items-center space-x-2"
            >
              {isRequesting ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
              <span>Test Again</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // First time permission prompt
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={className}
    >
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="h-5 w-5 text-primary" />
            <span>Enable Voice Commands</span>
          </CardTitle>
          <CardDescription>
            Allow microphone access to use voice-powered payment features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-accent rounded-lg">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1">
                <div className="text-sm font-medium">Your privacy is protected</div>
                <div className="text-xs text-muted-foreground">
                  Voice data is processed locally and not stored. We only use your microphone when you're actively using voice commands.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-3 w-3 text-success" />
                <span>Pay bills with voice</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-3 w-3 text-success" />
                <span>Schedule payments</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-3 w-3 text-success" />
                <span>Check account balance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-3 w-3 text-success" />
                <span>Set up investments</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center space-x-2">
            <Button 
              onClick={handleRequestPermission}
              disabled={isRequesting}
              className="flex-1 flex items-center space-x-2"
            >
              {isRequesting ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
              <span>{isRequesting ? 'Requesting Access...' : 'Enable Voice Commands'}</span>
            </Button>
          </div>

          <div className="flex items-start space-x-2 text-xs text-muted-foreground">
            <Info className="h-3 w-3 mt-0.5" />
            <span>
              Your browser will ask for microphone permission. Click "Allow" to enable voice features.
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}