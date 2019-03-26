// 获取A对象
import A from '../../../vwx/uset.js'

module.exports = {
  // 获取运费列表
  getFreightList(keywords, pageNum) {
    return this.getTData({ url: '/WeChatAppsCs/StoreFreight/freight_list', data: { keywords: keywords, paging: pageNum } })
  },
  // 删除运费模板
  delFreight(id) {
    return this.getTData({ url: '/WeChatAppsCs/StoreFreight/del_freight', data: { id: id } })
  },
  // 获取运费模板详情
  getFreightDetail(id) {
    return this.getTData({ url: '/WeChatAppsCs/StoreFreight/getinfo_freight', data: { id: id } })
  },
  // 获取省市区数据
  getAddressData(id, cityId) {
    return this.getTData({ url: '/WeChatAppsCs/StoreFreight/province_city_list', data: { id: id, city_id: cityId } })
  },
  // 提交运费模板数据
  submitFreightData(url, data){
    return this.getTData({ url: url, data: data })
  }
}