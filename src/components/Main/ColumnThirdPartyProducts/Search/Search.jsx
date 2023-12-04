import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterValue } from '../../../../store/filterValueSlice'
import {
  getUnsortedProducts,
  getOnHoldProducts,
  getNoMatchProducts,
} from '../../../../utils/Api'
import { setProductsList } from '../../../../store/prosductsSlice'

export default function Search({
  setAnnotationProductsType,
  annotationProductsType,
}) {
  const [productsType, setProductsType] = useState('Несортированные')
  const [errText, setErrText] = useState('')
  const [productsNum, setProductsNum] = useState(50)
  const [numberProductsType, setNumberProductsType] = useState(0)

  const dispatch = useDispatch()
  const filterValue = useSelector((state) => state.filterReducer.filter)

  useEffect(() => {
    const lastProductsList = JSON.parse(localStorage.getItem('lastProducts'))
    if (lastProductsList === null) {
      return
    }
    dispatch(setProductsList({ productsList: lastProductsList }))
  }, [dispatch])

  function changeFilter(e) {
    dispatch(setFilterValue({ value: e.target.value }))
  }

  function handleChangeProductsType(e) {
    setProductsType(e.target.value)
  }

  function handleChangeProductsNum(e) {
    setProductsNum(+e.target.value)
  }

  function getProducts(getFunction) {
    getFunction(productsNum)
      .then((res) => {
        console.log()
        setNumberProductsType(res.count)
        dispatch(setProductsList({ productsList: res.results }))
        localStorage.setItem('lastProducts', JSON.stringify(res.results))
      })
      .catch(() => {
        setErrText('Ошибка сервера')
      })
      .finally(() =>
        setTimeout(() => {
          setErrText('')
        }, '5000')
      )
  }

  function changeValue() {
    setProductsType('Без совпадений')
  }

  function downloadProducts(e) {
    setErrText('')
    dispatch(setProductsList({ productsList: [] }))
    e.preventDefault()
    switch (productsType) {
      case 'Несортированные':
        getProducts(getUnsortedProducts)
        setAnnotationProductsType(productsType)
        break
      case 'Отложенные':
        getProducts(getOnHoldProducts)
        setAnnotationProductsType(productsType)
        break
      case 'Без совпадений':
        getProducts(getNoMatchProducts)
        setAnnotationProductsType(productsType)
        break
    }
  }

  return (
    <div className='search'>
      <div className='search__inside-wrapper'>
        <button
          onClick={changeValue}
          type='button'
          className='search__button button'>
          Начать анализ
        </button>
        <div className='search__input-wrapper'>
          <input
            onChange={changeFilter}
            value={filterValue}
            className='search__input'
            type='text'
            placeholder='Название товара'
          />
          <div className='search__img'></div>
        </div>
      </div>
      <form onSubmit={downloadProducts} className='search__request-form'>
        <div className='search__request-wrapper'>
          <p className='search__request-annotation'>
            Выберите тип и количество:
          </p>
          <div className='search__products-wrapper'>
            <select
              value={productsType}
              onChange={handleChangeProductsType}
              className='search__products-types sliding-menu'>
              <option className='search__product-type' value='Несортированные'>
                Несортированные
              </option>
              <option className='search__product-type' value='Отложенные'>
                Отложенные
              </option>
              <option className='search__product-type' value='Без совпадений'>
                Без совпадений
              </option>
            </select>
            <select
              onChange={handleChangeProductsNum}
              className='search__product-nums sliding-menu'>
              <option className='search__product-num' defaultValue value='50'>
                50
              </option>
              <option className='search__product-num' value='100'>
                100
              </option>
              <option className='search__product-num' value='200'>
                200
              </option>
            </select>
          </div>
        </div>
        <p className='search__request-annotation search__request-annotation_type_err'>
          {errText}
        </p>
        <div className='search__download'>
          <button type='submit' className='search__button button'>
            Загрузить
          </button>
          <p className='search__download-text'>
            На сервере {numberProductsType} товаров &quot;
            {annotationProductsType}&quot;
          </p>
        </div>
      </form>
    </div>
  )
}
