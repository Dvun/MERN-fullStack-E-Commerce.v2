import React, {useEffect} from 'react'
import Layout from '../helpers/Layout'
import {Table, Container} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {getAllUsersByAdmin} from '../redux/actions/userActions'
import {InputFilter, Users} from '../components'
import {USERS_DETAILS_RESET} from '../redux/constants/userConstants'

const UsersScreen = ({match}) => {
  const dispatch = useDispatch()
  const {users, filteredUsers} = useSelector(({usersDetailsReducer}) => usersDetailsReducer)
  const {userInfo} = useSelector(({userLoginReducer}) => userLoginReducer)
  const {success} = useSelector(({userUpdateReducer}) => userUpdateReducer)

  useEffect(() => {
    if (userInfo.isAdmin || success) {
      dispatch({type: USERS_DETAILS_RESET})
      dispatch(getAllUsersByAdmin())
    }
  }, [dispatch, userInfo, match.path, success])


  return (
    <Layout title='Admin access' description='Users control, delete, update.'>
      <Container>
        <InputFilter label='Search User by name or email'/>
        <h1>Users</h1>
        <Table striped bordered hover variant="dark" className='table-responsive-sm' size='sm'>
          <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PRODUCTS</th>
            <th>IS SELLER</th>
            <th>IS ADMIN</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {
            filteredUsers !== null ?
              filteredUsers && filteredUsers.map(user => (
                <Users key={user._id} user={user}/>
              ))
              :
              users && users.map(user => (
                <Users key={user._id} user={user}/>
              ))
          }
          </tbody>
        </Table>
      </Container>
    </Layout>
  )
}

export default UsersScreen