import fetch from 'node-fetch'

import type { Schedule } from '../types/schedule'

// 練習日程を取得する
;(async () => {
  const response = await fetch('https://api.winds-n.com/schedule', { method: 'POST' })
  const schedule: Schedule = await response.json()
  console.log({ schedule })
})()
