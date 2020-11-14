import * as consts from '../constants/categoryConstants'
import {CLEAR_FILTER, FILTERING} from '../constants/filterConstants'


const initialState = {
  isLoading: false,
  categories: [],
  filteredCategories: null,
  categoryErrorMessage: null,
  categorySuccessMessage: null,
  success: false
}

export const CategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case consts.DELETE_CATEGORY_REQUEST:
    case consts.UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true
      }

    case consts.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        filteredCategories: null
      }

    case consts.ADD_NEW_CATEGORY_SUCCESS:
      return {
        ...state,
        success: true,
        categorySuccessMessage: action.payload
      }

    case consts.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categorySuccessMessage: action.payload
      }

    case consts.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        categorySuccessMessage: action.payload
      }

    case consts.GET_ALL_CATEGORIES_FAIL:
    case consts.ADD_NEW_CATEGORY_FAIL:
    case consts.DELETE_CATEGORY_FAIL:
    case consts.UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        categoryErrorMessage: action.payload
      }

    case consts.ADD_NEW_CATEGORY_RESET:
      return {
        ...state,
        categoryErrorMessage: null,
        categorySuccessMessage: null,
        success: false
      }

    case FILTERING:
      return {
        ...state,
        filteredCategories: state.categories.filter(category => {
          const regex = RegExp(`${action.payload}`, 'gi')
          return category.name.match(regex)
        }),
      }

    case CLEAR_FILTER:
      return {
        ...state,
        filteredCategories: null,
      }

    case consts.CLEAR_MESSAGES:
      return {
        ...state,
        categoryErrorMessage: null
      }


    default:
      return state
  }
}