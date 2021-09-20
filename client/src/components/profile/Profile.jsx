import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {AppContext} from '../../global/AppContext'
import {LOCAL_STORAGE_KEY} from '../../config/config'
import {removeFromLocalStorage} from '../../helpers/helpers'
import icon from '../../images/todo_icon.png'

export default class Profile extends Component {
  static contextType = AppContext

  // Logout function
  handleLogout = () => {
    this.context.logout()
    removeFromLocalStorage(LOCAL_STORAGE_KEY).then(() => {
    })
  }

  render() {
    return (
      <div className='card card-body my-3'>
        <div className='row'>
          <div className='col-1 align-self-center text-end pe-1'>
            {
              // Access the profile details from the Google account
              this.context.loginData ? (
                <img src={this.context.loginData.profileObj.imageUrl}
                     className='rounded-circle'
                     alt='Google Account Profile'
                     width='50px'
                     height='50px'/>
              ) : (
                <img src={icon}
                     className='rounded-circle'
                     alt='Google Account Profile'
                     width='50px'
                     height='50px'/>
              )
            }
          </div>
          {
            this.context.loginData ? (
              <div className='col-8 align-self-center'>
                <p className='mb-0 font-weight-bold'>
                  Hello, {this.context.loginData.profileObj.name}!
                </p>
                <small>
                  {this.context.loginData.profileObj.email}
                </small>
              </div>
            ) : (
              <div className='col-8 align-self-center'/>
            )
          }
          <div className='col-3 align-self-center text-end pe-5'>
            <Link to='/'>
              <button type='button'
                      className='text-uppercase btn btn-block shadow-none btn-primary'
                      onClick={this.handleLogout}>
                <label className='text-decoration-none'>
                  Sign out
                  &nbsp;
                  <i className='fas fa-sign-out-alt'/>
                </label>
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
