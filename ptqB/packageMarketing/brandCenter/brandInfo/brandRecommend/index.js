// packageMarketing/brandCenter/brandInfo/brandRecommend/index.js
const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    brandId: 0,
    brandName: '',
    tabs: [{
      name: '多人拼团',
      type: 3,
    }, {
      name: '限时专享',
      type: 4
    }, {
      name: '拼团立减',
      type: 1
    }],
    // , {
    //   name: '砍价',
    //   type: 6
    // }
    type: 3,
    noList: false,
    noListData: {
      img: '/images/nullMA.png',
      txt: '暂无营销方案'
    },
    isLastPage: false,
    pageSize: 0,
    pageNum: 0,
    pageCount: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _that = this, _d = _that.data;
    if (options.id){
      _that.setData({
        brandId: options.id,
        brandName: options.name
      })
    }else{
      A.showTipModal('没有品牌id', _that.goBack)
    }
		var title = options.name + '品牌活动';
		if(title.length >= 15){
			title = title.substring(0,13)+'...'
		}
		wx.setNavigationBarTitle({
			title: title
		})
    _that.getBrandRecoList();//行业定制列表
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 切换tab
  changeTab: function (e) {
    let type = e.currentTarget.dataset.type;
    this.setData({ 
      noList: false,
      list: [],
      isLastPage: false,
      pageNum: 0,
      pageCount: 0,
      type: type 
    });
    this.getBrandRecoList();
  },

  // 获取品牌推荐列表
  getBrandRecoList: function () {
    const _that = this, _d = _that.data;
    A.updata.getBrandRecoList(_d.brandId, _d.type, ++_d.pageNum).then(res => {
      if(res.status == A.STATE.STATUS.OK){
				if (res.all_paging == 0 || res.brandMoreList.length == 0){
          _that.setData({
            noList: true
          });
          return;
        }
        if(res.paging >= res.all_paging){
          _that.setData({
            isLastPage: true
          });
        }
				if (res.brandMoreList.length > 0){
					let list = _d.list || []
					for (let i in res.brandMoreList) {
						list.push(res.brandMoreList[i])
					}
					_that.setData({
						list: list,
						paging:res.paging,
						all_paging:res.all_paging
					})
				}
				
      }else{
        A.showTipModal(res.info || '获取数据失败');
				_that.setData({
					noList: true
				});
      }
    }, err => {})
  },

  // 跳转模板详情
  goTDetail: function (e) {
    let data = e.currentTarget.dataset.item;
    let typeStr = data.is_group == 1 ? 'ptljTDetail/ptljTDetail' : data.is_group == 3 ? 'drptTDetail/drptTDetail' : data.is_group == 4 ? 'xszxTDetail/xszxTDetail' : data.is_group == 6 ? 'kjTDetail/kjTDetail' : '';
    A.G('/packageMarketing/marketingAssistant/actTDetail/' + typeStr + '?goods_id=' + data.goods_id + '&num=' + data.user_count + '&tag=' + data.tag_industry_id + '&applyNum=' + data.same_kind_count + '&entry=1');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(!this.data.isLastPage){
      this.getBrandRecoList();
    }
  }
}))