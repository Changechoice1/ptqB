var http = require('../../../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        staffData: [],
        imgUrl: http.imgUrl,
        nullData: {
            img: http.imgUrl + 'active_none.png',
            txt: '暂无可添加员工'
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.staffDataFn();
    },
    // 获取员工的所有信息
    staffDataFn() {
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreStaff/add_staff_list', { unionid: unionid }, res => {
            let data = res.data;
            if (data.status == 1) {
                this.setData({
                    staffData: data.staff_list
                })

            } else {
                http.showModal(data.info, false, () => {})
            }
        }, res => {})
    },
    staffJoinBtn(e) {
        let id = http.dataIndex(e)[1];
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreStaff/add_staff', {
            unionid: unionid,
            account_id: id
        }, res => {
            let data = res.data;
            if (data.status == 1) {
                this.staffDataFn()
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

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    }
})