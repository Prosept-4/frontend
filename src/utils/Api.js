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

  checkToken(token) {
    return fetch(`${this._baseUrl}/auth/token/verify/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        token,
      }),
    }).then(this._checkResponse)
  }

  getAllMatchedItems(token) {
    return fetch(`${this._baseUrl}/match/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse)
  }

  getDirectMatchedItems(token, page) {
    return fetch(`${this._baseUrl}/match/?page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse)
  }

  deleteMatchedItems(token, id) {
    return fetch(`${this._baseUrl}/match/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  patchMatch(token, id, key, dealer_id, product_id) {
    return fetch(`${this._baseUrl}/match/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
