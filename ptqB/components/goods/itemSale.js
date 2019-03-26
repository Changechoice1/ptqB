// component/goods/itemSale.js
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
      gotop(evt) {
         if (A.C(evt).value.is_group == A.STATE.GOOD.SALE) {
            A.G("/pages/goodsInfo/goodsSale/goodsSale?goods_id=" + A.C(evt).value.goods_id);
         } else {
            A.G("/pages/goodsInfo/goodsPeople/goodsPeople?goods_id=" + A.C(evt).value.goods_id);
         }
         this.triggerEvent("selectitem", evt.currentTarget.dataset)
      }
   }
})