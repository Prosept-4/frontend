import { createSlice } from "@reduxjs/toolkit";

// function setStatusOnHold(prod) {
//   product.connect = false
//   product.noMatches = false
//   product.onHold = true
// }


const selectedThirdPartySlice = createSlice({
  name: 'thirdPartySelect',
  initialState: {
    product: {}
  },
  reducers: {
    setSelectedProduct(state, action){
      state.product = action.payload.product
    },
    setStatusOnHold(state, action){
      state.product.connect = false
      state.product.noMatches = false
      state.product.onHold = true
    }
  }
})

export const {setSelectedProduct, setStatusOnHold} = selectedThirdPartySlice.actions
export default selectedThirdPartySlice.reducer