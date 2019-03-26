var http = require('../../../../../../utils/http.js')
var unionid = wx.getStorageSync('thisCode')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputArr: [],
        imgUrl: http.imgUrl,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    // 点击前往下一步
    nextPage() {
        var unionid = wx.getStorageSync('thisCode')
        var inputArr = this.data.inputArr;
        let flag = http.IdentityCodeValid(inputArr[1]);
        console.log(flag)
        let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
        if (!reg.test(inputArr[0])) {
            this.setData({
                'tip.ele': this.selectComponent("#diyModal"),
                'tip.showTitle': false,
                'tip.content': '请输入正确的姓名格式',
                'tip.hideCancel': true,
                'tip.success': 'hideDiyModal',
            });
            this.data.tip.ele.showDialog();
            return
        }
        if (!flag[0]) {
            this.setData({
                'tip.ele': this.selectComponent("#diyModal"),
                'tip.showTitle': false,
                'tip.content': '身份证格式不对',
                'tip.hideCancel': true,
                'tip.success': 'hideDiyModal',
            });
            this.data.tip.ele.showDialog();
            return
        }
        http._post1('StoreWallet/verify_identity', { unionid: unionid, card_id: inputArr[1], real_name: inputArr[0] }, res => {
            let data = res.data
            if (data.status == 1) {
                // http.showModal(data.info,false,()=>{
                //   wx.redirectTo({
                //     url: '../../setPassword/setPassword?reset=1'
                //   })
                // })
                this.setData({
                    'tip.ele': this.selectComponent("#diyModal"),
                    'tip.showTitle': false,
                    'tip.content': data.info,
                    'tip.hideCancel': true,
                    'tip.success': 'goNext'
                });
                this.data.tip.ele.showDialog();
            } else {
                // http.showModal(data.info,false,()=>{})
                this.setData({
                    'tip.ele': this.selectComponent("#diyModal"),
                    'tip.showTitle': false,
                    'tip.content': data.info,
                    'tip.hideCancel': true,
                    'tip.success': 'hideDiyModal'
                });
                this.data.tip.ele.showDialog();
            }
        }, res => {})
    },
    // 下一步
    goNext: function() {
        wx.redirectTo({
          url: '../../setPassword/setPassword?reset=1'
        })
    },
    // 隐藏提示框
    hideDiyModal: function() {
        this.data.tip.ele.hideDialog();
    },
    inputBtn(e) {
        let inputArr = http.inputArr(this.data.inputArr, e)
        this.setData({ inputArr })
        let clickF = http.canClick(2, this.data.inputArr)
        this.setData({ clickF })
    },
   inputTxt(e) {
      var that = this
      var inputArr = that.data.inputArr
      var aa = http.inputArr(inputArr, e)
      that.setData({
         inputArr: aa,
      })
      let clickF = http.canClick(2, this.data.inputArr)
      this.setData({ clickF })
   },
})