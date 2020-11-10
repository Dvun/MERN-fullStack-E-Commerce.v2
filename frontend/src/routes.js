import React, {lazy} from 'react'
import {Route, Switch} from 'react-router-dom'
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  ShopListScreen,
  ProductScreen
} from './screens/index'
const ProfileEditScreen = lazy(() => import('./screens/ProfileEditScreen'))
const UsersScreen = lazy(() => import('./screens/UsersScreen'))
const UserProfileEditByAdminScreen = lazy(() => import('./screens/UserProfileEditByAdminScreen'))
const ProductsListScreen = lazy(() => import('./screens/ProductsListScreen'))
const ProductEditScreen = lazy(() => import('./screens/ProductEditScreen'))
const ProductsListByAdminScreen = lazy(() => import('./screens/ProductsListByAdminScreen'))


const Routes = () => {
  return (
    <Switch>
      <Route path='/' component={HomeScreen} exact/>
      <Route path='/login' component={LoginScreen}/>
      <Route path='/register' component={RegisterScreen}/>
      <Route path='/profile' component={ProfileEditScreen}/>
      <Route path='/shop' component={ShopListScreen} exact/>
      <Route path='/shop/product/:id' component={ProductScreen}/>
      <Route path='/my-products' component={ProductsListScreen} exact/>
      <Route path='/my-products/add' component={ProductEditScreen} exact/>
      <Route path='/my-products/:id/edit' component={ProductEditScreen}/>

      <Route path='/admin/all-users' component={UsersScreen} exact/>
      <Route path='/admin/all-users/user/:id' component={UserProfileEditByAdminScreen}/>
      <Route path='/admin/all-products' component={ProductsListByAdminScreen}/>
    </Switch>
  )
}

export default Routes