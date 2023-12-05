import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { urlReg } from '../../../../tools/const'
export default function ProductSelected() {
  const selectedDealerProduct = useSelector(
    (state) => state.selectedDealerReducer.product
  )
  const [status, setStatus] = useState('')
  const articleItem = useRef(null)

  useEffect(() => {
    if (!selectedDealerProduct.id) {
      return
    }

    if (selectedDealerProduct.is_matched) {
      setStatus('status-icon_type_connect')
    } else if (selectedDealerProduct.has_no_matches) {
      setStatus('status-icon_type_no-matches')
    } else if (selectedDealerProduct.is_postponed) {
      setStatus('status-icon_type_on-hold')
    } else {
      setStatus('')
    }
  }, [selectedDealerProduct])

  if (!selectedDealerProduct.id) {
    return
  }

  let articleIsLink = false
  if (urlReg.test(selectedDealerProduct.product_key)) {
    articleIsLink = true
  }

  return (
    <article className='product'>
      <div className='product__header'>
        <p className='product__company'>{selectedDealerProduct.dealer_name}</p>
        <div className={`status-icon ${status}`}></div>
      </div>
      <h3 className='product__name product__name_type_selected'>
        {selectedDealerProduct.product_name}
      </h3>
      <div className='product__article-wrapper'>
        <p className='product__article'>
          Артикул:{' '}
          {!articleIsLink && (
            <span className='product__article-item' ref={articleItem}>
              {selectedDealerProduct.product_key}
            </span>
          )}
          {articleIsLink && (
            <a
              target='_blank'
              rel='noreferrer'
              href={selectedDealerProduct.product_key}
              className='product__article-link'>
              Cсылка
            </a>
          )}
        </p>
        <p className='product__cost'>
          Цена:{' '}
          <span className='product__cost-money'>{`${selectedDealerProduct.price} ₽`}</span>
        </p>
      </div>
    </article>
  )
}
