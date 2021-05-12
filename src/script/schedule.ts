import fetch from 'node-fetch'

import type { Schedule, EachSchedule } from '../types/schedule'

const getTodaySchedule = (schedule: Schedule): EachSchedule | false => {
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
const getSeconds = (date: Date) => ('0' + date.getSeconds()).slice(-2)

const formattedDateTime = (date: Date) => {
  return (
    getYear(date) +
    '年' +
    getMonth(date) +
    '月' +
    getDate(date) +
    '日' +
    getHour(date) +
    '時' +
    getMinute(date) +
    '分' +
    getSeconds(date) +
    '秒'
  )
}


// 練習日程を取得する
;(async () => {
  const response = await fetch('https://api.winds-n.com/schedule', { method: 'POST' })
  const schedule: Schedule = await response.json()
  console.log({ schedule })
  const today = getTodaySchedule(schedule)
  console.log({ today })
  const date = new Date()
  const currentTime = formattedDateTime(date)
  console.log(currentTime)
})()
