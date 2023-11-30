import { useState } from 'react'
import { useSelector } from 'react-redux'

import ProductSelected from './Product_Selected/ProductSelected.jsx'
import ProductProsept from './Product_Prosept/ProductProsept.jsx'

export default function ProseptProducts() {
  const [limiterNum, setLimiterNum] = useState(3)

  const productsListProsept = useSelector((state) => state.productsProseptReducer.productsProsept)
  const selectedProduct = useSelector((state) => state.selectedThirdPartyReducer.product)
  const selectedProseptProduct = useSelector((state) => state.selectedProseptReducer.product)

  function changeLimiter(e) {
    setLimiterNum(Number(e.target.value))
  }

  return (
    <section className='column column_type_prosept-pr'>
      <h2 className='column__title'>
        Соотнесение с товарами <span className='column__title-prosept'>Prosept</span>
      </h2>
      <p className='column__product-annotation'>Соотносимый товар стороннего производителя:</p>
      <div className='column__product-wrapper'>
        <ProductSelected />
      </div>
      <div className='column__limiter-annotatoin-wrapper'>
        <p className='column__product-annotation'>
          Выберите соответсвие среди товаров <span className='column__title-prosept'>Prosept</span>:
        </p>
        <div className='column__limiter-wrapper'>
          <p className='column__product-annotation column__product-annotation_type_limiter'>
            Отобр. кол-во
          </p>
          <select onChange={changeLimiter} className='column__limiter sliding-menu'>
            <option className='column__limiter-item' value='3' defaultValue>
              3
            </option>
            <option className='column__limiter-item' value='5'>
              5
            </option>
            <option className='column__limiter-item' value='7'>
              7
            </option>
            <option className='column__limiter-item' value='10'>
              10
            </option>
          </select>
        </div>
      </div>
      <div className='column__table-wrapper column__table-wrapper_type_prosept'>
        <ul className='column__table column__table_type_prosept-pr'>
          {productsListProsept.slice(0, limiterNum).map((product) => {
            return <ProductProsept key={product.id} product={product} />
          })}
        </ul>
      </div>
      <ul className='column__buttons'>
        <li className='column__button-item'>
          <button
            disabled={selectedProseptProduct.name ? '' : true}
            className={`column__button button ${
              selectedProseptProduct.name ? '' : 'button_disabled'
            }`}>
            Связать<span className='status-icon status-icon_type_connect'></span>
          </button>
          <div className='column__button-svg'></div>
        </li>
        <li className='column__button-item'>
          <button
            disabled={selectedProduct.name ? '' : true}
            className={`column__button button button_color_gray  ${
              selectedProduct.name ? '' : 'button_disabled'
            }`}>
            Отложить<span className='status-icon status-icon_type_on-hold'></span>
          </button>
          <div className='column__button-svg'></div>
        </li>
        <li className='column__button-item'>
          <button
            disabled={selectedProduct.name ? '' : true}
            className={`column__button button button_color_red  ${
              selectedProduct.name ? '' : 'button_disabled'
            }`}>
            Нет&nbsp;соответствий<span className='status-icon status-icon_type_no-matches'></span>
          </button>
        </li>
      </ul>
    </section>
  )
}
