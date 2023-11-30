import {configureStore} from '@reduxjs/toolkit'
import productsReducer from './prosductsSlice'
import thirdPartySelectReducer from './thirdPartySelectSlice'


export default configureStore({
  reducer:{
    productsReducer,
    thirdPartySelectReducer
  }
})