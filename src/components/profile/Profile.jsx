import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {AppContext} from '../../global/AppContext'
import {authStoreKey} from '../../config/config'
import {removeFromLocalStorage} from '../../helpers/helpers'
import icon from '../../images/todo_icon.png'

export default class Profile extends Component {
  static contextType = AppContext

  handleLogout = () => {
    this.context.logout()
    removeFromLocalStorage(authStoreKey).then(() => {
    })
  }

  render() {
    return (
      <div className='card card-body my-3'>
        <div className='row'>
          <div className='col-1 align-self-center'>
            {
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
              <div className='col-9 align-self-center'>
                <p className='mb-0 font-weight-bold'>
                  Hello, {this.context.loginData.profileObj.name}!
                </p>
                <small>
                  {this.context.loginData.profileObj.email}
                </small>
              </div>
            ) : (
              <div className='col-9 align-self-center'/>
            )
          }
          <div className='col-2 align-self-center'>
            <Link to='/'>
              <button type='button'
                      className='text-uppercase btn btn-block shadow-none btn-primary'
                      onClick={this.handleLogout}>
                <label className='text-decoration-none pt-2'>
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
