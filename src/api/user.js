import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login'
    // 发送请求
    url: 'http://127.0.0.1:8000/login/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  // console.log(token)
  return request({
    // console.log(data.roles)
    // url: '/vue-element-admin/user/getinfo'
    url: 'http://127.0.0.1:8000/login/getinfo',
    method: 'get'
  })
}

export function sendLoginCode(query) {
  // console.log(data)
  return request({
    // console.log(data.roles)
    // url: '/vue-element-admin/user/getinfo'
    url: 'http://127.0.0.1:8000/login/sendLoginCode',
    method: 'get',
    params: query
  })
}

export function checkLoginCode(data) {
  // console.log(token)
  return request({
    // console.log(data.roles)
    // url: '/vue-element-admin/user/getinfo'
    url: 'http://127.0.0.1:8000/login/checkLoginCode',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    // url: '/vue-element-admin/user/login'
    // 发送请求
    url: 'http://127.0.0.1:8000/login/register',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function getEmailCode(email) {
  return request({
    url: 'auth/emailCode?email=' + email,
    method: 'post'
  })
}
