import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  getUnsortedProducts,
  getOnHoldProducts,
  getNoMatchProducts,
  getAnalyze,
} from '../../../../utils/MainApi'
import { setProductsList } from '../../../../store/productsDealerSlice'
import { setSelectedProduct } from '../../../../store/selectedDealerSlice'
import { setSelectedProseptProduct } from '../../../../store/selectedProseptSlice'
import {
  productTypesList,
  dealerProductLimiterList,
} from '../../../../tools/const'

import LoaderAnalyze from '../../Loader/Loader_analyze.jsx'

export default function Search({
  setAnnotationProductsType,
  setNumberAllProductslastLoad,
  setNumberSessionProductslastLoad,
  setIsLoadingProductsList,
  setErrText,
  errText,
}) {
  const [productsType, setProductsType] = useState('Несортированные')
  const [errTextAnalyze, setErrTextAnalyze] = useState('')
  const [errTextAnalyzeColor, setErrTextAnalyzeColor] = useState('')
  const [productsNum, setProductsNum] = useState(50)
  const [okButtonVisability, setOkButtonVisability] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const lastProductsList = JSON.parse(localStorage.getItem('lastProducts'))
    if (!lastProductsList) {
      return
    }
    dispatch(setProductsList({ productsList: lastProductsList }))
  }, [dispatch])

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
      .finally(() => {
        setTimeout(() => {
          setErrText('')
        }, '5000')
        setIsLoadingProductsList(false)
      })
  }

  function downloadProducts(e) {
    setIsLoadingProductsList(true)
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

  function handleStartAnalyze() {
    setErrTextAnalyze('')
    setOkButtonVisability(false)
    setErrTextAnalyzeColor('')
    setIsLoading(true)
    getAnalyze()
      .then(() => {
        setOkButtonVisability(true)
        setErrTextAnalyze('Анализ успешно начался')
        setErrTextAnalyzeColor('search__request-annotation_color_green')
      })
      .catch((err) => {
        if (err === 400) {
          setOkButtonVisability(true)
          setErrTextAnalyze('Анализ в процессе')
          setErrTextAnalyzeColor('search__request-annotation_color_red')
        } else {
          setOkButtonVisability(true)
          setErrTextAnalyze('Ошибка начала анализа')
          setErrTextAnalyzeColor('search__request-annotation_color_red')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleHideAnalyzeMessage() {
    setErrTextAnalyze('')
    setOkButtonVisability(false)
    setErrTextAnalyzeColor('')
  }

  return (
    <div className='search'>
      <div className='search__inside-wrapper'>
        <button
          onClick={handleStartAnalyze}
          type='button'
          className='search__button button'>
          Начать анализ
        </button>
        <div className='search__analiz-wrapper'>
          {isLoading && <LoaderAnalyze />}
          {okButtonVisability && (
            <p className={`search__request-annotation ${errTextAnalyzeColor}`}>
              {errTextAnalyze}
            </p>
          )}
          {okButtonVisability && (
            <button
              onClick={handleHideAnalyzeMessage}
              type='button'
              className='search__ok-button button'>
              ОК
            </button>
          )}
        </div>
      </div>
      <form onSubmit={downloadProducts} className='search__request-form'>
        <div className='search__request-form-wrapper'>
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
          <button type='submit' className='search__button button'>
            Загрузить
          </button>
        </div>
        <p className='search__request-annotation search__request-annotation_type_err'>
          {errText}
        </p>
      </form>
    </div>
  )
}
