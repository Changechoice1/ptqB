//index.js
//获取应用实例
let interval
const A = getApp();
Page(A.assignPage({
  data: {
    type: 0,//0生成订单页有数量加减 1没有
    animation: {},
    imgUrl: A.config.imgUrl,
    tabs: ['商品详情', '宝贝评价'],
    activeIndex: 0,
    is_remind: 0,
    goods_info: {},
    user_info: {},
    store_info: {},
    evaluate_list: [],
    goods_id: 0,
    is_group: 6,

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
    }
  },
  onLoad: function(options) {
    const _that = this;
    if (options.goods_id) {
      this.setData({
        goods_id: options.goods_id
      })
    } else {
      A.showTipModal('缺少活动id', _that.goBack)
      return;
    }

    // 获取模板详情
    _that.getInfo(options.goods_id || 0).then(res => {
      // 入口：品牌中心
      if (options.entry == 1) {
        // 获取店铺信息
        _that.getStoreInfo();
      }
    }, err => { });
  },
  // 获取模板详情
  getInfo: function (goods_id) {
    const _that = this, _d = _that.data;
    wx.showLoading({ title: "加载中..." });
    return new Promise((resolve, reject) => {
      A.updata.getActDetail(goods_id, 6).then(res => {
        wx.hideLoading();
        if (res.status == A.STATE.STATUS.OK) {
          if (res.group_info.group_two_info) {
            for (let i = 0; i < res.group_info.group_two_info.length; i++) {
              res.group_info.group_two_info[i]['time'] = A.rtime(res.group_info.group_two_info[i]['last_time'] - 1);
            }
            this.setData({
              plist: res.group_info.group_two_info
            })
          }
          res.goods_info.goods_detail = A.StrFunc.FormatToH5(res.goods_info.goods_detail);
          this.setData({
            model_id: res.model_id,
            goods_info: res.goods_info,
            group_info: res.group_info,
            user_info: res.user_info,
            type: res.type
          })
          resolve();
        } else {
          A.showTipModal(res.info || '数据获取失败', _that.goBack);
        }
      }, err => { })
    })
  },
  // 获取店铺信息
  getStoreInfo: function () {
    A.updata.getActStoreInfo(this.data.model_id).then(res => {
      this.setData({
        'store_info.store_logo': res.brand_logo,
        'store_info.store_name': res.brand,
        'store_info.store_address': res.address
      })
    }, err => { })
  },
  // 复制添加
  copyAdd: function (e) {
    A.G('/pages/myshop/home/marketingPromotion/publishAct/publishAct?editType=1&actType=3&id=' + this.data.model_id + '&tag=' + this.data.tagId)
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
}));