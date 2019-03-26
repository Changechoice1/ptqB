import simple from './common/simple.js';
import exta from '../common/exta.js';
var A = null;
// 输出扩展对象
const _exp = {
   set A(_val) {
      A = _val;
   },
   get config() {
      return A.config;
   },
   get DB() {
      return A.DB;
   },
   get STATE() {
      return A.STATE;
   },
   get DF() {
      return A.DF;
   },
   get updata() {
      return A.updata;
   }
}
const _exts = Object.assign({}, simple, exta);
// 添加扩展属性
for (let key in _exts) {
   Object.defineProperties(_exp, {
      [key]: {
         get() {
            if (A[key]) {
               return A[key];
            } else {
               return _exts[key];
            }
         },
         set() {
            return false;
         }
      }
   })
}

module.exports = _exp