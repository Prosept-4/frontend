import { createSlice } from '@reduxjs/toolkit'

const selectedProseptSlice = createSlice({
  name: 'proseptSelect',
  initialState: {
    product: {},
  },
  reducers: {
    setSelectedProseptProduct(state, action) {
      state.product = action.payload.product
    },
  },
})

export const { setSelectedProseptProduct } = selectedProseptSlice.actions
export default selectedProseptSlice.reducer
