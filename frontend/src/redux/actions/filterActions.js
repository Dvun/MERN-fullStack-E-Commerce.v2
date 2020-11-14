import * as consts from '../constants/filterConstants'



// Filter contacts
export const filtering = (text) => ({type: consts.FILTERING, payload: text})

// Clear filter
export const clearFilter = () => ({type: consts.CLEAR_FILTER})