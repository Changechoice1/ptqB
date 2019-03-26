// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取粉丝数
  getFansNum(storeId, pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/listFans', data: { storeId: storeId, page: pageNum } })
  },
  // 获取相关店铺信息
  getRelativeStoreInfo(){
    return this.getTData({ url: '/WeChatAppsCs/StoreWeChat/index' })
  },
  // 获取短信信息
  getSmsInfo() {
    return this.getTData({ url: '/WeChatAppsCs/sms/store' })
  },
  // 获取店铺活动信息
  getStoreGoodsInfo(pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/StoreWeChat/goods_list', data: { paging: pageNum } })
  },
  // 获取商盟活动信息
  getAlliancesGoodsInfo(pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/StoreWeChat/ally_goods', data: { paging: pageNum } })
  },
  // 群发消息
  sendMsg(goodsIds) {
    return this.getTData({ url: '/WeChatAppsCs/StoreWeChat/group_sending', data: { goods_ids: goodsIds } })
  },
  // 群发短信
  sendSms(sms, storeId) {
    return this.getTData({ url: '/WeChatAppsCs/sms/submit', data: { msg: sms, storeId: storeId } })
  },
  // 获取钱包信息
  getRelativeWalletInfo() {
    return this.getTData({ url: '/WeChatAppsCs/Store/WalletPay/Recharge/home' })
  },
  // 短信充值微信支付
  smsRechargeWechatPay(openid, storeId, quantity, money){
    return this.getTData({ url: '/WeChatAppsCs/weixinPay', data: { openid: openid, storeId: storeId, quantity: quantity, money: money } })
  },
  // 短信充值余额支付
  smsRechargeBalancePay(storeId, quantity, money, password) {
    return this.getTData({ url: '/WeChatAppsCs/Store/WalletPay/Recharge/pay', data: { store_id: storeId, quantity: quantity, money: money, password: password } })
  }
}