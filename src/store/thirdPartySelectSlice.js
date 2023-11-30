import { createSlice } from "@reduxjs/toolkit";

const thirdPartySelectSlice = createSlice({
  name: 'thirdPartySelect',
  initialState: {
    product: {}
  },
  reducers: {
    setSelectedProduct(state, action){
      state.product = action.payload.product
    }
  }
})

export const {setSelectedProduct} = thirdPartySelectSlice.actions
export default thirdPartySelectSlice.reducer