const SMP = require('simple');
//page方法处理
const funArr = ['onLoad', 'onUnload', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onTabItemTap'];
module.exports = {
   //扩展Page页面默认方法
   assignPage: function (_page) {
      const A = this;
      let page = {
         __onLoad() { },
         __onReady() { },
         __onShow() { },
         __onHide() { },
         __onUnload() { },
         __onPullDownRefresh() { },
         __onReachBottom() { },
         __onShareAppMessage() { },
         __onPageScroll() { },
         __onTabItemTap() { },
         computedA: null,
         opsData:{},
         // 更新全局数据到当前
         refreshData: function () {
            //  处理全局计算属性
            if (this.computedA) {
               let _data = {};
               for (let key in _page.computedA) {
                  for (let a in A.store[key]) {
                     _data[a] = A.store[key][a];
                  }
               }
               this.setData(_data);
            }
         },
         onLoad: function (options) {
            // 保存带入的参数
            this.opsData=options;
            // 更新数据
            this.refreshData();
            if (this.computedA) {
               // 同步所有数据
               for (let key in _page.computedA) {
                  if (A.store[key]) {
                     A.store[key]['pages'].add(this);
                  }
               }
            }
            this.__onLoad(options);
            try {
               let compageId = this.selectComponent("#compage").id;
            } catch (err) {
               // 添加引入 "compage": "/vwx/component/template/"
               throw Error("compage组件引入错误");
            }
         },
         onReady: function () {
            this.__onReady()
         },
         //page中，页面显示后事件
         onShow: function () {
            if (this.data.ReviewPage) {
               // 自定义显示处理方法，主要用于配合onShow方法，默认用于页面的数据刷新
               // this.setData({ ReviewPage: false });
               this.__onShow();
            }
         },
         onHide: function () { this.__onHide() },
         onUnload: function () {
            if (this.computedA) {
               for (let key in _page.computedA) {
                  if (A.store[key]) {
                     A.store[key]['pages'].delete(this);
                  }
               }
            }
            this.__onUnload()
         },
         onPullDownRefresh: function () { this.__onPullDownRefresh() },
         onReachBottom: function () { this.__onReachBottom() },
         onShareAppMessage: function () { return this.__onShareAppMessage() },
         onPageScroll: function (e) { this.__onPageScroll(e) },
         onTabItemTap: function () { this.__onTabItemTap() },
         //组件上触发跳转事件
         //参考  bindtap="goPage" data-upage="channle/channles"
         //upage是属性名
         goPage: (_evt) => {
            SMP.G(SMP.C(_evt).upage);
         },
         // 返回上一页
         goBack: (_review, _delta) => {
            _review = _review || false;
            _delta = _delta || "";
            SMP.G("navigateBack://" + _delta, _review);
         },
         // 返回上一页并设置上一页的reviewPage状态
         goBackR: (_delta) => {
            SMP.G("navigateBack://" + (_delta || ""), true);
         },
         rsErr: (err) => {
            console.log(err);
         },
         // reviewParentData设置上级页面数据需要更新
         setRPdata: (_val) => {
            SMP.getParentPage().setData({ ReviewPage: _val || true });
         },
         wToast: function (_val) {
            let query = this.selectComponent("#compage");
            if (typeof _val == "boolean") {
               query.hideToast()
            } else if (typeof _val == "string") {
               query.showToast(_val);
            } else {
               query.showToast(_val.title);
            }
         }
      };
      // 初始化data数据
      _page.data = Object.assign({
         // ReviewPage，是否刷新当前页面数据，主要作用在于返回到当前页面时，根据次状态更新信息
         // 如新增修改数据后退页面处理
         ReviewPage: true,
         config: A.config,
         DF: A.DF,
         STATE: A.STATE
      }, _page.data);
      //  处理全局计算属性
      // if (typeof _page.computedA != 'undefined') {
      //    for (let key in _page.computedA) {
      //       Object.assign(_page.data, this.store[key])
      //    }
      // }
      //  全局状态数据附加

      //重置page页面生命周期
      for (let key of Object.keys(_page)) {
         if (funArr.find(value => { return value == key })) {
            page['__' + key] = _page[key];
            delete _page[key];
         }
      }
      // 合并扩展
      Object.assign(page, _page);
      return page;
   }
}