import { configureStore } from '@reduxjs/toolkit'
import productsDealerReducer from './productsDealerSlice'
import selectedDealerReducer from './selectedDealerSlice'
import selectedProseptReducer from './selectedProseptSlice'
import productsProseptReducer from './productsProseptSlice'
import loaderProseptReducer from './loaderProsept'
import errColumnProseptReducer from './errColumnProsept'

export default configureStore({
  reducer: {
    productsDealerReducer,
    productsProseptReducer,
    selectedDealerReducer,
    selectedProseptReducer,
    loaderProseptReducer,
    errColumnProseptReducer,
  },
})
