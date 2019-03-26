var http = require('../../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: '1',
        imgUrl: http.imgUrl,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let order_id = options.id
        let unionid = wx.getStorageSync('thisCode')
        let that = this;
        // 基础数据请求
        var p = new Promise((resolve, reject) => {
            http._post1('StoreCard/buy_card_info', {
                unionid: unionid,
                order_id: order_id
            }, res => {
                let data = res.data;
                if (data.status == 1) {
                    resolve(data.info)
                } else {
                    http.showModal(data.info, false, () => {
                        wx.navigateBack({})
                    })
                }
            }, res => {})
        });
        // 获取card_id后执行
        p.then((value) => {
            this.setData({
                card_info: value
            })
            this.exCardBFn(1,value.card_id)
        });   
    },
    // 消费记录的封装
    exCardBFn(paging,card_id){
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreCard/use_card_list',{
            card_id:card_id,
            unionid:unionid,
            paging:paging,
        },res=>{
            let data = res.data;
            if(data.status == 1){
                let exCardBList = this.data.exCardBList || [];
                data.list.find(item=>{
                    exCardBList.push(item)
                })
                this.setData({
                    exCardBList:exCardBList,
                    all_paging:data.all_paging,
                    paging:paging
                })
            }
        },res=>{})
    },
    // 拨打电话
    callPhone() {
        var that = this;
        var unionid = wx.getStorageSync('thisCode');
        wx.makePhoneCall({
            phoneNumber: that.data.card_info.telephone //仅为示例，并非真实的电话号码
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
        let exCardBList = this.data.exCardBList;
        let all_paging = this.data.all_paging;
        let paging = this.data.paging;
        let card_info = this.data.card_info;
        if(all_paging <=paging){
            return
        }
        paging++;
        this.exCardBFn(paging,card_info.card_id)
    },
})