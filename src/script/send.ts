import { createSenderClass } from './library/sender'
import { TOPICS_KEYS } from '../types/token'

// 通知を作成して送信する
;(async () => {
  const sender = await createSenderClass(TOPICS_KEYS.IMPORTANT_SCHEDULE)
  sender.setNotification('テスト', 'おためし')
  sender.setPath('/practice')
  sender.setAnalytics('notification_practice')
  const result = await sender.send()
  console.log({ result })
})()
