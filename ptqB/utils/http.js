import Validate from '../common/validate.js'
import config from '../config/config.js';
var http = config.host
var http2 = config.host;
var httptest = config.host;
var imgUrl = config.host + "/Public/WeChatApps/image/"
var QQMapKey = "PE2BZ-SADWX-2AF4T-75BJV-NKHT2-A5BVL"

// 网络错误提示
function cwtx() {
  showModal('网络错误,请重新登陆!', false, () => {
    wx.reLaunch({
      url: '/pages/loading/loading'
    })
  })
}

// 600错误提示
function cwtx1(res) {
  wx.showModal({
    title: '提示',
    content: res.data.info,
    showCancel: false,
    confirmText: "重新登陆",
    complete() {
      wx.reLaunch({
        url: '/pages/loading/loading'
      })
    }
  })
}

function showModal(cont, flag, fn) {
  wx.showModal({
    title: '提示',
    content: cont || '数据获取失败！',
    showCancel: flag,
    success(res) {
      if (res.confirm) {

      } else if (res.cancel) {
      }
    },
    complete() {
      fn()
      wx.hideLoading()
    }
  })
}

function showModal1(cont, flag, fn, fn1) {
  wx.showModal({
    title: '温馨提示',
    content: cont,
    showCancel: flag,
    success(res) {
      if (res.confirm) {
        fn()
      } else if (res.cancel) {
        fn1()
      }
    },
    complete() {
      wx.hideLoading()
    }
  })
}

function showModal2(cont, flag, fn, fn1) {
  wx.showModal({
    title: '温馨提示',
    content: cont,
    showCancel: flag,
    success(res) {
      if (res.confirm) {
        fn()
      } else if (res.cancel) {
        fn1()
      }
    },
  })
}

function showModalShop(cont, fn) {
  wx.showModal({
    title: '温馨提示',
    content: cont,
    showCancel: true,
    confirmText: "进入店铺",
    success(res) {
      if (res.confirm) {
        fn()
      } else if (res.cancel) {

      }
    },
    complete() {
      wx.hideLoading()
    }
  })
}

// 传统POST请求
function _post(url, data, success, fail) {
  // 拼接url
  if (!(/^(http:\/\/)|^(https:\/\/)/g.test(url))) url = http + url;
  url = url + "?v=" + config.v.split('.')[0];
  wx.request({
    url: url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data: data,
    success(res) {
      success(res)
    },
    fail(res) {
      fail(res)
    }
  })
}

