import axios from 'axios'
import * as consts from '../constants/categoryConstants'


export const getAllCategories = (keyword = '') => async (dispatch) => {
  try {
    const res = await axios.get(`/api/categories?keyword=${keyword}`)
    dispatch({type: consts.GET_ALL_CATEGORIES_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.GET_ALL_CATEGORIES_FAIL, payload: e.response.data})
  }
}
export const addNewCategory = (data) => async (dispatch, getState) => {
  const userInfo = getState().userLoginReducer.userInfo
  const config = {headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userInfo.token}`
  }}
  try {
    const res = await axios.post(`/api/categories/add-category`, data, config)
    dispatch({type: consts.ADD_NEW_CATEGORY_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.ADD_NEW_CATEGORY_FAIL, payload: e.response.data})
  }
}
export const deleteCategory = (id) => async (dispatch, getState) => {
  dispatch({type: consts.DELETE_CATEGORY_REQUEST})
  const userInfo = getState().userLoginReducer.userInfo
  const config = {headers: {
      Authorization: `Bearer ${userInfo.token}`
    }}
  try {
    const res = await axios.delete(`/api/categories/category/${id}`, config)
    dispatch({type: consts.DELETE_CATEGORY_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.DELETE_CATEGORY_FAIL, payload: e.response.data})
  }
}
export const updateCategory = (updatedCategory) => async (dispatch, getState) => {
  dispatch({type: consts.UPDATE_CATEGORY_REQUEST})
  const userInfo = getState().userLoginReducer.userInfo
  const config = {headers: {
      Authorization: `Bearer ${userInfo.token}`
    }}
  try {
    const res = await axios.put(`/api/categories/category/edit-category/${updatedCategory._id}`, updatedCategory, config)
    dispatch({type: consts.UPDATE_CATEGORY_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.UPDATE_CATEGORY_FAIL, payload: e.response.data})
  }
}
