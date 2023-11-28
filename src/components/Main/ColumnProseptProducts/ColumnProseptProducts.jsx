import ProductSelected from './Product_Selected/ProductSelected.jsx'
import ProductProsept from './Product_Prosept/ProductProsept.jsx'

export default function ProseptProducts() {
  return (
    <section className='column column_type_prosept-pr'>
      <h2 className='column__title'>Соотнесение с товарами <span className='column__title-prosept'>Prosept</span></h2>
      <p className='column__product-annotation'>Соотносимый товар стороннего производителя:</p>
      <div className='column__product-wrapper'>
        <ProductSelected />
      </div>
      <div className='column__limiter-annotatoin-wrapper'>
        <p className='column__product-annotation'>Выберите соответсвие среди товаров <span className='column__title-prosept'>Prosept</span>:</p>
        <div className='column__limiter-wrapper'>
          <p className='column__product-annotation column__product-annotation_type_limiter'>
            Отобр. кол-во
          </p>
          <select className='column__limiter sliding-menu'>
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
          <ProductProsept />
          <ProductProsept />
          <ProductProsept />
          <ProductProsept />
          <ProductProsept />
          <ProductProsept />
          <ProductProsept />
          <ProductProsept />
        </ul>
      </div>
      <ul className='column__buttons'>
        <li className='column__button-item'>
          <button className='column__button button'>Связать</button>
        </li>
        <li className='column__button-item'>
          <button className='column__button button button_color_gray'>Отложить</button>
        </li>
        <li className='column__button-item'>
          <button className='column__button button button_color_red '>Нет соответствий</button>
        </li>
      </ul>
    </section>
  )
}
