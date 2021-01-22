import request from '@/utils/request'

export function createRecruit(data) {
  return request({
    url: 'http://127.0.0.1:8000/recruit/createRecruit',
    method: 'post',
    data
  })
}

export function recruitList(data) {
  return request({
    url: 'http://127.0.0.1:8000/recruit/recruitlist',
    method: 'post',
    data
  })
}

export function submit(data) {
  return request({
    url: 'http://127.0.0.1:8000/recruit/submit',
    method: 'post',
    data
  })
}

export function updateRoles(data) {
  return request({
    url: 'http://127.0.0.1:8000/recruit/updateroles',
    method: 'post',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: 'http://127.0.0.1:8000/recruit/updateStatus',
    method: 'post',
    data
  })
}
