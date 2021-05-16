import { useState, useContext, createContext } from 'react'
import { noop } from '../library/noop'

type AuthenticationType = {
  login: boolean
  pass: string
  requestLogin: (pass: string) => void
  requestLogout: () => void
}

export const AuthenticationContext = createContext<AuthenticationType>({
  login: false,
  pass: '',
  requestLogin: noop,
  requestLogout: noop,
})

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext)
}

export const useAuthentication = (): AuthenticationType => {
  const [login, setLogin] = useState<boolean>(false)
  const [pass, setPass] = useState<string>('')
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
      setPass(pass)
    } else {
      setLogin(false)
      setPass('')
    }
  }
  const requestLogout = () => {
    setLogin(false)
    setPass('')
  }
  return { login, pass, requestLogin, requestLogout }
}
