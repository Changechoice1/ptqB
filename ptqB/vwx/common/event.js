const events = {};
const evt = function (obj) {

   obj.on = function (_type, fn, context = obj) {
      if (!events[_type]) {
         events[_type] = []
      }

      events[_type].push([fn, context])
   }

   obj.once = function (type, fn, context = this) {
      function magic() {
         this.off(type, magic)

         fn.apply(context, arguments)
      }
      // To expose the corresponding function method in order to execute the off method
      magic.fn = fn
      this.on(type, magic)
   }

   obj.off = function (type, fn) {
      let _events = events[type]
      if (!_events) {
         return
      }

      let count = _events.length
      while (count--) {
         if (_events[count][0] === fn || (_events[count][0] && _events[count][0].fn === fn)) {
            _events[count][0] = undefined
         }
      }
   }

   obj.trigger = function (type) {
      if (typeof events[type] == 'undefined') return;

      let _events = [...events[type]];
      for (let _event of _events) {
         let [fn, context] = _event;
         if (fn) {
            fn.apply(context, [].slice.call(arguments, 1))
         }
      }
   }
}

module.exports = evt;