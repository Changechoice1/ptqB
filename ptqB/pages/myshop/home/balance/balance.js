var http = require('../../../../utils/http.js')
var unionid = wx.getStorageSync('thisCode')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: http.imgUrl,
        identType: 2,
        identUrl: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var unionid = wx.getStorageSync('thisCode');
        var type = options.type || 2;
        let url = type == 1 ? 'MemberWallet/index' : type == 2 ? 'StoreWallet/index' : type == 3 ? 'AgentWallet/index' : 'StoreWallet/index';
        this.setData({ identType: type, identUrl: url });
        // this.balanceInfoFn(url)
    },
    balanceInfoFn(url) {
        var unionid = wx.getStorageSync('thisCode')
        http._post1(url, { unionid: unionid }, res => {
            let data = res.data
            if (data.status == 1) {
                this.setData({
                    balanceData: data.info
                })
            } else {
                // http.showModal(data.info, false, function() {})
              _that.showDiyModal({
                tipContent: data.info
              });
            }
        }, res => {})
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    // 前往余额明细
    detailBtn: function(e) {
        var selectType = http.dataIndex(e)[0] || 1
        wx.navigateTo({
          url: 'turnoverList/turnoverList'
        })
    },
    withDBtn: function () {
      const _that = this, _d = _that.data;
      if (_d.balanceData.is_set_password != 1 && _d.balanceData.identity == 2) {
        _that.showDiyModal({
          tipHideCancel: false,
          tipContent: '请先设置安全密码',
          tipSuccess: 'goSetPassword'
        });
      } else {
        wx.navigateTo({
          url: 'withdraw/withdraw?type=' + _d.identType
        })
      }

    },
    // 前往支付安全界面
    paySec: function() {
      let navUrl = this.data.balanceData.is_set_password != 1 ? 'verifyIdentity/setIdentityVerification/setIdentityVerification' : 'verifyIdentity/resetIdentityVerification/resetIdentityVerification'
        wx.navigateTo({
            url: navUrl
        })
    },
    // 确定设置提现密码
    goSetPassword: function(){
      this.hideDiyModal();
      wx.navigateTo({
        url: 'verifyIdentity/setIdentityVerification/setIdentityVerification'
      })
    },

    // 提示框
    showDiyModal: function(opts){
      const _that = this, _d = _that.data;
      _that.setData({
        tipEle: opts.tipEle || _that.selectComponent("#diyModal"),
        tipShowTitle: opts.tipShowTitle || false,
        tipContent: opts.tipContent || '',
        tipHideCancel: opts.tipHideCancel || true,
        tipSuccess: opts.tipSuccess || 'hideDiyModal',
        tipFail: opts.tipFail || 'hideDiyModal',
        tipConfirmText: opts.tipConfirmText || '确定'
      });
      _d.tipEle.showDialog();
    },
    // 隐藏提示框
    hideDiyModal: function(){
      this.data.tipEle.hideDialog();
    },
    onShow: function() {
        if (this.data.identUrl) {
            this.balanceInfoFn(this.data.identUrl)
        }
    }

})