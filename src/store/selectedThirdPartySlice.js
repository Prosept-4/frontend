import { createSlice } from '@reduxjs/toolkit'

// function setStatusOnHold(prod) {
//   product.connect = false
//   product.noMatches = false
//   product.onHold = true
// }

const selectedThirdPartySlice = createSlice({
  name: 'thirdPartySelect',
  initialState: {
    product: {},
  },
  reducers: {
    setSelectedProduct(state, action) {
      state.product = action.payload.product
    },
    setStatusOnHold(state) {
      state.product.is_matched = false
      state.product.has_no_matches = false
      state.product.is_postponed = true
    },
    setStatusNoMatch(state) {
      state.product.is_matched = false
      state.product.has_no_matches = true
      state.product.is_postponed = false
    },
    setStatusConnect(state) {
      state.product.is_matched = true
      state.product.has_no_matches = false
      state.product.is_postponed = false
    },
    setStatusUnconnect(state) {
      state.product.is_matched = false
      state.product.has_no_matches = false
      state.product.is_postponed = false
    },
  },
})

export const { setSelectedProduct, setStatusOnHold, setStatusNoMatch, setStatusConnect, setStatusUnconnect } =
  selectedThirdPartySlice.actions
export default selectedThirdPartySlice.reducer
