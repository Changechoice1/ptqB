// component/goods/itempeoping.js
Component({
   properties: {
      list: {
         type: Array,
         value: [],
         observer: function(newVal, oldVal, changedPath) {}
      }
   },
   data: {},
   methods: {
      onlyMFShow(evt) {
         this.triggerEvent("onlymf-show", evt.currentTarget.dataset)
      }
   }
})