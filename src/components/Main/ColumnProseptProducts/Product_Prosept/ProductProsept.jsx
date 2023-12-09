import { useSelector, useDispatch } from 'react-redux'
import { setSelectedProseptProduct } from '../../../../store/selectedProseptSlice'

export default function ProductProsept({ product }) {
  const selectedProseptProduct = useSelector(
    (state) => state.selectedProseptReducer.product
  )
  const selectedProduct = useSelector(
    (state) => state.selectedDealerReducer.product
  )
  const dispatch = useDispatch()
  if (!product) {
    return
  }

  function handleSelect() {
    dispatch(setSelectedProseptProduct({ product }))
  }

  return (
    <li
      className={`product product_type_active ${
        selectedProseptProduct.id === product.id ? 'product_type_selected' : ''
      } `}>
      <div className='product__header'>
        <p className='product__company product__company_type_prosept'>
          Prosept
        </p>
        <button
          disabled={!selectedProduct.is_matched ? '' : true}
          onClick={handleSelect}
          className={`button product__button ${
            !selectedProduct.is_matched ? '' : 'button_disabled'
          }`}
          type='button'>
          Выбрать
        </button>
      </div>
      <h3 className='product__name'>{product.name_1c}</h3>
      <div className='product__article-wrapper'>
        <p className='product__article'>
          Артикул:{' '}
          <span className='product__article-item'>{product.article}</span>
        </p>
        <p className='product__cost'>
          Рекомендованная цена:{' '}
          <span className='product__cost-money'>{`${product.recommended_price} ₽`}</span>{' '}
        </p>
      </div>
    </li>
  )
}
