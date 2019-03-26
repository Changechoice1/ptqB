var http = require('../../../../../utils/http.js')
var unionid = wx.getStorageSync('thisCode')
const A = getApp();
Page(A.assignPage({

    /**
     * 页面的初始数据
     */
    data: {
        nextPageFlag: true,//在没有返回数据之前只允许点一次
        inputArr: ["", "", ""],
        img1: "",
        img2: "",
        img: "",
        clickF: false,
        auth_id: 0,
        imgArr: [],
        imgUrl: http.imgUrl,
    },

    onLoad(options) {
        var that = this
        var unionid = wx.getStorageSync('thisCode')
        var AuditF = options.AuditF || 0
        that.setData({ AuditF: AuditF })
        http._post1('StoreAuthentication/auth_info', {
            type: 2,
            unionid: unionid,
        }, function (res) {
            var data = res.data
            if (data.status == 1) {
                var info = data.info
                var imgArr = [info.front, info.verso, info.papers, info.business]
                var inputArr = [info.name, info.identity_card, info.telephone]
                that.setData({
                    inputArr: inputArr,
                    imgArr: imgArr,
                    auth_id: info.auth_id,
                    clickF: true
                })
            } else {
              A.showTipModal(data.info || '获取数据失败，请重试！')
            }
        }, function (res) {
          A.showTipModal('获取数据失败，请重试！')
        })
    },
    onShow() {
      this.setData({
        nextPageFlag: true
      })
    },
    onHide: function(){
      this.setData({
        nextPageFlag: true
      })
    },
    onUnload: function(){
      this.setData({
        nextPageFlag: true
      })
    },
    // 去下一步
    nextPage() {
      var that = this
      if (this.data.nextPageFlag){
        
        var inputArr = that.data.inputArr
        var unionid = wx.getStorageSync('thisCode')
        var auth_id = that.data.auth_id
         let valReg = A.validateFrom({
            name: inputArr[0], // 姓名
            idcard: inputArr[1], // 身份证号
            tel: inputArr[2] // 联系电话
         }, {
               name: {
                  exp: ['empty1', /^([A-Za-z\u4E00-\u9FA5\uf900-\ufa2d]{2,8})$/],
                  err: {
                     field: 'name',
                     tip: '请输入正确格式的姓名（2-8个字）'
                  }
               },
               idcard: {
                  exp: ['empty1', 'id'],
                  err: {
                     field: 'idcard',
                     tip: '请输入正确格式的身份证号'
                  }
               },
               tel: {
                  exp: ['empty1', 'contactNumber'],
                  err: {
                     field: 'tel',
                     tip: '请输入正确格式的电话号码'
                  }
               }
            });
         if (valReg !== true) {
            that.formValTip(valReg);
            return;
         }
        for (let i = 0; i < 3; i++) {
          if (!inputArr[i] || !that.data.imgArr[i]) {
            http.showModal('您有必填项为空或必填图片未上传，请仔细核对后再提交资料！', false, function () {
              that.setData({ nextPageFlag: true })
            })
            return
          }
        }
         this.setData({
            nextPageFlag: false
         })
        var imgArr1 = http.imgSup(that.data.imgArr)
        http._post1('StoreNewAuthentication/new_apply', {
          unionid: unionid,
          auth_id: auth_id,
          type: 2,
          name: inputArr[0],
          identity_card: inputArr[1],
          telephone: inputArr[2],
          front: imgArr1[0],
          verso: imgArr1[1],
          papers: imgArr1[2],
          business: imgArr1[3],
        }, function (res) {
          that.setData({
            nextPageFlag: true
          })
          var data = res.data
          if (data.status == 1) {
            if (that.data.AuditF == 1) {
              http.showModal('您已成功提交认证！审核期间，工作人员会致电与您核对相关信息，请注意接听电话！', false, function () {//重新认证成功,请留意公众号通知
                wx.navigateBack({
                  delta: 1
                })
              })
              return
            }
            http.showModal('您已成功提交认证！审核期间，工作人员会致电与您核对相关信息，请注意接听电话！', false, function () {//重新认证成功,请留意公众号通知
              wx.redirectTo({
                url: '../certResult/certResult?auth_id=' + data.id + '&is_authentication=2'
              })
            })
          } else {
            http.showModal(data.info, false, function () {
              that.setData({
                inputArr: [],
                clickF: false,
                imgArr: []
              })
            })
          }
        }, function (res) {
          this.setData({
            nextPageFlag: true
          })
          A.showTipModal('获取数据失败，请重试！')
        })
      }
    },
    // 判断输入值的正则方式
    identBtn(e) {
        var that = this
        var index = http.dataIndex(e)[0]
        var inputArr = that.data.inputArr
        var arr = http.inputArr(inputArr, e)
        var str = arr[index]
        if (index == 0) {
            if (!http.rexFn(str)[2]) {
                http.showModal('只允许输入中文字符', false, function () { })
                arr[index] = ""
                that.setData({ inputArr: arr })
                return
            }
        } if (index == 1) {
            if (!http.IdentityCodeValid(str)[0]) {
              http.showModal('请输入正确的身份证号码', false, function () { })
              arr[index] = ""
              that.setData({ inputArr: arr })
              return
            }
        } if (index == 2) {
            if (!http.rexFn(str)[0]) {
                http.showModal('请输入正确的手机号码', false, function () {})
                arr[index] = ""
                that.setData({ inputArr: arr })
                return
            }
        }
        that.setData({ 
            inputArr: arr,
            clickF: true
        })
    },
    // 图片上传
    upImgData(e) {
        var that = this
        var index = http.dataIndex(e)[0]
        var unionid = wx.getStorageSync('thisCode')
        var imgArr = that.data.imgArr
        http.oneImg(function (res) {
            var formData = { folder: 'authentication', type: 0, unionid: unionid }
            http.upImgAllSuccssAll(res, formData, function (resp) {
                console.log(resp)
                var img = (resp.data).replace(/[\r\n]/g, "")
                imgArr[index] = img
                that.setData({ imgArr: imgArr })
            }, 'StoreAuthentication/upload_image')
        })
    },
    // 点击查看图片
    seeImgBtn(e) {
        var index = http.dataIndex(e)[0]
        wx.previewImage({
            current: index,
            urls: [index]
        })
   }, 
   inputTxt(e) {
      var that = this
      var inputArr = that.data.inputArr
      var aa = http.inputArr(inputArr, e)
      that.setData({
         inputArr: aa,
      })
   },
   
   formValTip: function (res, noHideLoading) {
      const _that = this;
      A.showTipModal(res.tip, function () {
         _that.setData({
            focusField: res.field
         });
      });
   },
}))