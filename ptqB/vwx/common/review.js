// 接口是否需要更新状态
const A = require('../uset.js');
const apis = {};
const _o = {
   setApi(_val, _st) {
      apis[_val] = typeof (_st) != "undefined" ? _st : true;
   },
   api(_val) {
      return typeof (apis[_val]) == "undefined" ? true : apis[_val];
   },
   init(_keys) {
      if (typeof (_keys) == "string") {
         if (A.DB.category.selector(_keys)) apis[_keys] = false;
      } else {
         for (let k in _keys) {
            if (A.DB.category.selector(k)) apis[k] = _keys[k];
         }
      }
   }
};
module.exports = _o
