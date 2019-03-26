// component/shopBar/shopBar.js
const A = getApp();
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      // 同行使用数
      applyNums: {
         type: Number,
         value: 0
      },
      // 模板活动id
      goodsId: {
        type: String,
        value: '0'
      },
      // 活动类型
      actType: {
        type: Number
      }
   },
   data: {
     
   },
   /**
    * 组件的方法列表
    */
   methods: {
     // 复制添加
     copyAdd: function (e) {
       A.G('pages/myshop/home/marketingPromotion/publishAct/publishAct?actType=' + this.data.actType + '&id=' + this.data.goodsId)
     }
   }
})