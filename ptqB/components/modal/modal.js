import A from '../../vwx/uset.js'
Component({
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {},

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    // 弹窗显示控制
    isShow: false,
    // 组件内容
    showTitle: true, // 是否隐藏标题
    title: '温馨提示', // 标题内容
    titleColor: '#999', // 标题颜色
    contType: 0, // 内容类型: 0-正常 1-列表 2-富文本
    txtAlign: 'left', // 文字的对齐方式
    content: '', // 内容
    impTxt: '', // 重点内容（红色）
    btnType: 0, // 按钮类型: 0-正常 1-列表
    success: 'hideModal', // 
    confirmText: '确定', // 确认按钮文字
    showCancel: true, // 是否显示取消按钮
    fail: 'hideModal',
    cancelText: '取消', // 取消按钮文字
    btnList: [], // 按钮列表
    complete: '', // 必须执行的回掉函数
    opts: {}
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    //隐藏弹框
    hideModal() {
      this.setData({ isShow: false })
    },
    //展示弹框
    showModal(opts) {
      this.complete = opts.complete || function () { };
      this.success = opts.success || function () { };
      this.fail = opts.fail || function () { };
      this.setData({
        isShow: true,
        showTitle: (opts.showTitle == null || opts.showTitle == undefined) ? true : opts.showTitle,
        title: opts.title || '温馨提示',
        titleColor: opts.titleColor || '#999',
        contType: opts.contType || 0,
        txtAlign: opts.txtAlign || 'left',
        content: opts.content || '提示内容',
        btnType: opts.btnType || 0,
        success: opts.success || this.hideModal,
        confirmText: opts.confirmText || '确定',
        showCancel: (opts.showCancel == null || opts.showCancel == undefined) ? true : opts.showCancel,
        fail: opts.fail || this.hideModal,
        cancelText: opts.cancelText || '取消',
        btnList: opts.btnList || [],
        complete: opts.complete || this.hideModal
      });
    },
    // 成功回调
    success: function (e) { },
    _success: function (e) {
      this.success(e);
      this._complete(e);
    },
    // 失败回调
    fail: function (e) { },
    _fail: function (e) {
      this.fail(e);
      this._complete(e);
    },
    // 必执行回调
    complete: function (e) { },
    _complete: function (e) {
      this.complete(e);
      this.hideModal();
    },
    // 1、基本
    showBaseModal(content, success, fail, complete) {
      this.showModal({
        txtAlign: 'center',
        content: content,
        success: success,
        fail: fail,
        complete: complete
      })
    },
    // 2、提示
    showTipModal(content, success, complete) {
      this.showModal({
        txtAlign: 'center',
        content: content,
        showCancel: false,
        success: success,
        confirmText: '我知道了',
        complete: complete
      })
    },
    // 3、特殊
    showDiyModal(content, btnList, success, complete) {
      this.showModal({
        contType: 2,
        content: content,
        showCancel: false,
        btnType: 1,
        btnList: btnList,
        success: success,
        complete: complete
      })
    },
  }
})