// 带头部请求
function _post1(url, data, success, fail) {
  // 拼接url
  if (!(/^(http:\/\/)|^(https:\/\/)/g.test(url))) url = http + '/WeChatAppsCs/' + url;
  url = url + "?v=" + config.v.split('.')[0];
  wx.request({
    url: url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data: data,
    success(res) {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      if (!res.data.status && res.data.status != 0) {
        cwtx()
        return
      } else if (res.data.status == 600) {
        cwtx1(res)
        return
      } else if (res.data.status == 12) {
        showModal(res.data.info, false, () => {
          wx.reLaunch({
            url: '/pages/myshop/home/index'
          })
        })
        return
      } else if (res.data.status == 233) {
        showModal('请前往绑定', false, () => {
          wx.reLaunch({
            url: '/pages/login/login?upidentity=2'
          })
        })
        return
      } else if (res.data.status == 333) {
        showModal('您的商家身份已被禁用', false, () => {
          wx.reLaunch({
            url: '/pages/login/login?upidentity=2'
          })
        })
        return
      } else if (res.data.status == 505) {
        wx.reLaunch({
          url: '/pages/userPower/userPower'
        })
        return
      }
      success(res)
    },
    fail(res) {
      fail(res)
    }
  })
}
function _post1Cs(url, data, success, fail) {
  // 拼接url
  if (!(/^(http:\/\/)|^(https:\/\/)/g.test(url))) url = http2 + '/WeChatAppsCs/' + url;
  url = url + "?v=" + config.v.split('.')[0];
  wx.request({
    url: url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data: data,
    success(res) {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log(res.data)
      if (!res.data.status && res.data.status != 0) {
        cwtx()
        return
      } else if (res.data.status == 600) {
        cwtx1(res)
        return
      } else if (res.data.status == 12) {
        showModal(res.data.info, false, () => {
          wx.reLaunch({
            url: '/pages/myshop/home/index'
          })
        })
        return
      } else if (res.data.status == 233) {
        showModal('请前往绑定', false, () => {
          wx.reLaunch({
            url: '/pages/login/login?upidentity=2'
          })
        })
        return
      } else if (res.data.status == 333) {
        showModal('您的商家身份已被禁用', false, () => {
          wx.reLaunch({
            url: '/pages/login/login?upidentity=2'
          })
        })
        return
      }
      success(res)
    },
    fail(res) {
      fail(res)
    }
  })
}
// 带头部请求
function _post2(url, data, success, fail) {
  // 拼接url
  if (!(/^(http:\/\/)|^(https:\/\/)/g.test(url))) url = http + '/WeChatAppsCs/' + url;
  url = url + "?v=" + config.v.split('.')[0];
  wx.request({
    url: http + '/WeChatAppsCs/' + url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data: data,
    success(res) {
      wx.stopPullDownRefresh()
      console.log(res.data)
      if (!res.data.status && res.data.status != 0) {
        cwtx()
        return
      } else if (res.data.status == 600) {
        cwtx1(res)
        return
      } else if (res.data.status == 12) {
        showModal(res.data.info, false, () => {
          wx.reLaunch({
            url: '/pages/loading/loading'
          })
        })
        return
      }
      success(res)
    },
    fail(res) {
      fail(res)
    }
  })
}

