import React from 'react'
import {Link} from 'react-router-dom'
import './NotFound.css'

export const NotFound = () => {
  return (
    <div>
      <div className='container not-found-page'>
        <div id='not-found'>
          <div className='not-found'>
            <div className='ms-5'>
              <h1>404</h1>
              <h2>Oops! Page Can Not Be Found</h2>
              <p className='mt-2'>
                Sorry but the page you are looking for does not exist,
                have been removed, name changed or is temporarily unavailable.
              </p>
              <Link to={'/'}>
                <label className='home-link'>
                  Go to Home Page
                </label>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
