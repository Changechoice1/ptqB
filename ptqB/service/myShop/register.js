// 获取A对象
import A from '../../vwx/uset.js'

module.exports = {
  // 登录
  getInitData(regCode) {
    return this.getTData({ url: '/WeChatAppsCs/StoreRegister/before_register_store', data: { reg_code: regCode } })
  },
  // 选择省份
  getAddrData(id, provinceid, type){
    return this.getTData({ url: '/WeChatAppsCs/StoreRegister/get_area_list', data: { id: id, provinceid: provinceid, type: type } })
  },
  // 获取短信验证码
  getRegIdenCode(type, telephone){
    return this.getTData({ url: '/WeChatAppsCs/StoreRegister/send_code', data: { type: type, telephone: telephone } })
  },
  // 提交数据
  submitData(data){
    return this.getTData({ url: '/WeChatAppsCs/StoreRegister/new_register_store', data: data })
  }
}