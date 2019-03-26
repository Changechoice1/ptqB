// 获取A对象
import A from '../../vwx/uset.js'

module.exports = {

  //活动详情
  getActDetail(goodsId, actType) {
    return this.getTData({ url: '/WeChatAppsCs/MemberGoods/people_group_detail', data: { goods_id: goodsId, is_group: actType, group_id: 0 } })
  },

  //获取店铺信息
  getActStoreInfo(modelId) {
    return this.getTData({ url: '/WechatApi/Brand/virtualStoreData', data: { model_id: modelId } })
  },
}