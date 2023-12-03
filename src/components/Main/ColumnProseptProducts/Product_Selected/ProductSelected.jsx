import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function ProductSelected() {
  const selectedProduct = useSelector((state) => state.selectedThirdPartyReducer.product)
  const [status, setStatus] = useState('')
  useEffect(() => {
    if (!selectedProduct.name) {
      return
    }
    if (selectedProduct.connect === true) {
      setStatus('status-icon_type_connect')
    } else if (selectedProduct.noMatches === true) {
      setStatus('status-icon_type_no-matches')
    } else if (selectedProduct.onHold === true) {
      setStatus('status-icon_type_on-hold')
    } else {
      setStatus('')
    }
  }, [selectedProduct])

  if (!selectedProduct.name) {
    return
  }
  return (
    <article className='product'>
      <p className='product__company'>{selectedProduct.company}</p>
      <h3 className='product__name product__name_type_selected'>{selectedProduct.name}</h3>
      <div className='product__footer-wrapper'>
        <div className={`status-icon ${status}`}></div>
        <p className='product__cost'>
          Цена: <span className='product__cost-money'>{`${selectedProduct.cost} ₽`}</span>
        </p>
      </div>
    </article>
  )
}
