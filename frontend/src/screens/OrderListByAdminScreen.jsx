import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Message, Loader, InputFilter} from '../components'
import {getAllOrdersByAdmin} from '../redux/actions/orderActions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {Container, Button} from '@material-ui/core'
import Layout from '../helpers/Layout'


const OrderListByAdminScreen = ({history}) => {
  const dispatch = useDispatch()
  const {isLoading, orderErrorMessage, orders, filteredOrders} = useSelector(({orderReducers}) => orderReducers)
  const {userInfo} = useSelector(({userLoginReducer}) => userLoginReducer)

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrdersByAdmin())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  let ordersArr
  if (filteredOrders !== null) {
    ordersArr = filteredOrders
  } else {
    ordersArr = orders
  }

  return (
    <Layout
      title='All Orders'
      description='Here can see what orders users have, orders is paid or not, delivered or not.'
    >
      <Container maxWidth='md'>
        <InputFilter
          label='Search orders by User name'
        />
        <h1>Orders</h1>
        {isLoading ? (
          <Loader/>
        ) : orderErrorMessage ? (
          <Message variant='danger'>{orderErrorMessage}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm' variant='dark'>
            <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {ordersArr && ordersArr.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
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
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        )}
      </Container>

    </Layout>
  )
}

export default OrderListByAdminScreen