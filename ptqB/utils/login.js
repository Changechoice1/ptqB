import config from '../config/config.js';
// 登录
function login(shopid){
  var shopid = shopid;
  wx.login({
    success: function (res) {
      var code = res.code;
      wx.getUserInfo({
        success: function(res) {
          var encryptedData = res.encryptedData;
          var iv = res.iv;
          wx.request({
            url: 'https://www.pintuanqu.cn/WeChatApps/Enter/login',
            data: {
              code: code,
              encryptedData :encryptedData,
              iv:iv,
              store_id:shopid,
            },
            header: { 'content-type': 'application/x-www-form-urlencoded'},
            method: 'POST',
            success: function (res) {
              
              if(!res.data.info){
                wx.showModal({
                  title: '提示',
                  content: '抱歉加载异常!请选取更好的网络或者删除本程序重新搜索进入',
                  showCancel:false,
                  success: function(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
                return;
              }
              var info = res.data.info;
              let shopids = info.store_id;
              let unionid = info.unionid
              wx.setStorageSync('thisCode', unionid)
              config.req.data.unionid = unionid;
              wx.setStorage({
                key:"thisCode",
                data:res.data.info.unionid,
                success:function(){
                  var unionid = wx.getStorageSync('thisCode');
                  if(!shopids&&!info.store_id){
                      console.log("无门店1")
                      wx.showModal({
                        title: '提示',
                        content: '无门店信息请进行身份切换',
                        showCancel:false,
                        success: function(res) {
                          if (res.confirm) {
                            wx.reLaunch({
                              url: '/pages/myshop/my/switchIdentity/switchIdentity?store_id='+shopids+"&unionid="+unionid,
                            })
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                          }
                        }
                      })
                      return;
                  }else if(res.data.status == 404){
                        wx.showModal({
                          title: '提示',
                          content: '服务器错误',
                          showCancel:false,
                          success: function(res) {
                            if (res.confirm) {
                              login(shopids)
                            } else if (res.cancel) {
                              console.log('用户点击取消')
                            }
                          }
                        })
                      }else if(Number(res.data.status) == 1){
                        if(Number(info.upidentity) == 0){
                          if(Number(info.store_id) ==0){
                            console.log("无门店2")
                            wx.showModal({
                              title: '提示',
                              content: '无门店,请到身份切换页面',
                              showCancel:false,
                              success: function(res) {
                                if (res.confirm) {
                                  wx.reLaunch({
                                    url: '/pages/myshop/my/switchIdentity/switchIdentity?store_id='+shopids+"&unionid="+unionid,
                                  })
                                } else if (res.cancel) {
                                  console.log('用户点击取消')
                                }
                              }
                            })
                          }else{
                            setTimeout(function(){
                              wx.reLaunch({
                                url: '../index/index?store_id='+shopids+"&unionid="+unionid,
                              })
                            },500) 
                          }
                        }else if(Number(info.upidentity) == 1){
                          if(Number(info.store_id) ==0){
                            console.log("无门店3")
                            wx.showModal({
                              title: '提示',
                              content: '无门店,请到身份切换页面',
                              showCancel:false,
                              success: function(res) {
                                if (res.confirm) {
                                  wx.reLaunch({
                                    url: '/pages/myshop/my/switchIdentity/switchIdentity'
                                  })
                                } else if (res.cancel) {
                                  console.log('用户点击取消')
                                }
                              }
                            })
                          }else{
                            setTimeout(function(){
                              wx.reLaunch({
                                url: '../index/index?store_id='+shopids+"&unionid="+unionid,
                              })
                            },600)
                          }
                        }else if(Number(info.upidentity) == 2){
                            setTimeout(function(){
                              wx.reLaunch({
                                url: '/pages/myshop/home/index?store_id='+shopids+"&unionid="+unionid,
                              })
                            },600)
                            
                        }else if(Number(info.upidentity) == 3){
                            setTimeout(function(){
                              wx.reLaunch({
                                url: '../myagent/myagent?store_id='+shopids+"&unionid="+unionid,
                              })
                            },600)
                          
                        }else if(Number(info.upidentity) == 4){
                          setTimeout(function(){
                            wx.reLaunch({
                              url: '../myarea/myarea?store_id='+shopids+"&unionid="+unionid,
                            })
                          },600)
                        }
                      }else if(res.data.status == 505) {
                        wx.showModal({
                          title: '提示',
                          content: '您的帐户被冻结',
                          showCancel:false,
                          success: function(res) {
                            if (res.confirm) {
                              login(shopids)
                            } else if (res.cancel) {
                              console.log('用户点击取消')
                            }
                          }
                        })
                      }
                    }
                  })
              },
            fail: function (res) {

            },
          })
        }
      })
    }
  });
  }
module.exports = {
  login: login
}
