const Mock = require('mockjs')

const NameList = []
const count = 100

// for (let i = 0; i < count; i++) {
//   NameList.push(Mock.mock({
//     name: '@first'
//   }))
// }
// NameList.push({ name: 'mock-Pan' })

module.exports = [
  // {
  //   url: '/vue-element-admin/search/user',
  //   type: 'get',
  //   response: config => {
  //     const { name } = config.query
  //     const mockNameList = NameList.filter(item => {
  //       const lowerCaseName = item.name.toLowerCase()
  //       return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0)
  //     })
  //     return {
  //       code: 20000,
  //       data: { items: mockNameList }
  //     }
  //   }
  // },

  {
    url: '/vue-element-admin/members/detail',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          'channel|1': ['客服注册', '门店注册', '线上注册'],
          nick_name: '@cname()',
          'level|1': ['潜客', '普通会员', '金卡会员', '铂金卡会员', '钻石卡会员'],
          card_number: '@integer(16)'

        }
      }
    }
  },
  // 会员list
  {
    url: '/vue-element-admin/members/list',
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
            openid: '@string(16)',
            'channel|1': ['微信公众号', '小程序', '企业微信'],
            'level|1': ['金卡', '白金卡', '钻石卡'],
            area: '@province()',
            city: '@city()',
            dealerNo: '@integer(10000,20000)',
            regTime: '@datetime()',
            username: '@name()',
            tel: '@integer(13300000001,19999999999)'
          }]
        }
      }
    }
  }

]
