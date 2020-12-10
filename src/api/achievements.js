import request from '@/utils/request'

export function achievementsList(data) {
  return request({
    url: 'http://127.0.0.1:8000/achievements/achievementslist',
    method: 'post',
    data
  })
}

export function updateRoles(data) {
  return request({
    url: 'http://127.0.0.1:8000/achievements/updateroles',
    method: 'post',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: 'http://127.0.0.1:8000/achievements/updateStatus',
    method: 'post',
    data
  })
}
