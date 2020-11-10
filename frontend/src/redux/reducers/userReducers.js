import * as consts from '../constants/userConstants'

const userFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null


export const userLoginReducer = (state = {userInfo: userFromLocalStorage}, action) => {
  switch (action.type) {
    case consts.USER_LOGIN_SUCCESS: return {isAuth: true, userInfo: action.payload, userErrorMessage: null, success: true}
    case consts.USER_LOGIN_FAIL: return {userErrorMessage: action.payload, isAuth: false, success: false}
    case consts.USER_LOGOUT: return {}
    default: return state
  }
}
export const userRegisterReducer = (state = {success: false}, action) => {
  switch (action.type) {
    case consts.USER_REGISTER_SUCCESS: return {successRegister: action.payload, errorRegister: null, success: true}
    case consts.USER_REGISTER_FAIL: return {errorRegister: action.payload, successRegister: false, success: false}
    case consts.USER_REGISTER_RESET: return {success: false}
    default: return state
  }
}
export const userDetailsReducer = (state = {user: {}}, action) => {
  switch (action.type) {
    case consts.USER_DETAILS_SUCCESS: return {user: action.payload}
    case consts.USER_DETAILS_FAIL: return {userErrorMessage: action.payload}
    case consts.USER_DETAILS_RESET: return {...state, user: {}}
    case consts.CLEAR_MESSAGES: return {...state, userErrorMessage: null}
    default: return state
  }
}
export const userUpdateReducer = (state = {user: {}}, action) => {
  switch (action.type) {
    case consts.USER_UPDATE_SUCCESS: return {success: true}
    case consts.USER_UPDATE_FAIL: return {userErrorMessage: action.payload, success: false}
    case consts.USER_UPDATE_RESET: return {user: {}}
    case consts.CLEAR_MESSAGES: return {...state, userErrorMessage: null, success: false}
    default: return state
  }
}
export const usersDetailsReducer = (state = {users: []}, action) => {
  switch (action.type) {
    case consts.USERS_DETAILS_SUCCESS: return {users: action.payload}
    case consts.USERS_DETAILS_FAIL: return {userErrorMessage: action.payload}
    default: return state
  }
}
export const deleteUserByAdmin = (state = {users: []}, action) => {
  switch (action.type) {
    case consts.USER_DELETE_SUCCESS: return {...state, userSuccessMessages: action.payload}
    case consts.USER_DELETE_FAIL: return {userErrorMessage: action.payload}
    case consts.CLEAR_MESSAGES: return {...state, userErrorMessage: null, userSuccessMessages: null}
    default: return state
  }
}

