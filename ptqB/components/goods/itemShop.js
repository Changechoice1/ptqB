// component/goods/itemShop.js
Component({
   properties: {
      data: {
         type: Object,
         default: function () {
            return {}
         }
      }
  },
  data: {

  },
  methods: {
    //前往店铺
    storebutton: function (e) {
      var storeid = e.currentTarget.dataset.storeid;
      this.triggerEvent("storebutton", storeid)
    },
  }
})
