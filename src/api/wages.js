import request from '@/utils/request'

export function wagesList(data) {
  return request({
    url: 'http://127.0.0.1:8000/wages/wageslist',
    method: 'post',
    data
  })
}

export function staffWagesList(data) {
  return request({
    url: 'http://127.0.0.1:8000/wages/staffWagesList',
    method: 'post',
    data
  })
}

export function updateRoles(data) {
  return request({
    url: 'http://127.0.0.1:8000/wages/updateroles',
    method: 'post',
    data
  })
}

export function updateWages(data) {
  return request({
    url: 'http://127.0.0.1:8000/wages/updateWages',
    method: 'post',
    data
  })
}
