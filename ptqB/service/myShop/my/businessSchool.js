// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取分类信息
  getTypeInfo() {
    return this.getTData({ url: '/WeChatAppsCs/StoreSchool/type' })
  },
  // 获取列表
  getList(typeId, pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/StoreSchool/articleList', data: { type_id: typeId, paging: pageNum} })
  },
  // 获取文章详情
  getArticleDetail(url, data){
    return this.getTData({ url: url, data: data })
  },
  // 增加阅读/点赞/分享的函数，点赞
  otherFuntion(type, articleId) {
    return this.getTData({ url: '/WeChatAppsCs/StoreSchool/articleOperate', data: { type: type, article_id: articleId } })
  }
}