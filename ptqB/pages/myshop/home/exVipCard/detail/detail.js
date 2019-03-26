var http = require('../../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: '1',
        imgUrl:http.imgUrl,
    },

    /**
     * 到购买详情
     */
    goBuyDetail(e) {
        let order_id = e.currentTarget.dataset.id
        wx.navigateTo({
          url: '../saleRecord/saleRecord?id=' + order_id,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let card_id = options.id || 0;
        this.setData({ card_id: card_id });
        this.cardInfoFn(card_id)
    },
    cardInfoFn(card_id) {
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreCard/card_info', {
            unionid: unionid,
            card_id: card_id
        }, res => {
            let data = res.data;
            if (data.status == 1) {
                let data = res.data;
                if (data.status == 1) {
                    this.setData({
                        cardInfo:data
                    })
                } else {
                    http.showModal(data.info, false, () => {})
                }
            } else {
                http.showModal(data.info, false, () => {})
            }
        }, res => {})
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
})