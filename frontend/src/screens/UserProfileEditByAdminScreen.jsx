import React, {useEffect, useState} from 'react'
import {Form, Col, Button, Container} from 'react-bootstrap'
import Layout from '../helpers/Layout'
import {useDispatch, useSelector} from 'react-redux'
import {getUserDetailsByAdmin, updateProfileByAdmin} from '../redux/actions/userActions'
import {useForm} from 'react-hook-form'
import {USER_DETAILS_RESET, USER_UPDATE_RESET, USERS_DETAILS_RESET} from '../redux/constants/userConstants'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const UserProfileEditByAdminScreen = ({history, match}) => {
  const dispatch = useDispatch()
  const id = match.params.id
  const [data, setData] = useState({})
  const {userInfo} = useSelector(({userLoginReducer}) => userLoginReducer)
  const {user} = useSelector(({userDetailsReducer}) => userDetailsReducer)
  const {success} = useSelector(({userUpdateReducer}) => userUpdateReducer)
  const {handleSubmit, register} = useForm()


  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({type: USER_UPDATE_RESET})
        dispatch(getUserDetailsByAdmin(id))
      }
      const fetchData = async () => {
        setData(await user)
      }
      fetchData()
    }
  }, [dispatch, history, userInfo, user, success, match.path, id])

  const updateHandler = (userData) => {
    const updateUser = {
      _id: user._id,
      name: userData.name || user.name,
      surname: userData.surname || user.surname,
      email: userData.email,
      password: userData.password || user.password,
      address: userData.address || user.address,
      city: userData.city || user.city,
      zip: userData.zip || user.zip,
      isAdmin: userData.isAdmin,
      isSeller: userData.isSeller,
    }
    dispatch(updateProfileByAdmin(updateUser))

    history.push('/admin/all-users')
  }

  const backToUsersList = () => {
    dispatch({type: USER_UPDATE_RESET})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: USERS_DETAILS_RESET})
    history.push('/admin/all-users')
  }


  return (
    <Layout
      title='Profile Change Page'
      description='Change Your data if you need.'
    >
      <Container className='d-flex justify-content-center flex-column align-items-center'>
        {
          userInfo.isAdmin && match.path === '/admin/all-users/user/:id' ?
            <div className='d-flex align-self-start mb-3'>
              <Button variant='outline-dark' onClick={backToUsersList}>
                <FontAwesomeIcon icon={faArrowLeft}/> Back to Users List
              </Button>
            </div>
            :
            null
        }
        <Form className='col-md-9' onSubmit={handleSubmit(updateHandler)}>
          <Form.Row>
            <Form.Group as={Col} controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter name'
                defaultValue={data.name}
                ref={register}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='surname'>
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type='text'
                name='surname'
                defaultValue={data.surname}
                placeholder='Enter surname'
                ref={register}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                placeholder='Enter email'
                defaultValue={data.email}
                ref={register}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='password'>
              <Form.Label>New Password?</Form.Label>
              <Form.Control
                type='password'
                name='password'
                placeholder='Enter new password if need change'
                ref={register}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId='addressData'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder='1234 Main St'
              name='address'
              defaultValue={data.address}
              ref={register}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                placeholder='Enter City'
                name='city'
                defaultValue={data.city}
                ref={register}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='zip'>
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type='number'
                name='zip'
                defaultValue={data.zip}
                ref={register}
              />
            </Form.Group>
          </Form.Row>

          {userInfo.isAdmin && (
            <Form.Row>
              <Form.Group id='isAdmin' style={{paddingLeft: '5px'}}>
                <Form.Check
                  type='checkbox'
                  label='isAdmin'
                  name='isAdmin'
                  defaultChecked={data.isAdmin}
                  ref={register}
                />
              </Form.Group>

              <Form.Group id='isSeller' className='ml-3'>
                <Form.Check
                  type='checkbox'
                  label='isSeller'
                  name='isSeller'
                  defaultChecked={data.isSeller}
                  ref={register}
                />
              </Form.Group>
            </Form.Row>
          )}

          <Button variant='outline-dark' type='submit'>
            Update
          </Button>
        </Form>
      </Container>
    </Layout>
  )
}

export default UserProfileEditByAdminScreen
