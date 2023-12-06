import { createSlice } from '@reduxjs/toolkit'

function changeDisconnectedProduct(product) {
  let newProd = {}
  for (let key in product) {
    if (key === 'is_matched') {
      newProd[key] = false
    } else {
      newProd[key] = product[key]
    }
  }
  return newProd
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
    deleteFromProductsListById(state, action) {
      const newProducts = state.products.filter(
        (prod) => prod.id !== action.payload.id
      )
      state.products = newProducts
      localStorage.setItem('lastProducts', JSON.stringify(newProducts))
    },
    addProductToProductsList(state, action) {
      state.products = [changeDisconnectedProduct(action.payload.product), ...state.products]
      localStorage.setItem('lastProducts', JSON.stringify(state.products))
    },
  },
})

export const {
  setProductsList,
  deleteFromProductsListById,
  addProductToProductsList,
} = productsSlice.actions
export default productsSlice.reducer
