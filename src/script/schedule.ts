import fetch from 'node-fetch'

import { createSenderClass } from './library/sender'
import { TOPICS_KEYS } from '../types/token'

import type { ScheduleList, EachSchedule } from '../types/schedule'

const getTodaySchedule = (schedule: ScheduleList): EachSchedule | false => {
  if (!schedule.today) {
    return false
  }
  return schedule.next
}

const getYear = (date: Date) => date.getFullYear()
const getMonth = (date: Date) => ('0' + (date.getMonth() + 1)).slice(-2)
const getDate = (date: Date) => ('0' + date.getDate()).slice(-2)
const getHour = (date: Date) => ('0' + date.getHours()).slice(-2)
const getMinute = (date: Date) => ('0' + date.getMinutes()).slice(-2)
// const getSeconds = (date: Date) => ('0' + date.getSeconds()).slice(-2)

const diffTodayWithSchedule = (scheduled: EachSchedule) => {
  const date = new Date()
  // 日付の比較
  const todayString = getYear(date) + '-' + getMonth(date) + '-' + getDate(date)
  if (scheduled.date !== todayString) {
    return false
  }
  // 時刻の比較
  const hour = getHour(date) + ':' + getMinute(date)
  const scheduledStartTime = scheduled.time.start
  if (scheduledStartTime !== hour) {
    return false
  }
  return true
}

// 練習日程を取得する
// 必ず1時間に1回動かす
;(async () => {
  const response = await fetch('https://api.winds-n.com/schedule', { method: 'POST' })
  const scheduleList: ScheduleList = await response.json()
  const scheduled = getTodaySchedule(scheduleList)
  if (!scheduled) {
    console.log('not today')
    return false
  }
  const available = diffTodayWithSchedule(scheduled)
  if (!available) {
    console.log('not present time')
    return false
  }
  const sender = await createSenderClass(TOPICS_KEYS.IMPORTANT_SCHEDULE)
  sender.setNotification('テスト', 'おためし')
  sender.setPath('/practice')
  sender.setAnalytics('notification_practice')
  sender.send()
})()
