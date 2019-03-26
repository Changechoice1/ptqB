// packageMarketing/brandCenter/index.js
const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      title: '品牌官方活动',
      bindtap: 'getBrandList'
    }, {
        title: '品牌定制下单',
      bindtap: 'getCustomizedList'
    }],
    tab: 0,

    info: {
      category: '生活服务',
      subCategory: '汽车服务'
    },
    noList: false,
    noListData: {
      img: 'https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/wxxcx/no_brand.png',
      txt: '暂无信息'
    },
    list: [],
    isLastPage: false,
    pageSize: 10,
    pageCount: 0,
    pageNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 关闭分享
    wx.hideShareMenu();

    // 获取品牌列表
    this.getBrandList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  // 切换行业
  goSetting: function(){
    A.G('/pages/myshop/setting/setting')
  },

  // 切换tab
  switchTab: function(e){
    let index = e.currentTarget.dataset.index;
    this.setData({ 
      tab: index,
      noList: false,
      list: [],
      isLastPage: false,
      pageCount: 0,
      pageNum: 0,
    });
    this[this.data.tabs[index].bindtap]();
  },

  // 获取品牌列表
  getBrandList: function(){
    const _that = this, _d = _that.data;
    A.updata.getBrandList(++_d.pageNum).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        if(res.all_paging == 0 || res.list.length == 0){
          this.setData({
            noList: true
          })
          return;
        }
        if(res.paging >= res.all_paging){
          this.setData({
            isLastPage: true
          })
        }
        let list = this.data.list || [];
        list.concat(res.list);
        this.setData({
          list: list
        })
      } else if (res.status == 300) {
      } else {
        A.showTipModal(res.info || '请求数据失败')
      }
    }, err => {
      A.showTipModal(err.info || '请求接口失败')
    })
  },

  // 获取定制下单
  getCustomizedList: function(){
    const _that = this, _d = _that.data;
    A.updata.getBrandList(++_d.pageNum).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        if (res.all_paging == 0 || res.list.length == 0) {
          this.setData({
            noList: true
          })
          return;
        }
        if (res.paging >= res.all_paging) {
          this.setData({
            isLastPage: true
          })
        }
        let list = this.data.list || [];
        list.concat(res.list);
        this.setData({
          list: list
        })
      } else if (res.status == 300) {
      } else {
        A.showTipModal(res.info || '请求数据失败')
      }
    }, err => {
      A.showTipModal(err.info || '请求接口失败')
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const _that = this, _d = _that.data;
    if(!_d.isLastPage){
      _that[_d.tabs[_d.tab].bindtap]();
    }
  },
}))