import React from 'react'
import './layout.css'
import {InfoPopover} from '../components'


const Layout = ({title = 'Title', description = 'description', className, style, children}) => {
  return (
    <>
      <div className='container-fluid d-flex flex-column justify-content-center jumbotron rounded-0 mb-3'>
        <h2>{title}</h2>
        <p className='lead' style={{margin: '0'}}>{description}</p>
      </div>

      <div className={className} style={style}>{children}</div>

      <InfoPopover/>
    </>
  )
}

export default Layout