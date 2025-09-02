import { useState, useCallback, useEffect } from 'react'

export interface PaymentCommand {
  type: 'pay_bill' | 'schedule_payment' | 'setup_sip' | 'check_balance' | 'show_payments' | 'confirm_payment' | 'cancel_payment' | 'help'
  entity?: string
  amount?: number
  date?: string
  account?: string
  confidence: number
  originalText: string
}

export interface VoiceResponse {
  text: string
  action?: 'show_confirmation' | 'process_payment' | 'schedule_task' | 'show_dashboard' | 'show_help'
  data?: any
}

interface UseVoiceCommandsReturn {
  processCommand: (transcript: string, confidence: number) => PaymentCommand | null
  getResponse: (command: PaymentCommand) => VoiceResponse
  isProcessing: boolean
  lastProcessedCommand: PaymentCommand | null
}

export function useVoiceCommands(): UseVoiceCommandsReturn {
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastProcessedCommand, setLastProcessedCommand] = useState<PaymentCommand | null>(null)

  // Payment entities and their variations
  const paymentEntities = {
    electricity: ['electricity', 'power', 'light', 'bijli', 'current', 'mseb', 'electricity bill'],
    water: ['water', 'pani', 'water bill', 'municipal'],
    gas: ['gas', 'lpg', 'cooking gas', 'cylinder'],
    mobile: ['mobile', 'phone', 'recharge', 'mobile bill'],
    internet: ['internet', 'wifi', 'broadband', 'data'],
    emi: ['emi', 'loan', 'home loan', 'car loan', 'personal loan'],
    'credit-card': ['credit card', 'card', 'credit card bill'],
    sip: ['sip', 'mutual fund', 'investment', 'systematic investment']
  }

  // Amount extraction patterns
  const extractAmount = (text: string): number | undefined => {
    const patterns = [
      /(?:rs\.?|rupees?|₹)\s*(\d+(?:,\d+)*(?:\.\d+)?)/i,
      /(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:rs\.?|rupees?|₹)/i,
      /(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:thousand|k)/i,
      /(\d+(?:,\d+)*(?:\.\d+)?)/
    ]

    for (const pattern of patterns) {
      const match = text.match(pattern)
      if (match) {
        let amount = parseFloat(match[1].replace(/,/g, ''))
        if (text.includes('thousand') || text.includes('k')) {
          amount *= 1000
        }
        return amount
      }
    }
    return undefined
  }

  // Entity extraction
  const extractEntity = (text: string): string | undefined => {
    const lowerText = text.toLowerCase()
    
    for (const [entity, variations] of Object.entries(paymentEntities)) {
      for (const variation of variations) {
        if (lowerText.includes(variation.toLowerCase())) {
          return entity
        }
      }
    }
    return undefined
  }

  // Date extraction (simple patterns)
  const extractDate = (text: string): string | undefined => {
    const patterns = [
      /(?:on\s+)?(\d{1,2})(?:st|nd|rd|th)?\s+(?:of\s+)?(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
      /(?:on\s+)?(\d{1,2})\/(\d{1,2})\/(\d{4})/,
      /(tomorrow|today|next week|next month)/i
    ]

    for (const pattern of patterns) {
      const match = text.match(pattern)
      if (match) {
        return match[0]
      }
    }
    return undefined
  }

  const processCommand = useCallback((transcript: string, confidence: number): PaymentCommand | null => {
    setIsProcessing(true)
    
    const lowerTranscript = transcript.toLowerCase().trim()
    
    // Command patterns with their types
    const commandPatterns: Array<{ pattern: RegExp; type: PaymentCommand['type'] }> = [
      { pattern: /pay\s+(?:my\s+)?(.+?)(?:\s+bill)?/i, type: 'pay_bill' },
      { pattern: /schedule\s+(?:payment\s+for\s+)?(.+)/i, type: 'schedule_payment' },
      { pattern: /set\s+(?:up\s+)?(?:a\s+)?sip/i, type: 'setup_sip' },
      { pattern: /check\s+(?:my\s+)?balance/i, type: 'check_balance' },
      { pattern: /show\s+(?:my\s+)?(?:upcoming\s+)?payments/i, type: 'show_payments' },
      { pattern: /confirm\s+payment/i, type: 'confirm_payment' },
      { pattern: /cancel\s+payment/i, type: 'cancel_payment' },
      { pattern: /help|what\s+can\s+you\s+do/i, type: 'help' }
    ]

    let command: PaymentCommand | null = null

    // Try to match command patterns
    for (const { pattern, type } of commandPatterns) {
      const match = lowerTranscript.match(pattern)
      if (match) {
        command = {
          type,
          confidence,
          originalText: transcript,
          entity: extractEntity(transcript),
          amount: extractAmount(transcript),
          date: extractDate(transcript)
        }
        break
      }
    }

    // If no specific pattern matched, try to infer from keywords
    if (!command) {
      if (lowerTranscript.includes('pay')) {
        command = {
          type: 'pay_bill',
          confidence,
          originalText: transcript,
          entity: extractEntity(transcript),
          amount: extractAmount(transcript)
        }
      } else if (lowerTranscript.includes('schedule')) {
        command = {
          type: 'schedule_payment',
          confidence,
          originalText: transcript,
          entity: extractEntity(transcript),
          amount: extractAmount(transcript),
          date: extractDate(transcript)
        }
      } else if (lowerTranscript.includes('sip') || lowerTranscript.includes('investment')) {
        command = {
          type: 'setup_sip',
          confidence,
          originalText: transcript,
          amount: extractAmount(transcript),
          date: extractDate(transcript)
        }
      }
    }

    setLastProcessedCommand(command)
    setIsProcessing(false)
    return command
  }, [])

  const getResponse = useCallback((command: PaymentCommand): VoiceResponse => {
    const { type, entity, amount, date } = command

    switch (type) {
      case 'pay_bill':
        if (entity && amount) {
          return {
            text: `I found your ${entity} bill of ₹${amount.toLocaleString()}. Do you want to pay it now?`,
            action: 'show_confirmation',
            data: { entity, amount, type: 'bill_payment' }
          }
        } else if (entity) {
          return {
            text: `Let me check your ${entity} bill. Please wait a moment.`,
            action: 'show_confirmation',
            data: { entity, type: 'bill_lookup' }
          }
        } else {
          return {
            text: `Which bill would you like to pay? I can help with electricity, water, gas, mobile, or credit card bills.`,
            action: 'show_help'
          }
        }

      case 'schedule_payment':
        if (entity && amount && date) {
          return {
            text: `I'll schedule your ${entity} payment of ₹${amount.toLocaleString()} for ${date}. Should I proceed?`,
            action: 'schedule_task',
            data: { entity, amount, date, type: 'scheduled_payment' }
          }
        } else {
          return {
            text: `To schedule a payment, please specify the bill type, amount, and date. For example, "Schedule electricity bill payment for 5th of every month".`,
            action: 'show_help'
          }
        }

      case 'setup_sip':
        if (amount) {
          return {
            text: `I'll help you set up a SIP of ₹${amount.toLocaleString()}${date ? ` starting ${date}` : ''}. Which mutual fund would you like to invest in?`,
            action: 'show_confirmation',
            data: { amount, date, type: 'sip_setup' }
          }
        } else {
          return {
            text: `To set up a SIP, please specify the amount. For example, "Set up a SIP of ₹5000 in equity funds".`,
            action: 'show_help'
          }
        }

      case 'check_balance':
        return {
          text: `Your current account balance is ₹45,670. Would you like to see a breakdown by account?`,
          action: 'show_dashboard',
          data: { type: 'balance_check' }
        }

      case 'show_payments':
        return {
          text: `You have 4 upcoming payments this month totaling ₹27,100. Your electricity bill is due tomorrow. Would you like me to show the complete list?`,
          action: 'show_dashboard',
          data: { type: 'payments_overview' }
        }

      case 'confirm_payment':
        return {
          text: `Payment confirmed. Processing your transaction now. You'll receive an OTP shortly.`,
          action: 'process_payment',
          data: { type: 'payment_confirmation' }
        }

      case 'cancel_payment':
        return {
          text: `Payment cancelled. Your transaction has been stopped. Is there anything else I can help you with?`,
          action: 'show_dashboard',
          data: { type: 'payment_cancelled' }
        }

      case 'help':
        return {
          text: `I can help you pay bills, schedule payments, set up SIPs, and check your account balance. Just say things like "Pay my electricity bill" or "Show my upcoming payments". What would you like to do?`,
          action: 'show_help'
        }

      default:
        return {
          text: `I didn't quite understand that. You can ask me to pay bills, schedule payments, set up investments, or check your balance. What would you like to do?`,
          action: 'show_help'
        }
    }
  }, [])

  return {
    processCommand,
    getResponse,
    isProcessing,
    lastProcessedCommand
  }
}