import React, {useEffect} from 'react'
import Layout from '../helpers/Layout'
import {useDispatch, useSelector} from 'react-redux'
import {getAllNewArrivedProducts} from '../redux/actions/productActions'
import {Carousel, Container, Image, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const {newArrivedProducts} = useSelector(({getAllNewArrivedProductsReducer}) => getAllNewArrivedProductsReducer)

  useEffect(() => {
    dispatch(getAllNewArrivedProducts('createdAt'))
  }, [dispatch])


  return (
    <Layout title='React E-Commerce' description='Best E-Commerce on React'>
      <Container>
        <h1 className='text-center'>New Arrived Products</h1>
        <Carousel pause='hover' className='bg-dark'>
          {
            newArrivedProducts && newArrivedProducts.map(product => (
              <Carousel.Item key={product._id}>
                <Link to={`/shop/product/${product._id}`}>
                  <Image
                    src={`${window.location.origin}/${product.picturePath}`}
                    alt={product.title}
                    fluid
                  />
                  <Carousel.Caption className='carousel-caption'>
                    <h3>{product.title}</h3>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))
          }
        </Carousel>
      </Container>
    </Layout>
  )
}

export default HomeScreen