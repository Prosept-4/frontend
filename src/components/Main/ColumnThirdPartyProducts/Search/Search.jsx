/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useDispatch } from 'react-redux'
import { setProductsList } from '../../../../store/prosductsSlice'

const productsList = [
  {
    id: 245,
    company: 'Ozon',
    name: 'Антисептик вымываемый PROSEPT ULTRA концентрат 1:10  / 1 л',
    cost: '360.0',
  },
  {
    id: 246,
    company: 'Ozor',
    name: 'Антисептик невымываемый PROSEPT 1:10  / 1 л',
    cost: '360.0',
  },
  {
    id: 247,
    company: 'Ozot',
    name: 'PROSEPT ULTRA концентрат 1:10  / 1 л',
    cost: '780.0',
  },
  {
    id: 248,
    company: 'Ozob',
    name: 'Антисептик невымываемый PROSEPT ULTRA 1:10  / 1 л',
    cost: '360.0',
  },
  {
    id: 249,
    company: 'Ozom',
    name: 'Антисептик PROSEPT  1:10  / 1 л',
    cost: '380.0',
  },
]

export default function Search() {
  const dispatch = useDispatch()

  function handleDownloadProducts(e) {
    e.preventDefault()
    dispatch(setProductsList({ productsList }))
  }

  function handleClearProducts(e) {
    const productsList = []
    e.preventDefault()
    dispatch(setProductsList({ productsList }))
  }

  return (
    <div className='search'>
      <div className='search__inside-wrapper'>
        <form className='search__add-form' action='submit'>
          <label className='search__add-input-lable button'>
            Загрузить файл
            <input className='search__add-input' type='file' placeholder='Поиск' />
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
            <input className='search__input' type='text' placeholder='Поиск' />
            <button onClick={handleClearProducts} className='search__submit'></button>
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
          <p className='search__slider-subtitle search__slider-subtitle_type_numbers'>12345</p>
          <label className='search__switch'>
            <input className='search__check-input' type='checkbox' />
            <span className='search__slider'></span>
          </label>
          <p className='search__slider-subtitle'>Несортированные</p>
        </li>
        <li className='search__filter'>
          <p className='search__slider-subtitle search__slider-subtitle_color_green search__slider-subtitle_type_numbers'>
            123
          </p>
          <label className='search__switch'>
            <input className='search__check-input' type='checkbox' />
            <span className='search__slider'></span>
          </label>
          <p className='search__slider-subtitle'>Связанные</p>
        </li>
        <li className='search__filter'>
          <p className='search__slider-subtitle search__slider-subtitle_color_gray search__slider-subtitle_type_numbers'>
            12
          </p>
          <label className='search__switch'>
            <input className='search__check-input' type='checkbox' />
            <span className='search__slider'></span>
          </label>
          <p className='search__slider-subtitle'>Отложенные</p>
        </li>
        <li className='search__filter'>
          <p className='search__slider-subtitle search__slider-subtitle_color_red search__slider-subtitle_type_numbers'>
            1
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
