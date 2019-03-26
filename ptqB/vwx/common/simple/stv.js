// 定时器,id唯一标识，字符串类型
const ids = {};
const _setInterval = function(_id, _fun, _time) {
   let time = _time || 1000;
   let count = 0;
   if (ids[_id]) {
      clearInterval(ids[_id].id);
      delete ids[_id];
   }
   let sid = {
      name: _id,
      callback: _fun,
      id: setInterval(function() {
         try {
            count++;
            sid.callback({
               count
            })
         } catch (error) {
            console.error("setInterval error", error)
            clearInterval(sid.id);
         }
      }, time)
   }
   ids[_id] = sid;
}
const _clearInterval = function(_id) {
   if (ids[_id].id) {
      clearInterval(ids[_id].id);
      delete ids[_id];
   }
}

module.exports = {
   _setInterval,
   _clearInterval
}