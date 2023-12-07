import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Product from '../Product/Product.jsx'
import Search from './Search/Search.jsx'
import LoaderProducts from '../Loader/Loader_products.jsx'

export default function DealerProducts() {
  const [annotationProductsType, setAnnotationProductsType] = useState('')
  const [numberAllProductslastLoad, setNumberAllProductslastLoad] = useState(0)
  const [numberSessionProductslastLoad, setNumberSessionProductslastLoad] =
    useState(0)
  const [isLoadingProductsList, setIsLoadingProductsList] = useState(false)
  const dealerProductsList = useSelector(
    (state) => state.productsDealerReducer.products
  )

  useEffect(() => {
    const lastSession = JSON.parse(localStorage.getItem('lastSession'))

    if (!lastSession) {
      return
    }
    setNumberSessionProductslastLoad(lastSession.session)
    setNumberAllProductslastLoad(lastSession.all)
    setAnnotationProductsType(lastSession.type)
  }, [])

  const showedAllProducts =
    numberAllProductslastLoad -
    numberSessionProductslastLoad +
    dealerProductsList.length

  console.log(
    numberAllProductslastLoad,
    numberSessionProductslastLoad,
    dealerProductsList.length
  )

  return (
    <section className='column column_type_third-party-pr'>
      <h2 className='column__title'>Товары дилеров</h2>
      <Search
        setAnnotationProductsType={setAnnotationProductsType}
        setNumberAllProductslastLoad={setNumberAllProductslastLoad}
        setNumberSessionProductslastLoad={setNumberSessionProductslastLoad}
        setIsLoadingProductsList={setIsLoadingProductsList}
      />
      <div className='column__product-annotation-wrapper'>
        <p className='column__product-annotation column__product-annotation_type_products'>
          Выберите товар из &quot;
          <span className='column__product-annotation-blue'>
            {annotationProductsType}
          </span>
          &quot;:
        </p>
        <p className='column__product-annotation column__product-annotation_position_right'>
          Товаров в текущей сессии:{' '}
          <span className='column__product-annotation-blue'>
            {dealerProductsList.length}
          </span>
        </p>
        <p className='column__product-annotation column__product-annotation_position_right'>
          Всего:
          <span className='column__product-annotation-blue'>
            {showedAllProducts}
          </span>
        </p>
      </div>
      <div className='column__table-wrapper'>
        {isLoadingProductsList && <LoaderProducts />}
        {!isLoadingProductsList && <ul className='column__table'>
          {dealerProductsList.map((product) => {
            return <Product key={product.id} product={product} />
          })}
        </ul>}
      </div>
    </section>
  )
}
