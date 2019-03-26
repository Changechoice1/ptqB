var http = require('../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num: '10',
        imgUrl: http.imgUrl,
        show: false,
        showS: '0',
        statusList: [
            { id: '1', content: '全部状态' },
            { id: '2', content: '拼团中' },
            { id: '3', content: '拼团成功' },
            { id: '4', content: '虚拟拼团成功' }
        ],
        nullData: {
            img:'/images/active_none_1.png',
            txt: '暂时没有内容'
        },
    },

    // 全部状态下拉
    showHide() {
      this.setData({ show: !this.data.show })
    },

    // 选择状态类型
    typeChecked(e) {
        let index = http.dataIndex(e)[0];
        this.setData({
            show: false,
            showS: index,
            begroupData:'',
        })
        this.begroupdetailFn(1,this.data.goods_id,index)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 关闭分享功能
        wx.hideShareMenu();
        let goods_id = options.id || 0;
        this.setData({goods_id:goods_id})
        this.begroupdetailFn(1,goods_id,0)
    },
    begroupdetailFn(paging,goods_id,type){
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreGoods/clustering_people_list',{
            unionid:unionid,
            paging:paging || 1,
            goods_id:goods_id || 0,
            type:type || 0,
        },res=>{
            let data = res.data;
            if(data.status == 1){
                let begroupData = this.data.begroupData || {list:[],group_num:data.group_num};
                data.list.find(item=>{
                    begroupData.list.push(item)
                })
                this.setData({
                    begroupData:begroupData,
                    all_paging:data.all_paging,
                    paging:data.paging,
                })
            }else{
                http.showModal(data.info,false,()=>{})
            }
        },res=>{})
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let paging = this.data.paging;
        let all_paging = this.data.all_paging;
        if (all_paging <= paging) {
            return
        }
        paging++;
        this.setData({ paging: paging });
        this.begroupdetailFn(paging,this.data.goods_id,this.data.showS)
    }
})