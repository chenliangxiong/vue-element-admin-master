import request from '@/utils/request'

export function departmentList() {
  return request({
    url: 'http://127.0.0.1:8000/register/departmentList',
    method: 'post'
  })
}
export function positionList() {
  return request({
    url: 'http://127.0.0.1:8000/register/positionList',
    method: 'post'
  })
}
export function register(data) {
  return request({
    url: 'http://127.0.0.1:8000/register/register',
    method: 'post',
    data
  })
}

