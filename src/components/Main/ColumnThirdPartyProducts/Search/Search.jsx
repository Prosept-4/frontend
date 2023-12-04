/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterValue } from '../../../../store/filterValueSlice'
import {
  getUnsortedProducts,
  getOnHoldProducts,
  getNoMatchProducts,
} from '../../../../utils/Api'
import { setProductsList } from '../../../../store/prosductsSlice'

export default function Search() {
  const [unsortedProducts, setUnsortedProducts] = useState(0)
  const [onHoldProducts, setOnHoldProducts] = useState(0)
  const [noMatchesProducts, setNoMatchesProducts] = useState(0)
  const [productsType, setProductsType] = useState('unsort')
  const [errText, setErrText] = useState('')
  const [productsNum, setProductsNum] = useState(50)

  const dispatch = useDispatch()
  const filterValue = useSelector((state) => state.filterReducer.filter)
  const thirdPatyProducts = useSelector(
    (state) => state.productsReducer.products
  )

  useEffect(() => {
    setUnsortedProducts(
      thirdPatyProducts.filter(
        (prod) => !(prod.is_postponed || prod.has_no_matches)
      ).length
    )
    setOnHoldProducts(thirdPatyProducts.filter((prod) => prod.onHold).length)
    setNoMatchesProducts(
      thirdPatyProducts.filter((prod) => prod.has_no_matches).length
    )
  }, [thirdPatyProducts])

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
        dispatch(setProductsList({ productsList: res.results }))
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

  function downloadProducts(e) {
    setErrText('')
    dispatch(setProductsList({ productsList: [] }))
    e.preventDefault()
    switch (productsType) {
      case 'unsort':
        getProducts(getUnsortedProducts)
        break
      case 'on-hold':
        getProducts(getOnHoldProducts)
        break
      case 'no-match':
        getProducts(getNoMatchProducts)
        break
    }
  }

  return (
    <div className='search'>
      <div className='search__inside-wrapper'>
        <button type='submit' className='search__button button'>
          Начать анализ
        </button>
        <div className='search__filter-wrapper'>
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
          <div className='search__dillers-wrapper'>
            <h3 className='search__dillers-title'>Дилеры</h3>
            <select className='search__dillers sliding-menu'>
              <option className='search__diller' defaultValue>
                Все
              </option>
              <option className='search__diller' value='Чебурашка'>
                Чебурашка
              </option>
              <option className='search__diller' value='Крокодил Гена'>
                Крокодил Гена
              </option>
              <option className='search__diller' value='Шапокляк'>
                Шапокляк
              </option>
              <option className='search__diller' value='Крыса Лариса'>
                Крыса Ларисааааааааааа
              </option>
            </select>
          </div>
        </div>
      </div>
      <form onSubmit={downloadProducts} className='search__request-form'>
        <div className='search__request-wrapper'>
          <p className='search__request-annotation'>
            Выберите тип и количество:
          </p>
          <div className='search__products-wrapper'>
            <select
              onChange={handleChangeProductsType}
              className='search__products-types sliding-menu'>
              <option
                className='search__product-type'
                defaultValue
                value='unsort'>
                Несортированные
              </option>
              <option className='search__product-type' value='on-hold'>
                Отложенные
              </option>
              <option className='search__product-type' value='no-match'>
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
        <button type='submit' className='search__button button'>
          Загрузить
        </button>
      </form>
    </div>
  )
}
