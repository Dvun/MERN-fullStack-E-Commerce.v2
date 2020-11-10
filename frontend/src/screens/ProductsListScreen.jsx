import React, {useEffect, useState} from 'react'
import Layout from '../helpers/Layout'
import {Button, Container, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {ModalWindow} from '../components'
import {useDispatch, useSelector} from 'react-redux'
import {getAllUserProducts} from '../redux/actions/productActions'
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {USER_PRODUCTS_RESET} from '../redux/constants/productConstants'


const ProductsListScreen = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [prodId, setProdId] = useState('')
  const {userInfo} = useSelector(({userLoginReducer}) => userLoginReducer)
  const {userProducts} = useSelector(({getAllProductsByUserReducer}) => getAllProductsByUserReducer)

  useEffect(() => {
    if (!userProducts || !userProducts.title) {
      dispatch({type: USER_PRODUCTS_RESET})
      dispatch(getAllUserProducts(userInfo._id))
    }
    // eslint-disable-next-line
  }, [dispatch, userInfo])

  const deleteProductHandler = (id) => {
    setProdId(id)
    setShow(true)
  }


  return (
    <Layout title='Your Products' description='Here You can look, create, update and delete all your products!'>
      <Container>
        {
          userInfo.isSeller ?
            <Link className='btn btn-primary float-right' to='my-products/add'>
              <FontAwesomeIcon icon={faPlusSquare}/> Add new product
            </Link>
            :
            null
        }
        <h1>Products</h1>
        {
          userProducts.length === 0 ?
            <h3 className='text-center'>You have no products!</h3>
            :
            <Table striped bordered hover variant="dark" className='table-responsive-sm' size='sm'>
              <thead>
              <tr>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>count In Stock</th>
                <th/>
              </tr>
              </thead>
              <tbody>
              {
                userProducts && userProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{product.title}</td>
                    <td>{product.category.name}</td>
                    <td>{product.price}</td>
                    <td>{product.countInStock}</td>
                    <td className='d-flex justify-content-around'>
                      <Link to={`/my-products/${product._id}/edit`}
                            className='btn btn-primary btn-outline-light btn-sm'>
                        Details
                      </Link>
                      <Button onClick={() => deleteProductHandler(product._id)}
                              className='btn btn-danger btn-outline-light btn-sm'
                              variant='danger'>Delete</Button>
                    </td>
                    <ModalWindow
                      size='sm'
                      title='Product Deleting!'
                      text={`Are you really want delete ${product.title} ?`}
                      prodid={prodId}
                      userinfo={userInfo}
                      show={show}
                      onHide={() => setShow(false)}
                    />
                  </tr>
                ))}
              </tbody>
            </Table>
        }
        {
          !userInfo.isSeller ?
            <h3 className='text-center'>You can not add new products. If You want be a seller, please write to a
              admin!</h3>
            :
            null
        }
      </Container>
    </Layout>
  )
}

export default ProductsListScreen