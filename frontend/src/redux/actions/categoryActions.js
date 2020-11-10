import axios from 'axios'
import * as consts from '../constants/categoryConstants'


export const getAllCategories = () => async (dispatch) => {
  try {
  dispatch({type: consts.GET_ALL_CATEGORIES_REQUEST})
    const res = await axios.get(`/api/categories`)
    dispatch({type: consts.GET_ALL_CATEGORIES_SUCCESS, payload: res.data})
  } catch (e) {
    dispatch({type: consts.GET_ALL_CATEGORIES_FAIL, payload: e.response.data})
  }
}