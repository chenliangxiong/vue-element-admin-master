import request from '@/utils/request'

export function createJob(data) {
  return request({
    url: 'http://127.0.0.1:8000/newjob/createJob',
    method: 'post',
    data
  })
}
