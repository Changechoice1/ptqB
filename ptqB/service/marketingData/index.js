//营销数据接口
module.exports={
	//人气聚焦
	popularFocus(storeId){
		return this.getTData({
			url:'/WeChatAppsCs/StoreBrowse/popularFocus',
			data: { storeId}
		})
	},
	//营销秘籍列表
	marketDataList(){
		return this.getTData({
			url:'/WeChatAppsCs/StoreScale/list'
		})
	},
	//雷达图
	radar() {
		return this.getTData({
			url: '/WeChatAppsCs/market/radar'
		})
	},
	//7天客户来源
	customerSource(storeId) {
		return this.getTData({
			url: '/WeChatAppsCs/StoreBrowse/customerSource',
			data: { storeId}
		})
	},
	//店铺营销称号
	level(){
		return this.getTData({
			url:'/WeChatAppsCs/market/level'
		})
	},
  //营销数据，活动分类列表
  activeList(store_id, is_group, paging){
    return this.getTData({
      url: '/WeChatAppsCs/StoreBrowse/popularFocusList',
      data:{
        store_id: store_id,
        is_group: is_group,
        paging: paging
      }
    })
  },
   detail(goodsId) {
      return this.getTData({
         url: '/WeChatAppsCs/marketing/detail',
         data: { goodsId: goodsId }
      })
   },		
   materialDesignApply(data){
      return this.getTData({
         url:'/WeChatAppsCs/materialDesign/apply',
         data:data
      })
   }
}