// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取商盟列表
  getBusinessAllianceList() {
    return this.getTData({ url: '/WeChatAppsCs/StoreAlly/store_ally' })
  },
  // 修改商盟排序
  editBusinessAllianceSequence(ids) {
    return this.getTData({ url: '/WeChatAppsCs/StoreAlly/sort', data: { ally_ids: ids } })
  },
  // 删除商盟
  delBusinessAlliance(ids) {
    return this.getTData({ url: '/WeChatAppsCs/StoreAlly/multiple_del', data: { ally_ids: ids } })
  },
  // 拒绝申请
  refuseAllianceApply(id) {
    return this.getTData({ url: '/WeChatAppsCs/StoreAlly/del', data: { ally_id: id } })
  },
  // 同意申请
  agreeAllianceApply(id) {
    return this.getTData({ url: '/WeChatAppsCs/StoreAlly/add', data: { ally_id: id } })
  },
}