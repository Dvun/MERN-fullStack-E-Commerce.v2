import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'
import {Button} from '@material-ui/core'
import styled from 'styled-components'
import {addNewCategory, getAllCategories} from '../redux/actions/categoryActions'
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'


const AddCategoryInput = () => {
  const dispatch = useDispatch()
  const {register, handleSubmit, errors, reset} = useForm()
  const {success} = useSelector(({CategoriesReducer}) => CategoriesReducer)


  const onSubmit = (data) => {
    dispatch(addNewCategory(data))
    if (success) {
      dispatch(getAllCategories())
    }
    reset()
  }

  return (
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

export default AddCategoryInput