// component/userauth/userauth.js
const A = getApp();
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      type: {
         type: String,
         value: '1'
      },
      auth: {
         type: Number,
         value: 1
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
     imgUrl: A.config.imgUrl
   },

   /**
    * 组件的方法列表
    */
   methods: {

   }
})