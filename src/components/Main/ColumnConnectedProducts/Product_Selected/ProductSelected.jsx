import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

export default function ProductSelected() {
  const selectedProduct = useSelector(
    (state) => state.selectedThirdPartyReducer.product
  )
  const [status, setStatus] = useState('')
  const articleItem = useRef(null)

  useEffect(() => {
    if (!selectedProduct.id) {
      return
    }

    if (selectedProduct.is_matched) {
      setStatus('status-icon_type_connect')
    } else if (selectedProduct.has_no_matches) {
      setStatus('status-icon_type_no-matches')
    } else if (selectedProduct.is_postponed) {
      setStatus('status-icon_type_on-hold')
    } else {
      setStatus('')
    }
  }, [selectedProduct])

  if (!selectedProduct.id) {
    return
  }

  const urlReg = /^https?:/
  let articleIsLink = false
  if (urlReg.test(selectedProduct.product_key)) {
    articleIsLink = true
  }

  return (
    <article className='product'>
      <div className='product__header'>
        <p className='product__company'>{selectedProduct.dealer_name}</p>
        <div className={`status-icon ${status}`}></div>
      </div>
      <h3 className='product__name product__name_type_selected'>
        {selectedProduct.product_name}
      </h3>
      <div className='product__article-wrapper'>
        <p className='product__article'>
          Артикул:{' '}
          {!articleIsLink && (
            <span className='product__article-item' ref={articleItem}>
              {selectedProduct.product_key}
            </span>
          )}
          {articleIsLink && (
            <a
              target='_blank'
              rel='noreferrer'
              href={selectedProduct.product_key}
              className='product__article-link'>
              Cсылка
            </a>
          )}
        </p>
        <p className='product__cost'>
          Цена:{' '}
          <span className='product__cost-money'>{`${selectedProduct.price} ₽`}</span>
        </p>
      </div>
    </article>
  )
}
