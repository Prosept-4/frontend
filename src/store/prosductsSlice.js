import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: []
  },
  reducers: {
    setProductsList(state, action){
      state.products = action.payload.productsList
    }
  }
})

export const {setProductsList} = productsSlice.actions
export default productsSlice.reducer