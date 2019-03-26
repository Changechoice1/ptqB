// packageMarketing/brandCenter/brandInfo/brandRecommend/index.js
const A = getApp();
var unionid = wx.getStorageSync('thisCode');
Page(A.assignPage({
   /**
    * 页面的初始数据
    */
   data: {
      banner:[],//轮播图数据
      footerNavConf:[
         {
            text:'品牌官方活动',
            id:0,
            checked:true
         },
         {
            text: '品牌定制下单',
            id: 1,
            checked: false
         }
      ],
      noListData: {
         img: 'https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/wxxcx/no_brand.png',
         txt: '暂无信息'
      },
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function () {
      var unionid = wx.getStorageSync('thisCode');
      this.customizationList(unionid);
   },

   customizationList() {
      //读取页面数据
      var that = this;
      var excellent = [];
      wx.showLoading({
         title: '加载中...',
      })
      var data = {
         paging:1
      }
      A.updata.getBrandIndexList(data).then(res => {
         wx.hideLoading();
         if (res.status == 1) {
            that.setData({
               banner: res.bannerList,
               brandList:res.brandIndexList,
            })
            
         } else if (res.status == 300) {
            that.setData({
               nullFlag: 1
            })
         } else {
            A.showTipModal(res.info || '请求数据失败')
         }
      }, err => {
         A.showTipModal(err.info || '请求接口失败')
      })
   },

   goTDetail: function (e) {
      //跳转活动详情
      let data = e.currentTarget.dataset.item;
      let typeStr = data.is_group == 1 ? 'ptljTDetail/ptljTDetail' : data.is_group == 3 ? 'drptTDetail/drptTDetail' : data.is_group == 4 ? 'xszxTDetail/xszxTDetail' : data.is_group == 6 ? 'kjTDetail/kjTDetail' : '';

      A.G('../../marketingAssistant/actTDetail/' + typeStr + '?goods_id=' + data.goods_id + '&num=' + data.user_count + '&tag=' + data.tag_industry_id + '&applyNum=' + data.same_kind_count + '&entry=1');
   },
   allSolution: function (e) {
      // 跳转更多方案
      A.G('/packageMarketing/brandCenter/brandInfo/brandRecommend/index?name=' + e.currentTarget.dataset.name + '&id=' + e.currentTarget.dataset.id)
   },
   footTap(e){
      for (let i = 0; i < this.data.footerNavConf.length; i++){
         this.data.footerNavConf[i].checked = false;
      }
      this.data.footerNavConf[e.currentTarget.dataset.i].checked = true;
      this.setData({
         footerNavConf: this.data.footerNavConf,
      })
   },

}))