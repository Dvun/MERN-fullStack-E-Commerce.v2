import React from 'react'
import {Row, Form, Col, ListGroup, ListGroupItem, Image, Button, Card, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Message from '../components/Message'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from 'react-redux'
import {addToCart} from '../redux/actions/cartActions'


const CartScreen = () => {
  const dispatch = useDispatch()
  const {cartItems} = useSelector(({CartReducer}) => CartReducer)


  const removeFromCartHandler = () => {

  }

  return (
    <Container>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>

          {cartItems.length === 0 ?
            <Message variant='primary'>
              Your cart is empty <Link to='/shop'>Go Back</Link>
            </Message>
            :
            (
              <ListGroup variant='flush'>
                {cartItems.map(item => (
                  <ListGroupItem >
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded/>
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>€ {item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as='select'
                          value={item.qty}
                          onChange={(e) => dispatch(addToCart(item.product,
                            Number(e.target.value)))}>
                          {
                            [...Array(item.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))
                          }
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                          <FontAwesomeIcon icon={faTrash}/>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                <span style={{color: 'darkred'}}>
                <strong>€ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</strong>
              </span>
              </ListGroupItem>
              <ListGroupItem>
                <Button type='button' className='btn-block' disabled={cartItems.length === 0}>
                  Process To Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CartScreen