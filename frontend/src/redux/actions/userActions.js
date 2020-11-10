import axios from 'axios'
import * as consts from '../constants/userConstants'


export const userLogin = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {'Content-Type': 'application/json'}
    }
    const res = await axios.post('/api/users/login', userData, config)
    dispatch({type: consts.USER_LOGIN_SUCCESS, payload: res.data})
    localStorage.setItem('userInfo', JSON.stringify(res.data))
  } catch (e) {
    dispatch({type: consts.USER_LOGIN_FAIL, payload: e.response.data})
  }
}
export const registerUser = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {'Content-Type': 'application/json'}
    }
    const res = await axios.post('/api/users/register', userData, config)
    dispatch({type: consts.USER_REGISTER_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.USER_REGISTER_FAIL, payload: e.response.data})
  }
}
export const getUserDetails = () => async (dispatch, getState) => {
  const userInfo = getState().userLoginReducer.userInfo
  const config = {headers: {Authorization: `Bearer ${userInfo.token}`}}
  try {
    const res = await axios.get(`/api/users/user/edit-profile`, config)
    dispatch({type: consts.USER_DETAILS_SUCCESS, payload: res.data})
  } catch (e) {
    console.error(e)
    dispatch({type: consts.USER_DETAILS_FAIL, payload: e.response.data})
  }
}
export const userUpdateProfile = (userData) => async (dispatch, getState) => {
  dispatch({type: consts.USER_UPDATE_REQUEST})
  const userInfo = getState().userLoginReducer.userInfo
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  try {
    const res = await axios.put(`/api/users/user/edit-profile`, userData, config)
    dispatch({type: consts.USER_UPDATE_SUCCESS, payload: res.data})
    dispatch({type: consts.USER_LOGIN_SUCCESS, payload: res.data})
    localStorage.setItem('userInfo', JSON.stringify(res.data))
  } catch (e) {
    console.error(e)
    dispatch({type: consts.USER_UPDATE_FAIL, payload: e.response.data})
  }
}


export const userLogout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({type: consts.USER_LOGOUT})
  dispatch({type: consts.USER_DETAILS_RESET})
}


// Admin
export const getAllUsersByAdmin = () => async (dispatch, getState) => {
  const userInfo = getState().userLoginReducer.userInfo
  try {
    const config = {
      headers: {Authorization: `Bearer ${userInfo.token}`}
    }
    const res = await axios.get(`/api/users/admin`, config)
    dispatch({type: consts.USERS_DETAILS_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.USERS_DETAILS_FAIL, payload: e.response.data})
  }
}
export const getUserDetailsByAdmin = (id) => async (dispatch, getState) => {
  const userInfo = getState().userLoginReducer.userInfo
  try {
    const config = {
      headers: {Authorization: `Bearer ${userInfo.token}`}
    }
    const res = await axios.get(`/api/users/${id}`, config)
    dispatch({type: consts.USER_DETAILS_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.USER_DETAILS_FAIL, payload: e.response.data})
  }
}
export const updateProfileByAdmin = (userData) => async (dispatch, getState) => {
  const userInfo = getState().userLoginReducer.userInfo
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  try {
    const res = await axios.put(`/api/users/${userData._id}`, userData, config)
    dispatch({type: consts.USER_UPDATE_SUCCESS})
    dispatch({type: consts.USER_DETAILS_SUCCESS, payload: res.data})
    if (userInfo._id === userData._id) {
      console.log('same user')
      dispatch({type: consts.USER_LOGIN_SUCCESS, payload: res.data})
    }
  } catch (e) {
    dispatch({type: consts.USER_UPDATE_FAIL, payload: e.response.data})
  }
}
export const deleteUserByAdmin = (id) => async (dispatch, getState) => {
  const userInfo = getState().userLoginReducer.userInfo
  const config = {headers: {Authorization: `Bearer ${userInfo.token}`}}
  try {
    const res = await axios.delete(`/api/users/${id}`, config)
    dispatch({type: consts.USER_DELETE_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.USER_DELETE_FAIL, payload: e.response.data})
  }
}



