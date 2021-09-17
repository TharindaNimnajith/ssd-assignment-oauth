import {createContext} from 'react'

export const AppContext = createContext({
  loginData: null,
  isAuthenticated: false,
  login: async () => {
  },
  logout: async () => {
  }
})
