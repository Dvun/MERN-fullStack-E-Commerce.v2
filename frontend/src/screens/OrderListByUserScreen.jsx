import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Message, Loader} from '../components'
import {listMyOrders} from '../redux/actions/orderActions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {Container, Button} from '@material-ui/core'
import Layout from '../helpers/Layout'
import {ORDER_DETAILS_RESET} from '../redux/constants/orderConstants'


const OrderListByUserScreen = ({history, match}) => {
  const dispatch = useDispatch()
  const {isLoading, orderErrorMessage, orders} = useSelector(({orderReducers}) => orderReducers)
  const {userInfo} = useSelector(({userLoginReducer}) => userLoginReducer)

  useEffect(() => {
    if (userInfo && match.path === '/my-orders') {
      dispatch({type: ORDER_DETAILS_RESET})
      dispatch(listMyOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, match.path])

  const handlePay = (id) => {
    history.push(`/orders/${id}`)
  }

  return (
    <Layout
      title='Your Orders'
      description='Here can see what orders You have, orders is paid or not, delivered or not.'
    >
      <Container maxWidth='md'>
        <h1>Orders</h1>
        {
          orders.length === 0 ?
            <h3 className='text-center'>Have no orders!</h3>
            :
            isLoading ? (
              <Loader/>
            ) : orderErrorMessage ? (
              <Message variant='danger'>{orderErrorMessage}</Message>
            ) : (
              <Table striped bordered hover responsive className='table-sm' variant='dark'>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th/>
                </tr>
                </thead>
                <tbody>
                {
                  orders && orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice}</td>
                      <td className='text-center'>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <FontAwesomeIcon icon={faTimes} style={{color: 'red'}}/>
                        )}
                      </td>
                      <td className='text-center'>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <FontAwesomeIcon icon={faTimes} style={{color: 'red'}}/>
                        )}
                      </td>
                      <td className='d-flex justify-content-around'>
                        <LinkContainer to={`/orders/${order._id}`} style={{color: 'white'}}>
                          <Button
                            type='button'
                            variant='contained'
                            size='small'
                            color='primary'
                          >
                            Details
                          </Button>
                        </LinkContainer>

                        {!order.isPaid &&
                        <Button
                          type='button'
                          variant='contained'
                          size='small'
                          color='secondary'
                          onClick={() => handlePay(order._id)}
                        >
                          Pay
                        </Button>
                        }
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </Table>
            )
        }
      </Container>

    </Layout>
  )
}

export default OrderListByUserScreen