import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProductsList } from '../../../../store/prosductsSlice'
import { setFilterValue } from '../../../../store/filterValueSlice'

const productsList = [
  {
    id: 245,
    company: 'Ozon',
    name: 'Антисептик вымываемый PROSEPT ULTRA концентрат 1:10  / 1 л',
    cost: '360.0',
    connect: true,
    noMatches: false,
    onHold: false,
  },
  {
    id: 246,
    company: 'Ozor',
    name: 'Антисептик невымываемый PROSEPT 1:10  / 1 л',
    cost: '360.0',
    connect: false,
    noMatches: true,
    onHold: false,
  },
  {
    id: 247,
    company: 'Ozot',
    name: 'PROSEPT ULTRA концентрат 1:10  / 1 л',
    cost: '780.0',
    connect: false,
    noMatches: false,
    onHold: true,
  },
  {
    id: 248,
    company: 'Ozob',
    name: 'Антисептик невымываемый PROSEPT ULTRA 1:10  / 1 л',
    cost: '360.0',
    connect: false,
    noMatches: false,
    onHold: false,
  },
  {
    id: 249,
    company: 'Ozom',
    name: 'Антисептик PROSEPT  1:10  / 1 л',
    cost: '380.0',
    connect: false,
    noMatches: false,
    onHold: false,
  },
]

export default function Search() {
  const [unsortedProducts, setUnsortedProducts] = useState(0)
  const [connectProducts, setConnectProducts] = useState(0)
  const [onHoldProducts, setOnHoldProducts] = useState(0)
  const [noMatchesProducts, setNoMatchesProducts] = useState(0)

  const dispatch = useDispatch()
  const filterValue = useSelector((state) => state.filterReducer.filter)
  const thirdPatyProducts = useSelector((state) => state.productsReducer.products)

  useEffect(() => {
    setUnsortedProducts(
      thirdPatyProducts.filter((prod) => !(prod.onHold || prod.noMatches || prod.connect)).length
    )
    setOnHoldProducts(thirdPatyProducts.filter((prod) => prod.onHold).length)
    setNoMatchesProducts(thirdPatyProducts.filter((prod) => prod.noMatches).length)
    setConnectProducts(thirdPatyProducts.filter((prod) => prod.connect).length)
  }, [thirdPatyProducts])

  function handleDownloadProducts(e) {
    e.preventDefault()
    dispatch(setProductsList({ productsList }))
  }

  // function handleClearProducts(e) {
  //   const productsList = []
  //   e.preventDefault()
  //   dispatch(setProductsList({ productsList }))
  // }

  function changeFilter(e) {
    dispatch(setFilterValue({ value: e.target.value }))
  }

  return (
    <div className='search'>
      <div className='search__inside-wrapper'>
        <form className='search__add-form' action='submit'>
          <label className='search__add-input-lable button'>
            Загрузить файл
            <input className='search__add-input' type='file' />
          </label>
          <button
            onClick={handleDownloadProducts}
            type='submit'
            className='search__add-submit button'>
            Отправить
          </button>
        </form>
        <div className='search__form-wrapper'>
          <form className='search__form' action='submit'>
            <input
              onChange={changeFilter}
              value={filterValue}
              className='search__input'
              type='text'
              placeholder='Название товара'
            />
            <div className='search__submit'></div>
          </form>
          <div className='search__dillers-wrapper'>
            <h3 className='search__dillers-title'>Производители</h3>
            <select className='search__dillers sliding-menu'>
              <option className='search__diller' defaultValue>
                Все
              </option>
              <option className='search__diller' value='Чебурашка'>
                Чебурашка
              </option>
              <option className='search__diller' value='Крокодил Гена'>
                Крокодил Гена
              </option>
              <option className='search__diller' value='Шапокляк'>
                Шапокляк
              </option>
              <option className='search__diller' value='Крыса Лариса'>
                Крыса Лариса
              </option>
            </select>
          </div>
        </div>
      </div>
      <ul className='search__filters'>
        <li className='search__filter'>
          <p className='search__slider-subtitle search__slider-subtitle_type_numbers'>
            {unsortedProducts}
          </p>
          <label className='search__switch'>
            <input className='search__check-input' type='checkbox' />
            <span className='search__slider'></span>
          </label>
          <p className='search__slider-subtitle'>Несортированные</p>
        </li>
        <li className='search__filter'>
          <p className='search__slider-subtitle search__slider-subtitle_color_green search__slider-subtitle_type_numbers'>
            {connectProducts}
          </p>
          <label className='search__switch'>
            <input className='search__check-input' type='checkbox' />
            <span className='search__slider'></span>
          </label>
          <p className='search__slider-subtitle'>Связанные</p>
        </li>
        <li className='search__filter'>
          <p className='search__slider-subtitle search__slider-subtitle_color_gray search__slider-subtitle_type_numbers'>
            {onHoldProducts}
          </p>
          <label className='search__switch'>
            <input className='search__check-input' type='checkbox' />
            <span className='search__slider'></span>
          </label>
          <p className='search__slider-subtitle'>Отложенные</p>
        </li>
        <li className='search__filter'>
          <p className='search__slider-subtitle search__slider-subtitle_color_red search__slider-subtitle_type_numbers'>
            {noMatchesProducts}
          </p>
          <label className='search__switch'>
            <input className='search__check-input' type='checkbox' />
            <span className='search__slider'></span>
          </label>
          <p className='search__slider-subtitle'>Нет совпадений</p>
        </li>
      </ul>
    </div>
  )
}
