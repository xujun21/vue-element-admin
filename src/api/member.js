import request from '@/utils/request'

export function MembersList(query) {
  return request({
    url: '/vue-element-admin/members/list',
    method: 'get',
    params: query
  })
}
