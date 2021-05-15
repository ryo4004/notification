import { useState } from 'react'
import { useAuthenticationContext } from '../../hooks/useAuthentication'
import './Login.scss'

export const Login = () => {
  const [pass, setPass] = useState<string>('')
  const { requestLogin } = useAuthenticationContext()
  return (
    <div>
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && requestLogin(pass)}
      />
      <button onClick={() => requestLogin(pass)}>送信</button>
    </div>
  )
}
