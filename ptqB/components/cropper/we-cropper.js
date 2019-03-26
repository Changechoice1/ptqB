import A from '../../vwx/uset.js'
import WeCropper from 'we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth;
const rate = width / 750;
const height = device.windowHeight - 150 * rate + 1;
Component({
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   * type-类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
   */
  properties: {
    // 裁剪框
    crop: {
      type: Object,
      observer: function (newVal, oldVal, changedPath) {
        this.init();
      } 
    },
    // 原图片
    img: { type: String }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    cropperOpt: {
      id: 'cropper',
      width: width,
      height: height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: 30 * rate,
        y: 200 * rate,
        width: 690 *rate,
        height: 460 * rate,
        rate: 1.5
      }
    }
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    // 显示裁剪框
    showCropper: function (context) {
      this.setData({ showCropper: true });
      this.init();
    },
    // 隐藏裁剪框
    hideCropper: function () {
      this.setData({ showCropper: false })
      this.triggerEvent('hide-cropper')
    },
    // 初始化数据
    init: function(){
      const _that = this, _d = _that.data;
      if(_d.crop){
        this.setData({
          'cropperOpt.cut': {
            x: (750 - _d.crop.width) / 2 * rate,
            y: 200 * rate,
            width: _d.crop.width * rate,
            height: _d.crop.height * rate,
            rate: (_d.crop.width / _d.crop.height).toFixed(1)
          }
        })
      }
      
      const { cropperOpt } = this.data

      new WeCropper(cropperOpt, _that)
        .on('ready', (ctx) => {
          if(_d.img){
            const src = _d.img
            _that.wecropper.pushOrign(src)
          }
        })
        .on('beforeImageLoad', (ctx) => {
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          wx.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => { })
        .updateCanvas()
    },
    // 触控事件
    touchStart(e) {
      this.wecropper.touchStart(e)
    },
    touchMove(e) {
      this.wecropper.touchMove(e)
    },
    touchEnd(e) {
      this.wecropper.touchEnd(e)
    },
    // 保存
    save: function(){
      const _that = this;
      this.wecropper.getCropperImage((src) => {
        if (src) {
          _that.triggerEvent('upload-img', src)
        } else {
          console.log('获取图片地址失败，请稍后重试')
        }
      })
    },
    // 取消
    cancel: function(){
      this.hideCropper();
    }
  }
})