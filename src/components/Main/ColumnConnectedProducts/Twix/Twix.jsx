import { useSelector } from 'react-redux'

export default function Twix() {
  const selectedProduct = useSelector(
    (state) => state.selectedDealerReducer.product
  )
  return (
    <article className='twix column__twix'>
      <div
        className={`twix__wrapper ${
          selectedProduct.is_matched ? '' : 'twix__wrapper_deactive'
        }`}>
        <div
          className={`twix__stick  ${
            selectedProduct.is_matched ? '' : 'twix__stick_type_left-noconnect'
          } ${
            selectedProduct.has_no_matches ? 'twix__stick_type_no-match' : ''
          }
          ${
            selectedProduct.is_postponed ? 'twix__stick_type_left-hold' : ''
          }`}></div>
        <div
          className={`twix__stick  ${
            selectedProduct.is_matched
              ? ''
              : 'twix__stick_type_right-noconnect'
          } ${
            selectedProduct.has_no_matches ? 'twix__stick_type_no-match' : ''
          }
          ${
            selectedProduct.is_postponed ? 'twix__stick_type_right-hold' : ''
          }`}></div>
      </div>
    </article>
  )
}
