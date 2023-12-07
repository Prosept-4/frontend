import { createSlice } from "@reduxjs/toolkit";

const loaderProseptSlice = createSlice({
  name: 'loader',
  initialState: {
    loader: false
  },
  reducers: {
    activateLoader(state){
      state.loader = true
    },
    deactivateLoader(state){
      state.loader = false
    }
  }
})

export const {activateLoader, deactivateLoader} = loaderProseptSlice.actions
export default loaderProseptSlice.reducer