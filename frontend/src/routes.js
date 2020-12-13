import React, {lazy} from 'react'
import {Route, Switch} from 'react-router-dom'
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  ShopListScreen,
  ProductScreen,
} from './screens/index'
const ProfileEditScreen = lazy(() => import('./screens/ProfileEditScreen'))
const UsersScreen = lazy(() => import('./screens/UsersScreen'))
const UserProfileEditByAdminScreen = lazy(() => import('./screens/UserProfileEditByAdminScreen'))
const ProductsListScreen = lazy(() => import('./screens/ProductsListScreen'))
const ProductEditScreen = lazy(() => import('./screens/ProductEditScreen'))
const ProductsListByAdminScreen = lazy(() => import('./screens/ProductsListByAdminScreen'))
const CategoriesScreen = lazy(() => import('./screens/CategoriesScreen'))
const CartScreen = lazy(() => import('./screens/CartScreen'))
const PlaceOrderScreen = lazy(() => import('./screens/PlaceOrderScreen'))
const OrderScreen = lazy(() => import('./screens/OrderScreen'))
const OrderListByAdminScreen = lazy(() => import('./screens/OrderListByAdminScreen'))
const OrderListByUserScreen = lazy(() => import('./screens/OrderListByUserScreen'))


const Routes = () => {
  return (
    <Switch>
      <Route path='/' component={HomeScreen} exact/>
      <Route path='/login' component={LoginScreen}/>
      <Route path='/register' component={RegisterScreen}/>
      <Route path='/profile' component={ProfileEditScreen}/>
      <Route path='/shop/search/:keyword' component={ShopListScreen}/>
      <Route path='/shop' component={ShopListScreen} exact/>
      <Route path='/shop/product/:id' component={ProductScreen}/>
      <Route path='/my-products' component={ProductsListScreen} exact/>
      <Route path='/my-products/add' component={ProductEditScreen}/>
      <Route path='/my-products/:id/edit' component={ProductEditScreen}/>
      <Route path='/cart' component={CartScreen} exact/>
      <Route path='/placeorder' component={PlaceOrderScreen}/>
      <Route path='/orders/:id' component={OrderScreen}/>
      <Route path='/my-orders' component={OrderListByUserScreen}/>

      <Route path='/admin/all-users' component={UsersScreen} exact/>
      <Route path='/admin/all-categories' component={CategoriesScreen}/>
      <Route path='/admin/all-users/user/:id' component={UserProfileEditByAdminScreen}/>
      <Route path='/admin/all-products' component={ProductsListByAdminScreen}/>
      <Route path='/admin/all-orders' component={OrderListByAdminScreen}/>
    </Switch>
  )
}

export default Routes