import React, {useEffect} from 'react'
import {OverlayTrigger, Tooltip, Row, Col, Image, ListGroup, ListGroupItem} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import {createOrder} from '../redux/actions/orderActions'
import Layout from '../helpers/Layout'
import {Button, Container} from '@material-ui/core'

const PlaceOrderScreen = ({history}) => {
  const dispatch = useDispatch()
  const {paymentMethod, cartItems} = useSelector(({cartReducer}) => cartReducer)
  const {success, order, orderErrorMessage} = useSelector(({orderReducers}) => orderReducers)
  const {userInfo} = useSelector(({userLoginReducer}) => userLoginReducer)


  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])

  // Calculate prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  const shippingPrice = itemsPrice > 100 ? 0 : 8.90.toFixed(2)
  const taxPrice = Number((0.20 * itemsPrice).toFixed(2))
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

  const placeOrderHandler = () => {
    dispatch(createOrder({
      user: userInfo._id,
      orderItems: cartItems,
      shippingAddress: {
        address: userInfo.address,
        city: userInfo.city,
        postalCode: userInfo.postalCode,
        country: userInfo.country
      },
      paymentMethod,
      itemsPrice: itemsPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    }))
  }

  return (
    <Layout title='Your order' description='Control and pay your order'>
      <Container >
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>

              <ListGroupItem>
                <h2>Shipping</h2>
                <p>
                  <strong>Address: </strong>
                  {userInfo.address},{' '}
                  {userInfo.city},{' '}
                  {userInfo.postalCode},{' '}
                  {userInfo.country},
                </p>
              </ListGroupItem>

              <ListGroupItem>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {paymentMethod}
              </ListGroupItem>

              <ListGroupItem>
                <h2>Order Items</h2>
                {
                  cartItems.length === 0 ? <Message>Your cart is empty!</Message>
                    :
                    <ListGroup variant='flush'>
                      {cartItems.map((item, index) => (
                        <ListGroupItem key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={item.image} alt={item.name} fluid rounded/>
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              <strong style={{color: 'darkred'}}>{item.qty} x € {item.price} =
                                € {(item.qty * item.price).toFixed(2)}</strong>
                            </Col>
                          </Row>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                }
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>€ {itemsPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="button-tooltip-2">If order over 100€, shipping is FREE! </Tooltip>}>
                    {({ref, ...triggerHandler}) => (
                      <Col
                        {...triggerHandler}
                        className="d-inline-flex align-items-center">
                        <Image
                          width={20}
                          ref={ref}
                          roundedCircle
                          src="https://cdn.iconscout.com/icon/premium/png-512-thumb/atention-1-217818.png"
                        />
                        Shipping
                      </Col>
                    )}
                  </OverlayTrigger>
                  <Col>€ {shippingPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>€ {taxPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col><strong>Total</strong></Col>
                  <Col><strong>€ {totalPrice}</strong></Col>
                </Row>
              </ListGroupItem>

              {orderErrorMessage &&
              <ListGroupItem>
                {orderErrorMessage && <Message variant='danger'>{orderErrorMessage}</Message>}
              </ListGroupItem>
              }

              <ListGroupItem>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems === 0}
                  onClick={placeOrderHandler}
                  variant='contained'
                  color='primary'
                >
                  Place Order
                </Button>
              </ListGroupItem>

            </ListGroup>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default PlaceOrderScreen