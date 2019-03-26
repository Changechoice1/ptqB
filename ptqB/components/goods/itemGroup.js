// component/goods/itemSale2.js
const A = getApp();
Component({
   properties: {
      data: {
         type: Object,
         value: {}
      }
   },
   data: {
   },
   methods: {
      openGoods(evt) {
         A.G("/pages/goodsInfo/goodsGroup/goodsGroup?goods_id=" + this.data.data.goods_id);
         this.triggerEvent("selectitem", evt.currentTarget.dataset)
      }
   }
})