const Mock = require('mockjs')

const NameList = []
const count = 100

for (let i = 0; i < count; i++) {
  NameList.push(Mock.mock({
    name: '@first'
  }))
}
NameList.push({ name: 'mock-Pan' })

module.exports = [
  // username search
  {
    url: '/vue-element-admin/search/user',
    type: 'get',
    response: config => {
      const { name } = config.query
      const mockNameList = NameList.filter(item => {
        const lowerCaseName = item.name.toLowerCase()
        return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0)
      })
      return {
        code: 20000,
        data: { items: mockNameList }
      }
    }
  },

  // transaction list
  {
    url: '/vue-element-admin/transaction/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: 20,
          'items|20': [{
            order_no: '@guid()',
            timestamp: +Mock.Random.date('T'),
            username: '@name()',
            price: '@float(1000, 15000, 0, 2)',
            'status|1': ['success', 'pending']
          }]
        }
      }
    }
  },

  // 工单 list
  {
    url: '/vue-element-admin/search/orderList',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: 20,
          'items|20': [{
            orderId: '@int(10000,99999)',
            'topic|1': ['投诉', '引流', '引流企业微信', '售后'],
            shopName: '@cword(3,5)',
            memberId: '@integer(16)',
            nickname: '@cname()',
            phone: '@integer(13300000001,19999999999)',
            'channel|1': ['微信公众号', '小程序', '企业微信'],
            'type|1': ['投诉', '表扬', '优选商城'],
            cicer: '@cname()',
            dealer: '@cname()',
            dealerNo: '@integer(10000,20000)',
            startTime: '@datetime()',
            username: '@name()',
            'status|1': ['待处理', '处理中', '已回复', '再次处理', '待回访', '已回访', '处理完毕']
          }]
        }
      }
    }
  }

]
