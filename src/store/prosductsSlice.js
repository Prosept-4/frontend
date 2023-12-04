import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
  },
  reducers: {
    setProductsList(state, action) {
      state.products = action.payload.productsList
    },
    deleteFromProductsListById(state, action) {
      const newProducts = state.products.filter(
        (prod) => prod.id !== action.payload.id
      )
      state.products = newProducts
      localStorage.setItem('lastProducts', JSON.stringify(newProducts))
    },
  },
})

export const { setProductsList, deleteFromProductsListById } =
  productsSlice.actions
export default productsSlice.reducer
