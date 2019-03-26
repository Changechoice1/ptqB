// pages/myshop/order/orderInfo/orderInfo.js
var https = require('../../../../utils/http.js').http
var http = require('../../../../utils/http.js')
var util = require('../../../../utils/util.js')
var unionid = wx.getStorageSync('thisCode')

const A = getApp();
Page(A.assignPage({

    /**
     * 页面的初始数据
     */
    data: {
        order_info: {},
        logisticsArr: [],
        logisticsStr: "",
        logisticsStr1: "请选择物流",
        logisticsInput: "",
        logChangeFlag: true,
        imgUrl: http.imgUrl,
        eval_text: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var thatId = options.id
        this.setData({ 
          order_id: thatId,
          listIndex: options.index,
          listTab: options.tab
        })
        this.orderLonding(thatId)
    },
    // 选择物流
    logisticsChange(e) {
        let that = this
        let index = Number(e.detail.value)
        let express_list1 = that.data.express_list1
        let express_list2 = that.data.express_list2
        that.setData({
            logisticsStr: express_list1[index],
            logisticsStr1: express_list2[index],
        })
    },
    // 获取订单详情
    orderLonding(order_id) {
        order_id = order_id || this.data.order_id;
        var that = this
        var unionid = wx.getStorageSync('thisCode')
        let logisticsArr = []
        let express_list1 = []
        let express_list2 = []
        http._post1('StoreOrder/order_info', { unionid: unionid, order_id: this.data.order_id }, res => {
            var data = res.data
            if (data.status == 1) {
                for (let i in data.express_list) {
                    express_list1.push(data.express_list[i].express_company)
                    express_list2.push(data.express_list[i].express_ma)
                }
                var order_info = data.order_info
                if (order_info.status == 3) {
                    that.setData({
                        logisticsStr1: order_info.send_name,
                        logisticsInput: order_info.send_nums,
                        logisticsStr: order_info.express_name || "请选择物流",
                        logChangeFlag: order_info.logistics == 0 ? true : false
                    })
                }
                let evaluate_info = data.order_info.evaluate_info || {};
                evaluate_info.score = Number(evaluate_info.score)
                that.setData({
                    is_account: data.is_account,
                    order_info: data.order_info,
                    evaluate_info: evaluate_info,
                    express_list1: express_list1,
                    express_list2: express_list2
                })
            } else {
                http.showModal(data.info, false, () => { })
            }
        }, res => { })
    },
    // 监控物流单号输入事件
    logisticsInput(e) {
        let that = this
        let value = e.detail.value
        that.setData({
            logisticsInput: value
        })
    },
    // 点击更换是否选择物流
    logChangeBtn(e) {
        var that = this
        var index = http.dataIndex(e)[0]
        var logChangeFlag = index == 1 ? true : false
        that.setData({ logChangeFlag: logChangeFlag })
    },
    // 点击核销
    writeBtn(e) {
        let data = this.data, order_info = data.order_info
        if (order_info.is_authentication == 0) {
          let tip = {}, showModal = false;
          if(data.is_account == 0){
            wx.showModal({
              title: '提示',
              content: '为不影响您使用认证特权功能，请尽快去补充认证资料',
              showCancel: false,
            
              success: function(res){
                if(res.confirm){
                  this.goAuth();
                }
              }
            })
          } else if (data.is_account == 1){
            wx.showModal({
              title: '提示',
              content: '为不影响您使用认证特权功能，请尽快去补充认证资料',
              showCancel: false,
              confirmText: '我知道了'
            })
          }
            return
        }else 
          wx.showModal({
            title: '提示',
            content: '请核对此订单用户是否已成功消费,如还未消费,请谨慎操作!',
            success: (res) => {
              if(res.confirm){
                this.cancelAfterVerification();
              }
            }
          })
    },
    // 确认核销
    cancelAfterVerification: function () {
      var unionid = wx.getStorageSync('thisCode')
      var id =  this.data.order_id;
			var that = this;
			A.updata.cancelAfterVerificationNew(id).then(res=>{
				wx.hideLoading()
				if (res.status == A.STATE.STATUS.OK) {
					A.showTipModal(res.info || res.data,()=>{
						that.orderLonding(id);
					})
				} else {
					A.showTipModal(res.info || res.data || '请求数据失败')
				}
			},err=>{
				wx.hideLoading()
				A.showTipModal(err.info || err.data || '接口请求失败')
			})
    },
    // 去认证
    goAuth: function(){
      A.G('/pages/myshop/my/qualificationCert/index');
    },
    // 提交物流信息
    logisticsUpDataBtn() {
        let that = this
        let order_info = that.data.order_info
        var unionid = wx.getStorageSync('thisCode')
        var url = order_info.status == 2 ? 'StoreOrder/send_order' : order_info.status == 3 ? 'StoreOrder/modify_express' : 'StoreOrder/send_order'
        let logisticsStr1 = that.data.logisticsStr1 || 0
        var logisticsStr = that.data.logisticsStr || 0
        let logisticsInput = that.data.logisticsInput || ''
        var logChangeFlag = that.data.logChangeFlag ? 0 : 1
        if ((logisticsStr == "请选择物流" || logisticsStr1 == "请选择物流") && logChangeFlag == 0) {
            http.showModal('请选择物流', false, () => { })
            return
        }
        if(!logChangeFlag){
          let valReg = A.validateFrom({val: logisticsInput}, {val: {exp: /^[0-9a-zA-Z]+$/, err: '请输入正确格式得物流单号'}});
          if (valReg !== true) {
              A.showTipModal(valReg);
              return;
          }
        }
        http._post1(url, {
            unionid: unionid,
            express_name: logisticsStr1,
            express_num: logisticsInput,
            order_id: order_info.id,
            logistics: logChangeFlag
        }, res => {
            let data = res.data
            if (data.status == 1) {
                http.showModal(data.info, false, () => {
                    if(that.data.order_info.status == 2){
                         that.updateLastPageData('delete');
                    }
                    wx.navigateBack({
                        delta: 1
                    })
                })
            } else if (data.status == 0) {
                http.showModal(data.info, false, () => { })
            }else{
              http.showModal(data.info, false, () => { })
            }
        }, res => { })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        wx.hideShareMenu()
    },

    // 回复评价
    evalText(e) {
       var that = this
       var inputArr = [that.data.eval_text]
       var aa = http.inputArr(inputArr, e);
       that.setData({
          eval_text: aa[0],
       })
       
    },
   endInputTxt(e) {
      const _that = this;
      if (!http.endInputArr(e)) {
         A.showTipModal('最小长度为' + e.currentTarget.dataset.minlen + '个字符');
         return false;
      }else{
         return true;
      }
   },
    returnEval(e) {
        let that = this
        let url = 'StoreEvaluate/reply'
        let id = e.currentTarget.dataset.id
        var unionid = wx.getStorageSync('thisCode')
        let content = that.data.eval_text
        if (!content || !content.replace(/\s+/g, "")) {
            http.showModal('回复内容不得为空', false, () => { })
            return
        }
       if (that.data.eval_text.length<2){
          A.showTipModal('最小长度为2个字符');
          return
       }
        http._post1(url, {
            content: that.data.eval_text,
            evaluate_id: id,
            unionid: unionid
        }, res => {
            var data = res.data
            if (data.status == 1) {
                http.showModal(data.info, false, () => {
                    wx.navigateBack({
                        delta: 1
                    })
                })
            } else {
                http.showModal(data.info, false, () => { })
            }
        }, res => {
            that.setData({ clickF: true })
        })
    },
    navMy(){
        wx.reLaunch({
            url: '/pages/myshop/home/index'
        })
    },
    // 更新上一页数据
    updateLastPageData: function(type){
      let statusArr = {
        3: {
          status: 4,
          status_str: '待评价'
        }, // 待使用 -> 待评价
        2: {
          status: 3,
          status_str: '待收货'
        }  // 代发货 -> 待收货
      };
      let pages = getCurrentPages();
      let page = pages[pages.length - 2];
      let list = page.data.order_list;
      let tab = this.data.listTab,
          index = this.data.listIndex;
      if(tab != 0 && type == 'delete'){
        list = A.ArrFunc.RemoveByIndex(list, index);
        page.setData({
          order_list: list,
          orderNum: page.data.orderNum - 1
        });
      }else{
        list[index].status_str = statusArr[list[index].status].status_str;
        list[index].status = statusArr[list[index].status].status;
        page.setData({ order_list: list })
      }
    }
}))