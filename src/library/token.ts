import path from 'path'
import NeDB from 'nedb'

import type { Topics, TopicsKeys, TokenData, TokenDBData } from '../types/token'

const tokenDB = new NeDB({
  filename: path.join(__dirname, '../database/token.db'),
  autoload: true,
})

const defaultTopics: Topics = {
  importantSchedule: true,
  importantManager: true,
  scheduleUpdate: false,
  historyUpdate: false,
  othersUpdate: false,
}

const find = (token: string): Promise<TokenDBData | null> => {
  return new Promise((resolve) => {
    tokenDB.findOne({ token }, (error, doc) => {
      if (error) return resolve(null)
      resolve(doc)
    })
  })
}

const insert = (newData: TokenData): Promise<true | null> => {
  return new Promise((resolve) => {
    tokenDB.insert(newData, (error) => {
      if (error) return resolve(null)
      resolve(true)
    })
  })
}

const update = (_id: string, newData: TokenData): Promise<number | null> => {
  return new Promise((resolve) => {
    tokenDB.update({ _id }, newData, {}, (error, num) => {
      if (error) return resolve(null)
      resolve(num)
    })
  })
}

export const getStatus = async (token: string) => {
  const tokenData = await find(token)
  if (tokenData) {
    return {
      status: tokenData.status,
      token: tokenData.token,
      topics: tokenData.topics,
    }
  } else {
    return {
      status: false,
      token: '',
      topics: {},
    }
  }
}

export const updateToken = async (
  id: string,
  useragent: string,
  token: string,
  status: boolean
): Promise<{ result: TokenData | null; error: boolean }> => {
  const tokenData = await find(token)
  if (tokenData) {
    // 既に有効にしたことがある
    const newData = {
      ...tokenData,
      status,
    }
    const updateResult = await update(tokenData._id, newData)
    if (!updateResult) return { result: null, error: true }
    return { result: newData, error: false }
  } else {
    // 初めて有効にする
    const newData: TokenData = {
      token,
      status,
      id,
      useragent,
      topics: defaultTopics,
    }
    const insertResult = await insert(newData)
    if (!insertResult) return { result: null, error: true }
    return { result: newData, error: false }
  }
}

export const updateTopic = async (token: string, topicName: TopicsKeys) => {
  const tokenData = await find(token)
  if (!tokenData) return { result: null, error: true }
  const newTokenData = {
    ...tokenData,
    topics: {
      ...tokenData.topics,
      [topicName]: !tokenData.topics[topicName],
    },
  }
  const updateResult = await update(tokenData._id, newTokenData)
  if (!updateResult) return { result: null, error: true }
  return { result: newTokenData, error: false }
}
