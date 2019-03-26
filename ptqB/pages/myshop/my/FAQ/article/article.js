var http = require('../../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
var WxParse = require('../../../../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        artInfo: {},
        messInfo:0,
        imgUrl:http.imgUrl,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let id = options.id;
        let urlInfo = 'StoreSchool/articleDetail'
        if(options.messInfo==1){
            urlInfo = 'StoreMessage/messageDetail'
            this.setData({messInfo:options.messInfo})
        }
        var unionid = wx.getStorageSync('thisCode');
        this.setData({ artId: id })
        http._post1(urlInfo, { article_id: id, unionid: unionid }, res => {
            let data = res.data;
            if (data.status == 1) {
                WxParse.wxParse('article' , 'html', data.list.content, this, 0)
                this.setData({
                    artInfo: data.list
                })
                // 阅读增加
                if(options.messInfo!=1){
                    this.addNumFn(1,id)
                }
            }
        }, res => {})
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    // 增加阅读/点赞/分享的函数
    addNumFn(type,id){
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreSchool/articleOperate', { unionid, unionid, type: type, article_id: id }, res => {
            let data = res.data
            if (data.status == 1) {

            }
        }, res => {})
    },
    // 点击赞一下
    clickZanBtn(){
        var unionid = wx.getStorageSync('thisCode');
        let artId = this.data.artId;
        let artInfo = this.data.artInfo;
        http._post1('StoreSchool/articleOperate', { unionid, unionid, type: 0, article_id: artId }, res => {
            let data = res.data
            if (data.status == 1) {
                artInfo.like_num = Number(artInfo.like_num)+1;
                this.setData({artInfo})
            }else{
                http.showModal('每人只有一次点赞的机会呦~',false,()=>{})
            }
        }, res => {})
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        let artInfo = this.data.artInfo;
        let artId = this.data.artId;
        return {
            title: artInfo.theme,
            path: '/pages/myshop/storeLearn/articleInfo/articleInfo?id='+artId,
            success: res=> {
            },
            fail: res=> {
                // 转发失败
            }
        }
    }
})