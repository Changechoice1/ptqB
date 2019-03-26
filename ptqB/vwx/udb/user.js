//用户基本信息
const user = {
   // 默认访问店铺ID
   get sid() {
      return wx.getStorageSync('store_id');
   },
   set sid(_val) {
      wx.setStorageSync('store_id', _val)
   },
   // 用户unionid
   get unid() {
      return wx.getStorageSync('unionid');
   },
   set unid(_val) {
      wx.setStorageSync('unionid', _val)
   },
   // 用户user_id
   get uid() {
      return wx.getStorageSync('user_id');
   },
   set uid(_val) {
      wx.setStorageSync('user_id', _val)
   }
}
module.exports = user
