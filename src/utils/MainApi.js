const URL = 'http://127.0.0.1:8000'
const autoToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMzg0MzU2LCJqdGkiOiIyNGEyMDA3NDQwZDQ0YTE0OTJiNGJiZGM2MDBiZjVkMiIsInVzZXJfaWQiOjF9.9MZH263F-3YKpcHy5HwF6R1huKikU9sRdPPdFRkRlOg'

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

export function patchProductOnHold(id) {
  return fetch(`${URL}/api/postpone/${id}/`, {
    method: 'PATCH',
    headers: defaultHeader,
    body: JSON.stringify({ is_postponed: true }),
  }).then(handleResponse)
}

export function patchProductNoMatch(id) {
  return fetch(`${URL}/api/has_no_matches/${id}/`, {
    method: 'PATCH',
    headers: defaultHeader,
    body: JSON.stringify({ has_no_matches: true }),
  }).then(handleResponse)
}

export function postMatchProducts({key, dealer_id, product_id }) {
  return fetch(`${URL}/api/match/`, {
    method: 'POST',
    headers: defaultHeader,
    body: JSON.stringify({
      key: key,
      dealer_id: dealer_id,
      product_id: product_id ,
    }),
  }).then(handleResponse)
}
