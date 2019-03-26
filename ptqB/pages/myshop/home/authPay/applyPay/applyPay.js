// pages/myshop/applyPay/applyPay.js
var http = require('../../../../../utils/http.js');
var util = require('../../../../../utils/util.js');
const A = getApp();
Page(A.assignPage({
  data: {
    imgUrl: http.imgUrl,
    payments: [
      { icon: '/images/payType0.png', disIcon: '/images/payType0Dis.png', iconW: '44', iconH: '44', text: '', tip: '' },
      { icon: '/images/payType2.png', disIcon: '/images/payType2Dis.png', iconW: '50', iconH: '45', text: '微信支付', tip: '' }
    ],
    ver: 0,
    payInfo: {
      1: {
        ver: '基础体验版',
        desc: '基础体验版：600元/年，其中包括认证费300元，在交易产生时，抽取部分佣金，详见拼团趣《商家使用协议》'
      },
      2: {
        ver: '基础正式版',
        desc: '基础正式版：3000元/年，其中包括认证费300元，详见拼团趣《商家使用协议》'
      }
    },
    selectedPayment: 0,
    isAgree: true,
    canClick: true
  },
  onLoad(opts) {
    let m = 0, v = opts.v;
    if (opts.type == 1) {
      if (opts.v == 1) {
        m = 600;
      } else if (opts.v == 2) {
        m = 3000;
      }
    } else if (opts.type == 2) {
      if (opts.v == 1) {
        m = 600;
      } else if (opts.v == 2) {
        m = 3000;
      }
    } else if (opts.type == 3) {
      m = 2400;
      v = 2;
    } else if (opts.type == 4) {
      m = 3000;
      v = 2;
    } else if(opts.type == 5){
      m = 3000;
      v = 2;
    }
    let ac = wx.getStorageSync('storeInfo');
    let payTxt = '';
    let payTipTxt = '';
    let selectedPayment = 1; // 开发二维码：1，；授权码-未占用：0， 授权码-已占用：1
    let showAuthCode = false;
    if (ac.authCode && ac.is_expire == 0 && ac.isAuthCodeOcuppiedM != 0 || !ac.authCode) {
      selectedPayment = 1;
      showAuthCode = false;
    } else{
      if (ac.isAuthCodeOcuppied != 0) {
        payTxt = '该授权码已被他人占用';
        payTipTxt = '请扫一扫其他授权码，或选择线上支付';
        selectedPayment = 1
      } else {
        payTxt = '使用授权码' + ac.authCode;
        payTipTxt = '授权码支付需代理商审核，请确保代理商授权资质';
        selectedPayment = 0
      }
      showAuthCode = true;
    }
    this.setData({
      ver: v,
      money: m,
      authCodeInfo: ac,
      'payments[0].text': payTxt,
      'payments[0].tip': payTipTxt,
      selectedPayment: selectedPayment,
      showAuthCode: showAuthCode
    });
  },
  onShow(opts) {},
  // 点击协议
  selectAgree: function () {
    const _that = this, _d = _that.data;
    _that.setData({ isAgree: !_d.isAgree });
  },
  // 立即支付
  applyPay: function () {
    const _that = this, _d = _that.data;
    if (_d.selectedPayment == 0) {
      _that.authCodePay();
    } else if (_d.selectedPayment == 1) {
      _that.wechatPay();
    }
  },
  // 授权码支付
  authCodePay: function () {
    const _that = this, _d = _that.data;
    if (_d.canClick) {
      _that.setData({ canClick: false });
      A.RS({
        url: '/WeChatAppsCs/StoreNewAuthentication/new_auth_pay_do',
        method: 'POST',
        data: {
          version: _d.ver,
          numbering: _d.authCodeInfo.authCode
        }
      }).then(res => {
        if (res.status == A.STATE.STATUS.OK) {
          wx.redirectTo({ url: '../payResult/payResult' });
        } else if (res.status == 0) {
          wx.showModal({
            title: '提示',
            content: res.info || '数据获取失败',
            showCancel: false,
            success: function(){
              _that.setData({ canClick: true });
              this.onShow();
            }
          })
        } else if (res.status == 2) {
          wx.showModal({
            title: '提示',
            content: res.info || '该授权码已被他人占用，请扫一扫其他授权码，或进行线上支付',
            showCancel: false,
            success: function(res){
              A.G('reLaunch:///pages/myshop/home/index');
            }
          })
        }
      }, err => {
        _that.setData({ canClick: true });
        wx.showModal({
          title: '提示',
          content: '数据获取失败',
          showCancel: false
        })
      });
    }
  },
  // 微信支付
  wechatPay: function () {
    const _that = this, _d = _that.data;
    if (_d.canClick) {
      _that.setData({ canClick: false });
      A.RS({
        url: '/WeChatAppsCs/StoreNewAuthentication/new_auth_pay_do',
        method: 'POST',
        data: { version: _d.ver }
      }).then(res => {
        if (res.status == A.STATE.STATUS.OK) {
          let data = res.jsApiParameters;
          A.P({
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            'success': function (res) {
              wx.redirectTo({ url: '../payResult/payResult' })
            },
            'fail': function (res) { },
            'complete': function (res) {
              _that.setData({ canClick: true });
            }
          });
        } else if (res.status == 0) {
          wx.showModal({
            title: '提示',
            content: res.info,
            showCancel: false,
            success: _that.callPayRes
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.info,
            showCancel: false,
            success: _that.callPayFail
          })
        }
      }, err => {
        _that.setData({ canClick: true });
        wx.showModal({
          title: '提示',
          content: '数据获取失败',
          showCancel: false
        })
      });
    }
  },
  // 未到期，不需支付
  callPayRes() {
    this.setData({ canClick: true });
    this.hideDiyModal();
    wx.reLaunch({ url: '/pages/myshop/home/index' });
  },
  // 其他唤起支付结果
  callPayFail(){
    this.setData({ canClick: true });
    this.hideDiyModal();
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
      tipTextAlign: opts.tipTextAlign || 'left',
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
    this.data.tipEle.hideDialog();
  },
  // 按钮绑定方法
  btnFn: function (e) {
    this[e.detail]();
  },
  // 不同状态提示
  showTipStatus: function (opts) {
    this.setData({ tipStatus: opts.status });
    if (opts.status == 0) {
      this.showDiyModal({ tipTextAlign: 'center', tipText: '数据获取失败！' });
    } else if (opts.status == 233) {
      this.showDiyModal({ tipTextAlign: 'center', tipText: '请绑定商家！' });
    } else if (opts.status == 333) {
      this.showDiyModal({ tipTextAlign: 'center', tipText: '您的商家身份已被禁用!' });
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
  },
}));