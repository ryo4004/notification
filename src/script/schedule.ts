import fetch from 'node-fetch'

import type { Schedule, EachSchedule } from '../types/schedule'

const getTodaySchedule = (schedule: Schedule): EachSchedule | false => {
  if (!schedule.today) {
    return false
  }
  return schedule.next
}

// 練習日程を取得する
;(async () => {
  const response = await fetch('https://api.winds-n.com/schedule', { method: 'POST' })
  const schedule: Schedule = await response.json()
  console.log({ schedule })
  const today = getTodaySchedule(schedule)
  console.log({ today })
})()
