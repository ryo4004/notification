import path from 'path'
import NeDB from 'nedb'

import { createSenderClass } from '../library/sender'

import type { TopicsKeys } from '../types/token'

export type NotificationRequest = {
  status: boolean
  title: string
  body: string
  path: string
  topicKey: TopicsKeys
  immediately: boolean
}

type NotificationRequestDBData = NotificationRequest & {
  _id: string
  createdAt: string
  updatedAt: string
}

export const sendNotification = async (notification: NotificationRequest): Promise<true> => {
  const sender = await createSenderClass(notification.topicKey)
  sender.setNotification(notification.title, notification.body)
  sender.setPath(notification.path)
  sender.setAnalytics('notification')
  await sender.send()
  await sender.saveResult()
  return true
}

const getReservationDB = () => {
  return new NeDB({
    filename: path.join(__dirname, '../../database/reservation.db'),
    autoload: true,
    timestampData: true,
  })
}

export const insert = (newData: NotificationRequest): Promise<true | null> => {
  return new Promise((resolve) => {
    getReservationDB().insert(newData, (error) => {
      if (error) return resolve(null)
      resolve(true)
    })
  })
}

export const getAll = (): Promise<Array<NotificationRequestDBData> | null> => {
  return new Promise((resolve) => {
    getReservationDB()
      .find({})
      .sort({ createdAt: 1 })
      .exec((error: unknown, docs: Array<NotificationRequestDBData>) => {
        if (error) return resolve(null)
        resolve(docs)
      })
  })
}

export const requestRemove = (id: string): Promise<number | null> => {
  return new Promise((resolve) => {
    getReservationDB().remove({ _id: id }, {}, (error, num: number) => {
      if (error) return resolve(null)
      resolve(num)
    })
  })
}

export const removeAll = (): Promise<number | null> => {
  return new Promise((resolve) => {
    getReservationDB().remove({}, { multi: true }, (error, num: number) => {
      if (error) return resolve(null)
      resolve(num)
    })
  })
}
