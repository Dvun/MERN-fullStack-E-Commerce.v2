import React, {useEffect, useState} from 'react'
import Layout from '../helpers/Layout'
import styled from 'styled-components'
import axios from 'axios'
import {
  Container,
  Card,
  CardImg,
  Row,
  Col,
  ListGroupItem,
  Form,
  Button,
  ListGroup,
  InputGroup,
  FormControl,
  FormLabel,
} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import {faArrowLeft, faCloudUploadAlt, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {getAllCategories} from '../redux/actions/categoryActions'
import {getProductDetails, createNewProductByUser, updateProductByUser} from '../redux/actions/productActions'
import * as consts from '../redux/constants/productConstants'


const ProductEditScreen = ({history, match}) => {
  const dispatch = useDispatch()
  const url = match.path
  const [previewImg, setPreviewImg] = useState(null)
  const [data, setData] = useState()
  const [uploading, setUploading] = useState(false)
  const [loadedPicture, setLoadedPicture] = useState({})
  const {register, handleSubmit, errors, reset} = useForm()
  const {categories} = useSelector(({CategoriesReducer}) => CategoriesReducer)
  const {product} = useSelector(({getProductDetailsReducer}) => getProductDetailsReducer)
  const {userInfo} = useSelector(({userLoginReducer}) => userLoginReducer)
  const {success} = useSelector(({createNewProductByUserReducer}) => createNewProductByUserReducer)


  useEffect(() => {
    dispatch({type: consts.CLEAR_MESSAGES})
    if (!categories) {
      dispatch(getAllCategories())
    }
    if (url !== '/my-products/add') {
      if (!product.title || product._id !== match.params.id) {
        dispatch(getProductDetails(match.params.id))
      } else {
        const fetchData = async () => {
          setData(await product)
        }
        fetchData()
      }
    }
  }, [dispatch, match.params.id, product, categories, url])

  const onSubmit = async (productData) => {
    if (!uploading) {
      if (url === '/my-products/add' && !uploading) {
        const newProduct = {
          userId: userInfo._id,
          category: productData.category,
          title: productData.title,
          description: productData.description,
          price: productData.price,
          countInStock: productData.countInStock,
          picturePath: loadedPicture.path || data.picture,
          fileName: loadedPicture.filename || data.fileName,
        }
        await dispatch(createNewProductByUser(newProduct))
        if (!success) {
          reset()
          setPreviewImg(null)
          dispatch({type: consts.CREATE_NEW_PRODUCT_RESET})
        }
      }
      if (url === '/my-products/:id/edit') {
        const updateProduct = {
          _id: match.params.id,
          userId: data.userId,
          category: productData.category || data.category,
          title: productData.title || data.title,
          description: productData.description || data.description,
          price: productData.price || data.price,
          countInStock: productData.countInStock || data.countInStock,
          picturePath: loadedPicture.path || data.picturePath,
          fileName: loadedPicture.filename || data.fileName,
        }
        await dispatch(updateProductByUser(updateProduct))
        if (!success) {
          reset()
          setPreviewImg(null)
          dispatch({type: consts.CREATE_NEW_PRODUCT_RESET})
          dispatch({type: consts.PRODUCT_DETAILS_RESET})
          history.goBack()
        }
      }
    }
  }


  const showPreviewPic = async (e) => {
    const fileFromInput = await e.target.files[0]
    const formData = await new FormData()
    await formData.append('picture', fileFromInput)
    try {
      setUploading(true)
      const config = {headers: {'Content-Type': 'multipart/form-data'}}
      const res = await axios.post('/api/uploads', formData, config)
      setLoadedPicture(res.data)
      setUploading(false)
      if (res.data) {
        dispatch({type: consts.PRODUCT_DETAILS_RESET})
      }
    } catch
      (e) {
      console.error(e)
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImg(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const handleBack = () => {
    dispatch({type: consts.PRODUCT_DETAILS_RESET})
    history.goBack()
  }

  return (
    <Layout title='Product Editor'
            description='Edit your products! If You need some Category what have no in list, please write to admin@shop.com'>
      <Container>
        <Button className='btn btn-light btn-outline-dark' onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft}/> Products list
        </Button>
        <h1>Create new Product</h1>
        <Card>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>

              <Col md={5} className='d-flex py-3 px-4'>
                <CardImg
                  src={url === '/my-products/add' ? previewImg && previewImg : data && `${window.location.origin}/${data.picturePath}`}
                  alt='previewImg'/>
              </Col>

              <Col md={7}>
                <ListGroup variant='flush'>

                  {/*Title Input*/}
                  <ListGroupItem>
                    <Row>
                      <Col md={2}>
                        <FormLabel id='title'>Title: </FormLabel>
                      </Col>
                      <Col>
                        <InputGroup size="sm">
                          <FormControl
                            type='text'
                            placeholder='Enter product name'
                            defaultValue={data && data.title}
                            name='title'
                            id='title'
                            ref={register({required: true})}
                          />
                          {errors.title &&
                          <span style={{color: 'darkred'}}><FontAwesomeIcon icon={faExclamationTriangle}/> This field is required!</span>
                          }
                        </InputGroup>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {/*Description Input*/}
                  <ListGroupItem>
                    <Row>
                      <Col md={2}>
                        <FormLabel id='description'>Description: </FormLabel>
                      </Col>
                      <Col>
                        <InputGroup size="sm">
                          <Form.Control
                            rows={5}
                            id='description'
                            placeholder='Enter product description'
                            defaultValue={data && data.description}
                            as='textarea'
                            name='description'
                            ref={register({required: true})}
                          />
                          {errors.textarea &&
                          <span style={{color: 'darkred'}}><FontAwesomeIcon icon={faExclamationTriangle}/> This field is required!</span>
                          }
                        </InputGroup>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>

                    {/*Quantity Input*/}
                    <Row>
                      <Col md={2}>
                        <FormLabel id='countInStock'>Quantity: </FormLabel>
                      </Col>
                      <Col md={2}>
                        <InputGroup size="sm">
                          <Form.Control
                            type='number'
                            min={0}
                            placeholder='100'
                            defaultValue={data && data.countInStock}
                            id='countInStock'
                            name='countInStock'
                            ref={register({required: true})}
                          />
                          {errors.countInStock &&
                          <span style={{color: 'darkred'}}><FontAwesomeIcon icon={faExclamationTriangle}/> This field is required!</span>
                          }
                        </InputGroup>
                      </Col>

                      {/*Price Input*/}
                      <Col md={3}>
                        <InputGroup size="sm">
                          <FormLabel id='price'>Price: </FormLabel>
                          <Form.Control
                            step='0.01'
                            type='number'
                            min={0}
                            placeholder='15'
                            defaultValue={data && data.price}
                            id='price'
                            name='price'
                            ref={register({required: true})}
                          />
                          {errors.price &&
                          <span style={{color: 'darkred'}}><FontAwesomeIcon icon={faExclamationTriangle}/> This field is required!</span>
                          }
                        </InputGroup>
                      </Col>

                      {/*Category Input*/}
                      <Col>
                        <InputGroup size="sm">
                          <FormLabel id='category'>Category: </FormLabel>
                          <Form.Control
                            as='select'
                            type='text'
                            id='category'
                            defaultValue={url === '/my-products/add' ? 'DEFAULT' : data && data.category.name}
                            name='category'
                            ref={register({required: true})}
                          >
                            <option value={url === '/my-products/add' ? 'DEFAULT' : data && data.category.name}
                                    disabled>
                              Categories
                            </option>
                            {categories && categories.map(category => (
                              <option key={category._id} value={category._id}>
                                {category.name}
                              </option>
                            ))}
                          </Form.Control>
                          {errors.category &&
                          <span style={{color: 'darkred'}}><FontAwesomeIcon icon={faExclamationTriangle}/> This field is required!</span>
                          }
                        </InputGroup>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>

                      {/*File Input*/}
                      <Col className='d-flex justify-content-between'>
                        <FileButton htmlFor="upload">
                          <FontAwesomeIcon icon={faCloudUploadAlt}/> Upload Picture
                        </FileButton>
                        <Form.Control
                          hidden
                          accept='image/*'
                          id='upload'
                          type='file'
                          name='picture'
                          onChange={showPreviewPic}
                          ref={register(url === '/my-products/add' ? {required: true} : {required: false})}
                        />
                        {errors.picture &&
                        <ruby style={{color: 'darkred'}}><FontAwesomeIcon icon={faExclamationTriangle}/> This field is
                          required!</ruby>
                        }

                        <Button className='btn-primary' type='submit'>
                          Add Product
                        </Button>

                      </Col>

                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </Layout>
  )
}


const FileButton = styled.label`
  border: 1px solid #ccc;
  padding: 6px 12px;
  display: inline-block;
  cursor: pointer;
  border-radius: 0.3rem;
  background-color: #007BFF;
  color: white;
  margin-bottom: 0;

  &:hover {
    background-color: #1b62a4;
  }
`

export default ProductEditScreen