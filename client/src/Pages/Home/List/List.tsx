import { useStatusContext } from '../../../hooks/useStatus'

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
              <button onClick={() => requestRemove(n._id)}>削除</button>
            </details>
          )
        })}
      <h2>送信履歴</h2>
      {!loading && fetched && content.sent.length === 0 && <>送信履歴はありません</>}
      {!loading &&
        fetched &&
        content.sent.map((n) => {
          return (
            <details className="notification">
              <summary>
                <div className="icon">
                  <img src="icon.png" />
                  <span>ウィンズ</span>
                  <span>{n.timestamp}</span>
                </div>
                <div className="title">{n.title}</div>
                <div>
                  {n.body.split('\n').map((b) => (
                    <div>{b}</div>
                  ))}
                </div>
              </summary>
            </details>
          )
        })}
    </div>
  )
}
