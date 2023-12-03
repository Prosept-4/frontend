import { createSlice } from '@reduxjs/toolkit'

function setStatusOnHold(prod) {
  prod.connect = false
  prod.noMatches = false
  prod.onHold = true
}

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
  },
  reducers: {
    setProductsList(state, action) {
      state.products = action.payload.productsList
    },
    changeStatusOnHoldProductsList(state, action) {
      state.products = state.products.map((prod) => {
        if (prod.id === action.payload.id) {
          setStatusOnHold(prod)
          return prod
        }
        return prod
      })
    },
  },
})

export const { setProductsList, changeStatusOnHoldProductsList } = productsSlice.actions
export default productsSlice.reducer
