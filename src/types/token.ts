export type Topics = {
  importantSchedule: boolean // 練習開始時刻に通知
  importantManager: boolean // 事務局からのお知らせを更新したら通知
  scheduleUpdate: boolean // 練習日程を更新したら通知
  historyUpdate: boolean // 練習の記録を更新したら通知
  othersUpdate: boolean // その他の更新をしたら通知
}

export const TOPICS_KEYS = {
  IMPORTANT_SCHEDULE: 'importantSchedule',
  IMPORTANT_MANAGER: 'importantManager',
  SCHEDULE_UPDATE: 'scheduleUpdate',
  HISTORY_UPDATE: 'historyUpdate',
  OTHERS_UPDATE: 'othersUpdate',
} as const

export type TopicsKeys = keyof Topics

export type TokenData = {
  token: string // 一意
  status: boolean // プッシュ通知の有効/無効
  id: string // 重複あり
  useragent: string
  topics: Topics
}

export type TokenDBData = TokenData & {
  _id: string
}

export type StatusReturnType = {
  status: boolean
  token: string
  topics: Topics | null
}
