import axios from 'axios'
import * as consts from '../constants/orderConstants'
import {RESET_CART_AFTER_ORDER_PLACEMENT} from '../constants/cartConstants'


export const createOrder = (order) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLoginReducer.userInfo.token}`
      }
    }
    const res = await axios.post('/api/orders', order, config)
    await dispatch({type: consts.ORDER_CREATE_SUCCESS, payload: res.data})
    await dispatch({type: consts.ORDER_DETAILS_RESET})
    if (res.data) {
      localStorage.removeItem('cartItems')
      dispatch({type: RESET_CART_AFTER_ORDER_PLACEMENT})
    }
    await dispatch({type: consts.ORDER_CREATE_RESET})
  } catch (e) {
    dispatch({type: consts.ORDER_CREATE_FAIL, payload: e.response.data})
  }
}
export const getOrderDetails = (id) => async (dispatch, getState) => {
  dispatch({type: consts.ORDER_DETAILS_REQUEST})
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLoginReducer.userInfo.token}`
      }
    }
    const res = await axios.get(`/api/orders/${id}`, config)
    dispatch({type: consts.ORDER_DETAILS_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.ORDER_DETAILS_FAIL, payload: e.response.data})
  }
}
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLoginReducer.userInfo.token}`
      }
    }
    const res = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
    dispatch({type: consts.ORDER_PAY_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.ORDER_PAY_FAIL, payload: e.response.data})
  }
}
export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLoginReducer.userInfo.token}`
      }
    }
    const res = await axios.put(`/api/orders/${orderId}/deliver`, {}, config)
    dispatch({type: consts.ORDER_DELIVER_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.ORDER_DELIVER_FAIL, payload: e.response.data})
  }
}
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    const userInfo = getState().userLoginReducer.userInfo
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const res = await axios.get(`/api/orders/myorders`, config)
    dispatch({type: consts.ORDERS_LIST_MY_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.ORDERS_LIST_MY_FAIL, payload: e.response.data})
  }
}
export const getAllOrdersByAdmin = () => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLoginReducer.userInfo.token}`
      }
    }
    const res = await axios.get(`/api/orders`, config)
    dispatch({type: consts.GET_ALL_ORDERS_BY_ADMIN_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.GET_ALL_ORDERS_BY_ADMIN_FAIL, payload: e.response.data})
  }
}
// export const deleteOrderByAdmin = (id) => async (dispatch, getState) => {
//   try {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${getState().userLoginReducer.userInfo.token}`
//       }
//     }
//     const res = await axios.delete(`/api/orders/order/${id}`, config)
//     dispatch({type: consts.DELETE_ORDER_BY_ADMIN_SUCCESS, payload: res.data})
//   } catch (e) {
//     dispatch({type: consts.DELETE_ORDER_BY_ADMIN_FAIL, payload: e.response.data})
//   }
// }
