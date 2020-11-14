import React, {useEffect} from 'react'
import Layout from '../helpers/Layout'
import Container from '@material-ui/core/Container'
import {Table} from 'react-bootstrap'
import {CategoryItem} from '../components'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import {useForm} from 'react-hook-form'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'
import {addNewCategory, getAllCategories} from '../redux/actions/categoryActions'


const CategoriesScreen = () => {
  const dispatch = useDispatch()
  const {register, handleSubmit, errors, reset} = useForm()
  const {categories, success} = useSelector(({CategoriesReducer}) => CategoriesReducer)


  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  const onSubmit = (data) => {
    dispatch(addNewCategory(data))
    if (success) {
      dispatch(getAllCategories())
    }
    reset()
  }

  function zeroCategories() {
    if (categories.length === 0) {
      return <h4 className='d-flex justify-content-center'>No Categories found!</h4>
    }
  }

  return (
    <Layout title='Categories editor' description='Add, delete, edit categories'>
      <Container maxWidth='md'>
        <h1>Categories</h1>

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
            {categories.map(category => (
              <CategoryItem key={category._id} category={category} success={success}/>
            ))}
            </tbody>
          </Table>
        }

        <StyledBox onSubmit={handleSubmit(onSubmit)}>

          <Grid container spacing={4} alignItems='center'>
            <Grid item xs={12} md={9}>
              <TextField
                error={!!errors.category}
                fullWidth
                size='small'
                label='Enter Category name'
                variant="outlined"
                color='primary'
                name='category'
                helperText={errors.category ? <span><ReportProblemIcon/> Category name required!</span> : null}
                inputRef={register({required: true})}
              />

            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                type='submit'
                color='primary'
                variant='contained'
              >
                Add Category
              </Button>
            </Grid>
          </Grid>

        </StyledBox>

      </Container>
    </Layout>
  )
}

const StyledBox = styled.form`
  border: 0.2rem solid black;
  border-radius: .3rem;
  width: 100%;
  max-width: 912px;
  margin: 1rem auto;
  padding: .5rem 1rem .5rem 1rem;
`


export default CategoriesScreen