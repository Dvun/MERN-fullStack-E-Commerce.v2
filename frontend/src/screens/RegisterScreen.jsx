import React, { useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import { Card, Col, Form, Row, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Layout from '../helpers/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { registerUser } from '../redux/actions/userActions'
import * as consts from '../redux/constants/userConstants'


const RegisterScreen = ({ location, history }) => {
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm()
  const { success } = useSelector(({ userRegisterReducer }) => userRegisterReducer)
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (success) {
      history.push('/login')
      dispatch({type: consts.USER_REGISTER_RESET})
    }
  }, [history, success, dispatch])

  const onSubmit = (userData) => {
    dispatch(registerUser(userData))
  }

  return (
    <Layout title='Authorization Page' description='Here you can register'>
      <FormContainer>
        <Card>
          <Card.Body>
            <h1 className='mb-2'>Sign Up</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Row>
                {/* Name Input */}
                <Form.Group as={Col} controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter name'
                    name='name'
                    ref={register({ required: true })}
                    isInvalid={!!errors.name}
                  />
                  {errors.name && (
                    <span style={{ color: 'darkred' }}>
                      <FontAwesomeIcon icon={faExclamationTriangle} /> This
                      field is required!
                    </span>
                  )}
                </Form.Group>

                {/* Surname Input */}
                <Form.Group as={Col} controlId='surname'>
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter surname'
                    name='surname'
                    ref={register({ required: true })}
                    isInvalid={!!errors.surname}
                  />
                  {errors.surname && (
                    <span style={{ color: 'darkred' }}>
                      <FontAwesomeIcon icon={faExclamationTriangle} /> This
                      field is required!
                    </span>
                  )}
                </Form.Group>
              </Form.Row>

              <Form.Row>
                {/* Email Input */}
                <Form.Group as={Col} controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    name='email'
                    ref={register({ required: true })}
                    isInvalid={!!errors.email}
                  />
                  {errors.email && (
                    <span style={{ color: 'darkred' }}>
                      <FontAwesomeIcon icon={faExclamationTriangle} /> This
                      field is required!
                    </span>
                  )}
                </Form.Group>

                {/* Password Input */}
                <Form.Group as={Col} controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    name='password'
                    ref={register({ required: true })}
                    isInvalid={!!errors.password}
                  />
                  {errors.password && (
                    <span style={{ color: 'darkred' }}>
                      <FontAwesomeIcon icon={faExclamationTriangle} /> This
                      field is required!
                    </span>
                  )}
                </Form.Group>
              </Form.Row>

              <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='1234 Main St'
                  name='address'
                  ref={register({ required: true })}
                  isInvalid={!!errors.address}
                />
                {errors.address && (
                  <span style={{ color: 'darkred' }}>
                    <FontAwesomeIcon icon={faExclamationTriangle} /> This field
                    is required!
                  </span>
                )}
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId='city'>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter city'
                    name='city'
                    ref={register({ required: true })}
                    isInvalid={!!errors.city}
                  />
                  {errors.city && (
                    <span style={{ color: 'darkred' }}>
                      <FontAwesomeIcon icon={faExclamationTriangle} /> This
                      field is required!
                    </span>
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId='postalCode'>
                  <Form.Label>Post code</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter postal code'
                    name='postalCode'
                    ref={register({ required: true, min: 5, max: 5 })}
                    isInvalid={!!errors.zip}
                  />
                  {errors.postalCode && (
                    <span style={{ color: 'darkred' }}>
                      <FontAwesomeIcon icon={faExclamationTriangle} /> This
                      field is required!
                    </span>
                  )}
                </Form.Group>
              </Form.Row>

              <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Country'
                  name='country'
                  ref={register({ required: true })}
                  isInvalid={!!errors.country}
                />
                {errors.country && (
                  <span style={{ color: 'darkred' }}>
                    <FontAwesomeIcon icon={faExclamationTriangle} /> This field
                    is required!
                  </span>
                )}
              </Form.Group>

              <Button className='mt-3' variant='dark' type='submit'>
                Register
              </Button>
            </Form>
            <Row className='py-3'>
              <Col>
                Already have an account?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                  {' '}
                  Login
                </Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </FormContainer>
    </Layout>
  )
}

export default RegisterScreen
