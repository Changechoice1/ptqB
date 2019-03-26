// pages/myshop/expand/fans/list.js
const unionid = wx.getStorageSync('thisCode');
const storeId = wx.getStorageSync('store_id');
const userId = wx.getStorageSync('store_id');
var http = require('../../../../../../utils/http.js');
var util = require('../../../../../../utils/util.js');

var A = getApp();
Page(A.assignPage({
  data: {
    tip: {
      status: 0,
      title: '拼团趣温馨提示',
      content: '弹窗内容',
      cancelText: '取消',
      confirmText: '确定',
      txtAlign: 'center',
      titleHide: true,
      onceConfirm: true
    },

    isEdit: false,
    isDefault: 0,
    isMore: false,
    isExpanded: false,

    isLastPage: false,
    pageCount: 0,
    pageNum: 1,
    consInfo: {},
    isMore: false,
    contactInfo: [],
    mContactInfo: [],
    orderInfo: []
  },
  onLoad: function (opts) {
    const _that = this;
    let userInfo = wx.getStorageSync('cusInfo');
    // 初始化数据
    _that.setData({ consInfo: userInfo, userId: userInfo.user_id, unionid: userInfo.unionid, storeId: wx.getStorageSync('store_id') });
    // 获取联系方式
    _that.getContacts({user_id: opts.id}).then(res => { _that.setContacts(res); }, err => { _that.showTipErr(err); });

    // 获取订单信息
    _that.getOrders().then(res => { _that.setOrders(res); }, err => { _that.showTipErr(err); });
  },
  

  /**
   * 联系方式
   * 
   */

  // 获取
  getContacts: function(){
    const _that = this, _d = _that.data;
    return new Promise(function (resolve, reject) {
      A.RS({
        url: '/WeChatAppsCs/listClientContactDTO',
        method: 'POST',
        data: { store_id: _d.storeId, user_id: _d.userId }
      }).then(res => { resolve(res) }, err => { reject(err) });
    });
  },

  // 设置联系方式
  setContacts: function(opts){
    if (opts.status == 1) {
      let contacts = opts.info;
      for (let i = 0, len = contacts.length; i < len; i++) {
        if (contacts[i].is_default == 1) {
           let item = contacts.splice(i,1);
           contacts.unshift(item[0])
           this.setData({ isDefault: 0 }); break;
        }
      }
      let mContactInfo = contacts, isMore = false, isDefault = 0;
      if (mContactInfo.length > 3) { isMore = true; mContactInfo = mContactInfo.slice(0, 3); }
      this.setData({ isMore: isMore, contactInfo: contacts, mContactInfo: mContactInfo });
    } else { this.showTipStatus(opts.info) }
  },

  // 编辑默认联系方式
  editContacts: function () { 
    const _that = this, _d = _that.data;
    _that.setData({ 
      isEdit: !_d.isEdit,
      isExpanded: true,
    }); 
  },

  // 修改默认联系方式
  setDefault: function (e) {
    const _that = this, _d = _that.data;
    let idx = e.currentTarget.dataset.index;
    if (_d.isDefault != idx) {
      let contactInfo = _d.contactInfo, isDefault = _d.isDefault;
      contactInfo[isDefault].is_default = 0; contactInfo[idx].is_default = 1;
      let mContactInfo = contactInfo;
      if (contactInfo.length > 3) { mContactInfo = mContactInfo.slice(0, 3); }
      _that.setData({ isDefault: idx, contactInfo: contactInfo, mContactInfo: mContactInfo });
    }
  },

  // 取消编辑
  cancelContacts: function () {
    const _that = this, _d = _that.data;
    _that.setData({ 
      isEdit: false,
      isExpanded: false,
    });
    _that.getContacts({ user_id: _that.data.userId }).then(res => { _that.setContacts(res); }, err => { _that.showTipErr(err); });
  },

  // 确定保存修改
  confirmContacts: function () {
    const _that = this, _d = _that.data;
    _that.setData({ isEdit: false });
    _that.saveDefaultContact().then(res => {
        if (res.status == 1) {
          _that.setData({
            isExpanded: false,
          });
          _that.selectComponent("#diyMoadel").showDialog();
          _that.setData({ 
            'tip.content': res.info || '保存成功！'
          });
          _that.getContacts({ user_id: _d.userId }).then(res => { _that.setContacts(res); }, err => { _that.showTipErr(err); });
        } else { _that.showTipStatus(res); }
    }, err => { _that.showTipErr(err); });
  },

  // 保存修改默认
  saveDefaultContact: function () {
    const _that = this, _d = _that.data;
    return new Promise(function(resolve, reject){
      A.RS({
        url: '/WeChatAppsCs/updateStoreContacte',
        method: 'POST',
        data: { 
          storeId: _d.storeId, 
          userId: _d.userId, 
          consignee: _d.contactInfo[_d.isDefault].contact_name, 
          telephone: _d.contactInfo[_d.isDefault].contact_phone 
        }
      }).then(res => { resolve(res) }, err => { reject(err) });
    });
  },

  // 查看全部
  allContacts: function () { this.setData({ isExpanded: true }); },

  // 收起
  lessContacts: function () { this.setData({ isExpanded: false }); },


  /**
   * 订单信息
   * 
   */

  // 获取订单信息
  getOrders: function(opts){
    const _that = this, _d = _that.data;
    if (!_d.isLastPage){
      return new Promise(function (resolve, reject) {
        A.RS({
          url: '/WeChatAppsCs/MemberOrder/getOrderAll',
          method: 'POST',
          data: { storeId: _d.storeId, unionid: _d.unionid, paging: _d.pageNum++ }
        }).then(res => { resolve(res) }, err => { reject(err) });
      });
    }
  },

  // 设置订单信息
  setOrders: function(opts){
    const _that = this, _d = _that.data;
    if (opts.status == 1) {
      let isLastPage = false;
      if (opts.all_pages <= opts.paging) { isLastPage = true; }
      let list = _d.orderInfo || [], newlist = list.concat(opts.order_list);
      _that.setData({ isLastPage: isLastPage, pageCount: opts.all_pages, pageNum: opts.paging, orderInfo: newlist });
    } else { _that.showTipStatus(opts); }
  },

  // 触底加载更多订单
  onReachBottom: function(){
    const _that = this;
    if(!this.data.isLastPage){ if (_that.getOrders()) { _that.getOrders().then(res => { _that.setOrders(res); }, err => { _that.showTipErr(err); }); } }
  },


  /**
   * 提示
   * 
   */

  // 不同状态提示
  showTipStatus: function (opts) {
    this.setData({ 'tip.status': opts.status });
    this.selectComponent("#diyMoadel").showDialog();
    if (opts.status == 0) {
      this.setData({ 'tip.content': '数据获取失败！' });
    } else if (opts.status == 233) {
      this.setData({ 'tip.content': '请绑定商家！' });
    } else if (opts.status == 333) {
      this.setData({ 'tip.content': '您的商家身份已被禁用!' });
    } else if (opts.status == 600) {
      this.setData({ 'tip.content': opts.info || '登录过期，请重新登录!' });
    } else {
      this.setData({ 'tip.content': opts.info || '数据获取失败！' });
    }
  },

  // 调用接口错误结果提示
  showTipErr: function (opts) {
    this.setData({ 'tip.content': '数据获取失败！' });
    this.selectComponent("#diyMoadel").showDialog();
  },
  
  // 关闭提示
  closeTip: function () {
    const _d = this.data.tip;
    if (_d.status == 0 || _d.status == 1) {
      this.selectComponent("#diyMoadel").hideDialog();
    } else if (_d.status == 233 || _d.status == 333) {
      wx.reLaunch({ url: '/pages/login/login?upidentity=2' })
    }
  }
}))
