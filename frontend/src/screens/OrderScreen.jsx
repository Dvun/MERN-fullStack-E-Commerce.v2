import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {OverlayTrigger, Tooltip, Row, Col, Image, ListGroup, ListGroupItem} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import {deliverOrder, getOrderDetails, payOrder} from '../redux/actions/orderActions'
import Loader from '../components/Loader'
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from '../redux/constants/orderConstants'
import {Container} from '@material-ui/core'
import Button from '@material-ui/core/Button'

const OrderScreen = ({match, history}) => {
  const orderId = match.params.id
  const dispatch = useDispatch()
  const [sdkReady, setSdkReady] = useState(false)
  const {isLoading, order, success, successPay, successDeliver} = useSelector(({orderReducers}) => orderReducers)
  const {userInfo} = useSelector(({userLoginReducer}) => userLoginReducer)


  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    const addPayPalScript = async () => {
      const {data: clientId} = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({type: ORDER_PAY_RESET})
      dispatch({type: ORDER_DELIVER_RESET})
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, order, success, userInfo, history, successPay, successDeliver])


  let itemsPrice = 0
  if (!isLoading) {
    itemsPrice = order.orderItems && order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  }

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = (id) => {
    dispatch(deliverOrder(id))
  }

  return (
    <Container>
      {
        isLoading ?
          <Loader/>
          :
          <>
            <Row>
              <Col>
                <h1>ORDER {orderId.toUpperCase()}</h1>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <ListGroup variant='flush'>

                  <ListGroupItem>
                    <h2>SHIPPING</h2>
                    <p><strong>Name: </strong> {order.user && order.user.name}</p>
                    <p><strong>Email: </strong><a
                      href={`mailto:${order.user && order.user.email}`}> {order.user && order.user.email}</a></p>
                    <p>
                      <strong>Address: </strong>
                      {order.shippingAddress && order.shippingAddress.address},{' '}
                      {order.shippingAddress && order.shippingAddress.city},{' '}
                      {order.shippingAddress && order.shippingAddress.postalCode},{' '}
                      {order.shippingAddress && order.shippingAddress.country},
                    </p>
                    {
                      order.isDelivered ?
                        <Message variant='success'>Delivered on {order.deliveredAt.substring(0, 10)}</Message>
                        :
                        <Message variant='danger'>Not Delivered</Message>
                    }
                  </ListGroupItem>

                  <ListGroupItem>
                    <h2>PAYMENT METHOD</h2>
                    <p>
                      <strong>Method: </strong>
                      {order.paymentMethod}
                    </p>
                    {
                      order.isPaid ?
                        <Message variant='success'>Paid on {order.paidAt.substring(0, 10)}</Message>
                        :
                        <Message variant='danger'>Not Paid</Message>
                    }
                  </ListGroupItem>

                  <ListGroupItem>
                    <h2>ORDER ITEMS</h2>
                    {
                      order.orderItems && order.orderItems.length === 0 ? <Message>Order is empty!</Message>
                        :
                        <ListGroup variant='flush'>
                          {order.orderItems && order.orderItems.map((item, index) => (
                            <ListGroupItem key={index}>
                              <Row>
                                <Col md={1}>
                                  <Image src={`${window.location.origin}/${item.image}`} alt={item.name} fluid rounded/>
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
                    <h2>ORDER SUMMARY</h2>
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
                      <Col>€ {order.shippingPrice}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Tax</Col>
                      <Col>€ {order.taxPrice}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col><strong>Total</strong></Col>
                      <Col><strong>€ {order.totalPrice}</strong></Col>
                    </Row>
                  </ListGroupItem>

                  {!order.isPaid && (
                    <ListGroupItem>
                      {!sdkReady ? <Loader/> :
                        <PayPalButton currency={'EUR'} amount={order.totalPrice} onSuccess={successPaymentHandler}/>}
                    </ListGroupItem>
                  )}

                  {userInfo.isAdmin && order.isPaid && !order.isDelivered &&
                  <ListGroupItem className='d-flex justify-content-center'>
                    <Button color='primary' variant='contained' onClick={() => deliverHandler(order._id)}>Mark As Delivered</Button>
                  </ListGroupItem>
                  }

                </ListGroup>
              </Col>
            </Row>
          </>
      }
    </Container>
  )
}
export default OrderScreen