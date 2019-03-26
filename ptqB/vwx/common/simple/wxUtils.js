import getParentPage from './getParentPage.js'
// 全局App对象
var A = {};
// 设置当前模块全局A对象
const setSimpleApp = function(_app) {
   A = _app;
}
// 获取当前页面组件
const selectComponent = function(id) {
   return getParentPage(0).selectComponent(id);
}

//微信小程序登录,获取code
const wxLogin = _obj => {
   return new Promise(function(resolve, reject) {
      wx.login({
         success: res => {
            if (res.code) {
               resolve(res.code);
               // ...........从服务端验证获取token
            } else {
               reject(res);
            }
         },
         fail: res => {
            reject(res);
         }
      })
   });
}

// 选择图片
const chooseImage = function() {
   return new Promise(function(resolve, reject) {
      wx.chooseImage({
         count: 1, // 数量
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

// 上传文件
// _obj:{name:"服务端key",filePath:"文件路径"}
const upFile = _obj => {
   return new Promise(function(resolve, reject) {
      var _o = {
         url: A.config.host + A.config.uApi.upImage, //仅为示例，非真实的接口地址
         filePath: "",
         //  header: {
         //     "token": user.token
         //  },
         name: 'tmp_name',
         success: (res) => {
            // var data = JSON.parse(res.data);
            resolve(res);
         },
         fail: (err) => {
            reject(err);
         }
      };
      // 合并传入的参数对象
      Object.assign(_o, _obj);
      wx.uploadFile(_o);
   });
}
const sendSMS = _mobile => {
   return new Promise(function (resolve, reject) {
      A.R({
         url: A.config.uApi.sms,
         data: {
            mobile: _mobile
         },
         success: r => {
            resolve(r.data);
         },
         fail: r => {
            reject(r.data);
         }
      })
   });
}
module.exports = {
   setSimpleApp,
   upFile,
   chooseImage,
   selectComponent,
   getParentPage,
   wxLogin,
   sendSMS
}