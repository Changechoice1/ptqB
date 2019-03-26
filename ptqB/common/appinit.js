import A from '../vwx/uset.js'
// 检查更新应用
const updateManager = function () {
  return new Promise((resolve, reject) => {
    console.log(wx.canIUse('getUpdateManager'));
    if(wx.canIUse('getUpdateManager')){
      const updateManager = wx.getUpdateManager()

      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log('hasUpdate:' + res.hasUpdate)
      })

      updateManager.onUpdateReady(function () {
        A.showBaseModal('新版本已经准备好，是否重启应用？', (res) => {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        })
      })

      updateManager.onUpdateFailed(function () {
        // 新版本下载失败
        A.showTipModal('新版本下载失败，请删除小程序并重启');
      })
    }
  })
}
// 网络情况处理
const network = function() {
   return new Promise((resolve, reject) => {
      wx.getNetworkType({
         success: (res) => {
            if (res.networkType == "none") {
               wx.showModal({
                  showCancel: false,
                  content: '网络不正常'
               })
            }else{
               resolve()
            }
         }
      })

      // 监听网络情况
      wx.onNetworkStatusChange((res) => {
         if (!res.isConnected) {
            wx.showModal({
               showCancel: false,
               content: '网络不正常'
            })
         }
      });
   })
}
const user = function() {
   return new Promise((resolve, reject) => {
      if (A.user.unid != "") {
         A.config.req.data.unionid = A.user.unid;
      } else {
        console.log('goPrower');
         A.goPrower();
      }
   });
}
module.exports = {
  updateManager,
   network,
   user
};