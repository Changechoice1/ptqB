// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取支付信息
  getPayInfo() {
    return this.getTData({ url: '' })
  },
  // 支付年费
  payAnnualFee(version) {
    return this.getTData({ url: '/WeChatAppsCs/StoreNewAuthentication/new_auth_pay_do', data: { version: version} })
  },
}