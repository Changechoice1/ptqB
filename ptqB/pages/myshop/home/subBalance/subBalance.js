// pages/myshop/blance/blance.js
var http = require('../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: http.imgUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var unionid = wx.getStorageSync('thisCode');
    var type = options.type || 0;
    this.setData({ identType: type, })

  },
  balanceInfoFn() {
    var unionid = wx.getStorageSync('thisCode');
    http._post1('StoreStaff/index', { unionid: unionid }, res => {
      let data = res.data
      if (data.status == 1) {
        this.setData({
          balanceData: data.info
        })
      } else {
        http.showModal(data.info, false, function () {
          wx.navigateBack({
            delta: 1
          })
        })
      }
    }, res => { })
  },
  onShow: function () {
    this.balanceInfoFn()
  },
  // 点击前往充值页面
  rechargeNav() {
    wx.navigateTo({
      url: '/pages/myshop/home/subBalance/recharge/recharge',
    })
  },
  // 点击前往提现页面
  withdrawNav() {
    wx.navigateTo({
      url: '/pages/myshop/home/subBalance/withdraw/withdraw',
    })
  },
  // 前往余额明细
  detailBtn: function (e) {
    wx.navigateTo({
      url: '/pages/myshop/home/subBalance/turnoverList/turnoverList?type=' + this.data.identType + '&selectType=1'
    })
  },
})