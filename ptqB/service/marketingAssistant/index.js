// 获取A对象
import A from '../../vwx/uset.js'

module.exports = {

  //热门营销列表
  marketingList(month, categoryPid, categoryId, hot, pageNum, tab) {
    pageNum = pageNum || 1;
    month = month || 0;
    categoryPid = 0; //为h5必传参数，此处可不传
    categoryId = 0;
    tab = tab || 0;
    return this.getTData({
      url: '/WeChatAppsCs/marketing/list',
      data: {
        month: month,
        categoryPid: categoryPid,
        categoryId: categoryId,
        hot: hot,
        pageNum: pageNum,
        is_group: tab
      }
    })
  },
  //营销助手首页
  customizationList(categoryPid, categoryId) {
    categoryPid = 0; //为h5必传参数，此处可不传
    categoryId = 0;
    return this.getTData({
      url: '/WeChatAppsCs/marketing/home',
      data: {
        categoryPid: categoryPid,
        categoryId: categoryId
      }
    })
  }
}