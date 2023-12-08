import { useState,  useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPredictions } from '../../utils/MainApi'
function Position({
  data,
  deleteMatchedItems,
  setPopupOpen,
  setPopupData,
  setPredictions,
}) {
  const [isMainButtonActive, toggleMainButton] = useState(false)

  useEffect(()=>{

  },[data.prduct_id])

  function handleMainButton() {
    toggleMainButton(!isMainButtonActive)
  }

  function handleEdit() {
    setPopupOpen(true)
    setPopupData(data)
    getPredictions(data.key)
      .then((res) => {
        setPredictions(res.results)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {})
  }

  function handleDelete() {
    deleteMatchedItems(data.id)
  }

  function handleCopyDealer() {
    navigator.clipboard.writeText(data.key)
  }

  function handleCopyProsept() {
    navigator.clipboard.writeText(data.prosept_article)
  }

  function checkArticle() {
    if (data?.key?.includes('http')) {
      return (
        <Link className='position__link' to={data.key} target='_blank'>
          Ссылка
        </Link>
      )
    } else {
      return (
        <button onClick={handleCopyDealer} className='position__article'>
          {data.key}
        </button>
      )
    }
  }

  return (
    <div className='position'>
      <div className='position__item'>
        <p className='position__dealer'>{data.dealer_name}</p>
        <p className='position__name'>{data.dealer_product_name}</p>
        <div className='position__container'>
          <div className='position__key'>Артикул: {checkArticle()}</div>
          <p className='position__price'>Цена: {data.dealer_product_price}</p>
          <Link
            className='position__link'
            to={data.dealer_product_url}
            target='_blank'>
            Товар
          </Link>
        </div>
      </div>
      <div
        className={`position__button-main ${
          isMainButtonActive && 'position__button-main_active'
        }`}
        onClick={handleMainButton}>
        <svg
          className={`position__icon-main ${
            isMainButtonActive && 'position__icon-main_active'
          }`}
          xmlns='http://www.w3.org/2000/svg'
          x='0px'
          y='0px'
          viewBox='0 0 32 32'>
          <path d='M 16 3 C 14.825282 3 13.651659 3.2109918 12.53125 3.6328125 A 1.0001 1.0001 0 0 0 12.013672 4.0761719 C 11.504591 4.9739148 11.103104 5.9105467 10.716797 6.8515625 C 9.7098046 6.7129928 8.6975684 6.5922723 7.6640625 6.5839844 A 1.0001 1.0001 0 0 0 6.7753906 7.1113281 C 5.1830476 8.516302 4.1080765 10.386931 3.6875 12.460938 A 1.0001 1.0001 0 0 0 3.6777344 13.496094 C 4.2031636 14.38368 4.8157805 15.19768 5.4394531 16 C 4.8159652 16.802575 4.2030783 17.617285 3.6777344 18.503906 A 1.0001 1.0001 0 0 0 3.6875 19.535156 C 4.1078295 21.611992 5.1823036 23.486488 6.7773438 24.892578 A 1.0001 1.0001 0 0 0 6.7792969 24.896484 A 1.0001 1.0001 0 0 0 7.6640625 25.416016 C 8.6975684 25.407716 9.7098046 25.287007 10.716797 25.148438 C 11.103104 26.089453 11.504591 27.026085 12.013672 27.923828 A 1.0001 1.0001 0 0 0 12.53125 28.367188 C 14.772068 29.210829 17.229885 29.210829 19.470703 28.367188 A 1.0001 1.0001 0 0 0 19.988281 27.923828 C 20.497334 27.026134 20.89691 26.0894 21.283203 25.148438 C 22.290814 25.287181 23.303729 25.407722 24.337891 25.416016 A 1.0001 1.0001 0 0 0 25.224609 24.888672 C 26.819004 23.481888 27.896996 21.6084 28.316406 19.53125 A 1.0001 1.0001 0 0 0 28.322266 18.503906 C 27.796799 17.616326 27.18422 16.80232 26.560547 16 C 27.184759 15.197317 27.797028 14.383365 28.322266 13.496094 A 1.0001 1.0001 0 0 0 28.3125 12.460938 C 27.892024 10.388068 26.817613 8.5179342 25.226562 7.1132812 A 1.0001 1.0001 0 0 0 24.337891 6.5839844 C 23.303729 6.5922776 22.290814 6.7128182 21.283203 6.8515625 C 20.89691 5.9106004 20.497334 4.9738658 19.988281 4.0761719 A 1.0001 1.0001 0 0 0 19.470703 3.6328125 C 18.350294 3.2109918 17.174718 3 16 3 z M 16 5 C 16.819881 5 17.632344 5.1820236 18.425781 5.4414062 C 18.924612 6.3601854 19.381477 7.2913254 19.740234 8.2539062 A 1.0001 1.0001 0 0 0 20.847656 8.890625 C 21.846266 8.7168085 22.881939 8.6469176 23.927734 8.6191406 C 25.17405 9.7252754 26.018177 11.195288 26.355469 12.828125 C 25.806856 13.716861 25.227335 14.576472 24.574219 15.359375 A 1.0001 1.0001 0 0 0 24.574219 16.640625 C 25.226939 17.424057 25.806816 18.283348 26.355469 19.171875 C 26.018177 20.804712 25.17405 22.274725 23.927734 23.380859 C 22.881939 23.353079 21.846266 23.283189 20.847656 23.109375 A 1.0001 1.0001 0 0 0 19.740234 23.746094 C 19.381477 24.708675 18.924612 25.639815 18.425781 26.558594 C 16.838906 27.077359 15.161094 27.077359 13.574219 26.558594 C 13.075409 25.639842 12.620465 24.708644 12.261719 23.746094 A 1.0001 1.0001 0 0 0 11.152344 23.109375 C 10.153811 23.283178 9.1199307 23.353074 8.0742188 23.380859 C 6.8278841 22.274707 5.9818124 20.804742 5.6445312 19.171875 C 6.1933083 18.283772 6.7747468 17.425216 7.4277344 16.640625 A 1.0001 1.0001 0 0 0 7.4277344 15.359375 C 6.7746768 14.575538 6.195366 13.715209 5.6464844 12.826172 C 5.9841156 11.194277 6.8285134 9.7247341 8.0742188 8.6191406 C 9.1199307 8.6469266 10.153811 8.7168216 11.152344 8.890625 A 1.0001 1.0001 0 0 0 12.261719 8.2539062 C 12.620465 7.2913556 13.075409 6.3601577 13.574219 5.4414062 C 14.367656 5.1820236 15.180119 5 16 5 z M 16 11 C 14.416667 11 13.101892 11.629756 12.251953 12.585938 C 11.402014 13.542118 11 14.777778 11 16 C 11 17.222222 11.402014 18.457881 12.251953 19.414062 C 13.101892 20.370244 14.416667 21 16 21 C 17.583333 21 18.898108 20.370244 19.748047 19.414062 C 20.597986 18.457881 21 17.222222 21 16 C 21 14.777778 20.597986 13.542119 19.748047 12.585938 C 18.898108 11.629755 17.583333 11 16 11 z M 16 13 C 17.083333 13 17.768559 13.370244 18.251953 13.914062 C 18.735347 14.457882 19 15.222222 19 16 C 19 16.777778 18.735347 17.542119 18.251953 18.085938 C 17.768559 18.629756 17.083333 19 16 19 C 14.916667 19 14.231441 18.629756 13.748047 18.085938 C 13.264653 17.542119 13 16.777778 13 16 C 13 15.222222 13.264653 14.457881 13.748047 13.914062 C 14.231441 13.370245 14.916667 13 16 13 z'></path>
        </svg>
        <button
          type='button'
          onClick={handleEdit}
          className={`position__button-edit ${
            isMainButtonActive && 'position__button-edit_active'
          }`}>
          <svg
            className='position__icon-edit'
            fill='none'
            height='24'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            width='24'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
            <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
          </svg>
        </button>
        <button
          type='button'
          onClick={handleDelete}
          className={`position__button-delete ${
            isMainButtonActive && 'position__button-delete_active'
          }`}>
          <svg
            className='position__icon-delete'
            fill='none'
            height='24'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            width='24'
            xmlns='http://www.w3.org/2000/svg'>
            <polyline points='3 6 5 6 21 6' />
            <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
            <line x1='10' x2='10' y1='11' y2='17' />
            <line x1='14' x2='14' y1='11' y2='17' />
          </svg>
        </button>
      </div>
      <div
        className={`position__item ${
          isMainButtonActive && 'position__item_active'
        }`}>
        <p className='position__dealer'>Prosept</p>
        <p className='position__name'>{data.prosept_name}</p>
        <div className='position__container'>
          <div className='position__key'>
            Артикул:{' '}
            <button className='position__article' onClick={handleCopyProsept}>
              {data.prosept_article}
            </button>
          </div>
          <p className='position__price'>Цена: {data.prosept_cost}</p>
        </div>
      </div>
    </div>
  )
}

export default Position
