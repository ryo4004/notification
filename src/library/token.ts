import path from 'path'
import NeDB from 'nedb'

import type { Topics, TokenData, TokenDBData } from '../types/token'

const tokenDB = new NeDB({
  filename: path.join(__dirname, '../database/token.db'),
  autoload: true,
})

const defaultTopics: Topics = {
  schedule: true, // scheduleのみ有効
  scheduleUpdate: false,
  sourceUpdate: false,
  historyUpdate: false,
  managerUpdate: false,
  archiveUpdate: false,
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
      topics: null,
    }
  }
}

export const updateToken = async (
  id: string,
  useragent: string,
  token: string,
  status: boolean
): Promise<TokenData | null> => {
  const tokenData = await find(token)
  if (tokenData) {
    // 既に有効にしたことがある
    const newData = {
      ...tokenData,
      status,
    }
    const updateResult = await update(tokenData._id, newData)
    if (!updateResult) return null
    return newData
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
    if (!insertResult) return null
    return newData
  }
}
