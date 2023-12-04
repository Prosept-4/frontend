import { useSelector } from 'react-redux'

export default function Twix() {
  const selectedProduct = useSelector(
    (state) => state.selectedThirdPartyReducer.product
  )
  return (
    <article className='twix column__twix'>
      <div
        className={`twix__wrapper ${
          selectedProduct.is_matched ? '' : 'twix__wrapper_deactive'
        }`}>
        <div
          className={`twix__stick ${
            selectedProduct.is_matched ? '' : 'twix__stick_type_left'
          }`}></div>
        <div
          className={`twix__stick ${
            selectedProduct.is_matched ? '' : 'twix__stick_type_right'
          }`}></div>
      </div>
    </article>
  )
}
