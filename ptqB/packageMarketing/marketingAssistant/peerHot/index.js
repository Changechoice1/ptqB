// packageMarketing/peerHot/index.js
var touchDot = 0;//触摸时的原点
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = "";// 记录/清理时间记录
var http = require('../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
var categoryPid;
var categoryId;
var hot = 1;//为1时查行业热门
const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    monthActivi:['7月活动','8月活动','9月活动'],
    index:0, //月份tab选择
    nullFlag:0,//页面是否为空标志 1空 0不空
    nullData: {
      nullImg: '/images/nullMA.png',
      noActiviti: '本月暂无营销活动'
    },
    slide: true  //月份手势滑动标志
  },
  //tab点击
  choiceMonth:function(e){
    var index= e.currentTarget.dataset.index;
    var month = e.currentTarget.dataset.month;
    var that = this;
    that.setData({
      index:index,
      currentMonth:month
    })
    that.marketingList(month, categoryPid, categoryId,hot,1);
  },
  // 触摸开始事件
  touchStart: function (e) {
    var that = this;
    that.setData({ slide: true });
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
    console.log(touchDot)
    // 使用js计时器记录时间  
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸移动事件
  touchMove: function (e) {
    var that = this, _d = that.data;
    var touchMove = e.touches[0].pageX;
    console.log(touchMove)
    var index= that.data.index;
    // 向左滑动  
    if (touchMove - touchDot <= -100 && time < 100) {
      if (index != 2) {
        if (that.data.slide){
          that.setData({ slide: false });
          that.setData({
            index: index + 1,
            currentMonth: _d.currentMonth > 11 ? (_d.currentMonth + 1) % 12 : _d.currentMonth + 1
          })
          that.marketingList(that.data.currentMonth, categoryPid, categoryId, hot,1);
          return;
        }
      }else{
        if (that.data.slide) {
          that.setData({ slide: false });
          that.setData({
            index: 0,
            currentMonth:that.data.month
          })
          that.marketingList(that.data.currentMonth, categoryPid, categoryId, hot,1);
          return;
        }
      }
      
    }
    // 向右滑动
    if (touchMove - touchDot >= 100 && time < 100) {
      if (index != 0) {
        if (that.data.slide) {
          that.setData({ slide: false });
          that.setData({
            index: index - 1,
            currentMonth: _d.currentMonth < 2 ? (_d.currentMonth + 11) % 12 : _d.currentMonth - 1
          })
          that.marketingList(that.data.currentMonth, categoryPid, categoryId, hot,1);
          return;
        }
      }else{
        if (that.data.slide) {
          that.setData({ slide: false });
          that.setData({
            index: 2,
            currentMonth: _d.currentMonth > 10 ? (_d.currentMonth + 2) % 12 : _d.currentMonth + 2
          })
          that.marketingList(that.data.currentMonth, categoryPid, categoryId, hot,1);
          return;
        }
      }
    }
  },
  // 触摸结束事件
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval
    time = 0;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  //获取当前月份和后两个月
  var month = new Date().getMonth();
  that.setData({
    month: month > 11 ? (month + 1) % 12 : month + 1,
    nextMonth: month > 10 ? (month + 2) % 12 : month + 2,
    nextMonth2: month > 9 ? (month + 3) % 12 : month + 3,
    currentMonth:month+1, //当前滑动所在月份
    category_pname: options.category_pname
  })
    that.marketingList(this.data.currentMonth, categoryPid, categoryId, hot, 1);
  },
  marketingList(month, categoryPid, categoryId, hot, pageNum){
    pageNum = pageNum || 1;
    wx.showLoading({
      title: '加载中...',
    })
    A.updata.marketingList(month, categoryPid, categoryId, hot,pageNum).then(res=>{
      wx.hideLoading();
      var data = res.data;
      if(res.status == 1){
        this.setData({
          hotList:data,
          pageNum: res.pageNum,
          pageSize: res.pageSize,
          pages: res.pages
        })
        } else {
        A.showTipModal(res.info || '请求数据失败')
        }
      }, err => {
        A.showTipModal(err.info || '请求接口失败')
      })
  },
  // 跳转模板详情
  goTDetail: function(e){
    let data = e.currentTarget.dataset.item;
    let typeStr = data.is_group == 1 ? 'ptljTDetail/ptljTDetail' : data.is_group == 3 ? 'drptTDetail/drptTDetail' : data.is_group == 4 ? 'xszxTDetail/xszxTDetail' : data.is_group == 6 ? 'kjTDetail/kjTDetail' : '';
    A.G('../actTDetail/' + typeStr + '?goods_id=' + data.goods_id + '&num=' + data.user_count + '&tag=' + data.tag_industry_id + '&applyNum=' + data.same_kind_count);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var pageNum = that.data.pageNum;
    var pages = that.data.pages;
    var hotList = that.data.hotList;
    var month = that.data.currentMonth;
    if (pages && pages <= pageNum) {
      return;
    }
    pageNum++;
    A.updata.marketingList(month, categoryPid, categoryId, hot,pageNum).then(res => {
      if (res.status == 1) {
        for (let i in res.data) {
          hotList.push(res.data[i]);
        }
        that.setData({
          hotList: hotList,
          pageNum: res.pageNum,
          pageSize: res.pageSize,
          pages: res.pages
        })
      } else {
        A.showTipModal(res.info || '请求数据失败')
      }
    }, err => {
      A.showTipModal(err.info || '请求接口失败')
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
}))