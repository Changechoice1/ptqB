// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  /**
   * 钱包首页
   */
  // 获取钱包余额信息
  getStaffBalanceInfo() {
    return this.getTData({ url: '/WeChatAppsCs/StoreStaff/index' })
  },

  /**
   * 钱包余额明细
   */
  // 获取子账号余额明细列表
  getStaffBalanceList(pageNum, type, time) {
    return this.getTData({ url: '/WeChatAppsCs/StoreStaff/wallet_list', data: { paging: pageNum, type: type, time: time } })
  },

  /**
   * 提现
   */
  // 获取提现数据
  getStaffWithdrawDepositInfo(alipayId) {
    return this.getTData({ url: '/WeChatAppsCs/StoreStaff/deposit', data: { alipay_id: alipayId } })
  },
  // 确认提现
  confirmStaffWithdrawDeposit(data) {
    return this.getTData({ url: '/WeChatAppsCs/StoreStaff/withdraw_do', data: data })
  }
}