function loginFn(store_id, fn) {
  let nowSDKVersion = wx.getSystemInfoSync().SDKVersion
  if (compareVersion(nowSDKVersion, '1.4.0') == -1) {
    showModal('您的微信基础版本库过低，请升级微信或使用原版微信进行体验！', false, () => {
      wx.redirectTo({
        url: '/pages/loading/instruction/instruction'
      })
    })
    return
  }
  wx.login({
    success(res) {
      var code = res.code
      wx.getUserInfo({
        success(res) {
          var encryptedData = res.encryptedData
          var iv = res.iv
          wx.request({
            url: 'https://www.pintuanqu.cn/WeChatAppsCs/Enter/store_login',
            data: {
              code: code,
              encryptedData: encryptedData,
              iv: iv,
              store_id: store_id
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            success(res) {
              wx.hideLoading()
              let data = res.data;
              if (store_id && store_id != 0) {
                return
              } else if (res.data.status == 1) {
                let unionid = res.data.info.unionid;
                wx.setStorageSync('store_id', store_id);
                wx.setStorageSync('thisCode', unionid);
                config.req.data.unionid = unionid;
                let upidentity = res.data.info.upidentity;
                fn(unionid, res, upidentity);
              } else {
                showModal(data.info, false, () => { })
              }

            }
          })
        },
        fail(res) {
          wx.reLaunch({
            url: '/pages/authoritySetting/authoritySetting'
          })
        },
      })
    }
  })
}

function baseLogin(fn) {
  wx.login({
    success(res) {
      var code = res.code
      wx.getUserInfo({
        success(res) {
          var encryptedData = res.encryptedData
          var iv = res.iv
          fn(encryptedData, code, iv)
        },
        fail(res) {
          wx.reLaunch({
            url: '/pages/authoritySetting/authoritySetting'
          })
        },
      })
    }
  })
}

// 获取data-index 属性
function dataIndex(e) {
  var g = e.currentTarget.dataset.url;
  var f = e.currentTarget.dataset.alldata;
  var a = e.currentTarget.dataset.index;
  var b = e.currentTarget.dataset.id;
  var d = e.currentTarget.dataset.type;
  var e = e.currentTarget.dataset.name;

  var c = [a, b, d, e, f, g]
  return c
}

// 图片去空格输出
function imgSup(arr) {
  var cc = []
  for (let k in arr) {
    let aa = arr[k].replace(/[\r\n]/g, "")
    let bb = aa.replace("https://pintuanqu.oss-cn-hangzhou.aliyuncs.com", "")
    cc.push(bb)
  }
  return cc
}

function upImgAllSuccss(res, formData, success) {
  var upImgBoxArr = res.tempFilePaths
  var imgarr = []
  for (var j in upImgBoxArr) {
    if (upImgBoxArr[j] && res.tempFiles[j].size > 0) {
      if (res.tempFiles[j].size > 2097152) {
        http.showModal('有图片已超过2MB,您可以选择压缩图片以后重新上传', false, () => { })
        continue
      }
      var turnsImgUrl = wx.uploadFile({
        url: http + '/WeChatAppsCs/StoreGoods/upload_goods_image',
        filePath: upImgBoxArr[j],
        name: 'fileData',//这里根据自己的实际情况改
        herder: { 'content-type': 'multipart/form-data;' },
        formData: formData,
        success: (resp) => {
          success(resp)
        },
        fail: (err) => {
          this.showModal('有图片上传失败，请重新上传！', false, () => { })
        }
      })
    } else {
      this.showModal('有图片上传失败，请重新上传！', false, () => { })
      continue;
    }
  }
}

function upImgAllSuccssAll(res, formData, success, url) {
  var upImgBoxArr = res.tempFilePaths
  var imgarr = []
  for (var j in upImgBoxArr) {
    if (upImgBoxArr[j] && res.tempFiles[j].size > 0) {
      wx.hideLoading()
      if (res.tempFiles[j].size > 2097152) {
        http.showModal('有图片已超过2MB,您可以选择压缩图片以后重新上传', false, () => { })
        continue
      }
      var turnsImgUrl = wx.uploadFile({
        url: http + '/WeChatAppsCs/' + url,
        filePath: upImgBoxArr[j],
        name: 'fileData',//这里根据自己的实际情况改  
        herder: { 'content-type': 'multipart/form-data;' },
        formData: formData,
        success: (resp) => {
          success(resp)
        },
        fail: (err) => {
          this.showModal('有图片上传失败，请重新上传！', false, () => { })
        }
      })
    } else {
      this.showModal('有图片上传失败，请重新上传！', false, () => { })
      continue;
    }
  }
}

// 图片上传的封装
function upImgAll(imgArr, success, num) {
  var num = num || 9
  if (imgArr.length >= num) {
    showModal('最多上传' + num + '张图片，请删除图片后继续上传', false, () => { })
    return
  }
  wx.chooseImage({
    count: num - Number(imgArr.length), // 默认9
    sizeType: ['original', 'compressed'],
    sourceType: ['album'],
    success(res) {
      success(res)
    },
  })
}

// 基础图片上传封装
function oneImg(success) {
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      success(res)
    },
  })
}

// 推出身份的接口
function quitBtn(event, upidentity, url, tip) {
  //  var ident = Number(event.currentTarget.dataset.ident);
  var unionid = wx.getStorageSync('thisCode');
  var url = url || 'IdentityCut/quit_identity';
  var txt = tip || '是否确认退出';
  showModal1(txt, true, () => {
    _post1(url, { upidentity: upidentity, unionid: unionid }, function (res) {
      if (res.data.status == 1) {
        wx.reLaunch({
          url: '/pages/loading/loading'
        })
      } else if (res.data.status == 600) {
        showModal(res.data.info, false, () => {
          wx.reLaunch({
            url: '/pages/loading/loading'
          })
        })
      } else {
        showModal(res.data.info, false, () => { })
      }
    }, function (res) { })
  }, () => { })
}

