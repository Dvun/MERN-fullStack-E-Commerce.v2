import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}/>
      <meta name='keyword' content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To React E-Commerce',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, books, course, phones, playstation, iphone, buy all cheap'
}

export default Meta