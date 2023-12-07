function PositionItem({data}) {
  function handleCopy() {
    navigator.clipboard.writeText(data.prosept_article)
  }

  return (
    <div className="position__item">
      <p className="position__dealer">
        Prosept
      </p>
      <p className="position__name">
        {data.prosept_name}
      </p>
      <div className="position__container">
        <div className="position__key">
          Артикул: <button className="position__article" onClick={handleCopy}>{data.prosept_article}</button>
        </div>
        <p className="position__price">
          Цена: {data.prosept_cost}
        </p>
      </div>
    </div>
  )
}

export default PositionItem