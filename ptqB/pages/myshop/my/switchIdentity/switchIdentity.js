// pages/my/identap/identap.js
var http = require('../../../../utils/http.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allSty: [],
        identFlageArr: [],
        allName: [{
            name: '客户(商城购物)',
            btn: 'cusBtn'
        }, {
            name: '商家',
            btn: 'shopBtn'
        }, {
            name: '渠道商',
            btn: 'gentBtn'
        }],
        imgUrl: http.imgUrl,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this;
        var allSty = that.data.allSty
        var unionid = wx.getStorageSync('thisCode') || options.unionid;
        http._post1('IdentityCut/index', { unionid: unionid }, res => {
            if (res.data.status == 1) {
                var upidentity = Number(res.data.upidentity);
                that.setData({
                    unionid: unionid
                })
                for (let i = 0; i < 4; i++) {
                    allSty[0] = ''
                }
                // allSty[upidentity - 1] = '1'
                allSty[1] = '1'
                that.setData({
                    allSty: allSty
                })
            }
        }, res => {})
    },
    // 点击进入
    allBtna(e) {
        var that = this;
        var index = Number(http.dataIndex(e)[0]);
        var unionid = wx.getStorageSync('thisCode');
        var store_id = wx.getStorageSync('store_id');
        var idenStr = index == 0 ? '客户' : index == 1 ? '商家' : index == 2 ? '渠道商' : '暂无身份';
      var idenNav = index == 0 ? 'index?store_id=' + store_id : index == 1 ? 'myshop/home/index' : index == 2 ? 'loading/identChang/identChang' : '暂无身份';
        var appid = index == 0 ? 'wxd25131b98741c7cb' : index == 2 ? 'wx6de5e3a338bc09e5' : 'wx429f42a870cd65c0';
        http.showModal1('是否切换到' + idenStr + '个人中心', true, () => {
            http._post1('IdentityCut/identity_verify', { upidentity: index + 1, unionid: unionid }, res => {
                var result = res.data
                if (index == 1) {
                    wx.reLaunch({
                        url: '/pages/' + idenNav,
                    })
                } else {
                    http.ToMiniProgram(appid,'/pages/' + idenNav,{})
                }
            }, res => {})
        }, () => {})
    },

})