import { Add } from './Add/Add'
import { List } from './List/List'
import { useAuthenticationContext } from '../../hooks/useAuthentication'

import './Home.scss'

export const Home = () => {
  const { requestLogout } = useAuthenticationContext()
  return (
    <div className="home">
      <h2>通知管理ページ</h2>
      <button onClick={() => requestLogout()}>ログアウト</button>
      <Add />
      <List />
    </div>
  )
}
