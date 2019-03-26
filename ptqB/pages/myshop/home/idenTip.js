import A from '../../../vwx/uset.js'
import http from '../../../utils/http.js'
let _that = null;

module.exports = {
  set: (that) => { _that = that },
  agentTel: '',
  idenData: {},
  /**
   * 情况对应数组:this.situationArr的index与idenTip的index对应，this.situationArr的index对应元素与后台返回type对应
   * 5，3, 6, 2, 1, 4, 7, 8, 9, 10
   * showType:-1-无限制，0-隐藏tabbar，1-操作权限限制
   */
  situationArr: {
    5: { index: 0, showType: -1, subShowType: -1 }, 
    3: { index: 1, showType: -1, subShowType: -1 }, 
    6: { index: 2, showType: 0, subShowType: 0 }, 
    2: { index: 3, showType: 1, subShowType: 0, noPages: { 'pages/myshop/activity/list': 1, 'pages/myshop/my/index': 1 } }, 
    1: { index: 4, showType: 1, subShowType: 0, noPages: { 'pages/myshop/activity/list': 1, 'pages/myshop/my/index': 1 } }, 
    4: { index: 5, showType: -1, subShowType: -1 }, 
    7: { index: 6, showType: 0, subShowType: 0 }, 
    8: { index: 7, showType: 0, subShowType: 0 }, 
    9: { index: 8, showType: -1, subShowType: -1 }, 
    10: { index: 9, showType: 0, subShowType: 0 }
  },
  idenTip: [
    {// 0：老用户，未认证
      tipType: 'richText',
      btnType: 'list',
      imp: '',
      txt: '<div style="margin: 5px 0; font-size: 12px; text-align: left;"><div>您好，因拼团趣系统升级，将不再提供免费使用，同时为不影响您的以往数据，拼团趣平台为您暂升级为基础体验版，试用期7天</div><div style="margin-top: 8px"><div style="color: #999;">有效期：</div><div style="color: #666;">2018-06-09至2018-06-16</div></div></div>',
      align: 'center',
      btn: [
        { fill: true, txt: '立即支付', btn: 'goPay2' },
        { fill: false, txt: '我知道了', btn: 'hideDiyModal' }
      ],
      btnSubAccount: [
        { fill: false, txt: '我知道了', btn: 'hideDiyModal' }
      ]
    },
    {// 1：老用户，已认证
      tipType: 'default',
      btnType: 'default',
      imp: '恭喜您！',
      txt: '因平台升级，免费为您升级为基础体验版（价值600元/年）',
      align: 'center',
      btn: 'hideDiyModal'
    },
    {// 2：新用户，新注册未购买版本
      tipType: 'richTexy',
      btnType: 'list',
      imp: '',
      txt: '<div style="margin-bottom: 25px; text-align: center;"><div style="color: #e60012; font-size: 13.65px;">已注册成功</div><div style="margin-top: 10px; font-size: 12px;">为不影响您使用，请及时去支付</div></div>',
      align: 'center',
      btn: [
        { fill: true, txt: '立即支付', btn: 'goPay' },
        { fill: false, txt: '退出登录', btn: 'goLogout' }
      ],
      btnSubAccount: [
        { fill: true, txt: '解除绑定', btn: 'goUnbind' }
      ]
    },
    {// 3：试用版，已到期
      tipType: 'list',
      btnType: 'list',
      imp: '',
      txt: '<div style="margin-bottom: 25px; text-align: center;"><div style="color: #e60012; font-size: 13.65px;">试用已到期</div><div style="margin-top: 10px; font-size: 12px;">为不影响您使用，请及时去续费</div></div>',// 什么版本，例如：基础体验版已到期
      align: 'center',
      btn: [
        { fill: true, txt: '立即支付', btn: 'goPay2' },
        { fill: false, txt: '钱包', btn: 'goWallet' },
        { fill: false, txt: '全部订单', btn: 'goOrder' },
        { fill: false, txt: '专享卡管理', btn: 'goExVipCard' },
        { fill: false, txt: '退出登录', btn: 'goLogout' }
      ],
      btnSubAccount: [
        { fill: true, txt: '解除绑定', btn: 'goUnbind' }
      ]
    },
    {// 4：基础体验版/基础正式版，已到期
      tipType: 'list',
      btnType: 'list',
      imp: '',
      txt: '<div style="margin-bottom: 25px; text-align: center;"><div style="color: #e60012; font-size: 13.65px;">基础体验版已到期</div><div style="margin-top: 10px; font-size: 12px;">为不影响您使用，请及时去续费</div></div>',// 什么版本，例如：基础体验版已到期
      align: 'center',
      btn: [
        { fill: true, txt: '去续费', btn: 'goPay4' },
        { fill: false, txt: '钱包', btn: 'goWallet' },
        { fill: false, txt: '全部订单', btn: 'goOrder' },
        { fill: false, txt: '专享卡管理', btn: 'goExVipCard' },
        { fill: false, txt: '退出登录', btn: 'goLogout' }
      ],
      btnSubAccount: [
        { fill: true, txt: '解除绑定', btn: 'goUnbind' }
      ]
    },
    { // 5：基础体验版/基础正式版，未到期，未认证
      tipType: 'default',
      btnType: 'list',
      imp: '',
      txt: '为不影响您使用认证特权功能，请尽快去补充认证资料',
      align: 'left',
      btn: [
        { fill: true, txt: '去补充认证资料', btn: 'goAuthentication' },
        { fill: false, txt: '我知道了', btn: 'hideDiyModal' },
        { fill: false, txt: '退出登录', btn: 'goLogout' }
      ],
      btnSubAccount: [
        { fill: false, txt: '我知道了', btn: 'hideDiyModal' },
        { fill: false, txt: '解除绑定', btn: 'goUnbind' }
      ]
    },
    { // 6:新用户，新注册未支付（授权码）
      tipType: 'list',
      btnType: 'list',
      imp: '',
      align: 'center',
      txt: '<div style="margin-bottom: 25px; text-align: center;"><div style="color: #e60012; font-size: 13.65px;">已注册成功</div><div style="margin-top: 10px; font-size: 12px;">使用授权码支付，申请授权，需要代理商通过申请，请确认代理商授权资质。</div></div>',
      btn: [
        { fill: true, txt: '立即支付', btn: 'goPay5' },
        { fill: false, txt: '退出登录', btn: 'goLogout' }
      ],
      btnSubAccount: [
        { fill: true, txt: '解除绑定', btn: 'goUnbind' }
      ]
    },
    { // 7:新用户，新注册，授权申请中（授权码）
      tipType: 'list',
      btnType: 'list',
      imp: '',
      align: 'center',
      txt: '<div><div style="color: #e60012; font-size: 13.65px;">授权申请已提交，等待代理商授权</div><div style="margin-top: 10px; font-size: 12px;"><div>授权码编号:201807201436251234</div><div>邀请码:201807201436251234</div></div></div>',
      btn: [
        { fill: true, txt: '联系代理商', btn: 'contactAgent' }
      ],
      btnSubAccount: []
    },
    { // 8:新用户，新注册，同意授权（授权码）
      tipType: 'list',
      btnType: 'list',
      imp: '',
      align: 'center',
      txt: '<div style="margin-bottom: 25px;"><div style="color: #e60012; font-size: 13.65px;">授权成功</div><div style="color: #FFCD35; font-size: 13px;">基础正式版</div><div style="margin-top: 10px; font-size: 12px;"><div>授权时间：2018-06-19 12：53：52</div><div>有效期至：2019-06-19 12：53：52</div></div></div>',
      btn: [
        { fill: true, txt: '确定', btn: 'certainAuthPass' },
        { fill: false, txt: '联系代理商', btn: 'contactAgent' }
      ],
      btnSubAccount: [
        { fill: true, txt: '确定', btn: 'certainAuthPass' }
      ]
    },
    { // 9:新用户，新注册，拒绝授权（授权码）
      tipType: 'list',
      btnType: 'list',
      imp: '',
      align: 'center',
      txt: '<div style="margin-bottom: 25px;"><div style="color: #e60012; font-size: 13.65px;"> 授权申请未通过 </div><div style="margin-top: 10px; font-size: 12px;">授权申请未通过，请尝试联系代理商重新扫码授权或在线支付</div></div>',
      btn: [
        { fill: true, txt: '确定', btn: 'certainAuthReject' },
        { fill: false, txt: '联系代理商', btn: 'contactAgent' }
      ],
      btnSubAccount: [
        { fill: true, txt: '确定', btn: 'certainAuthReject' }
      ]
    }
  ],
  // 获取提示信息
  getStatusInfo: function (authCode) {
    return new Promise(function (resolve, reject) {
      A.RS({
        url: '/WeChatAppsCs/Store/store_dynamic',
        method: 'POST',
        data: { numbering: authCode }
      }).then(res => { resolve(res) }, err => { reject(err) });
    });
  },
  // 处理提示信息
  setStatusInfo: function () {
    const _d = _that.data;
    _that.hideDiyModal();
    this.getStatusInfo(_d.authCode).then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        let data = res.info;
        A.optAuth.noAuthObj = {};
        if (data.is_words == 1) {
          if (data.telephone) {
            _that.setData({ agentTel: data.telephone })
          }
          let situation = this.situationArr[data.type];
          let identity = _d.info.is_account ? 'subShowType' : 'showType';
          if (situation[identity] == 0) {
            wx.hideTabBar({});
          } else if (situation[identity] == 1){
            if (_d.info.is_account == 1){
              wx.hideTabBar({});
            }else{
              A.optAuth.noAuthObj = situation.noPages;
            }
          }
          let idenTipIndex = situation.index;
          this.idenTip[idenTipIndex].txt = data.html;
          let tip = this.idenTip[idenTipIndex];
          _that.showDiyModal({
            tipShowType: tip.btnType == 'list' ? 4 : tip.tipType == 'default' ? 1 : tip.tipType == 'list' ? 2 : tip.tipType == 'richText' ? 3 : 0,
            tipTextAlign: tip.align,
            tipText: tip.txt,
            tipImpCont: tip.imp,
            tipSuccess: this.opt,
            tipConfirmText: tip.btnText || '确定',
            tipBtnArr: _d.info.is_account == 1 ? tip.btnSubAccount : tip.btn
          });
        }
      } else { _that.showTipStatus(res) }
    }, err => { console.log(err); _that.showTipErr() });
  }, 
  // 点击按钮
  opt: function (e) {
    let idenTipIndex = this.situationArr[this.idenData.type].index;
    let btnIndex = e.currentTarget.dataset.index;
    if (_that.data.info.is_account == 1) { // 主账号
      _that[this.idenTip[idenTipIndex].btnSubAccount[btnIndex].btn]();
    } else { // 子账号
      _that[this.idenTip[idenTipIndex].btn[btnIndex].btn]();
    }
  },

  /**
   * 提示框函数
   */
  // 去支付（开发二维码）
  goPay: function () { 
    A.G('authPay/applyPay/applyPay?v=' + _that.data.authInfo.version + '&type=1') 
  }, 
  // 老用户未认证第一次去支付减300
  goPay2: function () {
    A.G('authPay/selectVersion?type=2') 
  }, 
  // 升级基础正式版
  goPay3: function () { 
    A.G('authPay/selectVersion?type=3') 
  }, 
  // 去续费
  goPay4: function () { 
    A.G('authPay/applyPay/applyPay?type=4') 
  }, 
  // 去支付（授权码）
  goPay5: function () { 
    A.G('authPay/applyPay/applyPay?type=5')
  }, 
  // 认证
  goAuthentication: function () { 
    A.G('/pages/myshop/my/qualificationCert/index') 
  }, 
  // 全部订单
  goOrder: function(){
    A.G('switchTab:///pages/myshop/order/list') 
  },
  // 解除绑定
  goUnbind: function(e){
    http.quitBtn(e, 2, 'StoreAccount/quit_account', '是否确认解除绑定')
  },
  // 退出登录
  goLogout: function (e) { 
    http.quitBtn(e, 2) 
  }, 
  // 联系代理商
  contactAgent: function () { 
    wx.makePhoneCall({ phoneNumber: _that.data.agentTel }) 
  }, 
  // 授权成功点击确定
  certainAuthPass: function () {
    this.certainAuth(2);
  },
  // 授权失败点击确定
  certainAuthReject: function () {
    this.certainAuth(1);
  },
  // 授权成功、授权失败点击确定
  certainAuth: function (type) {
    wx.showLoading({ title: '加载中', mask: true })
    A.RS({
      url: '/WeChatAppsCs/AuthCode/dealNotice',
      data: { notice: type }
    }).then(res => {
      wx.hideLoading();
      this.setStatusInfo();
    }, err => { })
  },
}