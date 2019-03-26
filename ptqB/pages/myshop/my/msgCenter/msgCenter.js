// pages/myshop/infocenter/infocenter.js
var http = require('../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: http.imgUrl,
        paging: 1,
        nullData: {
            img: http.imgUrl + 'active_none.png',
            txt: '暂时没有消息'
        }
    },

    //  到消息详情
    toDetail(e) {
        let id = http.dataIndex(e)[1];
        console.log(id)
        wx.navigateTo({
            url: '../FAQ/article/article?id='+id+'&messInfo=1',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.messFn(1)
    },
    messFn(paging) {
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreMessage/messageList', { unionid: unionid, paging: paging || 1 }, res => {
            let data = res.data;
            if (data.status == 1) {
                let messData = this.data.messData || { list: [] }
                data.list.find(item => {
                    messData.list.push(item)
                })
                this.setData({
                    messData: messData,
                    paging: paging,
                    all_paging: data.total_page
                })
            } else {
                http.showMoadel(data.info, false, () => {})
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

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        let paging = this.data.paging
        let all_paging = this.data.all_paging
        if (all_paging <= paging) {
            return
        }
        paging++
        this.messFn(paging)
    }
})