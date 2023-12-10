import { DEV_URL } from '../tools/const'

const { NODE_ENV, REACT_APP_BASE_URL } = process.env

const BASE_URL = NODE_ENV === 'production' ? REACT_APP_BASE_URL : DEV_URL

function defaultHeader() {
  return {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  }
}

function handleResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res}`)
}

function getProducts(
  productsNum,
  { has_no_matches, is_matched, is_postponed }
) {
  return fetch(
    `${BASE_URL}/dealer-products/?` +
      new URLSearchParams({
        has_no_matches: has_no_matches,
        is_matched: is_matched,
        is_postponed: is_postponed,
        limit: productsNum,
        is_analyzed: true,
      }),
    {
      method: 'GET',
      headers: defaultHeader(),
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
  return fetch(`${BASE_URL}/product/?limit=10`, {
    method: 'GET',
    headers: defaultHeader(),
  }).then(handleResponse)
}

export function patchProductOnHold(id) {
  return fetch(`${BASE_URL}/postpone/${id}/`, {
    method: 'PATCH',
    headers: defaultHeader(),
    body: JSON.stringify({ is_postponed: true }),
  }).then(handleResponse)
}

export function patchProductNoMatch(id) {
  return fetch(`${BASE_URL}/has_no_matches/${id}/`, {
    method: 'PATCH',
    headers: defaultHeader(),
    body: JSON.stringify({ has_no_matches: true }),
  }).then(handleResponse)
}

export function postMatchProducts({ key, dealer_id, product_id }) {
  return fetch(`${BASE_URL}/match/`, {
    method: 'POST',
    headers: defaultHeader(),
    body: JSON.stringify({
      key: key,
      dealer_id: dealer_id,
      product_id: product_id,
    }),
  }).then(handleResponse)
}

export function deleteMatch(id) {
  return fetch(`${BASE_URL}/match/${id}/`, {
    method: 'DELETE',
    headers: defaultHeader(),
  }).then((res) => {
    if (res.ok) {
      return res
    }
    return Promise.reject(`Ошибка: ${res}`)
  })
}

export function getProseptProductByText(text) {
  return fetch(
    `${BASE_URL}/product/?` +
      new URLSearchParams({
        name_1c: text,
        limit: 999,
      }),
    {
      method: 'GET',
      headers: defaultHeader(),
    }
  ).then(handleResponse)
}

export function getAnalyze() {
  return fetch(`${BASE_URL}/analyze/`, {
    method: 'get',
    headers: defaultHeader(),
  }).then((res) => {
    if (res.ok) {
      return res
    }
    return Promise.reject(res.status)
  })
}

export function getPredictions(id) {
  return fetch(
    `${BASE_URL}/predictions/?` +
      new URLSearchParams({
        dealer_product_id: id,
      }),
    {
      method: 'GET',
      headers: defaultHeader(),
    }
  ).then(handleResponse)
}

export function getAllStatistics() {
  return fetch(`${BASE_URL}/statistic/`, {
    method: 'GET',
    headers: defaultHeader(),
  }).then(handleResponse)
}

export function getStatisticsByDate(minDate, maxDate) {
  return fetch(
    `${BASE_URL}/statistic/?` +
      new URLSearchParams({
        min_date: minDate,
        max_date: maxDate,
      }),
    {
      method: 'GET',
      headers: defaultHeader(),
    }
  ).then(handleResponse)
}
