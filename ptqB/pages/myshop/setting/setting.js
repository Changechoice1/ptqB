var http = require('../../../utils/http.js')
var unionid = wx.getStorageSync('thisCode')
var util = require('../../../utils/util.js')
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js')
var QQMapKey = require('../../../utils/http.js').QQMapKey

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
        eidtF: 1,
        showMap: true,// 显示地图
        focusField: '',//聚焦字段
        isFocus: false,// 是否设置了focus，若设置为true，不可触发其它点击事件或失焦验证
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       // 关闭分享功能
       wx.hideShareMenu();
        var that = this
        var unionid = wx.getStorageSync('thisCode')
        let identType = options.identType || 2
        that.setData({
            identType: identType
        })
        wx.showLoading({ title: '加载中...', mask: true })

        wx.getSystemInfo({
            success(res) {
                wx.hideLoading();
                var windowWidth = res.windowWidth
                var windowHeight = res.windowHeight
                var windowscale = windowHeight / windowWidth //屏幕高宽比
                var mapHeight = Number(windowHeight * 25) / 100
                var mapWidth = Number(windowWidth)-40
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
            },
            fail(){
              wx.hideLoading();
            }
        })
        // 载入当前时间
        // that.setData({ openTArr: ["00:00", "00:01"] })
        // 获取初始数据
        http._post1('Store/store_info', {
            unionid: unionid,
        }, res => {
            var data = res.data
            if (data.status == 1) {
                var storeAdmin = data.info.store_info
                var inputArr = []
                var openTArr = [storeAdmin.start_time,storeAdmin.end_time]
                var typeArr = [storeAdmin.category_pid,storeAdmin.category_id]
                inputArr[0] = storeAdmin.store_name
                inputArr[1] = storeAdmin.store_des
                inputArr[3] = storeAdmin.name
                inputArr[4] = storeAdmin.store_telephone
                inputArr[5] = storeAdmin.telephone
                inputArr[6] = storeAdmin.start_time + '-' + storeAdmin.end_time

                var openFlag = storeAdmin.is_open == 0 ? true : false
                var imgs = [storeAdmin.store_logo, storeAdmin.store_background]
                var cateArray = data.info.category_list

                var category_pid = storeAdmin.category_pid
                var category_id = storeAdmin.category_id
                for (var item of cateArray) {
                    if (item.category_pid == category_pid) {
                        that.setData({
                            cateArray1: item.second
                        })
                    }
                }
                for (var item of cateArray) {
                    if (item.category_pid == category_pid) {
                        for (var item1 of item.second) {
                            if (item1.category_id == category_id) {
                                that.setData({
                                    cate: item.name,
                                    cate1: item1.name,
                                    chooseCate: category_pid,
                                    chooseCate1: category_id
                                })
                            }
                        }
                    }
                }
                this.citySlect()
                inputArr[7] = storeAdmin.province
                inputArr[8] = storeAdmin.city
                inputArr[9] = storeAdmin.district
                inputArr[10] = storeAdmin.store_address
                var cityStr = storeAdmin.province + "-" + storeAdmin.city + "-" + storeAdmin.district
                var cityAllName = cityStr.split("-")
                that.setData({
                    cateArray: cateArray,
                    inputArr: inputArr,
                    imgs: imgs,
                    latitude: storeAdmin.latitude,
                    longitude: storeAdmin.longitude,
                    cityStr: cityStr,
                    openFlag: openFlag,
                    cityAllName: cityAllName,
                    typeArr:typeArr,
                    markers: [{
                        id: 0,
                        iconPath: "/images/map_local.png",
                        longitude: Number(storeAdmin.longitude),
                        latitude: Number(storeAdmin.latitude),
                        width: 30,
                        height: 30
                    }],
                    openTArr:openTArr
                })
            } else {
                http.showModal(data.info, false, () => {})
            }
        }, res => {})
    },
    // 取消自定义按钮加载中状态
    hideLoading: function () {
      this.data.btn.hideLoading();
    },

    // 店铺开关/关闭开店状态
    openChange() {
      if (!this.data.isFocus){
        var that = this
        var openFlag = that.data.openFlag ? false : true
        that.setData({
          openFlag: openFlag
        })
      }
    },

    // 店铺LOGO && 店铺背景图片
    upImgUrlBtn(e) {
      if (!this.data.isFocus) {
        var that = this
        var index = http.dataIndex(e)[0]
        var imgs = that.data.imgs
        var unionid = wx.getStorageSync('thisCode');
        let type = index==0?6:11;
        http.oneImg(res => {
            var formData = { folder: 'store_adjust', type: type, unionid: unionid }
            http.upImgAllSuccssAll(res, formData, function(resp) {
                var img = (resp.data).replace(/[\r\n]/g, "")
                imgs[index] = img
                that.setData({ imgs: imgs })
            }, 'Store/upload_image')
        })
      }
    },
    // 监听INPUT获取焦点事件
    startInputTxt(e){
      // if (!this.data.isFocus){
      //   this.setData({
      //     isFocus: true,
      //     focusField: e.currentTarget.dataset.field
      //   })
      // }
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
    // 监听INPUT失焦事件
    endInputTxt(e) {
      // const _that = this, _d = _that.data;
      // let ds = e.currentTarget.dataset;
      // if (!_d.isFocus || _d.focusField == ds.field) {
      //   if (!http.endInputArr(e)){
      //     _that.setData({ 
      //       showMap: false
      //     });
      //     A.showTipModal('最小长度为' + ds.minlen + '个字符', function () {
      //       _that.setData({
      //         showMap: true,
      //         isFocus: false,
      //         focusField: ds.field
      //       });
      //     });
      //     return;
      //   }else{
      //     this.setData({
      //       isFocus: false
      //     })
      //   }
      // }
    },

    // 选择经营品类
    chooseCateOpen() {
      if (!this.data.isFocus) {
          this.setData({
              chooseCateShow: true,
              cate1:''
          })
      }
    },
    // 关闭选择
    chooseCateClose() {
        this.setData({
            chooseCateShow: false
        })
    },
    // 选择经营品类列表
    chooseCate(e) {
      if (!this.data.isFocus) {
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
      }
    },
    // 选择二级经营品类列表
    chooseCate1(e) {
      if (!this.data.isFocus) {
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
      }
    },
    chooseCateClose1() {
        this.setData({
            chooseCateShow: false,
            chooseCateShow1: false
        })
    },
    chooseCateOpen1() {
      if (!this.data.isFocus) {
        let cate = this.data.cate
        if (cate) {
            this.setData({
                chooseCateShow: false,
                chooseCateShow1: true
            })
        } else {
            http.showModal('请先选择一级经营品类', false, () => { })
        }
      }
    },

    // 开启时间选择
    openChooseTime() {
      if (!this.data.isFocus) {
        this.setData({
            chooseTime: true
        })
      }
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
      if (!this.data.isFocus) {
        this.setData({
            chooseAddress: true
        })
      }
    },
    citySlect() {
      if (!this.data.isFocus) {
        var that = this
        that.setData({
            menbanF: true,
            cityF: true,
            areaArr: [],
            cityArr: []
        })
        var unionid = wx.getStorageSync('thisCode')
        wx.showLoading({ title: '加载中...', mask: true })
        // 省級別选择
        http._post1('Store/get_area_list', { unionid: unionid, id: 0, provinceid: 0, type: 1 }, res => {
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
        }, res => {wx.hideLoading()})
      }
    },
    // 省份选择
    cityBtn(e) {
      console.log(this.data.isFocus);
      if (!this.data.isFocus) {
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
        wx.showLoading({ title: '加载中', mask: true })
        // 省市区测试
        http._post1('Store/get_area_list', { unionid: unionid, id: preArrId[index], provinceid: 0, type: 2 }, res => {
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
        }, res => { wx.hideLoading() })
        that.setData({
            preAFlag: preAFlag,
            cityAFlag: [],
            areaAFlag: [],
            eidtF:0
        })
      }
    },
    // 城市选择
    cityBtn1(e) {
      if (!this.data.isFocus) {
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
        wx.showLoading({ title: '加载中', mask: true })
        // 省市区测试
        http._post1('Store/get_area_list', { unionid: unionid, id: cityAllId[1], provinceid: cityAllId[0], type: 3 }, res => {
            wx.hideLoading();
            var data = res.data
            if (data.status == 1) {
                if (data.info.length == 0) {
                    cityAllName[2] = that.data.cityAllName[1]
                    cityAllName[1] = that.data.cityAllName[0]

                    that.setData({
                        canClick: false,
                        cityAllName: that.data.cityAllName
                    })
                } else {
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
                        areaArrId: areaArrId
                    })
                }
            } else {
                http.showModal(data.info, false, () => {})
            }
        }, res => {wx.hideLoading()})
        that.setData({
            cityAFlag: cityAFlag,
            areaAFlag: [],
            eidtF:0
        })
      }
    },
    // 区域选择
    cityBtn2(e) {
      if (!this.data.isFocus) {
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
            eidtF:0
        })
      }
    },


    // 判断输入值的正则方式
    // identBtn(e) {
    //     var that = this
    //     var index = http.dataIndex(e)[0]
    //     var inputArr = that.data.inputArr
    //     var arr = http.inputArr(inputArr, e)
    //     var str = arr[index]
    //     if (index == 2) {
    //         if (!http.rexFn(str)[2]) {
    //             http.showModal('只允许输入中文字符', false, () => {})
    //             arr[index] = ""
    //             that.setData({ inputArr: arr })
    //             return
    //         }
    //     }
    //     if (index == 3) {
    //         if (!http.rexFn(str)[0]) {
    //             http.showModal('请输入正确的手机号码', false, () => {})
    //             arr[index] = ""
    //             that.setData({ inputArr: arr })
    //             return
    //         }
    //     }
    //     that.setData({ inputArr: arr })
    // },
    // 地图拖拽事件
    mapChange(e) {
      if (!this.data.isFocus) {
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
      }
    },
    // 定位当前地址按钮
    goOriginBtn() {
      if (!this.data.isFocus) {
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
                wx.reLaunch({
                  url: '/pages/authoritySetting/authoritySetting'
                })
            }
        })
      }
    },
    // 点击定位获取当前门店填写地址
    loaclOldAddBtn() {
      if (!this.data.isFocus) {
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
      }
    },
    loaclOldAddBtn1() {
      if (!this.data.isFocus) {
        let dwClick = this.data.dwClick
        if (dwClick) {
            var that = this
            var address = (that.data.cityAllName).join("")
            // address += that.data.cityStr
            address += that.data.inputArr[10]
            console.log(address)
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
                    http.showModal('无此定位', false, () => { })
                },
            })
            setTimeout(function() {
                that.setData({
                    dwClick: true
                })
            }, 5000)
        } else {
            http.showModal('操作过于频繁，请5s后重试', false, () => { })
        }
      }
    },

    // userDada() {
    //     this.setData({
    //         dadaDelivery: 1
    //     })
    // },
    // nUserDada() {
    //     this.setData({
    //         dadaDelivery: 0
    //     })
    // },
    // immediately() {
    //     this.setData({
    //         placeOrder: 1
    //     })
    // },
    // nimmediately() {
    //     this.setData({
    //         placeOrder: 0
    //     })
    // },


    // 点击保存
    confirmBtn() {
      if (!this.data.isFocus) {
        var that = this
        that.setData({ btn: that.selectComponent('#submit_btn') });
        var imgs = http.imgSup(that.data.imgs)
        var cityAllName = that.data.cityAllName
        var inputArr = that.data.inputArr
        var typeArr = that.data.typeArr
        var markers = that.data.markers
        let areaArrName = that.data.areaArrName;

        var openTArr = that.data.openTArr
        that.setData({ okEidtBtn: false })
        // if (!http.rexFn(typeArr[3])[3]) {
        //     http.showModal('只允许输入中文字符', false, () => { })
        //     return
        // }
        // if (!http.rexFn(str)[4]) {
        //     http.showModal('请输入正确的手机号码', false, () => { })
        //     return
        // }
        let valReg = A.validateFrom({
          storeLogo: imgs[0], // 店铺logo
          // storeBgImg: imgs[1], // 店铺背景图片
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
          storeLogo: { exp: "empty1", err: { field: 'storelogo', tip: "请上传店铺LOGO" } },
          // storeBgImg: { exp: "empty1", err: { field: 'storeBgImg', tip: "请上传店铺背景图片" } },
          storeName: { exp: /^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d]{1,9})$/, err: { field: 'storeName', tip: "请输入正确格式的店铺名称（1-9个字）" } },
            storeIntro: { exp: /^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d，,。.；;？\?：:、“”\"‘’'><\+\-\*\/／=（）\(\)\{\}【】\[\]%#\!！\|&￥\$\s]{2,200})$/, err: { field: 'storeIntro', tip: "请输入正确格式的店铺简介（2-200个字）" } },
          category: { exp: "empty1", err: { field: 'category', tip: "请设置行业类别" } },
          subCategory: { exp: "empty1", err: { field: 'subCategory', tip: "请设置二级行业类别" } },
          represent: { exp: /^([A-Za-z\u4E00-\u9FA5\uf900-\ufa2d]{2,8})$/, err: { field: 'represent', tip: "请输入正确格式的店铺负责人姓名（2-8个字）" } },
          representPhone: { exp: ["empty1", "phone"], err: { field: 'representPhone', tip: "请输入正确格式的负责人电话（11个字）" } },
            cusServPhone: { exp: ["empty1", "contactNumber"], err: { field: 'cusServPhone', tip: "请输入正确格式的客服电话（6-13个字的固话号码或11个字的手机号码）" } },
          openTime: { exp: "empty1", err: { field: 'openTime', tip: "请设置营业时间" } },
          closeTime: { exp: "empty1", err: { field: 'closeTime', tip: "请设置营业时间" } },
          storeAddrPro: { exp: "empty1", err: { field: 'storeAddrPro', tip: "请设置店铺地址所在省份" } },
          storeAddrCity: { exp: "empty1", err: { field: 'storeAddrCity', tip: "请设置店铺地址所在城市" } },
          storeAddrDetail: { exp: /^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d，,。.；;？\?：:、“”\"‘’'><\+\-\*\/／=（）\(\)\{\}【】\[\]%#\!！\|&￥\$]{5,60})$/, err: { field: 'storeAddrDetail', tip: "请输入正确格式的店铺详细地址（5-60个字）" } }
        });
        if (valReg !== true) {
          that.setData({ showMap: false });
          A.showTipModal(valReg.tip, function(){
            that.hideLoading();
            that.setData({ 
              showMap: true,
              focusField: valReg.field
            });
          });
          return;
        }
        if (((cityAllName[1] && areaArrName && areaArrName[0]) || (that.data.eidtF > 0 && cityAllName[1] != cityAllName[2])) && cityAllName[1] != cityAllName[0]) {
          let addrValReg = A.validateFrom({
            storeAddrDistinct: cityAllName[2] // 店铺地址-区域
          }, {
            storeAddrDistinct: { exp: "empty1", err: { field: 'storeAddrDistinct', tip: "请设置店铺地址所在区域" } }
          });
          if (addrValReg !== true) {
            that.setData({ showMap: false });
            A.showTipModal(addrValReg.tip, function () {
              that.hideLoading();
              that.setData({ showMap: true });
            });
            return;
          }
        }
        var unionid = wx.getStorageSync('thisCode')
        http._post1('Store/edit_store_info', {
            storelogo: imgs[0] || '',
            // shopbg: imgs[1] || '',
            storename: inputArr[0] || '',
            storedes: inputArr[1] || '',
            category_pid: typeArr[0] || 0,
            category_id: typeArr[1] || 0,
            name: inputArr[3] || '',
            // kefu_tel: inputArr[4],
            kefu_tel: inputArr[5] || '',
            province: cityAllName[0] || '',
            city: cityAllName[1] || '',
            district: cityAllName[2] || '',
            storeaddress: inputArr[10] || '',
            is_open: that.data.openFlag ? 0 : 1,
            longitude: markers[0].longitude || '',
            latitude: markers[0].latitude || '',
            unionid: unionid || '',
            start_time: openTArr[0] || '',
            end_time: openTArr[1] || '',
        }, res => {
            that.hideLoading();
            var data = res.data
            console.log(data)
            that.setData({ okEidtBtn: true })
            that.setData({ showMap: false });
            if (data.status == 1) {
                http.showModal(data.info, false, () => {
                    wx.navigateBack({
                        delta: 1
                    })
                })
            } else {
                http.showModal(data.info, false, () => {
                    wx.hideLoading();
                    that.setData({ showMap: true });
                })
            }
          }, res => { that.hideLoading() })
      }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      this.setData({ showMap: true });
    },
}))