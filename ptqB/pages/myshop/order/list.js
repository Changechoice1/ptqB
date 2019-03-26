var unionid = wx.getStorageSync('thisCode')
var http = require('../../../utils/http.js')

var date = new Date()
const years = []
const months = []
const days = []

for (let i = 2018; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}

const A = getApp();
Page(A.assignPage({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: http.imgUrl,
        orTabArr: ['全部', '待成团', '待使用', '待发货', '待收货', '待评价', '完成', '过期'],
        thatIndex: 0, // 所选订单状态index
        titleBoxL: 0, // 订单状态滚动条left

        years: years,
        months: months,
        days: days,

        noSearchCriteria: true, // 无搜索条件
        startDateArr: [0, 0, 0],
        endDateArr: [0, 0, 0],
        startDate: '',
        endDate: '',
        showDatePicker: false, //显示时间选择器
        order_list: [],
        nullData: {
            img: '/images/order_none.png',
            txt: '您还没有相关订单'
        }
    },

    // 页面加载  获取订单列表
    onLoad: function(options) {
       // 关闭分享功能
       wx.hideShareMenu();
        var that = this
        this.getOrderList(1, 0);
        that.setData({ nowPage: 1 })
    },

    // 获取订单列表
    getOrderList(page, index) {
        var that = this
        var unionid = wx.getStorageSync('thisCode')
        wx.showLoading({ title: '加载中' })
        var type = index == 1 ? 6 : index == 2 ? 2 : index == 3 ? 1 : index == 4 ? 3 : index == 5 ? 4 : index == 6 ? 5 : index == 7 ? 10 : 0;
        let list = that.data.order_list;
        let order_id = list.length == 0 ? null : list[list.length - 1].id;
        A.RS({
          url: '/WeChatAppsCs/StoreOrder/order_list', 
          data: { 
            type: type,
            paging: page,
            beginTime: this.data.startDate,
            endTime: this.data.endDate,
            order_id: order_id
          }
        }).then(res => {
            wx.hideLoading()
            var aa = res.data
            var all_pages = res.all_paging
            that.setData({
                orderNum: res.all_num,
                order_list: aa,
                all_pages: res.all_paging,
                nowPage: res.paging,
                allOrder: res.all_num,
            })
        }, err => {})
    },
    // 切换tab
    ordBtn(e) {
        let index = http.dataIndex(e)[0]
        this.setData({
            thatIndex: index,
            startDateArr: [0, 0, 0],
            endDateArr: [0, 0, 0],
            startDate: '',
            endDate: '',
            noSearchCriteria: true,
            order_list: []
        })
        this.getOrderList(1, index)
    },

    // 到订单详情
    toOrderDetail(e) {
        var thatId = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index
        wx.navigateTo({
            url: 'orderInfo/orderInfo?id=' + thatId + '&index=' + index + '&tab=' + this.data.thatIndex,
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var that = this
        var nowPage = that.data.nowPage
        var all_pages = Number(that.data.all_pages)
        var unionid = wx.getStorageSync('thisCode')
        var thatIndex = that.data.thatIndex

        if (nowPage >= all_pages) {
            return
        }
        wx.showLoading({
            title: '加载更多',
        })
        nowPage++
        var type = thatIndex == 1 ? 6 : thatIndex == 2 ? 2 : thatIndex == 3 ? 1 : thatIndex == 4 ? 3 : thatIndex == 5 ? 4 : thatIndex == 6 ? 5 : thatIndex == 7 ? 10 : 0;
        let list = that.data.order_list;
        let order_id = list.length == 0 ? null : list[list.length - 1].id
        A.RS({
          url: '/WeChatAppsCs/StoreOrder/order_list',
          data: {
            type: type,
            paging: nowPage,
            beginTime: this.data.startDate,
            endTime: this.data.endDate,
            order_id: order_id
          }
        }).then(res => {
            wx.hideLoading();
            var aa = res.data
            for (let item of aa) {
                that.data.order_list.push(item)
            }
            var all_pages = res.all_paging
            that.setData({
                orderNum: res.all_num,
                order_list: that.data.order_list,
                all_pages: res.all_paging,
                nowPage: nowPage,
                thatIndex: thatIndex,
                allOrder: res.all_num
            })
        }, res => {})
    },
    // 显示日期选择器
    popDatePicker: function(){
      this.setData({ showDatePicker: true })
    },
    // 选择下单日期
    selectEndYear: function(e){
      console.log(e);
    },
    selectStartDate: function(e){
      this.setData({ startDateArr: e.detail.value});
    },
    selectEndDate: function (e) {
      this.setData({ endDateArr: e.detail.value });
    },
    // 取消/关闭选择日期
    closeDatePicker: function(){
      this.setData({
        startDateArr: [0, 0, 0],
        endDateArr: [0, 0, 0],
        startDate: '',
        endDate: '',
        showDatePicker: false
      });
    },
    // 确定选择日期
    selectDate: function(){
      let years = this.data.years;
      let months = this.data.months;
      let days = this.data.days;
      let startDateArr = this.data.startDateArr;
      let endDateArr = this.data.endDateArr;
      let startDate = years[startDateArr[0]] + '-' + months[startDateArr[1]] + '-' + days[startDateArr[2]];
      let endDate = years[endDateArr[0]] + '-' + months[endDateArr[1]] + '-' + days[endDateArr[2]];
      if(new Date(startDate) > new Date(endDate)){
        wx.showModal({
          title: '提示',
          content: '开始日期应早于结束日期',
          showCancel: false
        })
        return;
      }
      this.setData({ 
        startDate: startDate,
        endDate: endDate,
        noSearchCriteria: false,
        showDatePicker: false
      });
      this.getOrderList(1, this.data.thatIndex);
    },
    // 清空搜索时间
    clearSearch: function(){
      this.setData({
        startDateArr: [0, 0, 0],
        endDateArr: [0, 0, 0],
        startDate: '',
        endDate: '',
        noSearchCriteria: true
      });
      this.getOrderList(1, this.data.thatIndex);
    }
}))