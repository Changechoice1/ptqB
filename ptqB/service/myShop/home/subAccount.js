// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取子账号列表
  getSubAccountList() {
    return this.getTData({ url: '/WeChatAppsCs/StoreAccount/account_ally' })
  },
  // 修改备注
  editSubAccountRemark(accountId, remark) {
    return this.getTData({ url: '/WeChatAppsCs/StoreAccount/remark', data: { account_id: accountId, remark: remark } })
  },
  // 删除子账号
  delSubAccount(accountIds) {
    return this.getTData({ url: '/WeChatAppsCs/StoreAccount/multiple_del', data: { account_ids: accountIds } })
  },
  // 同意申请
  agreeApply(accountId) {
    return this.getTData({ url: '/WeChatAppsCs/StoreAccount/add', data: { account_id: accountId } })
  },
  // 拒绝申请
  refuseApply(accountId) {
    return this.getTData({ url: '/WeChatAppsCs/StoreAccount/del', data: { account_id: accountId } })
  },
}