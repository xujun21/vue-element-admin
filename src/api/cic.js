import request from '@/utils/request'

export function fetchRecordsList(query) {
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

export function fetchOrdersList(query) {
  return request({
    url: '/vue-element-admin/orders/list',
    method: 'get',
    params: query
  })
}

export function fetchOrder(id) {
  return request({
    url: '/vue-element-admin/orders/detail',
    method: 'get',
    params: id
  })
}
