// component/button/button.js
import A from '../../vwx/uset.js'
var interval = null;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 类型:l-大、m-中、ms-中小、s-小、mi-特小、sku-SKU、kw-关键字
    type: {
      type: String,
      value: 'm',
    },
    // 文本
    text: String,
    // 禁用
    disabled: {
      type: Boolean,
      value: false
    },
    fontSize: {
      type: Number,
      value: '',
    },
    // 字体颜色
    color: {
      type: String,
      value: '',
    },
    // 背景颜色
    bgColor: {
      type: String,
      value: '',
    },
    // 边框颜色
    bdColor: {
      type: String,
      value: '',
    },
    // 加载中样式颜色
    ldColor: {
      type: String,
      value: '',
    },
    //宽度
    width:{
      type:String,
      value:''
    },
    // 常用按钮样式
    theme: {
      type: String,
      value: 'bg-r1',
    },
    // 是否需要加载
    loading: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoading: false // 是否正在加载
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 按钮点击事件
    tapEvent(e) {
      const _that = this, _d = _that.data;
      // 显示加载中样式
      if (_d.loading) {// 需要加载中样式
        _that.setData({ isLoading: true })
      }
      //广播点击事件
      this.triggerEvent('tap-event');
      // 当事件超过30s未做出处理，提示超时请重新操作
      clearInterval(interval);
      let countDown = 30;
      interval = setInterval(function () {
        // 未超时加载完成
        if (countDown > 0 && !_d.isLoading) {
          clearInterval(interval);
          return;
        }
        // 超时未加载完成
        if (countDown <= 0 && _d.isLoading) {
          _that.setData({ isLoading: false })
          A.showTipModal('已超时，请重新操作！')
          clearInterval(interval);
          return
        }
        countDown--;
      }, 1000)
    },
    // 加载完成
    hideLoading() {
    
      this.setData({ isLoading: false })
    }
  }
})
