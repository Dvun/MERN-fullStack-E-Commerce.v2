import {combineReducers} from 'redux'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  usersDetailsReducer,
  deleteUserByAdmin
} from './reducers/userReducers'
import {
  getAllNewArrivedProductsReducer,
  getAllProductsReducer,
  getProductDetailsReducer,
  getAllProductsByUserReducer,
  deleteProductByUserReducer,
  createNewProductByUserReducer,
  updateProductByUserReducer,
  getAllProductsByAdminReducer
} from './reducers/productReducers'
import {
  CategoriesReducer,
} from './reducers/categoryReducers'


const rootReducer = combineReducers({
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  usersDetailsReducer,
  deleteUserByAdmin,

  getAllProductsReducer,
  getAllNewArrivedProductsReducer,
  getProductDetailsReducer,
  getAllProductsByUserReducer,
  deleteProductByUserReducer,
  updateProductByUserReducer,
  getAllProductsByAdminReducer,

  CategoriesReducer,
  createNewProductByUserReducer
})


export default rootReducer