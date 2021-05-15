import request from 'superagent'
import crypto from 'crypto'

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

export const getHash = (pass: string): string => {
  const salt = '::HXAuymPGKKcThn6n'
  const hashsum = crypto.createHash('sha512')
  hashsum.update(pass + salt)
  return hashsum.digest('hex')
}
