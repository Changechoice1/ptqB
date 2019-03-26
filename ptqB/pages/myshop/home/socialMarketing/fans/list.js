// pages/myshop/expand/fans/list.js
const unionid = wx.getStorageSync('thisCode');
const storeId = wx.getStorageSync('store_id');
const http = require('../../../../../utils/http.js');
const util = require('../../../../../utils/util.js');

const A = getApp();
Page(A.assignPage({
  data: {
    tip: {
      status: 0,
      title: '拼团趣温馨提示',
      content:'弹窗内容',
      cancelText: '取消',
      confirmText: '确定',
      txtAlign: 'center',
      titleHide: true,
      onceConfirm: true
    },
    selectedTab: 0,
    tab: 2, // 跳消息群发携带参数，客户群发-2，粉丝群发-1

    noList: false,
    noListInfo: [
      { img: '/images/ex-fans-no.png', txt: '暂无客户' }, 
      { img: '/images/ex-fans-no.png', txt: '暂无粉丝' }
    ],

    nums: 0,
    followedNums: 0,

    isLastPage: false,
    pageSize: 10,
    pageCount: 0,
    pageNum: 0,
    list: []
  },
  onLoad: function(opts){
     // 关闭分享功能
     wx.hideShareMenu();
    if(opts.tab){
      this.setData({ 
        selectedTab: opts.tab,
        tab: opts.tab == 0 ? 2 : opts.tab,
      });
    }
    this.setData({ 
      is_account: opts.is_account || 0,
      storeId: wx.getStorageSync('store_id') 
    });
    this.loadList();
  },

  // 切换tab
  selectTab: function(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      selectedTab: index,
      tab: index,
      nums: 0, followedNums: 0,
      noList: false, isLastPage: false, pageCount: 0, pageNum: 0, pageSize: (index == 0 ? 10 : 10), list: []
    });
    this.loadList();
  },

  // 群发消息
  groupMsg: function () { wx.navigateTo({ url: '../groupMsg/groupMsg?tab=' + this.data.tab }) },

  // 触底加载更多
  onReachBottom: function(){
    this.loadList();
  },

  // 加载列表
  loadList: function (opts) {
    if(!this.data.isLastPage){
      const _that = this, _d = _that.data;
      let pageNum = _d.pageNum, nums = 0, data = {}, followedNums = 0;
      if (_d.selectedTab == 0) {
        wx.showLoading({ title: '加载中', });
        _that.getCustomer().then(res => {
            wx.hideLoading();
            if (res.status == 1) {
              nums = res.clients_num;
              this.setInitData({ pageNum: pageNum, nums: nums, data: res, followedNums: followedNums });
            } else { _that.showTipStatus(res); }  
        }, err => { wx.hideLoading(); _that.showTipErr(); });
      } else {
        wx.showLoading({ title: '加载中', });
        _that.getFans().then(res => {
          wx.hideLoading();
          if (res.status == 1) {
            nums = res.info.fans_num; followedNums = res.info.effect_num;
            this.setInitData({
              pageNum: pageNum, nums: nums, followedNums: followedNums,
              data: { total_pages: res.total_pages, page: res.page, list: res.info.fans_list }
            });
          } else { _that.showTipStatus(res) }
        }, err => { wx.hideLoading(); _that.showTipErr(err); });
      }
    }
  },
  setInitData: function(otps){
    const _that = this, _d = _that.data;
    if (otps.nums == 0) { _that.setData({ noList: true }); } else {
      if (otps.data.total_pages <= otps.data.page) { _that.setData({ isLastPage: true }); }
      let list = _d.list || [], newList = list.concat(otps.data.list);
      _that.setData({ nums: otps.nums, followedNums: otps.followedNums, list: newList, pageCount: otps.data.total_pages, pageNum: otps.data.page });
      if (otps.pageNum == 0) {}
    }
  },


  /**
   * 客户
   * 
   */

  // 获取客户
  getCustomer: function(){
    const _that = this, _d = _that.data;
    return new Promise(function(resolve, reject){
      A.RS({
        url: '/WeChatAppsCs/listClientDTO/ByStoreId',
        method: 'POST',
        data: { store_id: _d.storeId, page: ++_that.data.pageNum }
      }).then(res => { resolve(res) }, err => { reject(err) });
    });
  },
  
  // 详情
  detail: function (e) {
    let data = e.currentTarget.dataset;
    wx.setStorageSync('cusInfo', this.data.list[data.index]);
    wx.navigateTo({ url: 'customer/cusDetail' })
  },


  /**
   * 微信粉丝
   * 
   */
  // 获取微信粉丝
  getFans: function(){
    const _that = this, _d = _that.data;
    return new Promise(function (resolve, reject) {
      A.RS({
        url: '/WeChatAppsCs/listFans',
        method: 'POST',
        data: { storeId: _d.storeId, page: ++_d.pageNum }
      }).then(res => { resolve(res) }, err => { reject(err) });
    });
  },

  /**
   * 提示
   * 
   */
  // 不同状态提示
  showTipStatus: function (opts) {

    this.setData({ 'tip.status': opts.status });
    this.selectComponent("#diyMoadel").showDialog();
    if(opts.status == 0){
      this.setData({ 'tip.content': opts.info || '数据获取失败！' });
    } else if (opts.status == 233) {
      this.setData({ 'tip.content': opts.info || '请绑定商家！' });
    } else if (opts.status == 333) {
      this.setData({ 'tip.content': opts.info || '您的商家身份已被禁用!' });
    } else if (opts.status == 600) {
      this.setData({ 'tip.content': opts.info || '登录过期，请重新登录!' });
    } else {
      this.setData({ 'tip.content': opts.info || '数据获取失败！' });
    }
  },
  // 调用接口错误结果提示
  showTipErr: function (opts) {
    this.setData({ 'tip.content': '数据获取失败！' });
    this.selectComponent("#diyMoadel").showDialog();
  },
  // 关闭提示
  closeTip: function(){
    const _d = this.data.tip;
    if (_d.status == 233 || _d.status == 333){ 
      wx.reLaunch({ url: '/pages/login/login?upidentity=2' })
    }else{
      this.selectComponent("#diyMoadel").hideDialog();
    }
  }
}))
