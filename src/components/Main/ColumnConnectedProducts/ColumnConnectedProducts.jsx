import ProductProsept from '../ColumnProseptProducts/Product_Prosept/ProductProsept.jsx'
import Product from '../Product/Product.jsx'

export default function ConnectedProducts() {
  return (
    <section className='column column_type_connected-pr'>
      <h2 className='column__title'>Связанные товары</h2>
      <div className='column__connected-products-wrapper'>
        <div className='column__product-wrapper-wrapper'>
          <p className='column__product-annotation'>Сторонний товар:</p>
          <div className='column__product-wrapper column__product-wrapper_third-person'>
            <Product />
          </div>
        </div>
        <div className='column__product-wrapper-wrapper'>
          <p className='column__product-annotation'>
            Товар <span className='column__title-prosept'>Prosept</span>:
          </p>
          <div className='column__product-wrapper column__product-wrapper_type_prosept'>
            <ProductProsept />
          </div>
        </div>
      </div>
      <button className='column__button button'>Отвязать<span className='status-icon status-icon_type_disconnect'></span></button>
    </section>
  )
}
