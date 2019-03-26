// packageMarketing/marketingAssistant/index.js
var unionid = wx.getStorageSync('thisCode');
var interval;
var intervalScroll; //优秀店铺滚动定时器
var intervalScrolls; //优秀店铺滚动定时器  点击预览后清计时器使用此
const A = getApp();
var categoryPid;
var categoryId;
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0, //默认显示活动库
    nav: 0, //默认显示第一个品牌
    tab: 3, //默认显示多人拼团
    //横向切换栏，第1层
    brandList: [],
    //横向切换栏，第2层
    tabs: [{
      name: '多人拼团',
      types: 3,
    }, {
      name: '限时专享',
      types: 4
    }, {
      name: '拼团商城',
      types: 1
    }],
    // 显示列表
    list: [],
    nullFlag: 0, //当前二级行业类别是否存在 1不存在，前往设置 
    nullData: {
      nullImg: '/images/nullMA.png',
      noActiviti: '找不到合适的营销活动',
      goSetting: '请前往店铺设置准确选择行业类别，再来看看吧！'
    },
    changeImg: '/images/changeIndus.png', //换个行业看看
    banner: [], //顶部banner
    excellent: [], //优秀店铺
    customize: [], //行业定制
    hot: [], //同行热门
    animation: {},
    shakeFlag: 0,
    leftScroll: 0, //优秀店铺总需要向左滚动距离
    left: 0, //当前向左滚动距离
    showFlag: 0 //onshow方法是否继续滚动计时器0否  1是
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 关闭分享功能
    wx.hideShareMenu();

    this.setData({
      paging:1
    })
  },
  //优秀店铺预览图片
  previewPoster: function(e) {
    clearInterval(intervalScroll);
    this.setData({
      showFlag: 1
    })
    var url = new Array();
    url[0] = e.currentTarget.dataset.poster;
    wx.previewImage({
      urls: url,
      complete: () => {

      }
    })

  },
  //监听页面滚动
  onPageScroll: function(scrollTop) {
    var _that = this,
      _d = _that.data;
    _that.setData({
      shakeFlag: 0
    })
    clearInterval(interval);
    var animations = _d.animations;
    animations.translateX(_d.animationX).step();
    _that.setData({
      animation: animations.export()
    })
    interval = setTimeout(function() {
      animations.translateX(0).step();
      _that.setData({
        animation: animations.export(),
        shakeFlag: 1
      })
      clearTimeout(interval);
    }, 1000);
  },
  // 行业定制更多方案
  moreSolution: function() {
    A.G('/packageMarketing/marketingAssistant/industryCustom/index?category_name=' + this.data.category_name)
  },
  // 行业热门营销方案 全部方案
  allSolution: function() {
    A.G('/packageMarketing/marketingAssistant/peerHot/index?category_pname=' + this.data.category_pname)
  },
  //前往店铺设置
  goStoreSet: function() {
    A.G('/pages/myshop/setting/setting')
  },
  catchtouchmove: function() {
    return false
  },
  customizationList(){
    var that = this;
    var excellent = [];
    wx.showLoading({
      title: '加载中...',
    })
    A.updata.customizationList().then(res => {
      wx.hideLoading();
      if (res.status == 1) {
        that.setData({
          banner: res.banner,
          customize: res.customize,
          excellent: res.excellent,
          hot: res.hot,
          duration: res.excellent.length * 300,
          category_name: res.category_name,
          category_pname: res.category_pname,
          nullFlag: 0
        })
        this.scrollExcellent(res.excellent);
      } else if (res.status == 300) {
        that.setData({
          nullFlag: 1
        })
      } else {
        A.showTipModal(res.info || '请求数据失败')
      }
    }, err => {
      A.showTipModal(err.info || '请求接口失败')
    })
  },
  //优秀店铺滚动
  scrollExcellent(list) {
    var setTimeOutAcc = setTimeout(() => {
      if (list.length > 4) {
        let length = list.length; //列表长度
        let scrollList = list.concat(list);
        this.setData({
          excellent: scrollList
        });
        let leftScroll = length * 187.5; //列表宽度
        this.setData({
          leftScroll: leftScroll
        })
        // console.log(leftScroll)
        intervalScroll = setInterval(() => {
          let left = 0;
          if (this.data.left < leftScroll) {
            left = this.data.left + 1.5;
          }
          this.setData({
            left: left
          })
          // console.log(left)
        }, 30)
      }
      clearTimeout(setTimeOutAcc)
    }, 3000)
  },
  // 跳转模板详情
  goTDetail: function(e) {
    let data = e.currentTarget.dataset.item;
    let typeStr = data.is_group == 1 ? 'ptljTDetail/ptljTDetail' : data.is_group == 3 ? 'drptTDetail/drptTDetail' : data.is_group == 4 ? 'xszxTDetail/xszxTDetail' : data.is_group == 6 ? 'kjTDetail/kjTDetail' : '';

    A.G('actTDetail/' + typeStr + '?goods_id=' + data.goods_id + '&num=' + data.user_count + '&tag=' + data.tag_industry_id + '&applyNum=' + data.same_kind_count);
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
    var that = this;
    that.setData({
      shakeFlag: 1
    })
    // 设置换行业图片宽度
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          animationX: res.screenWidth / 750 * 200,
          pageW: res.windowWidth
        })
      }
    });
    //创建换行业动画
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    that.setData({
      animations: animation
    })
    if (this.data.showFlag == 1) {
      // 继续滚动计时器
      var that = this;
      that.setData({
        showFlag: 0
      })
      intervalScrolls = setInterval(() => {
        let left = 0;
        if (that.data.left < that.data.leftScroll) {
          left = that.data.left + 1.5;
        }
        that.setData({
          left: left
        })
        // console.log(left)
      }, 30)
    } else {
      that.customizationList(unionid);
    }
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      shakeFlag: 0
    });
    clearInterval(intervalScroll)
    clearInterval(intervalScrolls)
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
  onReachBottom: function() {},
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
}))