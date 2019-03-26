// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取进行中专享卡列表
  getValidSpecialCardList(pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/StoreCard/card_list', data: { paging: pageNum } })
  },
  // 获取已失效专享卡列表
  getInvalidSpecialCardList(pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/StoreCard/card_lose_list', data: { paging: pageNum } })
  },
  // 获取专享卡详情
  getSpecialCardInfo(cardId) {
    return this.getTData({ url: '/WeChatAppsCs/StoreCard/card_info', data: { card_id: cardId } })
  },
  // 获取专享卡消费详情
  getSpecialCardConsumeRecordInfo(orderId) {
    return this.getTData({ url: '/WeChatAppsCs/StoreCard/buy_card_info', data: { order_id: orderId } })
  },
  // 获取专享卡消费记录核销列表
  getSpecialCardCanAftVeriList(cardId, pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/StoreCard/use_card_list', data: { card_id: cardId, paging: pageNum } })
  }
}