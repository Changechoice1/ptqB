// pages/Loading/Loading.js
const login = require('../../utils/login.js');
var http = require('../../utils/http.js')
var unionid = wx.getStorageSync('thisCode');
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        upidentity: {},
        clickPm: false,
        aa: 0,
        sceneFlage: true,
        imgUrl:http.imgUrl
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(option) {
        var that = this;
        var unionid = wx.getStorageSync('thisCode');
        var regcode = option.regcode || 0;
        var store_id = option.store_id || 0;
        var sharepage = option.sharepage || 0;
        var group_id = option.group_id || 0;
        var goods_id = option.goods_id || 0;
        
        let nowSDKVersion = wx.getSystemInfoSync().SDKVersion;
        if (http.compareVersion(nowSDKVersion, '1.4.0') == -1) {
            http.showModal('您的微信基础版本库过低，请升级微信或使用原版微信进行体验！', false, () => {
                wx.redirectTo({
                  url: '/pages/loading/instruction/instruction'
                })
            })
            return
        }
        if (unionid) {
            this.obtainIdentFn()
        } else {
            this.navUserPower()
        }
        this.setData({store_id:store_id,onLoadF:1})
    },
    // 点击获取用户信息
    userInfo(e) {
        var unionid = wx.getStorageSync('thisCode');
        let store_id = this.data.store_id || 0;
        let nowSDKVersion = wx.getSystemInfoSync().SDKVersion;
        if (http.compareVersion(nowSDKVersion, '1.4.0') == -1) {
            http.showModal('您的微信基础版本库过低，请升级微信或使用原版微信进行体验！', false, () => {
                wx.redirectTo({
                  url: '/pages/loading/instruction/instruction'
                })
            })
            return
        }
        if (unionid) {
            this.obtainIdentFn()
        } else {
            this.navUserPower()
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow(option) {
        var that = this;
        var unionid = wx.getStorageSync('thisCode');
        var store_id = that.data.store_id || 0;
        let nowSDKVersion = wx.getSystemInfoSync().SDKVersion;
        if (http.compareVersion(nowSDKVersion, '1.4.0') == -1) {
            http.showModal('您的微信基础版本库过低，请升级微信或使用原版微信进行体验！', false, () => {
                wx.redirectTo({
                  url: '/pages/loading/instruction/instruction'
                })
            })
            return
        }
        var timer1 = setTimeout(() => {
            http.showModal('检测您登录时间过长,推荐点击屏幕重新获取授权登录状态', false, () => {})
        }, 5000)
        that.setData({
            timer1: timer1
        })
        if(this.data.onLoadF==1 || !this.data.onLoadF){
            this.setData({
                onLoadF:2
            })
            return
        }

        if (unionid) {
            this.obtainIdentFn()
        } else {
            this.navUserPower()
        }
    },
    // 获取身份信息
    obtainIdentFn(){
        var unionid = wx.getStorageSync('thisCode');
        http._post1('Enter/identity',{unionid:unionid},res=>{
            let data = res.data;
            if(data.status == 1){
                this.navIndexGo(data.upidentity)
            }else{
                http.showModal(data.info,false,()=>{})
            }
        },res=>{})
    },
    navIndexGo(upidentity){
        setTimeout(()=>{
            wx.reLaunch({
                url: '/pages/myshop/home/index',
            })
        },300)
    },
    navUserPower(){
        wx.reLaunch({
            url: '/pages/userPower/userPower',
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        clearTimeout(this.data.timer1)
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        clearTimeout(this.data.timer1)
    },

})