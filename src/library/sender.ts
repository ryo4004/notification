import admin from 'firebase-admin'
import firebaseConfig from './secrets/firebase'
import {
  getAllTokens,
  getActiveTokens,
  getActiveTokensWithTopic,
  getTokensOnly,
  saveSent,
  getDateTime,
} from '../script/library/library'
import type { TopicsKeys } from '../types/token'

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(JSON.stringify(firebaseConfig))),
})

export const createSenderClass = async (topicKey: TopicsKeys): Promise<Sender> => {
  const sender = new Sender(topicKey)
  await sender.init()
  return sender
}

class Sender {
  topicKey: TopicsKeys
  title: string
  body: string
  path: string
  tokens: Array<string>
  analytics: string
  sendResult: admin.messaging.BatchResponse | null
  sendError: unknown
  error: string | null

  constructor(topicKey: TopicsKeys) {
    this.topicKey = topicKey
    this.title = ''
    this.body = ''
    this.path = ''
    this.tokens = []
    this.analytics = 'notification_winds'
    this.sendResult = null
    this.sendError = null
    this.error = null
  }

  async init(): Promise<void | false> {
    const allTokens = await getAllTokens()
    if (!allTokens || allTokens.length === 0) {
      this.error = 'no_tokens'
      return false
    }
    const activeTokens = getActiveTokens(allTokens)
    const activeTokensWithTopic = getActiveTokensWithTopic(activeTokens, this.topicKey)
    const tokens = getTokensOnly(activeTokensWithTopic)
    this.tokens = tokens
  }

  setNotification(title: string, body: string): void {
    this.title = title
    this.body = body
  }

  setTokens(tokens: string[]): void {
    this.tokens = tokens
  }

  setPath(path: string): void {
    this.path = path
  }

  setAnalytics(analytics: string): void {
    this.analytics = analytics
  }

  check(): boolean {
    if (this.title === '' || this.body === '') {
      console.log('no title or body')
      this.error = 'no_title_or_body'
      return false
    }
    if (this.tokens.length === 0) {
      console.log('no send target')
      this.error = 'no_send_target'
      return false
    }
    return true
  }

  async send(): Promise<boolean> {
    return new Promise((resolve) => {
      const available = this.check()
      if (!available) {
        this.error = 'not_available'
        return resolve(false)
      }
      if (this.error) {
        console.log('error')
        return resolve(false)
      }
      const message = {
        notification: {
          title: this.title,
          body: this.body,
        },
        data: {
          path: this.path,
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
            },
          },
          fcm_options: {
            image: 'https://winds-n.com/image/social/square.png',
          },
        },
        android: {
          notification: {
            sound: 'default',
            color: '#b60005',
            priority: 'high' as const,
          },
        },
        fcm_options: {
          analytics_label: this.analytics,
        },
        tokens: this.tokens,
      }
      admin
        .messaging()
        .sendMulticast(message)
        .then((response) => {
          console.log(response.successCount + ' messages were sent successfully')
          this.sendResult = response
          resolve(true)
        })
        .catch((error) => {
          console.log('Error sending message:', error)
          this.sendError = error
          resolve(false)
        })
    })
  }

  async saveResult(): Promise<void> {
    const newResult = {
      timestamp: getDateTime(),
      topicKey: this.topicKey,
      title: this.title,
      body: this.body,
      path: this.path,
      tokens: this.tokens,
      analytics: this.analytics,
      result: {
        sendResult: this.sendResult,
        sendError: this.sendError,
        error: this.error,
      },
    }
    await saveSent(newResult)
  }
}
