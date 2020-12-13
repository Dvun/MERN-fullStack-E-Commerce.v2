import React, {useEffect, useState} from 'react'
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {createProductReviewByUser, getProductDetails} from '../redux/actions/productActions'
import {Message, Rating} from '../components'
import Layout from '../helpers/Layout'
import {Link} from 'react-router-dom'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {addToCart} from '../redux/actions/cartActions'
import {Container, Button, Grid, Paper} from '@material-ui/core'
import {CREATE_PRODUCT_REVIEW_BY_USER_RESET} from '../redux/constants/productConstants'


const ProductScreen = ({match}) => {
  const dispatch = useDispatch()
  const prodId = match.params.id
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const {product} = useSelector(({getProductDetailsReducer}) => getProductDetailsReducer)
  const {userInfo} = useSelector(({userLoginReducer}) => userLoginReducer)
  const {reviewSuccess} = useSelector(({productReviewCreateByUserReducer}) => productReviewCreateByUserReducer)

  useEffect(() => {
    if (reviewSuccess) {
      setRating(0)
      setComment('')
      dispatch({type: CREATE_PRODUCT_REVIEW_BY_USER_RESET})
    }
    dispatch(getProductDetails(match.params.id))
  }, [dispatch, match, reviewSuccess])

  const addToCartHandler = () => {
    dispatch(addToCart(prodId, qty))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReviewByUser(prodId, {rating, comment}))
  }

  return (
    <Layout title='Product details' description={product.title}>
      <Container>
        <Link to='/shop' className='btn btn-outline-dark mb-2'>
          <FontAwesomeIcon icon={faArrowLeft}/> Back to Shop
        </Link>
        <Paper elevation={10} square={false} style={{paddingInline: '8px', minHeight: '600px', marginTop: '1rem', marginBottom: '2rem'}}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Image src={`${window.location.origin}/${product.picturePath}`} style={{minHeight: '457px'}} fluid rounded/>
            </Grid>
            <Grid item xs={12} md={3}>
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
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
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
                    <Button className='btn-block' onClick={addToCartHandler} type='button' variant={'contained'} color={'primary'}>
                      Add To Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Grid>

            <Grid item md={6} className='mt-4'>
              <h2>Reviews</h2>
              {product.reviews && product.reviews.length === 0 ?
                <Message variant='primary' className='w-100'>No reviews</Message>
                :
                <ListGroup variant='flush'>
                  {product.reviews && product.reviews.map(review => (
                    <ListGroupItem key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating}/>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              }

              <ListGroupItem>
                <h6>Write a Customer Review</h6>
                {
                  userInfo ?
                    (
                      <Form onSubmit={submitHandler}>
                        <FormGroup controlId = 'rating'>
                          <FormLabel>Rating</FormLabel>
                          <FormControl as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup controlId='comment'>
                          <FormLabel>Comment</FormLabel>
                          <FormControl
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            >
                          </FormControl>
                        </FormGroup>
                        <Button className='mt-2' type='submit' variant={'contained'} color={'primary'}>Submit</Button>
                      </Form>
                    )
                    :
                    <Message variant='primary'>
                      Please <Link to='/login'>Login</Link> to write a review
                      {' '}
                    </Message>}
              </ListGroupItem>

            </Grid>

          </Grid>
        </Paper>
      </Container>
    </Layout>
  )
}

export default ProductScreen