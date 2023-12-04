/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedProduct } from '../../../store/selectedThirdPartySlice'

export default function Product({ product }) {
  const selectedProduct = useSelector(
    (state) => state.selectedThirdPartyReducer.product
  )
  const dispatch = useDispatch()
  const [status, setStatus] = useState('')
  const articleItem = useRef(null)

  useEffect(() => {
    if (!product) {
      return
    }
    if (product.is_matched === true) {
      setStatus('status-icon_type_connect')
    } else if (product.has_no_matches === true) {
      setStatus('status-icon_type_no-matches')
    } else if (product.is_postponed === true) {
      setStatus('status-icon_type_on-hold')
    } else {
      setStatus('')
    }
  }, [product])

  if (!product) {
    return
  }

  const urlReg = /^https?:/
  let articleIsLink = false
  if (urlReg.test(product.product_key)) {
    articleIsLink = true
  }

  let haveUrl = true
  if (product.product_url.length === 0) {
    haveUrl = false
  }

  function handleSelect() {
    dispatch(setSelectedProduct({ product }))
  }

  return (
    <li
      onClick={handleSelect}
      className={`product product_type_active ${
        selectedProduct.id === product.id ? 'product_type_selected' : ''
      } `}>
      <p className='product__company'>{product.dealer_name}</p>
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
      <div className='product__footer-wrapper'>
        <div className={`status-icon ${status}`}></div>
        <p className='product__cost'>
          Цена:
          <span className='product__cost-money'>{` ${product.price} ₽`}</span>
        </p>
      </div>
    </li>
  )
}
