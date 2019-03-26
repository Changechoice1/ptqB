const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: A.config.imgUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opts) {
    this.setData({ id: opts.id || 0});
    this.getTurnoverDetail();
  },
  // 获取余额明细详情
  getTurnoverDetail: function () {
    const _that = this, _d = _that.data;
    wx.showLoading({ title: '加载中' })
    A.updata.getTurnoverDetail(_d.id).then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        let payment = '余额支付';
        if ([1, 3, 6, 7, 23].indexOf(res.way) != -1){
          if (res.pay_channel == 1){
            payment = '余额支付';
          } else if (res.pay_channel == 2) {
            payment = '微信支付';
          } else if (res.pay_channel == 3) {
            payment = '支付宝支付';
          }
        }
        _that.setData({ info: res, payment: payment });
      } else {
        A.showTipModal(res.info, _that.goBack);
      }
    }, err => { });
  },
  // 到订单详情
  toOrder(e) {
    var id = e.currentTarget.dataset.id;
    A.G('/pages/myshop/order/orderInfo/orderInfo?id=' + id);
  },
}))