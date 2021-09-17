import {createContext} from 'react'

export const AppContext = createContext({
  loginData: null,
  login: async () => {
  },
  logout: async () => {
  }
})
