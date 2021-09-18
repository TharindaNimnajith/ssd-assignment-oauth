import React, {Component, Fragment} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {RouteFilter} from './routes/RouteFilter'
import {NotFound} from './pages/not-found/NotFound'
import Login from './pages/login/Login'
import TaskApp from './pages/task-app/TaskApp'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Switch>
            <RouteFilter path='/'
                         exact
                         needAuthentication={false}
                         component={Login}/>
            <RouteFilter path='/home'
                         exact
                         needAuthentication={true}
                         component={TaskApp}/>
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>
      </Fragment>
    )
  }
}
