function PositionItem({data, setProductId, choosenElement, setChoosenElement}) {
  function handleCopy() {
    navigator.clipboard.writeText(data.article)
  }

  function handleChoose() {
    setProductId(data.id_product)
    setChoosenElement(data.id)
  }

  return (
    <div className={`position__item position__item_choosable ${choosenElement === data.id ? 'position__item_choosen' : ''}`} onClick={handleChoose}>
      <p className="position__dealer">
        Prosept
      </p>
      <p className="position__name">
        {data.name}
      </p>
      <div className="position__container">
        <div className="position__key">
          Артикул: <button className="position__article" onClick={handleCopy}>{data.article}</button>
        </div>
        <p className="position__price">
          Цена: {data.recommended_price}
        </p>
      </div>
    </div>
  )
}

export default PositionItem