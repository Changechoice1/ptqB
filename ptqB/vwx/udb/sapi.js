// 接口版本信息
module.exports = {
   get v() {
      return wx.getStorageSync('api_version');
   },
   set v(_val) {
      wx.setStorageSync('api_version', _val)
   },
}