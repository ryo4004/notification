import path from 'path'
import NeDB from 'nedb'

import { Sender } from './sender'

import type { TokenDBData, TopicsKeys } from '../types/token'

const tokenDB = new NeDB({
  filename: path.join(__dirname, '../../database/token.db'),
  autoload: true,
})

const getAllTokens = (): Promise<TokenDBData[] | null> => {
  return new Promise((resolve) => {
    tokenDB.find({ status: true }, (error: any, docs: TokenDBData[] | null) => {
      if (error) return resolve(null)
      resolve(docs)
    })
  })
}

const send = async () => {
  const allTokens = await getAllTokens()
  if (!allTokens || allTokens.length === 0) {
    return console.log('no tokens')
  }
  const activeTokens = getActiveTokens(allTokens)
  const activeTokensWithTopic = getActiveTokensWithTopic(activeTokens, 'importantSchedule')
  const tokens = getTokensOnly(activeTokensWithTopic)
  const sender = new Sender()
  sender.setNotification('テスト', 'おためし')
  sender.setPath('/practice')
  sender.setTokens(tokens)
  sender.send()
}

const getActiveTokens = (tokens: TokenDBData[]): TokenDBData[] => {
  return tokens.filter((t) => t.status === true)
}

const getTokensOnly = (tokens: TokenDBData[]): string[] => {
  return tokens.map((t) => t.token)
}

const getActiveTokensWithTopic = (tokens: TokenDBData[], key: TopicsKeys): TokenDBData[] => {
  return tokens.filter((t) => t.topics[key] === true)
}

send()
