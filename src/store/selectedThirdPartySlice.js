import { createSlice } from "@reduxjs/toolkit";

const selectedThirdPartySlice = createSlice({
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

export const {setSelectedProduct} = selectedThirdPartySlice.actions
export default selectedThirdPartySlice.reducer