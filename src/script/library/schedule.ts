import { getYear, getMonth, getDate, getHour, getMinute } from './library'

import type { ScheduleList, EachSchedule } from '../../types/schedule'

export const getTodaySchedule = (schedule: ScheduleList): EachSchedule | false => {
  if (!schedule.today) {
    return false
  }
  return schedule.next
}

export const validateToday = (scheduled: EachSchedule) => {
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
