import { Sender } from './library/sender'
import { getAllTokens, getActiveTokens, getActiveTokensWithTopic, getTokensOnly } from './library/library'

// 通知を作成して送信する
;(async () => {
  const allTokens = await getAllTokens()
  if (!allTokens || allTokens.length === 0) {
    return console.log('no tokens')
  }
  const activeTokens = getActiveTokens(allTokens)
  const activeTokensWithTopic = getActiveTokensWithTopic(activeTokens, 'importantSchedule')
  const tokens = getTokensOnly(activeTokensWithTopic)
  const sender = new Sender()
  sender.setNotification('テスト', 'おためし')
  sender.setPath('/practice')
  sender.setAnalytics('notification_practice')
  sender.setTokens(tokens)
  sender.send()
})()
