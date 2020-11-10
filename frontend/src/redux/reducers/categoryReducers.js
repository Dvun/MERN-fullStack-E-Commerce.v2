import * as consts from '../constants/categoryConstants'

export const getAllCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case consts.GET_ALL_CATEGORIES_REQUEST: return {...state, isLoading: true}
    case consts.GET_ALL_CATEGORIES_SUCCESS: return {isLoading: false, categories: action.payload}
    case consts.GET_ALL_CATEGORIES_FAIL: return {isLoading: false, categoryErrorMessage: action.payload}
    case consts.CLEAR_MESSAGES: return {...state, categoryErrorMessage: null}
    default: return state
  }
}