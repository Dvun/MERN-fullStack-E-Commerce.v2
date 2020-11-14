import React, {useEffect} from 'react'
import Layout from '../helpers/Layout'
import Container from '@material-ui/core/Container'
import {Table} from 'react-bootstrap'
import {AddCategoryInput, CategoryItem, InputFilter} from '../components'
import {useDispatch, useSelector} from 'react-redux'
import {getAllCategories} from '../redux/actions/categoryActions'


const CategoriesScreen = () => {
  const dispatch = useDispatch()
  const {categories, success, filteredCategories} = useSelector(({CategoriesReducer}) => CategoriesReducer)


  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  function zeroCategories() {
    if (categories.length === 0) {
      return <h4 className='d-flex justify-content-center'>No Categories found!</h4>
    }
  }

  return (
    <Layout title='Categories editor' description='Add, delete, edit categories'>
      <Container maxWidth='md'>
        <InputFilter label='Search category by name'/>
        <h1>Categories</h1>
        <AddCategoryInput/>

        {categories.length === 0 ?
          zeroCategories()
          :
          <Table striped bordered hover variant="dark" size='sm'>
            <thead>
            <tr>
              <th>ID</th>
              <th>CATEGORY</th>
              <th>PRODUCTS IN</th>
              <th/>
            </tr>
            </thead>

            <tbody>
            {
              filteredCategories !== null ?
                filteredCategories && filteredCategories.map(category => (
                  <CategoryItem key={category._id} category={category} success={success}/>
                ))
                :
                categories.map(category => (
                  <CategoryItem key={category._id} category={category} success={success}/>
                ))
            }
            </tbody>
          </Table>
        }

      </Container>
    </Layout>
  )
}



export default CategoriesScreen