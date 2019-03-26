// babel的一些es6接口
const extend = Object.assign || function(target) {
   for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
         if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
         }
      }
   }
   return target;
};
const isObject = function(val) {
   return val != null && typeof val === 'object' && Array.isArray(val) === false;
};
if (!Array.isArray) {
   Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
   };
}
// 序列化反序列化法
const deepClone = function(obj) {
   return JSON.parse(JSON.stringify(obj))
}
const isEmpty = function(obj) {
   if (obj) {
      if (typeof obj == 'undefined' || obj == "" || Object.keys(obj).length == 0) {
         return true
      } else {
         return false;
      }
   } else {
      return true;
   }
}
module.exports = {
   extend,
   deepClone,
   isObject,
   isEmpty
};