import React, {useEffect} from 'react'
import Layout from '../helpers/Layout'
import {useDispatch, useSelector} from 'react-redux'
import {getAllProducts} from '../redux/actions/productActions'
import {Paginate, Products, SearchBox} from '../components'
import {Container, Row} from 'react-bootstrap'

const ShopListScreen = ({match}) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1
  const {products, page, pages} = useSelector(({getAllProductsReducer}) => getAllProductsReducer)

  useEffect(() => {
    dispatch(getAllProducts('', pageNumber))
  }, [dispatch, pageNumber])


  return (
    <Layout title='React E-Commerce' description='Best E-Commerce on React'>
      <Container fluid>
        <SearchBox label='Search product...'/>
        <Row className='justify-content-around' lg={8}>
          {
            products && products.map(product => (
              <Products key={product._id} product={product}/>
            ))
          }
        </Row>
      </Container>
      <div className='d-flex justify-content-center mt-5'>
        <Paginate pages={pages} page={page}/>
      </div>
    </Layout>
  )
}

export default ShopListScreen