import React from 'react'
import {Spinner} from 'react-bootstrap'

const Loader = () => {
  return (
    <div className='d-flex justify-content-center'>
      <Spinner animation='border' variant='dark' style={{width: '100px', height: '100px'}}/>
    </div>
  )
}

export default Loader