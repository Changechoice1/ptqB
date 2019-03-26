// 网络请求处理，通用合并数据与微信个性化处理
// 方法在应用运行后有效
// 全局App对象
var A = {};
// 设置当前模块全局A对象
const setSimpleApp = function(_app) {
   A = _app;
}
//发起网络请求
const R = _obj => {
   if (typeof _obj.url != "undefined") {
      // 拼接url
      if (!(/^(http:\/\/)|^(https:\/\/)/g.test(_obj.url))) _obj.url = A.config.host + _obj.url;
      if (A.config.v) _obj.url = _obj.url + "?v=" + A.config.v.split('.')[0];
      _obj["_fail"] = err => {}
      // 获取success方法并处理
      if (typeof _obj.success != "undefined") {
         _obj["_success"] = _obj.success;
         delete _obj.success;
      }
      // 获取fail方法并处理
      if (typeof _obj.fail != "undefined") {
         _obj["_fail"] = _obj.fail;
         delete _obj.fail;
      }
      // 默认参数设置
      let _defObj = {
         url: A.config.host,
         method: "POST",
         header: {},
         success: res => {
            if (res.statusCode == 200) {
               _defObj._success(res.data);
            }
         },
         fail: err => {
            wx.hideLoading();
            _defObj._fail(err);
         }
      }
      // 配置覆盖
      if (typeof A.config.req != 'undefined') {
         // 将默认配置传参扩展至传入对象
         if (typeof A.config.req.data != 'undefined') {
            _obj.data = Object.assign({}, A.config.req.data, _obj.data);
         }
         // 请求覆盖
         Object.assign(_defObj, A.config.req);
      }
      // 合并传入的参数对象
      Object.assign(_defObj, _obj);
      // 提交数据
      wx.request(_defObj);
   }
}
//发起网络请求，返回promise 对象
const RS = _url => {
   return new Promise(function(resolve, reject) {
      let _object = {
         url: _url,
         method: "POST",
         data: {},
         success: res => {
           if (!res.status && res.status != A.STATE.STATUS.ERROR) {
             wx.hideLoading();
             A.showTipModal(res.info || A.DF.MSG.RES_NULL, () => {
               A.goPrower();
             })
             return
           } else if (res.status == A.STATE.STATUS.ERROR) { // 0
             resolve(res);
             A.showTipModal(res.info)
             return
           } else if (res.status == A.STATE.STATUS.TOKEN) { // 600
             wx.hideLoading();
             A.showModal({
               content: A.DF.MSG.RES_600,
               showCancel: false,
               confirmText: '重新登录',
               success: A.goPrower
             })
             return
           } else if (res.status == 12) {
             wx.hideLoading();
             A.showTipModal(res.info, () => {
               A.G('reLaunch:///pages/myshop/myshop')
             })
             return
           } else if (res.status == A.STATE.STATUS.IDEN) { // 233
             wx.hideLoading();
             A.showTipModal(res.info || A.DF.MSG.RES_233, () => {
               A.G('reLaunch:///pages/login/login?upidentity=2')
             })
             return
           } else if (res.status == A.STATE.STATUS.DISABLED) { // 333
             wx.hideLoading();
             A.showTipModal(res.info || A.DF.MSG.RES_333, () => {
               A.G('reLaunch:////pages/login/login?upidentity=2')
             })
             return
           } else if (res.status == A.STATE.STATUS.AUTH) { // 505
             A.goPrower();
             return;
           } else {
             resolve(res);
           }
         },
         fail: r => {
           wx.hideLoading();
           reject(r);
         }
      };
      if (typeof(_url) == "object") {
         if (_url['data']) _url['data'] = Object.assign(_object.data, _url['data']);
         Object.assign(_object, _url);
      }
      R(_object);
   });
}
module.exports = {
   R,
   RS,
   setSimpleApp
}