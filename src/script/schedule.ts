import fetch from 'node-fetch'

import { createSenderClass } from '../library/sender'
import {
  getTodaySchedule,
  getTodayString,
  getPresentTimeString,
  validateToday,
  getNotificationBody,
} from './library/schedule'
import { getDateTime } from './library/library'
import { TOPICS_KEYS } from '../types/token'

import type { ScheduleList } from '../types/schedule'

// 練習日程を取得する
// 必ず1時間に1回動かす
;(async () => {
  console.log('[schedule] start: ' + getDateTime())
  const response = await fetch('https://api.winds-n.com/schedule', { method: 'POST' })
  const scheduleList: ScheduleList = await response.json()
  const scheduled = getTodaySchedule(scheduleList)
  if (!scheduled) {
    console.log('[schedule] done: not today')
    return false
  }
  const todayString = getTodayString()
  const presentTimeString = getPresentTimeString()
  const available = validateToday(scheduled, todayString, presentTimeString)
  if (!available) {
    console.log('[schedule] done: not present time')
    return false
  }
  const notificationBody = getNotificationBody(scheduled)
  const sender = await createSenderClass(TOPICS_KEYS.IMPORTANT_SCHEDULE)
  sender.setNotification('練習のお知らせ', notificationBody)
  sender.setPath('/practice')
  sender.setAnalytics('notification_practice')
  await sender.send()
  await sender.saveResult()
  console.log('[schedule] done: sent, ' + getDateTime())
})()
