import A from '../../vwx/uset.js'
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
      value: {
        width: 690,
        height: 460
      }, 
      observer: function (newVal, oldVal, changedPath) {
        this.getEdgeDis();
      } 
    },
    // 原图片
    img: {
      type: String, 
      value: '',
      observer: function (newVal, oldVal, changedPath) {
        this.init()
      } 
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    showCropper: false, // 是否显示裁剪框

    rate: 1, // 缩放距离与操作距离比
    edgeDis: 30, // 裁剪框距屏幕边距

    touchStart: [], // 触屏起始位置
    touchEnd: [], // 触屏移动位置
    
    imgWidth: 0, // 元图片宽度
    imgHeight: 0, // 元图片高度
    imgLeft: 0, // 图片left值
    imgTop: 0, // 图片top值
    cropImgWidth: 0, // 经过缩放后的图片图片宽 imgLeft + (750 - crop.width) / 2
    cropImgHeight: 0, // 经过缩放后的图片图片高 imgTop + 200
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    // 初始化数据
    init: function(){
      const _that = this, _d = _that.data;
      wx.getSystemInfo({
        success: function (res) {
          _that.setData({ unitRate: res.windowWidth / 750 })
        },
      })
      wx.getImageInfo({
        src: _d.img,
        success: function (res) {
          _that.setData({
            imgWidth: res.width,
            imgHeight: res.height
          })
          let cropRate = _d.crop.width / _d.crop.height;
          let imgRate = _d.imgWidth / _d.imgHeight;
          if (cropRate > imgRate) {
            _that.setData({
              imgLeft: (750 - _d.crop.width) / 2,
              imgTop: 200 - (_d.crop.width / imgRate - _d.crop.height) / 2,
              cropImgWidth: _d.crop.width,
              cropImgHeight: _d.crop.width / imgRate
            });
          } else if (cropRate == imgRate) {
            _that.setData({
              imgLeft: (750 - _d.crop.width) / 2,
              imgTop: 200,
              cropImgWidth: _d.crop.width,
              cropImgHeight: _d.crop.height
            });
          } else {
            _that.setData({
              imgLeft: (750 - _d.crop.height * imgRate) / 2,
              imgTop: 200,
              cropImgWidth: _d.crop.height * imgRate,
              cropImgHeight: _d.crop.height
            });
          }
        }
      })
    },
    // 设置裁剪框距屏幕边距
    getEdgeDis: function(){
      this.setData({ edgeDis: (750 - this.data.crop.idth) / 2})
    },
    // 显示裁剪框
    showCropper: function () {
      this.setData({ showCropper: true })
    },
    // 隐藏裁剪框
    hideCropper: function () {
      this.setData({ showCropper: false })
      this.triggerEvent('hide-cropper')
    },
    // 触屏开始事件
    touchStart: function (e) {
      this.setData({ touchStart: e.touches })
    },
    // 触屏移动事件
    touchMove: function(e){
      this.setData({
        touchStart: this.data.touchEnd,
        touchEnd: e.touches 
      });
      if (e.touches.length > 1){
        this.zoom();
      }else{
        this.move();
      }
    },
    // 触屏结束事件
    touchEnd: function(e){
      this.touchMove(e);
    },
    // 缩放
    zoom: function () {
      const _that = this, _d = _that.data;
      let start = _d.touchStart, end = _d.touchEnd;
      if(start[0] && end[0]){
        let imgRate = _d.imgWidth / _d.imgHeight;
        // 起始两指距离
        let startDistanceX = (start[1].pageX - start[0].pageX) / _d.unitRate;
        let startDistanceY = (start[1].pageY - start[0].pageY) / _d.unitRate;
        let startDistance = Math.sqrt(startDistanceX * startDistanceX + startDistanceY * startDistanceY);
        // 结束两指距离
        let endDistanceX = (end[1].pageX - end[0].pageX) / _d.unitRate;
        let endDistanceY = (end[1].pageY - end[0].pageY) / _d.unitRate;
        let endDistance = Math.sqrt(endDistanceX * endDistanceX + endDistanceY * endDistanceY);
        // 缩放距离
        let distance = endDistance - startDistance;
        let height = Math.sqrt(distance * distance / (1 + imgRate * imgRate));
        if(distance >= 0){
          height += _d.cropImgHeight;
        }else{
          height = _d.cropImgHeight - height;
        }
        let width = height * imgRate;
        let cropRate = _d.crop.width / _d.crop.height;
        if(imgRate < cropRate){
          if (width < _d.crop.width) {
            width = _d.crop.width;
            height = width / imgRate;
          }
        } else if (imgRate > cropRate){
          if (height < _d.crop.height) {
            height = _d.crop.height;
            width = height * imgRate;
          }
        }
        // 计算left、top
        let minLeft = 750 - _d.edgeDis - width;
        let minTop = 200 + _d.crop.height - height;
        // let imgLeft = _d.imgLeft - (width - _d.cropImgWidth) * 0.1, imgTop = _d.imgTop - (height - _d.cropImgHeight) * 0.1;
        let imgLeft = _d.imgLeft, imgTop = _d.imgTop;
        if (_d.imgLeft < minLeft) {
          imgLeft = minLeft;
        }
        if (_d.imgTop < minTop) {
          imgTop = minTop;
        }
        // console.log('width:' + width + '---height:' + height + '---left:' + imgLeft + '---top:' + imgTop);
        _that.setData({
          cropImgWidth: width,
          cropImgHeight: height,
          imgLeft: imgLeft,
          imgTop: imgTop
        });
      }
    },
    // 移动
    move: function(){
      const _that = this, _d = _that.data;
      if (_d.touchStart[0] && _d.touchEnd[0]){
        let start = _d.touchStart[0], end = _d.touchEnd[0];

        // X
        let width = (end.pageX - start.pageX) / _d.unitRate * _d.rate;
        let canMoveLeft = (_d.imgLeft + _d.cropImgWidth) - (750 - _d.edgeDis); // 可向左移动的距离（图片右边不能进入裁剪框右边）
        let canMoveRight = _d.edgeDis - _d.imgLeft; // 可向右移动的距离（图片左边不能进入裁剪框左边）
        let imgLeft = _d.imgLeft; // 移动后图片的left，top值
        if (width > 0){
          if (width > canMoveRight){
            imgLeft = _d.edgeDis;
          }else{
            imgLeft = _d.imgLeft + width;
          }
        }else if(width < 0){
          if (-width > canMoveLeft) {
            imgLeft = 750 - _d.edgeDis - _d.cropImgWidth;
          } else {
            imgLeft = _d.imgLeft + width;
          }
        }

        // Y
        let height = (end.pageY - start.pageY) / _d.unitRate * _d.rate;
        let canMoveTop = (_d.imgTop + _d.cropImgHeight) - (200 + _d.crop.height); // 可向左移动的距离（图片右边不能进入裁剪框右边）
        let canMoveBottom = 200 - _d.imgTop; // 可向右移动的距离（图片左边不能进入裁剪框左边）
        let imgTop = _d.imgTop; // 移动后图片的left，top值
        if (height > 0) {
          if (height > canMoveBottom) {
            imgTop = 200;
          } else {
            imgTop = _d.imgTop + height;
          }
        } else if (height < 0) {
          if (-height > canMoveTop) {
            imgTop = 200 + _d.crop.height - _d.cropImgHeight;
          } else {
            imgTop = _d.imgTop + height;
          }
        }

        _that.setData({
          imgTop: imgTop,
          imgLeft: imgLeft
        })
      }
    },
    // canvas绘图
    drawCanvas: function(){
      const _that = this, _d = _that.data;
      return new Promise((resolve, reject) => {
        let imgRate = _d.imgWidth / _d.imgHeight;
        let left = (this.data.imgLeft - this.data.edgeDis) * _d.unitRate;
        let top = (this.data.imgTop - 200) * _d.unitRate;
        let width = this.data.cropImgWidth * _d.unitRate;
        let height = width / imgRate;
        let ctx = wx.createCanvasContext('crop-img', _that);
        ctx.beginPath();
        ctx.drawImage(this.data.img, left, top, width, height);
        ctx.draw(false, (res) => {
          let timer = setTimeout(() => {
            clearTimeout(timer);
            resolve();
          }, 500)
        });
       
      })
    },
    // 保存
    save: function(){
      let _that = this, _d = _that.data;
      this.drawCanvas().then(res => {
        wx.canvasToTempFilePath({
          canvasId: 'crop-img',
          success(res) {
            _that.triggerEvent('upload-img', res.tempFilePath)
          },
          fail(e) { console.log(e) }
        }, _that)
      }, err => { console.log(err)})
    },
    // 取消
    cancel: function(){
      this.hideCropper();
    }
  }
})