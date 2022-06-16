import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/members/list',
    method: 'get',
    params: query
  })
}

export function fetchMember(id) {
  return request({
    url: '/vue-element-admin/members/detail',
    method: 'get',
    params: id
  })
}
