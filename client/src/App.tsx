import { Pages } from './Pages/Pages'

import { useAuthentication, AuthenticationContext } from './hooks/useAuthentication'

import './App.scss'
import React from 'react'

export const App = () => {
  return (
    <AuthenticationProvider>
      <Pages />
    </AuthenticationProvider>
  )
}

const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const authenticationState = useAuthentication()
  return <AuthenticationContext.Provider value={authenticationState}>{children}</AuthenticationContext.Provider>
}
