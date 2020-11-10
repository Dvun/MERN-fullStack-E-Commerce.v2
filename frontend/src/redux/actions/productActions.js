import axios from 'axios'
import * as consts from '../constants/productConstants'


export const getAllProducts = () => async (dispatch) => {
  dispatch({type: consts.PRODUCTS_REQUEST})
  try {
    const res = await axios.get('/api/products')
    dispatch({type: consts.PRODUCTS_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.PRODUCTS_FAIL, payload: e.response.data})
  }
}
export const getAllNewArrivedProducts = (createdAt) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/sort/${createdAt}`)
    dispatch({type: consts.NEW_ARRIVED_PRODUCTS_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.NEW_ARRIVED_PRODUCTS_FAIL})
  }
}
export const getProductDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/product/${id}`)
    dispatch({type: consts.PRODUCT_DETAILS_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.PRODUCT_DETAILS_FAIL, payload: e.response.data})
  }
}
export const getAllUserProducts = (userId) => async (dispatch, getState) => {
  const config = {headers: {Authorization: `Bearer ${getState().userLoginReducer.userInfo.token}`}}
  try {
    const res = await axios.get(`/api/products/${userId}`, config)
    dispatch({type: consts.USER_PRODUCTS_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.USER_PRODUCTS_FAIL, payload: e.response.data})
  }
}
export const deleteProductByUser = (id) => async (dispatch, getState) => {
  const config = {headers: {Authorization: `Bearer ${getState().userLoginReducer.userInfo.token}`}}
  try {
    const res = await axios.delete(`/api/products/${id}`, config)
    dispatch({type: consts.USER_PRODUCT_DELETE_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.USER_PRODUCT_DELETE_FAIL, payload: e.response.data})
  }
}
export const createNewProductByUser = (productData) => async (dispatch, getState) => {
  const config = {
    headers:
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLoginReducer.userInfo.token}`,
      }
  }
  try {
    const res = await axios.post(`/api/products/add-product`, productData, config)
    dispatch({type: consts.CREATE_NEW_PRODUCT_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.CREATE_NEW_PRODUCT_FAIL, payload: e.response.data})
  }
}
export const updateProductByUser = (productData) => async (dispatch, getState) => {
  const config = {headers:
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLoginReducer.userInfo.token}`
      }}
  try {
    const res = await axios.put(`/api/products/product/${productData._id}`, productData, config)
    dispatch({type: consts.UPDATE_PRODUCT_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.UPDATE_PRODUCT_FAIL, payload: e.response.data})
  }
}

// Admin

export const getAllUsersProductsByAdmin = () => async (dispatch, getState) => {
  const config = {headers: {Authorization: `Bearer ${getState().userLoginReducer.userInfo.token}`}}
  try {
    const res = await axios.get('/api/products/admin', config)
    dispatch({type: consts.USERS_PRODUCTS_BY_ADMIN_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.USERS_PRODUCTS_BY_ADMIN_FAIL, payload: e.response.data})
  }
}
export const deleteProductByAdmin = (id) => async (dispatch, getState) => {
  dispatch({type: consts.USER_PRODUCT_DELETE_REQUEST})
  const config = {headers: {Authorization: `Bearer ${getState().userLoginReducer.userInfo.token}`}}
  try {
    const res = await axios.delete(`/api/products/admin/product/${id}`, config)
    dispatch({type: consts.USER_PRODUCT_DELETE_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.USER_PRODUCT_DELETE_FAIL, payload: e.response.data})
  }
}