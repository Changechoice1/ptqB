// packageMarketing/industryCustom/index.js
var http = require('../../../utils/http.js');

var unionid = wx.getStorageSync('thisCode');
var hot =0;//1为行业定制  0为行业热门
var month;//为0时month可不传
var categoryPid;
var categoryId;
const A = getApp();
Page(A.assignPage({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      name: '多人拼团',
      type: 3,
    }, {
      name: '限时专享',
      type: 4
    }, {
      name: '拼团商城',
      type: 1
    }],
    // , {
    //   name: '砍价',
    //   type: 6
    // }
    tab: 3,
    nullFlag:0,
    nullData:{
      nullImg: '/images/nullMA.png',
      noActiviti:'暂无营销方案'
  },
    pageNum:1,
    pageSize:0,
    pages:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var category_name = options.category_name;
    that.setData({
      category_name: category_name
    })
    var pageNum = 1;
    that.marketingList(month, categoryPid, categoryId, hot, pageNum, that.data.tab);//行业定制列表
  },
  // 切换tab
  changeTab: function(e){
    let tab = e.currentTarget.dataset.type;
    this.setData({ tab: tab });
    this.marketingList(month, categoryPid, categoryId, hot, 1, tab);
  },
  //行业定制列表
  marketingList(month, categoryPid, categoryId, hot, pageNum, tab){
    let that = this;
    pageNum = pageNum || 1;
    A.updata.marketingList(month, categoryPid, categoryId, hot, pageNum, tab).then(res=>{
      let data = res.data;
      if (res.status == 1) {
        that.setData({
          industryInfo: data,
          pageNum: res.pageNum,
          pageSize: res.pageSize,
          pages: res.pages
        })
      } else {
        A.showTipModal(res.info || '请求数据失败')
      }
    },err=>{
      A.showTipModal(err.info || '请求接口失败')
    })
  },
  // 跳转模板详情
  goTDetail: function (e) {
    let data = e.currentTarget.dataset.item;
    let typeStr = data.is_group == 1 ? 'ptljTDetail/ptljTDetail' : data.is_group == 3 ? 'drptTDetail/drptTDetail' : data.is_group == 4 ? 'xszxTDetail/xszxTDetail' : data.is_group == 6 ? 'kjTDetail/kjTDetail' : '';
    A.G('../actTDetail/' + typeStr + '?goods_id=' + data.goods_id + '&num=' + data.user_count + '&tag=' + data.tag_industry_id + '&applyNum=' + data.same_kind_count);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var pageNum = that.data.pageNum;
    var pages = that.data.pages;
    var industryInfo = that.data.industryInfo;
    if(pages && pages <= pageNum){
      return
    }
    pageNum++;
    A.updata.marketingList(month, categoryPid, categoryId, hot, pageNum, that.data.tab).then(res=>{
      if(res.status == 1){
        for(let i in res.data){
          industryInfo.push(res.data[i]);
        }
        that.setData({
          industryInfo: industryInfo,
          pageNum: res.pageNum,
          pageSize: res.pageSize,
          pages: res.pages
        })
        } else {
        A.showTipModal(res.info || '请求数据失败')
        }
      }, err => {
        A.showTipModal(res.info || '请求接口失败')
      })
  },
}))