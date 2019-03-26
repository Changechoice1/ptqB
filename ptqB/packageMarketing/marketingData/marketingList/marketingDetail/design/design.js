// packageMarketing/marketingList/marketingDetail/marketingDetail.js
var http = require('../../../../../utils/http.js');
const A = getApp();
Page(A.assignPage({

   /**
    * 页面的初始数据
    */
   data: {
      imgUrl: http.imgUrl,
      metype:1,//默认选中的选项id
      labelList:[//菜单栏数据
         {
            label:'店铺名称：',
            text:''
         },
         {
            label: '设计内容：',
            text: '付款码太卡设计',
            selectInd:0,
            itemtype:'select',
            childen:[
               {
                  text:'付款码太卡设计',
                  checked:true,
                  id: 1
               },
               {
                  text: '店铺二维码台卡设计',
                  checked: false,
                  id: 2
               },
               {
                  text: '付款码易拉宝设计',
                  checked: false,
                  id: 3
               },
            ]
         },
      ]
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
     // 关闭分享功能
     wx.hideShareMenu();
     
      var labelList = this.data.labelList;
      labelList[0].text = wx.getStorageSync('storeInfo').store_name;
      this.setData({
         labelList: labelList
      })
   },
   onshow: function () {

   },
   doSelect:function(e){
      var that = this;
      var labelList = that.data.labelList;
      labelList[e.currentTarget.dataset.i].checked = !labelList[e.currentTarget.dataset.i].checked;
      that.setData({
         labelList: labelList
      })
   },
   doChecked:function(e){
      var that = this;
      console.log(e);  
      var that = this;
      var labelList = that.data.labelList;
      var setDataObj = {};
      labelList[e.currentTarget.dataset.pi].selectInd = e.currentTarget.dataset.i;
      labelList[e.currentTarget.dataset.pi].text = labelList[e.currentTarget.dataset.pi].childen[e.currentTarget.dataset.i].text;
      for (var i = 0; i < labelList[e.currentTarget.dataset.pi].childen.length;i++){
         labelList[e.currentTarget.dataset.pi].childen[i].checked = false;
      }
      labelList[e.currentTarget.dataset.pi].childen[e.currentTarget.dataset.i].checked = true;
      setDataObj = {
         labelList: labelList
        
      }
      if (e.currentTarget.dataset.pi == 1){
         setDataObj.metype= labelList[1].childen[e.currentTarget.dataset.i].id;
      }
      that.setData(setDataObj);
   },
   onSubmit:function(){
      var dataObj = new Object;
      dataObj.store_id = wx.getStorageSync('store_id');
      dataObj.type = this.data.metype;
      A.updata.materialDesignApply(dataObj).then(res => {
         if (res.status == 1){
            A.showModal({
               showCancel: false,
               contType: 2,
               content: `<p>信息已经成功提交</p><p>工作人员将在1-3个工作日联系您</p>`,
               success:function(){
                  wx.navigateBack({
                     delta: 1
                  })
               }
            })
         }else{
            A.showModal({
               showCancel: false,
               contType: 1,
               content: res.info,
            })
         }
      })
      	
      
   }

}))