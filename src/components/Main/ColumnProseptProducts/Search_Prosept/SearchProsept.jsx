import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProductsProseptList } from '../../../../store/productsProseptSlice'
import { setSelectedProseptProduct } from '../../../../store/selectedProseptSlice'
import { getProseptProductByText } from '../../../../utils/MainApi'
import {
  activateLoader,
  deactivateLoader,
} from '../../../../store/loaderProsept'
import { setProseptErr } from '../../../../store/errColumnProsept'

export default function SearchProsept() {
  const [searchText, setSearchText] = useState('')
  const dispatch = useDispatch()

  const errorMessageProsept = useSelector(
    (state) => state.errColumnProseptReducer.err
  )

  function handleSearchProsept(e) {
    e.preventDefault()
    dispatch(setProseptErr({ err: '' }))
    dispatch(setProductsProseptList({ productsList: [] }))
    dispatch(setSelectedProseptProduct({ product: {} }))
    if (searchText.length === 0) {
      dispatch(
        setProseptErr({ err: 'Ведите ключевое слово, минимум 1 символ' })
      )
      setTimeout(() => {
        dispatch(setProseptErr({ err: '' }))
      }, '5000')
      return
    }
    dispatch(activateLoader())
    getProseptProductByText(searchText)
      .then((res) => {
        dispatch(setProductsProseptList({ productsList: res.results }))
        if (res.results.length === 0) {
          setProseptErr({ err: 'По вашему запросу ничего не найдено' })
        }
      })
      .catch(() => {
        setProseptErr({ err: 'Ошибка сервера' })
      })
      .finally(() => {
        dispatch(deactivateLoader())
        setTimeout(() => {
          dispatch(setProseptErr({ err: '' }))
        }, '5000')
      })
  }

  function handleInuptChange(e) {
    setSearchText(e.target.value)
  }

  return (
    <div className='search search_type_prosept'>
      <form onSubmit={handleSearchProsept} className='search_prosept-form'>
        <p className='search__download-text'>Ручной поиск:</p>
        <input
          onChange={handleInuptChange}
          value={searchText}
          className='search__input'
          type='text'
          placeholder='Название товара (формата 1C)'
        />
        <button type='submit' className='search__button button'>
          Загрузить
        </button>
      </form>
      <p className='search__request-annotation search__request-annotation_type_err'>
        {errorMessageProsept}
      </p>
    </div>
  )
}
