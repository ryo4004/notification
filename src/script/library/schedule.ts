import { getYear, getMonth, getDate, getHour, getMinute } from './library'

import type { ScheduleList, EachSchedule } from '../../types/schedule'

export const getTodaySchedule = (schedule: ScheduleList): EachSchedule | false => {
  if (!schedule.today) {
    return false
  }
  return schedule.next
}

export const getTodayString = () => {
  const date = new Date()
  return getYear(date) + '-' + getMonth(date) + '-' + getDate(date)
}

export const getPresentTimeString = () => {
  const date = new Date()
  return getHour(date) + ':' + getMinute(date)
}

export const validateToday = (scheduled: EachSchedule, todayString: string, presentTimeString: string) => {
  // 日付の比較
  if (scheduled.date !== todayString) {
    return false
  }
  // 時刻の比較
  const scheduledStartTime = scheduled.time.start
  if (scheduledStartTime !== presentTimeString) {
    return false
  }
  return true
}

export const getNotificationBody = (scheduled: EachSchedule) => {
  const startTime = scheduled.time.start
  const { place, studio } = scheduled
  return '今日 ' + startTime + '\n' + place + ' ' + studio
}
