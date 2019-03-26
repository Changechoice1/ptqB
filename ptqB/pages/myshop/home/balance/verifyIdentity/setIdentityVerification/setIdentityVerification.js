var http = require('../../../../../../utils/http.js')
var unionid = wx.getStorageSync('thisCode')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputArr: [],
        clickF: false,
        imgUrl: http.imgUrl,
    },

    onLoad: function(options) {

    },
    inputBtn(e) {
        let inputArr = http.inputArr(this.data.inputArr, e)
        this.setData({ inputArr })
        let clickF = http.canClick(3, this.data.inputArr)
        this.setData({ clickF })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    nextPage() {
        var unionid = wx.getStorageSync('thisCode')
        var inputArr = this.data.inputArr;
        let flag = http.IdentityCodeValid(inputArr[2]);
        let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
        if (!reg.test(inputArr[1])) {
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
        http._post1('StoreWallet/password', { unionid: unionid, card_id: inputArr[2], real_name: inputArr[1], password: inputArr[0], }, res => {
            let data = res.data
            if (data.status == 1) {
                // http.showModal(data.info,false,()=>{
                //   wx.navigateBack({
                //     delta: 1
                //   })
                // })
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000,
                    success: function() {
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                })
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
    // 隐藏提示框
    hideDiyModal: function() {
        this.data.tip.ele.hideDialog();
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
})