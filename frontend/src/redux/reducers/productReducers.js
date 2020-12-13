import * as consts from '../constants/productConstants'
import {CLEAR_FILTER, FILTERING} from '../constants/filterConstants'


export const getAllProductsReducer = (state = {products: []}, action) => {
  switch (action.type) {
    case consts.PRODUCTS_SUCCESS: return {products: action.payload}
    case consts.PRODUCTS_FAIL: return {productErrorMessage: action.payload}
    case consts.CLEAR_MESSAGES: return {...state, productErrorMessage: null}
    default: return state
  }
}
export const getAllNewArrivedProductsReducer = (state = {newArrivedProducts: []}, action) => {
  switch (action.type) {
    case consts.NEW_ARRIVED_PRODUCTS_SUCCESS: return {newArrivedProducts: action.payload}
    case consts.NEW_ARRIVED_PRODUCTS_FAIL: return {productErrorMessage: action.payload}
    case consts.CLEAR_MESSAGES: return {...state, productErrorMessage: null}
    default: return state
  }
}
export const getProductDetailsReducer = (state = {product: {}}, action) => {
  switch (action.type) {
    case consts.PRODUCT_DETAILS_SUCCESS: return {product: action.payload}
    case consts.PRODUCT_DETAILS_FAIL: return {productErrorMessage: action.payload}
    case consts.PRODUCT_DETAILS_RESET: return {product: {}}
    case consts.CLEAR_MESSAGES: return {...state, productErrorMessage: null}
    default: return state
  }
}
export const getAllProductsByUserReducer = (state = {userProducts: []}, action) => {
  switch (action.type) {
    case consts.USER_PRODUCTS_SUCCESS: return {...state, userProducts: action.payload}
    case consts.USER_PRODUCTS_FAIL: return {productErrorMessage: action.payload}
    case consts.CLEAR_MESSAGES: return {...state, productErrorMessage: null}
    case consts.USER_PRODUCTS_RESET: return {...state, userProducts: []}
    default: return state
  }
}
export const deleteProductByUserReducer = (state = {userProducts: []}, action) => {
  switch (action.type) {
    case consts.USER_PRODUCT_DELETE_REQUEST: return {isLoading: true}
    case consts.USER_PRODUCT_DELETE_SUCCESS: return {...state, productSuccessMessage: action.payload, isLoading: false}
    case consts.USER_PRODUCT_DELETE_FAIL: return {productErrorMessage: action.payload, isLoading: false}
    case consts.CLEAR_MESSAGES: return {...state, productErrorMessage: null, productSuccessMessage: null}
    default: return state
  }
}
export const createNewProductByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case consts.CREATE_NEW_PRODUCT_SUCCESS: return {productSuccessMessage: action.payload, success: true}
    case consts.CREATE_NEW_PRODUCT_FAIL: return {productErrorMessage: action.payload, success: false}
    case consts.CREATE_NEW_PRODUCT_RESET: return {success: false}
    case consts.CLEAR_MESSAGES: return {...state, productErrorMessage: null, productSuccessMessage: null}
    default: return state
  }
}
export const updateProductByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case consts.UPDATE_PRODUCT_SUCCESS: return {productSuccessMessage: action.payload, success: true}
    case consts.UPDATE_PRODUCT_FAIL: return {productErrorMessage: action.payload, success: false}
    case consts.CREATE_NEW_PRODUCT_RESET: return {success: false}
    case consts.CLEAR_MESSAGES: return {...state, productErrorMessage: null, productSuccessMessage: null}
    default: return state
  }
}
export const productReviewCreateByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case consts.CREATE_PRODUCT_REVIEW_BY_USER_SUCCESS: return {productReviewSuccessMessage: action.payload, reviewSuccess: true}
    case consts.CREATE_PRODUCT_REVIEW_BY_USER_FAIL: return {productReviewErrorMessage: action.payload, reviewSuccess: false}
    case consts.CREATE_PRODUCT_REVIEW_BY_USER_RESET: return {reviewSuccess: false}
    case consts.CLEAR_MESSAGES: return {...state, productReviewSuccessMessage: null, productReviewErrorMessage: null, reviewSuccess: false}
    default: return state
  }
}
export const getAllProductsByAdminReducer = (state = {productsByAdmin: [], filterProducts: null}, action) => {
  switch (action.type) {
    case consts.USERS_PRODUCTS_BY_ADMIN_SUCCESS: return {productsByAdmin: action.payload, isLoading: false, filterProducts: null}

    case FILTERING:
      return {
        ...state,
        filterProducts: state.productsByAdmin.filter(product => {
          const regex = RegExp(`${action.payload}`, 'gi')
          return product.title.match(regex) ||
            product.category.name.match(regex) ||
            product.userId.name.match(regex)
        }),
      }

    case CLEAR_FILTER:
      return {
        ...state,
        filterProducts: null,
      }

    case consts.USERS_PRODUCTS_BY_ADMIN_FAIL: return {productErrorMessage: action.payload}
    case consts.CLEAR_MESSAGES: return {...state, productErrorMessage: null}
    default: return state
  }
}


