// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取已回复评价列表
  getRepliedEvaluationList(pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/StoreEvaluate/evaluate_list', data: { paging: pageNum } })
  },
  // 获取待回复评价列表
  getNoReplyEvaluationList(pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/StoreEvaluate/evaluate_not_list', data: { paging: pageNum } })
  },
  // 设置客户可见状态
  setEvaluationReplyVisibility(id) {
    return this.getTData({ url: '/WeChatAppsCs/StoreEvaluate/conceal_evaluate', data: { evaluate_id: id } })
  },
  // 回复
  replyEvaluation(id, content) {
    return this.getTData({ url: '/WeChatAppsCs/StoreEvaluate/reply', data: { evaluate_id: id, content: content } })
  },
}