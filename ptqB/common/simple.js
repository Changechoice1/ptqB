const CONF = require('../config/config.js');
// 页面操作权限
const optAuth = {
  noAuthObj: {}
};
// 根据权限设置页面
const setAuth = function () {
  let pages = getCurrentPages();
  let currentPage = pages[pages.length - 1].route;
  if (optAuth.noAuthObj[currentPage] && optAuth.noAuthObj[currentPage] == 1) {
    return false;
  } else {
    return true;
  }
};
// 选择图片
const chooseMultiImage = function (_obj) {
  return new Promise(function (resolve, reject) {
    wx.chooseImage({
      count: _obj.count || 1, // 数量
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        resolve(res.tempFilePaths);
      },
      fail: (err) => {
        reject(err);
      }
    })
  });
}
// 上传图片
const uploadFile1 = function(_obj){
  if (typeof _obj.url != "undefined") {
    // 拼接url
    if (_obj.url.indexOf('http://') == -1 && _obj.url.indexOf('https://') == -1) {
      _obj.url = CONF.host + _obj.url;
    }
  }
  return new Promise(function(resolve, reject){
    wx.uploadFile({
      url: _obj.url,
      filePath: _obj.filePath,
      name: _obj.name || 'fileData',
      formData: _obj.formData || {},
      success: function(res){
        resolve(res);
      },
      fail: function(err){
        reject(err)
      }
    })
  })
}
// 剩余时间对象，天、小时、分钟、秒
const rtime = function(_t) {
   return {
      d: parseInt(_t / 86400),
      h: parseInt(_t % 86400 / 3600),
      m: parseInt(_t % 86400 % 3600 / 60),
      s: parseInt(_t % 86400 % 3600 % 60)
   };
}
// 定时器,id唯一标识，字符串类型
const ids = {};
const _setInterval = function(_id, _fun, _time) {
   let time = _time || 1000;
   let count = 0;
   if (ids[_id]) {
      clearInterval(ids[_id]);
      delete ids[_id];
   }
   let call = function() {
      try {
         count++;
         _fun({
            count
         })
      } catch (error) {
         clearInterval(ids[_id]);
      }
   }
   ids[_id] = setInterval(call, time)
}
const _clearInterval = function(_id) {
   if (ids[_id]) clearInterval(ids[_id]);
}
const getParentPage = _index => {
   _index = (_index || _index == 0) ? _index : 1;
   let pages = getCurrentPages();
   if (pages.length > 1) {
      return pages[pages.length - _index - 1];
   } else {
      return pages[0];
   }
}
const urlParams = function(val) {
   let str = "";
   for (let key in val) {
      str += "&" + key + "=" + val[key];
   }
   return str.slice(1);
}
const goPrower = function() {
   let page = getParentPage(0);
   let purl = "";
   if (page.route) {
      purl = encodeURIComponent("/" + page.route + "?" + urlParams(page.options));
      wx.redirectTo({
         url: "/pages/userPower/userPower?page=" + purl
      });
   } else {
      // 用户初次进入后的跳转
      setTimeout(() => {
         purl = encodeURIComponent("/" + page.route + "?" + urlParams(page.options));
         wx.redirectTo({
            url: "/pages/userPower/userPower?page=" + purl
         });
      }, 1)
   }
}
// 表单验证
const inputRegs = {
  Tel: /^(1[0-9]*)*$/, // 手机号
  Phone: /^([0-9][\-]{0,1}[0-9]*)*$/, // 座机号
  TelAPhone: /^([0-9][\-]{0,1}[0-9]*)*$/, // 手机号/座机号；座机号
  IDCard: /^[0-9]*[X]{0,1}$/, // 身份证号

  Cha0: /^([A-Za-z\u4E00-\u9FA5\uf900-\ufa2d]*)$/, // 中文，英文
  Cha1: /^([0-9\u4E00-\u9FA5\uf900-\ufa2d]*)$/, // 中文，数字
  Cha2: /^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d]*)$/, // 中文，英文，数字
  Cha3: /^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d，,。.；;？\?：:、“”\"‘’'><\+\-\*\/／=（）\(\)\{\}【】\[\]%#\!！\|&￥\$]*)$/, // 中文，英文，数字，部分特殊字符
  Cha4: /^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d，,。.；;？\?：:、“”\"‘’'><\+\-\*\/=（）\(\){}%#！\|&￥\$]*)$/, // 中文，英文，数字，部分特殊字符，但不包含【】[]
}
const blurRegs = {
  Tel: /^1[0-9]{10}$/, // 手机号
  Phone: /^(\d{3,4}-)?(\d{7,8})$/, //座机号
  TelAPhone: /(^(\d{3,4}-)?(\d{7,8})$)|(^1[0-9]{10}$)/, // 手机号/座机号
  IDCard: {
    test(_val) {
      var city = {
        11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
        21: "辽宁", 22: "吉林", 23: "黑龙江 ",
        31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
        41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
        50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ",
        61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
        71: "台湾",
        81: "香港", 82: "澳门",
        91: "国外 "
      };
      var pass = true;
      if (!_val || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(_val)) {
        tip = "身份证号格式错误";
        pass = false;
      } else if (!city[_val.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
      } else {
        //18位身份证需要验证最后一位校验位
        if (_val.length == 18) {
          _val = _val.split('');
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = _val[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != _val[17]) {
            tip = "校验位错误";
            pass = false;
          }
        }
      }
      return pass;
    }, // 身份证号
  }
}
const formInput = function(e){
  let ds = e.currentTarget.dataset
  let val = e.detail.value
  let retVal = false
  if (ds.pattern) {
    let reg = inputRegs[ds.pattern] || ds.pattern
    let res;
    res = reg.test(val);
    let len = getChaLength(val)
    let maxLen = ds.maxlen;
    if (res && len <= maxLen) {
      retVal = val;
    }
  } else {
    retVal = val;
  }
  return val;
}
const endFormInput = function(e){
  let ds = e.currentTarget.dataset;
  let val = e.detail.value;
  if (blurRegs[ds.pattern]) {
    return blurRegs[ds.pattern].test(val);
  } else {
    var len = getChaLength(val);
    return ds.minlen <= len
  }
}
const getChaLength = function(str){
  let len = str.replace(/[\u4E00-\u9FA5\uf900-\ufa2d]/g, "11").length;
  return len;
}

module.exports = {
   optAuth, setAuth,
   chooseMultiImage, uploadFile1,
   goPrower,
   rtime,
   setInterval: _setInterval,
   clearInterval: _clearInterval,
   formInput, endFormInput, getChaLength
}