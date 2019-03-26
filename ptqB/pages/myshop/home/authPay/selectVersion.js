// pages/myshop/authPay/selectVersion.js
var http = require('../../../../utils/http.js');
var util = require('../../../../utils/util.js');

const A = getApp();
Page(A.assignPage({
  data: {
    imgUrl: http.imgUrl,
    type: 2,// 1: 正常支付，2：未认证老用户支付，3：体验版升级正式版
    selectedVer: 0,
    payInfo: [{
      verNo: 2,
      version: '基础正式版',
      money: 3000,
      comm: '交易不收取佣金',
      desc: '只由腾讯平台收取每笔订单总额的 0.6% 手续费（此费用为腾讯公司收取）。3000元中包含300元认证费，拼团趣平台不收取任何费用。',
      active: true
    },{ 
      verNo: 1,
      version: '基础体验版',
      money: 600,
      comm: '交易收6%佣金', 
      desc: '多人拼团、限时专享功能、拼团立减营销活动，收取6%的服务费，收取标准为(拼团销售总额 —— 首单售货金额)×6%，如只有一个人成团，则首单总额由腾讯平台收取 0.6% 手续费(此费用为腾讯公司收取)。600元中包含300元得认证费。',
      active: true
    }],
    tipInfo: {
      3: '基础体验版升级为基础正式版只需补 2400 元差价即可。有效期为 1 年，以补差价的时间开始计算。'
    },
    selectedPayment: 0,
    isAgree: true
  },
  onLoad(opts) {
    const _that = this, _d = _that.data;
    if(opts.type == 2){
      _that.setData({ 'payInfo[1].active': false })
    }else if (opts.type == 3) {
      wx.setNavigationBarTitle({ title: '升级正式版' })
    }
    _that.setData({ 
      type: opts.type,
      selectedVer: opts.v && opts.v == 1 ? 1 : 0
    });
    _that.setPayNum();
  },
  // 选择版本
  selectVersion: function(e){
    this.setData({ selectedVer: e.currentTarget.dataset.index});
    this.setPayNum();
  },
  // 设置支付金额
  setPayNum: function(){
    const _that = this, _d = _that.data;
    if(_d.type == 1){
      _that.setData({ payNum: _d.payInfo[_d.selectedVer].money })
    } else if (_d.type == 2){
      _that.setData({ payNum: _d.payInfo[_d.selectedVer].money })
    } else if (_d.type == 3){
      _that.setData({ payNum: _d.payInfo[_d.selectedVer].money - _d.payInfo[1].money })
    }else if (_d.type == 4){
      _that.setData({ payNum: _d.payInfo[_d.selectedVer].money })
    }else if (_d.type == 5) {
      _that.setData({ payNum: _d.payInfo[_d.selectedVer].money })
    }
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
