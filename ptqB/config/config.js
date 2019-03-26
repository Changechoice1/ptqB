const config = {
   testDebug: true,
   get v() {
      return "3.6.11";
   },
   get host() {
      if (this.testDebug) {
        // return "https://pre.pintuanqu.cn";
        return "http://192.168.31.207:8080";
        // return "http://japi.ptq.com";
      } else {
         // 正式地址
         return "https://www.pintuanqu.cn";
      }
   },
   get ossHost(){
     return 'http://ptq.oss-cn-hangzhou.aliyuncs.com';
   },
    get imgUrl() {
      return this.host + "/Public/WeChatApps/image/";
    },
    get ossImgUrl(){
      return this.ossHost + '/ptq/merchant/';
    },
   // 请求数据配置 application/x-www-form-urlencoded
   req: {
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      data: {
        unionid: ''
      }
   },
   // 全局默认页面地址
   dPage: {
      index: "/pages/index/index"
   },
   dApi: {
      "/WeChatAppsCs/Member/index": true
   } 
}
module.exports = config