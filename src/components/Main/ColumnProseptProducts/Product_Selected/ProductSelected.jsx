import { useSelector } from 'react-redux'

export default function ProductSelected() {
  const selectedProduct = useSelector((state) => state.selectedThirdPartyReducer.product)
  if (!selectedProduct.name) {
    return
  }
  return (
    <article className='product'>
      <p className='product__company'>{selectedProduct.company}</p>
      <h3 className='product__name product__name_type_selected'>{selectedProduct.name}</h3>
      <p className='product__cost'>
        Цена: <span className='product__cost-money'>{`${selectedProduct.cost} ₽`}</span>
      </p>
    </article>
  )
}
