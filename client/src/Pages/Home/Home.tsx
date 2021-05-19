import { Add } from './Add/Add'
import { List } from './List/List'
import { useAuthenticationContext } from '../../hooks/useAuthentication'

import './Home.scss'

export const Home = () => {
  const { requestLogout } = useAuthenticationContext()
  return (
    <div className="home">
      <header>
        <h2>通知管理ページ</h2>
        <div onClick={() => requestLogout()} className="logout">
          ログアウト
        </div>
      </header>
      <Add />
      <List />
    </div>
  )
}
