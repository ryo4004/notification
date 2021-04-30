import request from 'superagent'
import type { Session } from '../types/auth'

const authUrl = 'https://auth.winds-n.com/auth'

export const auth = (session: Session): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    request
      .post(authUrl)
      .type('form')
      .send({ session })
      .end((error, response) => {
        if (response.body.status) {
          resolve(true)
        } else {
          reject(false)
        }
      })
  })
}
