// 常用数字、字符串、日期、数据对象、等处理方法
// 格式化时间
const dateFormat = (_val, _fmt) => {
   var _fmt = _fmt || "YYYY-MM-DD";
   var fDate = new Date();
   if (typeof _val == "number" || typeof _val == "string") {
      //秒补充为微秒
      _val = (parseInt(_val) < 10000000000) ? parseInt(_val) * 1000 : parseInt(_val);
      fDate = new Date(_val);
   } else if (_val instanceof Date) {
      fDate = _val;
   }
   var o = {
      "M+": fDate.getMonth() + 1, //月份 
      "D+": fDate.getDate(), //日 
      "h+": fDate.getHours(), //小时 
      "m+": fDate.getMinutes(), //分 
      "s+": fDate.getSeconds(), //秒 
      "q+": Math.floor((fDate.getMonth() + 3) / 3), //季度 
      "S": fDate.getMilliseconds() //毫秒 
   };
   if (/(Y+)/.test(_fmt)) {
      _fmt = _fmt.replace(RegExp.$1, (fDate.getFullYear() + "").substr(4 - RegExp.$1.length));
   }
   for (var k in o) {
      if (new RegExp("(" + k + ")").test(_fmt)) {
         _fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
   }
   return _fmt;
}

// base64数据处理
const formatData = {
   // 字符串转为ArrayBuffer数据对象
   STB(_str) {
      var out = new ArrayBuffer(_str.length);
      var u16a = new Uint8Array(out);
      var strs = _str.split("");
      for (let i = 0; i < strs.length; i++) {
         u16a[i] = strs[i].charCodeAt();
      }
      return u16a;
   },
   // ArrayBuffer数据对象转字符串
   BTS(_buf) {
      var out = "";
      var u8 = new Uint8Array(_buf);
      for (let i = 0; i < u8.length; i++) {
         out += String.fromCharCode(u8[i]);
      }
      return out;
   },
   // 字符串转base64
   stringToBase64(_str) {
      return wx.arrayBufferToBase64(formatData.STB(_str));
   },
   // base64转字符串
   base64ToString(_str) {
      return formatData.BTS(wx.base64ToArrayBuffer(_str));
   }
}
module.exports = {
   dateFormat,
   formatData
}