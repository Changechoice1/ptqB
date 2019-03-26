// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取客户数量
  getCustomers(storeId, pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/listClientDTO/ByStoreId', data: { store_id: storeId, page: pageNum } })
  },
  // 获取商家信息
  getStoreInfo(){
    return this.getTData({ url: '/WeChatAppsCs/Store/index' })
  }, 
  // 获取提示信息
  getStatusInfo(authCode, type){
    return this.getTData({ url: '/WeChatAppsCs/Store/store_dynamic', data: { numbering: authCode || '123789456', type: type } })
  },
  // 确定拒绝授权
  certainAuthReject(){
    return this.getTData({ url: '' })
  },
  // 刮奖免单：是否为内测人员
  getStoreState: function(type){
    return this.getTData({ url: '/WeChatAppsCs/Scratch/is_telephone', data: { type: type } })
  } 
}