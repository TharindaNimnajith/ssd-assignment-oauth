import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import background from '../images/background.jpg'

export default class Login extends Component {
  render() {
    return (
      <div className='text-center d-flex h-100'
           style={{
             backgroundImage: `url(${background})`,
             width: '100vw',
             minHeight: '100vh',
             backgroundPosition: 'center',
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat'
           }}>
        <div className='container align-self-center rounded py-5'
             style={{
               backgroundColor: 'rgba(0, 0, 0, 0.6)',
               height: '60vh',
               width: '40vw'
             }}>
          <h1 className='text-uppercase mb-4 text-light font-weight-bold pb-4'
              style={{
                letterSpacing: '2px'
              }}>
            Personal Task Manager
          </h1>
          <div>
            <img src='todo_icon.ico'
                 alt='Logo Icon'
                 className='rounded'
                 width='170px'
                 height='170px'/>
          </div>
          <h3 className='text-uppercase mb-4 text-light font-weight-bold mt-4 pt-5'
              style={{
                letterSpacing: '2px'
              }}>
            Sign In with Google
          </h3>
          <div className='d-flex justify-content-center py-2'>
            <Link to='home'>
              <button type='button'
                      className='text-uppercase btn btn-primary btn-block shadow-none px-4'>
                <label className='text-decoration-none pt-2'>
                  <i className='fab fa-google'/>
                  &nbsp;
                  Sign In With Google
                </label>
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
