import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './pages/Login'
import TaskApp from './pages/TaskApp'

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact
                   path='/'
                   component={Login}/>
            <Route exact
                   path='/home'
                   component={TaskApp}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
