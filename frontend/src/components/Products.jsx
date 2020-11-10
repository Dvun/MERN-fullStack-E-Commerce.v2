import React from 'react'
import {Card, CardImg} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {Rating} from '../components'

const Products = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded' style={{width: '16rem'}}>
      <Link to={`/shop/product/${product._id}`}>
        <CardImg src={product.picturePath} variant='top'/>
      </Link>
      <Card.Body>
        <Link to={`/shop/product/${product._id}`}>
          <Card.Title as='div'><strong>{product.title}</strong></Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
        </Card.Text>
        <Card.Text as={'h3'}>€ {product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Products