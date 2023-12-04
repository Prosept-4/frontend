const URL = 'http://127.0.0.1:8000'
const autoToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMjkxODA5LCJqdGkiOiJmNTNhZDk4OWFlYmQ0OGNhYWI0ZWEyMGY1NjNmODVkZCIsInVzZXJfaWQiOjF9.l30zjVz1zlZRvmjzI9F1_24pmYnYCYrlpQHws-QgEHw'

const defaultHeader = {
  Authorization: autoToken,
  'Content-Type': 'application/json',
}

function handleResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

function getProducts(
  productsNum,
  { has_no_matches, is_matched, is_postponed }
) {
  return fetch(
    `${URL}/api/dealer-products/?` +
      new URLSearchParams({
        has_no_matches: has_no_matches,
        is_matched: is_matched,
        is_postponed: is_postponed,
        limit: productsNum,
      }),
    {
      method: 'GET',
      headers: defaultHeader,
    }
  ).then(handleResponse)
}

export function getUnsortedProducts(productsNum) {
  return getProducts(productsNum, {
    has_no_matches: false,
    is_matched: false,
    is_postponed: false,
  })
}

export function getOnHoldProducts(productsNum) {
  return getProducts(productsNum, {
    has_no_matches: false,
    is_matched: false,
    is_postponed: true,
  })
}

export function getNoMatchProducts(productsNum) {
  return getProducts(productsNum, {
    has_no_matches: true,
    is_matched: false,
    is_postponed: false,
  })
}

export function getProseptProducts() {
  return fetch(`${URL}/api/product/?limit=10`, {
    method: 'GET',
    headers: defaultHeader,
  }).then(handleResponse)
}

export function setProductOnHold(boolean, id){
  return fetch(`${URL}/api/postpone/${id}/`, {
    method: 'GET',
    headers: defaultHeader,
    body:{

    }
  }).then(handleResponse)
}
