import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterValue } from '../../../../store/filterValueSlice'
import {
  getUnsortedProducts,
  getOnHoldProducts,
  getNoMatchProducts,
} from '../../../../utils/MainApi'
import { setProductsList } from '../../../../store/productsDealerSlice'
import { setSelectedProduct } from '../../../../store/selectedDealerSlice'
import { setSelectedProseptProduct } from '../../../../store/selectedProseptSlice'
import {
  productTypesList,
  dealerProductLimiterList,
} from '../../../../tools/const'

export default function Search({
  setAnnotationProductsType,
  setNumberAllProductslastLoad,
  setNumberSessionProductslastLoad,
}) {
  const [productsType, setProductsType] = useState('Несортированные')
  const [errText, setErrText] = useState('')
  const [productsNum, setProductsNum] = useState(50)

  const dispatch = useDispatch()
  const filterValue = useSelector((state) => state.filterReducer.filter)

  useEffect(() => {
    const lastProductsList = JSON.parse(localStorage.getItem('lastProducts'))
    if (!lastProductsList) {
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
    setProductsNum(e.target.value)
  }

  function getProducts(getFunction) {
    getFunction(productsNum)
      .then((res) => {
        dispatch(setProductsList({ productsList: res.results }))
        dispatch(setSelectedProduct({ product: {} }))
        dispatch(setSelectedProseptProduct({ product: {} }))
        localStorage.setItem('lastProducts', JSON.stringify(res.results))
        const lastSession = {
          all: res.count,
          session: res.results.length,
          type: productsType,
        }
        localStorage.setItem('lastSession', JSON.stringify(lastSession))
        setNumberAllProductslastLoad(res.count)
        setAnnotationProductsType(productsType)
        setNumberSessionProductslastLoad(res.results.length)
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
        break
      case 'Отложенные':
        getProducts(getOnHoldProducts)
        break
      case 'Без совпадений':
        getProducts(getNoMatchProducts)
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
              {productTypesList.map((item, i) => {
                return (
                  <option
                    key={i}
                    className='search__product-type'
                    value={item}>
                    {item}
                  </option>
                )
              })}
            </select>
            <select
              onChange={handleChangeProductsNum}
              className='search__product-nums sliding-menu'>
              {dealerProductLimiterList.map((item) => {
                return (
                  <option
                    key={item}
                    className='search__product-num'
                    defaultValue
                    value={item}>
                    {item}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <p className='search__request-annotation search__request-annotation_type_err'>
          {errText}
        </p>
        <button type='submit' className='search__button button'>
          Загрузить
        </button>
      </form>
    </div>
  )
}