// 扫描二维码进入对应界面
function ewmBtn() {
  wx.scanCode({
    success: (res) => {
      var path = res.path
      console.log(path)
      if (!path) {
        showModal('此二维码不属于内部二维码,请扫描本程序的二维码', false, () => { })
        return
      }
      var path1 = path.substring(22)
      console.log(path1)
      var path2 = path1.substring(0, 5)
      var code_type
      // 判断是否是b类接口
      console.log(path2)
      if (path2 == "scene") {
        var scene = path1.substring(6)
        var sceneArr = scene.split("-")
        for (let i = 0; i < sceneArr.length; i += 2) {
          if (sceneArr[i] == "code_type") {
            code_type = sceneArr[i + 1]
          }
        }
        console.log(code_type)
        if (code_type == 4) {
          wx.reLaunch({
            url: '../../' + path
          })
        }
      } else if (path2 == "code_") {
        var options = path1
        // console.log(options)
        wx.reLaunch({
          url: '../../' + path
        })
      } else if (path2 == "store") {
        wx.reLaunch({
          url: '../../' + path
        })
      } else {
        wx.reLaunch({
          url: '../../' + path
        })
      }
    }
  })
}

// 检测移动状态的封装
function moveFn(e, touchDotY, touchDot, time, fn, fn1, flag) {
  let touchMove = e.touches[0].pageX
  let touchMoveY = e.touches[0].pageY
  // 检测是否点击以后上下滑动//清空时间数据
  if (Number(touchDotY) - Number(touchMoveY) > 15 || Number(touchDotY) - Number(touchMoveY) < -15) {
    time = 0
    return
  }
  //向左滑动
  if (touchMove - touchDot <= -60 && !flag && time >= 2) {
    fn()
  }
  //向右滑动
  if (touchMove - touchDot >= 60 && !flag && time >= 2) {
    fn1()
  }
}
// 清空数组判断对象
function forC(arr) {
  for (let i in arr) {
    arr[i] = ''
  }
  return arr
}
// 输入正则
let regArr = {
  Tel: /^(1[0-9]*)*$/, // 手机号
  Phone: /^([0-9][\-]{0,1}[0-9]*)*$/, // 座机号
  TelAPhone: /^([0-9][\-]{0,1}[0-9]*)*$/, // 手机号/座机号；座机号
  IDCard: /^[0-9]*[X]{0,1}$/, // 身份证号

  Cha0: /^([A-Za-z\u4E00-\u9FA5\uf900-\ufa2d]*)$/, // 中文，英文
  Cha1: /^([0-9\u4E00-\u9FA5\uf900-\ufa2d]*)$/, // 中文，数字
  Cha2: /^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d]*)$/, // 中文，英文，数字
  Cha3: /^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d，,。.；;？\?：:、“”\"‘’'><\+\-\*\/／=（）\(\)\{\}【】\[\]%#\!！\|&￥\$]*)$/, // 中文，英文，数字，部分特殊字符
  Cha4: /^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d，,。.；;？\?：:、“”\"‘’'><\+\-\*\/=（）\(\){}%#！\|&￥\$]*)$/, // 中文，英文，数字，部分特殊字符，但不包含【】[]
};
let endRegArr = {
  Tel: /^1[0-9]{10}$/, // 手机号
  Phone: /^(\d{3,4}-)?(\d{7,8})$/, //座机号
  TelAPhone: /(^(\d{3,4}-)?(\d{7,8})$)|(^1[0-9]{10}$)/, // 手机号/座机号
  IDCard: {
    test(_val) {
      var city = {
        11: "北京",12: "天津",13: "河北",14: "山西",15: "内蒙古",
        21: "辽宁",22: "吉林",23: "黑龙江 ",
        31: "上海",32: "江苏",33: "浙江",34: "安徽",35: "福建",36: "江西",37: "山东",
        41: "河南",42: "湖北 ",43: "湖南",44: "广东",45: "广西",46: "海南",
        50: "重庆",51: "四川",52: "贵州",53: "云南",54: "西藏 ",
        61: "陕西",62: "甘肃",63: "青海",64: "宁夏",65: "新疆",
        71: "台湾",
        81: "香港",82: "澳门",
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
// 获取input框里面所有的数据
function inputArr(arr, e) {
  var ds = e.currentTarget.dataset
  var index = dataIndex(e)[0]
  var a = arr
  var b = e.detail.value
  if (ds.pattern) {
    var reg = regArr[ds.pattern] || ds.pattern
    var res;
    res = reg.test(b);
    var len = getCharacterLen(b)
    var maxLen = ds.maxlen;
    if (res && len <= maxLen) {
      a[index] = b
    }
  }else{
    a[index] = b
  }
  return a
}
// 表单失焦验证
function endInputArr(e) {
  let ds = e.currentTarget.dataset;
  let val = e.detail.value;
  if (endRegArr[ds.pattern]){
    return endRegArr[ds.pattern].test(val);
  }else{
    var len = getCharacterLen(val);
    return ds.minlen <= len
  }
}
// 计算字符长度：一个中文相当于两个字符
let getCharacterLen = (str) => {
  let len = str.replace(/[\u4E00-\u9FA5\uf900-\ufa2d]/g, "11").length;
  return len;
}

// 正则匹配方法的封装
function rexFn(str) {
  // 手机的正则匹配
  var rex1 = /^1\d{10}$/
  // 身份证正则匹配
  var rex2 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  // 汉字匹配
  // var rex3 = /^[\u4e00-\u9fa5]+$/
  // 姓名验证
  var rex3 = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
  var falgArr = []
  if (rex1.test(str)) {
    falgArr[0] = 1
  } else if (rex2.test(str)) {
    falgArr[1] = 1
  } else if (rex3.test(str)) {
    falgArr[2] = 1
  }
  return falgArr
}
// 如果为空返回空
function inputUn(arr, num) {
  for (var i = 0; i < num; i++) {
    !arr[i] ? arr[i] = '' : arr[i] = arr[i]
  }
  return arr
}
// 支付的封装
function payFn(data, fn, fn2) {
  var payT = data
  wx.requestPayment({
    'timeStamp': payT.timeStamp,
    'nonceStr': payT.nonceStr,
    'package': payT.package,
    'signType': 'MD5',
    'paySign': payT.paySign,
    'success'(res) {
      fn(res)
    },
    'fail'(res) {
      fn2(res)
    }
  })
}
// 数字隐私处理
const passStrat = num => {
  var newTel = []
  for (let i = 0; i < num.length; i++) {
    let aa = num.substring(i, i + 1)
    if (i >= 3 && i <= 7) {
      aa = '*'
    }
    newTel.push(aa)
  }
  var newTelS = newTel.join("")
  return newTelS
}
// 版本比较

function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  var len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}
function canClick(num, arr) {
  let aa = 0
  for (let i = 0; i < num; i++) {
    if (arr[i]) {
      aa++
    }
  }
  return aa == num ? true : false
}
// 跳转小程序
function ToMiniProgram(appId, path, data) {
  wx.navigateToMiniProgram({
    appId: appId,
    path: path,
    extraData: data,
    envVersion: 'release',
    success: function (res) {
      console.log(res)
    }
  })
}
// 身份证验证
function IdentityCodeValid(code) {
  var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
  var tip = "";
  var pass = true;
  console.log(code)
  if (!code || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
    tip = "身份证号格式错误";
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }

  return [pass, tip];
}
module.exports = {
  http,
  httptest,
  QQMapKey,
  showModal,
  _post,
  _post1,
  _post2,
  showModal1,
  showModal2,
  loginFn,
  dataIndex,
  imgSup,
  upImgAll,
  upImgAllSuccss,
  quitBtn,
  ewmBtn,
  cwtx1,
  cwtx,
  baseLogin,
  oneImg,
  forC,
  moveFn,
  inputArr,
  endInputArr,
  rexFn,
  upImgAllSuccssAll,
  inputUn,
  imgUrl,
  payFn,
  passStrat,
  showModalShop,
  compareVersion,
  canClick,
  ToMiniProgram,
  _post1Cs,
  IdentityCodeValid
}
