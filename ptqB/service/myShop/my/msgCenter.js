// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取消息列表
  getMsgList(pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/StoreMessage/messageList', data: { paging: pageNum } })
  },
}