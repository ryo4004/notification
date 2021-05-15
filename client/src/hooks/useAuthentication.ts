import { useState, useContext, createContext } from 'react'
import { noop } from '../library/noop'

type AuthenticationType = {
  login: boolean
  requestLogin: (pass: string) => void
  requestLogout: () => void
}

export const AuthenticationContext = createContext<AuthenticationType>({
  login: false,
  requestLogin: noop,
  requestLogout: noop,
})

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext)
}

export const useAuthentication = (): AuthenticationType => {
  const [login, setLogin] = useState<boolean>(false)
  const requestLogin = async (pass: string) => {
    const response = await fetch('/manager/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pass }),
    })
    const json = await response.json()
    if (json.status) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }
  const requestLogout = () => {
    setLogin(false)
  }
  return { login, requestLogin, requestLogout }
}
