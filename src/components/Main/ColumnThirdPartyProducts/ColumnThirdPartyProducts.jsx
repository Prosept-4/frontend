import { useSelector } from 'react-redux'
import Product from '../Product/Product.jsx'
import Search from './Search/Search.jsx'

export default function ThirdPartyProducts() {
  const productsList = useSelector((state) => state.productsReducer.products)
  return (
    <section className='column column_type_third-party-pr'>
      <h2 className='column__title'>Товары сторонних производителей</h2>
      <Search />
      <p className='column__product-annotation'>Выберите товар:</p>
      <div className='column__table-wrapper'>
        <ul className='column__table column__table_third-party-pr'>
          {productsList.map((product) => {
            return <Product key={product.id} product={product} />
          })}
        </ul>
      </div>
    </section>
  )
}
