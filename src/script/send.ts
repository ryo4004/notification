import { createSenderClass } from '../library/sender'
import { getAll, removeAll } from '../library/send'
import { getDateTime } from './library/library'

// 通知を作成して送信する
;(async () => {
  console.log('[send] start: ' + getDateTime())
  const reserved = await getAll()
  if (!reserved || reserved.length === 0) {
    console.log('[send] done: no reserved')
    return false
  }
  reserved.forEach((each, i) => {
    // 通知の数 * 100ms ごとに送信処理を行う
    // setTimeoutでNeDBのファイル読み込みエラーを回避する
    setTimeout(async () => {
      const notification = each
      const sender = await createSenderClass(notification.topicKey)
      sender.setNotification(notification.title, notification.body)
      sender.setPath(notification.path)
      await sender.send()
      await sender.saveResult()
      console.log('[send] done: ' + (i + 1) + ' / ' + reserved.length + ' sent: ' + getDateTime())
    }, i * 100)
  })
  await removeAll()
})()
