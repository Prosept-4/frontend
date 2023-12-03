import { useSelector, useDispatch } from 'react-redux'
import { setSelectedProseptProduct } from '../../../../store/selectedProseptSlice'

export default function ProductProsept({ product }) {
  const selectedProduct = useSelector((state) => state.selectedProseptReducer.product)
  const dispatch = useDispatch()
  if (!product) {
    return
  }

  function handleSelect() {
    dispatch(setSelectedProseptProduct({ product }))
  }

  return (
    <li className='column__table-item'>
      <button
        onClick={handleSelect}
        className={`product product_type_active ${
          selectedProduct.id === product.id ? 'product_type_selected' : ''
        } `}>
        <p className='product__company product__company_type_prosept'>{product.company}</p>
        <h3 className='product__name'>{product.name}</h3>
        <p className='product__cost'>
          Цена: <span className='product__cost-money'>{`${product.cost} ₽`}</span>{' '}
        </p>
      </button>
    </li>
  )
}
