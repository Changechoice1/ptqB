
// APP常用配置
const config = require('./config/config.js');
// 全局状态数据
const store = require('./udb/store.js');
// 本地存储数据
const DB = require('./udb/DB.js');
// 网络数据通信
const updata = require('./common/updata.js');
// 页面更新方法处理
const review = require('./common/review.js');
// APP常用方法接口
const simple = require('./common/simple.js');
// APP方法，Page页面通用配置
const assign = require('./common/assign.js');
// APP授权处理
const _aoz = require('./common/authorize.js');
// 验证正则表达式
const _regexp = require('./common/validate/regexp.js');

const { DF, STATE } = require('./config/define.js');
// 模块用户配置引用
const uset = require('./uset.js');
var A = null;
const _app = {
   onLaunch: function () {
      A = this;
      this.uset.A = this;
      this.setSimpleApp(this);
      this.__onLaunch();
   },
   __onLaunch: function () { },
   uset, config, DB, DF, STATE, store, updata, review, ...simple, ...assign
};
const vwx = function (_options) {
   // 基础配置，必须项
   if (!_options.config) return false;
   _app.config = Object.assign({}, _app.config, _options.config);
   // DB本地存储数据
   if (_options.DB) {
      _app.DB = Object.assign({}, _app.DB, _options.DB);
      delete _options.DB;
   }
   // 请求扩展
   if (_options.webservice) {
      _app.updata = Object.assign({}, _app.updata, _options.webservice);
   }
   // 全局状态数据
   if (_options.store) {
      _app.store.setState(_options.store);
      delete _options.store;
   }
   // 应用初始化方法if(_optons.)
   if (_options.onLaunch) {
      _app.__onLaunch = _options.onLaunch;
      delete _options.onLaunch;
   }
   // 应用初始化方法if(_optons.)
   if (_options.validate) {
      _regexp.exp = _options.validate;
      delete _options.validate;
   }
   // 外部自定义扩展方法
   if (_options.exta) {
      let ks = Object.getOwnPropertyNames(_options);
      let keys = Object.getOwnPropertyNames(_app);
      keys = Array.from(new Set([...ks, ...keys, ...['onLaunch', 'onShow', 'onHide', 'onError', 'onPageNotFound']]));
      for (let k in _options.exta) {
         if (keys.find((val) => val == k))
            delete _options.exta[k];
      }
      Object.assign(_app, _options.exta);
      delete _options.exta;
   }
   return Object.assign({}, _app, _options)
};
const getApp = function () {
   return A;
}
module.exports = { vwx, getApp }