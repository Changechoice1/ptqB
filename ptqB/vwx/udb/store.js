// 数据池
module.exports = {
   setState: function (_state) {
      var state = { ..._state };
      for (let k in state) {
         state[k]['pages'] = new Set();
      }
      Object.assign(this, state);
   },
   setData(value) {
      // 修改state的数据值
      if (value instanceof Object) {
         for (let key in value) {
            if (this[key]) {
               // 跟新state值
               for (let k in value[key]) {
                  if (this[key].hasOwnProperty(k))
                     this[key][k] = value[key][k];
               }
               // 更新页面的data数据
               this[key]['pages'].forEach((page, key) => {
                  page.refreshData();
               })
            }
         }
      }
   }
}