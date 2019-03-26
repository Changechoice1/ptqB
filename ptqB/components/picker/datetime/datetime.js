const A = getApp();
let date = new Date();
let arr = A.TimeFunc.GetDatetimeArr();
let years = arr[0]
let months = arr[1]
let days = [].concat(arr[2])
let hours = arr[3]
let minutes = arr[4]
let seconds = arr[5]

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '选择时间'
    },
    years: {
      type: Array,
      value: years,
      observer: function (newVal, oldVal, changedPath) {
        years = newVal;
      }
    },
    months: {
      type: Array,
      value: months
    },
    days: {
      type: Array,
      value: days
    },
    hours: {
      type: Array,
      value: hours
    },
    minutes: {
      type: Array,
      value: minutes
    },
    seconds: {
      type: Array,
      value: seconds
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    date: [0, date.getMonth(), date.getDate() - 1],
    time: [date.getHours(), date.getMinutes(), date.getSeconds()],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseDate: function(e){
      days = [].concat(arr[2]);
      let dateArr = e.detail.value;
      if (dateArr[0] != this.data.date[0] || dateArr[1] != this.data.date[1]){
        let year = years[dateArr[0]], month = dateArr[1] + 1;
        console.log(year);
        let month30 = [4, 6, 9, 11]
        if (month30.indexOf(month) > -1) {
          days.pop();
          console.log(days);
        }
        if (month == 2) {
          let num = 0;
          if (year % 4 == 0 && year % 100 != 0) {
            num = 2;
          } else {
            num = 3;
          }
          for (let i = 0; i < num; i++) {
            days.pop();
          }
          console.log(days);
        }
        this.setData({
          days: days
        });
      }
      this.setData({
        date: dateArr
      });
    },
    chooseTime: function (e) {
      this.setData({ time: e.detail.value });
    },
    cancelPicker: function(){
      this.triggerEvent('cancel')
    },
    confirmPicker: function(){
      this.triggerEvent('confirm', {
        date: this.data.date,
        time: this.data.time
      })
    }
  }
})
