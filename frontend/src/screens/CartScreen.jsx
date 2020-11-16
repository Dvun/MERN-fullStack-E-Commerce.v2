import React, {useEffect} from 'react'
import {Row, Col, ListGroup, ListGroupItem, Image, Card, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Message from '../components/Message'
import {useDispatch, useSelector} from 'react-redux'
import {addToCart, removeItemFromCart} from '../redux/actions/cartActions'
import Button from '@material-ui/core/Button'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import {makeStyles} from '@material-ui/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'


const CartScreen = ({match, location}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const prodId = match.params.id
  const qty = location.search ? location.search.split('=')[1] : 1
  const {cartItems} = useSelector(({cartReducer}) => cartReducer)

  useEffect(() => {
    if (prodId) {
      dispatch(addToCart(prodId, qty))
    }
  }, [dispatch, prodId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeItemFromCart(id))
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
                                <MenuItem key={x + 1} value={x + 1} className={classes.selectMenu}>{x + 1}</MenuItem>
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

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items</h2>
                <span style={{color: 'darkred'}}>
                <strong>€ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</strong>
              </span>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  fullWidth
                  type='button'
                  color='primary'
                  variant='contained'
                  disabled={cartItems.length === 0}>
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

const useStyles = makeStyles((theme) => ({
  trashIcon: {
    fontSize: '1.5rem',
    color: 'black',

    '&:hover': {
      color: 'darkred',
    },
  },
  selectMenu: {
    height: '2rem'
  }
}))



export default CartScreen