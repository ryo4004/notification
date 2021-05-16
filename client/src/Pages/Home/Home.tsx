import { useAuthenticationContext } from '../../hooks/useAuthentication'
import { useSentNotification } from './hooks/useSentNotification'

export const Home = () => {
  const { pass, requestLogout } = useAuthenticationContext()
  const { loading, content } = useSentNotification(pass)
  return (
    <>
      <h2>通知管理ページ</h2>
      <button onClick={() => requestLogout()}>ログアウト</button>
      <div>
        {loading && '読み込み中'}
        {!loading &&
          content.map((n) => {
            return (
              <>
                <div>{n.timestamp}</div>
                <div>{n.title}</div>
                <div>
                  {n.body.split('\n').map((b) => (
                    <div>{b}</div>
                  ))}
                </div>
              </>
            )
          })}
      </div>
    </>
  )
}
