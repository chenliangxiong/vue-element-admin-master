import request from '@/utils/request'

export function departmentList(data) {
  return request({
    url: 'http://127.0.0.1:8000/department/departmentlist',
    method: 'post',
    data
  })
}

export function createDepartment(data) {
  return request({
    url: 'http://127.0.0.1:8000/department/createDepartment',
    method: 'post',
    data
  })
}

export function deleteDepartment(data) {
  return request({
    url: 'http://127.0.0.1:8000/department/deleteDepartment',
    method: 'post',
    data
  })
}

export function membersList(data) {
  return request({
    url: 'http://127.0.0.1:8000/department/membersList',
    method: 'post',
    data
  })
}
