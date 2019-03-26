// component/goods/goodmore.js
const A = getApp();
Component({
   properties: {
      info: {
         type: Object,
         observer: function(newVal, oldVal, changedPath) {
           this.read()
         }
      },
      comments: {
         type: Array,
         value: []
      },
      actIndex: {
         type: Number,
         value: 0
      }
   },
   data: {
      tabs: ['商品详情', ''],
      activeIndex: 0
   },
   methods: {
      imgload(e) {},
      selectTab(e) {
         this.setData({
            activeIndex: e.detail.index
         })
      },
     read: function () {
     
         var num = this.data.info.evaluate_num == 0 ? '暂无' : this.data.info.evaluate_num;

         var tabs1 = '宝贝评价' + '(' + num + ')'
         this.setData({
           "tabs[1]": tabs1
         });
       

     },
  },

 
 
})