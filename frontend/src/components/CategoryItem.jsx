import React, {useEffect, useState} from 'react'
import {Button} from '@material-ui/core'
import {InputGroup, FormControl} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {ADD_NEW_CATEGORY_RESET} from '../redux/constants/categoryConstants'
import {getAllCategories, updateCategory} from '../redux/actions/categoryActions'
import {ModalWindowAdmin} from './index'


const CategoryItem = ({category, success}) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (success) {
      dispatch({type: ADD_NEW_CATEGORY_RESET})
      dispatch(getAllCategories())
    }
  }, [dispatch, success])

  const handleUpdate = () => {
    const updatedCategory = {
      name: categoryName,
      _id: category._id
    }
    dispatch(updateCategory(updatedCategory))
    setEditMode(false)
  }

  return (
    <>
      {editMode ?
          <tr>
            <td colSpan={3}>
              <InputGroup size="sm">
                <FormControl
                  defaultValue={category.name}
                  placeholder="Enter Category name"
                  aria-describedby="inputGroup-sizing-sm"
                  name='category'
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </InputGroup>
            </td>
            <td className='d-flex justify-content-around'>
              <Button
                type='submit'
                size='small'
                color='primary'
                variant='contained'
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Button
                size='small'
                color='secondary'
                variant='contained'
                onClick={() => setShow(true)}
              >
                Delete
              </Button>
            </td>
          </tr>
        :
        <tr key={category._id}>
          <td>{category._id}</td>
          <td>{category.name}</td>
          <td>Products: <strong>{category.products}</strong></td>
          <td className='d-flex justify-content-around'>
            <Button
              size='small'
              color='primary'
              variant='contained'
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
            <Button
              size='small'
              color='secondary'
              variant='contained'
              onClick={() => setShow(true)}
            >
              Delete
            </Button>
          </td>
        </tr>
      }

      {
        category.products === 0 ?
          <ModalWindowAdmin
            size='sm'
            title='Category Deleting!'
            text={`Are you really want delete category ${category.name}?`}
            category={category}
            show={show}
            onHide={() => setShow(false)}
          />
          :
          <ModalWindowAdmin
            size='lg'
            title='Category Deleting!'
            text={`You can not delete category ${category.name} if in there some products. First do something with products!`}
            category={category}
            show={show}
            onHide={() => setShow(false)}
          />
      }

    </>
  )
}

export default CategoryItem