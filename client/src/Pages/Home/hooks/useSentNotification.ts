import { useState, useEffect } from 'react'

export type Topics = {
  importantSchedule: boolean // 練習開始時刻に通知
  importantManager: boolean // 事務局からのお知らせを更新したら通知
  scheduleUpdate: boolean // 練習日程を更新したら通知
  historyUpdate: boolean // 練習の記録を更新したら通知
  othersUpdate: boolean // その他の更新をしたら通知
}

export type TopicsKeys = keyof Topics

export type SentData = {
  timestamp: string
  topicKey: TopicsKeys
  title: string
  body: string
  path: string
  tokens: Array<string>
  analytics: string
  result: {
    sendResult: unknown | null
    sendError: unknown
    error: string | null
  }
}

type UseSentNotificationState = {
  loading: boolean
  content: Array<SentData>
}

export const useSentNotification = (pass: string) => {
  const [state, setState] = useState<UseSentNotificationState>({
    loading: false,
    content: [],
  })
  useEffect(() => {
    ;(async () => {
      if (pass === '') return false
      setState((state) => ({ ...state, loading: true }))
      const response = await fetch('/manager/sent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pass }),
      })
      const json = await response.json()
      if (json.status) {
        setState((state) => ({ ...state, loading: false, content: json.data }))
      } else {
        setState((state) => ({ ...state, loading: false, content: [] }))
      }
    })()
  }, [pass])
  return { ...state }
}
