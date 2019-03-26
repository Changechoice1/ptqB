// 状态类描述定义
const state = require('state.js')
const index = require('defaultMsg/index.js')
const home = require('defaultMsg/home.js')
const activity = require('defaultMsg/activity.js')
const order = require('defaultMsg/order.js')
const my = require('defaultMsg/my.js')
const marketingAssistant = require('defaultMsg/marketingAssistant.js')
const marketData = require('defaultMsg/marketData.js')
module.exports = {
  DF: {
    ERROR: {
      [state.STATUS.ERROR]: '提交失败！',
      '提交失败！': [state.STATUS.ERROR],
      [state.STATUS.IDEN]: '用户身份验证失败！',
      '用户身份验证失败！': [state.STATUS.IDEN],
      [state.STATUS.TOKEN]: '登录过期，请重新登录！',
      '登录过期，请重新登录！': [state.STATUS.TOKEN],
      [state.STATUS.NO]: '找不到页面！',
      '找不到页面！': [state.STATUS.NO]
    },
    OrderStatus: {
        '0': '全部',
        '全部': '0',
        '1': '待成团',
        '待成团': '1',
        '2': '待发货',
        '待发货': '2',
        '3': '待收货',
        '待收货': '3',
        '4': '待评价',
        '待评价': '4',
        '5': '已完成',
        '完成': '5',
        '6': '待使用',
        '待使用': '6',
        '10': '已过期',
        '订单过期': '10'
    },
    is_authentication: {
        YES: 1
    },
    MSG: {
      text: '123',
      ...index,
      ...home,
      ...activity,
      ...order,
      ...my,
      ...marketingAssistant,
      ...marketData
    }
  },
  STATE: state
}