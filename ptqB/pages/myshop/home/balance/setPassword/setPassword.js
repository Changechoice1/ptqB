var http = require('../../../../../utils/http.js')
var unionid = wx.getStorageSync('thisCode')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        focusF: ['1'],
        inputArr: [],
        inputSrr: "",
        allinputF1: true,
        allinputF2: false,
        focusF2: ['1'],
        inputArr2: [],
        inputSrr2: "",
        reset: 0,
        imgUrl:http.imgUrl,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.setData({ reset: options.reset })
    },
    passInput: function(e) {
        var that = this
        var index = e.target.dataset.index
        var focusF = http.forC(that.data.focusF)
        var inputArr = that.data.inputArr
        var value = e.detail.value
        if (inputArr[index]) {
            inputArr[index] = ''
            focusF[index] = '1'
        } else {
            inputArr[index] = value
            focusF[index + 1] = '1'
        }
        that.setData({ focusF: focusF, inputArr: inputArr })
    },
    allInputBtn: function(e) {
        var that = this
        var value = e.detail.value
        var num = e.detail.cursor - 1
        var inputArr = []
        for (let i = 0; i <= num; i++) {
            inputArr.push(value.substring(i, i + 1))
        }
     
     
        if (inputArr.length >= 6) {
          that.setData({
            inputSrr: value,
            inputArr: inputArr,
          })
          setTimeout(function () {

          that.setData({

            allinputF1: false,
            allinputF2: true,
            
          })
        }, 100);
        } else {
          that.setData({
            inputSrr: value,
            inputArr: inputArr,
          })
        }
        

    },
    allInputBtn2: function(e) {
        var that = this
        var value = e.detail.value
        var num = e.detail.cursor - 1
        var inputArr = []
        var inputSrr = that.data.inputSrr
        var unionid = wx.getStorageSync('thisCode')
        for (let i = 0; i <= num; i++) {
            inputArr.push(value.substring(i, i + 1))
        }

 
        if (inputArr.length >= 6) {
          that.setData({
            inputArr2: inputArr,
            inputSrr2: value
          })
            if (inputSrr === value) {
                http._post1('StoreWallet/re_set_password', { unionid: unionid, password: inputSrr }, res => {
                    var data = res.data
                    if (data.status == 1) {
                        // http.showModal(data.info, false, () => {
                        //     wx.navigateBack({
                        //         delta: 1
                        //     })
                        // })
                      this.setData({
                        'tip.ele': this.selectComponent("#diyModal"),
                        'tip.content': '安全密码设置成功',
                        'tip.showTitle': false,
                        'tip.hideCancel': true,
                        'tip.success': 'goBack'
                      });
                      this.data.tip.ele.showDialog();
                    } else {
                        http.showModal(data.info, false, () => {})
                        that.setData({
                            allinputF1: true,
                            allinputF2: false,
                            inputArr2: [],
                            inputSrr2: "",
                            inputArr: [],
                            inputSrr: "",
                        })
                    }
                }, res => {})
             
            } else {
              setTimeout(function () {
                http.showModal('两次密码输入不匹配,请重新输入', false, () => {
                  that.setData({
                    allinputF1: true,
                    allinputF2: false,
                    inputArr2: [],
                    inputSrr2: "",
                    inputArr: [],
                    inputSrr: "",
                  })
                })

              }, 100);
          
            }
        } else {
            that.setData({
                inputArr2: inputArr,
                inputSrr2: value
            })
        }
    },
    focusInput: function() {
        this.setData({ allinputF1: true, allinputF2: false })
    },
    focusInput2: function() {
        this.setData({ allinputF2: true, allinputF1: false })
    },
    // 返回上一页
    goBack: function(){
      wx.navigateBack({  delta: 1 })
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

})