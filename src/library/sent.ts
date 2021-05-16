import path from 'path'
import NeDB from 'nedb'

import type { SentDBData } from '../types/token'

const sentDB = new NeDB({
  filename: path.join(__dirname, '../../database/sent.db'),
  autoload: true,
  timestampData: true,
})

export const getAll = (): Promise<Array<SentDBData> | null> => {
  return new Promise((resolve) => {
    sentDB
      .find({})
      .sort({ createdAt: -1 })
      .exec((error: unknown, docs: Array<SentDBData>) => {
        if (error) return resolve(null)
        resolve(docs)
      })
  })
}
