import Product from "../Product/Product.jsx";

export default function ThirdPartyProducts() {
  return (
    <section className='third-party-pr'>
      <h2 className='third-party-pr__title'>Товары сторонних производителей</h2>
      <div className='third-party-pr__search'>
        <form className='third-party-pr__search-form' action='submit'>
          <input className='third-party-pr__search-input' type='text' placeholder='Поиск' />
          <button className='third-party-pr__search-submit'></button>
        </form>
        <ul className='third-party-pr__filters'>
          <li className='third-party-pr__filter'>
          <p className="third-party-pr__slider-subtitle">0</p>
            <label className='third-party-pr__switch'>
              <input className='third-party-pr__check-input' type='checkbox' />
              <span className='third-party-pr__slider'></span>
            </label>
            <p className='third-party-pr__slider-subtitle'>Несортированные</p>
          </li>
          <li className='third-party-pr__filter'>
          <p className="third-party-pr__slider-subtitle">0</p>
            <label className='third-party-pr__switch'>
              <input className='third-party-pr__check-input' type='checkbox' />
              <span className='third-party-pr__slider'></span>
            </label>
            <p className='third-party-pr__slider-subtitle'>Связанные</p>
          </li>
          <li className='third-party-pr__filter'>
          <p className="third-party-pr__slider-subtitle">0</p>
            <label className='third-party-pr__switch'>
              <input className='third-party-pr__check-input' type='checkbox' />
              <span className='third-party-pr__slider'></span>
            </label>
            <p className='third-party-pr__slider-subtitle'>Отложенные</p>
          </li>
          <li className='third-party-pr__filter'>
            <p className='third-party-pr__slider-subtitle'>0</p>
            <label className='third-party-pr__switch'>
              <input className='third-party-pr__check-input' type='checkbox' />
              <span className='third-party-pr__slider'></span>
            </label>
            <p className='third-party-pr__slider-subtitle'>Нет совпадений</p>
          </li>
        </ul>
      </div>
      <div className='third-party-pr__table'>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>



      </div>
    </section>
  )
}
