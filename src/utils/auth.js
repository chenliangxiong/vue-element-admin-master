import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const WorkNum = ''

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setWorkNum(work_num) {
  return Cookies.set(WorkNum, work_num)
}

export function getWorkNum() {
  return Cookies.get(WorkNum)
}
