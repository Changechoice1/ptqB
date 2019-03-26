var http = require('../../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checkedFlag: true,
        authenData: ['填写真实姓名、联系电话、身份证号并上传身份证正面、反面和店铺门头的清晰照。', '提交实名认证申请后，工作人员将在10个工作日内与您联系核对信息。']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this;
        var type = options.type || 1;
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreAuthentication/auth_process', {
            unionid: unionid,
        }, function (res) {
            var data = res.data;
            var data1 = []
            if (data.status == 1) {
                console.log(data)
                if (type == 1) {
                    data1 = data.info.personal_auth;
                } else if (type == 2) {
                    data1 = data.info.store_auth;
                }
                console.log(data1)
                that.setData({
                    authenData: data1,
                    type: type
                })
            }
        }, function (res) { })
    },
    nextPage: function (e) {
        var that = this;
        var type = that.data.type;
      var url = type == 1 ? '../personalCert/personalCert' : '../shopCert/shopCert';
        wx.redirectTo({
            url: url
        })
    },
    checkedBtn() {
        let checkedFlag = !this.data.checkedFlag;
        this.setData({ checkedFlag: checkedFlag })
    },
    // 点击前往
    navxy(){
        wx.navigateTo({
          url: '/pages/protocol/protocol?id=2',
        })
    },
    // 点击提醒
    seeXy() {
        http.showModal('请移步至公众号版本查看协议', false, () => { })
    },
    onReady() {

    },

    onShow() {

    }
})