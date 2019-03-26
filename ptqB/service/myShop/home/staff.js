// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取员工设置信息
  getStaffSettingInfo() {
    return this.getTData({ url: '/WeChatAppsCs/StoreStaff/staff_list' })
  },
  // 获取活动信息
  getStaffGoodsList(pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/StoreAccount/goods_list', data: { paging: pageNum } })
  },
  // 获取排行榜信息
  getStaffRankList(time) {
    return this.getTData({ url: '/WeChatAppsCs/StoreAccount/account_ranking_list', data: { time: time } })
  },
  // 获取员工列表信息
  getStaffList(){
    return this.getTData({ url: '/WeChatAppsCs/StoreStaff/add_staff_list' })
  },
  // 添加员工
  addStaff(accountId) {
    return this.getTData({ url: '/WeChatAppsCs/StoreStaff/add_staff', data: { account_id: accountId} })
  },
  // 删除员工
  delStaff(accountIds) {
    return this.getTData({ url: '/WeChatAppsCs/StoreStaff/del_staff', data: { account_ids: accountIds } })
  },
  // 修改员工备注
  editStaffRemark(accountId, remark) {
    return this.getTData({ url: '/WeChatAppsCs/StoreAccount/remark', data: { account_id: accountId, remark: remark } })
  },
  // 获取员工提成详情
  getStaffDetail(accountId, time) {
    return this.getTData({ url: '/WeChatAppsCs/StoreAccount/account_info', data: { account_id: accountId, time: time } })
  },
  // 获取员工提成详情提成明细列表
  getStaffDetailPercentList(accountId, time, pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/StoreAccount/account_month_info', data: { account_id: accountId, time: time, paging: pageNum} })
  },
}