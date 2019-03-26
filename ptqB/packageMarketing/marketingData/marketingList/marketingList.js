// packageMarketing/marketingList/marketingList.js
const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    nav: 0,
    type: 3,
    navList: [{
        actType: 3,
        name: '多人拼团'
      },
      {
        actType: 1,
        name: '拼团立减'
      },
      {
        actType: 4,
        name: '限时专享'
      },
    ],
    noListData: {
      img: '../../../images/qf_none.png',
      txt: '店铺暂无活动'
    },
    focus_list: [],
    is_group: 3,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 关闭分享功能
    wx.hideShareMenu();
    
    var store_id = options.id
    this.setData({
      store_id: options.id,
      paging: 1
    })
    this.activeList(store_id, this.data.type, this.data.paging)
  },
  // 切换活动类型
  changeNav(e) {
    let nav = e.currentTarget.dataset.index
    let type = e.currentTarget.dataset.nav
    this.setData({
      type: type,
      nav: nav,
      paging: 1
    })
    this.activeList(this.data.store_id, type, 1)
  },
  //营销数据，活动分类列表
  activeList(store_id, is_group, paging) {
    A.updata.activeList(store_id, is_group, paging).then(res => {
      if (res.status == 1) {
        for (let i in res.focus_list) {
          let id = res.focus_list[i].id
          if (id == null) {
             res.focus_list[i].splice(i,1)
          }
        }
        this.setData({
          focus_list: res.focus_list,
          all_paging: res.all_paging
        })
      } else {
        A.showTipModal(res.info || '请求数据失败')
      }
    }, err => {
      A.showTipModal(err.info || '请求接口失败')
    })
  },
  //列表跳转
  toGroupList: function(e) {
    var id = JSON.stringify(e.currentTarget.dataset.item)

    A.G('./marketingDetail/marketingDetail?info=' + encodeURIComponent(id));
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    var paging = that.data.paging;
    var all_paging = that.data.all_paging;
    var store_id = that.data.store_id;
    var is_group = that.data.is_group;
    var list = that.data.list;
    if (all_paging && all_paging <= paging) {
      return
    }
    paging++;
    A.updata.activeList(store_id, is_group, paging).then(res => {
      if (res.status == 1) {
        for (let i in res.focus_list) {
          focus_list.push(res.focus_list[i]);
        }
        that.setData({
          focus_list: focus_list,
          paging: res.paging,
          all_paging: res.all_paging
        })
      } else {
        A.showTipModal(res.info || '请求数据失败')
      }
    }, err => {
      A.showTipModal(res.info || '请求接口失败')
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))