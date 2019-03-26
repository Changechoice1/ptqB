let audio;
const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    listIdx: -1, // 列表项index
    is_account:0,
    showDatetimePicker: false, // 时间选择器
    picker: {}, // field:当前编辑字段，name:当前编辑字段名称，date:日期，time:时间
    showGroupPrice: false, // 是否显示团购价格详情
    groupPriceArr: [], // 团购价格详情数组
    goodsType: '商品', // 商品类型
    imgMaxnum: {
      goods_slide: 3,
      goods_detail_imgs: 15,
      card_detail_imgs: 15
    }, // 最多可上传图片数量

    instructions: [{
        title: '',
        content: [
          '<div style="text-align: left; font-size: 11px;"><div>拼团趣免费提供营销活动技术支持，收取相应营销活动的服务手续费。</div><div style="padding: 10px 0 5px; color: #e60012;">【拼团立减】</div><div>拼团立减营销活动，收取6%的服务费，收取标准为（拼团销售总额 — 首单售货金额）×6%，如只有一个人成团，则首单总额由腾讯平台收取0.6%手续费（此费用为腾讯公司收取）。</div><div style="padding: 10px 0 5px; color: #e60012;">【多人拼团、限时专享】</div><div>多人拼团、限时专享功能，每一单都统一收取6%的服务费。</div><div>其他营销活动服务以技术更新上线为准。乙方授权甲方自每笔销售款中可直接扣除相应的交易服务费，不予退还。</div></div>',
          '<div style="text-align: left; font-size: 11px;"><div>拼团趣免费提供营销活动技术支持，收取相应营销活动的服务手续费。</div><div style="padding: 10px 0 5px; color: #e60012;">【拼团立减、多人拼团、限时专享】</div><div>拼团趣平台不收取佣金，由腾讯平台收取0.6%的服务费。</div><div>其他营销活动服务以技术更新上线为准。乙方授权甲方自每笔销售款中可直接扣除相应的交易服务费，不予退还。</div></div>'
        ]
      },
      {},
      {
        title: '图片上传失败原因',
        content: '<div style="text-align: left; font-size: 11px;"><div>1、建议切换网络环境</div><div>2、图片过大，超过2M，建议不选择原图</div></div>'
      },
    ],
    form: {}, // 表单数据
    focusField: '', // 定位字段
    btn: '', // 提交表单按钮
    isAdd: false, // 是否为添加活动（包含复制添加）
    isAddNew: false, // 是否为添加活动（不包含复制添加）
    showModal: false, // 是否显示遮罩层
    showCrop: false, // 是否显示裁剪图片

    tempOptListId: 0,
    tempOptListName: '',
    showOptList: false, // 显示列表选项
    showOptListField: '', // 显示列表选项字段名
    musicList: [],
    playMusic: {}, // 试听音乐

    tempImg: '', // 裁剪图片前图片的临时地址
    // 字段间关系
    refs: {
      // 商品类型
      // 物流方式
      genre: [{
        field: {
          'freight_id': 0
        },
        rm: [1],
        ad: [0, 3]
      }],
      // 全国统一运费
      freight_id: [{
        field: {
          'unite_freight': ''
        },
        rm: [0, 1],
        ad: [2]
      }],
      // 使用有效期
      is_time: [{
        field: {
          'use_start_time': '',
          'use_end_time': ''
        },
        rm: [0],
        ad: [1]
      }],
      // 预约设置
      is_subscribe: [{
        field: {
          'subscribe': ''
        },
        rm: [0],
        ad: [1]
      }],
      // 员工提成
      is_unit: [
        {
          cond: {
            is_group: 1,
          },
          field:{
            'group_each_unit': '',
            'each_unit': ''
          },
          rm: [0],
          ad: [1]
        },
        {
          cond: {
            is_group: [4, 6],
          },
          field: [
            {
              'each_unit': ''
            }
          ],
          rm: [0],
          ad: [1]
        }
      ],
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 初始化时间数组
    let date = new Date()
    let years = [];
    for (var i = date.getFullYear(); i <= date.getFullYear() + 5; i++) {
      years.push(i)
    }
    let arr = A.TimeFunc.GetDatetimeArr();
    this.setData({
      years: years,
      months: arr[1],
      days: arr[2],
      hours: arr[3],
      minutes: arr[4],
      seconds: arr[5]
    });
    // 参数
    this.setData({
      listIdx: options.index || -1,
      editType: options.editType || 0,
      tagId: options.tag || 0
    });
    // 编辑
    if (options.id) {
      if (options.editType) {
        wx.setNavigationBarTitle({
          title: '商品添加'
        });
        this.setData({
          isAdd: true
        });
      } else {
        wx.setNavigationBarTitle({
          title: '商品编辑'
        })
      }
      // 获取活动数据
      this.getActData(options.actType, options.id);
    } else {
      wx.setNavigationBarTitle({
        title: '商品添加'
      });
      this.setData({
        isAdd: true,
        isAddNew: true
      });
      if (options.actType) {
        let form = {
          store_id: A.DB.user.sid,
          goods_id: options.id || 0, // 活动id
          is_group: options.actType, // 活动类型
          is_sale: 1, // 是否上架
          genre: 1, // 物流方式
          // freight_id: 0, // 设置运费
          is_time: 0, // 使用有效期
          is_subscribe: 0, // 预约设置
          is_unit: 0, // 员工提成设置
          goods_slide: [], // 轮播图
          goods_detail_imgs: [], //  详情图
          is_show_sales: 1 // 显示销量（已废除字段）
        };
        if (options.actType == 1) { // 拼团立减
          if (wx.getStorageSync('activityPtlj')) {
            form = wx.getStorageSync('activityPtlj')
          } else {
            Object.assign(form, {
              joinnum: '2' // 参团人数
            });
          }
        } else if (options.actType == 3) { // 多人拼团
          if (wx.getStorageSync('activityDrpt')) {
            form = wx.getStorageSync('activityDrpt')
          } else {
            Object.assign(form, {
              valid_period: 3, // 成团有效时间
              is_virtual_group: 0, // 虚拟成团
              is_open_together: 1 // 凑团设置
            });
          }
        } else if (options.actType == 4) { // 限时专享
          if (wx.getStorageSync('activityXszx')) {
            form = wx.getStorageSync('activityXszx')
          } else {
            Object.assign(form, {
              is_exclusive: 0, // 商品类型
              card_is_time: 0, // 赠送专享卡使用有效期
              card_detail_imgs: [] // 赠送专享卡详情图
            });
          }
        } else if (options.actType == 6) {
          if (wx.getStorageSync('activityKj')) {
            form = wx.getStorageSync('activityKj')
          } else {
            Object.assign(form, {
              joinnum: 10, // 砍价人数
              is_bottom: 0, // 必须底价支付
            });
          }
        }
        form.resource = 0
        this.setData({
          form: form
        });
      }
    }
    // 获取音乐列表
    if (options.actType == 6) {
      this.getMusicList();
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let form = this.data.form;
    // 关闭分享功能
    wx.hideShareMenu();
    // 获取玩法、默认运费模板数据
    this.getMoreInfo();
    // 获取商家版本
    let storeInfo = wx.getStorageSync('storeInfo');
    if (storeInfo && storeInfo.version.toString()) {
      this.setData({
        version: storeInfo.version
      });
    } else {
      this.getVersion();
    }
  },
  /**
   * 生命周期函数—监听页面卸载
   */
  onUnload: function() {
    const _that = this,
      _d = _that.data;
    if (_d.isAddNew) {
      let field = _d.form.is_group == 1 ? 'activityPtlj' : _d.form.is_group == 3 ? 'activityDrpt' : _d.form.is_group == 4 ? 'activityXszx' : _d.form.is_group == 6 ? 'activityKj' : ''
      if (field) {
        wx.setStorageSync(field, _d.form)
      }
    }
  },
  // 取消自定义按钮加载中状态
  hideLoading: function() {
    this.data.btn.hideLoading();
  },
  // 设置showModal
  setShowModalTrue: function() {
    this.setData({
      showModal: true
    });
  },
  // 设置showModal
  setShowModalFalse: function() {
    this.setData({
      showModal: false
    });
  },

  // 获取活动数据
  getActData: function(type, id) {
    const _that = this,
      _d = _that.data;
    let url = '',
      data = {};
    if (_d.editType == 1) {
      url = '/WeChatAppsCs/marketing/model';
      data = {
        model_id: id
      }
    } else {
      url = type == 6 ? '/WeChatAppsCs/bargain/activityEdit' : '/WeChatAppsCs/StoreGoods/get_goods';
      data = {
        goods_id: id
      }
    }
    wx.showLoading({ title: '加载中...' })
    A.updata.getGoodsInfo(url, data).then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        let form = Object.assign({}, res.goods_info, res.card_info)
        form.model_id = res.model_id;
        if (_d.editType == 1) {
          form.tag_industry_id = _d.tagId;
        }
        if (_d.isAdd){
          form.resource = 1;
        }
        _that.setData({ form: form })
      } else {
        _that.setShowModalTrue();
        A.showTipModal(res.info || '数据获取失败', _that.goBack);
      }
    }, err => {})
  },
  // 获取提玩法、默认运费模板数据
  getMoreInfo: function() {
    const _that = this,
      _d = _that.data;
    A.updata.getRuleDetail().then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        _that.setData({
          is_account: res.info.is_account,
          info: res.info,
          'instructions[1]': {
            title: '',
            content: '<div style="text-align: left; font-size: 11px;"><div style="padding: 10px 0 5px; color: #e60012;">【成团有效时间】</div><div>' + res.info.method_t + '</div><div style="padding: 10px 0 5px; color: #e60012;">【凑团设置】</div><div>' + res.info.method_c + '</div><div style="padding: 10px 0 5px; color: #e60012;">【模拟成团】</div><div>' + res.info.method_m + '</div></div>'
          }
        });
      }
    }, err => {});
  },
  // 获取商家版本
  getVersion: function() {
    const _that = this,
      _d = _that.data;
    A.updata.getStoreIdenInfo().then(res => {
      if (res.status == A.STATE.STATUS.OK) {
        _that.setData({
          version: res.info.auth_info.version
        });
      }
    }, err => {})
  },

  // 查看设置相关说明
  showInstruction: function(e) {
    const _that = this,
      _d = _that.data;
    let idx = e.currentTarget.dataset.tip;
    let content = _d.instructions[idx].content;
    // 商家版本不同，提示内容不同
    if (idx == 0) {
      content = _d.version == 2 ? content[1] : content[0]
    }
    _that.setShowModalTrue();
    A.showModal({
      title: _d.instructions[idx].title || '温馨提示',
      contType: 2,
      content: content,
      success: _that.setShowModalFalse,
      showCancel: false
    });
  },
  // 查看团购价格详情
  getGroupPrice: function() {
    const _that = this,
      _d = _that.data;
    let form = this.data.form;
    let price1 = form.goods_price,
      reduce = form.reduce_price;
    if (!price1 || !reduce) {
      _that.setShowModalTrue();
      A.showTipModal('请输入团长价和递减金额！', _that.setShowModalFalse);
    } else {
      let groupPriceArr = [{
        text: '团长价',
        value: price1
      }]
      for (var i = 1, len = form.joinnum; i < len; i++) {
        if (price1 > reduce * i * 2) {
          groupPriceArr.push({
            text: (i + 1) + '人团价',
            value: (price1 - reduce * i).toFixed(2)
          });
        }
      }
      this.setData({
        showGroupPrice: true,
        groupPriceArr: groupPriceArr
      });
    }
  },

  /**
   * 表单事件
   */
  // 表单单选选择事件
  formSelect: function(e) {
    // 可选择
    if (!e.currentTarget.dataset.disabled) {
      const _that = this,
        _d = _that.data;
      let dataset = e.currentTarget.dataset;
      const refs = _d.refs;

      let form = Object.assign({}, _d.form);
      if (refs[dataset.field]){
        const ref = refs[dataset.field]
        ref.forEach((item, key) => {
          if (item.cond) {
            let cond = '';
            for(let i in item.cond){
              cond += '_form.' + i + '=' + item.cond[i] + '&';
            }
            cond.substr(0, cond.length - 1);
            if([cond]){
              if (item.rm.includes(Number(dataset.value))){
                let keys = Object.keys(item.field);
                for (let i in item.field){
                  delete form[i]
                }
              } else if (item.ad.includes(Number(dataset.value))){
                Object.assign(form, item.field);
              }
            }
          } else {
            if (item.rm.includes(Number(dataset.value))) {
              let keys = Object.keys(item.field);
              for (let i in item.field) {
                delete form[i]
              }
            } else if (item.ad.includes(Number(dataset.value))) {
              Object.assign(form, item.field);
            }
          }
        });
      }

      // 员工提成
      if (form.is_group == 1 && dataset.field == 'is_unit' && dataset.value == '1') {
        let price = Number(form.goods_price) - Number(form.reduce_price) * (Number(form.joinnum) - 1)
        if (price < 0.1) {
          _that.setShowModalTrue();
          A.showTipModal('返现后低于0.1元无法设置员工提成', _that.setShowModalFalse)
          return;
        }
      } else if (form.is_group == 4 && dataset.field == 'is_unit' && dataset.value == '1' && Number(form.secs_price) < 0.1) {
        _that.setShowModalTrue();
        A.showTipModal('购买价格低于0.1元时无法设置员工提成', _that.setShowModalFalse)
        return;
      }

      form[dataset.field] = dataset.value;
      _that.setData({
        form: form
      });
      // 商品类型
      if (_d.form.is_exclusive == 1) {
        _that.setData({
          goodsType: '专享卡'
        });
      } else {
        _that.setData({
          goodsType: '商品'
        });
      }
    }
  },
  // 表单内容输入事件
  formInput: function(e) {
    let dataField = 'form.' + e.currentTarget.dataset.field;
    let res = A.formInput(e);
    if(res !== false){
      this.setData({
        [dataField]: res
      });
    }
  },
  // 表单内容输入结束事件
  endFormInput: function (e) {
    // const ds = e.currentTarget.dataset;
    // let len = A.getChaLength(e.detail.value);
    // if (ds.minlen > len) {
    //     this.formValTip({ tip: '最小长度为' + ds.minlen + '个字符', field: ds.field }, true);
    // }
  },
  // 活动详情获取焦点范围扩大
  focusTextarea: function(e) {
    let field = e.currentTarget.dataset.field;
    this.setData({
      focusField: field
    })
  },
  // 表单列表选择事件
  formListSelect: function(e) {
    let field = e.currentTarget.dataset.field;
    let value = e.currentTarget.dataset.value;
    if (this.data.showOptListField == field) {
      this.setData({
        showOptList: false,
        showOptListField: '',
        tempOptListId: 0,
        tempOptListName: '',
        playMusic: {}
      });
    } else {
      this.setData({
        showOptList: true,
        showOptListField: field,
        tempOptListId: this.data.form[field] || 0,
        tempOptListName: this.data.form[value] || '',
        playMusic: {}
      });
    }
  },
  // 表单列表项选择事件
  formListItemSelect: function(e) {
    if (audio) {
      audio.destroy();
    }
    this.setData({
      tempOptListId: e.currentTarget.dataset.id,
      tempOptListName: e.currentTarget.dataset.name,
      playMusic: {}
    });
  },
  // 取消表单列表选择事件
  cancelFormListSelect: function() {
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
  certainFormListSelect: function(e) {
    const _that = this,
      _d = _that.data;
    _d.form.music_id = _d.tempOptListId;
    _d.form.music_name = _d.tempOptListName;
    if (audio) {
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

  /**
   * 时间选择
   */
  // 打开时间选择器
  showDatetimePicker: function(e) {
    this.setShowModalTrue();
    this.setData({
      showDatetimePicker: true,
      picker: {
        field: e.currentTarget.dataset.field,
        name: e.currentTarget.dataset.name
      }
    });
  },
  // 取消
  cancelDatetime: function() {
    this.setShowModalFalse();
    this.setData({
      showDatetimePicker: false,
      picker: {}
    });
  },
  // 确定
  confirmDatetime: function(e) {
    const _that = this,
      _d = _that.data;
    this.setShowModalFalse();
    let field = 'form.' + _d.picker.field;
    let v = e.detail;
    _that.setData({
      [field]: _d.years[v.date[0]] + '-' + _d.months[v.date[1]] + '-' + _d.days[v.date[2]] + ' ' + _d.hours[v.time[0]] + ':' + _d.minutes[v.time[1]] + ':' + _d.seconds[v.time[2]],
      picker: {}
    });
  },

  /**
   * 图片
   */
  // 上传图片
  selectImg: function(e) {
    const _that = this,
      _d = _that.data;
    let field = e.currentTarget.dataset.field;
    let type = e.currentTarget.dataset.type;
    let cut = e.currentTarget.dataset.cut;
    let data = {};
    if(!cut){
      let count = _d.form[field] ? _d.form[field].length : 0;
      data = { count: _d.imgMaxnum[field] - count }
    }
    A.chooseMultiImage(data).then(res => {
      let oversize = false;
      for (let i = 0, len = res.length; i < len; i++) {
        if (res[i].size > 2097152) {
          oversize = true;
          continue;
        }
        if (cut) {
          _that.setData({
            tempImg: res[i],
            showCrop: true
          });
           _that.setShowModalTrue();
          _that.selectComponent('#cropper').showCropper();
        } else {
          _that.uploadImg(field, type, res[i]);
        }
      }
      if (oversize) {
        _that.setShowModalTrue();
        A.showTipModal('有图片已超过2MB,您可以选择压缩图片以后重新上传', _that.setShowModalFalse);
      }
    }, err => {})
  },

  // 保存裁剪图片
  uploadCutImg: function(e) {
    this.uploadImg('goods_slide', 0, e.detail)
    this.hideCropper();
    this.selectComponent('#cropper').hideCropper();
     this.setShowModalFalse();
  },
  // 隐藏裁剪图片
  hideCropper: function() {
    this.setData({
      showCrop: false
    })
  },
  // 上传图片
  uploadImg: function(field, type, imgUrl) {
    const _that = this,
      _d = _that.data;
    A.uploadFile1({
      url: '/WeChatAppsCs/StoreGoods/upload_goods_image',
      filePath: imgUrl,
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
        _that.setData({
          [dataField]: imgs
        });
      }
    }, err1 => {
      _that.setShowModalTrue();
      A.showTipModal(err1.info || '图片上传失败', _that.setShowModalFalse)
    })
  },
  // 删除图片
  delImg: function(e) {
    const _that = this,
      _d = _that.data;
    let index = e.currentTarget.dataset.index;
    let field = e.currentTarget.dataset.field;
    let type = e.currentTarget.dataset.type;
    let tip = type == 0 ? '是否删除这张轮播图' : '是否删除这张详情图';
    _that.setShowModalTrue();
    A.showBaseModal(tip, function() {
      let dataField = 'form.' + field;
      let imgs = A.ArrFunc.RemoveByIndex(_d.form[field], index);
      _that.setData({
        [dataField]: imgs
      });
    }, null, _that.setShowModalFalse)
  },
  // 移动图片
  moveUpImg: function(e) {
    const _that = this,
      _d = _that.data;
    let index = e.currentTarget.dataset.index;
    let field = e.currentTarget.dataset.field;
    let dataField = 'form.' + field;
    let imgs = A.ArrFunc.ReverseByIndex(_d.form[field], index - 1, index);
    _that.setData({
      [dataField]: imgs
    });
  },
  moveDownImg: function(e) {
    const _that = this,
      _d = _that.data;
    let index = e.currentTarget.dataset.index;
    let field = e.currentTarget.dataset.field;
    let dataField = 'form.' + field;
    let imgs = A.ArrFunc.ReverseByIndex(_d.form[field], index, index + 1);
    _that.setData({
      [dataField]: imgs
    });
  },
  // 预览图片
  previewImg: function(e) {
    let url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },

  /**
   * 背景音乐
   */
  // 获取音乐列表
  getMusicList: function() {
    const _that = this,
      _d = _that.data;
    wx.showLoading({
      title: '加载中'
    })
    A.updata.getMusicList().then(res => {
      wx.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        _that.setData({
          musicList: res.data
        })
      } else {
        _that.setShowModalTrue();
        A.showTipModal(res.info || '数据获取失败', _that.goBack);
      }
    }, err => {})
  },
  // 试听
  playMusic: function(e) {
    let item = e.currentTarget.dataset.item
    if (audio) {
      audio.destroy();
    }
    this.setData({
      playMusic: item
    });
    audio = wx.createInnerAudioContext();
    audio.src = item.music_url;
    audio.play();
  },
  // 停止播放
  pauseMusic: function() {
    audio.destroy();
    this.setData({
      playMusic: {}
    });
  },


  /**
   * 提交表单
   */
  // 表单验证提示操作
  formValTip: function(res, noHideLoading){
    const _that = this;
    _that.setShowModalTrue();
    A.showTipModal(res.tip, function () {
      _that.setShowModalFalse();
      _that.setData({
        focusField: res.field
      });
      if (!noHideLoading) { 
        _that.hideLoading();
      }
    });
  },
  // 提交表单
  submitForm: function() {
    const _that = this,
      _d = _that.data,
      _form = _d.form;
    _that.setData({
      btn: _that.selectComponent('#submit_btn')
    });
    if (_form.is_group == 1) { // 拼团立减
      let valReg = A.validateFrom({
        goods_price: _form.goods_price, // 团长价
        reduce_price: _form.reduce_price // 递减金额
      }, {
        goods_price: {
          exp: ["empty1", "price1"],
          err: {
            field: 'goods_price',
            tip: "请输入正确格式的团长价"
          }
        },
        reduce_price: {
          exp: ["empty1", "price1"],
          err: {
            field: 'reduce_price',
            tip: "请输入正确格式的递减金额"
          }
        }
      });
      if(valReg !== true){
        _that.formValTip(valReg);
        return;
      }
      if (Number(_form.goods_price) <= Number(_form.reduce_price)) {
        _that.formValTip({ tip: '团长价应高于递减金额', field: 'reduce_price' });
        return;
      }
    } else if (_form.is_group == 3) { // 多人拼团
      let valReg = A.validateFrom({
        secs_price: _form.secs_price, // 拼团价
        goods_price: _form.goods_price, // 原价
        joinnum: _form.joinnum // 参团人数
      }, {
        secs_price: {
          exp: ["empty1", "price1"],
          err: {
            field: 'secs_price',
            tip: "请输入正确格式的拼团价"
          }
        },
        goods_price: {
          exp: ["empty1", "price1"],
          err: {
            field: 'goods_price',
            tip: "请输入正确格式的原价"
          }
        },
        joinnum: {
          exp: ["empty1", /^([2-9]+)|([1-9][0-9]+)$/],
          err: {
            field: 'joinnum',
            tip: "请输入正确格式的参团人数"
          }
        }
      });
      if (valReg !== true) {
        _that.formValTip(valReg);
        return;
      }
      if (Number(_form.goods_price) < Number(_form.secs_price)) {
        _that.formValTip({ tip: '原价应不低于拼团价', field: 'goods_price' });
        return;
      }
    } else if (_form.is_group == 4) { // 限时专享
      let valReg = A.validateFrom({
        secs_price: _form.secs_price, // 优惠价
        goods_price: _form.goods_price // 原价
      }, {
        secs_price: {
          exp: ["empty1", "price1"],
          err: {
            field: 'secs_price',
            tip: "请输入正确格式的优惠价"
          }
        },
        goods_price: {
          exp: ["empty1", "price1"],
          err: {
            field: 'goods_price',
            tip: "请输入正确格式的原价"
          }
        }
      });
      if (valReg !== true) {
        _that.formValTip(valReg);
        return;
      }
      if (Number(_form.goods_price) < Number(_form.secs_price)) {
        _that.formValTip({ tip: '原价应不低于优惠价', field: 'goods_price' });
        return;
      }
      if (_form.is_exclusive == 1) { // 商品类型：专享卡
        let valReg = A.validateFrom({
          card_use_num: _form.card_use_num // 专享卡使用次数
        }, {
          card_use_num: {
            exp: ["empty1", "positiveInt"],
            err: {
              field: 'card_use_num',
              tip: "请输入正确格式的专享卡使用次数"
            }
          }
        });
        if (valReg !== true) {
          _that.formValTip(valReg);
          return;
        }
      }
    } else if (_form.is_group == 6) { // 砍价
      let valReg = A.validateFrom({
        secs_price: _form.secs_price, // 底价
        goods_price: _form.goods_price // 原价
      }, {
        secs_price: {
          exp: ["empty1", "price"],
          err: {
            field: 'secs_price',
            tip: "请输入正确格式的底价"
          }
        },
        goods_price: {
          exp: ["empty1", "price1"],
          err: {
            field: 'goods_price',
            tip: "请输入正确格式的原价"
          }
        }
      });
      if (valReg !== true) {
        _that.formValTip(valReg);
        return;
      }
      if (Number(_form.goods_price) < Number(_form.secs_price)) {
        _that.formValTip({ tip: '原价应不低于底价', field: 'goods_price' });
        return;
      }
    }
    // 表单公共数据验证
    let valReg = A.validateFrom({
      restriction: _form.restriction, // 个人限购
      start_time: _form.start_time, // 活动开始时间
      end_time: _form.end_time // 活动结束时间
    }, {
      restriction: {
        exp: ["empty1", "nonnegativeInt"],
        err: {
          field: 'restriction',
          tip: "请输入正确格式的个人限购数量"
        }
      },
      start_time: {
        exp: "empty1",
        err: {
          field: 'start_time',
          tip: "请选择活动开始时间"
        }
      },
      end_time: {
        exp: "empty1",
        err: {
          field: 'end_time',
          tip: "请选择活动结束时间"
        }
      }
    });
    if (valReg !== true) {
      _that.formValTip(valReg);
      return;
    }

    if (new Date(_form.start_time.replace(/-/g, '/')) >= new Date(_form.end_time.replace(/-/g, '/'))) {
      _that.formValTip({ tip: '活动开始时间应早于结束时间', field: 'end_time' });
      return;
    }
    if (_form.genre != 1) { // 送货上门或两者皆可
      if (_form.freight_id == 2) {
        let valReg1 = A.validateFrom({
          unite_freight: _form.unite_freight
        }, {
          unite_freight: {
            exp: ["empty1", "price1"],
            err: {
              field: 'unite_freight',
              tip: "请输入正确格式的运费金额"
            }
          }
        });
        if (valReg1 !== true) {
          _that.formValTip(valReg1);
          return;
        }
      }
    } else { // 门店自提
      // 使用有效期限时间
      if (_form.is_time == 1) {
        let valReg = A.validateFrom({
          use_start_time: _form.use_start_time,
          use_end_time: _form.use_end_time
        }, {
          use_start_time: {
            exp: "empty1",
            err: {
              field: 'use_start_time',
              tip: "请选择有效期开始时间"
            }
          },
          use_end_time: {
            exp: "empty1",
            err: {
              field: 'use_end_time',
              tip: "请选择有效期结束时间"
            }
          }
        });
        if (valReg !== true) {
          _that.formValTip(valReg);
          return;
        }
        if (new Date(_form.use_start_time.replace(/-/g, '/')) >= new Date(_form.use_end_time.replace(/-/g, '/'))) {
          _that.formValTip({ tip: '有效期开始时间应早于结束时间', field: 'use_end_time' });
          return;
        } else if (new Date(_form.use_end_time.replace(/-/g, '/')).getTime() - new Date(_form.end_time.replace(/-/g, '/')).getTime() < 86400000){
          _that.formValTip({ tip: '使用有效期结束时间比活动结束时间至少多1天', field: 'use_end_time' });
          return;
        }
      }
      // 需要预约
      if (_form.is_subscribe == 1) {
        let valReg = A.validateFrom({
          subscribe: _form.subscribe
        }, {
          subscribe: {
            exp: "empty1",
            err: {
              field: 'subscribe',
              tip: "请输入预约要求"
            }
          }
        });
        if (valReg !== true) {
          _that.formValTip(valReg);
          return;
        }
      }
    }

    // 商品/专享卡信息
    let valReg1 = A.validateFrom({
      goods_name: _form.goods_name, // 名称
      goods_detail: _form.goods_detail, // 详情
    }, {
      goods_name: {
        exp: /^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d，,。.；;？\?：:、“”\"‘’'><\+\-\*\/／=（）\(\)\{\}【】\[\]%#\!！\|&￥\$]{2,30})$/,
        err: {
          field: 'goods_name',
          tip: "请输入正确格式的" + this.data.goodsType + "名称（2-30个字）"
        }
      },
      goods_detail: {
        exp: /^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d，,。.；;？\?：:、“”\"‘’'><\+\-\*\/／=（）\(\)\{\}【】\[\]%#\!！\|&￥\$\s]{2,15000})$/,
        err: {
          field: 'goods_detail',
          tip: "请输入正确格式的" + this.data.goodsType + "详情（2-15000个字）"
        }
      }
    });
    if (valReg1 !== true) {
      _that.formValTip(valReg1);
      return;
    }
    // 轮播图、详情图
    if (_form.goods_slide.length == 0 || _form.goods_detail_imgs.length == 0) {
      _that.formValTip({ tip: '请至少上传一张轮播图与详情图', field: 'goods_slide' });
      return;
    }
    let valReg2 = A.validateFrom({
      inventory: _form.inventory, // 库存数量
      sort: _form.sort // 排序设置
    }, {
      inventory: {
        exp: ["empty1", "nonnegativeInt"],
        err: {
          field: 'inventory',
          tip: "请输入正确格式的库存数量"
        }
      },
      sort: {
        exp: ["empty1", "int"],
        err: {
          field: 'sort',
          tip: "请输入正确格式的排序号"
        }
      }
    });
    if (valReg2 !== true) {
      _that.formValTip(valReg2);
      return;
    }

    // 拼团立减、砍价：设置提成
    if (_form.is_group == 1 && _form.is_unit == 1) {
      let valReg = A.validateFrom({
        group_each_unit: _form.group_each_unit, // 团长价
        each_unit: _form.each_unit // 递减金额
      }, {
        group_each_unit: {
          exp: ["empty1", "price1"],
          err: {
            field: 'group_each_unit',
            tip: "请输入正确格式的团长单提成"
          }
        },
        each_unit: {
          exp: ["empty1", "price1"],
          err: {
            field: 'each_unit',
            tip: "请输入正确格式的参团单提成"
          }
        }
      });
      if (valReg !== true) {
        _that.formValTip(valReg);
        return;
      }
    }

    // 限时专享：设置提成 
    if ((_form.is_group == 4 || _form.is_group == 6) && _form.is_unit == 1) {
      let valReg = A.validateFrom({
        each_unit: _form.each_unit // 每笔订单
      }, {
        each_unit: {
          exp: ["empty1", "price"],
          err: {
            field: 'each_unit',
            tip: "请输入正确格式的每笔订单提成"
          }
        }
      });
      if (valReg !== true) {
        _that.formValTip(valReg);
        return;
      }
    }

    if(_form.is_group == 6){
      // 砍价：背景音乐
      let valReg = A.validateFrom({
        music_id: _form.music_id, // 背景音乐
      }, {
        music_id: {
          exp: "empty",
          err: {
            field: 'music_id',
            tip: "请选择背景音乐"
          }
        },
      });
      if (valReg !== true) {
        _that.formValTip(valReg);
        return;
      }
    }
    
    // 限时专享-商品+专享卡：专享卡信息
    if (_form.is_group == 4 && _form.is_exclusive == 2) { // 商品类型：商品+专享卡
      let valReg = A.validateFrom({
        card_name: _form.card_name, // 专享卡名称
        card_price: _form.card_price, // 专享卡价值
        card_use_num: _form.card_use_num, // 专享卡使用次数
        card_detail: _form.card_detail // 专享卡详情
      }, {
        card_name: {
          exp: /^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d，,。.；;？\?：:、“”\"‘’'><\+\-\*\/／=（）\(\)\{\}【】\[\]%#\!！\|&￥\$]{2,30})$/,
          err: {
            field: 'card_name',
            tip: "请输入正确格式的专享卡名称（2-30个字）"
          }
        },
        card_price: {
          exp: ["empty1", "price1"],
          err: {
            field: 'card_price',
            tip: "请输入正确格式的专享卡价值"
          }
        },
        card_use_num: {
          exp: ["empty1", "positiveInt"],
          err: {
            field: 'card_use_num',
            tip: "请输入正确格式的专享卡使用次数"
          }
        },
        card_detail: {
          exp: /^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d，,。.；;？\?：:、“”\"‘’'><\+\-\*\/／=（）\(\)\{\}【】\[\]%#\!！\|&￥\$\s]{2,15000})$/,
          err: {
            field: 'card_detail',
            tip: "请输入正确格式的专享卡详情（2-15000个字）"
          }
        }
      });
      if (valReg !== true) {
        _that.formValTip(valReg);
        return;
      }
      // 使用有效期限时间
      if (_form.card_is_time == 1) {
        let valReg = A.validateFrom({
          card_use_start_time: _form.card_use_start_time,
          card_use_end_time: _form.card_use_end_time
        }, {
          card_use_start_time: {
            exp: "empty1",
            err: {
              field: 'card_use_start_time',
              tip: "请选择专享卡有效期开始时间"
            }
          },
          card_use_end_time: {
            exp: "empty1",
            err: {
              field: 'card_use_end_time',
              tip: "请选择专享卡有效期结束时间"
            }
          }
        });
        if (valReg !== true) {
          _that.formValTip(valReg);
          return;
        }
        if (new Date(_form.card_use_start_time.replace(/-/g, '/')) >= new Date(_form.card_use_end_time.replace(/-/g, '/'))) {
          _that.formValTip({ tip: '专享卡有效期开始时间应早于结束时间', field: 'card_use_end_time' });
          return;
        }
      }
      // 详情图
      if (_form.card_detail_imgs.length == 0) {
        _that.formValTip({ tip: '至少上传一张专享卡详情图', field: 'card_detail_imgs' });
        return;
      }
    }
    let url = _form.is_group == 6 ?
                _form.goods_id ? '/WeChatAppsCs/bargain/activityEditSave' : '/WeChatAppsCs/bargain/goods/add'
              :
                _form.goods_id ?
                  _that.data.editType == 1 ? '/WeChatAppsCs/marketing/editModel' : '/WeChatAppsCs/StoreGoods/edit_goods' :
                '/WeChatAppsCs/StoreGoods/add_goods'
    A.updata.submitInfo(url, _form).then(res => {
      _that.hideLoading();
      if (res.status == A.STATE.STATUS.OK) {
        this.setData({
          isAddNew: false
        });
        if (_form.is_group == 1) {
          wx.removeStorageSync('activityPtlj')
        } else if (_form.is_group == 3) {
          wx.removeStorageSync('activityDrpt')
        } else if (_form.is_group == 4) {
          wx.removeStorageSync('activityXszx')
        } else if (_form.is_group == 6) {
          wx.removeStorageSync('activityKj')
        }
        // 更新列表页数据
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        let list = prevPage.data.list;
        list[_d.listIdx] = Object.assign(list[_d.listIdx], {
          genre_str: _form.genre == 1 ? '门店自提' : _form.genre == 0 ? '送货上门' : _form.genre == 3 ? '送货和自取皆可' : '',
          price_str: _form.is_group == 1 ? _form.goods_price : _form.secs_price,
          inventory: _form.inventory,
          sale_str: _form.is_sale == 1 ? '是' : '否',
          sort: _form.sort
        })
        prevPage.setData({ list: list })//设置数据

        _that.setShowModalTrue();
        A.showTipModal(res.info || '操作成功！', _that.goBack);
      } else {
        _that.setShowModalTrue();
        A.showTipModal(res.info || '操作失败！', _that.setShowModalFalse)
      }
    }, err => {
      _that.hideLoading()
    });
  }
}))