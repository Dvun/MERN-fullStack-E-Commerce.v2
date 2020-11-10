import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import {deleteUserByAdmin, getAllUsersByAdmin} from '../redux/actions/userActions'
import {useDispatch} from 'react-redux'
import {deleteProductByUser, getAllUserProducts} from '../redux/actions/productActions'

const ModalWindow = (props) => {
  const dispatch = useDispatch()


  const deleteHandler = () => {
    if (props.title === 'User Deleting!') {
      dispatch(deleteUserByAdmin(props.user._id))
      dispatch(getAllUsersByAdmin())
    }
    if (props.title === 'Product Deleting!') {
      dispatch(deleteProductByUser(props.prodid))
      dispatch(getAllUserProducts(props.userinfo._id))
    }
    props.onHide()
  }

  return (
    <Modal
      {...props}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{color: 'darkred'}}>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.text}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {props.count === undefined || props.count === 0 ?
          <Button onClick={deleteHandler} className='btn btn-danger'>Delete</Button>
          :
          null
        }
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalWindow