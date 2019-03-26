// packageMarketing/marketingData/index.js
const A = getApp();

Page(A.assignPage({
  /**
   * 页面的初始数据
   */

  data: {
    popularFocus: {}, //人气聚焦
    customerSource: {}, //人气来源
    storeInfo: {
			level: 3, //营销称号：0 营销新人，1 营销能手，2 营销大师
			store_logo: '',
			store_name: '',
			store_id:0,
			share_img:''
    },
    activitiData: [], //客户来源 活动类型浏览量
    btnList: [],//客户来源 按钮列表
    marketingList: [],//营销秘籍列表
    showCanvas: false, //显示蒙版
    shareData: {
      store_img: "",
      store_name: "",
      store_titleImg: "",
      share_text1: "我在拼团趣做活动，一周时间累计吸引近万人浏览，订单不断，客粉数增加近千人，已经超",
      share_text2: "",
      share_text3: "的同行啦.",
      share_QR_code: "",
      share_footerText: "长按识别 浏览我的店铺",
    },
    shareImgArr: [], //分享图片集合
    canvasH: 0,
    canvasW: 0,
    pageH: 0,
    pageW: 0,
    rate: 1,
		day7:'',//7天前日期
		day1:'',//1天前日期
		showModals:0,//是否让canvas移出屏幕0否 1是
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 关闭分享功能
    wx.hideShareMenu();
    
    var that = this;
    if (options.storeId) {
      that.setData({
        storeId: options.storeId
      })
    }
    //雷达图
		that.level();
    that.radar();
    that.customerSource(options.storeId);
    that.popularFocus(options.storeId);
    that.marketingList();
    var animation1 = wx.createAnimation({
      duration: 400,
      transformOrigin: '100% 50% 0',
      timingFunction: 'step-start'
    });
    var animation2 = wx.createAnimation({
      duration: 400,
      transformOrigin: '0 50% 0',
      timingFunction: 'step-start'
    });
    that.setData({
      animation1: animation1,
      animation2: animation2
    })
    wx.getSystemInfo({
      success(res) {
        let canvasW = Number(res.windowWidth * 0.75);
        let canvasH = Number(canvasW * 1.462);
        let rate = Number(res.windowWidth) / 750;
        let rates = Number(res.windowWidth) / 375;
        that.setData({
          canvasH: canvasH,
          canvasW: canvasW,
          pageH: res.windowHeight,
          pageW: res.windowWidth,
          rate: rate,
          rates: rates
        })
      }
    })
		
		// let day7 = this.GetDateStr(-7);//当前时间的前七天
		// let day1 = this.GetDateStr(-1);
		// this.setData({
		// 	day7:day7,
		// 	day1:day1
		// })
  },
	GetDateStr(AddDayCount) {
		var dd = new Date();
		dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
		var y = dd.getFullYear();
		var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
		var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
		return y + "年" + m + "月" + d + "日0点";
	},
	goCard:function(e){
		var type = e.currentTarget.dataset.type;
		var url1 = "pages/myshop/home/socialMarketing/groupMsg/groupMsg?store_id=" + this.data.storeId+'&tab=1';//微信群发
		var url2 = "pages/myshop/home/socialMarketing/groupMsg/groupMsg?store_id=" + this.data.storeId;//短信、
		var url3 ="pages/myshop/home/integratingMarketing/subAccount/subAccount";//员工管理
		var url4 ="pages/myshop/home/socialMarketing/businessUnion/businessUnion";//商业联盟
		var url5 ="pages/myshop/home/marketingPromotion/publishAct/publishAct?actType=1";//拼团立减
		var url6 = "pages/myshop/home/marketingPromotion/publishAct/publishAct?actType=3";//多人拼团
		var url7 = "pages/myshop/home/marketingPromotion/publishAct/publishAct?actType=4";//限时专享
		var url8 = "pages/myshop/home/marketingPromotion/publishGjmd/publishGjmd?id="+this.data.popularFocus.id;//刮奖免单编辑
		var url9 = "packageMarketing/marketingAssistant/index";//营销助手
		var url10 = "pages/myshop/home/integratingMarketing/staff/staff?is_account=0";//员工分销
		var urlArr = [
			{
				type:1,
				url: url1
			},
			{
				type:2,
				url:url2
			},
			{
				type:3,
				url: url3
			},
			{
				type: 4,
				url: url4
			},
			{
				type: 5,
				url: url5
			},
			{
				type: 6,
				url: url6
			},
			{
				type: 7,
				url: url7
			},
			{
				type: 8,
				url: url8
			},
			{
				type: 9,
				url: url9
			},
			{
				type: 10,
				url: url10
			}
		];
		for(let i in urlArr){
			if(type== urlArr[i].type){
				A.G('navigateTo:///' + urlArr[i].url)
			}
		}
	},
	//营销称号及分享图片url
	level:function(){
		wx.showLoading({
			title: '加载中...',
		})
		A.updata.level().then(res=>{
			wx.hideLoading();
			if(res.status == 1){
				let url = '';
				if(res.dto.level == 1){
					url = 'http://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/wxxcx/marketData5.png'
				} else if (res.dto.level == 2){
					url = 'http://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/wxxcx/marketData7.png'
				}else{
					url = 'http://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/wxxcx/marketData6.png'
				}
				this.setData({
					storeInfo: res.dto,
					'shareData.store_img': res.dto.store_logo,
					'shareData.store_name': res.dto.store_name,
					'shareData.share_QR_code': res.dto.share_img,
					'shareData.store_titleImg':url
				})
				this.getShareImg(this.data.shareImgArr);
			}else{
				this.setData({ showModals:1})
				A.showTipModal(res.info || '请求数据失败',()=>{
					this.setData({ showModals: 0 })
				})
			}
		},err=>{
			wx.hideLoading();
			this.setData({ showModals: 1 })
			A.showTipModal(err.info || '请求接口失败', () => {
				this.setData({ showModals: 0 })
			})
		})
	},
  //雷达图
  radar: function() {
    wx.showLoading({
      title: '加载中...',
    })
    A.updata.radar().then(res => {
      wx.hideLoading();
      if (res.status == 1) {
         if (typeof res.dto.week_rate == "string") {
            if (res.dto.week_rate.length > 5) {
               res.dto.week_rate = res.dto.week_rate.slice(0, 5) + '%';
            }
         } else if (typeof res.dto.week_rate == "number") {
            res.dto.week_rate = res.dto.week_rate.toFixed(1) + '%';
         }
        this.setData({
          radarData: res.dto,
					'shareData.share_text2': res.dto.week_rate
        })
        this.changeRadar(res.dto);
      } else {
				this.setData({ showModals: 1 })
				A.showTipModal(res.info || '请求数据失败', () => {
					this.setData({ showModals: 0 })
				})
      }
    }, err => {
      wx.hideLoading();
			this.setData({ showModals: 1 })
			A.showTipModal(err.info || '请求接口失败', () => {
				this.setData({ showModals: 0 })
			})
    })
  },
	//客户来源
  customerSource: function(storeId) {
    wx.showLoading({
      title: '加载中...',
    })
    A.updata.customerSource(storeId).then(res => {
      wx.hideLoading();
      if (res.status == 1) {
        let customerSource = Object.assign({}, res);
        let activitiData = [{
            color: '#ff4a4a',
            name: '拼团立减',
            num: res.group_reduction
          },
          {
            color: '#FFA82A',
            name: '限时专享',
            num: res.limited_exclusive
          },
          {
            color: '#FF6C92',
            name: '多人拼团',
            num: res.multi_player
          },
          {
            color: '#FFA3F1',
            name: '刮奖免单',
            num: res.scratch
          },
          {
            color: '#7B9CFA',
            name: '门店首页',
            num: res.store_home
          }
        ];
        let btnList = [
          {
            text1: '累计吸引',
            num: res.browse_count,
            text2: '位客人浏览'
          },
          {
            text1: '新增',
            num: res.customer_count,
            text2: '名客户关注'
          },
          {
            text1: '客粉新增',
            num: res.fans_count,
            text2: '人'
          }
        ];
        this.setData({
          customerSource: customerSource,
          activitiData: activitiData,
          btnList: btnList
        })
				this.changeRing(customerSource);
      } else {
				this.setData({ showModals: 1 })
				A.showTipModal(res.info || '请求数据失败', () => {
					this.setData({ showModals: 0 })
				})
      }
    }, err => {
      wx.hideLoading();
			this.setData({ showModals: 1 })
			A.showTipModal(err.info || '请求接口失败', () => {
				this.setData({ showModals: 0 })
			})
    })
  },
  //人气聚焦
  popularFocus: function(storeId) {
    wx.showLoading({
      title: '加载中...',
    })
    A.updata.popularFocus(storeId).then(res => {
      wx.hideLoading();
      if (res.status == 1) {
				res.goods_price = parseFloat(res.goods_price).toFixed(2);
				res.secs_price = parseFloat(res.secs_price).toFixed(2);
        let popularFocus = Object.assign({}, res);
        this.setData({
          popularFocus: popularFocus
        })
      } else {
				this.setData({ showModals: 1 })
        A.showTipModal(res.info || '请求数据失败',()=>{
					this.setData({ showModals: 0 })
				})
      }
    }, err => {
      wx.hideLoading();
			this.setData({ showModals: 1 })
			A.showTipModal(err.info || '请求接口失败', () => {
				this.setData({ showModals: 0 })
			})
    })
  },
  //营销秘籍
  marketingList: function() {
		wx.showLoading({
			title: '加载中...',
		})
		A.updata.marketDataList().then(res => {
			wx.hideLoading();
			var that = this;
			if(res.status == 1){
				if(res.data){
					var txtArr = [
						{
							type: 1,
							url: "活动发送至粉丝微信，拓客精准直达"
						},
						{
							type: 2,
							url: "店铺信息随时短信提醒，触发客户复购"
						},
						{
							type: 3,
							url: "子账号协同管理店铺，经营更省心"
						},
						{
							type: 4,
							url: "客户共享，客户资源无限扩大"
						},
						{
							type: 5,
							url: "客带客，老客返利，新客优惠"
						},
						{
							type: 6,
							url: "老带新，流量产品的必备营销玩法"
						},
						{
							type: 7,
							url: "一次消费立即锁客，带来源源不断复购"
						},
						{
							type: 8,
							url: "所有的客户都是你的推销员，支付即营销"
						},
						{
							type: 9,
							url: "百行百业海量营销活动模板，只需一键复制"
						},
						{
							type: 10,
							url: "员工奖励机制，员工推广更有积极性"
						}
					];
					for (let i in res.data){
						for(let j in txtArr){
							if(txtArr[j].type == res.data[i].type){
								res.data[i].txt = txtArr[j].url
							}
						}
					}
					that.setData({
						marketingList: res.data
					})
					for (let i in res.data) {
						that.beginAnimation(res.data[i].rate, i);
					}
				}
			}else{
				this.setData({ showModals: 1 })
				A.showTipModal(res.info || '请求数据失败', () => {
					this.setData({ showModals: 0 })
				})
			}
    }, err => {
			wx.hideLoading();
			this.setData({ showModals: 1 })
			A.showTipModal(err.info || '请求接口失败', () => {
				this.setData({ showModals: 0 })
			})
    })
  },
  beginAnimation: function(percent, index) {
    var that = this;
    var animation1 = that.data.animation1;
    var animation2 = that.data.animation2;
    let deg = percent / 100 * 360;
    if (deg == 360) {
      return;
    } else {
      if (deg < 180) {
        animation1.rotateZ(180 - deg).step();
        animation2.rotateZ(180).step();
      } else {
        animation1.rotateZ(deg).step();
      }
      let aniTemp = {};
      aniTemp.anim1 = animation1.export();
      aniTemp.anim2 = animation2.export();
      let marketingList = that.data.marketingList;
      marketingList[index].animation = aniTemp;
      that.setData({
        marketingList: marketingList
      })
    }
  },
  changeRadar: function(radarData) {
    var options = {
      data: [{
        name: "营销数据",
        value: [radarData.old_customer, radarData.store_customer, radarData.market_activity, radarData.customer_gift, radarData.new_customer, 100],
        color: "#FB4217"
      }],
      xLabel: [{
          name: '锁客复购',
          value: radarData.old_customer
        },
        {
          name: '门店客流',
          value: radarData.store_customer
        },
        {
          name: '营销活跃度',
          value: radarData.market_activity
        },
        {
          name: '聚客天赋',
          value: radarData.customer_gift
        },
        {
          name: '拓客拉新',
          value: radarData.new_customer
        }
      ],
      chartRatio: 0.6, //缩放比例
      style: 'radar',
      showLabel: false,
      animation: true,
      showTooltip: false,
      area: true, //所绘区域是否填充颜色true显示
      showArc: true, //雷达图多边形区域连接点是否显示
      lineColor: '#F19EA6', //雷达图蜘蛛网线条颜色
      centerTxt: {
        txt1: '较前日',
        txt2: '↑ ' + radarData.grow
      }
    }
    var that = this;
    that.radar = that.selectComponent('#radar');
    that.radar.setOptions(options);
    that.radar.initChart(320, 250);
  },
	changeRing(customerSource) {
    //环状图
    var that = this;
		var noData = false;
		if (customerSource.group_reduction == 0 && customerSource.limited_exclusive == 0 && customerSource.multi_player == 0 && customerSource.scratch == 0 && customerSource.store_home == 0){
			that.setData({
				noData:true
			})
		}else{
			var dataRing = [{
				name: "拼团立减",
				value: customerSource.group_reduction,
				color: "rgba(255,74,74,1)"
			},
			{
				name: "限时专享",
				value: customerSource.limited_exclusive,
				color: "rgba(255,168,42,1)"
			},
			{
				name: "多人拼团",
				value: customerSource.multi_player,
				color: "rgba(255,108,146,1)"
			},
			{
				name: "刮奖免单",
				value: customerSource.scratch,
				color: "rgba(255,163,241,1)"
			},
			{
				name: "门店首页",
				value: customerSource.store_home,
				color: "rgba(123,156,250,1)"
			}
			]
			var optionsRing = {
				data: dataRing,
				legend: '{c}',
				chartRatio: 0.75,
				style: 'ring',
				showLegend: false,
				showLabel: false, //是否显示所属数据标签 底部
				animation: false, //是否动画
				showTooltip: false, //点击显示所点数据
				tooltip: '{a}：{b}人浏览', //显示所点位置数据格式
				noData: that.data.noData
			}
			that.ring = that.selectComponent('#ring');
			that.ring.setOptions(optionsRing);
			that.ring.initChart(180, 150);
		}
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
		
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 隱藏蒙版
  cancel: function() {
    this.setData({
      showCanvas: false
    })
  },
  // 画布
  showShare: function() {
    var rate = this.data.rate;
    var shareData = this.data.shareData;
    var shareImgArr = this.data.shareImgArr;
    let ctx = wx.createCanvasContext("canvasContent");
    var shareTitleTextRow1 = shareData.share_text1.substring(0, 19); //第一行
    var shareTitleTextRow2 = shareData.share_text1.substring(19, 38); //第二行
    var shareTitleTextRow3 = shareData.share_text1.substring(38, shareData.share_text1.length); //第三行

    // 背景色
    ctx.setFillStyle('#ffffff');
    // ctx.fillRect(0, 0, this.data.canvasW, this.data.canvasH);
		ctx.moveTo(0, 20 * rate);
		ctx.arc(20 * rate, 20 * rate,20 * rate, 1 * Math.PI, 1.5 * Math.PI);
		ctx.lineTo(this.data.canvasW-40*rate,0);
		ctx.arc(this.data.canvasW - 20 * rate, 20 * rate, 20 * rate, 1.5 * Math.PI, 2 * Math.PI);
		ctx.lineTo(this.data.canvasW,this.data.canvasH-20*rate);
		ctx.arc(this.data.canvasW - 20 * rate, this.data.canvasH - 20 * rate, 20 * rate, 0 * Math.PI, 0.5 * Math.PI);
		ctx.lineTo(0, this.data.canvasH);
		ctx.arc(20 * rate, this.data.canvasH - 20 * rate, 20 * rate, 0.5* Math.PI, 1 * Math.PI)
		ctx.fill();

    // 活动信息
    // 开始创建一个路径。需要调用 fill 或者 stroke 才会使用路径进行填充或描边
    ctx.save();
    ctx.beginPath();
    ctx.arc(68 * rate, 70 * rate, 40 * rate, 0, 2 * Math.PI);
    ctx.setStrokeStyle('#ffffff');
    ctx.stroke();
    ctx.clip();
		ctx.drawImage(shareImgArr[0], 28 * rate, 30 * rate, 80 * rate, 80 * rate);
    ctx.closePath();
    ctx.restore();
    // 活动名称
    ctx.setFontSize(28 * rate);
    ctx.setFillStyle("#333333");
    ctx.fillText(shareData.store_name, 127 * rate, 85 * rate, 300 * rate);
    // 店铺称号
		ctx.drawImage(shareImgArr[1], 30 * rate, 130 * rate, 500 * rate, 329 * rate);
    // 称号文字描述
    ctx.setFontSize(24 * rate);
    ctx.setFillStyle("#333333");
    ctx.fillText(shareTitleTextRow1, 51 * rate, 357 * rate);
    ctx.fillText(shareTitleTextRow2, 51 * rate, 393 * rate);
    ctx.fillText(shareTitleTextRow3, 51 * rate, 429 * rate);
    ctx.setFontSize(32 * rate);
    ctx.setFillStyle("#e60012");
    ctx.fillText(shareData.share_text2, 110 * rate, 429 * rate);
    ctx.setFontSize(24 * rate);
    ctx.setFillStyle("#333333");
     var text2Width = ctx.measureText(shareData.share_text2).width;
    ctx.fillText(shareData.share_text3, (text2Width*2.67+120) * rate, 429 * rate);
    // 二维码
		
		ctx.drawImage(shareImgArr[2], 169 * rate, 487 * rate, 226 * rate, 226 * rate);
    // 底部文字
    ctx.setFontSize(28 * rate);
    ctx.fillText(shareData.share_footerText, 136 * rate, 771 * rate);
    ctx.draw();
    this.setData({
      showCanvas: true
    })
  },
  //canvas触摸开始
  canvasTouchStart: function(e) {
    var startTime = e.timeStamp
    this.setData({
      startTime: startTime
    })
  },
  //canvas触摸結束
  canvasTouchEnd: function(e) {
    var startTime = this.data.startTime;
    var endTime = e.timeStamp;
    var time = Number(endTime) - Number(startTime);
    if (time > 500) {
      this.saveImgBtn(this.data)
    } else {
      this.cancel()
    }
  },
  // 获取分享图片
  getShareImg: function(shareImgArr) {
    //获取画布图片
    this.successCanvasImg(this.data.shareData);
		if (!shareImgArr[0]) {
      let shareImgArr = [
        this.data.shareData.store_img,
        this.data.shareData.store_titleImg,
        this.data.shareData.share_QR_code,
      ];
      let shareImgNewArr = [];
      for (let i in shareImgArr) {
        var shareImgArri = shareImgArr[i];
        if (shareImgArri.substring(0, 5) != "https") {
          var shareImgArro = shareImgArri.substring(0, 4);
          shareImgArri = shareImgArri.replace(shareImgArro, 'https')
        }
        wx.downloadFile({
          url: shareImgArri, //仅为示例，并非真实的资源
          success: res => {
            if (res.statusCode === 200) {
              shareImgNewArr[i] = res.tempFilePath;
              this.setData({
                shareImgArr: shareImgNewArr
              })

            } else {}
          },
          complete: res => {
            wx.hideLoading();
            return shareImgNewArr;
          }
        })
      }
    }
  },
  // 判断画布图片是否准备完成
  successCanvasImg: function(data) {
    // 图片缓存
		if (!data.store_titleImg || !data.store_img || !data.share_QR_code) {
      wx.showLoading({
        title: '素材加载中...',
      })
      var imgCreatFn = setInterval(() => {
				if (data.store_titleImg && data.store_img && data.share_QR_code) {
          clearInterval(imgCreatFn);
          wx.hideLoading();
        }
      }, 100)
      return
    }
  },
  // 保存到相册
  saveImgBtn: function() {
    var that = this
    wx.showLoading({
      title: '保存中...',
    })
    let canvasW = Number(this.data.canvasW);
    let canvasH = Number(this.data.canvasH);
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: canvasW,
      height: canvasH,
      canvasId: 'canvasContent',
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
                if (res.confirm) {
                  this.setData({
                    showCanvas: false,
                  })
                }
              }
            })
          },
          fail(res) {
            wx.getSetting({
              success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
									this.setData({ showModals: 1 })
									A.showTipModal('是否前往开启保存图片权限?', () => { //是否前往开启保存图片权限?
										A.G("reLaunch:///pages/authoritySetting/authoritySetting");
										this.setData({ showModals: 0 })
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
  },
}))