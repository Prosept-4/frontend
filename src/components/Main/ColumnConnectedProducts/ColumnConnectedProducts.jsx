import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Twix from './Twix/Twix.jsx'
import ProductSelected from './Product_Selected/ProductSelected.jsx'
import ProductProseptSelected from './Product_Prosept_Selected/ProductProseptSelected.jsx'
import {
  setStatusConnect,
  setStatusUnconnect,
} from '../../../store/selectedDealerSlice.js'
import {
  deleteFromProductsListById,
  addProductToProductsList,
} from '../../../store/productsDealerSlice.js'
import { setProseptErr } from '../../../store/errColumnProsept.js'
import { postMatchProducts, deleteMatch } from '../../../utils/MainApi.js'

export default function ConnectedProducts() {
  const [windowHeight, setWindowHeight] = useState(
    document.documentElement.clientHeight
  )
  const [showTwix, setShowTwix] = useState(true)
  const [matchId, setMatchId] = useState(0)
  const dispatch = useDispatch()

  const selectedProseptProduct = useSelector(
    (state) => state.selectedProseptReducer.product
  )
  const selectedDealerProduct = useSelector(
    (state) => state.selectedDealerReducer.product
  )

  useEffect(() => {
    function handleWindowResizeTimeout() {
      setTimeout(() => {
        setWindowHeight(document.documentElement.clientHeight)
      }, '500')
    }

    window.addEventListener('resize', handleWindowResizeTimeout)
    return () => {
      window.removeEventListener('resize', handleWindowResizeTimeout)
    }
  }, [])

  useEffect(() => {
    if (windowHeight >= 685) {
      setShowTwix(true)
    } else {
      setShowTwix(false)
    }
  }, [windowHeight])

  function connectSelectedProducts() {
    postMatchProducts({
      key: selectedDealerProduct.product_key,
      dealer_id: selectedDealerProduct.dealer_id,
      product_id: selectedProseptProduct.id_product,
    })
      .then((res) => {
        setMatchId(res.id)
        dispatch(setStatusConnect())
        dispatch(deleteFromProductsListById({ id: selectedDealerProduct.id }))
      })
      .catch(() => {
        dispatch(setProseptErr({ err: 'Ошибка сервера' }))
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(setProseptErr({ err: '' }))
        }, '5000')
      })
  }

  function disconnectSelectedProducts() {
    deleteMatch(matchId)
      .then(() => {
        dispatch(setStatusUnconnect())
        dispatch(addProductToProductsList({ product: selectedDealerProduct }))
      })
      .catch(() => {
        dispatch(setProseptErr({ err: 'Ошибка сервера' }))
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(setProseptErr({ err: '' }))
        }, '5000')
      })
  }

  const connectButtonCheck =
    selectedProseptProduct.id &&
    selectedDealerProduct.id &&
    !selectedDealerProduct.is_matched

  return (
    <section className='column column_type_connected-pr'>
      <h2 className='column__title'>Связать товары</h2>
      <div className='column__connected-products-wrapper'>
        <div className='column__product-wrapper-wrapper'>
          <p className='column__product-annotation'>Товар дилера:</p>
          <div className='column__product-wrapper column__product-wrapper_third-person'>
            <ProductSelected />
          </div>
        </div>
        {showTwix && <Twix />}
        <div className='column__product-wrapper-wrapper'>
          <p className='column__product-annotation'>
            Товар <span className='column__title-prosept'>Prosept</span>:
          </p>
          <div className='column__product-wrapper column__product-wrapper_type_prosept'>
            <ProductProseptSelected />
          </div>
        </div>
      </div>
      <ul className='column__buttons'>
        <li className='column__button-item'>
          <button
            type='button'
            onClick={connectSelectedProducts}
            disabled={connectButtonCheck ? '' : true}
            className={`column__button button ${
              connectButtonCheck ? '' : 'button_disabled'
            }`}>
            Связать
            <span className='status-icon status-icon_type_connect'></span>
          </button>
          <div className='column__button-svg'></div>
        </li>
        <li className='column__button-item'>
          <button
            type='button'
            onClick={disconnectSelectedProducts}
            disabled={selectedDealerProduct.is_matched ? '' : true}
            className={`column__button button button_color_gray ${
              selectedDealerProduct.is_matched ? '' : 'button_disabled'
            }`}>
            Отвязать
            <span className='status-icon status-icon_type_disconnect'></span>
          </button>
        </li>
      </ul>
    </section>
  )
}
