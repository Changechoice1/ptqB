var unionid = wx.getStorageSync('thisCode')
var http = require('../../../../../utils/http.js')
var https = require('../../../../../utils/http.js').http
var util = require('../../../../../utils/util.js')
var app = getApp()
const A = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: http.imgUrl,
        status: '1',
        inputArr: [],
        editRemark: '0',
        editStatus: '0',
        // infoData: {},
        // accAllFlge: 1,
        // editDelFlag: true,
        allSelectFlag: false,
        onceRadArr: ['']
    },

    // 分类切换
    changeNav(e) {
        this.onLoad()
        this.setData({
            status: e.target.dataset.status
        })
    },

    // 修改备注
    openEditRemark(e) {
        let account_idEidt = http.dataIndex(e)[1]
        let status = e.currentTarget.dataset.status
        if (status == '0') {
            this.data.inputArr[0] = ''
        } else {
            this.data.inputArr[0] = e.currentTarget.dataset.remark
        }
        // console.log(account_idEidt)
        this.setData({
            editRemark: '1',
            inputArr: this.data.inputArr,
            account_idEidt:account_idEidt
        })
    },

    // 关闭修改备注
    closeEditRemark() {
        this.setData({
            editRemark: '0'
        })
    },

    // 获取所有INPUT的数据
    inputTxt(e) {
        var that = this
        var inputArr = that.data.inputArr
        var aa = http.inputArr(inputArr, e)
        // console.log(aa)
        that.setData({
            inputArr: aa,
            groupPriceF: false,
        })
    },


    // 确认修改备注
    confirmEditRemark(e) {

        var that = this
        var remark = that.data.inputArr[0];
       if (remark.length<2){
          wx.showModal({ title: '温馨提示', content: '请输入正确格式的姓名（2-8个字）', showCancel:false});
          return;
       }
        var unionid = wx.getStorageSync('thisCode')
        http._post1('StoreAccount/remark', { unionid: unionid, account_id: this.data.account_idEidt, remark: remark }, res => {
            var data = res.data
            if (data.status == 1) {
                wx.showToast({
                    title: data.info,
                    icon: 'success',
                    duration: 1000,
                    mask: true,
                    succes: that.onLoad()
                })
                that.setData({
                    editRemark: '0'
                })
            } else {
                
            }
        })
    },

    // 编辑
    changeEdit(e) {
        this.setData({
            editStatus: e.target.dataset.status
        })
    },

    // 关闭提示框
    modelHide() {
        app.modelHide(this)
    },
    // 拒绝提示
    emptyBtn(e) {
        var thatId = Number(e.target.dataset.id)
        var index = e.target.dataset.index
        this.setData({
            notMData: {
                show: true,
                txt: '确定拒绝吗？',
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

        var type = http.dataIndex(e)[2]
        var unionid = wx.getStorageSync('thisCode')
        var list1 = that.data.list1
        var list2 = that.data.list2
        var infoData = that.data.infoData

        var infoTxt = '是否拒绝该申请'
        http.showModal1(infoTxt, true, () => {
            http._post1('StoreAccount/del', { unionid: unionid, account_id: id }, res => {
                var data = res.data
                if (data.status == 1) {
                    if (type == 1) {
                        infoData.account_list_num--
                        list1.splice(index, 1)
                        that.setData({ list1: list1, infoData: infoData, showIco: [] })
                    } else {
                        infoData.apply_list_num--
                        list2.splice(index, 1)
                        that.setData({ 
                            list2: list2, 
                            infoData: infoData, 
                            showIco: [] 
                        })
                    }
                } else {
                    http.showModal(data.info, false, () => { })
                }
            }, res => { })
        }, () => { })
    },
    agreeBtn: function (e) {
        var that = this
        var index = http.dataIndex(e)[0]
        var id = http.dataIndex(e)[1]
        var unionid = wx.getStorageSync('thisCode')
        var list2 = that.data.list2
        var list1 = that.data.list1
        var infoData = that.data.infoData
        http.showModal1('确定要同意吗？', true, () => {
            http._post1('StoreAccount/add', { account_id: id, unionid: unionid }, res => {
                var data = res.data
                if (data.status == 1) {
                    list1.push(list2[index])
                    list2.splice(index, 1)
                    infoData.apply_list_num--
                    infoData.account_list_num++
                    this.onLoad()
                } else {
                    http.showModal(data.info, false, () => { })
                }
            }, res => { })
        }, () => { })
    },


    // 删除提示
    delBtn(e) {
        var thatId = Number(e.target.dataset.id)
        var index = e.target.dataset.index
        this.setData({
            notMData: {
                show: true,
                txt: '确定删除吗？',
                cancel: 'modelHide',
                ok: 'delbusArrBtn',
                data: {
                    id: thatId,
                    index: index
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var unionid = wx.getStorageSync('thisCode')
        var phoneH = (Number(util.nowPhoneWH()[1]) * 70) / 100
        var phoneH1 = (Number(util.nowPhoneWH()[1]) * 8) / 100
        var phoneH2 = (Number(util.nowPhoneWH()[1]) * 13) / 100
        that.setData({
            scrollScroll: phoneH,
            topPx: phoneH1,
            headPx: phoneH2
        })

        http._post1('StoreAccount/account_ally', { unionid: unionid }, res => {
            var data = res.data
            if (data.status == 1) {
                var onceRadArr = []
                for (let i in data.account_list) {
                    onceRadArr[i] = ""
                }
                that.setData({
                    list1: data.account_list,
                    list2: data.apply_list,
                    infoData: data,
                    onceRadArr: onceRadArr,
                    allSelectFlag: false
                })
            } else {
                http.showModal(data.info, false, () => { })
            }
        }, res => { })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    // 删除商盟
    delbusArrBtn(e) {
        var that = this
        var onceRadArr = this.data.onceRadArr
        var list1 = that.data.list1
        var ally_ids = []
        var unionid = wx.getStorageSync('thisCode')
        let onceRadFlag = false
        for (let i in onceRadArr) {
            if (onceRadArr[i]) {
                onceRadFlag = true
            }
        }

        if (onceRadArr.length < 1 || !onceRadFlag) {
            http.showModal('请至少先选择一个子账号', false, () => { })
            return
        }
        for (let j in onceRadArr) {
            if (onceRadArr[j]) {
                ally_ids.push(list1[j].account_id)
            }
        }
        http.showModal1('是否删除子账号？', true, () => {
            http._post1('StoreAccount/multiple_del', { account_ids: ally_ids.join(','), unionid: unionid }, res => {
                http.showModal(res.data.info, false, () => { })
                if (res.data.status == 1) {
                    that.onLoad()
                }
            })
        }, () => { })
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
    // 点击查看图片
    shopEwmBtn(e) {
        var that = this
        var url = http.dataIndex(e)[0]
        wx.previewImage({
            current: url,
            urls: [url]
        })
    },

    // 二维码Hide
    showEwm() {
        var that = this
        var infoData = that.data.infoData
      //   wx.showLoading({ title: '加载中...', })
        this.setData({
            ewmF: true,
           ewmImg: infoData.url
        })
      //   wx.downloadFile({
      //       url: infoData.url, //仅为示例，并非真实的资源
      //       success: res => {
      //           wx.hideLoading()
      //           that.setData({
      //               ewmImg: res.tempFilePath
      //           })
      //       },
      //      fail: err => {
      //         wx.hideLoading()
      //         console.log(err);
      //      }
      //   })
    },
    hideEwm() {
        this.onLoad()
        this.setData({
            ewmF: false
        })
    },

    onShow() {
        // this.onLoad()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.onLoad()
    }
})