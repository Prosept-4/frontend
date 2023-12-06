function Statistic({data}) {
  return (
    <section className="statistic">
      <h2 className="statistic__title">
        Статистика за все время:
      </h2>
      <div className="statistic__container">
        <p className="statistic__name">
          Количество связанных товаров:
          <span className="statistic__value">
            {data.is_matching}
          </span>
        </p>
        <p className="statistic__name">
          Количество отложенных товаров:
          <span className="statistic__value">
            {data.postponed}
          </span>
        </p>
        <p className="statistic__name">
          Количество товаров у которых нет связи:
          <span className="statistic__value">
            {data.has_no_matches}
          </span>
        </p>
        <p className="statistic__name">
          Количество товаров дилеров:
          <span className="statistic__value">
            {data.total}
          </span>
        </p>
      </div>
    </section>
  )
}

export default Statistic