import { useSelector } from 'react-redux'

export default function ProductProseptSelected() {
  const selectedProductProsept = useSelector(
    (state) => state.selectedProseptReducer.product
  )

  if (!selectedProductProsept.id) {
    return
  }
  return (
    <article className='product'>
      <p className='product__company product__company_type_prosept'>Prosept</p>
      <h3 className='product__name product__name_type_selected'>
        {selectedProductProsept.name}
      </h3>
      <div className='product__article-wrapper'>
        <p className='product__article'>
          Артикул:{' '}
          <span className='product__article-item'>
            {selectedProductProsept.article}
          </span>
        </p>
        <p className='product__cost'>
          Рекомендованная цена:{' '}
          <span className='product__cost-money'>{`${selectedProductProsept.recommended_price} ₽`}</span>{' '}
        </p>
      </div>
    </article>
  )
}
