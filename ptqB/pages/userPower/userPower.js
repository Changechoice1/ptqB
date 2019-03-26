var http = require('../../utils/http.js');
import config from '../../config/config.js'
var unionid = wx.getStorageSync('thisCode');
Page({

   /**
    * 页面的初始数据
    */
   data: {
     pageUrl: '',
      code: ""
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     if(options.page){
       this.setData({ pageUrl: options.page })
     }
      var store_id = options.store_id || 0;
      let entry = options.entry || 0;
      this.setData({
         store_id: store_id,
         entry: entry
      });
      this.wxlogin();
   },
   wxlogin() {
      wx.login({
         success: (res) => {
            this.setData({
               code: res.code
            });
         },
         fail(res) {
            wx.showModal({
               content: '需要用户权限',
               success: function(res) {
                  wx.reLaunch({
                    url: '/pages/authoritySetting/authoritySetting'
                  })
               }
            })
         }
      });
   },
   userDataBtn(e) {
      var unionid = wx.getStorageSync('thisCode');
      let store_id = this.data.store_id;
      let nowSDKVersion = wx.getSystemInfoSync().SDKVersion;

      if (http.compareVersion(nowSDKVersion, '1.6.8') == -1) {
         wx.showModal({
           content: '您的微信基础版本库过低，请升级微信或使用原版微信进行体验！',
           showCancel: false,
           success: function(){
             wx.redirectTo({
               url: '/pages/loading/instruction/instruction'
             })
           }
         })
         return
      }
      var encryptedData = e.detail.encryptedData;
      var iv = e.detail.iv;
      var code = this.data.code;
      wx.showLoading({
         title: '授权登录中.'
      })
      http._post1('Enter/store_login', {
         code: code,
         encryptedData: encryptedData,
         iv: iv,
         store_id: store_id
      }, res => {
         let data = res.data;
         if (store_id && store_id != 0) {
            wx.setStorageSync('store_id', store_id)
         }
         if (data.status == 1) {
            let unionid = res.data.info.unionid;
            wx.setStorageSync('store_id', store_id);
            wx.setStorageSync('thisCode', unionid);

            config.req.data.unionid = unionid;

            if (this.data.pageUrl) {
               wx.reLaunch({
                 url: decodeURIComponent(this.data.pageUrl),
               })
            } else {
               wx.reLaunch({
                  url: '/pages/loading/loading',
               })
            }
            wx.hideLoading()

         } else {
            wx.hideLoading()
            wx.showModal({
               content: '授权失败'
            })
            this.wxlogin();
         }
      }, err => {
         wx.hideLoading()
         let er = err;
         if (typeof err !== 'string') {
            er = JSON.stringify(err);
         }
         wx.showModal({
            content: er
         })
         this.wxlogin();
      })
   }
})