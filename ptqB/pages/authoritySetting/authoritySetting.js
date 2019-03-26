var http = require('../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
const A = getApp();
Page(A.assignPage({
   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
      wx.getSetting({
         success(res) {
           if (!res.authSetting['scope.writePhotosAlbum']) {
             wx.authorize({
               scope: 'scope.writePhotosAlbum',
               success() {}
             })
           }
           if (!res.authSetting['scope.userLocation']) {
               wx.authorize({
                 scope: 'scope.userLocation',
                  success() {
                  }
               })
           }
           if (res.authSetting['scope.writePhotosAlbum'] && res.authSetting['scope.userLocation']){
             console.log(getCurrentPages().length);
             if (getCurrentPages().length > 1){
               wx.navigateBack({
                 delta: 1
               })
             }else{
               wx.reLaunch({
                  url: '/pages/loading/loading'
              })
             }
              
           }
         }
      })
      // wx.getLocation({
      //    type: 'wgs84',
      //    success: function (res) {
      //       var latitude = res.latitude
      //       var longitude = res.longitude
      //       if (!longitude || !latitude) {
      //          http.showModal('请先开启您手机的定位功能!', false, function () { })
      //       } else {
      //          wx.getSetting({
      //             success(res) {
      //                console.log(res)
      //                if (res.authSetting['scope.userInfo']) {
      //                   // wx.reLaunch({
      //                   //    url: '/pages/loading/loading'
      //                   // })
      //                }else {
      //                   http.showModal('抱歉！您还有必须授权信息未授权,请授权后进行操作!', false, function () {

      //                   })
      //                }
      //             }
      //          })
      //       }
      //    }
      // })

   },
   // 点击调起授权
   authorizeBtn: function () {
      wx.openSetting({
         success: (res) => {
         }
      })
   }
}))