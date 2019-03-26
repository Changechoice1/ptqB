// pages/my/my.js
var https = require('../../../utils/http.js').http;
var http = require('../../../utils/http.js');
var util = require('../../../utils/util.js');
var data = require('../../../config/data.js');
var idenTip = require('idenTip.js');
var authInfoJs = require('authInfo.js');
var qrImgCanvas = require('marketingPromotion/publishGjmd/qrImgCanvas.js');

const A = getApp();
Page(A.assignPage({
  data: {
    imgUrl: A.config.imgUrl,
    firstLoad: true,// 是否为第一次加载
    // 菜单
    menu1: data.home_menu1,
    menu2: data.home_menu2,
    menu3: data.home_menu3,
    // 商家数据
    info: {}, 
    gjmdId: 0,

    payQrImgFlag: false, // 是否显示支付二维码图片
    payQrImgInfo: data.payQrImgInfo,

    hasKjAuth: false, // 是否为砍价内测用户
    hasYxshAuth: false, // 是否为营销数据内测用户
  },
  onLoad(options) {
     // 关闭分享功能
     wx.hideShareMenu();
    const _that = this, _d = _that.data;
    _that.setData({
      storeId: wx.getStorageSync('store_id')
    });
    // 第一次加载
    if (_d.firstLoad) {
      _that.initData();
    }
  },
  onShow(options) {
    var _that = this, _d = _that.data;
    // 微信版本
    let nowSDKVersion = wx.getSystemInfoSync().SDKVersion;
    if (http.compareVersion(nowSDKVersion, '1.4.0') == -1) {
      http.showModal('您的微信基础版本库过低，请升级微信或使用原版微信进行体验！', false, () => { })
      return
    }
    idenTip.set(_that);
    wx.showTabBar({})
    // 非第一次加载
    if (!_d.firstLoad) {
      _that.initData();
    }
    _that.setData({ firstLoad: false });

    // 刮奖免单-支付二维码
    let payQrImgInfo = Object.assign({}, data.payQrImgInfo, {
      tipTitle: '活动发布成功，已生成支付二维码',
      tipCont: '该活动仅能发布一次，若修改，请到活动管理中编辑。'
    });
    this.setData({ payQrImgInfo: payQrImgInfo});
  },
  onHide: function(){
    this.hideDiyModal();
    this.setData({
      gjmdId: 0,
      payQrImgFlag: false,
    });
  },
  hideLoading: function(){
    let btn = this.data.btn || this.selectComponent('#save_btn');
    btn.hideLoading();
  },
  ...idenTip,
  // 初始化数据
  initData() {
    const _that = this, _d = _that.data;
    var unionid = A.DB.user.unid;
    if (!unionid) {
      http.loginFn(0, (unionid, res) => {
        _that.getStoreInfo();
        _that.getIsKjAuth();
        _that.getIsYxsjAuth();
      })
    } else {
      _that.getStoreInfo();
      _that.getIsKjAuth();
      _that.getIsYxsjAuth();
    }
  },

  // 砍价内测-获取是否为内测用户
  getIsKjAuth: function () {
    A.updata.getStoreState(1).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        if (!res.data) {
          this.setData({ 
            'menu3[0].subMenu[0][4].img': 'https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/merchant/kj.jpg',
            'menu3[0].subMenu[0][4].active': false,
            'menu3[0].subMenu[0][4].tapEvent': ''
          })
        }
        this.setData({ hasKjAuth: res.data });
        wx.setStorageSync('hasKjAuth', res.data);
      }
    }, err => { });
  },
  // 营销数据内测-获取是否为内测用户
  getIsYxsjAuth: function () {
    A.updata.getStoreState(2).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        if (!res.data) {
          this.setData({
            'menu3[2].subMenu[1][1].iconColor': '#DCDCDC',
            'menu3[2].subMenu[1][1].active': false,
            'menu3[2].subMenu[1][1].tapEvent': ''
          })
        }
        this.setData({ hasYxsjAuth: res.data });
      }
    }, err => { });
  },

  // 获取当前商户的信息
  getStoreInfo() {
    var _that = this, _d = _that.data;
    wx.showLoading({ title: '加载中' })
    A.updata.getStoreInfo().then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        _that.setData({
          authCode: res.numbering || '',
          authInfoData: res.info.auth_info,
          storeId: res.info.store_id,
          info: res.info
        })
        let authType = 0;
        if (res.info.is_authentication == 1){
            authType = res.info.authentication_type;
        }
        wx.setStorageSync('store_id', res.info.store_id);
				wx.setStorageSync('store_logo', res.info.store_logo);

        let storeInfo = Object.assign({
          'authCode': res.numbering || '',
          'isAuthCodeOcuppied': res.authCodeStatus || '',
          'isAuthCodeOcuppiedM': res.authCodeLogStatus || '',
          'isAccount': res.info.is_account,
          'authType': authType,
          'store_id': res.info.store_id,
          'store_name': res.info.store_name,
          'store_logo': res.info.store_logo,
        }, res.info.auth_info);
        wx.setStorageSync('storeInfo', storeInfo);
        // 设置认证信息
        authInfoJs.setAuthInfo(_that);
        // 获取提示信息
        idenTip.setStatusInfo(_that);
        _that.setData({
          authInfo: authInfoJs.authInfo,
          authInfoArr: authInfoJs.authInfoArr,
          tip: idenTip.idenTip,
        });
      } else {
        http.showModal(res.info, false, () => { })
      }
    }, err => { })
  },

  /**
   * 点击事件：跳转页面
   */
  // 认证
  goAuthentication: function(){
    if(!this.data.info.is_account){
      A.G('/pages/myshop/my/qualificationCert/index');
    }
  },
  // 活动
  goActivity: function(){
    A.G('switchTab:///pages/myshop/activity/list');
  },
  // 钱包
  goWallet: function () {
    if(this.data.info.is_account == 1){// 子账号
      A.G('subBalance/subBalance')
    }else {// 转帐号
      A.G('balance/balance')
    }
  },
  // 专享卡
  goExVipCard: function () { 
    A.G('exVipCard/exVipCard')
  },
  // 扫码进店
  goQrcode: function () {
		A.G('qrcode/qrcode')
  },
  // 多人拼团
  goReleaseDrpt: function () {
    A.G('marketingPromotion/publishAct/publishAct?actType=3')
  },
  // 限时专享
  goReleaseXszx: function () {
    A.G('marketingPromotion/publishAct/publishAct?actType=4')
  },
  // 拼团立减
  goReleasePtlj: function () {
    A.G('marketingPromotion/publishAct/publishAct?actType=1')
  },
  // 刮奖免单
  goReleaseGjmd: function(){
    if (this.data.gjmdId) {
      this.showPayQrImg();
    } else {
      this.getGjmdInfo().then(res => {
        if (this.data.gjmdId) {
          // 显示支付二维码图片
          this.showPayQrImg();
        } else {
          wx.hideLoading();
          if (this.data.info.is_account == 0) {
            A.G('marketingPromotion/publishGjmd/publishGjmd')
          } else {
            A.showTipModal(A.DF.MSG.pubGjmd);
          }
        }
      }, err => { });
    }
  },
  // 砍价
  goReleaseKj: function(){
    A.G('marketingPromotion/publishAct/publishAct?actType=6')
  },
  // 运费管理
  goFreight: function () {
    A.G('marketingPromotion/freight/freight')
  },
  // 评价管理
  goEvaluate: function () { 
    A.G('marketingPromotion/evaluate/evaluate')
  },
  // 粉丝管理
  goFans: function () {
    A.G('socialMarketing/fans/list?is_account=' + this.data.info.is_account)
  }, 
  // 商业联盟
  goBusinessUnion: function () { 
    A.G('socialMarketing/businessUnion/businessUnion')
  },
  // 消息群发
  goGroupMsg: function () { 
    A.G('socialMarketing/groupMsg/groupMsg?store_id=' + this.data.storeId) 
  },
  // 全员营销-员工设置
  goStaff: function () {
    A.G('integratingMarketing/staff/staff?is_account=' + this.data.info.is_account);
  },
  // 子账号
  goSubAccount: function () {
    A.G('integratingMarketing/subAccount/subAccount')
  },
  //营销助手
  goMaAssistant:function(){
    A.G('/packageMarketing/marketingAssistant/index')
  },
	//营销数据
	goMaData:function(){
		A.G('/packageMarketing/marketingData/index?storeId='+this.data.storeId)
	},
  // 品牌中心
  goBrandCenter: function(){
     A.G('/packageMarketing/brandCenter/brandInfo/index')
  },
  /**
   * 功能方法
   */
  // 获取刮奖免单活动信息
  getGjmdInfo: function(){
    const _that = this, _d = _that.data;
    return new Promise((resolve, reject) => {
      wx.showLoading({ title: '加载中' })
      A.updata.getActList('', 5, 2, 1).then(res => {
        wx.hideLoading();
        try{
          if (res.status == A.STATE.STATUS.OK) {
            if (res.list[0]) {
              this.setData({
                gjmdId: res.list[0].goods_id,
                'payQrImgInfo.logo': wx.getStorageSync('storeInfo').store_logo,
                'payQrImgInfo.name': wx.getStorageSync('storeInfo').store_name,
                'payQrImgInfo.qrImg': res.list[0].pay_code
              });
              qrImgCanvas.downloadImg(this.data.payQrImgInfo).then(res => {
                let payQrImgInfo = res;
                this.setData({
                  payQrImgInfo: payQrImgInfo
                });
                resolve();
              }, err => { });
            } else {
              wx.hideLoading();
              this.setData({ gjmdId: 0 });
              resolve();
            }
          }else{
            wx.hideLoading();
          }
        }catch(e){
          wx.hideLoading();
        }
      }, err => {
        wx.hideLoading();
        reject();
      })
    })
  },
  // 显示支付二维码图片
  showPayQrImg: function(){
    this.setData({ payQrImgFlag: true });
    wx.hideTabBar();
  },
  // 隐藏支付二维码图片
  hidePayQrImg: function () {
    this.setData({ payQrImgFlag: false });
    wx.showTabBar()
  },
  // 保存支付二维码图片
  savePayQrImg: function(){
    this.setData({ btn: this.selectComponent('#save_btn') });
    // 绘制canvas
    qrImgCanvas.drawCanvas(this.data.payQrImgInfo).then(() => {
      qrImgCanvas.savePayQrImg(this);
    });
  },

  /**
     * 提示
     */
  // 显示提示框
  showDiyModal: function (opts) {
    const _that = this, _d = _that.data;
    _that.setData({
      tipEle: opts.tipEle || _that.selectComponent("#diyModal"),
      tipShowTitle: opts.tipShowTitle || true,
      tipTitle: opts.tipTitle || '提示',
      tipTextAlign: opts.tipTextAlign || 'center',
      tipShowType: opts.tipShowType || 1,
      tipText: opts.tipText || '',
      tipImpCont: opts.tipImpCont || '',
      tipHideCancel: opts.tipHideCancel || true,
      tipSuccess: opts.tipSuccess || 'hideDiyModal',
      tipConfirmText: opts.tipConfirmText || '确定',
      tipFail: opts.tipFail || 'hideDiyModal',
      tipCancelText: opts.tipCancelText || '取消',
      tipBtnArr: opts.tipBtnArr || []
    });
    _d.tipEle.showDialog();
  },
  // 隐藏提示框
  hideDiyModal: function () {
    let modal = this.data.tipEle || this.selectComponent("#diyModal")
    modal.hideDialog();
  },
  // 按钮绑定方法
  btnFn: function (e) {
    this[e.detail]();
  },
  // 不同状态提示
  showTipStatus: function (opts) {
    this.setData({ tipStatus: opts.status });
    if (opts.status == 0) {
      this.showDiyModal({ tipTextAlign: 'center', tipText: opts.info || '数据获取失败！' });
    } else if (opts.status == 233) {
      this.showDiyModal({ tipTextAlign: 'center', tipText: opts.info || '请绑定商家！' });
    } else if (opts.status == 333) {
      this.showDiyModal({ tipTextAlign: 'center', tipText: opts.info || '您的商家身份已被禁用!' });
    } else if (opts.status == 600) {
      this.showDiyModal({ tipTextAlign: 'center', tipText: opts.info || '登录过期，请重新登录!' });
    } else {
      this.showDiyModal({ tipTextAlign: 'center', tipText: opts.info || '数据获取失败！' });
    }
  },

  // 调用接口错误结果提示
  showTipErr: function (opts) {
    this.showDiyModal({ tipTextAlign: 'center', tipText: '数据获取失败！' });
  },

  // 关闭提示
  closeTip: function () {
    let s = this.data.tipStatus;
    if (s == 0 || s == 1) {
      this.data.tipEle.hideDialog();
    } else if (s == 233 || s == 333) {
      wx.reLaunch({ url: '/pages/login/login?upidentity=2' })
    }
  }
}));