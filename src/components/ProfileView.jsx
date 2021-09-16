import React, {Component} from 'react'

export default class ProfileView extends Component {
  render() {
    return (
      <div className='card card-body my-3'>
        <div className='row'>
          <div className='col-1 align-self-center'>
            <img src='todo_icon.ico'
                 className='rounded'
                 alt='Google Account Profile Picture'
                 width='50px'
                 height='50px'/>
          </div>
          <div className='col-9 h5 align-self-center'>
            Hello, Janith Perera!
          </div>
          <div className='col-2 align-self-center'>
            <button type='button'
                    className='text-uppercase btn btn-block shadow-none btn-primary'>
              Sign out
              &nbsp;
              <i className='fas fa-sign-out-alt'/>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
