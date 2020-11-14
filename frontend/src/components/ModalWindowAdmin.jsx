import React from 'react'
import {Modal, Button, Spinner} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {
  deleteProductByAdmin,
  getAllUsersProductsByAdmin,
} from '../redux/actions/productActions'
import {deleteCategory, getAllCategories} from '../redux/actions/categoryActions'

const ModalWindowAdmin = (props) => {
  const dispatch = useDispatch()
  const {isLoading} = useSelector(({deleteProductByUserReducer}) => deleteProductByUserReducer)
  const {isLoading: categoryIsLoading} = useSelector(({CategoriesReducer}) => CategoriesReducer)


  const deleteHandler = async () => {
    if (props.title === 'Product Deleting!') {
      await dispatch(deleteProductByAdmin(props.product._id))
      await dispatch(getAllUsersProductsByAdmin())
      await props.onHide()
    }
    if (props.title === 'Category Deleting!') {
      await dispatch(deleteCategory(props.category._id))
      await dispatch(getAllCategories())
    }
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
          {props.title === 'Product Deleting!' || props.title === 'Product Deleting!' ?
            `Are You really want delete ${props.product.title} ?`
            :
            props.text
          }
        </p>
      </Modal.Body>
      <Modal.Footer>
        {
          props.title === 'Product Deleting!' || props.category.products === 0 || props.title === 'Product Deleting!' ?

            isLoading || categoryIsLoading ?
              <Button variant="danger" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Deleting...
              </Button>
              :
              <Button onClick={deleteHandler} className='btn btn-danger'>Delete</Button>
            :
            null

        }
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalWindowAdmin