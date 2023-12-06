import { createSlice } from '@reduxjs/toolkit'

function setStatus(state, {connect, noMatches, onHold}) {
  state.product.is_matched = connect
  state.product.has_no_matches = noMatches
  state.product.is_postponed = onHold
}

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
      setStatus(state, {connect:false, noMatches:false, onHold:true})
    },
    setStatusNoMatch(state) {
      setStatus(state, {connect:false, noMatches:true, onHold:false})
    },
    setStatusConnect(state) {
      setStatus(state, {connect:true, noMatches:false, onHold:false})
    },
    setStatusUnconnect(state) {
      setStatus(state, {connect:false, noMatches:false, onHold:false})
    },
  },
})

export const { setSelectedProduct, setStatusOnHold, setStatusNoMatch, setStatusConnect, setStatusUnconnect } =
  selectedThirdPartySlice.actions
export default selectedThirdPartySlice.reducer
