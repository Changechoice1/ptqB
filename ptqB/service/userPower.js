// 获取A对象
import A from '../vwx/uset.js'

module.exports = {
   // 登录
   login(code, encryptedData, iv) {
      return this.getTData({
         url: '/WeChatAppsCs/Enter/store_login',
         data: {
            code: code,
            encryptedData: encryptedData,
            iv: iv,
            store_id: 0
         }
      })
   }
}