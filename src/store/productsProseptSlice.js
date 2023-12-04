import { createSlice } from '@reduxjs/toolkit'

const productsProseptSlice = createSlice({
  name: 'products',
  initialState: {
    productsProsept: [],
  },
  reducers: {
    setProductsProseptList(state, action) {
      state.productsProsept = action.payload.productsList
    },
  },
})

export const { setProductsProseptList } = productsProseptSlice.actions
export default productsProseptSlice.reducer
