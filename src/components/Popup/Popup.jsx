import {Link} from 'react-router-dom';
import PositionItem from '../Position/PositionItem/PositionItem.jsx';
import {useEffect, useState} from "react";
import api from "../../utils/Api";

function Popup({setOpen, isOpen, setData, data, getPredictions, predictions}) {
  const [productId, setProductId] = useState('');
  const [choosenElement, setChoosenElement] = useState('');

  function handleCopyDealer() {
    navigator.clipboard.writeText(data.key)
  }

  function checkArticle() {
    if (data?.key?.includes('https')) {
      return (
        <Link className="position__link" to={data.key} target="_blank">
          Ссылка
        </Link>
      )
    } else {
      return (
        <button onClick={handleCopyDealer} className="position__article">
          {data.key}
        </button>
      )
    }
  }

  function handleClose() {
    setOpen(false);
    setData({})
    setProductId('')
    setChoosenElement('')
  }

  function handleMatch() {
    api.patchMatch(localStorage.getItem('token'), data.id, data.key, data.dealer_id, productId)
      .then(() => {
        
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        handleClose()
      })
  }

  useEffect(() => {
    getPredictions(data.key)
  }, [isOpen])

  const proseptItems = predictions.map((item) => (
    <PositionItem
      data={item}
      key={item.id}
      setProductId={setProductId}
      choosenElement={choosenElement}
      setChoosenElement={setChoosenElement}
    />
  ))

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <div className="popup__column">
          <h2 className="popup__title">
            Какой товар соответсвует следующему товару дилера?
          </h2>
          <div className="position__item">
            <p className="position__dealer">
              {data.dealer_name}
            </p>
            <p className="position__name">
              {data.dealer_product_name}
            </p>
            <div className="position__container">
              <div className="position__key">
                Артикул:{' '}{checkArticle()}
              </div>
              <Link className="position__link" to={data.dealer_product_url} target="_blank">
                Товар
              </Link>
            </div>
          </div>
          <button className="popup__button" onClick={handleMatch} disabled={!productId.length}>
            Связать
          </button>
        </div>
        <div className="popup__column">
          {proseptItems}
        </div>
        <button className="popup__close-button" type="button" onClick={handleClose}>
          <svg className="popup__icon"  version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd" id="Cancel" stroke="none" strokeWidth="1">
              <g fill="#000000" id="Group" transform="translate(14.000000, 14.000000)">
                <path d="M0.732233047,0.732233047 C1.70854378,-0.244077682 3.29145622,-0.244077682 4.26776695,0.732233047 L34.6733585,31.1378246 C35.6496693,32.1141354 35.6496693,33.6970478 34.6733585,34.6733585 C33.6970478,35.6496693 32.1141354,35.6496693 31.1378246,34.6733585 L0.732233047,4.26776695 C-0.244077682,3.29145622 -0.244077682,1.70854378 0.732233047,0.732233047 Z" id="Rectangle"/>
                <path d="M0.732233047,34.6733585 C1.70854378,35.6496693 3.29145622,35.6496693 4.26776695,34.6733585 L34.6733585,4.26776695 C35.6496693,3.29145622 35.6496693,1.70854378 34.6733585,0.732233047 C33.6970478,-0.244077682 32.1141354,-0.244077682 31.1378246,0.732233047 L0.732233047,31.1378246 C-0.244077682,32.1141354 -0.244077682,33.6970478 0.732233047,34.6733585 Z" id="Rectangle"/>
              </g>
            </g>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Popup