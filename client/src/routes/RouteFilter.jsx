import React, {useContext, useEffect, useState} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {AppContext} from '../global/AppContext'
import {checkUserInLocalStorage} from '../helpers/helpers'
import {Loader} from '../components/loader/Loader'
import './RouteFilter.css'

// Handle the authorization for routing
export const RouteFilter = ({component: Component, needAuthentication, ...rest}) => {
  const appContext = useContext(AppContext)

  const [authenticated, setAuthenticated] = useState(null)

  useEffect(() => {
    const localStorageData = checkUserInLocalStorage()
    if (localStorageData.status === true) {
      appContext.login(localStorageData.result).then(() => {
      })
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
  }, [Component])

  return (
    <Route {...rest}
           render={
             props => {
               if (needAuthentication && authenticated === null) {
                 return (
                   <Loader/>
                 )
               } else if (needAuthentication && !authenticated) {
                 return (
                   <Redirect to='/'/>
                 )
               } else if (!needAuthentication && authenticated) {
                 return (
                   <Redirect to='/home'/>
                 )
               } else if (!needAuthentication || authenticated) {
                 return (
                   <Component {...props} />
                 )
               }
             }}/>
  )
}
