// pages/myshop/qrcode/rqcode.js
var unionid = wx.getStorageSync('thisCode')
var http = require('../../../../utils/http.js')
var https = require('../../../../utils/http.js').http
var saveCan;//保存图片定时器
const A = getApp();
Page(A.assignPage({

    /**
     * 页面的初始数据
     */
    data: {
        nav: '0',
        imgUrl: http.imgUrl,
			rate:1,//屏幕比例
			canvsH:667,
			canvsW: 375, 
			showCanvas:false
    },

    // 修改导航
    changeNav(e) {
        this.setData({
            nav: e.target.dataset.nav
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
			var store_logo = wx.getStorageSync("store_logo")
			that.setData({ store_logo: store_logo })
			wx.getSystemInfo({
				success: function (res) {
					let rate = res.screenWidth / 750;
					let canvsW = res.screenWidth / 750 * 620;
					let canvsH = rate * 934;
					let mt = 95 * rate;
					that.setData({ rate: rate, canvsW: canvsW, canvsH: canvsH, mt: mt })
				},
			})
        var unionid = wx.getStorageSync('thisCode');
        http._post1('Store/qr_code', { unionid: unionid }, res => {
            var data = res.data;
            if (data.status == 1) {
                wx.setNavigationBarTitle({
                    title: data.info.store_name + '店铺的二维码'
                })
                that.setData({
                    ewmData: data.info
                })
							
            } else {
                http.showModal(data.info, false, () => { })
            }
        }, res => { })
			
			
    },
		shareBtn(){
			var that = this
			var url = ''
			if(that.data.nav == 1){
				url = that.data.ewmData.qr_code_url
			}else{
				url = that.data.ewmData.ticket_code.qr_code_url
			}
			this.drawShare(that.data.nav + 1, url, that.data.store_logo)
		},
	showCan(){
		this.setData({
			showCanvas:true
		})
	},
	hideCan(){
		this.setData({
			showCanvas: false
		})
	},
	drawShare(type,url,storeimg){
		var that = this;
		var hintText = '';
		if(type == 1){//关注店铺
			hintText = '扫描二维码先关注再进入我的店铺'
		} else {//直接访问店铺
			hintText = '扫描二维码进入我的店铺'
		}
		var urlArr = ['https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/wxxcx/imgStore.png',url, storeimg];
		var localUrlArr = []
		//获取图片本地路径
		for(let i=0;i<urlArr.length;i++){
			wx.getImageInfo({
				src: urlArr[i],
				success(res){
					localUrlArr[i] = res.path
					console.log(urlArr[i])
					console.log(localUrlArr[i])
					if (localUrlArr[0] && localUrlArr[1] && localUrlArr[2]){
						var ctx = wx.createCanvasContext('storeShare')
						let rate = that.data.rate;

						ctx.beginPath();
						// 背景顶部
						ctx.drawImage(localUrlArr[0], 0, 0, that.data.canvsW, 200 * rate)
						//拼团趣图标
						ctx.drawImage('/images/sh3_ico21.png', 20 * rate, 20 * rate, 135 * rate, 40 * rate)
						ctx.save()
						ctx.arc(that.data.canvsW/2,74 * rate,44*rate,0,2*Math.PI)
						ctx.setStrokeStyle('#ffffff');
						ctx.stroke();
						ctx.clip();
						//头像
						ctx.drawImage(localUrlArr[2], that.data.canvsW / 2 - 42 * rate, 30 * rate, 88* rate, 88 * rate)
						ctx.restore()
						ctx.closePath()
						ctx.beginPath()
						ctx.setFontSize(32 * rate);
						ctx.setFillStyle('#ffffff');
						ctx.setTextAlign('center')
						ctx.fillText(that.data.ewmData.store_name, that.data.canvsW / 2, 165 * rate, that.data.canvsW)
						ctx.rect(0, 200 * rate, that.data.canvsW, 562 * rate)
						ctx.setFillStyle('#ffffff');
						ctx.fill();
						//二维码
						ctx.drawImage(localUrlArr[1], 150 * rate, 288 * rate, 320 * rate, 320 * rate);
						ctx.setFontSize(30 * rate);
						ctx.setFillStyle('#333333');
						ctx.setTextAlign('center')
						ctx.fillText(hintText, that.data.canvsW / 2, 700 * rate, that.data.canvsW)
						ctx.moveTo(0, 761 * rate)
						ctx.lineTo(that.data.canvsW, 761 * rate)
						ctx.setStrokeStyle('#EEEEEE');
						ctx.stroke();
						ctx.closePath();
						ctx.draw(false,()=>{
							wx.showLoading({
								title: '保存中...',
							})
							let canvasW = Number(that.data.canvasW);
							let canvasH = Number(that.data.canvasH);
							wx.canvasToTempFilePath({
								x: 0,
								y: 0,
								width: canvasW,
								height: canvasH,
								canvasId: 'storeShare',
								fileType: 'png',
								success: res => {
									let img = res.tempFilePath;
									wx.saveImageToPhotosAlbum({
										filePath: img,
										success: res => {
											wx.showModal({
												title: '温馨提示',
												content: A.DF.MSG.SAVEIMGSUCESS,
												showCancel: false,
												success: res => {
													that.setData({
														showCanvas: false
													})
												}
											})
										},
										fail(res) {
											wx.getSetting({
												success(res) {
													if (!res.authSetting['scope.writePhotosAlbum']) {
														that.setData({ showModals: 1 })
														A.showTipModal('是否前往开启保存图片权限?', () => { //是否前往开启保存图片权限?
															A.G("reLaunch:///pages/authoritySetting/authoritySetting");
															that.setData({ showModals: 0 })
														})
													}
												}
											})
										},
										complete() {
											wx.hideLoading()
										}
									})
								}
							})
						});
					}
				}
			})
		}
		
	
	},
    seeImgUrl(e) {
        let url = http.dataIndex(e)[2];
        wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: [url] // 需要预览的图片http链接列表
        })
    },
    // 点击跳转到店铺详情
    navStore() {
        var that = this;
        var ewmData = that.data.ewmData
        wx.reLaunch({
            url: '/pages/index/index?store_id=' + ewmData.store_id
        })
    },
    shopEwmBtn(e) {
        var that = this;
        var url = http.dataIndex(e)[0];
        wx.previewImage({
            current: url,
            urls: [url]
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
			
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
}))