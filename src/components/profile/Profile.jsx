import React, {Component} from 'react'
import GoogleLogout from 'react-google-login'
import {clientId} from '../../util/util'
import {AppContext} from '../../global/AppContext'
import {removeFromLocalStorage} from '../../helpers/helpers'
import {authStoreKey} from '../../config/config'

export default class Profile extends Component {
  static contextType = AppContext

  logoutSuccess = () => {
    this.context.logout()
    removeFromLocalStorage(authStoreKey).then(() => {
    })
    this.props.history.push('/')
  }

  logoutFailure = response => {
    console.log('Logout Failed')
    console.log(response)
  }

  render() {
    return (
      <div className='card card-body my-3'>
        <div className='row'>
          <div className='col-1 align-self-center'>
            <img src='todo_icon.ico'
                 className='rounded'
                 alt='Google Account Profile'
                 width='50px'
                 height='50px'/>
          </div>
          <div className='col-9 h5 align-self-center'>
            Hello, {this.context.loginData.profileObj.name}!
          </div>
          <div className='col-2 align-self-center'>
            <GoogleLogout clientId={clientId}
                          buttonText='Sign Out'
                          onLogoutSuccess={this.logoutSuccess}
                          onFailure={this.logoutFailure}
                          accessType='online'
                          loginHint='Sign Out'
                          tag='button'
                          type='button'
                          fetchBasicProfile={true}
                          disabled={false}
                          uxMode='popup'
                          theme='light'
                          icon={true}
                          isSignedIn={false}/>
          </div>
        </div>
      </div>
    )
  }
}
