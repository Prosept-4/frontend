import { useSelector, useDispatch } from 'react-redux'
import { setSelectedProduct } from '../../../store/thirdPartySelectSlice'

export default function Product({ product }) {
  const selectedProduct = useSelector((state) => state.thirdPartySelectReducer.product)
  const dispatch = useDispatch()
  if (!product) {
    return
  }

  function handleSelect() {
    dispatch(setSelectedProduct({ product }))
  }

  return (
    <li
      onClick={handleSelect}
      className={`product ${selectedProduct.id === product.id ? 'product_selected' : ''} `}>
      <p className='product__company'>{product.company}</p>
      <h3 className='product__name'>{product.name}</h3>
      <p className='product__cost'>
        Цена: <span className='product__cost-money'>{`${product.cost} ₽`}</span>{' '}
      </p>
    </li>
  )
}
