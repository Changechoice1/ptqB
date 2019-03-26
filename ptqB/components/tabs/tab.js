// component/tab/tab.js
Component({
   externalClasses: ['vwx-class','tab'],
   properties: {
      tabs: {
         type: "Array",
         value: []
      },
      actIndex: {
         type: "Number",
         value: 0
      }
   },
   data: {
   },
   methods: {
      change(evt) {
         this.setData({ actIndex: evt.currentTarget.dataset.index})
         this.triggerEvent('myselect', evt.currentTarget.dataset)
      },
      open(){

      }
   }
})