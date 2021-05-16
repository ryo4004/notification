import { Login } from './Login/Login'
import { Home } from './Home/Home'
import { useAuthenticationContext } from '../hooks/useAuthentication'
import { useStatus, StatusContext } from '../hooks/useStatus'

export const Pages = () => {
  const { login, pass } = useAuthenticationContext()
  if (login) {
    return (
      <StatusProvider pass={pass}>
        <Home />
      </StatusProvider>
    )
  } else {
    return <Login />
  }
}

const StatusProvider = ({ children, pass }: { children: React.ReactNode; pass: string }) => {
  const statusState = useStatus(pass)
  return <StatusContext.Provider value={statusState}>{children}</StatusContext.Provider>
}
