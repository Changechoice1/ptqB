var http = require('../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabVipFlag: true,
        imgUrl:http.imgUrl,
        nullData: {
            img: '/images/zxk_none.png',
            txt: '暂无专享卡信息'
        },
        paging:1,
        loadingF:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.canUseFn(this.data.paging)
    },

    tabVipBtn(e) {
        let index = http.dataIndex(e)[0];
        let tabVipFlag = index == 0 ? true : false;
        this.setData({ 
            tabVipFlag: tabVipFlag,
            canUseList:"",
            notUseList:"",
        })
        index == 0?this.canUseFn(1) : this.notUseFn(1);
        
    },
    // 点击前往专享卡详情页面
    uVipInfoNav(e) {
        let id = http.dataIndex(e)[1];
        wx.navigateTo({
            url: 'detail/detail?id='+id
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },
    // 获取有效的专享卡
    canUseFn(paging){
        var unionid = wx.getStorageSync('thisCode');
        this.setData({loadingF:false})
        http._post1('StoreCard/card_list',{
            unionid:unionid,
            paging:paging
        },res=>{
            let data = res.data;
            if(data.status == 1){
                let canUseList = this.data.canUseList || [];
                data.card_list.find(item=>{
                    canUseList.push(item)
                })
                this.setData({
                    canUseList:canUseList,
                    paging:paging,
                    all_paging:data.all_page,
                    loadingF:true
                })
            }else{
                http.showModal(data.info,false,()=>{})
            }
        },res=>{})
    },
    // 获取失效的专享卡
    notUseFn(paging){
        var unionid = wx.getStorageSync('thisCode');
        this.setData({loadingF:false})
        http._post1('StoreCard/card_lose_list',{
            unionid:unionid,
            paging:paging
        },res=>{
            let data = res.data;
            if(data.status == 1){
                let notUseList = this.data.notUseList || [];
                data.card_list.find(item=>{
                    notUseList.push(item)
                })
                this.setData({
                    paging:res.paging,
                    notUseList:notUseList,
                    all_paging:data.all_page,
                    loadingF:true
                })
            }else{
                http.showModal(data.info,false,()=>{})
            }
        },res=>{})
    },
    onReachBottom: function () {
      if (this.data.paging < this.data.all_paging){
        if (this.data.tabVipFlag) {
          this.canUseFn(++this.data.paging)
        } else {
          this.notUseFn(++this.data.paging);
        }
      }
    },
})