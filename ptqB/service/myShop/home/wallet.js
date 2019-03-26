// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  /**
   * 钱包首页
   */
  // 获取钱包余额信息
  getBalanceInfo(url) {
    return this.getTData({ url: url })
  },

  /**
   * 钱包余额明细
   */
  // √ 获取余额明细列表
  getTurnoverList(pageNum, pageSize, type) {
    return this.getTData({ url: '/WeChatAppsCs/StoreWallet/list', data: { pageNum: pageNum, pageSize: pageSize, type: type }
    })
  },
  // √ 获取余额明细详情
  getTurnoverDetail(id) {
    return this.getTData({ url: '/WeChatAppsCs/StoreWallet/detail', data: { id: id } })
  },

  /**
   * 安全密码
   */
  // 身份验证
  submitValidateInfo(cardId, realName){
    return this.getTData({ url: '/WeChatAppsCs/StoreWallet/verify_identity', data: { card_id: cardId, real_name: realName } })
  },
  // 设置密码
  submitInitPassword(){
    return this.getTData({ url: '/WeChatAppsCs/StoreWallet/password', data: { card_id: cardId, real_name: realName, password: password } })
  },
  // 修改密码
  submitNewPassword(password){
    return this.getTData({ url: '/WeChatAppsCs/StoreWallet/re_set_password', data: { password: password } })
  },

  /**
   * 提现
   */
  // 获取提现初始化数据
  getWithdrawDepositInfo(identity, alipayId) {
    return this.getTData({ url: '/WeChatAppsCs/Wallet/deposit', data: { identity: identity, alipay_id: alipayId } })
  },
  // 输入密码确认提现
  confirmWithdrawDeposit(data){
    return this.getTData({ url: '/WeChatAppsCs/Wallet/withdraw_do', data: data })
  }
}