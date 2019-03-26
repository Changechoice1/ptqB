// component/evaluationList/evaluationList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //评价列表
    eval_list:{
      type: Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 查看图片
    seeImgBtn(e) {
      let url = e.currentTarget.dataset.imgurl;
       wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      })
    },

  }
})
