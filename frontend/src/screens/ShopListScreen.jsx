import React, {useEffect} from 'react'
import Layout from '../helpers/Layout'
import {useDispatch, useSelector} from 'react-redux'
import {getAllProducts} from '../redux/actions/productActions'
import {Products} from '../components'
import {Container, Row} from 'react-bootstrap'

const ShopListScreen = () => {
  const dispatch = useDispatch()
  const {products} = useSelector(({getAllProductsReducer}) => getAllProductsReducer)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])


  return (
    <Layout title='React E-Commerce' description='Best E-Commerce on React'>
      <Container fluid>
        <Row className='justify-content-around' lg={8}>
          {products && products.map(product => (
            <Products key={product._id} product={product}/>
          ))}
        </Row>
      </Container>
    </Layout>
  )
}

export default ShopListScreen