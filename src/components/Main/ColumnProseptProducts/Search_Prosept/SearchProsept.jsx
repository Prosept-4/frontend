import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setProductsProseptList } from '../../../../store/productsProseptSlice'
import { setSelectedProseptProduct } from '../../../../store/selectedProseptSlice'
import { getProseptProductByText } from '../../../../utils/MainApi'
import {
  activateLoader,
  deactivateLoader,
} from '../../../../store/loaderProsept'

export default function SearchProsept() {
  const [errMessage, setErrMessage] = useState('')
  const [searchText, setSearchText] = useState('')
  const dispatch = useDispatch()

  function handleSearchProsept(e) {
    e.preventDefault()
    setErrMessage('')
    dispatch(setProductsProseptList({ productsList: [] }))
    dispatch(setSelectedProseptProduct({ product: {} }))
    if (searchText.length === 0) {
      setErrMessage('Ведите ключевое слово, минимум 1 символ')
      setTimeout(() => {
        setErrMessage('')
      }, '5000')
      return
    }
    dispatch(activateLoader())
    getProseptProductByText(searchText)
      .then((res) => {
        dispatch(setProductsProseptList({ productsList: res.results }))
        if (res.results.length === 0) {
          setErrMessage('По вашему запросу ничего не найдено')
        }
      })
      .catch(() => {
        setErrMessage('Ошибка сервера')
      })
      .finally(() => {
        dispatch(deactivateLoader())
        setTimeout(() => {
          setErrMessage('')
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
        {errMessage}
      </p>
    </div>
  )
}
