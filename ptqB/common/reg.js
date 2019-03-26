/**
 * 正则表达式
 */
// 手机号
let CellPhone = function (str) {
  const reg = /^[1][0-9]{10}$/;
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
}
// 邮箱
let Email = function (str) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
}
// 真实姓名
let RealName = function (str) {
  const reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
}
// 安全密码真实姓名
let RealNameSecurePassword = function (str) {
  const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
} 
// 昵称
let NickName = function (str) {
  // const reg = /^[\u4E00-\u9FA5A-Za-z][\w\u4E00-\u9FA5A-Za-z0-9_-]{3-15}$/; 
  const reg = /^[\u4e00-\u9fa5a-zA-Z][\w\u4e00-\u9fa5]{3,15}$/;
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
}
// 是否包含中文
let HasChines = function (str) {
  if (escape(str).indexOf("%u") < 0) {
    return false;
  } else {
    return true;
  }
}
// 身份证
let IDCard = function (str){
  var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
  var tip = "";
  var pass = true;
  if (!str || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)) {
    tip = "身份证号格式错误";
    pass = false;
  } else if (!city[str.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (str.length == 18) {
      str = str.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = str[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != str[17]) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }
  return pass;
}
module.exports = { CellPhone, Email, RealName, RealNameSecurePassword, NickName, HasChines, IDCard };