import React, {useEffect} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useDispatch, useSelector} from 'react-redux'
import * as consts from '../redux/constants/userConstants'


const ToastMessages = () => {
  const dispatch = useDispatch()
  const {userErrorMessage} = useSelector(({userLoginReducer}) => userLoginReducer)
  const {successRegister, errorRegister} = useSelector(({userRegisterReducer}) => userRegisterReducer)
  const {success: updateSuccess} = useSelector(({ userUpdateReducer }) => userUpdateReducer)
  const {userSuccessMessages: deleteUser} = useSelector(({ deleteUserByAdmin }) => deleteUserByAdmin)
  const {productSuccessMessage} = useSelector(({ createNewProductByUserReducer }) => createNewProductByUserReducer)
  const {categoryErrorMessage, categorySuccessMessage} = useSelector(({ CategoriesReducer }) => CategoriesReducer)
  const {productReviewSuccessMessage, productReviewErrorMessage} = useSelector(({productReviewCreateByUserReducer}) => productReviewCreateByUserReducer)


  useEffect(() => {
    if (productSuccessMessage && productSuccessMessage.msg) notifySuccess(productSuccessMessage.msg)
    if (successRegister && successRegister.msg) notifySuccess(successRegister.msg)
    if (categorySuccessMessage && categorySuccessMessage.msg) notifySuccess(categorySuccessMessage.msg)
    if (productReviewSuccessMessage && productReviewSuccessMessage.msg) notifySuccess(productReviewSuccessMessage.msg)


    if (userErrorMessage && userErrorMessage.msg) notifyError(userErrorMessage.msg)
    if (productReviewErrorMessage && productReviewErrorMessage.msg) notifyError(productReviewErrorMessage.msg)
    if (categoryErrorMessage && categoryErrorMessage.msg) notifyError(categoryErrorMessage.msg)
    if (errorRegister && errorRegister.msg) notifyError(errorRegister.msg)
    if (deleteUser && deleteUser.msg) notifySuccess(deleteUser.msg)
    if (updateSuccess) notifySuccess('Profile Updated!')

    dispatch({type: consts.CLEAR_MESSAGES})
  }, [
    successRegister,
    errorRegister,
    productSuccessMessage,
    userErrorMessage,
    dispatch,
    updateSuccess,
    deleteUser,
    categorySuccessMessage,
    categoryErrorMessage,
    productReviewSuccessMessage,
    productReviewErrorMessage
  ])

  const notifySuccess = (content) => {
    toast.success(content, {
      position: 'bottom-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    })
  }

  const notifyError = (content) => {
    toast.error(content, {
      position: 'bottom-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    })
  }


  return (
    <div>
      <ToastContainer/>
    </div>
  )
}

export default ToastMessages