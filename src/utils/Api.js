import { DEV_URL } from '../tools/const'

const { NODE_ENV, REACT_APP_BASE_URL } = process.env

const BASE_URL = NODE_ENV === 'production' ? REACT_APP_BASE_URL : DEV_URL

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }

  _getToken() {
    return(localStorage.getItem('token'))
    }

  login(email, password) {
    return fetch(`${this._baseUrl}/auth/login/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse)
  }

  checkToken() {
    return fetch(`${this._baseUrl}/auth/token/verify/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        token:this._getToken() ,
      }),
    }).then(this._checkResponse)
  }

  getAllMatchedItems() {
    return fetch(`${this._baseUrl}/match/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._getToken()}`,
      },
    }).then(this._checkResponse)
  }

  getDirectMatchedItems(page) {
    return fetch(`${this._baseUrl}/match/?page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._getToken()}`,
      },
    }).then(this._checkResponse)
  }

  deleteMatchedItems(id) {
    return fetch(`${this._baseUrl}/match/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._getToken()}`,
      },
    }).then((res) => {
      if (res.ok) {
        return
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  patchMatch( id, key, dealer_id, product_id) {
    return fetch(`${this._baseUrl}/match/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`
      },
      body: JSON.stringify({
        key,
        dealer_id,
        product_id
      }),
    })
      .then(this._checkResponse)
  }

}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
