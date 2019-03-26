var http = require('../../utils/http.js')
var unionid = wx.getStorageSync('thisCode')
var util = require('../../utils/util.js')
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var QQMapKey = require('../../utils/http.js').QQMapKey

var date = new Date()
var hours = []
var minutes = []

for (var i = 0; i <= 23; i++) {
  hours.push(i)
}
for (var i = 0; i < 60; i++) {
  minutes.push(i)
}

const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    inputArr: [],
    imgs: [],
    imgUrl: http.imgUrl,
    cateArray: [],
    cateArray1: [],
    cate: '',
    cate1: '',
    chooseCateShow: false,
    chooseCate: '0',
    chooseCateShow1: false,
    chooseCate1: '0',
    chooseTime: false,
    hours: hours,
    hour: date.getHours(),
    minutes: minutes,
    minute: date.getMinutes(),
    value: [date.getHours(), date.getMinutes()],
    hours1: hours,
    hour1: date.getHours(),
    minutes1: minutes,
    minute1: date.getMinutes(),
    value1: [date.getHours(), date.getMinutes()],
    chooseAddress: false,
    preF: false,
    preArr: [],
    cityArr: [],
    areaArr: [],
    preAFlag: [],
    cityAFlag: [],
    areaAFlag: [],
    cityAllId: [],
    cityAllName: [],
    openFlag: true,
    mapScale: 18,
    dwClick: true,
    canClick: true,
    messText: '获取验证码',
    messTime: 120,
    messFlag: true,
    showMap: true, // 显示地图
    agree: true, // 是否统一商家使用协议
    ops: "",
    authCode: '' // 授权码
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      ops: JSON.stringify(options)
    });
    var that = this
    var unionid = wx.getStorageSync('thisCode')
    let identType = options.identType || 0;
    var options = options;
    var regcode1 = 'xzrSwY27_F',
      version = 1,
      authCode = '',
      entry = 0;
    if (options.regcode) {
      regcode1 = options.regcode
      version = options.version || 1;
      authCode = options.numbering || '';
      entry = options.entry || 0;
    } else {
      let sceneOjb = this.urlParams(decodeURIComponent(options.scene));
      regcode1 = sceneOjb.regcode;
      version = sceneOjb.version || 1;
      authCode = sceneOjb.numbering || '';
      entry = sceneOjb.entry || 0;
    }
    that.setData({
      version: version,
      regcode1: regcode1,
      authCode: authCode,
      entry: entry
    });
    console.log(that.data);
    wx.setStorageSync('authCode', authCode);
    var store_id = options.store_id || 0;
    if (!unionid) {
      A.goPrower();
      return
    }
    this.startData(unionid, regcode1, version)
    wx.getSystemInfo({
      success(res) {
        var windowWidth = res.windowWidth
        var windowHeight = res.windowHeight
        var windowscale = windowHeight / windowWidth //屏幕高宽比
        var mapHeight = Number(windowHeight * 25) / 100
        var mapWidth = Number(windowWidth) - 40
        that.setData({
          mapHeight: mapHeight,
          mapWidth: mapWidth,
          controlsImg: [{
            id: 1,
            iconPath: '/images/map_local.png',
            position: {
              left: Number(mapWidth) / 2 - 11,
              top: Number(mapHeight) / 2 - 30,
              width: 30,
              height: 30
            },
            clickable: false
          }]
        })
      }
    })
    this.goOriginBtn();
    this.setData({
      identType: identType,
    });

  },
  // 取消自定义按钮加载中状态
  hideLoading: function() {
    this.data.btn.hideLoading();
  },
  urlParams(_val) {
    if (typeof _val == 'string') {
      let strArr = _val.split('&');
      let o = {};
      for (let k in strArr) {
        let _oArr = strArr[k].split('=');
        if (_oArr.length == 2) {
          o[_oArr[0]] = _oArr[1];
        }
      }
      return o;
    } else {
      return false;
    }
  },
  // 店铺开关/关闭开店状态
  openChange() {
    var that = this
    var openFlag = that.data.openFlag ? false : true
    that.setData({
      openFlag: openFlag
    })
  },
  startData(unionid, regcode1, version) {
    var that = this;
    http._post1('StoreRegister/before_register_store', {
      unionid: unionid,
      reg_code: regcode1,
      numbering: that.data.authCode,
      version: version
    }, res => {
      var data = res.data;
      if (data.status == 1) { // 可注册，返回经营品类信息
        var cateArray = data.info.category_list
        this.citySlect()
        if (data.reg_code) {
          regcode1 = data.reg_code
        }
        this.setData({
          cateArray: cateArray,
          regcode1: regcode1
        })
      } else if (data.status == 2) { // 已经是子账号，提示先解绑再注册
        that.setData({
          showMap: false
        })
        that.showDiyModal({
          tipShowTitle: true,
          tipContent: data.info,
          tipSuccess: 'goIndex'
        });
      } else if (data.status == 3) { // 600的二维码失效

        that.setData({
          showMap: false,
          version: 2,
          cateArray: data.info.category_list
        })
        this.citySlect();
        that.showDiyModal({
          tipShowTitle: true,
          tipContent: data.msg
        });
      } else {
        that.setData({
          showMap: false
        })
        that.showDiyModal({
          tipShowTitle: true,
          tipContent: data.info,
          tipSuccess: 'goLoading'
        });
      }
    }, function(res) {})
  },
  goIndex() {
    wx.reLaunch({
      url: '/pages/myshop/home/index'
    })
  },
  goLoading() {
    wx.reLaunch({
      url: '/pages/loading/loading'
    })
  },
  // 店铺LOGO && 店铺背景图片
  upImgUrlBtn(e) {
    var that = this
    var index = http.dataIndex(e)[0]
    var imgs = that.data.imgs
    var unionid = wx.getStorageSync('thisCode');
    let type = index == 0 ? 6 : 11;
    http.oneImg(res => {
      var formData = {
        folder: 'store_adjust',
        type: type,
        unionid: unionid
      }
      http.upImgAllSuccssAll(res, formData, function(resp) {
        var img = (resp.data).replace(/[\r\n]/g, "")
        imgs[index] = img
        that.setData({
          imgs: imgs
        })
      }, 'StoreRegister/upload_image')
    })
  },

  // 获取所有INPUT的数据方法
  inputTxt(e) {
    var that = this
    var inputArr = that.data.inputArr
    var aa = http.inputArr(inputArr, e)
    that.setData({
      inputArr: aa,
    })
  },


  // 选择经营品类
  chooseCateOpen() {
    this.setData({
      chooseCateShow: true,
      cate1: ''
    })
  },
  // 关闭选择
  chooseCateClose() {
    this.setData({
      chooseCateShow: false
    })
  },
  // 选择经营品类列表
  chooseCate(e) {
    var that = this
    this.setData({
      chooseCate: e.currentTarget.dataset.cate
    })
    for (var item of that.data.cateArray) {
      if (item.category_pid == e.currentTarget.dataset.cate) {
        that.setData({
          cateArray1: item.second
        })
      }
    }
    // this.data.inputArr[2] = e.currentTarget.dataset.cate
    // var tempArr = this.data.inputArr
    setTimeout(function() {
      that.setData({
        chooseCateShow: false,
        // chooseCateShow1: true,
        typeArr: [e.currentTarget.dataset.cate, ''],
        cate: e.currentTarget.dataset.name
      })
    }, 300)
  },
  // 选择二级经营品类列表
  chooseCate1(e) {
    var that = this
    this.setData({
      chooseCate1: e.currentTarget.dataset.cate
    })
    this.data.typeArr[1] = e.currentTarget.dataset.cate
    var tempArr = this.data.typeArr
    setTimeout(function() {
      that.setData({
        chooseCateShow: false,
        chooseCateShow1: false,
        typeArr: tempArr,
        cate1: e.currentTarget.dataset.name
      })
    }, 300)
  },
  chooseCateClose1() {
    this.setData({
      chooseCateShow: false,
      chooseCateShow1: false
    })
  },
  chooseCateOpen1() {
    let cate = this.data.cate
    if (cate) {
      this.setData({
        chooseCateShow: false,
        chooseCateShow1: true
      })
    } else {
      http.showModal('请先选择一级经营品类', false, () => {})
    }
  },

  // 开启时间选择
  openChooseTime() {
    this.setData({
      chooseTime: true
    })
  },

  // 关闭时间选择
  closeChooseTime() {
    this.setData({
      chooseTime: false
    })
  },

  // 选择开业时间
  bindChange(e) {
    const val = e.detail.value
    this.setData({
      hour: this.data.hours[val[0]],
      minute: this.data.minutes[val[1]]
    })
  },

  // 选择关闭时间
  bindChange_1(e) {
    const val = e.detail.value
    this.setData({
      hour1: this.data.hours1[val[0]],
      minute1: this.data.minutes1[val[1]]
    })
  },

  // 确定选择时间
  confirmChooseTime() {
    this.data.inputArr[6] = this.data.hour + '时' + this.data.minute + '分-' + this.data.hour1 + '时' + this.data.minute1 + '分'
    var tempArr = this.data.inputArr
    this.setData({
      inputArr: tempArr,
      chooseTime: false,
      openTArr: [this.data.hour + '时' + this.data.minute + '分', this.data.hour1 + '时' + this.data.minute1 + '分'],
    })
  },

  // 选择地址
  chooseAddress() {
    this.setData({
      chooseAddress: true
    })
  },
  citySlect() {
    var that = this
    that.setData({
      menbanF: true,
      cityF: true,
      areaArr: [],
      cityArr: []
    })
    var unionid = wx.getStorageSync('thisCode')
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    // 省級別选择
    http._post1('StoreRegister/get_area_list', {
      unionid: unionid,
      id: 0,
      provinceid: 0,
      type: 1
    }, res => {
      wx.hideLoading()
      var data = res.data
      if (data.status == 1) {
        let preArrName = []
        let preArrId = []
        data.info.find(item => {
          preArrName.push(item.region_name)
          preArrId.push(item.id)
        })
        that.setData({
          preArrId,
          preArrName,
        })
      } else {
        http.showModal(data.info, false, () => {})
      }
    }, res => {
      wx.hideLoading()
    })
  },
  // 省份选择
  cityBtn(e) {
    var that = this
    var preArrId = that.data.preArrId
    var preArrName = that.data.preArrName
    var index = Number(e.detail.value)
    var preAFlag = []
    preAFlag[index] = "1"
    var cityAllId = that.data.cityAllId
    var cityAllName = that.data.cityAllName
    cityAllId[0] = preArrId[index]
    cityAllName[0] = preArrName[index]
    cityAllId[1] = ""
    cityAllName[1] = ""
    cityAllId[2] = ""
    cityAllName[2] = ""
    var unionid = wx.getStorageSync('thisCode')
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // 省市区测试
    http._post1('StoreRegister/get_area_list', {
      unionid: unionid,
      id: preArrId[index],
      provinceid: 0,
      type: 2
    }, res => {
      wx.hideLoading();
      var data = res.data
      if (data.status == 1) {
        let cityArrName = []
        let cityArrId = []
        data.info.find(item => {
          cityArrName.push(item.region_name)
          cityArrId.push(item.id)
        })
        that.setData({
          cityArrId,
          cityArrName,
          cityAllId,
          cityAllName,
          areaArr: [],
        })
      } else {
        http.showModal(data.info, false, () => {})
      }
    }, res => {
      wx.hideLoading()
    })
    that.setData({
      preAFlag: preAFlag,
      cityAFlag: [],
      areaAFlag: []
    })
  },
  // 点击获取短信验证
  countdown(e) {
    var that = this;
    var messText = that.data.messText;
    var messTime = that.data.messTime;
    var inputArr = that.data.inputArr;
    var unionid = wx.getStorageSync('thisCode');
    if (!http.rexFn(inputArr[4])[0] || !inputArr[4]) {
      http.showModal('请输入正确的手机号码', false, function() {})
      return
    }
    http._post1('StoreRegister/send_code', {
      type: 2,
      telephone: inputArr[4],
      unionid: unionid
    }, function(res) {
      var data = res.data;
      if (data.status == 1) {
        http.showModal(data.info, false, function() {});
        var timeAll = setInterval(function() {
          if (messTime <= 0) {
            clearInterval(timeAll);
            that.setData({
              messText: '重新获取',
              messFlag: true,
            })
            return
          }
          messTime--;
          that.setData({
            messText: messTime + "s",
            messFlag: false,
          })
        }, 1000);
      } else {
        http.showModal(data.info, false, function() {})
      }
      console.log(data);
    }, function(res) {})
  },
  // 城市选择
  cityBtn1(e) {
    var that = this
    var cityArrId = that.data.cityArrId
    var cityArrName = that.data.cityArrName
    var index = Number(e.detail.value)
    var cityAFlag = []
    cityAFlag[index] = "1"
    var cityAllId = that.data.cityAllId
    var cityAllName = that.data.cityAllName
    cityAllId[1] = cityArrId[index]
    cityAllName[1] = cityArrName[index]
    cityAllId[2] = ""
    cityAllName[2] = ""
    var unionid = wx.getStorageSync('thisCode')
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // 省市区测试
    http._post1('StoreRegister/get_area_list', {
      unionid: unionid,
      id: cityAllId[1],
      provinceid: cityAllId[0],
      type: 3
    }, res => {
      wx.hideLoading();
      var data = res.data
      if (data.status == 1) {
        let areaArrName = []
        let areaArrId = []
        data.info.find(item => {
          areaArrName.push(item.region_name)
          areaArrId.push(item.id)
        })
        that.setData({
          areaArr: data.info,
          cityAllId: cityAllId,
          cityAllName: cityAllName,
          areaArrName: areaArrName,
          areaArrId: areaArrId,
          canClick: false,
        })
      } else {
        http.showModal(data.info, false, () => {})
      }
    }, res => {
      wx.hideLoading()
    })
    that.setData({
      cityAFlag: cityAFlag,
      areaAFlag: []
    })
  },
  // 区域选择
  cityBtn2(e) {
    var that = this
    var areaArr = that.data.areaArr
    var areaArrId = that.data.areaArrId
    var areaArrName = that.data.areaArrName
    var index = Number(e.detail.value)
    var areaAFlag = []
    areaAFlag[index] = "1"
    var cityAllId = that.data.cityAllId
    var cityAllName = that.data.cityAllName
    cityAllId[2] = areaArrId[index]
    cityAllName[2] = areaArrName[index]
    var cityStr = cityAllName.join("-")
    that.setData({
      areaAFlag: areaAFlag,
      cityAllId: cityAllId,
      cityAllName: cityAllName,
      cityStr: cityStr,
    })
  },


  // 判断输入值的正则方式
  // 地图拖拽事件
  mapChange(e) {
    var that = this
    var latitude = that.data.latitude
    var longitude = that.data.longitude
    var mapLaclNum = that.data.mapLaclNum
    var cityAllName = that.data.cityAllName
    var inputArr = that.data.inputArr
    that.mapCtx = wx.createMapContext("map4select")
    var demo = new QQMapWX({
      key: QQMapKey // 必填
    })
    if (e.type == 'end') {
      that.mapCtx.getCenterLocation({
        success: res => {
          that.setData({
            mapLaclNum: 0,
            markers: [{
              id: 0,
              iconPath: "/images/map_local.png",
              longitude: Number(res.longitude),
              latitude: Number(res.latitude),
              width: 30,
              height: 30
            }]
          })
          console.log(this.data.controlsImg)
          console.log(this.data.markers)
          // 调用接口
          // demo.reverseGeocoder({
          //     location: {
          //         latitude: Number(res.latitude),
          //         longitude: Number(res.longitude)
          //     },
          //     success: res => {
          //         var address_component = res.result.address_component
          //         cityAllName[0] = address_component.province
          //         cityAllName[1] = address_component.city
          //         cityAllName[2] = address_component.district
          //         inputArr[10] = res.result.address_component.street
          //         var cityStr = cityAllName.join("-")
          //         that.setData({
          //             inputArr: inputArr,
          //             cityAllName: cityAllName,
          //             cityStr: cityStr
          //         })
          //     },
          //     fail: res => {},
          // })
        }
      })

    }
  },
  // 定位当前地址按钮
  goOriginBtn() {
    var that = this
    var cityAllName = that.data.cityAllName
    var inputArr = that.data.inputArr
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        // 实例化API核心类
        var demo = new QQMapWX({
          key: QQMapKey // 必填
        })

        // 调用接口
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: res => {
            var address_component = res.result.address_component
            cityAllName[0] = address_component.province
            cityAllName[1] = address_component.city
            cityAllName[2] = address_component.district
            inputArr[10] = res.result.formatted_addresses.recommend
            var cityStr = cityAllName.join("-")
            that.setData({
              inputArr: inputArr,
              cityAllName: cityAllName,
              cityStr: cityStr
            })
          },
          fail: res => {

          },
        })
        that.setData({
          longitude: longitude,
          latitude: latitude,
          markers: [{
            id: 0,
            iconPath: "/images/map_local.png",
            longitude: Number(longitude),
            latitude: Number(latitude),
            width: 30,
            height: 30
          }]
        })
      },
      fail(res) {
        wx.navigateTo({
          url: '/pages/authoritySetting/authoritySetting'
        })
      }
    })
  },
  // 点击定位获取当前门店填写地址
  loaclOldAddBtn() {
    var that = this
    var address = (that.data.cityAllName).join("")
    address += that.data.cityStr
    var demo = new QQMapWX({
      key: QQMapKey // 必填
    })
    demo.geocoder({
      address: address,
      success: res => {
        var location = res.result.location
        that.setData({
          latitude: location.lat,
          longitude: location.lng,
          mapScale: 18,
          markers: [{
            id: 0,
            iconPath: "/images/map_local.png",
            longitude: Number(location.lng),
            latitude: Number(location.lat),
            width: 30,
            height: 30
          }]
        })
      },
      fail: res => {
        console.log(res)
      },
    })
  },
  loaclOldAddBtn1() {
    let dwClick = this.data.dwClick
    if (dwClick) {
      var that = this
      var address = (that.data.cityAllName).join("")
      // address += that.data.cityStr
      address += that.data.inputArr[10]
      // var address = that.data.inputArr[11]
      var demo = new QQMapWX({
        key: QQMapKey // 必填
      })
      that.setData({
        dwClick: false
      })
      demo.geocoder({
        address: address,
        success: res => {
          var location = res.result.location
          that.setData({
            latitude: location.lat,
            longitude: location.lng,
            mapScale: 18,
            markers: [{
              id: 0,
              iconPath: "/images/map_local.png",
              longitude: Number(location.lng),
              latitude: Number(location.lat),
              width: 30,
              height: 30
            }]
          })
        },
        fail: res => {
          console.log(res)
          http.showModal('无此定位', false, () => {})
        },
      })
      setTimeout(function() {
        that.setData({
          dwClick: true
        })
      }, 5000)
    } else {
      http.showModal('操作过于频繁，请5s后重试', false, () => {})
    }
  },
  // 地图显示
  showMap() {
    this.setData({
      showMap: true
    });
    this.hideDiyModal();
  },
  // 点击保存
  confirmBtn() {
    var that = this;
    that.setData({
      btn: that.selectComponent('#submit_btn')
    });
    if (!that.data.agree) {
      that.setData({
        showMap: false
      });
      that.showDiyModal({
        tipShowTitle: true,
        tipContent: '请勾选拼团趣《商家使用协议》',
        tipSuccess: 'showMap'
      });
      return;
    }

    var imgs = http.imgSup(that.data.imgs) || [];
    var cityAllName = that.data.cityAllName || [];
    var inputArr = that.data.inputArr || [];
    var typeArr = that.data.typeArr || [];
    var markers = that.data.markers
    let areaArrName = that.data.areaArrName;

    var openTArr = that.data.openTArr || []
    that.setData({
      okEidtBtn: false
    })
    var unionid = wx.getStorageSync('thisCode')
    let valReg = A.validateFrom({
      storeLogo: imgs[0], // 店铺logo
      storeName: inputArr[0], // 店铺名称
      storeIntro: inputArr[1], // 店铺简介
      category: typeArr[0], // 店铺行业
      subCategory: typeArr[1], // 店铺二级行业
      represent: inputArr[3], // 店铺负责人
      representPhone: inputArr[4], // 店铺负责人电话
      cusServPhone: inputArr[5], // 客服电话
      openTime: openTArr[0], // 营业开始时间
      closeTime: openTArr[1], // 营业结束时间
      storeAddrPro: cityAllName[0], // 店铺地址-省份
      storeAddrCity: cityAllName[1], // 店铺地址-城市
      storeAddrDetail: inputArr[10], // 店铺详细地址
    }, {
      storeLogo: {
        exp: "empty1",
        err: {
          field: 'storelogo',
          tip: "请上传店铺LOGO"
        }
      },
      storeName: {
        exp: "empty1",
        err: {
          field: 'storeName',
          tip: "请输入店铺名称"
        }
      },
      storeIntro: {
        exp: "empty1",
        err: {
          field: 'storeIntro',
          tip: "请输入店铺简介"
        }
      },
      category: {
        exp: "empty1",
        err: {
          field: 'category',
          tip: "请设置行业类别"
        }
      },
      subCategory: {
        exp: "empty1",
        err: {
          field: 'subCategory',
          tip: "请设置二级行业类别"
        }
      },
      represent: {
        exp: "empty1",
        err: {
          field: 'represent',
          tip: "请输入店铺负责人姓名"
        }
      },
      representPhone: {
        exp: ["empty1", "phone"],
        err: {
          field: 'representPhone',
          tip: "请输入正确格式的负责人电话"
        }
      },
      cusServPhone: {
        exp: "empty1",
        err: {
          field: 'cusServPhone',
          tip: "请输入正确格式的客服电话"
        }
      },
      openTime: {
        exp: "empty1",
        err: {
          field: 'openTime',
          tip: "请设置营业时间"
        }
      },
      closeTime: {
        exp: "empty1",
        err: {
          field: 'closeTime',
          tip: "请设置营业时间"
        }
      },
      storeAddrPro: {
        exp: "empty1",
        err: {
          field: 'storeAddrPro',
          tip: "请设置店铺地址所在省份"
        }
      },
      storeAddrCity: {
        exp: "empty1",
        err: {
          field: 'storeAddrCity',
          tip: "请设置店铺地址所在城市"
        }
      },
      storeAddrDetail: {
        exp: "empty1",
        err: {
          field: 'storeAddrDetail',
          tip: "请输入店铺详细地址"
        }
      }
    });
    if (valReg !== true) {
      that.setData({
        showMap: false
      })
      A.showTipModal(valReg.tip, function() {
        that.setData({
          showMap: true
        })
        that.hideLoading();
      });
      return;
    }
    if ((cityAllName[1] && areaArrName && areaArrName[0]) || cityAllName[2]) {
      let addrValReg = A.validateFrom({
        storeAddrDistinct: cityAllName[2] // 店铺地址-区域
      }, {
        storeAddrDistinct: {
          exp: "empty1",
          err: {
            field: 'storeAddrDistinct',
            tip: "请设置店铺地址所在区域"
          }
        }
      });
      if (addrValReg !== true) {
        that.setData({
          showMap: false
        });
        A.showTipModal(addrValReg.tip, function() {
          that.hideLoading();
          that.setData({
            showMap: true
          });
        });
        return;
      }
    }
    http._post1('StoreRegister/new_register_store', {
      storelogo: imgs[0] || '',
      storename: inputArr[0] || '',
      storedes: inputArr[1] || '',
      category_pid: typeArr[0] || '',
      category_id: typeArr[1] || '',
      name: inputArr[3] || '',
      telephone: inputArr[4] || '',
      kefu_tel: inputArr[5] || '',
      province: cityAllName[0] || '',
      city: cityAllName[1] || '',
      district: cityAllName[2] || '',
      storeaddress: inputArr[10] || '',
      is_open: that.data.openFlag ? 0 : 1,
      longitude: markers[0].longitude || '',
      latitude: markers[0].latitude || '',
      unionid: unionid,
      start_time: openTArr[0] || '',
      end_time: openTArr[1] || '',
      code: inputArr[20] || '',
      reg_code: this.data.regcode1 || '',
      version: that.data.version || '',
      numbering: that.data.authCode,
      self_regist: that.data.entry,
      flog: this.data.ops
    }, res => {
      that.hideLoading();
      that.setData({
        showMap: false
      })
      var data = res.data
      that.setData({
        okEidtBtn: true
      })
      if (data.status == 1) {
        A.showTipModal('注册成功', that.goBinding);
      } else {
        A.showTipModal(data.info || '获取数据失败', function() {
          wx.hideLoading();
          that.showMap();
        });
      }
    }, res => {
      that.hideLoading()
    })
  },
  //注册失败提示
  failTip: function() {

  },
  // 前往绑定
  goBinding: function() {
    this.showMap();
    wx.reLaunch({
      url: '/pages/loading/loading'
    })
  },

  // 前往商家使用协议
  goAgreementDetail: function() {
    wx.navigateTo({
      url: '/pages/protocol/protocol?id=1'
    })
  },

  // 切换同意协议状态
  changeAgree: function() {
    this.setData({
      agree: !this.data.agree
    })
  },

  // 提示框
  showDiyModal: function(opts) {
    const _that = this,
      _d = _that.data;
    _that.setData({
      tipEle: opts.tipEle || _that.selectComponent("#diyModal"),
      tipShowTitle: opts.tipShowTitle || false,
      tipTitle: opts.tipTitle || '提示',
      tipShowType: opts.tipShowType || 1,
      tipShowList: opts.tipShowList || [],
      tipContent: opts.tipContent || '',
      tipImpCont: opts.tipImpCont || '',
      tipHideCancel: opts.tipHideCancel || true,
      tipSuccess: opts.tipSuccess || 'hideDiyModal',
      tipConfirmText: opts.tipConfirmText || '确定',
      tipFail: opts.tipFail || 'hideDiyModal',
      tipCancelText: opts.tipCancelText || '取消'
    });
    _d.tipEle.showDialog();
  },
  // 隐藏提示框
  hideDiyModal: function() {
    let ele = this.data.tipEle || this.selectComponent("#diyModal")
    ele.hideDialog();
  },
  onShow() {
    this.setData({
      showMap: true
    });
  }
}))