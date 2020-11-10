import React, {useEffect} from 'react'
import Layout from '../helpers/Layout'
import {useDispatch, useSelector} from 'react-redux'
import {getAllNewArrivedProducts} from '../redux/actions/productActions'
import {Products} from '../components'
import {Container, Row} from 'react-bootstrap'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const {newArrivedProducts} = useSelector(({getAllNewArrivedProductsReducer}) => getAllNewArrivedProductsReducer)

  useEffect(() => {
    dispatch(getAllNewArrivedProducts('createdAt'))
  }, [dispatch])


  return (
    <Layout title='React E-Commerce' description='Best E-Commerce on React'>
      <Container fluid>
        <h1>New Arrived Products</h1>
        <hr/>
        <Row className='justify-content-around' lg={8}>
          {newArrivedProducts && newArrivedProducts.map(product => (
            <Products key={product._id} product={product}/>
          ))}
        </Row>
      </Container>
    </Layout>
  )
}

export default HomeScreen