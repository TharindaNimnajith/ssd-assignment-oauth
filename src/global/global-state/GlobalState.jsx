import React, {useState} from 'react'
import {AppContext} from '../AppContext'

export const GlobalState = props => {
  const [loginData, setLoginData] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async data => {
    setLoginData(data)
    setIsAuthenticated(true)
  }

  const logout = async () => {
    setLoginData(null)
    setIsAuthenticated(false)
  }

  return (
    <AppContext.Provider value={{
      loginData: loginData,
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout
    }}>
      {props.children}
    </AppContext.Provider>
  )
}
