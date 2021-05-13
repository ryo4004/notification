import fetch from 'node-fetch'

import { createSenderClass } from './library/sender'
import { getTodaySchedule, validateToday } from './library/schedule'
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
  const available = validateToday(scheduled)
  if (!available) {
    console.log('[schedule] done: not present time')
    return false
  }
  const startTime = scheduled.time.start
  const { place, studio } = scheduled
  const sender = await createSenderClass(TOPICS_KEYS.IMPORTANT_SCHEDULE)
  sender.setNotification('練習のお知らせ', '今日 ' + startTime + '\n' + place + ' ' + studio)
  sender.setPath('/practice')
  sender.setAnalytics('notification_practice')
  await sender.send()
  await sender.saveResult()
  console.log('[schedule] done: sent' + getDateTime())
})()
