import React from 'react'
import {Spinner} from 'reactstrap'
import './Loader.css'

export const Loader = () => {
  return (
    <div className='preloader'>
      <div className='status'>
        <Spinner color='primary'/>
      </div>
    </div>
  )
}
