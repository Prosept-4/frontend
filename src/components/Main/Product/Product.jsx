import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedProduct } from '../../../store/selectedDealerSlice'
import { setSelectedProseptProduct } from '../../../store/selectedProseptSlice'
import { urlReg } from '../../../tools/const'
import { getPredictions } from '../../../utils/MainApi'
import { setProductsProseptList } from '../../../store/productsProseptSlice'
import { activateLoader, deactivateLoader } from '../../../store/loaderProsept'

export default function Product({ product, setErrText }) {
  const selectedProduct = useSelector(
    (state) => state.selectedDealerReducer.product
  )
  const dispatch = useDispatch()
  const [status, setStatus] = useState('')
  const articleItem = useRef(null)

  useEffect(() => {
    if (!product) {
      return
    }
    if (product.is_matched) {
      setStatus('status-icon_type_connect')
    } else if (product.has_no_matches) {
      setStatus('status-icon_type_no-matches')
    } else if (product.is_postponed) {
      setStatus('status-icon_type_on-hold')
    } else {
      setStatus('')
    }
  }, [product])

  if (!product) {
    return
  }

  let articleIsLink = false
  if (urlReg.test(product.product_key)) {
    articleIsLink = true
  }

  let haveUrl = true
  if (product.product_url.length === 0) {
    haveUrl = false
  }

  function handleSelect() {
    dispatch(setSelectedProseptProduct({ product: {} }))
    dispatch(activateLoader())
    getPredictions(product.product_key)
      .then((res) => {
        dispatch(setSelectedProduct({ product }))
        dispatch(setProductsProseptList({ productsList: res.results }))
      })
      .catch(() => {
        setErrText('Ошибка сервера')
      })
      .finally(() => {
        dispatch(deactivateLoader())
        setTimeout(() => {
          setErrText('')
        }, '5000')
      })
  }

  return (
    <li
      className={`product product_type_active ${
        selectedProduct.id === product.id ? 'product_type_selected' : ''
      } `}>
      <div className='product__header'>
        <p className='product__company'>{product.dealer_name}</p>
        <button
          onClick={handleSelect}
          className='button product__button'
          type='button'>
          Выбрать
        </button>
      </div>
      <h3 className='product__name'>{product.product_name}</h3>
      <div className='product__article-wrapper'>
        <p className='product__article'>
          Артикул:{' '}
          {!articleIsLink && (
            <span className='product__article-item' ref={articleItem}>
              {product.product_key}
            </span>
          )}
          {articleIsLink && (
            <a
              target='_blank'
              rel='noreferrer'
              href={product.product_key}
              className='product__article-link'>
              Cсылка
            </a>
          )}
        </p>
        <a
          target='_blank'
          rel='noreferrer'
          href={product.product_url}
          className={`product__article-link ${
            haveUrl ? '' : 'product__article-link_disable'
          }`}>
          Ссылка на товар
        </a>
      </div>
      <div className='product__article-wrapper'>
        <div className={`status-icon ${status}`}></div>
        <p className='product__cost'>
          Цена:
          <span className='product__cost-money'>{` ${product.price} ₽`}</span>
        </p>
      </div>
    </li>
  )
}
