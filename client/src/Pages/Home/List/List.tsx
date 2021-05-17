import { useStatusContext } from '../../../hooks/useStatus'

export const List = () => {
  const { loading, fetched, content, requestRemove } = useStatusContext()
  return (
    <div>
      <h2>送信予約</h2>
      {loading && '読み込み中'}
      {!loading && fetched && content.reserved.length === 0 && <>送信予約はありません</>}
      {!loading &&
        fetched &&
        content.reserved.map((n) => {
          return (
            <div className="notification">
              <div className="title">{n.title}</div>
              <div>
                {n.body.split('\n').map((b) => (
                  <div>{b}</div>
                ))}
              </div>
              <button onClick={() => requestRemove(n._id)}>削除</button>
            </div>
          )
        })}
      <h2>送信履歴</h2>
      {!loading && fetched && content.sent.length === 0 && <>送信履歴はありません</>}
      {!loading &&
        fetched &&
        content.sent.map((n) => {
          return (
            <div className="notification">
              <div>{n.timestamp}</div>
              <div className="title">{n.title}</div>
              <div>
                {n.body.split('\n').map((b) => (
                  <div>{b}</div>
                ))}
              </div>
            </div>
          )
        })}
    </div>
  )
}
