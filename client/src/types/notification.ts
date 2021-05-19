type Topics = {
  importantSchedule: boolean // 練習開始時刻に通知
  importantManager: boolean // 事務局からのお知らせを更新したら通知
  scheduleUpdate: boolean // 練習日程を更新したら通知
  historyUpdate: boolean // 練習の記録を更新したら通知
  othersUpdate: boolean // その他の更新をしたら通知
}

export type TopicsKeys = keyof Topics

export const TOPICS_KEYS = {
  IMPORTANT_SCHEDULE: 'importantSchedule',
  IMPORTANT_MANAGER: 'importantManager',
  SCHEDULE_UPDATE: 'scheduleUpdate',
  HISTORY_UPDATE: 'historyUpdate',
  OTHERS_UPDATE: 'othersUpdate',
} as const

type TopicsKeysType = typeof TOPICS_KEYS

export type TopicsKeysKey = keyof TopicsKeysType

export const TOPICS_LABEL = {
  IMPORTANT_SCHEDULE: '重要: 練習開始を通知',
  IMPORTANT_MANAGER: '重要: 事務局からのお知らせを通知',
  SCHEDULE_UPDATE: '練習日程の更新を通知',
  HISTORY_UPDATE: '練習の記録の更新を通知',
  OTHERS_UPDATE: 'その他の更新を通知',
}

type NotificationRequest = {
  title: string
  body: string
  path: string
  topicKey: TopicsKeys
  immediately: boolean
}

export type NotificationRequestDBData = NotificationRequest & {
  _id: string
  createdAt: string
  updatedAt: string
}

// admin.messaging.BatchResponse は使わない
type SendResult = {
  failureCount: number
  responses: any
  successCount: number
}

type SentData = {
  timestamp: string
  topicKey: TopicsKeys
  title: string
  body: string
  path: string
  tokens: Array<string>
  analytics: string
  result: {
    sendResult: SendResult | null
    sendError: unknown | null
    error: string | null
  }
}

export type SentDBData = SentData & {
  _id: string
  createdAt: string
  updatedAt: string
}
