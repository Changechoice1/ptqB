var http = require('../../../../../utils/http.js')
var unionid = wx.getStorageSync('thisCode')
const A = getApp();
Page(A.assignPage({

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
        mengban: false,
        successShow:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var unionid = wx.getStorageSync('thisCode')
        var identType = 2
        this.setData({ identType: identType })
        var alipay_id = options.alipay_id || 0
        if (alipay_id) {
            alipay_id = alipay_id
            this.setData({ wechatPayFlage: false, alipay_id: alipay_id })
        }
        http._post1('Wallet/deposit', { unionid: unionid, identity: identType, alipay_id: alipay_id }, res => {
            var data = res.data
            if (data.status == 1) {
                this.setData({
                    widthDraData: data,
                    // alipay_id: data.alipay_single.id
                })
            }
        }, res => {})
	
        this.setData({ 
          compageEle: this.selectComponent('#compage'),
          pwdEle: this.selectComponent('#cipherSix')
        });
    },
    tapPayMode(e) {
        var that = this
        that.onShow()
        var falge = http.dataIndex(e)[0] == 1 ? true : false
        that.setData({
            wechatPayFlage: falge
        })
    },
    moneyNowBtn(e) {
       var val = e.detail.value,
          reg = /^\d*(\.\d{0,2})?$/;
       console.log(reg.test(val));
       if (reg.test(val)){
          this.setData({ new_money: e.detail.value })
       }else{
          this.setData({ new_money: this.data.new_money })
       }
    },
    // 点击安全体现
    securityWith() {
        var service_charge = 0
        var shidao = 0
        var widthInfo = this.data.widthDraData.withdraw_d_res
        var newMoney = this.data.new_money
        if (newMoney > 20000) {
          this.showDiyModal({
            tipContent: '单日、单笔限额20000元'
          });
          return
        }
        if (newMoney < 10) {
            // http.showModal('提现金额不能低于10元', false, () => {})
          this.showDiyModal({
            tipContent: '提现金额不能低于10元'
          });
          return
        }
        if (this.data.widthDraData.deposit.deposit_num <= 0) {
            // http.showModal(this.data.widthDraData.deposit.deposit_info, false, () => {})
          this.showDiyModal({
            tipContent: this.data.widthDraData.deposit.deposit_info
          });
            return
        }
        if (newMoney > Number(this.data.widthDraData.wallet)) {
            // http.showModal('可提现金额不足', false, () => {})
          this.showDiyModal({
            tipContent: '可提现金额不足'
          });
            return
        }
        this.showTx()
        var passObj = this.data.passObj
            passObj.allinputF1 = true
        if (!this.data.wechatPayFlage) {
            service_charge = 1
            var commission = Number(widthInfo.commission) / 100
            if (newMoney * commission <= 1) {
                service_charge = 1
            } else if (newMoney * commission >= 25) {
                service_charge = 25
            } else {
                service_charge = (newMoney * commission).toFixed(2)
            }
            shidao = Number(newMoney) - Number(service_charge)
            this.setData({
                service_charge: service_charge,
                shidao: shidao,
                passObj:passObj
            })
        } else {
            
            this.setData({
                service_charge: 0,
                shidao: newMoney,
                passObj:passObj
            })
        }
    },
    hideAll(e) {
        if(this.data.pwdEle){
          this.hidePwdModal();
        }
        if(this.data.tipEle){
          this.hideDiyModal();
        }
        this.setData({
            mengban: false,
            txTxFlage:false,
            passObj: {
                focusF: ['1'],
                inputArr: [],
                inputStr: "",
                allinputF1: false,
            },
            successShow:false,
        })
       if (e){
          if (e.currentTarget.dataset.type){
            wx.navigateBack({
               delta: 1
            })

          }
         }
    },
    // 点击确认
    canUp() {
        var unionid = wx.getStorageSync('thisCode');
        this.quiteUp()
        if (this.data.identType == 2) {
            this.show()
        } else {
            http._post1('Wallet/withdraw_do', {
                unionid: unionid,
                money: this.data.new_money,
                identity: this.data.identType,
                alipay_id: this.data.alipay_id,
                pay_way: this.data.wechatPayFlage ? 2 : 1,
            }, res => {
                var data = res.data
                if (data.status == 1) {
                    this.hideAll()
                    this.setData({successShow:true,mengban:true})
                    http._post1('Wallet/deposit', { unionid: unionid, identity: this.data.identType, alipay_id: this.data.alipay_id }, res => {
                        var data = res.data
                        if (data.status == 1) {
                            this.setData({ widthDraData: data })
                        }
                    }, res => {})
                } else if (data.status == 0) {
                    // http.showModal(data.info, false, () => {
                    //     this.hideAll()
                    // })
                  this.showDiyModal({
                    tipContent: data.info,
                    tipSuccess: 'hideAll'
                  });
                }
            }, res => {

            })
        }

    },
    passInput(e) {
        var that = this
        var value = e.detail.value
        var num = e.detail.cursor - 1
        var passObj = this.data.passObj
        var unionid = wx.getStorageSync('thisCode')
        var inputArr = []
        for (let i = 0; i <= num; i++) {
            inputArr.push(value.substring(i, i + 1))
        }
        if (inputArr.length >= 6) {
            passObj.inputStr = value
            passObj.inputArr = inputArr,
                that.setData({
                    passObj: passObj,
                })
            http._post1('Wallet/withdraw_do', {
                unionid: unionid,
                money: this.data.new_money,
                identity: this.data.identType,
                alipay_id: this.data.alipay_id,
                pay_way: this.data.wechatPayFlage ? 2 : 1,
                password: value
            }, res => {
                var data = res.data
                if (data.status == 1) {
                    this.hideAll()
                    this.hidePwdModal();
                    this.setData({successShow:true,mengban:true})
                    http._post1('Wallet/deposit', { unionid: unionid, identity: this.data.identType, alipay_id: this.data.alipay_id }, res => {
                        var data = res.data
                        if (data.status == 1) {
                            this.setData({ widthDraData: data })
                        }
                    }, res => {})
                } else {
                  // http.showModal(data.info, false, () => {
                  //     this.hideAll()
                  // })
                  // http.showModal('密码错误，请重试', false, () => {
                  //     this.hideAll()
                  // })
                  this.hidePwdModal();
                  this.showDiyModal({ 
                    tipContent: data.info,
                    tipSuccess: 'hideAll'
                  });
                }
            }, res => {

            })
        } else {
            passObj.inputStr = value
            passObj.inputArr = inputArr,
                that.setData({
                    passObj: passObj,
                })
        }
    },
    allInputBtn(e) {
        var that = this
        var index = e.target.dataset.index
        var passObj = this.data.passObj
        var focusF = http.forC(passObj.focusF)
        var inputArr = passObj.inputArr
        var value = e.detail.value
        if (inputArr[index]) {
            inputArr[index] = ''
            focusF[index] = '1'
        } else {
            inputArr[index] = value
            focusF[index + 1] = '1'
        }
        that.setData({ passObj: passObj })
    },
    // 点击关闭密码框
    hideBox() {
        var passObj = this.data.passObj
        passObj.allinputF1 = false
        this.setData({ passObj: passObj })
    },
    show() {
        var passObj = this.data.passObj
        passObj.allinputF1 = true
        this.setData({ passObj: passObj })
    },
    focusInput() {
        this.show()
    },
    // 提现页面
    quiteUp() {
        this.setData({ txTxFlage: false,mengban:false,})
    },
    showTx() {
      this.showPwdModal();
        this.setData({ txTxFlage: true,mengban:true,})
    },
    // 显示提示框
    showDiyModal: function(opts){
      this.setData({
        tipEle: opts.tipEle || this.selectComponent("#diyModal"),
        tipShowTitle: opts.tipShowTitle || true,
        tipContent: opts.tipContent || '',
        tipHideCancel: opts.tipHideCancel || true,
        tipSuccess: opts.tipSuccess || 'hideDiyModal'
      });
      this.data.tipEle.showDialog();
    },
    // 隐藏提示框
    hideDiyModal: function () {
      console.log(this.data);
      this.data.tipEle.hideDialog();
    },
    // 显示提现密码框
    showPwdModal: function(){
      this.data.pwdEle.show();
    },
    // 隐藏提现密码框
    hidePwdModal: function(){
      // this.data.pwdEle.hide();
			this.selectComponent('#cipherSix').hide();
      this.clearPwd();
    },
    // 清空提现密码
    clearPwd: function(){
      // this.data.pwdEle.clearPass();
			this.selectComponent('#cipherSix').clearPass()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var that = this
        var options = {
            alipay_id: that.data.alipay_id
        }
        // this.onLoad(options)
    }
}))