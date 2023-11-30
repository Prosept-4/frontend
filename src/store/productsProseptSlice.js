import { createSlice } from '@reduxjs/toolkit'

const productsProseptSlice = createSlice({
  name: 'products',
  initialState: {
    productsProsept: [
      {
        id: 245,
        company: 'Prosept',
        name: 'Антисептик вымываемый PROSEPT ULTRA концентрат 1:10  / 1 л',
        cost: '360.0',
      },
      {
        id: 246,
        company: 'Prosept',
        name: 'Антисептик невымываемый PROSEPT 1:10  / 1 л',
        cost: '360.0',
      },
      {
        id: 247,
        company: 'Prosept',
        name: 'PROSEPT ULTRA концентрат 1:10  / 1 л',
        cost: '780.0',
      },
      {
        id: 248,
        company: 'Prosept',
        name: 'Антисептик невымываемый PROSEPT ULTRA 1:10  / 1 л',
        cost: '360.0',
      },
      {
        id: 249,
        company: 'Prosept',
        name: 'Антисептик PROSEPT  1:10  / 1 л',
        cost: '380.0',
      },
    ],
  },
  reducers: {
    setProductsProseptList(state, action) {
      state.productsProsept = action.payload.productsList
    },
  },
})

export const { setProductsProseptList } = productsProseptSlice.actions
export default productsProseptSlice.reducer
