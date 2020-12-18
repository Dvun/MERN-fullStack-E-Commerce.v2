import React, {useEffect, useState} from 'react'
import {Row, Col, ListGroup, ListGroupItem, Image, Card, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Message from '../components/Message'
import {useDispatch, useSelector} from 'react-redux'
import {addToCart, removeItemFromCart, savePaymentMethod} from '../redux/actions/cartActions'
import {Button, List, ListItem, FormControl, MenuItem, Select, Typography} from '@material-ui/core'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import {makeStyles} from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'


const CartScreen = ({match, location, history}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const prodId = match.params.id
  const [paymentMethod, setPaymentMethod] = useState('')
  const qty = location.search ? location.search.split('=')[1] : 1
  const {cartItems} = useSelector(({cartReducer}) => cartReducer)
  const {success} = useSelector(({orderReducers}) => orderReducers)

  useEffect(() => {
    if (prodId) {
      dispatch(addToCart(prodId, qty))
    }
  }, [dispatch, prodId, qty, success])

  const removeFromCartHandler = (id) => {
    dispatch(removeItemFromCart(id))
  }

  const placeOrderHandler = () => {
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
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
              <List variant='flush'>
                {cartItems && cartItems.map(item => (
                  <ListGroupItem key={item._id}>
                    <ListItem className='d-flex align-items-center'>
                      <Col md={2}>
                        <Image src={`${window.location.origin}/${item.image}`} alt={item.title} fluid rounded/>
                      </Col>
                      <Col md={3}>
                        <Link to={`/shop/product/${item._id}`}>{item.title}</Link>
                      </Col>
                      <Col md={2}>€ {item.price}</Col>
                      <Col md={2}>
                        <FormControl variant="outlined" size='small'>
                          <Select
                            value={item && item.qty}
                            onChange={(e) => dispatch(addToCart(item._id, Number(e.target.value)))}>
                            >
                            <MenuItem value="" disabled>
                              <em>Quantity</em>
                            </MenuItem>
                            {
                              [...Array(item.countInStock).keys()].map(x => (
                                <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Col>
                      <Col md={2}>
                        <Button type='button' variant='text' onClick={() => removeFromCartHandler(item._id)}>
                          <DeleteRoundedIcon className={classes.trashIcon}/>
                        </Button>
                      </Col>
                    </ListItem>
                  </ListGroupItem>
                ))}
              </List>
            )}
        </Col>

        <Col md={4} className='pt-2'>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items</h2>
                <span style={{color: 'darkred'}}>
                <strong>€ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</strong>
              </span>
              </ListGroupItem>
              <ListGroup variant='flush'>
                <ListItem>
                  <Typography variant='h6'>Payment method: </Typography>
                </ListItem>
                <ListItem>
                  <FormControlLabel
                    label={<Image width={150}
                                  src='https://www.pngkey.com/png/full/4-42382_credit-card-accepted-png-svg-black-and-white.png'
                                  alt='paypal'/>}
                    value="PayPal"
                    name='paymentMethod'
                    control={
                      <Radio
                        disabled={cartItems.length === 0}
                        color='primary'
                        onClick={(e) => setPaymentMethod(e.target.value)}
                      />}
                  />
                </ListItem>
              </ListGroup>
              <ListGroupItem>
                <Button
                  fullWidth
                  type='button'
                  color='primary'
                  variant='contained'
                  onClick={placeOrderHandler}
                  disabled={cartItems.length === 0 || paymentMethod === ''}>
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

const useStyles = makeStyles(() => ({
  trashIcon: {
    fontSize: '1.5rem',
    color: 'black',

    '&:hover': {
      color: 'darkred',
    },
  },
}))


export default CartScreen