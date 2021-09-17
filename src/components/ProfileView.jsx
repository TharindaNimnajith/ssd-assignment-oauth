import React, {Component} from 'react'
import GoogleLogout from 'react-google-login'
import {clientId} from '../util/util'

export default class ProfileView extends Component {
  logout = () => {
    console.log('Logout')
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
            Hello, Janith Perera!
          </div>
          <div className='col-2 align-self-center'>
            <GoogleLogout clientId={clientId}
              buttonText='Sign Out'
              onLogoutSuccess={this.logout}>
            </GoogleLogout>
          </div>
        </div>
      </div>
    )
  }
}
