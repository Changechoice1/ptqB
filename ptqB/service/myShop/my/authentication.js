// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 是否认证
  getIsAuthInfo() {
    return this.getTData({ url: '/WeChatAppsCs/StoreAuthentication/authentication' })
  },
  // 认证有效时间
  getAuthTime() {
    return this.getTData({ url: '/WeChatAppsCs/StoreAuthentication/achieve' })
  },
  // 获取添加实名认证信息初始化数据
  getInitNewAuthInfo(type) {
    return this.getTData({ url: '/WeChatAppsCs/StoreAuthentication/auth_info', data: { type: type } })
  },
  // 提交认证数据
  submitAuthData(data) {
    return this.getTData({ url: '/WeChatAppsCs/StoreNewAuthentication/new_apply', data: data })
  },
  // 获取审核提示文字
  getAuditTipInfo() {
    return this.getTData({ url: '/WeChatAppsCs/StoreAuthentication/auth_process' })
  }
}