var http = require('../../../../../utils/http.js')
var unionid = wx.getStorageSync('thisCode')
var util = require('../../../../../utils/util.js')
var app = getApp()

Page({
    data: {
        showIco: [],
        ewmF: false,
        imgUrl: http.imgUrl,
        accAllFlge: 1,
        editDelFlag: false,
        allSelectFlag: false,
        onceRadArr: [],
        countDown: 0,
        countDownArr: [],
        moveFlag: false,
        list1: [],
        list2: [],
        busActObj: {},
        sPageY: 0,
        nullData: {
            img: '/images/lm_none.png',
            txt: '暂无商家申请联盟'
        }
    },
    currentBtn(e) {
        var that = this
        var index = e.detail.current
        var scrollScroll = 0
        if (index == 1) {
            scrollScroll = (Number(util.nowPhoneWH()[1]) * 62) / 100
        } else if (index == 0) {
            scrollScroll = (Number(util.nowPhoneWH()[1]) * 70) / 100
        }
        that.setData({
            accAllFlge: index,
            scrollScroll: scrollScroll
        })
    },
    onLoad(options) {
        var that = this
        var unionid = wx.getStorageSync('thisCode')
        var phoneH = (Number(util.nowPhoneWH()[1]) * 62) / 100
        var phoneH1 = (Number(util.nowPhoneWH()[1]) * 8) / 100
        var phoneH2 = (Number(util.nowPhoneWH()[1]) * 13) / 100
        var phoneH3 = (Number(util.nowPhoneWH()[1]) * 8) / 100
        that.setData({
            scrollScroll: phoneH,
            topPx: phoneH1,
            headPx: phoneH2,
            txHeight: phoneH3
        })

        http._post1('StoreAlly/store_ally', { unionid: unionid }, res => {
            var data = res.data
            // if (data.authentication_info.is_authentication != 1 && !data.authentication_info.due_time) {
            //     http.showModal('您暂时无法使用此功能，请认证后使用', false, () => {
            //         wx.redirectTo({
            //             url: '/pages/myshop/my/qualificationCert/tip/tip'
            //         })
            //     })
            //     return
            // }
            if (data.status == 1) {
                var onceRadArr = []
                for (let i in data.ally_list) {
                    onceRadArr[i] = ""
                }
                var countDownArr = util.dayTimeArr(that.data.countDown)
                if (data.authentication_info.due_time > 0) {
                    countDownArr = util.dayTimeArr(data.authentication_info.due_time)
                    that.setData({
                        countDown: data.authentication_info.due_time || 0
                    })
                    let hideTime = setInterval(() => {
                        let countDown = that.data.countDown - 1
                        countDownArr = util.dayTimeArr(countDown)
                        if (countDown <= 0) {
                            clearInterval(countDown)

                            return
                        }
                        that.setData({
                            countDownArr: countDownArr,
                            countDown: countDown
                        })
                    }, 1000)
                }
                // console.log(onceRadArr)
                // console.log(data.ally_list)
                that.setData({
                    list1: data.ally_list,
                    list2: data.apply_list,
                    infoData: data,
                    onceRadArr: onceRadArr,
                    countDownArr: countDownArr
                })
            } else {
                http.showModal(data.info, false, () => {})
            }
        }, res => {})
    },
    // 单个选中的事件
    onceSelectBtn(e) {
        var that = this
        var index = http.dataIndex(e)[0]
        var onceRadArr = that.data.onceRadArr
        onceRadArr[index] = onceRadArr[index] ? '' : '1'
        var onceRadArrLength = onceRadArr.length
        var judgeFlag = 0
        for (let i in onceRadArr) {
            if (onceRadArr[i]) {
                judgeFlag++
            }
        }
        if (judgeFlag == onceRadArrLength) {
            that.setData({ allSelectFlag: true })
        } else {
            that.setData({ allSelectFlag: false })
        }
        that.setData({ onceRadArr: onceRadArr })
    },
    // 全选
    allSelectBtn() {
        var that = this
        var allSelectFlag = !that.data.allSelectFlag
        var onceRadArr = []
        if (allSelectFlag) {
            for (let i in that.data.onceRadArr) {
                onceRadArr[i] = "1"
            }
        } else {
            for (let i in that.data.onceRadArr) {
                onceRadArr[i] = ""
            }
        }
        console.log(onceRadArr)
        that.setData({
            allSelectFlag: allSelectFlag,
            onceRadArr: onceRadArr
        })
    },
    hideBtn() {
        this.setData({
            ewmFlag: false
        })
    },
    showBtn() {
        this.setData({
            ewmFlag: true
        })
    },
    // 点击查看图片
    shopEwmBtn(e) {
        var that = this
        var url = http.dataIndex(e)[0]
        wx.previewImage({
            current: url,
            urls: [url]
        })
    },
    // 删除商盟
    delbusArrBtn(e) {
        var that = this
        var onceRadArr = this.data.onceRadArr
        var list1 = that.data.list1
        var ally_ids = []
        let onceRadFlag = false
        var unionid = wx.getStorageSync('thisCode')
        for (let i in onceRadArr) {
            if (onceRadArr[i]) {
                onceRadFlag = true
            }
        }
        if (onceRadArr.length < 1 || !onceRadFlag) {
            http.showModal('请至少先选择一个盟友', false, () => {})
            return
        }
        for (let j in onceRadArr) {
            if (onceRadArr[j]) {
                ally_ids.push(list1[j].ally_id)
            }
        }
        http.showModal1('是否删除结盟关系？', true, () => {
            http._post1('StoreAlly/multiple_del', { ally_ids: ally_ids.join(','), unionid: unionid }, res => {
                http.showModal(res.data.info, false, () => {})
                if (res.data.status == 1) {
                    that.onLoad()
                }
            })
        }, () => {})
    },
    agreeBtn: function(e) {
        var that = this
        var index = http.dataIndex(e)[0]
        var id = http.dataIndex(e)[1]
        var unionid = wx.getStorageSync('thisCode')
        var list2 = that.data.list2
        var list1 = that.data.list1
        var infoData = that.data.infoData
        if (this.data.infoData.authentication_info.is_authentication != 1 && this.data.countDown < 0) {
            http.showModal('抱歉!请认证后使用本功能', false, () => {})
            return
        }
        http.showModal1('是否确认结盟关系？', true, () => {
            http._post1('StoreAlly/add', { ally_id: id, unionid: unionid }, res => {
                var data = res.data
                if (data.status == 1) {
                    list1.push(list2[index])
                    list2.splice(index, 1)
                    infoData.apply_list_num--
                        infoData.ally_list_num++
                        that.setData({
                            list1: list1,
                            list2: list2,
                            infoData: infoData,
                            showIco: []
                        })
                } else {
                    http.showModal(data.info, false, () => {})
                }
            }, res => {})
        }, () => {})
    },
    // 点击查看是否出现删除选项
    editDelBtnL() {
        this.setData({
            editDelFlag: false
        })
    },
    editDelBtnL1() {
        this.setData({
            editDelFlag: true
        })
    },
    // 点击切换
    accLoadingBtn(e) {
        var that = this
        var accAllFlge = http.dataIndex(e)[0]
        that.setData({
            accAllFlge: accAllFlge
        })
    },
    // 点击切换模式
    tabModeBtn(e) {
        var that = this
        var index = http.dataIndex(e)[0]
        var showIco = that.data.showIco
        showIco[index] = "1"
        that.setData({ showIco: showIco })
    },
    // 点击
    sortBusBtn() {
        let list1 = this.data.list1;
        this.setData({ moveFlag: true,oldData:list1 })
    },
    sortBusBtnHide() {
        let oldData = this.data.oldData;
        this.setData({ moveFlag: false ,list1:oldData})
    },
    // 点击抬起移动
    stratBtn() {

    },
    // 拖拽的函数群
    // 初始点击
    stratBtn(e) {
        let index = http.dataIndex(e)[0]
        let list1 = this.data.list1
        let pageY = Number(e.touches[0].pageY)
        let busActObj = list1[index]
        this.setData({
            sPageY: pageY,
            mPageY: pageY,
            moveSortBox: true,
            clickIndex: index,
            busActObj: busActObj
        })
    },
    // 开始移动
    moveBtn(e) {
        let pageY = Number(e.touches[0].pageY)
        this.setData({
            mPageY: pageY,
            moveSortBox: true,
        })
        return false
    },
    // 结束点击
    endBtn(e) {
        let sPageY = Number(this.data.sPageY)
        let list1 = this.data.list1
        let pageY = Number(e.changedTouches[0].pageY)
        let clickIndex = Number(this.data.clickIndex)
        let busActObj = this.data.busActObj
        let position = parseInt((pageY - sPageY) / 90) + (clickIndex + 1)
        list1.splice(clickIndex, 1)
        list1.splice(position, 0, busActObj)
        
        var ally_ids = ''
        for (let item of list1) {
            ally_ids += item.ally_id + ','
        }
        this.setData({
            moveSortBox: false,
            list1: list1,
            ally_ids: ally_ids
        })
    },
    // 保存排序
    sortBusBtnConfirm() {
        var unionid = wx.getStorageSync('thisCode');
        var ally_idarr = []
        let list1 = this.data.list1;
        list1.find(item=>{
            ally_idarr.push(item.ally_id)
        })
        let ally_ids = ally_idarr.join(',');
        console.log(ally_ids)
        http._post1('StoreAlly/sort', { unionid: unionid, ally_ids: ally_ids }, res => {
            var data = res.data
            if (data.status == 1) {
                http.showModal(data.info, false, () => {})
                this.setData({
                    moveFlag: false
                })
            } else {
                http.showModal(data.info, false, () => {})
            }
        }, res => {})
    },
    // 拖拽排序技术
    // 排序2.0 点击排序
    // 往下走
    allSortBtn(e){
        let index = Number(http.dataIndex(e)[0]);
        let type = Number(http.dataIndex(e)[2]);
        let list1 = this.data.list1;
        let ws = type == 1?index-1:index+1;
        let objSort = list1[ws];
        let objSort1 = list1[index];
        list1[index] = objSort;
        list1[ws] = objSort1;
        this.setData({
            list1:list1
        })
    },
    // 二维码Hide
    showEwm() {
        var that = this
        var infoData = that.data.infoData
        if ((infoData.authentication_info.is_authentication == 1 && this.data.countDown < 0) || infoData.authentication_info.is_authentication != 1) {
            http.showModal('抱歉!请认证后使用本功能', false, () => {})
            return
        }
        this.setData({
            ewmF: true,
            ewmImg: infoData.url
        })
      //   wx.downloadFile({
      //       url: infoData.url, //仅为示例，并非真实的资源
      //       success: res => {
      //           wx.hideLoading();
      //           that.setData({
      //               ewmImg: res.tempFilePath
      //           })
      //       }
      //   })
    },
    hideEwm() {
        this.setData({
            ewmF: false
        })
    },
    // 点击前往认证
    navAut() {
        wx.redirectTo({
          url: '/pages/myshop/my/qualificationCert/index'
        })
    },

    // 关闭提示框
    modelHide() {
        app.modelHide(this);
    },
    // 群发提示
    confirmBtn(e) {
        var thatId = Number(e.target.dataset.id);
        var index = e.target.dataset.index;
        this.setData({
            notMData: {
                show: true,
                txt: '确定拒绝吗',
                cancel: 'modelHide',
                ok: 'listDel',
                data: {
                    id: thatId,
                    index: index
                }
            }
        })
    },
    listDel(e) {
        var that = this
        var index = http.dataIndex(e)[0]
        var id = http.dataIndex(e)[1]
        var unionid = wx.getStorageSync('thisCode')
        var list1 = that.data.list1
        var list2 = that.data.list2
        var type = http.dataIndex(e)[2]
        var infoData = that.data.infoData
        var infoTxt = type == 1 ? '是否删除结盟关系？' : '是否删除此申请店铺?'
        http.showModal1(infoTxt, true, () => {
            http._post1('StoreAlly/del', { unionid: unionid, ally_id: id }, res => {
                var data = res.data
                if (data.status == 1) {
                    if (type == 1) {
                        infoData.ally_list_num--
                            list1.splice(index, 1)
                        that.setData({ list1: list1, infoData: infoData, showIco: [] })
                    } else {
                        infoData.apply_list_num--
                            list2.splice(index, 1)
                        that.setData({ list2: list2, infoData: infoData, showIco: [] })
                    }
                } else {
                    http.showModal(data.info, false, () => {})
                }
            }, res => {})
        }, () => {})
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },
    onPullDownRefresh() {
        this.onLoad()
    }
})