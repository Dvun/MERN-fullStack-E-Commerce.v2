import React, {useState} from 'react'
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {getUserDetails, getUserDetailsByAdmin} from '../redux/actions/userActions'
import {Link} from 'react-router-dom'
import {ModalWindow} from './index'


const Users = ({user}) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const {userInfo} = useSelector(({userLoginReducer}) => userLoginReducer)


  const userProfileDetailsHandler = (id) => {
    if (userInfo.isAdmin || !id) {
      dispatch(getUserDetailsByAdmin(id))
    } else {
      dispatch(getUserDetails(id))
    }
  }

  const deleteUserProfileHandler = (id) => {
    setShow(true)
  }


  return (
    <tr>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </td>
      <td className='text-center'>{user.productsCount}</td>
      <td className='text-center'>
        {user.isSeller ? (
          <FontAwesomeIcon icon={faCheck} style={{color: 'green'}}/>
        ) : (
          <FontAwesomeIcon icon={faTimes} style={{color: 'red'}}/>
        )}
      </td>
      <td className='text-center'>
        {user.isAdmin ? (
          <FontAwesomeIcon icon={faCheck} style={{color: 'green'}}/>
        ) : (
          <FontAwesomeIcon icon={faTimes} style={{color: 'red'}}/>
        )}
      </td>
      <td className='d-flex justify-content-around'>
        <Link onClick={() => userProfileDetailsHandler(user._id)} to={`/admin/all-users/user/${user._id}`}
              className='btn btn-primary btn-outline-light btn-sm'>
          Details
        </Link>
        <Button onClick={deleteUserProfileHandler} className='btn btn-danger btn-outline-light btn-sm'
                variant='danger'>Delete</Button>
      </td>
      {user.productsCount > 0 ?
        <ModalWindow
          size='lg'
          title='User Deleting warning!'
          text={`You can not delete user ${user.name}, if he/she have a products. First, do something with products!`}
          count={user.productsCount}
          user={user}
          show={show}
          onHide={() => setShow(false)}
        />
        :
        <ModalWindow
          size='sm'
          title='User Deleting!'
          text={`Are you really want delete user ${user.name}?`}
          user={user}
          show={show}
          onHide={() => setShow(false)}
        />
      }
    </tr>
  )
}

export default Users