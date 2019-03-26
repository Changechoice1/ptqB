// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  /**
   * 发布、编辑活动
   */
  // 获取商家身份信息
  getStoreIdenInfo(){
    return this.getTData({ url: '/WeChatAppsCs/Store/index' })
  },
  // 获取活动信息
  getGoodsInfo(url, data){
    return this.getTData({ url: url, data: data })
  },
  // 获取玩法详情
  getRuleDetail(){
    return this.getTData({ url: '/WeChatAppsCs/StoreGoods/play_method' })
  },
  // 提交表单信息（添加/编辑）
  submitInfo(url, data) {
    return this.getTData({ url: url, data: data })
  },


  // 获取活动列表
  getActList(keywords, actType, is_sale, pageNum){
    return this.getTData({
      url: '/WeChatAppsCs/StoreGoods/classify_goods', data: { type: actType, is_sale: is_sale, keywords: keywords, paging: pageNum } })
  },
  // 删除活动
  delAct(id){
    return this.getTData({ url: '/WeChatAppsCs/StoreGoods/del_goods', data: { goods_id: id } })
  },
  // 获取音乐列表
  getMusicList() {
    return this.getTData({ url: '/WeChatAppsCs/ScratchGoods/music' })
  },

  /**
   * 多人拼团
   */

  /**
   * 拼团立减
   */

  /**
   * 限时专享
   */

  /**
   * 刮奖免单
   */
  // 获取刮奖免单表单数据（编辑）
  getGjmdInfo() {
    return this.getTData({ url: '/WeChatAppsCs/ScratchGoods/edit' })
  },
  // 发布/修改刮奖免单信息
  submitGjmdFrom(data){
    return this.getTData({ url: '/WeChatAppsCs/ScratchGoods/save', data: data })
  },
  // 获取刮奖免单刮奖详情
  getGjmdGroupList(id, type, pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/ScratchAward/initiator_list', data: { goods_id: id, type: type, paging: pageNum } })
  },
  // 获取刮奖免单刮奖明细
  getGjmdAmountRecord(id, type) {
    return this.getTData({ url: '/WeChatAppsCs/ScratchAward/scratch_detail', data: { initiator_id: id, type: type, paging: 0 } })
  },

  /**
   * 砍价
   */
  // 获取砍价活动情况
  getKjGroupList: function (id, type, pageNum){
    return this.getTData({ url: '/WeChatAppsCs/bargain/activityDetail', data: { goods_id: id, status: type, paging: pageNum } })
  },
}