import React from 'react'
import {Modal, Button, Spinner} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {
  deleteProductByAdmin,
  getAllUsersProductsByAdmin,
} from '../redux/actions/productActions'

const ModalWindowAdmin = (props) => {
  const dispatch = useDispatch()
  const {isLoading} = useSelector(({deleteProductByUserReducer}) => deleteProductByUserReducer)


  const deleteHandler = async () => {
    if (props.title === 'Product Deleting!') {
      await dispatch(deleteProductByAdmin(props.product._id))
      await dispatch(getAllUsersProductsByAdmin())
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
          Are you really want delete {props.product.title} ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        {
          isLoading ?
            <Button variant="danger" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                onClick={deleteHandler}
              />
              Deleting...
            </Button>
            :
            <Button onClick={deleteHandler} className='btn btn-danger'>Delete</Button>
        }
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalWindowAdmin