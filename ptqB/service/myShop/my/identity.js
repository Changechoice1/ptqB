// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取上次进入的身份
  getLastIden() {
    return this.getTData({ url: '/WeChatAppsCs/IdentityCut/index' })
  },
  // 切换身份
  changeIden(upidentity){
    return this.getTData({ url: '/WeChatAppsCs/IdentityCut/identity_verify', data: { upidentity: upidentity } })
  },
  // 是否绑定商家
  getBindStoreInfo() {
    return this.getTData({ url: '/WeChatAppsCs/IdentityCut/is_binding_store' })
  },
  // 获取验证码
  getLoginIdenCode(telephone, upidentity){
    return this.getTData({
      url: '/WeChatAppsCs/IdentityCut/send_code', data: { telephone: telephone, upidentity: upidentity } })
  },
  // 登录
  loginStore(upidentity, telephone, code) {
    return this.getTData({ url: '/WeChatAppsCs/IdentityCut/binding_do', data: { upidentity: upidentity, telephone: telephone, code: code } })
  }
}