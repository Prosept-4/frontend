import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './prosductsSlice'
import selectedThirdPartyReducer from './selectedThirdPartySlice'
import selectedProseptReducer from './selectedProseptSlice'
import productsProseptReducer from './productsProseptSlice'
import filterReducer from './filterValueSlice'

export default configureStore({
  reducer: {
    productsReducer,
    productsProseptReducer,
    selectedThirdPartyReducer,
    selectedProseptReducer,
    filterReducer,
  },
})
