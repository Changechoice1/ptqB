const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    is_group: 1,
    ossImgUrl: A.config.ossImgUrl,
    imgUrl: A.config.imgUrl,
    groupPlay: [{
      img: 'goods3_ico2.png',
      name: '开团或参团'
    }, {
      img: 'goods3_ico3.png',
      name: '付款即使用'
    }, {
      img: 'goods3_ico4.png',
      name: '邀请好友参团'
    }, {
      img: 'goods3_ico5.png',
      name: '享受返现'
    }],
    store_info: {
      store_logo: 'https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/wxxcx/logo.png',
      store_name: '拼团趣',
      store_address: '杭州市萧山区平澜路国金中心',
      customer_fans: 999,
      order_num: 999,
      goods_num: 999,
      is_authentication: 1,
      authentication_type: 2,
      start_time: '10时00分',
      end_time: '21时00分'
    },
    model_id: 0,
    goods_info: {},
    group_info: {},
    pay_info: {},
    user_info: {},
    type: 0,
    is_remind: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodsId: options.goods_id || 0,
      tagId: options.tag || 0,
      applyNum: options.applyNum || 0
    });
    // 获取模板详情
    this.getInfo(options.goods_id || 0).then(res => {
      // 入口：品牌中心
      if (options.entry == 1) {
        // 获取店铺信息
        this.getStoreInfo();
      }
    }, err => { });
  },
  // 获取模板详情
  getInfo: function (goods_id){
    const _that = this, _d = _that.data;
    wx.showLoading({ title: '加载中...' })
    return new Promise((resolve, reject) => {
      A.updata.getActDetail(goods_id, 1).then(res => {
        wx.hideLoading();
        if (res.status == A.STATE.STATUS.OK) {
          res.goods_info.goods_detail = A.StrFunc.FormatToH5(res.goods_info.goods_detail);
          this.setData({
            model_id: res.model_id,
            goods_info: res.goods_info,
            group_info: res.group_info,
            pay_info: res.pay_info,
            user_info: res.user_info,
            type: res.type,
            is_remind: res.is_remind
          })
          resolve()
        } else {
          A.showTipModal(res.info || '获取数据失败', _that.goBack)
        }
      }, err => { })
    })
  },
  // 获取店铺信息
  getStoreInfo: function(){
    A.updata.getActStoreInfo(this.data.model_id).then(res => {
      this.setData({
        'store_info.store_logo': res.brand_logo,
        'store_info.store_name': res.brand,
        'store_info.store_address': res.address
      })
    }, err =>{})
  },
  // 复制添加
  copyAdd: function (e) {
    A.G('/pages/myshop/home/marketingPromotion/publishAct/publishAct?editType=1&actType=1&id=' + this.data.model_id + '&tag=' + this.data.tagId)
  },
  // 个人中心
  goPersonalCenter: function () {
    A.updata.getStoreInfo().then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        A.G('switchTab:///pages/myshop/home/index');
      } else {
        http.showModal(res.info, false, () => { })
      }
    }, err => { })
  }
}))