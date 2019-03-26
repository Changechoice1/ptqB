var http = require('../../../../utils/http.js');
var util = require('../../../../utils/util.js');
var unionid = wx.getStorageSync('thisCode');
const A = getApp();
Page(A.assignPage({

    /**
     * 页面的初始数据
     */
    data: {
        ossImgUrl: A.config.ossImgUrl,
        imgUrl: A.config.imgUrl,
        slImgs: ['/images/order_1.png', '/images/order_2.png', '/images/order_3.png'],
        btnTxt: ['账号管理', '实名认证', '店铺管理', '活动管理', '交易管理', '资产管理', '扩展服务'],
        styArr: ['sl_type_in_act'],
        btnTxt1: ['操作教程', '商家分享', '在线课程', '运营干货'],
        styArr1: ['sl_type_in_act'],
        slTabFlag: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
       // 关闭分享功能
       wx.hideShareMenu();
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreSchool/type', { unionid: unionid }, res => {
            let data = res.data;
            if (data.status == 1) {
                this.setData({
                    slData: data
                })
                this.ariList(data.type[0].type[0].id, 1)
            }
        }, res => {})
    },

    tabStyBtn(e) {
        let index = http.dataIndex(e)[0];
        let id = http.dataIndex(e)[1];
        let styArr = [];
        styArr[index] = 'sl_type_in_act';
        this.ariList(id, 1)
        this.setData({ styArr: styArr })
    },
    tabStyBtn1(e) {
        let index = http.dataIndex(e)[0];
        let id = http.dataIndex(e)[1];
        this.ariList(id, 1)
        let styArr1 = [];
        styArr1[index] = 'sl_type_in_act';
        this.setData({ styArr1: styArr1 })
    },
    tabViewBtn(e) {
        let slTabFlag = http.dataIndex(e)[0] == 0 ? true : false;
        let id = http.dataIndex(e)[1];
        this.ariList(id, 1)
        this.setData({
            slTabFlag,
            styArr: ['sl_type_in_act'],
            styArr1: ['sl_type_in_act'],
        })
    },
    // 点击前往商家学院详情
    sliNav(e) {
        let id = http.dataIndex(e)[1];
        wx.navigateTo({
            url: 'article/article?id='+id,
        })
    },
    onReady: function() {

    },
    // 获取分账列表的封装
    ariList(type_id, paging) {
        var unionid = wx.getStorageSync('thisCode');
        this.setData({ type_id, paging, slList: [] })
        http._post1('StoreSchool/articleList', {
            unionid,
            type_id,
            paging,
        }, res => {
            let data = res.data;
            if (data.status == 1) {
                this.setData({
                    slList: data.list,
                    total_page:data.total_page
                })
            }
        }, res => {})
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
      var unionid = wx.getStorageSync('thisCode');
        let paging = this.data.paging;
        let total_page = this.data.total_page;
        let type_id = this.data.type_id;
        let slList = this.data.slList;

        if(paging>=total_page){
            return
        }
        paging++;
        console.log(paging)
        http._post1('StoreSchool/articleList', {
            unionid,
            type_id,
            paging,
        }, res => {
            let data = res.data;
            data.list.find(item=>{
                slList.push(item)
            })
            if (data.status == 1) {
                this.setData({
                    slList: slList,
                    total_page:data.total_page,
                    paging,
                })
            }
        }, res => {})
    },
}))