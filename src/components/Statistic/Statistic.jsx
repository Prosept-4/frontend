import { useState } from 'react'
import { getAllStatistics, getStatisticsByDate } from '../../utils/MainApi'

function Statistic() {
  const [minDate, setMinDate] = useState('')
  const [maxDate, setMaxDate] = useState('')
  const [hasNoMatches, setHasNoMatches] = useState(0)
  const [isMatching, setIsMatching] = useState(0)
  const [isPostponed, setIsPostponed] = useState(0)
  const [total, setTotal] = useState(0)
  const [statusText, setStatusText] = useState('')
  const [dateText, setDateText] = useState('')
  const [textColor, setTextColor] = useState('')

  function getStatistic(e) {
    e.preventDefault()
    setStatusText('')
    setTextColor('')
    setDateText()
    const arrMinDate = minDate.split('-')
    const arrMaxDate = maxDate.split('-')
    if (arrMinDate.length < 3 || arrMaxDate.length < 3) {
      getAllStatistics()
        .then((res) => {
          setHasNoMatches(res.has_no_matches)
          setIsMatching(res.is_matching)
          setIsPostponed(res.postponed)
          setTotal(res.total)
          setStatusText('Получена статистика за всё время')
          setTextColor('statistic__text_color_green')
          setMinDate('')
          setMaxDate('')
        })
        .catch(() => {
          setStatusText('Ошибка сервера')
          setTextColor('statistic__text_color_red ')
        })
        .finally(() => {
          setTimeout(() => {
            setStatusText('')
            setTextColor('')
          }, '10000')
        })
    } else {
      getStatisticsByDate(arrMinDate, arrMaxDate)
        .then((res) => {
          setHasNoMatches(res.has_no_matches)
          setIsMatching(res.is_matching)
          setIsPostponed(res.postponed)
          setTotal(res.total)
          setStatusText(`Получена статистика за промежуток с:`)
          setTextColor('statistic__text_color_green')
          setDateText(
            `${arrMinDate[2]}-${arrMinDate[1]}-${arrMinDate[0]} по ${arrMaxDate[2]}-${arrMaxDate[1]}-${arrMaxDate[0]}`
          )
          setMinDate('')
          setMaxDate('')
        })
        .catch(() => {
          setStatusText('Ошибка сервера')
          setTextColor('statistic__text_color_red ')
        })
        .finally(() => {
          setTimeout(() => {
            setStatusText('')
            setTextColor('')
            setDateText('')
          }, '10000')
        })
    }
  }

  function handleChangeMinDate(e) {
    setMinDate(e.target.value)
  }

  function handleChangeMaxDate(e) {
    setMaxDate(e.target.value)
  }

  return (
    <section className='statistic'>
      <h2 className='statistic__title'>Статистика:</h2>
      <div className='statistic__container'>
        <div className='statistic__form-container'>
          <p className='statistic__text'>
            Укажите временной промежуток или оставьте поля пустыми для
            получения статистики за все время
          </p>
          <form onSubmit={getStatistic} className='statistic__form'>
            <div className='statistic__input-wrapper'>
              <p className='statistic__text'>с</p>
              <input
                className='data'
                value={minDate}
                onChange={handleChangeMinDate}
                type='date'
              />
            </div>
            <div className='statistic__input-wrapper'>
              <p className='statistic__text'>по</p>
              <input
                className='data'
                value={maxDate}
                onChange={handleChangeMaxDate}
                type='date'
              />
            </div>
            <button className='button'>Запрос</button>
          </form>
          <p className={`statistic__text ${textColor}`}>{statusText}</p>
          <p className={`statistic__text ${textColor}`}>{dateText}</p>
        </div>
        <p className='statistic__name'>
          Количество связанных товаров:
          <span className='statistic__value'>{isMatching}</span>
        </p>
        <p className='statistic__name'>
          Количество отложенных товаров:
          <span className='statistic__value'>{isPostponed}</span>
        </p>
        <p className='statistic__name'>
          Количество товаров у которых нет связи:
          <span className='statistic__value'>{hasNoMatches}</span>
        </p>
        <p className='statistic__name'>
          Количество товаров дилеров:
          <span className='statistic__value'>{total}</span>
        </p>
      </div>
    </section>
  )
}

export default Statistic
