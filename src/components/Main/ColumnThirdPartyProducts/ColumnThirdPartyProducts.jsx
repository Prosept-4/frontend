import { useState } from 'react'
import { useSelector } from 'react-redux'
import Product from '../Product/Product.jsx'
import Search from './Search/Search.jsx'
import checkName from '../../tools/filter.js'

export default function ThirdPartyProducts() {
  const [annotationProductsType, setAnnotationProductsType] = useState('')
  const productsList = useSelector((state) => state.productsReducer.products)
  const filterValue = useSelector((state) => state.filterReducer.filter)

  return (
    <section className='column column_type_third-party-pr'>
      <h2 className='column__title'>Товары дилеров</h2>
      <Search
        setAnnotationProductsType={setAnnotationProductsType}
        annotationProductsType={annotationProductsType}
      />
      <div className='column__product-annotation-wrapper'>
        <p className='column__product-annotation'>
          Выберите товар из &quot;{annotationProductsType}&quot;:
        </p>
        <p className='column__product-annotation column__product-annotation_position_right'>
          Товаров в текущей сессии:{''}{' '}
          <span className='column__product-annotation-blue'>
            {productsList.length}
          </span>
        </p>
      </div>
      <div className='column__table-wrapper'>
        <ul className='column__table'>
          {productsList
            .filter((product) => checkName(product, filterValue))
            .map((product) => {
              return <Product key={product.id} product={product} />
            })}
        </ul>
      </div>
    </section>
  )
}
