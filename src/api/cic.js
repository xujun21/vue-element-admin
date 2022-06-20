import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/records/list',
    method: 'get',
    params: query
  })
}

export function fetchRecord(id) {
  return request({
    url: '/vue-element-admin/records/detail',
    method: 'get',
    params: id
  })
}
