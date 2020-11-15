import React, {useEffect, useState} from 'react'
import {Card, Row, Col, Image, ListGroup, ListGroupItem, Button, Form, Container} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {getProductDetails} from '../redux/actions/productActions'
import {Rating} from '../components'
import Layout from '../helpers/Layout'
import {Link} from 'react-router-dom'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const ProductScreen = ({match, history}) => {
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const {product} = useSelector(({getProductDetailsReducer}) => getProductDetailsReducer)

  useEffect(() => {
    dispatch(getProductDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <Layout title='Product details' description={product.title}>
      <Container>
        <Link to='/shop' className='btn btn-outline-dark mb-2'>
          <FontAwesomeIcon icon={faArrowLeft}/> Back to Shop
        </Link>
        <Row>
          <Col md={6}>
            <Image src={`${window.location.origin}/${product.picturePath}`} fluid rounded/>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h3>{product.title}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
              </ListGroupItem>
              <ListGroupItem><strong>Price: € {product.price}</strong></ListGroupItem>
              <ListGroupItem><strong>Description:</strong> {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card bg='dark'>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>
                      Price:
                    </Col>
                    <Col>
                      <strong>€ {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>
                      Status:
                    </Col>
                    <Col style={product.countInStock > 0 ? {color: 'black'} : {color: 'red'}}>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                          {
                            [...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))
                          }
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem>
                  <Button className='btn-block' onClick={addToCartHandler} type='button'>
                    Add To Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default ProductScreen