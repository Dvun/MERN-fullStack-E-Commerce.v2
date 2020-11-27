import * as consts from '../constants/cartConstants'

const itemsFromLocalStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems'))
  :
  []

const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod') ?
  JSON.parse(localStorage.getItem('paymentMethod'))
  :
  {}

const initialState = {
  cartItems: itemsFromLocalStorage,
  paymentMethod: paymentMethodFromLocalStorage
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case consts.ADD_TO_CART_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find(prod => prod._id === item._id)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(prod => prod._id === existItem._id ? item : prod),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        }
      }

    case consts.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }

    case consts.REMOVE_FROM_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(prod => prod._id !== action.payload)
      }


    default:
      return state
  }
}