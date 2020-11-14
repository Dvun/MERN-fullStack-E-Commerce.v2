import React, {useEffect, useRef} from 'react'
import TextField from '@material-ui/core/TextField'
import {useDispatch} from 'react-redux'
import {clearFilter, filtering} from '../redux/actions/filterActions'


const InputFilter = ({label}) => {
  const filter = useRef('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearFilter())
  }, [dispatch])

  const onChange = () => {
    if (filter.current.value !== '') {
      dispatch(filtering(filter.current.value))
    } else {
      dispatch(clearFilter())
    }
  }


  return (
    <div className='d-flex w-75 m-auto'>
      <TextField
        type='text'
        onChange={onChange}
        inputRef={filter}
        fullWidth
        label={label} />
    </div>
  )
}

export default InputFilter