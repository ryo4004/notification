import { useAuthenticationContext } from '../../hooks/useAuthentication'

export const Home = () => {
  const { requestLogout } = useAuthenticationContext()
  return (
    <>
      <h2>通知管理ページ</h2>
      <button onClick={() => requestLogout()}>ログアウト</button>
    </>
  )
}
