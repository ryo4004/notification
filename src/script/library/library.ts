import path from 'path'
import NeDB from 'nedb'

import { TokenDBData, TopicsKeys, SentData } from '../../types/token'

export const getAllTokens = (databasePath = '../../../database/token.db'): Promise<TokenDBData[] | null> => {
  const tokenDB = new NeDB({
    filename: path.join(__dirname, databasePath),
    autoload: true,
    timestampData: true,
  })
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

export const saveSent = (newData: SentData, databasePath = '../../../database/sent.db'): Promise<true | null> => {
  const sentDB = new NeDB({
    filename: path.join(__dirname, databasePath),
    autoload: true,
    timestampData: true,
  })
  return new Promise((resolve) => {
    sentDB.insert(newData, (error) => {
      if (error) return resolve(null)
      resolve(true)
    })
  })
}

export const getYear = (date: Date): string => String(date.getFullYear())
export const getMonth = (date: Date): string => ('0' + (date.getMonth() + 1)).slice(-2)
export const getDate = (date: Date): string => ('0' + date.getDate()).slice(-2)
export const getHour = (date: Date): string => ('0' + date.getHours()).slice(-2)
export const getMinute = (date: Date): string => ('0' + date.getMinutes()).slice(-2)
const getSeconds = (date: Date): string => ('0' + date.getSeconds()).slice(-2)

export const getDateTime = (): string => {
  const date = new Date()
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
