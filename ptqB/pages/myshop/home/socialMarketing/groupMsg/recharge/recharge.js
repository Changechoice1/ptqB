var http = require('../../../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        gmrArr: [],
        gmrSty: ['gmr_t_in_r'],
        gmrprice: 0,
        quantity: 0,
        priceTxt:0,
        wxPay: false, // 是否为余额支付（true：余额支付，false：微信支付）
        imgUrl: http.imgUrl,
        store_id: 0,

        sixObj: {

        },
        wxRecharge: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.startFn()
        this.diyMoadel = this.selectComponent("#diyMoadel");
        this.cipherSix = this.selectComponent("#cipherSix");

    },
    showDialog() {
        this.diyMoadel.showDialog();
    },
    hideDialog() {
        this.diyMoadel.hideDialog();
    },
    // 点击判断是否充值
    payType() {
        // this.showDialog();
        let wxPay = this.data.wxPay;
        let gmrprice = this.data.gmrprice;

        if ((gmrprice > Number(this.data.wallet)) && this.data.wxPay) {
            this.showDialog();
            this.setData({
                modelData: {
                    titleHide: true,
                    con: '亲，您的余额不足',
                    onceConfirm: true,
                }
            })
            return
        }
        // let btnStr = wxPay ? 'blanceYe' : 'wxPayFn'
        // this.setData({
        //     modelData: {
        //         titleHide: true,
        //         con: '确认充值短信吗？',
        //         onceConfirm: false,
        //         cancelEvent: 'hideDialog',
        //         confirmEvent: btnStr,
        //     },
        // })
        if (wxPay) {
            this.blanceYe();
        } else {
            this.wxPayFn();
        }
    },
    backNav() {
        wx.navigateBack({
            delta: 1
        })
    },
    // 初始获取钱包的数据
    startFn() {
        var unionid = wx.getStorageSync('thisCode');
        this.setData({
            wxRecharge: true
        })
        wx.showLoading({
          title: '加载中...',
        })
        http._post1('Store/WalletPay/Recharge/home', { unionid: unionid }, res => {
            wx.hideLoading();
            let data = res.data;
            this.hideDialog();
            if (data.status == 1) {
                if (data.is_sub == 1) {
                    this.showDialog();
                    this.setData({
                        modelData: {
                            titleHide: true,
                            con: data.info,
                            onceConfirm: true,
                            confirmEvent: 'backNav',
                        },
                    })
                    return
                }
                this.setData({
                    gmrArr: data.data,
                    store_id: data.store_id,
                    gmrprice: this.data.gmrprice || data.data[0].price,
                    quantity: this.data.quantity || data.data[0].quantity,
                    priceTxt: Number(data.data[0].price).toFixed(2),
                    openid: data.openid,
                    storeId: data.store_id,
                    wallet: data.wallet
                })
            } else {
                this.showDialog();
                this.setData({
                    modelData: {
                        titleHide: true,
                        con: data.info,
                        onceConfirm: true,
                        confirmEvent: 'backNav',
                    },
                })
            }
        }, res => { wx.hideLoading()})
    },
    // 点击更换样式
    changeRechBtn(e) {
        let index = http.dataIndex(e)[0];
        let gmrSty = [];
        gmrSty[index] = 'gmr_t_in_r';
        this.setData({
            gmrSty,
            priceTxt: Number(this.data.gmrArr[index].price).toFixed(2),
            gmrprice: this.data.gmrArr[index].price,
            quantity: this.data.gmrArr[index].quantity,
        })
    },
    // 点击切换支付方式
    payTypeBtn(e) {
        let index = http.dataIndex(e)[0];
        this.setData({
            wxPay: index == 0 ? true : false
        })
    },
    // 微信
    wxPayFn() {
        var unionid = wx.getStorageSync('thisCode');
        let store_id = this.data.store_id;
        let money = this.data.gmrprice;
        let quantity = this.data.quantity;
        let storeId = this.data.storeId;
        let openid = this.data.openid;
        // this.hideDialog();
        if (!this.data.wxRecharge) {
            return
        }
        this.setData({
            wxRecharge: false
        })
        http._post1('weixinPay', {
            unionid,
            store_id,
            money,
            quantity,
            openid,
            storeId
        }, res => {
            let data = res.data;
            if (data.status == 1) {
                http.payFn(data, res => {
                    this.setData({
                        wxRecharge: true,
                    })
                }, res => {
                    this.setData({
                        wxRecharge: true,
                    })
                })
            } else {
                this.showDialog();
                this.setData({
                  wxRecharge: true,
                })
                console.log(data.info)
                this.setData({
                    modelData: {
                        titleHide: true,
                        con: data.info,
                        onceConfirm: true,
                    }
                })

            }
        }, res => {
          this.setData({
            wxRecharge: true,
          })
        })
    },
    // 余额支付的接口
    blanceYe() {
        this.hideDialog();
        this.setData({
            sixObj: {
                txImg: '/images/payType1.png',
                txTest: '余额充值'
            }
        })
        this.cipherSix.show();
    },
    // 密码输入
    passInput(e) {
        var unionid = wx.getStorageSync('thisCode');
        let store_id = this.data.store_id;
        let money = this.data.gmrprice;
        let quantity = this.data.quantity;
        let passTxt = e.detail.value;
        if (passTxt.length >= 6) {
            http._post1('Store/WalletPay/Recharge/pay', {
                unionid,
                store_id,
                money,
                quantity,
                password: passTxt,
            }, res => {
                let data = res.data;
                this.cipherSix.hide();
                if (data.status == 1) {
                    this.showDialog();
                    this.setData({
                        modelData: {
                            titleHide: false,
                            onceConfirm: true,
                            zstype: '3',
                            nodesStr: `<div class='cenFlex' style='flex-wrap:wrap'>
                            <div class='cenFlex' style='width:40px;height:40px;margin-bottom:8px;'>
                                <img style='width:40px;height:40px' src='https://www.pintuanqu.cn/Public/WeChatApps/image/with3_ico4.png'/>
                            </div>
                            <div class='cenFlex' style='width:100%;font-size:16px;'>充值成功</div>
                            <div class='cenFlex' style='width:100%;color:#999;font-size:14px;'>会在1-3个工作日到账</div>
                        </div>`,
                        }
                    })
                } else {
                    this.showDialog();
                    this.setData({
                        modelData: {
                            titleHide: true,
                            con: data.info,
                            onceConfirm: true,
                        }
                    })

                }
            }, res => {})
        }
    },
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
})