import request from '@/utils/request'

export function usersList(data) {
  return request({
    url: 'http://127.0.0.1:8000/user/userslist',
    method: 'post',
    data
  })
}

export function getUser(data) {
  return request({
    url: 'http://127.0.0.1:8000/user/getUser',
    method: 'post',
    data
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateRoles(data) {
  return request({
    url: 'http://127.0.0.1:8000/user/updateroles',
    method: 'post',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: 'http://127.0.0.1:8000/user/updateStatus',
    method: 'post',
    data
  })
}
