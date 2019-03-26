// 获取A对象
import A from '../../../vwx/uset.js';

module.exports = {
  // 获取客户列表
  getCustomerList(storeId, pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/listClientDTO/ByStoreId', data: { store_id: storeId, page: pageNum } })
  },
  // 获取客户联系方式
  getCustomerContacts(storeId, userId) {
    return this.getTData({ url: '/WeChatAppsCs/listClientContactDTO', data: { store_id: storeId, user_id: userId } })
  },
  // 修改客户默认联系方式
  editDefaultCustomerContact(storeId, userId, consignee, telephone) {
    return this.getTData({ url: '/WeChatAppsCs/updateStoreContacte', data: { storeId: storeId, userId: userId, consignee: consignee, telephone: telephone } })
  },
  // 获取客户订单列表
  getCustomerOrders(storeId, pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/MemberOrder/getOrderAll', data: { storeId: storeId, paging: pageNum } })
  },
  // 获取微信粉丝列表
  getFansList(storeId, pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/listFans', data: { storeId: storeId, page: pageNum } })
  },
}