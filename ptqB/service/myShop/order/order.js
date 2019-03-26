// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取订单列表
  getOrderList(type, pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/StoreOrder/order_list', data: { type: type, paging: pageNum} })
  },
  // 获取订单详情
  getOrderDetail(orderId) {
    return this.getTData({ url: '/WeChatAppsCs/StoreOrder/order_info', data: { order_id: orderId } })
  },
  // 核销
  cancelAfterVerification(orderId) {
    return this.getTData({ url: '/WeChatAppsCs/StoreOrder/cancel_after', data: { order_id: orderId }})
  },
  // 提交物流信息：发货、修改物流信息
  submitLogisticsInfo(url, data) {
    return this.getTData({ url: '/WeChatAppsCs/' + url, data: data })
  },
  // 回复评价
  orderReplyEvaluation(content, id) {
    return this.getTData({
      url: '/WeChatAppsCs/StoreEvaluate/reply', data: { content: content, evaluate_id: id }})
  },
	//预核销
	cancelAfterVerificationNew(orderId){
		return this.getTData({ url: '/WechatApi/StoreOrder/pre_cancel', data: { order_id: orderId } })
	}
}