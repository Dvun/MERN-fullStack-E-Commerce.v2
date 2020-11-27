import * as consts from '../constants/orderConstants'
import {CLEAR_FILTER, FILTERING} from '../constants/filterConstants'


const initialState = {
  isLoading: false,
  orderItems: [],
  shippingAddress: {},
  order: {},
  orders: [],
  filteredOrders: [],
  success: false,
  orderErrorMessage: null,
  orderSuccessMessage: null,
  successPay: false,
  successDeliver: false
}

export const orderReducers = (state = initialState, action) => {
  switch (action.type) {
    case consts.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true
      }

    case consts.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        order: action.payload
      }

    case consts.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: action.payload
      }

    case consts.ORDER_PAY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successPay: true
      }

    case consts.ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        successDeliver: true
      }

    case consts.GET_ALL_ORDERS_BY_ADMIN_SUCCESS:
      return {
        ...state,
        orders: action.payload
      }

    case consts.ORDERS_LIST_MY_SUCCESS:
      return {
        ...state,
        orders: action.payload
      }

    case consts.DELETE_ORDER_BY_ADMIN_SUCCESS:
      return {
        ...state,
        orderSuccessMessage: action.payload
      }

    case FILTERING:
      return {
        ...state,
        filteredOrders: state.orders.filter(order => {
          const regex = RegExp(`${action.payload}`, 'gi')
          return order.user.name.match(regex)
        }),
      }

    case CLEAR_FILTER:
      return {
        ...state,
        filteredOrders: null,
      }


    case consts.ORDER_DETAILS_FAIL:
    case consts.ORDER_CREATE_FAIL:
    case consts.ORDER_PAY_FAIL:
    case consts.ORDERS_LIST_MY_FAIL:
    case consts.GET_ALL_ORDERS_BY_ADMIN_FAIL:
    case consts.DELETE_ORDER_BY_ADMIN_FAIL:
    case consts.ORDER_DELIVER_FAIL:
      return {
        ...state,
        isLoading: false,
        successDeliver: false,
        successPay: false,
        orderErrorMessage: action.payload
      }

    case consts.ORDERS_LIST_MY_RESET:
      return {
        ...state,
        orders: []
      }

    case consts.ORDER_PAY_RESET:
      return {
        ...state,
        successPay: false
      }

    case consts.ORDER_DELIVER_RESET:
      return {
        ...state,
        successDeliver: false
      }


    default:
      return state
  }
}