import axios from 'axios'
import * as consts from '../constants/cartConstants'


export const addToCart = (prodId, qty) => async (dispatch, getState) => {
  const res = await axios.get(`/api/products/product/${prodId}`)
  if (res) {
    dispatch({
      type: consts.ADD_TO_CART_ITEM, payload: {
        _id: res.data._id,
        title: res.data.title,
        image: res.data.picturePath,
        price: res.data.price,
        countInStock: res.data.countInStock,
        qty,
      },
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))
  }
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  await dispatch({type: consts.REMOVE_FROM_CART_ITEM, payload: id})
  localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))
}