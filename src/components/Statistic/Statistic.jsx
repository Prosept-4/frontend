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
    setDateText('')
    if (minDate === '' || maxDate === '') {
      getAllStatistics()
        .then((res) => {
          setHasNoMatches(res.has_no_matches)
          setIsMatching(res.is_matching)
          setIsPostponed(res.postponed)
          setTotal(res.total)
          setStatusText('Получена статистика за всё время')
          setTextColor('statistic__text_color_green')
        })
        .catch(() => {
          setStatusText('Ошибка сервера')
          setTextColor('statistic__text_color_red')
        })
      return
    }
    const convertedMinDate = new Date(minDate)
    const convertedMaxDate = new Date(maxDate)
    if (
      isNaN(convertedMaxDate.getTime()) ||
      isNaN(convertedMinDate.getTime())
    ) {
      setStatusText('Неверный формат даты')
      setTextColor('statistic__text_color_red')
      return
    }

    const normalData = new Date(2000, 0, 1)
    const now = new Date()

    if (convertedMaxDate.getTime() < convertedMinDate.getTime()) {
      setStatusText('Конечная дата не может быть меньше начальной')
      setTextColor('statistic__text_color_red')
      return
    }

    if (
      convertedMaxDate.getTime() < normalData.getTime() ||
      convertedMinDate.getTime() < normalData.getTime()
    ) {
      setStatusText('Минимальная дата - 1 января 2000 г.')
      setTextColor('statistic__text_color_red')
      return
    }

    if (
      convertedMaxDate.getTime() > now.getTime() ||
      convertedMinDate.getTime() > now.getTime()
    ) {
      setStatusText('Максимальная дата - вчерашний день')
      setTextColor('statistic__text_color_red')
      return
    }

    getStatisticsByDate(minDate, maxDate)
      .then((res) => {
        setHasNoMatches(res.has_no_matches)
        setIsMatching(res.is_matching)
        setIsPostponed(res.postponed)
        setTotal(res.total)
        setStatusText(`Получена статистика за промежуток с:`)
        setTextColor('statistic__text_color_green')
        setDateText(`${minDate} по ${maxDate}`)
      })
      .catch(() => {
        setStatusText('Ошибка сервера')
        setTextColor('statistic__text_color_red')
      })
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
            Укажите временной промежуток, когда были загружены данные в базу
            данных или оставьте поля пустыми для получения статистики за все
            время.
          </p>
          <p className='statistic__text statistic__text_type_mini'>
            Дату вводите с тире между цифрами, как в примере
          </p>
          <form onSubmit={getStatistic} className='statistic__form'>
            <div className='statistic__input-wrapper'>
              <p className='statistic__text'>с</p>
              <input
                className='data'
                value={minDate}
                placeholder='гггг-мм-дд'
                onChange={handleChangeMinDate}
                type='text'
              />
            </div>
            <div className='statistic__input-wrapper'>
              <p className='statistic__text'>по</p>
              <input
                placeholder='гггг-мм-дд'
                className='data'
                value={maxDate}
                onChange={handleChangeMaxDate}
                type='text'
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
