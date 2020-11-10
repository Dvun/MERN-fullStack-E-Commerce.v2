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


  useEffect(() => {
    if (productSuccessMessage && productSuccessMessage.msg) notifySuccess(productSuccessMessage.msg)
    if (successRegister && successRegister.msg) notifySuccess(successRegister.msg)


    if (userErrorMessage && userErrorMessage.msg) notifyError(userErrorMessage.msg)
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
    deleteUser
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