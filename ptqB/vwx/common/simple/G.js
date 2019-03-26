//跳转处理
// 重写微信页面跳转方法，用于同一业务处理
const G = (_url, _reviewPage) => {

   var _uArr = _url.split("://");
   if (_uArr.length > 1) {
      switch (_uArr[0]) {
         case "navigateTo":
            wx.navigateTo({
               url: _uArr[1]
            });
            break;
         case "redirectTo":
            wx.redirectTo({
               url: _uArr[1]
            });
            break;
         case "switchTab":
            wx.switchTab({
               url: _uArr[1]
            });
            break;
         case "reLaunch":
            wx.reLaunch({
               url: _uArr[1]
            });
            break;
         case "navigateBack":
            // 获取打开中的所有页面
            let pages = getCurrentPages();
            if (pages.length > 1) {
               if (_reviewPage) {
                  pages[pages.length - 2].setData({
                     ReviewPage: true
                  });
               }
            }
            wx.navigateBack({
               delta: _uArr[1]
            });
            break;
         default:
            wx.redirectTo({
               url: _uArr[1]
            });
      }
   } else {
      wx.navigateTo({
         url: _uArr[0]
      })
   }
}
module.exports = G;