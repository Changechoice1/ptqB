var http = require('../../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: http.imgUrl,
    wechatPayFlage: true,
    passObj: {
      focusF: ['1'],
      inputArr: [],
      inputStr: "",
      allinputF1: false,
    },
    alipay_id: 0,
    widthDraData: {},
    txTxFlage: false,
    new_money: 0,
    service_charge: 0,
    shidao: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var unionid = wx.getStorageSync('thisCode');
    var identType = options.type || 1;
    this.setData({ identType: identType })
    var alipay_id = options.alipay_id || 0;
    if (options.alipay_id) {
      alipay_id = options.alipay_id;
      this.setData({ wechatPayFlage: false, alipay_id: alipay_id });
    }
    http._post1('StoreStaff/deposit', { unionid: unionid, alipay_id: alipay_id }, res => {
      var data = res.data;
      if (data.status == 1) {
        this.setData({
          widthDraData: data,
          alipay_id: data.alipay_single.id
        })
      }
    }, res => { })
  },
  tapPayMode(e) {
    var that = this;
    var falge = http.dataIndex(e)[0] == 1 ? true : false;
    that.setData({
      wechatPayFlage: falge
    })
  },
  moneyNowBtn(e) {
    this.setData({ new_money: e.detail.value })
  },
  // 点击安全体现
  securityWith() {
    var service_charge = 0;
    var shidao = 0;
    var widthInfo = this.data.widthDraData.withdraw_d_res;
    var newMoney = this.data.new_money;
    if (newMoney < 10) {
      http.showModal('提现金额不能低于10元', false, () => { })
      return
    }
    if (this.data.widthDraData.alipay_single.account_number <= 0) {
      http.showModal('您的可提现金额不足', false, () => { })
      return
    }
    if (newMoney > Number(this.data.widthDraData.wallet)) {
      http.showModal('可提现金额不足', false, () => { })
      return
    }
    this.showTx()

    if (!this.data.wechatPayFlage) {
      service_charge = 1;
      var commission = Number(widthInfo.commission) / 100;
      if (newMoney * commission <= 1) {
        service_charge = 1
      } else if (newMoney * commission >= 25) {
        service_charge = 25
      } else {
        service_charge = (newMoney * commission).toFixed(2)
      }
      shidao = Number(newMoney) - Number(service_charge)
      console.log(service_charge)
      this.setData({
        service_charge: service_charge,
        shidao: shidao
      })
    } else {
      this.setData({
        service_charge: 0,
        shidao: newMoney
      })
    }
  },
  // 点击确认
  canUp() {
    var unionid = wx.getStorageSync('thisCode');
    this.quiteUp();
    if (1 == 2) {
      this.show();
    } else {
      http._post1('StoreStaff/withdraw_do', {
        unionid: unionid,
        money: this.data.new_money,
        identity: 1,
        alipay_id: this.data.alipay_id,
        pay_way: this.data.wechatPayFlage ? 2 : 1,
      }, res => {
        var data = res.data;
        if (data.status == 1) {
          http.showModal(data.info, false, () => { 
            this.setData({
              passObj: {
                focusF: ['1'],
                inputArr: [],
                inputStr: "",
                allinputF1: false,
              },
              txTxFlage: false,
            })
            // http._post1('StoreStaff/deposit', { unionid: unionid, alipay_id: this.data.alipay_id }, res => {
            //   var data = res.data;
            //   if (data.status == 1) {
            //     this.setData({
            //       widthDraData: data,
            //     })
            //   }
            // }, res => { })
						wx.navigateBack({
							delta:1
						})
          })
        } else if (data.status == 233) {
          http.showModal(data.info, false, () => {
            this.setData({
              passObj: {
                focusF: ['1'],
                inputArr: [],
                inputStr: "",
                allinputF1: true,
              },
            })
          })
        }
      }, res => {

      })
    }

  },
  passInput(e) {
    var that = this;
    var value = e.detail.value;
    var num = e.detail.cursor - 1;
    var passObj = this.data.passObj;
    var unionid = wx.getStorageSync('thisCode');
    var inputArr = [];
    console.log(value)
    for (let i = 0; i <= num; i++) {
      inputArr.push(value.substring(i, i + 1))
    }
    if (inputArr.length >= 6) {
      passObj.inputStr = value;
      passObj.inputArr = inputArr,
        that.setData({
          passObj: passObj,
        })
      http._post1('StoreStaff/withdraw_do', {
        unionid: unionid,
        money: this.data.new_money,
        identity: 1,
        alipay_id: this.data.alipay_id,
        pay_way: this.data.wechatPayFlage ? 2 : 1,
        password: value
      }, res => {
        var data = res.data;
        if (data.status == 1) {
          http.showModal(data.info, false, () => {
            this.setData({
              passObj: {
                focusF: ['1'],
                inputArr: [],
                inputStr: "",
                allinputF1: false,
              },
              txTxFlage: false,
            })
            http._post1('Wallet/deposit', { unionid: unionid, identity: 1, alipay_id: this.data.alipay_id }, res => {
              var data = res.data;
              if (data.status == 1) {
                this.setData({ widthDraData: data })
              }
            }, res => { })
          })
        } else {
          http.showModal(data.info, false, () => {
            this.setData({
              passObj: {
                focusF: ['1'],
                inputArr: [],
                inputStr: "",
                allinputF1: true,
              },
            })
          })
        }
      }, res => {

      })
    } else {
      passObj.inputStr = value;
      passObj.inputArr = inputArr,
        that.setData({
          passObj: passObj,
        })
    }
  },
  allInputBtn(e) {
    var that = this;
    var index = e.target.dataset.index;
    var passObj = this.data.passObj;
    var focusF = http.forC(passObj.focusF);
    var inputArr = passObj.inputArr;
    var value = e.detail.value;
    console.log(value)
    if (inputArr[index]) {
      inputArr[index] = '';
      focusF[index] = '1';
    } else {
      inputArr[index] = value;
      focusF[index + 1] = '1';
    }
    that.setData({ passObj: passObj })
  },
  // 点击关闭密码框
  hideBox() {
    var passObj = this.data.passObj
    passObj.allinputF1 = false;
    this.setData({ passObj: passObj })
  },
  show() {
    var passObj = this.data.passObj
    passObj.allinputF1 = true;
    this.setData({ passObj: passObj })
  },
  focusInput() {
    this.show()
  },
  // 提现页面
  quiteUp() {
    this.setData({ txTxFlage: false })
  },
  showTx() {
    this.setData({ txTxFlage: true })
  },
})