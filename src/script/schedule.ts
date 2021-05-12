import fetch from 'node-fetch'

// 練習日程を取得する
;(async () => {
  const response = await fetch('https://api.winds-n.com/schedule', { method: 'POST' })
  const schedule = await response.json()
  console.log({ schedule })
})()
