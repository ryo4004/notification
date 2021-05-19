import { useStatusContext } from '../../../hooks/useStatus'

import { TOPICS_KEYS, TOPICS_LABEL } from '../../../types/notification'
import { showTime } from '../../../library/library'
import type { TopicsKeysKey } from '../../../types/notification'

import './List.scss'

export const List = () => {
  const { loading, fetched, content, requestRemove } = useStatusContext()
  return (
    <div className="list">
      <h2>送信予約</h2>
      {loading && '読み込み中'}
      {!loading && fetched && content.reserved.length === 0 && <>送信予約はありません</>}
      {!loading &&
        fetched &&
        content.reserved.map((n) => {
          const label = (Object.keys(TOPICS_KEYS) as TopicsKeysKey[]).find((t) => TOPICS_KEYS[t] === n.topic)
          return (
            <details className="notification">
              <summary>
                <div className="icon">
                  <img src="icon.png" />
                  <span>ウィンズ</span>
                  <span>明日 10時</span>
                </div>
                <div className="title">{n.title}</div>
                <div>
                  {n.body.split('\n').map((b) => (
                    <div>{b}</div>
                  ))}
                </div>
              </summary>
              <div className="details">
                <label>登録時刻</label>
                <div>{showTime(n.createdAt)}</div>
                <label>予定時刻</label>
                <div>直近の10:00</div>
                <label>パス</label>
                <div>{n.path}</div>
                <label>カテゴリ</label>
                <div>{label && TOPICS_LABEL[label]}</div>
                <button onClick={() => requestRemove(n._id)}>削除</button>
              </div>
            </details>
          )
        })}
      <h2>送信履歴</h2>
      {!loading && fetched && content.sent.length === 0 && <>送信履歴はありません</>}
      {!loading &&
        fetched &&
        content.sent.map((n) => {
          const label = (Object.keys(TOPICS_KEYS) as TopicsKeysKey[]).find((t) => TOPICS_KEYS[t] === n.topicKey)
          return (
            <details className="notification">
              <summary>
                <div className="icon">
                  <img src="icon.png" />
                  <span>ウィンズ</span>
                  <span>{showTime(n.timestamp)}</span>
                </div>
                <div className="title">{n.title}</div>
                <div>
                  {n.body.split('\n').map((b) => (
                    <div>{b}</div>
                  ))}
                </div>
              </summary>
              <div className="details">
                <label>送信時刻</label>
                <div>{showTime(n.timestamp)}</div>
                <label>パス</label>
                <div>{n.path}</div>
                <label>カテゴリ</label>
                <div>{label && TOPICS_LABEL[label]}</div>
                <label>対象数</label>
                <div>{n.tokens.length}</div>
                <label>成功数</label>
                <div>{n.result.sendResult?.successCount || 0}</div>
                <label>失敗数</label>
                <div>{n.result.sendResult?.failureCount || 0}</div>
                <label>エラー</label>
                <div>
                  {Boolean(n.result.sendError) && <>エラー</>}
                  {!Boolean(n.result.sendError) && <>なし</>}
                </div>
              </div>
            </details>
          )
        })}
    </div>
  )
}
