//app.js
import {
  vwx
} from '/vwx/index.js'
import config from '/config/config.js'
import exta from '/common/exta';
import {
  DF,
  STATE
} from '/config/define.js'
import store from '/udb/store/index.js'
import DB from '/udb/DB/index.js'
import webservice from '/service/webservice.js'
import validate from '/common/validate.js'
import Appinit from '/common/appinit.js';
let optAuth = {};
// 注册App，vwx初始化数据
App(vwx({
  config,
  exta,
  store,
  DB,
  DF,
  STATE,
  webservice,
  validate,
  onLaunch: function () {},
  onShow: function () {
    // 自动更新
    Appinit.updateManager();
    this.config.req.data.unionid = wx.getStorageSync('thisCode');

    // 监听网络情况
    Appinit.network().then(res => {
      // 用户登录授权情况
      Appinit.user().then(res => {

      })
    });
  },
  onError: function(err) {
    let currentPages = getCurrentPages();
    let currentPage = currentPages[currentPages.length - 1];
    let url = currentPage.route;
    let opts = currentPage.options;
    url += '?'
    for (let key in opts) {
      url += key + '=' + opts[key];
    }
    if (url[url.length - 1] == '?') {
      url = url.slice(0, url.length - 1);
    }

    wx.request({
      url: 'https://clog.pintuanqu.cn:91/log/add',
      method: 'POST',
      data: {
        url: url,
        unid: this.DB.user.unid,
        src: 3,
        content: err
      }
    })
  },
  modelHide(that) {
    that.setData({
      notMData: {
        show: false,
      }
    })
  }
}));