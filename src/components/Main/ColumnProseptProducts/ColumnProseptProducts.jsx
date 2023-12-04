import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setStatusOnHold,
  setStatusNoMatch,
} from '../../../store/selectedThirdPartySlice.js'
import { setProductsProseptList } from '../../../store/productsProseptSlice.js'
import ProductProsept from './Product_Prosept/ProductProsept.jsx'
import { getProseptProducts } from '../../../utils/Api.js'

export default function ProseptProducts() {
  const [limiterNum, setLimiterNum] = useState(3)
  const dispatch = useDispatch()
  const productsListProsept = useSelector(
    (state) => state.productsProseptReducer.productsProsept
  )
  const selectedProduct = useSelector(
    (state) => state.selectedThirdPartyReducer.product
  )

  useEffect(() => {
    getProseptProducts()
      .then((res) => {
        dispatch(setProductsProseptList({ productsList: res.results }))
      })
      .catch()
  }, [dispatch])

  function changeLimiter(e) {
    setLimiterNum(Number(e.target.value))
  }

  function changeSelectedOnhold() {
    dispatch(setStatusOnHold())
  }

  function changeSelectedNoMatch() {
    dispatch(setStatusNoMatch())
  }

  const onHoldButtonCheck =
    selectedProduct.id &&
    !selectedProduct.is_postponed &&
    !selectedProduct.is_matched
  const noMatchButtonCheck =
    selectedProduct.id &&
    !selectedProduct.has_no_matches &&
    !selectedProduct.is_matched

  return (
    <section className='column column_type_prosept-pr'>
      <h2 className='column__title'>
        Соотнесение с товарами{' '}
        <span className='column__title-prosept'>Prosept</span>
      </h2>
      <div className='column__limiter-annotatoin-wrapper'>
        <p className='column__product-annotation'>
          Выберите соответсвие среди товаров{' '}
          <span className='column__title-prosept'>Prosept</span>:
        </p>
        <div className='column__limiter-wrapper'>
          <p className='column__product-annotation column__product-annotation_type_limiter'>
            Отобр. кол-во
          </p>
          <select
            onChange={changeLimiter}
            className='column__limiter sliding-menu'>
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
        <ul className='column__table'>
          {productsListProsept.slice(0, limiterNum).map((product) => {
            return <ProductProsept key={product.id} product={product} />
          })}
        </ul>
      </div>
      <ul className='column__buttons'>
        <li className='column__button-item'>
          <button
            type='button'
            onClick={changeSelectedOnhold}
            disabled={onHoldButtonCheck ? '' : true}
            className={`column__button button button_color_gray  ${
              onHoldButtonCheck ? '' : 'button_disabled'
            }`}>
            Отложить
            <span className='status-icon status-icon_type_on-hold'></span>
          </button>
          <div className='column__button-svg'></div>
        </li>
        <li className='column__button-item'>
          <button
            type='button'
            onClick={changeSelectedNoMatch}
            disabled={noMatchButtonCheck ? '' : true}
            className={`column__button button button_color_red  ${
              noMatchButtonCheck ? '' : 'button_disabled'
            }`}>
            Нет&nbsp;соответствий
            <span className='status-icon status-icon_type_no-matches'></span>
          </button>
        </li>
      </ul>
    </section>
  )
}
