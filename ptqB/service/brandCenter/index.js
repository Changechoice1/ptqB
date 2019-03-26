// 获取A对象
import A from '../../vwx/uset.js'

module.exports = {
  //营销助手，品牌列表页
  getBrandList(brand_id, pageNum, is_group) {
    return this.getTData({
      url: '/WeChatAppsCs/marketing/brandHome',
      data: {
        brand_id: brand_id || null,
        is_group: is_group || 1,
        paging: pageNum || 1
      }
    })
  },

  // 获取品牌推荐列表
  getBrandRecoList(brandId, actType, pageNum){
    return this.getTData({
			url: '/WechatApi/Brand/list',
      data: {
        brand_id: brandId,
        is_group: actType,
        paging: pageNum
      }
    })
  },
  getBrandIndexList(data){
     return this.getTData({
        url:'/WechatApi/Brand/list',
        data:data
     })
  }
}