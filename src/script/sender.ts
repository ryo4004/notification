import admin from 'firebase-admin'
import { firebaseConfig } from 'secrets/firebase/config'

export class Sender {
  title: string
  body: string
  path: string
  tokens: Array<string>
  available: boolean

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(JSON.stringify(firebaseConfig))),
    })
    this.title = ''
    this.body = ''
    this.path = ''
    this.tokens = []
    this.available = false
  }

  setNotification(title: string, body: string) {
    this.title = title
    this.body = body
  }

  setTokens(tokens: string[]) {
    this.tokens = tokens
  }

  setPath(path: string) {
    this.path = path
  }

  check() {
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

  send() {
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
          priority: 'high' as 'high',
        },
      },
      fcm_options: {
        analytics_label: 'notification_winds',
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
