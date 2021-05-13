import path from 'path'
import NeDB from 'nedb'
import admin from 'firebase-admin'

import { TokenDBData, TopicsKeys } from '../../types/token'

const tokenDB = new NeDB({
  filename: path.join(__dirname, '../../../database/token.db'),
  autoload: true,
})

export const getAllTokens = (): Promise<TokenDBData[] | null> => {
  return new Promise((resolve) => {
    tokenDB.find({ status: true }, (error: unknown, docs: TokenDBData[] | null) => {
      if (error) return resolve(null)
      resolve(docs)
    })
  })
}

export const getActiveTokens = (tokens: TokenDBData[]): TokenDBData[] => {
  return tokens.filter((t) => t.status === true)
}

export const getTokensOnly = (tokens: TokenDBData[]): string[] => {
  return tokens.map((t) => t.token)
}

export const getActiveTokensWithTopic = (tokens: TokenDBData[], key: TopicsKeys): TokenDBData[] => {
  return tokens.filter((t) => t.topics[key] === true)
}

const sentDB = new NeDB({
  filename: path.join(__dirname, '../../../database/sent.db'),
  autoload: true,
})

type SentData = {
  topicKey: TopicsKeys
  title: string
  body: string
  path: string
  tokens: Array<string>
  analytics: string
  result: {
    sendResult: admin.messaging.BatchResponse | null
    sendError: any
    error: string | null
  }
}

export const saveSent = (newData: SentData): Promise<true | null> => {
  return new Promise((resolve) => {
    sentDB.insert(newData, (error) => {
      if (error) return resolve(null)
      resolve(true)
    })
  })
}

export const getYear = (date: Date) => date.getFullYear()
export const getMonth = (date: Date) => ('0' + (date.getMonth() + 1)).slice(-2)
export const getDate = (date: Date) => ('0' + date.getDate()).slice(-2)
export const getHour = (date: Date) => ('0' + date.getHours()).slice(-2)
export const getMinute = (date: Date) => ('0' + date.getMinutes()).slice(-2)
const getSeconds = (date: Date) => ('0' + date.getSeconds()).slice(-2)

export const getDateTime = (date: Date) => {
  return (
    getYear(date) +
    '-' +
    getMonth(date) +
    '-' +
    getDate(date) +
    'T' +
    getHour(date) +
    ':' +
    getMinute(date) +
    ':' +
    getSeconds(date)
  )
}