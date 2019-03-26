// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取店铺信息
  getInitStoreInfo() {
    return this.getTData({ url: '/WeChatAppsCs/Store/store_info' })
  },
  // 提交数据
  submitEditData(data) {
    return this.getTData({ url: '/WeChatAppsCs/Store/edit_store_info', data: data })
  }
}