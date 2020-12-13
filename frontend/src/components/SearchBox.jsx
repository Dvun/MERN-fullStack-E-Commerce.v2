import React, {useEffect, useRef} from 'react'
import {TextField} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {getAllProducts} from '../redux/actions/productActions'
import {getAllCategories} from '../redux/actions/categoryActions'


const SearchBox = ({label}) => {
  const dispatch = useDispatch()
  const filter = useRef('')

  useEffect(() => {
    if (label === 'Search product...') dispatch(getAllProducts(''))
    if (label === 'Search category by name') dispatch(getAllCategories(''))
  }, [dispatch, label])

  const changeHandler = () => {
    if (filter.current.value !== '') {
      if (label === 'Search product...') dispatch(getAllProducts(filter.current.value))
      if (label === 'Search category by name') dispatch(getAllCategories(filter.current.value))
    } else {
      if (label === 'Search product...') dispatch(getAllProducts(''))
      if (label === 'Search category by name') dispatch(getAllCategories(''))
    }
  }

  return (
    <div className='d-flex w-75 m-auto'>
      <TextField
        type='text'
        name='q'
        fullWidth
        onChange={changeHandler}
        inputRef={filter}
        size='small'
        label={label} />
    </div>
  )
}

export default SearchBox