var http = require('../../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        paging: 1,
        keywords: "",
        bootomFlag: false,
        imgUrl: http.imgUrl,
        nullData: {
            img: '/images/freight_none.png',
            txt: '您还没有运费模板，快去添加吧'
        }
    },


    onLoad(options) {

    },
    showHideInput() {
        var that = this;
        var searchW = that.data.searchW;
        if (searchW == 300) {
            that.setData({ searchW: 0 })
        } else {
            that.setData({ searchW: 300 })
        }
    },
    nextRel() {
        wx.navigateTo({
          url: 'edit/edit'
        })
    },
    onShow() {
        this.setData({ searchW: 0, keywords: '' })
        this.allLoading();
    },
    allLoading() {
        var that = this;
        var unionid = wx.getStorageSync('thisCode');
        var keywords = that.data.keywords;
        var paging = that.data.paging;
        http._post1('StoreFreight/freight_list', { unionid: unionid, keywords: keywords, paging: paging }, res => {
            var data = res.data;
            // if (data.status == 1) {
                that.setData({
                    freData: data
                })
            // } else {
            //     http.showModal(data.info, false, () => { })
            // }
        }, res => { })
    },
    // 点击删除
    modelHide() {
        app.modelHide(this);
    },
    emptyBtn(e) {
        var thatId = Number(e.target.dataset.id);
        var index = e.target.dataset.index;
        console.log(index)
        this.setData({
            notMData: {
                show: true,
                txt: '确定删除吗？',
                cancel: 'modelHide',
                ok: 'delBtnInfo',
                data: {
                    id: thatId,
                    index: index
                }
            }
        })
    },
    delBtnInfo(e) {
        var that = this;
        var addressData = this.data.addressData;
        var unionid = wx.getStorageSync('thisCode');
        let allData = http.dataIndex(e)[4];
        let freData = this.data.freData
        console.log(allData)
        http._post1('StoreFreight/del_freight', { unionid: unionid, id: allData.id }, res => {
            var data = res.data;
            if (data.status == 1) {
                freData.list.splice(allData.index, 1);
                that.setData({ freData, notMData: { show: false } })
            } else {
           
                http.showModal(data.info, false, () => { })
                this.setData({
                  notMData: {
                    show: false
               
                  }
                })
  
            }
        }, res => { })
    },
    // 点击前往编辑
    eidtBtn(e) {
        var that = this;
        var id = http.dataIndex(e)[1];
        wx.navigateTo({
            url: 'edit/edit?id=' + id,
        })
    },
    // 点击搜索
    searchInput(e) {
        var keywords = e.detail.value;
        this.setData({
            keywords: keywords
        })
    },
    searchBtn(e) {
        this.allLoading();
    },
    onReachBottom() {
        var that = this;
        var freData = that.data.freData;
        var allP = Number(freData.all_paging);
        var unionid = wx.getStorageSync('thisCode');
        var keywords = that.data.keywords;
        var paging = that.data.paging;
        if (allP >= paging) {
            that.setData({ bootomFlag: true })
            return
        }
        paging++;
        http._post1('StoreFreight/freight_list', { unionid: unionid, keywords: keywords, paging: paging }, res => {
            var data = res.data;
            for (let i in data.list) {
                freData.list.push(data.list[i])
            }
            if (data.status == 1) {
                that.setData({
                    freData: freData,
                    paging: paging
                })
            } else {
                http.showModal(data.info, false, () => { })
            }
        }, res => { })

    },
})