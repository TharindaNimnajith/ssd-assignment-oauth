import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './pages/Login'
import TaskApp from './pages/TaskApp'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profileObj: {
        email: '',
        familyName: '',
        givenName: '',
        googleId: '',
        imageUrl: '',
        name: ''
      },
      tokenObj: {
        access_token: '',
        expires_at: 0,
        expires_in: 0,
        first_issued_at: 0,
        id_token: '',
        idpId: '',
        login_hint: '',
        scope: ''
      }
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact
                   path='/'
                   component={Login}
                   profileObj={this.state.profileObj}
                   tokenObj={this.state.tokenObj}/>
            <Route exact
                   path='/home'
                   component={TaskApp}
                   profileObj={this.state.profileObj}
                   tokenObj={this.state.tokenObj}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
