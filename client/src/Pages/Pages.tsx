import { Login } from './Login/Login'
import { Home } from './Home/Home'
import { useAuthenticationContext } from '../hooks/useAuthentication'

export const Pages = () => {
  const { login } = useAuthenticationContext()
  if (login) {
    return <Home />
  } else {
    return <Login />
  }
}
