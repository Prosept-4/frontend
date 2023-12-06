function PositionItem({data}) {
  function handleCopyDealer() {
    navigator.clipboard.writeText(data.key)
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
        <button onClick={handleCopyDealer} className="position__key">
          Артикул: {data.prosept_article}
        </button>
      </div>
    </div>
  )
}

export default PositionItem