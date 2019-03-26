let data = require('../../../../../config/data.js');
let algorithm = require('algorithm.js');
let qrImgCanvas = require('qrImgCanvas.js');
let audio;
const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    swiperTip: '基础正式版商家，通过支付二维码扫码支付，拼团趣不收取任何费用，仅微信收取0.6%手续费，基础体验版商家，暂同基础正式版商家。',
    scrollLeft: 0,
    initScrollLeft: false,

    imgMaxnum: {
      goods_detail_imgs: 15
    }, // 最多可上传图片数量
    instructions: [
      {
        title: '刮奖免单玩法介绍',
        content: `<div style="text-align: left; font-size: 11px;">
          <div style="text-align: center">以200元消费，首笔返10%为例</div>
        <div style="margin-top: 10px"><span style="color: #e60012;">1、</span>假设发起人消费200元，返现比例为10%，则发起人最多返现20元，商家可自定义返现比例，若设置为0%，所有用户将不会发起刮奖免单活动。</div>
        <div style="margin-top: 10px"><span style="color: #e60012;">2、</span>发起人发起活动后，激活200元奖金池，包含20元现金与180元代金券。</div>
        <div style="margin-top: 10px"><span style="color: #e60012;">3、</span>发起人分享活动给好友，允许刮奖人数为10-15人，其中5位好友帮发起人刮出20元现金红包（立即到账），所有好友共刮出180元的代金券。</div>
        <div style="margin-top: 10px"><span style="color: #e60012;">4、</span>好友到店消费使用付款码付款时，在满足消费条件后，可以使用代金券抵扣。</div>`
      },{
        title: '玩法详情',
        content: `<div style="text-align: left;font-size: 11px;">
          <div>
            <p style="color: #e60012;">什么是代金券？</p>
            <p>发起人激活奖金池，好友帮发起人刮出现金并瓜分奖金池的代金券，好友到店消费时需满足满减条件才能使用代金券。</p>
          </div>
          <div style="margin-top: 10px">
            <p style="color: #e60012;">9折是什么意思？</p>
            <p>指系统设置代金券使用的满减条件，代金券相当于9折券。\n
  例如刮到代金券10元，需消费满100元才能使用。</p>
          </div>
          <div style="margin-top: 10px">
            <p style="color: #e60012;">自定义是什么意思？</p>
            <p>指商家可以修改代金券的使用条件，可自定义范围为1.0-9.9，例如输入9.5代表95折。\n例如刮到代金券5元，需消费满100元才能使用。
  </p>
          </div>
        </div>`
      }
    ],
    form:{}, // 表单数据
    focusField: '', // 定位字段
    showSimulation: false, // 展开消费金额数据模拟
    simulate_amount: '', // 模拟消费金额
    showOptList: false, // 显示列表选项
    showOptListField: '', // 显示列表选项字段名
    btn: '', // 提交表单按钮
    isAdd: false, // 是否为添加活动
    musicList: [],
    playMusic: {}, // 试听音乐
    payQrImgFlag: false, // 是否显示支付二维码图片
    payQrImgInfo: data.payQrImgInfo,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 参数
    this.setData({
      editType: options.editType || 0
    });
    // 编辑
    if (options.id) {
      wx.setNavigationBarTitle({ title: '商品编辑' })
      // 获取活动数据
      this.getActData();
    } else {
      wx.setNavigationBarTitle({ title: '商品添加' });
      this.setData({ isAdd: true });
      let form = {
        store_id: A.DB.user.sid,
        id: options.id || 0, // 活动id
        is_group: 5, // 活动类型
        valid_period: 48, // 活动有效时间
        limit_time: 1, // 代金券有效期
        secs_price: '', // 最低消费金额
        return_customize: 0, // 是否自定义返现金额：0-否，1-是
        return_rate: 5, // 返还现金金额
        voucher_customize: 0, // 是否自定义代金券：0-否，1-是
        voucher_rate: 9, // 代金券满减条件
        music_id: 0, // 背景音乐id
        music_name: '', // 背景音乐名称
        goods_des: '', // 商家详情
        goods_detail_imgs: [], //  商家详情图
      };
      if (wx.getStorageSync('activityGjmd')) {
        form = wx.getStorageSync('activityGjmd')
      }
      this.setData({ form: form });
    }
    // 获取音乐列表
    this.getMusicList();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 关闭分享功能
    wx.hideShareMenu();
    // 滚动提示
    this.scrollTipTimer();
  }, 
  onHide: function () {
    clearInterval(this.data.tipTimer);
    if (audio) {
      audio.destroy();
    }
  },
  /**
   * 生命周期函数—监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.tipTimer);
    if (audio) {
      audio.destroy();
    }
    const _that = this, _d = _that.data;
    if (_d.isAdd) {
      wx.setStorageSync('activityGjmd', _d.form)
    }
  },
  // 设置页面高度
  setHieght: function(){
    const _that = this;
    wx.getSystemInfo({
      success: function(res) {
        _that.setData({nonautoHeight: res.windowHeight});
      },
    })
  },
  // 取消自定义按钮加载中状态
  hideLoading: function () {
    this.data.btn.hideLoading();
  },
  // 设置showModal
  setShowModalTrue: function () {
    this.setData({ showModal: true });
  },
  // 设置showModal
  setShowModalFalse: function () {
    this.setData({ showModal: false });
  },
  // 滚动提示计时器
  scrollTipTimer() {
    const _that = this, _d = _that.data;
    var tipTimer = setInterval(function () {
      _that.setData({ scrollLeft: _d.scrollLeft + 2 });
      if (_d.scrollLeft == 1550) {
        _that.setData({ scrollLeft: -750, initScrollLeft: true })
      }
    }, 50)
    _that.setData({ tipTimer: tipTimer })
  },
  // 获取活动数据
  getActData: function () {
    const _that = this, _d = _that.data;
    wx.showLoading({ title: '加载中' })
    A.updata.getGjmdInfo().then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        _that.setData({ form: res.data })
      } else {
        _that.setShowModalTrue();
        A.showTipModal(res.info || '数据获取失败', _that.goBack);
      }
    }, err => {})
  },
  // 获取音乐列表
  getMusicList: function () {
    const _that = this, _d = _that.data;
    wx.showLoading({ title: '加载中' })
    A.updata.getMusicList().then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        _that.setData({ musicList: res.data })
      } else {
        _that.setShowModalTrue();
        A.showTipModal(res.info || '数据获取失败', _that.goBack);
      }
    }, err => { })
  },
  // 查看设置相关说明
  showInstruction: function (e) {
    const _that = this, _d = _that.data;
    let idx = e.currentTarget.dataset.tip;
    _that.setShowModalTrue();
    A.showModal({
      title: _d.instructions[idx].title || '温馨提示',
      contType: 2,
      content: _d.instructions[idx].content,
      success: _that.setShowModalFalse,
      confirmText: '我知道了',
      showCancel: false
    });
  },
  // 展开/收起算法分析
  showSimulation: function () {
    let _that = this, _d = _that.data;
    if(_d.form.secs_price){
      if(!_d.showSimulation){
        _that.calc();
        _that.setData({
          showSimulation: !_d.showSimulation
        });
      }else{
        _that.setData({
          showSimulation: !_d.showSimulation,
          simulation: {},
          simulate_amount: ''
        });
      }
    }
  },
  // 算法分析
  calc: function(){
    let _that = this, _d = _that.data;
    let valReg = A.validateFrom(_d.simulate_amount, "price");
    let value;
    if (valReg !== true) {
      if (Number(_d.simulate_amount) == 0) {
        value = '';
      } else {
        value = Number(_d.simulate_amount).toFixed(2);
      }
    } else {
      value = _d.simulate_amount;
    }
    this.setData({ simulate_amount: value });
    if (!_d.simulate_amount || Number(_d.simulate_amount) >=  Number(_d.form.secs_price)){
      let simulation = algorithm.calc(_d.simulate_amount, _d.form.return_rate);
      _that.setData({ simulation: simulation });
    }else{
      A.showTipModal('假设单笔消费金额应大于最低参与活动消费金额')
    }
  },
  // 表单单选选择事件
  formSelect: function (e) {
    // 可选择
    if (!e.currentTarget.dataset.disabled) {
      const _that = this, _d = _that.data;
      let dataset = e.currentTarget.dataset;
      _d.form[dataset.field] = dataset.value;
      if (dataset.flagfield){
        _d.form[dataset.flagfield] = dataset.flagvalue;
      }
      _that.setData({ form: _d.form });
    }
  },
  // 表单内容输入事件
  formInput: function (e) {
    let field = e.currentTarget.dataset.field;
    let dataField = 'form.' + field;
    this.setData({ [dataField]: e.detail.value });
  },
  // 模拟金额输入事件
  simulateInput: function(e){
    let field = e.currentTarget.dataset.field;
    let valReg = A.validateFrom(e.detail.value, "price");
    let value;
    if (valReg !== true) {
      if (Number(e.detail.value) == 0){
        value = '';
      }else{
        value = Number(e.detail.value).toFixed(2);
      }
    }else{
      value = e.detail.value;
    }
    this.setData({ [field]: value });
  },
  // 表单列表选择事件
  formListSelect: function(e){
    let field = e.currentTarget.dataset.field;
    let value = e.currentTarget.dataset.value;
    if (this.data.showOptListField == field){
      this.setData({
        showOptList: false,
        showOptListField: '',
        tempOptListId: 0,
        tempOptListName: '',
        playMusic: {}
      });
    }else{
      this.setData({
        showOptList: true,
        showOptListField: field,
        tempOptListId: this.data.form[field],
        tempOptListName: this.data.form[value],
        playMusic: {}
      });
    }
  },
  // 表单列表项选择事件
  formListItemSelect: function(e){
    if (audio) {
      audio.destroy();
    }
    this.setData({
      tempOptListId: e.currentTarget.dataset.id,
      tempOptListName: e.currentTarget.dataset.name,
      playMusic: {}
    });
  },
  // 试听
  playMusic: function(e){
    let item = e.currentTarget.dataset.item
    if(audio){
      audio.destroy();
    }
    this.setData({ playMusic: item });
    audio = wx.createInnerAudioContext();
    audio.src = item.music_url;
    audio.play();
  },
  // 停止播放
  pauseMusic: function () {
    audio.destroy();
    this.setData({ playMusic: {} });
  },
  // 取消表单列表选择事件
  cancelFormListSelect: function () {
    if (audio) {
      audio.destroy();
    }
    this.setData({
      showOptList: false,
      showOptListField: '',
      tempOptListId: 0,
      tempOptListName: '',
      playMusic: {}
    });
  },
  // 确定表单列表选择事件
  certainFormListSelect: function (e) {
    const _that = this, _d = _that.data;
    _d.form.music_id = _d.tempOptListId;
    _d.form.music_name = _d.tempOptListName;
    if(audio){
      audio.destroy();
    }
    this.setData({
      showOptList: false,
      showOptListField: '',
      tempOptListId: 0,
      tempOptListName: '',
      playMusic: {},
      form: _d.form
    });
  },
  // 活动详情获取焦点范围扩大
  focusTextarea: function (e) {
    let field = e.currentTarget.dataset.field;
    this.setData({ focusField: field })
  },

  /**
   * 图片
   */
  // 上传图片
  uploadImg: function (e) {
    const _that = this, _d = _that.data;
    let field = e.currentTarget.dataset.field;
    let type = e.currentTarget.dataset.type;
    let count = _d.form[field] ? _d.form[field].length : 0;
    A.chooseMultiImage({
      count: _d.imgMaxnum[field] - count
    }).then(res => {
      let oversize = false;
      for (let i = 0, len = res.length; i < len; i++) {
        if (res[i].size > 2097152) {
          oversize = true;
          continue;
        }
        A.uploadFile1({
          url: '/WeChatAppsCs/StoreGoods/upload_goods_image',
          filePath: res[i],
          name: 'goodsimg',
          formData: {
            unionid: A.DB.user.unid,
            folder: 'goodsimg',
            type: type == 0 ? 2 : 10
          }
        }).then(res1 => {
          if (res1.statusCode == 200) {
            let dataField = 'form.' + field;
            let imgs = _d.form[field] || [];
            imgs.push(res1.data);
            _that.setData({ [dataField]: imgs });
          }
        }, err1 => {
          _that.setShowModalTrue();
          A.showTipModal(err1.info || '图片上传失败', _that.setShowModalFalse)
        })
      }
      if (oversize) {
        _that.setShowModalTrue();
        A.showTipModal('有图片已超过2MB,您可以选择压缩图片以后重新上传', _that.setShowModalFalse);
      }
    }, err => { })
  },
  // 删除图片
  delImg: function (e) {
    const _that = this, _d = _that.data;
    let index = e.currentTarget.dataset.index;
    let field = e.currentTarget.dataset.field;
    _that.setShowModalTrue();
    A.showBaseModal('是否删除这张图片', function () {
      let dataField = 'form.' + field;
      let imgs = A.ArrFunc.RemoveByIndex(_d.form[field], index);
      _that.setData({ [dataField]: imgs });
    }, null, _that.setShowModalFalse)
  },
  // 移动图片
  moveUpImg: function (e) {
    const _that = this, _d = _that.data;
    let index = e.currentTarget.dataset.index;
    let field = e.currentTarget.dataset.field;
    let dataField = 'form.' + field;
    let imgs = A.ArrFunc.ReverseByIndex(_d.form[field], index - 1, index);
    _that.setData({ [dataField]: imgs });
  },
  moveDownImg: function (e) {
    const _that = this, _d = _that.data;
    let index = e.currentTarget.dataset.index;
    let field = e.currentTarget.dataset.field;
    let dataField = 'form.' + field;
    let imgs = A.ArrFunc.ReverseByIndex(_d.form[field], index, index + 1);
    _that.setData({ [dataField]: imgs });
  },
  // 预览图片
  previewImg: function (e) {
    let url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },

  // 提交表单
  submitForm: function () {
    let _that = this, _form = _that.data.form;
    _that.setData({ btn: _that.selectComponent('#submit_btn') });
    
    // 表单数据验证
    let valReg = A.validateFrom({
      secs_price: _form.secs_price, // 最低参与活动的消费金额
    }, {
        secs_price: {
          exp: ["empty1", /^[1-9]*[1-9][0-9]{1,}$/], err: { field: 'secs_price', tip: "最低消费金额为不低于10的整数" }
        }
      });
    if (valReg !== true) {
      _that.setShowModalTrue();
      A.showTipModal(valReg.tip, function () {
        _that.setShowModalFalse();
        _that.setData({ focusField: valReg.field });
        _that.hideLoading();
      });
      return;
    }
    if (_form.return_customize == 1) {
      let valReg = A.validateFrom({
        return_rate: _form.return_rate, // 自定义返还发起者实际现金金额
      }, {
          return_rate: {
            exp: ['empty1', /^(([0-9])|([1-8][0-9])|(90))$/], err: { field: 'return_rate', tip: "返现比例应为大于等于0,且小于等于90的整数" }
          }
        });
      if (valReg !== true) {
        _that.setShowModalTrue();
        A.showTipModal(valReg.tip, function () {
          _that.setShowModalFalse();
          _that.setData({ focusField: valReg.field });
          _that.hideLoading();
        });
        return;
      }
    }
    if (_form.voucher_customize == 1) {
      let valReg = A.validateFrom({
        voucher_rate: _form.voucher_rate, // 自定义返还发起者实际现金金额
      }, {
          voucher_rate: {
            exp: ['empty1', /^[1-9](\.[\d])*$/], err: { field: 'voucher_rate', tip: "代金券满减条件应为1.0-9.9的数字" }
          }
        });
      if (valReg !== true) {
        _that.setShowModalTrue();
        A.showTipModal(valReg.tip, function () {
          _that.setShowModalFalse();
          _that.setData({ focusField: valReg.field });
          _that.hideLoading();
        });
        return;
      }
    }
    let valReg1 = A.validateFrom({
      music_id: _form.music_id, // 背景音乐
      goods_des: _form.goods_des // 商家简介
    }, {
        music_id: {
          exp: "empty", err: { field: 'music_id', tip: "请选择背景音乐" }
        },
        goods_des: {
          exp: "empty1", err: { field: 'goods_des', tip: "请输入商家简介" }
        }
      });
    if (valReg1 !== true) {
      _that.setShowModalTrue();
      A.showTipModal(valReg1.tip, function () {
        _that.setShowModalFalse();
        _that.setData({ focusField: valReg1.field });
        _that.hideLoading();
      });
      return;
    }
    // 详情图
    if (_form.goods_detail_imgs.length == 0) {
      _that.setShowModalTrue();
      A.showTipModal('请至少上传一张图片', function () {
        _that.setShowModalFalse();
        _that.setData({ focusField: 'goods_detail_imgs' });
        _that.hideLoading();
      });
      return;
    }
    
    if (_form.return_customize == 1 && _form.return_rate >= 20) {
      _that.setShowModalTrue();
      A.showBaseModal('当前返现比例为：' + _form.return_rate + '%，偏高，确定这样设置吗？', () => {
        _that.submitFormData();
      }, () => {
        _that.setData({ focusField: 'return_rate' });
        return;
      }, () => {
        _that.setShowModalTrue();
        _that.hideLoading();
      })
    }else{
      _that.submitFormData();
    }
  },
  // 确定提交
  submitFormData: function(){
    let _that = this, _form = _that.data.form;
    let form = Object.assign({}, _form, { voucher_rate: _form.voucher_rate * 10 });
    wx.showLoading({ title: '加载中' })
    A.updata.submitGjmdFrom(form).then(res => {
      try {
        _that.hideLoading();
        wx.hideLoading();
        if (res.status == A.STATE.STATUS.OK) {
          wx.removeStorageSync('activityGjmd');
          if (form.id) {
            wx.hideLoading();
            _that.setShowModalTrue();
            A.showTipModal('修改成功！', _that.goBack);
          } else {
            _that.setData({
              'payQrImgInfo.logo': wx.getStorageSync('storeInfo').store_logo,
              'payQrImgInfo.name': wx.getStorageSync('storeInfo').store_name,
              'payQrImgInfo.qrImg': res.data
            });
            qrImgCanvas.downloadImg(this.data.payQrImgInfo).then(res => {
              let payQrImgInfo = res;
              this.setData({
                payQrImgInfo: payQrImgInfo
              });
              _that.setHieght();
              _that.showPayQrImg();
              _that.setShowModalTrue();
            }, err => {
              wx.hideLoading();
            });
          }
        } else {
          wx.hideLoading();
          _that.setShowModalTrue();
          A.showTipModal(res.info || '操作失败！', _that.setShowModalFalse)
        }
      } catch (e) {
        _that.hideLoading();
        wx.hideLoading();
      }
    }, err => { _that.hideLoading() });
  },

  // 显示支付二维码
  showPayQrImg: function(){
    this.setShowModalTrue();
    this.setData({ payQrImgFlag: true });
  },
  // 隐藏支付二维码图片
  hidePayQrImg: function () {
    this.setData({ payQrImgFlag: false });
    this.setShowModalFalse();
  },
  // 保存支付二维码图片
  savePayQrImg: function () {
    this.setData({ btn: this.selectComponent('#save_btn') });
    // 绘制canvas
    qrImgCanvas.drawCanvas(this.data.payQrImgInfo).then(() => {
      qrImgCanvas.savePayQrImg(this).then(res => {
        this.goBackR();
      });
    });
  },
}))