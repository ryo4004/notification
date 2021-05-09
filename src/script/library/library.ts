import path from 'path'
import NeDB from 'nedb'

import { TokenDBData, TopicsKeys } from '../../types/token'

const tokenDB = new NeDB({
  filename: path.join(__dirname, '../../database/token.db'),
  autoload: true,
})

export const getAllTokens = (): Promise<TokenDBData[] | null> => {
  return new Promise((resolve) => {
    tokenDB.find({ status: true }, (error: any, docs: TokenDBData[] | null) => {
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
