// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取二维码
  getQrCode() {
    return this.getTData({ url: '/WeChatAppsCs/Store/qr_code' })
  }
}