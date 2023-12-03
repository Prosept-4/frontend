import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedProduct } from '../../../store/selectedThirdPartySlice'

export default function Product({ product }) {
  const selectedProduct = useSelector((state) => state.selectedThirdPartyReducer.product)
  const dispatch = useDispatch()
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (!product) {
      return
    }
    if (product.connect === true) {
      setStatus('status-icon_type_connect')
    } else if (product.noMatches === true) {
      setStatus('status-icon_type_no-matches')
    } else if (product.onHold === true) {
      setStatus('status-icon_type_on-hold')
    } else {
      setStatus('')
    }
  }, [product])

  if (!product) {
    return
  }

  function handleSelect() {
    dispatch(setSelectedProduct({ product }))
  }

  return (
    <li className='column__table-item'>
      <button
        onClick={handleSelect}
        className={`product product_type_active ${
          selectedProduct.id === product.id ? 'product_type_selected' : ''
        } `}>
        <p className='product__company'>{product.company}</p>
        <h3 className='product__name'>{product.name}</h3>
        <div className='product__footer-wrapper'>
          <div className={`status-icon ${status}`}></div>
          <p className='product__cost'>
            Цена: <span className='product__cost-money'>{`${product.cost} ₽`}</span>
          </p>
        </div>
      </button>
    </li>
  )
}
