// component/countdown/countdown.js
const A = getApp();
Component({
   properties: {
      time: {
         type: Number,
         value: 0,
         observer: function(newVal, oldVal, changedPath) {
            this.start();
         }
      }
   },
   data: {
      dt: {
         d: 0,
         h: 0,
         m: 0,
         s: 0
      }
   },
   methods: {
      start() {
         A.setInterval("outime", (id) => {
            let _t = this.data.time - id.count;
            if (_t <= 0) {
               A.clearInterval("outime");
            } else {
               this.setData({ dt: A.rtime(_t)});
            }
         })
      }
   }
})