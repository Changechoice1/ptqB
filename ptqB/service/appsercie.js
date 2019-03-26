import A from '../vwx/uset.js'

module.exports = {
   // 获取身份信息
   getUinfo() {
      return this.getTData({ url: '/WeChatAppsCs/Enter/identity' })
   }
}