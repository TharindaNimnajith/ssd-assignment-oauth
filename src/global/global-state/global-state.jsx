import React, {useState} from 'react'
import {AppContext} from '../app-context'
import './global-state.css'

export const GlobalState = props => {
  const [loginData, setLoginData] = useState(null)

  const login = async data => {
    setLoginData(data)
  }

  const logout = async () => {
    setLoginData(null)
  }

  return (
    <AppContext.Provider value={{
      loginData: loginData,
      login: login,
      logout: logout
    }}>
      {props.children}
    </AppContext.Provider>
  )
}
