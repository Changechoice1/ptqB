// packageMarketing/marketingList/marketingDetail/marketingDetail.js
var qrImgCanvas = require('../../../../pages/myshop/home/marketingPromotion/publishGjmd/qrImgCanvas.js');
var data = require('../../../../config/data.js');
const A = getApp();
Page(A.assignPage({

   /**
    * 页面的初始数据
    */
   data: {
      //除分享外的页面跳转
      goPageList:[{
            imgUrl:'../../../../images/marketing2.png',
            title:'设置员工分销',
            text:'刺激员工分享给好友或朋友圈，提高销量',
            btnText:'设置',
            id:2,
            path:'/pages/myshop/home/integratingMarketing/staff/staff?is_account=0'
         },
         {
            imgUrl: '../../../../images/marketing3.png',
            title: '收款码沉淀客户',
            text: '利用刮奖免单收款码高效收银，沉淀客户',
            btnText: '设置',
            id:3,
            path: '1'
         },
         {
            imgUrl: '../../../../images/marketing4.png',
            title: '引导用户关注店铺',
            text: '精准推送活动给潜在客户',
            btnText: '查看',
            id:4,
            path: '/pages/myshop/home/qrcode/qrcode'
         },
         {
            imgUrl: '../../../../images/marketing5.png',
            title: '台卡等宣传物料设计',
            text: '引导到店用户或店外路人',
            btnText: '申请免费设计',
            id:5,
            path: '/packageMarketing/marketingData/marketingList/marketingDetail/design/design',
            isDesign:false//判断页面跳转文字
         }
      ],
      thisMarketing:[],
      marketingId:'',
      payQrImgInfo: data.payQrImgInfo,
      payQrImgFlag: false, // 是否显示支付二维码图片
      miniProgramPath:''//跳转到商家版的路径
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      var that = this;
     // 关闭分享功能
     wx.hideShareMenu();
     
      this.setData({
         'thisMarketing[0]': JSON.parse(decodeURIComponent(options.info))
      })
      var miniProgramPath = that.data.miniProgramPath;
      switch (that.data.thisMarketing[0].is_group){
         case 1:
            miniProgramPath='/pages/goodsInfo/goodsGroup/goodsGroup?goods_id=' + that.data.thisMarketing[0].id + '&group_id=0';
            break;
         case 3:
            miniProgramPath='/pages/goodsInfo/goodsPeople/goodsPeople?goods_id=' + that.data.thisMarketing[0].id + '&group_id=0';
            break;
         case 4:
            miniProgramPath='/pages/goodsInfo/goodsSale/goodsSale?goods_id=' + that.data.thisMarketing[0].id + '&group_id=0';
            break;
         case 6:
            miniProgramPath='/pages/goodsInfo/goodsBargain/goodsBargain?goods_id=' + that.data.thisMarketing[0].id + '&group_id=0';
            break;
      }
      that.setData({
         miniProgramPath: miniProgramPath
      })
      // this.onshow();
   },
   onShow:function (){
      var that = this;
      let payQrImgInfo = Object.assign({}, data.payQrImgInfo, {
         tipTitle: '活动发布成功，已生成支付二维码',
         tipCont: '该活动仅能发布一次，若修改，请到活动管理中编辑。'
      });
      A.updata.detail(that.data.thisMarketing[0].id).then(res=>{
         var goPageList = JSON.parse(JSON.stringify(that.data.goPageList));
         if(res.data != 0){
            goPageList[3].isDesign = true;
         }else{
            goPageList[3].isDesign = false;
         }
         goPageList[3].btnText = goPageList[3].isDesign ? '已申请' :'申请免费设计' ;
         
         that.setData({
            goPageList: goPageList,
            payQrImgInfo: payQrImgInfo 
         })
         
      })

   },
   goPage:function(e){
      if (e.currentTarget.dataset.path == 1){
         this.goReleaseGjmd();
         return
      }
      if (e.currentTarget.dataset.id==5 && this.data.goPageList[3].isDesign){
         return
      }
      A.G(e.currentTarget.dataset.path)
   },
   goReleaseGjmd: function () {
      this.getGjmdInfo().then(res => {
         if (this.data.gjmdId) {
            // 显示支付二维码图片
            this.showPayQrImg();
         } else {
            wx.hideLoading();
            if (this.data.info.is_account == 0) {
               A.G('marketingPromotion/publishGjmd/publishGjmd')
            } else {
               A.showTipModal(A.DF.MSG.pubGjmd);
            }
         }
      }, err => { });
   },
   getGjmdInfo: function () {
      const _that = this, _d = _that.data;
      return new Promise((resolve, reject) => {
         wx.showLoading({ title: '加载中' })
         A.updata.getActList('', 5, 2, 1).then(res => {
            wx.hideLoading();
            try {
               if (res.status == A.STATE.STATUS.OK) {
                  if (res.list[0]) {
                     this.setData({
                        gjmdId: res.list[0].goods_id,
                        'payQrImgInfo.logo': wx.getStorageSync('storeInfo').store_logo,
                        'payQrImgInfo.name': wx.getStorageSync('storeInfo').store_name,
                        'payQrImgInfo.qrImg': res.list[0].pay_code
                     });
                     qrImgCanvas.downloadImg(this.data.payQrImgInfo).then(res => {
                        let payQrImgInfo = res;
                        this.setData({
                           payQrImgInfo: payQrImgInfo
                        });
                        resolve();
                     }, err => {});
                  } else {
                     wx.hideLoading();
                     this.setData({ gjmdId: 0 });
                     resolve();
                  }
               } else {
                  wx.hideLoading();
               }
            } catch (e) {
               wx.hideLoading();
            }
         }, err => {
            wx.hideLoading();
            reject();
         })
      })
   },
   // 显示支付二维码图片
   showPayQrImg: function () {
      this.setData({ payQrImgFlag: true });
      wx.hideTabBar();
   },
   // 隐藏支付二维码图片
   hidePayQrImg: function () {
      this.setData({ payQrImgFlag: false });
      wx.showTabBar()
   },
   // 保存支付二维码图片
   savePayQrImg: function () {
      this.setData({ btn: this.selectComponent('#save_btn') });
      // 绘制canvas
      qrImgCanvas.drawCanvas(this.data.payQrImgInfo).then(() => {
         qrImgCanvas.savePayQrImg(this);
      });
   }
  
 
}))