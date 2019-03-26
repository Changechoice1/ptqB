var http = require('../../../../utils/http.js')
var unionid = wx.getStorageSync('thisCode')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        authData: {
            store_logo: '',
            store_name: '加载中...',
            is_authentication: 0
        },
        poolArr1: [
            {
                textZh: '“逛逛”频道展示',
                textEn: 'Exclusive certification mark',
            }, {
                textZh: '提现次数增至2次/日',
                textEn: 'Withdrawal ascension',
            }, 
            // {
            //     textZh: '员工提成功能',
            //     textEn: 'Business alliance functions',
            // },
            {
                textZh: '自主核销功能',
                textEn: 'Platform activity',
            }, 
            // {
            //     textZh: '群发功能',
            //     textEn: 'Mass function',
            // }, 
            // {
            //     textZh: '商家联盟功能',
            //     textEn: '',
            // }, 
            {
                textZh: '专享卡到账更快捷',
                textEn: '',
            }, {
                textZh: '参加平台活动',
                textEn: '',
            }, {
                textZh: '专属认证标记',
                textEn: '',
            }, {
                textZh: '更多专享功能',
                textEn: '',
            }
        ],
        imgUrl: http.imgUrl,
        authShopTx: '立即实名注册享受更多特权服务',
    },

    onLoad(options) {

    },

    onReady() {

    },

    onShow() {
        var that = this;
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreAuthentication/authentication', {
            unionid: unionid
        }, function (res) {
          console.log(res);
            var data = res.data;
            if (data.status == 1) {
                var authData = data.info;
                that.setData({ authData: authData })
                console.log(authData);
                if (authData.is_authentication == 1) {
                    http._post1('StoreAuthentication/achieve', { unionid: unionid }, function (res) {
                        var data = res.data;
                        if (data.status == 1) {
                            that.setData({
                                timeData: data
                            })
                        }
                    }, function (res) { })
                }
            } else {
                http.showModal(data.info, false, function () { })
            }
        }, function (res) { })
    },

    onPullDownRefresh() {

    },
    // 跳转到文字
    textNav(e) {
        var type = http.dataIndex(e)[2]
        wx.navigateTo({
          url: 'tip/tip?type=' + type
        })
    },
    // 点击重新认证
    againBtn(e) {
        var that = this;
        var type = http.dataIndex(e)[2];
        var id = http.dataIndex(e)[1];
        if (type == 1) {
            wx.navigateTo({
              url: 'personalCert/personalCert?id=' + id + "&AuditF=1"
            })
        } else if (type == 2) {
            wx.navigateTo({
              url: 'shopCert/shopCert?id=' + id + "&AuditF=1"
            })
        }
    },
    // 前往认证页面
    navGoBtn() {
        var that = this;
        var unionid = wx.getStorageSync('thisCode');
        var authData = that.data.authData;
        var is_authentication = authData.is_authentication
        if (is_authentication == 0) {
            return
        }
        wx.navigateTo({
          url: 'certResult/certResult?is_authentication=' + is_authentication + '&AuditF=1'
        })
    },
})