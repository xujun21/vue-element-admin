const Mock = require('mockjs')

const NameList = []
const count = 100

module.exports = [
  {
    url: '/vue-element-admin/records/detail',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          // 'channel|1': ['客服注册', '门店注册', '线上注册'],
          'channel|1': ['400电话', '企业微信', '微信客服'],
          nick_name: '@cname()',
          'level|1': ['潜客', '普通会员', '金卡会员', '铂金卡会员', '钻石卡会员'],
          card_number: '@integer(16)',
          topic: '@cword(3,8)',
          phone: '@integer(13300000001,19999999999)',
          area: '@province()',
          city: '@city()',
          shopName: '@cword(3,5)',
          createdTime: '@datetime()',
          desc: '@cparagraph()'
        }
      }
    }
  },
  // 会员list
  {
    url: '/vue-element-admin/records/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: 20,
          'items|20': [{
            orderId: '@int(10000,99999)',
            topic: '@cword(3,8)',
            'type|1': ['投诉', '引流', '引流企业微信', '售后'],
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
            startTime: '@datetime()',
            cicer: '@cname()',
            tel: '@integer(13300000001,19999999999)'
          }]
        }
      }
    }
  }

]
