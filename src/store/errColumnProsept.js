import { createSlice } from '@reduxjs/toolkit'

const errColumnProseptSlice = createSlice({
  name: 'err',
  initialState: {
    err: '',
  },
  reducers: {
    setProseptErr(state, action) {
      state.err = action.payload.err
    },
  },
})

export const { setProseptErr } = errColumnProseptSlice.actions
export default errColumnProseptSlice.reducer
