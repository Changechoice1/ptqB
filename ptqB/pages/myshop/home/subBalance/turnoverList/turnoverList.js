var http = require('../../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
var util = require('../../../../../utils/util.js');

const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    dmListH: 500,
    imgUrl: http.imgUrl,
    noList: false,
    nullData: {
      img: http.imgUrl + 'n3_ico3.png',
      txt: '暂无资金明细',
      imgUrl: http.imgUrl,
    },
    isLastPage: false,
    pageNum: 1,
    pageCount: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let url = 'StoreStaff/wallet_list';
    var nowPhoneHAll = Number(util.nowPhoneWH()[1])
    var nowPhoneH = nowPhoneHAll;
    
    that.setData({
      dmListH: nowPhoneH,
      footH: nowPhoneHAll - nowPhoneH,
      url: url,
    })
    this.getTurnoverList(1);
  },
  onReachBottom: function(){
    if (!this.data.isLastPage){
      this.getTurnoverList(++this.data.pageNum);
    }
  },
  // 获取余额明细列表数据
  getTurnoverList: function(pageNum){
    this.setData({ isLoading: true });
    let date = A.dateFormat(new Date(), 'YYYY-MM');
    A.RS({
      url: '/WeChatAppsCs/StoreStaff/wallet_list',
      data: {
        paging: pageNum,
        time: date
      }
    }).then(res => {
      if(res.status == A.STATE.STATUS.OK){
        if (res.pageSize == 0){
          this.setData({ noList: true });
          return;
        }
        if(res.pageNum >= res.pageSize){
          this.setData({ isLastPage: true })
        }
        let list = [], newList = [];
        if(res.pageNum == 1){
          newList = res.list;
        }else{
          list = this.data.list || [];
          newList = list.concat(res.list);
        }
        this.setData({
          pageNum: res.pageNum,
          pageCount: res.pageSize,
          list: newList,
          isLoading: false
        });
      }else{
        http.showModal(data.info || '数据获取失败', false, function () { })
        this.setData({ isLoading: false });
      }
    }, err => {
      this.setData({ isLoading: false });
    });
  }
}))