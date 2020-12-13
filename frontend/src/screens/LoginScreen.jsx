import React, {useEffect} from 'react'
import {Row, Form, Col, Button, FormGroup, FormLabel, Card} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Layout from '../helpers/Layout'
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useDispatch, useSelector} from 'react-redux'
import {userLogin} from '../redux/actions/userActions'

const LoginScreen = ({location, history}) => {
  const dispatch = useDispatch()
  const {register, handleSubmit, errors} = useForm()
  const {userInfo} = useSelector(({userLoginReducer}) => userLoginReducer)
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo && userInfo.name) history.push(redirect)
  }, [history, redirect, userInfo])

  const onSubmit = (userData) => {
    dispatch(userLogin(userData))
  }

  return (
    <Layout title='Authorization Page' description='Here you can login'>
      <FormContainer>
        <Card>
          <Card.Body>
            <h1 className='mb-2'>Sign In</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>

              {/*Email Input*/}
              <FormGroup controlId='email'>
                <FormLabel>Email Address</FormLabel>
                <Form.Control
                  type='email'
                  name='email'
                  placeholder='Enter email...'
                  ref={register({required: true})}
                >
                </Form.Control>
                {errors.email &&
                <span style={{color: 'darkred'}}><FontAwesomeIcon icon={faExclamationTriangle}/> This field is required!</span>
                }
              </FormGroup>

              {/*Password Input*/}
              <FormGroup controlId='password'>
                <FormLabel>Password</FormLabel>
                <Form.Control
                  type='password'
                  name='password'
                  placeholder='Enter password...'
                  ref={register({required: true})}
                  isInvalid={!!errors.password}
                />
                {errors.password &&
                <span style={{color: 'darkred'}}><FontAwesomeIcon icon={faExclamationTriangle}/> This field is required!</span>
                }
              </FormGroup>

              <Button className='mt-3' type='submit' variant='dark'>Sign In</Button>
            </Form>
            <Row className='py-3'>
              <Col>
                New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register</Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </FormContainer>
    </Layout>
  )
}

export default LoginScreen