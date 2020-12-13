import React, {useEffect, useState} from 'react'
import Layout from '../helpers/Layout'
import {Button, Container, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {InputFilter, ModalWindowAdmin} from '../components'
import {useDispatch, useSelector} from 'react-redux'
import {PRODUCT_DETAILS_RESET, USERS_PRODUCTS_BY_ADMIN_RESET} from '../redux/constants/productConstants'
import {getAllUsersProductsByAdmin} from '../redux/actions/productActions'


const ProductsListByAdminScreen = ({history}) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [prod, setProd] = useState('')
  const {userInfo} = useSelector(({userLoginReducer}) => userLoginReducer)
  const {productsByAdmin, filterProducts} = useSelector(({getAllProductsByAdminReducer}) => getAllProductsByAdminReducer)

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch({type: USERS_PRODUCTS_BY_ADMIN_RESET})
      dispatch({type: PRODUCT_DETAILS_RESET})
      dispatch(getAllUsersProductsByAdmin())
    }
    // eslint-disable-next-line
  }, [dispatch, userInfo])

  const deleteProductHandler = async (product) => {
    await setProd(product)
    setShow(true)
  }


  return (
    <Layout title='All Users Products' description='Here You can look, create, update and delete all users products!'>
      <Container>
        <InputFilter label='Search product by User name or title or category'/>
        <h1>Users Products</h1>
        {
          productsByAdmin && productsByAdmin.length === 0 ?
            <h3 className='text-center'>Users have no products!</h3>
            :
            <Table striped bordered hover variant="dark" className='table-responsive-sm' size='sm'>
              <thead>
              <tr>
                <th>USER</th>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>count In Stock</th>
                <th/>
              </tr>
              </thead>
              <tbody>
              {
                filterProducts !== null ?
                  filterProducts && filterProducts.map((product) => (
                    <tr key={product._id}>
                      <td>{product.userId.name}</td>
                      <td>{product.title}</td>
                      <td>{product.category.name}</td>
                      <td>{product.price}</td>
                      <td>{product.countInStock}</td>
                      <td className='d-flex justify-content-around'>
                        <Link to={`/my-products/${product._id}/edit`}
                              className='btn btn-primary btn-outline-light btn-sm'>
                          Details
                        </Link>
                        <Button onClick={() => deleteProductHandler(product)}
                                className='btn btn-danger btn-outline-light btn-sm'
                                variant='danger'>Delete</Button>
                      </td>
                    </tr>
                  ))
                  :
                  productsByAdmin && productsByAdmin.map((product) => (
                    <tr key={product._id}>
                      <td>{product.userId.name}</td>
                      <td>{product.title}</td>
                      <td>{product.category.name}</td>
                      <td>{product.price}</td>
                      <td>{product.countInStock}</td>
                      <td className='d-flex justify-content-around'>
                        <Link to={`/my-products/${product._id}/edit`}
                              className='btn btn-primary btn-outline-light btn-sm'>
                          Details
                        </Link>
                        <Button onClick={() => deleteProductHandler(product)}
                                className='btn btn-danger btn-outline-light btn-sm'
                                variant='danger'>Delete</Button>
                      </td>
                    </tr>
                  ))
              }
              </tbody>

              <ModalWindowAdmin
                size='sm'
                title='Product Deleting!'
                product={prod}
                show={show}
                onHide={() => setShow(false)}
              />

            </Table>
        }
      </Container>
    </Layout>
  )
}

export default ProductsListByAdminScreen