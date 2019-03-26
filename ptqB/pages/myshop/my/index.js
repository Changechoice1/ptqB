// pages/myshop/my/index.js
var http = require('../../../utils/http.js');
var data = require('../../../config/data.js');

const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    menu: data.my_menu,
    showVideo: false,
    info: {
      is_account: 0,
      authType: '',
      identity: '商家'
    }
  },
  onLoad: function (options) { 
     // 关闭分享功能
     wx.hideShareMenu();
  },
  onShow: function () {
    // 操作权限
    let _setAuth = A.setAuth();
    this.setData({
      noAuth: {
        img: '/images/noAuth.png',
        txt: '暂无权限操作'
      },
      showContainer: _setAuth
    });
    // 视频组件
    this.videoContext = wx.createVideoContext('video');
    // 获取认证状态、是否是子账号
    let storeInfo = wx.getStorageSync('storeInfo');
    this.setData({ 
      'info.authType': storeInfo.authType == 1 ? '个人认证' : storeInfo.authType == 2 ? '店铺认证' : '',
      'info.is_account': storeInfo.isAccount
    });
    // 获取首页信息
    this.getInfo();
  },
  onHide: function(){
    this.setData({
      showVideo: false,
      info1: {}
    });
  },
  // 获取信息
  getInfo: function(){
    A.RS({
      url: '/WeChatAppsCs/StoreVideo/index'
    }).then(res => {
      if(res.status == A.STATE.STATUS.OK){
        this.setData({ info1: res.result });
      }
    }, err => {})
  },
  // 播放视频
  playVideo: function(){
    if (!this.data.showVideo){
      this.videoContext.play();
      this.setData({ showVideo: true });
    }
  },
  // 店铺设置
  goSetting: function(){
    A.G('/pages/myshop/setting/setting');
  },
  // 认证资质
  goQuaCert: function () {
    A.G('/pages/myshop/my/qualificationCert/index');
  },
  // 常见问题
  goFAQ: function () {
    A.G('/pages/myshop/my/FAQ/FAQ');
  },
  // 消息中心
  goMsgCenter: function () {
    A.G('/pages/myshop/my/msgCenter/msgCenter');
  },
  // PC端管理
  goPCManage: function () {
    A.G('/pages/myshop/my/pcManagement/pcManagement');
  },
  // 退出登录
  gologout: function (e) {
    http.quitBtn(e, 2);
  },
  // 解除绑定
  goUnbind: function (e) {
    http.quitBtn(e, 2, 'StoreAccount/quit_account', '是否确认解除绑定')
  },
  // 切换身份
  goSwitchIden: function () {
    A.G('/pages/myshop/my/switchIdentity/switchIdentity');
  }
}))