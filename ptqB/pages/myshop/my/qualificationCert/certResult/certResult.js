var http = require('../../../../../utils/http.js')
var unionid = wx.getStorageSync('thisCode')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        payYearArr: ['支付认证年费', '认证审核', '认证成功'],
        payAll1: ['', '', ''],
        imgUrl: http.imgUrl
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        var payAll1 = ['1', '', '']
        console.log('debug', options)
        var is_authentication = options.is_authentication || 0
        var auth_id = options.auth_id || 0
        var unionid = wx.getStorageSync('thisCode')
        if (is_authentication == 1) {
            payAll1[2] = "1"
            http._post1('StoreAuthentication/achieve', { unionid: unionid }, res => {
                var data = res.data
                if (data.status == 1) {
                    that.setData({
                        timeData: data
                    })
                }
            }, res => { })
        } else if (is_authentication == 2) {
            payAll1[1] = "1"
        } else if (is_authentication == 0) {
            payAll1[0] = "1"
        }
        that.setData({ auth_id: auth_id, is_authentication: is_authentication, payAll1: payAll1 })
    },

    onReady() {

    },
    // 点击返回首页
    backHome() {
        wx.navigateBack({ delta: 1 })
    },
    onShow() {

    },
    // 点击支付
    payMoneyBtn() {
        var that = this
        var payAll1 = that.data.payAll1
        var auth_id = that.data.auth_id
        var unionid = wx.getStorageSync('thisCode')
        http._post1('StoreAuthentication/auth_pay_do', {
            unionid: unionid,
            auth_id: auth_id
        }, res => {
            var data = res.data
            var jsA = data.jsApiParameters
            wx.requestPayment({
                'timeStamp': jsA.timeStamp,
                'nonceStr': jsA.nonceStr,
                'package': jsA.package,
                'signType': 'MD5',
                'paySign': jsA.paySign,
                'success'(res) {
                    that.setData({
                        payAll1: ['', '1', '']
                    })
                },
                'fail'(res) {
                }
            })
        }, res => { })
    },

    onPullDownRefresh() {

    },
})