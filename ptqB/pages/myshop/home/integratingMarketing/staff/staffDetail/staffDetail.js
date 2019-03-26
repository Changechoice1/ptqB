var http = require('../../../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
var date = new Date()
var years = []
var months = [];
var app = getApp()

for (var i = date.getFullYear()-8; i <= date.getFullYear(); i++) {
    years.push(i)
}
for (var i = 1; i <= date.getMonth()+1; i++) {
    months.push(i)
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: http.imgUrl,
        chooseTime: false,
        years: years,
        year: date.getFullYear(),
        months: months,
        month: 1,
        value: [1999, 0],
        staffList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let account_id = options.id;
        let mon = Number(new Date().getMonth())+1
        let timeNow = new Date().getFullYear()+'-'+mon;
        this.setData({
            timeNow:timeNow,
            account_id:account_id
        })
        this.staffInfoFn(account_id,timeNow)
        this.staffMonChange(account_id,timeNow,1)
    },
    // 员工个人详情
    staffInfoFn(account_id,time){
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreAccount/account_info',{
            unionid:unionid,
            account_id:account_id,
            time:time
        },res=>{
            let data = res.data;
            if(data.status == 1){
                this.setData({
                    staffInfoData:data.account_info
                })
            }else{
                http.showModal(data.info,false,()=>{})
            }
        },res=>{})
    },
    // 员工月份选择
    staffMonChange(account_id,time,paging){
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreAccount/account_month_info',{
            unionid:unionid,
            time:time,
            account_id:account_id,
            paging:paging,
        },res=>{
            let data = res.data;
            if(data.status == 1){
                let staffList = this.data.staffList || [];
                data.list.find(item=>{
                    staffList.push(item)
                })
                this.setData({
                    staffList:staffList,
                    paging:paging,
                    all_paging:data.all_paging
                })
            }else{
                http.showModal(data.info,false,()=>{})
            }
        },res=>{})
    },
    // 开启时间选择
    openChoose() {
        this.setData({
            chooseTime: true
        })
 
     
    },

    // 关闭时间选择
    closeChoose() {
        this.setData({
            chooseTime: false
        })
    },

    // 选择年月
    bindChange(e) {
        const val = e.detail.value;
        let months = [];
        var date = new Date()
        if(val[0]>=8){
            for (var i = 1; i <= date.getMonth()+1; i++) {
                months.push(i)
            }
        }else{
            for (var i = 1; i <= 12; i++) {
                months.push(i)
            }
        }
        this.setData({
            year: this.data.years[val[0]],
            month: this.data.months[val[1]],
            value:val,
            months:months
        })
    },
    // 点击确认
    confirmTimeBtn(){
        let year = this.data.year;
        let month = this.data.month;
        let timeNow = year+'-'+month;
        let account_id = this.data.account_id;
        this.setData({
            timeNow:timeNow,
            chooseTime:false,
            staffList:[]
        })
        this.staffMonChange(account_id,timeNow,1)
      this.staffInfoFn(account_id, timeNow)

    },
    // 到订单详情
    goOrderInfo: function(e){
      wx.navigateTo({
        url: '/pages/myshop/order/orderInfo/orderInfo?id=' + e.currentTarget.dataset.id,
      })
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
        let paging = this.data.paging;
        let all_paging = this.data.all_paging;
        let account_id = this.data.account_id;
        let timeNow = this.data.timeNow;
        if(paging >= all_paging){
            return
        }
        paging++;
        this.staffMonChange(account_id,timeNow,paging)
    }
})