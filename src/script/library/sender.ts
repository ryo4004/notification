import admin from 'firebase-admin'
import firebaseConfig from './firebase/config'
import { getAllTokens, getActiveTokens, getActiveTokensWithTopic, getTokensOnly } from './library'
import type { TopicsKeys } from '../../types/token'

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

  constructor(topicKey: TopicsKeys) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(JSON.stringify(firebaseConfig))),
    })
    this.topicKey = topicKey
    this.title = ''
    this.body = ''
    this.path = ''
    this.tokens = []
    this.analytics = 'notification_winds'
  }

  async init(): Promise<void | false> {
    const allTokens = await getAllTokens()
    if (!allTokens || allTokens.length === 0) {
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
      return false
    }
    if (this.tokens.length === 0) {
      console.log('no send target')
      return false
    }
    return true
  }

  send(): void | false {
    const available = this.check()
    if (!available) {
      return false
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
      })
      .catch((error) => {
        console.log('Error sending message:', error)
      })
  }
}
