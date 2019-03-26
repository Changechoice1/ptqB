const A = require('../../../../../vwx/uset.js');
let rate;
// 获取页面宽度/375
let getRate = function(){
  let sysInfo;
  wx.getSystemInfo({
    success: function (res) { sysInfo = res }
  })
  let screenWidth = sysInfo.screenWidth;
  rate = screenWidth / 375;
  return rate;
}
// 下载图片
let downloadImg = function (payQrImgInfo){
  return new Promise(function(resolve, reject){
    let count = 0;
    let arr = ['logo', 'logo1', 'qrImg'];
    for (let i = 0; i < arr.length; i++) {
      if (payQrImgInfo[arr[i]]) {
        if (payQrImgInfo[arr[i]].indexOf('wxfile://tmp') > -1){
          count++;
        }else{
          wx.downloadFile({
            url: payQrImgInfo[arr[i]],
            success: function (res) {
              if (res.statusCode == 200) {
                count++;
                payQrImgInfo[arr[i]] = res.tempFilePath;
              }
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      }
    }
    var interval = setInterval(() => {
      if (count == arr.length) {
        clearInterval(interval);
        resolve(payQrImgInfo);
      }
    }, 100)
  })
}
// 下载图片
let downLoad = function(){
  
}
// 绘制canvas
let drawCanvas = function (data) {
  return new Promise((resolve, reject) => {
    getRate();
    var ctx = wx.createCanvasContext('payQrImgCanvas');
    

    /**
     * canvas盒子
     */
    ctx.save();
    ctx.beginPath();
    A.CANVAS.drawRoundRect(ctx, 0, 0, 310 * rate, 380 * rate, 10 * rate, [1, 1, 0, 0]);
    ctx.clip();

    /**
     * banner
     */
    // 背景渐变色
    ctx.beginPath();
    const gradient = ctx.createLinearGradient(-rate, -rate, -rate, 101 * rate);
    gradient.addColorStop(0, '#ff1426');
    gradient.addColorStop(1, '#fe1b50');
    ctx.setFillStyle(gradient);
    ctx.fillRect(0, 0, 312 * rate, 101 * rate);

    ctx.restore();

    // 左侧商家信息
    ctx.beginPath();
    ctx.arc(98 * rate, 26 * rate, 17 * rate, 0, Math.PI * 2);
    ctx.setFillStyle('rgba(255, 255, 255, .6)');
    ctx.fill();
    ctx.save();
    ctx.beginPath();
    ctx.arc(98 * rate, 26 * rate, 15 * rate, 0, Math.PI * 2);
    ctx.fill();
    ctx.clip();
    ctx.setFillStyle('rgba(255, 255, 255, 1)');
    ctx.drawImage(data.logo, 83 * rate, 11 * rate, 30 * rate, 30 * rate);
    ctx.restore();
    ctx.setTextAlign('center');
    ctx.setFontSize(12 * rate);
    ctx.setFillStyle('#ffffff');
    ctx.fillText(data.name, 98 * rate, 59 * rate);
    // 中间 ×
    ctx.beginPath();
    ctx.moveTo(148 * rate, 19 * rate);
    ctx.lineTo(162.5 * rate, 33 * rate);
    ctx.setLineWidth(2);
    ctx.setStrokeStyle('#ffffff');
    ctx.stroke();
    ctx.moveTo(148.5 * rate, 33 * rate);
    ctx.lineTo(162.5 * rate, 19 * rate);
    ctx.setLineWidth(2);
    ctx.setStrokeStyle('#ffffff');
    ctx.stroke();
    // 右侧平台信息
    ctx.beginPath();
    ctx.arc(211 * rate, 26 * rate, 17 * rate, 0, Math.PI * 2);
    ctx.setFillStyle('rgba(255, 255, 255, .6)');
    ctx.fill();
    ctx.save();
    ctx.beginPath();
    ctx.arc(211.5 * rate, 26 * rate, 15 * rate, 0, Math.PI * 2);
    ctx.fill();
    ctx.clip();
    ctx.setFillStyle('rgba(255, 255, 255, 1)');
    ctx.drawImage(data.logo1, 196 * rate, 11 * rate, 30 * rate, 30 * rate);
    ctx.restore();
    ctx.setTextAlign('center');
    ctx.setFontSize(12 * rate);
    ctx.setFillStyle('#ffffff');
    ctx.fillText(data.name1, 211 * rate, 59 * rate);
    ctx.beginPath();
    ctx.setTextAlign('center');
    ctx.setFontSize(16 * rate);
    ctx.setFillStyle('#FFD450');
    ctx.fillText(data.title, 153.5 * rate, 88 * rate);
    /**
     * 二维码
     */
    ctx.beginPath();
    ctx.drawImage(data.qrImg, 67 * rate, 135 * rate, 177 * rate, 177 * rate);
    ctx.setTextAlign('center');
    ctx.setFontSize(16 * rate);
    ctx.setFillStyle('#222222');
    ctx.fillText(data.text, 153.5 * rate, 346 * rate);

    ctx.draw(false, function () {
      wx.hideLoading();
      resolve();
    });
  })
}

// 保存支付二维码图片
let savePayQrImg = function(that) {
  let _that = that, _d = _that.data;
  return new Promise(function(resolve, reject){
    wx.getSystemInfo({
      complete: function (res) {
        if(res.version == '6.6.6'){
          A.showTipModal('您的微信版本过低，请升级至最新版本微信后再保存支付二维码图片！', () => {
            wx.hideLoading();
            _that.hidePayQrImg();
            _d.btn.hideLoading();
          });
        }else{
          wx.canvasToTempFilePath({
            canvasId: 'payQrImgCanvas',
            success: function (res) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: res => {
                  _that.hidePayQrImg();
                  A.showTipModal(A.DF.MSG.saveImgOk, function () {
                    resolve(res);
                  })
                },
                fail(res) {
                  wx.getSetting({
                    success(res) {
                      if (!res.authSetting['scope.writePhotosAlbum']) {
                        _that.setData({ payQrImgFlag: false });
                        A.showBaseModal(A.DF.MSG.saveImgAuth, () => {
                          A.G("/pages/authoritySetting/authoritySetting");
                        }, () => {
                          _that.setData({ payQrImgFlag: true });
                        })
                      }
                    }
                  })
                },
                complete() {
                  wx.hideLoading()
                }
              })
            },
            complete: function () {
              _d.btn.hideLoading();
            }
          });
        }
      }
    })
  })
}

module.exports = {
  getRate,
  downloadImg,
  drawCanvas,
  savePayQrImg
}