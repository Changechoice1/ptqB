var http = require('../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        upidentity: 0,
        mobileinput: '',
        codeinput: '',
        codename: '获取验证码',
        second: 60,
        btntap: 'getCode',
        clickNum: 0,
        yzFlage: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var unionid = wx.getStorageSync('thisCode');
        this.setData({
            upidentity: Number(options.upidentity),
        });
    },

    mobileInput(input) { //手机号
        this.setData({
            mobileinput: Number(input.detail.value),
        });
    },
    codeInput(input) { //验证码
        this.setData({
            codeinput: input.detail.value,
        });
    },
    countdown(that) {
        var second = that.data.second;
        if (second == 0) {
            that.setData({
                codename: "获取验证码",
                btntap: 'getCode',
                second: 60,
            });
            return;
        }
        var time = setTimeout(() => {
            that.setData({
                codename: second - 1,
                second: second - 1,
                btntap: '',
            });
            that.countdown(that);
        }, 1000);
    },
    onShow() {
        var unionid = wx.getStorageSync('thisCode');
        http._post1('IdentityCut/is_binding_store', { unionid: unionid }, res => {
            let data = res.data;
            if (data.status == 102) {
                wx.reLaunch({
                    url: '/pages/loading/loading'
                })
            }
        }, res => {})
    },
    getCode() { //获取验证码
        var that = this;
        var unionid = wx.getStorageSync('thisCode');
        var telephone = that.data.mobileinput;
        var upidentity = that.data.upidentity;
        var yzFlage = that.data.yzFlage;
        if (yzFlage == 1) {
            http.showModal('请勿连续点击', false, () => {})
            return
        }
        that.setData({
            yzFlage: 1
        })
        if (!telephone) {
            wx.showToast({
                title: '请填写手机号',
                icon: 'success',
                duration: 1000,
            })
            that.setData({
                yzFlage: 0
            })
            return false;
        }
        http._post1('IdentityCut/send_code', {
            telephone: telephone,
            upidentity: upidentity,
            unionid: unionid
        }, res => {
            that.setData({
                yzFlage: 0
            })
            if (res.data.status == 1) {
                that.countdown(that);
            }
            http.showModal(res.data.info, false, () => {})
        }, res => {})
    },
    Submit() { //提交
        var that = this;
        var unionid = wx.getStorageSync('thisCode');
        var clickNum = that.data.clickNum
        if (clickNum == 1) {
            return;
        }
        that.setData({
            clickNum: 1
        })
        var telephone = that.data.mobileinput;
        var upidentity = that.data.upidentity;
        var code = that.data.codeinput;
        http._post1('IdentityCut/binding_do', {
            telephone: telephone,
            upidentity: upidentity,
            code: code,
            unionid: unionid
        }, res => {
            that.setData({
                clickNum: 0
            })
            var url = ''
            if (res.data.status == 1) {
              upidentity == 2 ? url = '/pages/myshop/home/index' : upidentity == 3 ? url = 'loading/identChang/identChang': '/pages/myshop/my/switchIdentity/switchIdentity';
              var appid = upidentity == 1 ? 'wxd25131b98741c7cb' : upidentity == 2 ? 'wx429f42a870cd65c0' : 'wx6de5e3a338bc09e5'; 
                if (upidentity == 2) {
                    wx.reLaunch({
                        url: url,
                    })
                    return
                }
                http.ToMiniProgram(appid, url, {})
            } else {
                http.showModal(res.data.info ? res.data.info : '绑定失败', false, () => {})
            }
        }, res => {})
    },

})