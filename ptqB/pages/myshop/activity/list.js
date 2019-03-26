var http = require('../../../utils/http.js')
let data = require('../../../config/data.js');
let qrImgCanvas = require('../home/marketingPromotion/publishGjmd/qrImgCanvas.js');
var unionid = wx.getStorageSync('thisCode')
var A = getApp()
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: http.imgUrl,
    nav: 0,
    navList: [
      { actType: 3, name: '多人拼团' },
      { actType: 1, name: '拼团立减' },
      { actType: 4, name: '限时专享' },
      { actType: 5, name: '刮奖免单' },
      { actType: 6, name: '砍价' },
    ],
    statusList: [
      { state: 2, content: '全部' },
      { state: 1, content: '未开始' },
      { state: 0, content: '进行中' },
      { state: 3, content: '已结束' },
      { state: 4, content: '下架' },
    ],


    canSearch: true, // 是否可搜索（刮奖免单不能搜索）
    keywords: '', // 关键字
    showClearIcon: false, // 是否显示清空搜索框图标

    actStatusListShow: false, // 是否显示活动状态列表
    curActStatus: '0', // 当前活动状态

    noList: false,
    noListData: {
      img: '/images/active_none_1.png',
      txt: '暂时没有内容'
    },
    goods_nums: '0',
    pageNum: 0,
    pageSize: 0,
    pageCount: 0,
    isLastPage: false,
    list: [],
    
    payQrImgFlag: false, // 刮奖免单：显示支付二维码
    payQrImgInfo: data.payQrImgInfo, // 刮奖免单：支付二维码信息
   noAuth: {
      img: '/images/noAuth.png',
      txt: '暂无权限操作'
   },
  },

  /**
   * 生命周期函数
   */
  onLoad: function () {
   // 关闭分享功能
   wx.hideShareMenu();
    let _setAuth = A.setAuth();
    this.setData({
      showContainer: _setAuth,
      payQrImgInfo: data.payQrImgInfo,
      isAccount: wx.getStorageSync('storeInfo').isAccount
    });

    this.getActList()
  },
  onShow:function(){

  },
  onHide: function () {
    this.setData({
      selectF: false,
    });
    // this.initListData();
    wx.hideLoading();
  },

  // 初始化列表数据
  initListData: function(){
    this.setData({
      goods_nums: '0',
      noList: false,
      pageNum: 0,
      pageCount: 0,
      isLastPage: false,
      list: []
    })
  },

  /**
   * 搜索
   */
  // 搜索输入框输入事件
  searchInput(e) {
    var v = e.detail.value
    let showClearIcon = e.detail.cursor > 0 ? true : false
    this.setData({ keywords: v, showClearIcon: showClearIcon })
  },
  // 清空搜索输入框
  closeTxtBtn() {
    this.setData({ keywords: '' })
    this.initListData();
    this.getActList()
  },
  // 点击搜索
  searchBtn() {
    const _that = this, _d = _that.data;
    if (_d.nav != 3) {
      if (_d.canSearch) {
        _that.setData({ canSearch: false })
        _that.initListData();
        _that.getActList()
      }
    }
  },

  /**
   * 活动类型tab
   */
  // 切换活动类型
  changeNav(e) {
    let nav = e.currentTarget.dataset.nav
    this.setData({
      curActStatus: 0,
      actStatusListShow: false,
      actStatusListShow: false,
      nav: nav
    })
    this.initListData();
    if (nav == 3) {
      this.setData({ payQrImgFlag: true });
    } else {
      this.setData({ payQrImgFlag: false });
    }
    this.getActList(1)
  },

  /**
   * 活动状态
   */
  // 显示活动状态下拉列表
  showHide() {
    const _that = this, _d = _that.data;
    if (_d.actStatusListShow) {
      _that.setData({ actStatusListShow: false })
    } else {
      _that.setData({ actStatusListShow: true })
    }
  },
  // 选择活动状态
  statusChecked(e) {
    const _that = this, _d = _that.data;
    _that.initListData();
    let index = http.dataIndex(e)[0]
    _that.setData({ curActStatus: index || 0 })
    _that.getActList(1);
    setTimeout(function () {
      _that.setData({ actStatusListShow: false })
    }, 300)
  },
  
  /**
   * 活动列表
   */
  // 获取活动列表
  getActList(pageNum) {
    const _that = this, _d = _that.data;
    let actType = _d.navList[_d.nav].actType;
    pageNum = pageNum || ++_d.pageNum
    wx.showLoading({ title: '加载中' })
    A.updata.getActList(_d.keywords, actType, _d.statusList[_d.curActStatus].state, pageNum).then(res => {
      try {
        wx.hideLoading();
        this.setData({ canSearch: true });
        if (res.status == A.STATE.STATUS.OK) {
          if (res.all_paging == 0 || res.list.length == 0) {
            wx.hideLoading();
            _that.setData({ noList: true });
            if (actType == 5){
              _that.setData({ payQrImgFlag: false });
            }
            return;
          }
          if (res.all_paging <= res.paging) {
            _that.setData({ isLastPage: true });
          }
          let list = [];
          if (pageNum > 1){
            list = _d.list;
          }
          let newList = list.concat(res.list);
          this.setData({
            goods_nums: res.goods_nums,
            list: newList,
            pageNum: res.paging,
            pageCount: res.all_paging
          });
          if (actType == 5) {
            _that.setData({
              'payQrImgInfo.logo': wx.getStorageSync('storeInfo').store_logo,
              'payQrImgInfo.name': wx.getStorageSync('storeInfo').store_name,
              'payQrImgInfo.qrImg': res.list[0].pay_code,
              payQrImgFlag: true
            });
            _that.downloadImgs();
          }else {
            wx.hideLoading();
          }
        } else {
          wx.hideLoading();
          A.showTipModal(res.info || '数据获取失败')
        }
      } catch (e) {
        wx.hideLoading();
      }
    }, err => {
      this.setData({ canSearch: true })
    })
  },
  // 触底加载更多
  onReachBottom: function () {
    if (this.data.nav != 3 && !this.data.isLastPage) {
      this.getActList()
    }
  },

  /**
   * 列表项操作
   */
  // 到成团详情/刮奖详情/活动详情
  toGroupList(e) {
    let id = http.dataIndex(e)[1]
    let type = http.dataIndex(e)[2]
    let url = type == 1 ? 'ptljGroupList/ptljGroupList?id=' :
              type == 3 ? 'drptGroupList/drptGroupList?id=' :
              type == 5 ? 'gjmdGroup/gjmdGroupList/gjmdGroupList?id=' :
              type == 6 ? 'kjGroupList/kjGroupList?id=' : ''
    A.G(url + id);
  },
  // 编辑
  editOne(e) {
    var index = http.dataIndex(e)[0]
    var id = http.dataIndex(e)[1]
    var type = http.dataIndex(e)[2]
    let url = type == 5 ? '/pages/myshop/home/marketingPromotion/publishGjmd/publishGjmd?id=' + id : '/pages/myshop/home/marketingPromotion/publishAct/publishAct?actType=' + type + '&id=' + id + '&index=' + index
    A.G(url);
  },
  // 删除提示
  delBtn(e) {
    const _that = this, _d = _that.data;
    var name = e.currentTarget.dataset.name
    A.showBaseModal('是否删除 ' + name, function () {
      _that.delOne(e)
    });
  },
  // 确认删除活动
  delOne(e) {
    const _that = this, _d = _that.data;
    var id = http.dataIndex(e)[1]
    A.updata.delAct(id).then(res => {
      if (res.status == A.STATE.STATUS.OK) {
      //   _that.initListData();
        let keywords = _d.keywords || ''
        let curActStatus = _d.statusList[_d.curActStatus].state;
         let dataList = _d.list;
         dataList.splice(e.currentTarget.dataset.index,1)
         _that.setData({
            list: dataList
         })
      //   _that.getActList(1)
      } else {
        A.showTipModal(res.info)
      }
    }, res => { })
  },

  /**
   * 刮奖免单
   */
  // 下载图片
  downloadImgs: function () {
    qrImgCanvas.downloadImg(this.data.payQrImgInfo).then(res1 => {
      let payQrImgInfo = res1;
      this.setData({ payQrImgInfo: payQrImgInfo });
    }, err => {
      wx.hideLoading();
    });
  },
  // 隐藏支付二维码图片
  hidePayQrImg: function () { },
  // 保存支付二维码图片
  savePayQrImg: function () {
    const _that = this, _d = _that.data;
    _that.setData({ btn: _that.selectComponent('#save_btn') });
    // 绘制canvas
    qrImgCanvas.drawCanvas(_d.payQrImgInfo).then(() => {
      qrImgCanvas.savePayQrImg(_that).then(res => { }, err => { });
    });
  },
}))