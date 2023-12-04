const URL = 'http://127.0.0.1:8000'
const autoToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMjM0OTU0LCJqdGkiOiI3M2MzYWNhOWJiNzY0NWExOGYyY2NiNTY4NzlmY2ZjNCIsInVzZXJfaWQiOjF9.-c05XMCEgRmObHihqa7dr9ZN_UhwEpOZmjwiwV6leVM'

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
