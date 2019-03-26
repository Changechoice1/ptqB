const A = getApp();
Page(A.assignPage({
  data: {
    tab: 0, // tab的index值
    info: {}, // 金额信息

    noList: false,
    noListData: {
      img: '/images/ex-fans-no.png',
      txt: '暂无奖励信息'
    },
    list: [{
      logo: 'https://ptq.oss-cn-hangzhou.aliyuncs.com/Uploads/Picture/goodsimg/20180802/1533190914561528.jpg',
      title: '"流川枫"为发起者刮出现金红包',
      datetime: '2018-09-13 09：10：23',
      amount: '3.00',
      status: 0, // 0-未使用，1-已使用
    }, {
      logo: 'https://ptq.oss-cn-hangzhou.aliyuncs.com/Uploads/Picture/goodsimg/20180829/1535515609534789.jpg',
      title: '"晴子"为发起者刮出现金红包',
      datetime: '2018-09-13 12：10：13',
      amount: '2.00',
      status: 1, // 0-未使用，1-已使用
    }, {
        logo: 'https://ptq.oss-cn-hangzhou.aliyuncs.com/Uploads/Picture/goodsimg/20180829/1535515609534789.jpg',
      title: '"樱木花道"为发起者刮出现金红包',
      datetime: '2018-09-14 19：32：23',
      amount: '5.00',
      status: 1, // 0-未使用，1-已使用
    }]
  },

  onLoad: function (options) {
    this.setData({ id: options.id });
    this.getInfo();
  },
  onShow: function () { },
  onReachBottom: function () { },
  // 切换tab
  switchTab: function(e){
    this.setData({ 
      tab: e.currentTarget.dataset.tab,
      noList: false,
      list: []
    })
    this.getInfo();
  },
  // 获取刮奖明细
  getInfo: function(){
    const _that = this, _d = _that.data;
    let type = Number(_d.tab) + 1;
    wx.showLoading({ title: '加载中' })
    A.updata.getGjmdAmountRecord(_d.id, type).then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        if(res.list.length == 0){
          _that.setData({ noList: true });
        }else{
          _that.setData({ noList: false });
        }
        let info = Object.assign({}, res.summaryShow);
        info.cash_back = (parseFloat(res.couponCount[0]) + parseFloat(res.couponCount[1])).toFixed(2);
        info.ticket_back = res.summaryShow.scraped;
        _that.setData({
          info: info,
          list: res.list
        });
      } else {
        A.showTipModal(res.info || '数据获取失败')
      }
    }, err => {})
  }
}))