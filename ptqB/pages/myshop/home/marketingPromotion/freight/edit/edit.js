var util = require('../../../../../../utils/util.js')
var https = require('../../../../../../utils/http.js').http;
var unionid = wx.getStorageSync('thisCode');
var http = require('../../../../../../utils/http.js');
const A = getApp();
Page(A.assignPage({

  data: {
    industry:false,
    twos:[],
    listSty:[],
    listSty1:[],
    allFlageArr:["1"],
    baseinput:[],
    listCityArr:[],
    allear:[],
    allfirst:[],
    allfirstPrice:[],
    allfirstAdd:[],
    allfirstPriceAdd:[],
    cityId:[],
    cityName:[],
    AllcityId:[],
    clickF:false,
    thatId:0,
    imgUrl:http.imgUrl,
    focusField: ''
  },

  onLoad(options) {
    var that = this;
    var thatId = options.id;
    var unionid = wx.getStorageSync('thisCode');
    if(options.navF){
      that.setData({navF:options.navF})
    }
    if(thatId){
      that.setData({thatId:thatId})
      http._post1('StoreFreight/getinfo_freight',{
        unionid:unionid,
        id:thatId,
      },res=>{
        var data = res.data;
        var info = data.info;
        if(data.status==1){
          var allFlageArr = [];
          var baseinput = [info.name,info.full_reduce_price,info.first_num,info.price,info.add_num,info.add_price];
          var listCityArr = [];
          var allear = [];
          var allfirst = [];
          var allfirstPrice = [];
          var allfirstAdd = [];
          var allfirstPriceAdd = [];
          var AllcityId = [];
          allFlageArr[0] = info.is_start==1?"1":"";
          allFlageArr[1] = info.is_full_reduce==1?"":"1";
          for(let i in info.freight_list){
            allear[i] = info.freight_list[i].delivery_city_name;
            AllcityId[i] = (info.freight_list[i].delivery_city).split(",");
            allfirst[i] = info.freight_list[i].delivery_first_num;
            allfirstPrice[i] = info.freight_list[i].delivery_price;
            allfirstAdd[i] = info.freight_list[i].delivery_add_num;
            allfirstPriceAdd[i] = info.freight_list[i].delivery_add_price;
          }
          that.setData({
            allFlageArr:allFlageArr,
            baseinput:baseinput,
            allfirstPriceAdd:allfirstPriceAdd,
            allfirstAdd:allfirstAdd,
            allfirstPrice:allfirstPrice,
            allfirst:allfirst,
            AllcityId:AllcityId,
            allear:allear,
            clickF:true
          })
        }else{
          http.showModal(data.info,false,()=>{})
        }
      },res=>{})
    }

  },

  // 点击选择两级分类
  industryBtn(){
    var that = this;
    that.setData({
      industry:true,
    })
  },
  hideAll(){
    this.setData({
      industry:false,
    })
  },

  // 一级选择框循环输出
  searchBtn(e){
    var that = this;
    
  },
  searchBtn1(e){
    var that = this;
    var listCityArr = that.data.listCityArr;
    var listSty = that.data.listSty;
    var id = http.dataIndex(e)[1];
    var meun = {};
    listCityArr.find(e=>{
      e.info.find(v=>{
        if(v.id == id){
          meun = v
        }
      })
    })
    if(meun.sel){
      meun.sel=false
    }else{
      meun.sel=true
    }
    that.setData({listCityArr:listCityArr})
  },
  // 全部的选择模块
  allFlagBtn(e){
    var that = this;
    var index = http.dataIndex(e)[0];
    var allFlageArr = that.data.allFlageArr;
    allFlageArr[index]?allFlageArr[index]="":allFlageArr[index]="1";
    that.setData({
      allFlageArr:allFlageArr
    })
  },
  // 监听表单输入事件
  formInput(e){
    const _that = this;
    let baseinput = that.data.baseinput
    let newFormData = http.inputArr(baseinput, e)
    that.setData({
      baseinput: newFormData
    })
  },
  // 监听表单失焦事件
  endFormInput(e){
    // const _that = this;
    // if (!http.endInputArr(e)) {
    //   _that.formValTip({ tip: '最小长度为' + e.currentTarget.dataset.minlen + '个字符', field: e.currentTarget.dataset.field }, true);
    //   return;
    // }
  },
  // 获取所有的基础输入框
  baseInput(e){
    var that = this;
    let indexArr = ['1', '3', '5'];
    var index = http.dataIndex(e)[0];
    var val = e.detail.value;
    var baseinput = that.data.baseinput;
    if(indexArr.indexOf(index) != -1){
      if (Number(val) || Number(val) === 0){
        val = Number(val).toFixed(2);
      }else{
        http.showModal('请输入正确的金额', false, function () {
          val = 0;
          baseinput[index] = val;
          that.setData({ baseinput: baseinput })
          if (baseinput[0]) {
            that.setData({ clickF: true })
          }
          return;
        })
      }
    }
    baseinput[index] = val;
    that.setData({baseinput:baseinput})
    if (baseinput[0]) {
        that.setData({ clickF: true })
    }
  },
  // 区域运费设置
  regSet(){
    var that = this;
    var unionid = wx.getStorageSync('thisCode');
    that.setData({ industry: true });
    wx.showLoading({
      title: '加载中...',
      mask:true,
    })
    http._post1('StoreFreight/province_city_list', { id: 0, unionid: unionid }, res => {
      wx.hideLoading();
      var data = res.data;
      if(data.status==1){
        that.setData({
          perArr:data.info
        })
      }else{

      }
    }, res => { wx.hideLoading();})
  },
  // 点击确认
  confirmBtn(e){
    var that = this;
    var listCityArr = that.data.listCityArr;
    var listSty = that.data.listSty;
    var cityId = [];
    var AllcityId = that.data.AllcityId;
    var cityName = [];
    var allear = that.data.allear;
    for(let i in listCityArr){
      for(let j in listCityArr[i].info){
        if(!listCityArr[i].info[j].sel){
          cityId.push(listCityArr[i].info[j].id);
          cityName.push(listCityArr[i].info[j].name)
        }
      }
    }
    if(!cityName[0]){
      http.showModal('请先至少选择一个城市',false,()=>{})
      return
    }
    allear.push(cityName);
    AllcityId.push(cityId);
    that.setData({
      cityName:cityName,
      AllcityId:AllcityId,
      allear:allear,
      industry:false,
      listSty:[],
      listCityArr:[]
    })
  },
  // 点击获取运费信息
  preBtn(e){
    var that = this;
    var id = http.dataIndex(e)[1];
    var unionid = wx.getStorageSync('thisCode');
    var listSty = that.data.listSty;
    var index = http.dataIndex(e)[0];
    var listCityArr = that.data.listCityArr;
    var name = http.dataIndex(e)[3];
    listSty[index] = "1";
    var AllcityId = that.data.AllcityId;
    var city_id = "";
    if(AllcityId[0]){
      for(let i in AllcityId){
        if(i+1 == AllcityId.length){
          city_id+= AllcityId[i].join(',')
        }else{
          city_id+= AllcityId[i].join(',')+","
        }
      }
    }else{
      city_id = 0;
    }
    for(let i in listCityArr){
      if(listCityArr[i].id==id){
        wx.hideLoading();
        listSty[index] = "";
        listCityArr.splice(i,1);
        that.setData({listCityArr:listCityArr,listSty:listSty})
        return
      }
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    http._post1('StoreFreight/province_city_list',{id:id,unionid:unionid,city_id:city_id},res=>{
      wx.hideLoading();
      var data = res.data;
      if(data.status==1){
        var info = data.info;
        var cityArr = {
          name:name,
          id:id,
          info:info,
          sel:true,
        }
        listCityArr.unshift(cityArr)
        that.setData({
          listSty:listSty,
          listCityArr:listCityArr,
        })
      }else{
        listSty[index] = "";
        that.setData({listSty:listSty})
        http.showModal(data.info,false,()=>{})
      }
    }, res => { wx.hideLoading();})
  },
  // 获取当前全部数据的值
  allInput(e){
    var that = this;
    var allfirst = that.data.allfirst;
    var index = http.dataIndex(e)[0];
    var val = e.detail.value;
    allfirst[index] = val;
    that.setData({allfirst:allfirst})
  },
  allInput1(e){
    var that = this;
    var allfirstPrice = that.data.allfirstPrice;
    var index = http.dataIndex(e)[0];
    var val = e.detail.value;
    if (Number(val) || Number(val) === 0) {
      val = Number(val).toFixed(2);
    } else {
      http.showModal('请输入正确的运费金额', false, function () {
        val = 0;
        allfirstPrice[index] = val;
        that.setData({ allfirstPrice: allfirstPrice })
        return;
      })
    }
    allfirstPrice[index] = val;
    that.setData({allfirstPrice:allfirstPrice})
  },
  allInput2(e){
    var that = this;
    var allfirstAdd = that.data.allfirstAdd;
    var index = http.dataIndex(e)[0];
    var val = e.detail.value;
    allfirstAdd[index] = val;
    that.setData({allfirstAdd:allfirstAdd})
  },
  allInput3(e){
    var that = this;
    var allfirstPriceAdd = that.data.allfirstPriceAdd;
    var index = http.dataIndex(e)[0];
    var val = e.detail.value;
    if (Number(val) || Number(val) === 0) {
      val = Number(val).toFixed(2);
    } else {
      http.showModal('请输入正确的续费金额', false, function () {
        val = 0;
        allfirstPriceAdd[index] = val;
        that.setData({ allfirstPriceAdd: allfirstPriceAdd })
        return;
      })
    }
    allfirstPriceAdd[index] = val;
    that.setData({allfirstPriceAdd:allfirstPriceAdd})
  },
  // 点击删除
  delArea(e){
    var that = this;
    var index = http.dataIndex(e)[0];
    var allfirst = that.data.allfirst;
    var allfirstPrice = that.data.allfirstPrice;
    var allfirstAdd = that.data.allfirstAdd;
    var allfirstPriceAdd = that.data.allfirstPriceAdd;
    var allear = that.data.allear;
    var AllcityId = that.data.AllcityId;
    http.showModal1('是否删除本条运费模板？',true,()=>{
      allfirst.splice(index,1);
      allfirstPrice.splice(index,1);
      allfirstAdd.splice(index,1);
      allfirstPriceAdd.splice(index,1);
      allear.splice(index,1);
      AllcityId.splice(index,1);
      that.setData({
        allfirst:allfirst,
        allfirstPrice:allfirstPrice,
        allfirstAdd:allfirstAdd,
        allfirstPriceAdd:allfirstPriceAdd,
        allear:allear,
        AllcityId:AllcityId,
      })
    },()=>{})
    
  },
  // 表单验证提示操作
  formValTip: function (res, noHideLoading) {
    const _that = this;
    A.showTipModal(res.tip, function () {
      _that.setData({
        focusField: res.field
      });
      if (!noHideLoading) {
        _that.hideLoading();
      }
    });
  },
  // 点击确认提交
  upInfoMess(){
    var that = this;
    var allfirst = that.data.allfirst;
    var allfirstPrice = that.data.allfirstPrice;
    var allfirstAdd = that.data.allfirstAdd;
    var allfirstPriceAdd = that.data.allfirstPriceAdd;
    var allear = that.data.allear;
    var AllcityId = that.data.AllcityId;
    var baseinput = that.data.baseinput;
    var allFlageArr = that.data.allFlageArr;
    var unionid = wx.getStorageSync('thisCode');
    var allfirst1 = allfirst.join('_');
    var allfirstPrice1 = allfirstPrice.join('_');
    var allfirstAdd1 = allfirstAdd.join('_');
    var allfirstPriceAdd1 = allfirstPriceAdd.join('_');
    var cityId1 = "";
    var allear1 = allear.join('_');
    if(AllcityId[0]){
      for(let i=0;i<AllcityId.length;i++){
        if(i+1==AllcityId.length){
          cityId1 += AllcityId[i].join(',')
        }else{
          cityId1 += AllcityId[i].join(',')+"_"
        }
      }
    }
    let valReg = A.validateFrom({
      name: baseinput[0], // 模板名称
    }, {
      name: {
        exp: /^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d，,。.；;？\?：:、“”\"‘’'><\+\-\*\/／=（）\(\)\{\}【】\[\]%#\!！\|&￥\$]{2,30})$/,
        err: {
          field: 'name',
          tip: "请输入正确格式的模板名称（2-30个字）"
        }
      }
    });
    if (valReg !== true) {
      that.formValTip(valReg);
      return;
    }
    // 满额包邮
    if (allFlageArr[1]){
      let valReg = A.validateFrom({
        full_reduce_price: baseinput[1], // 满额包邮金额
      }, {
        full_reduce_price: {
          exp: 'price1',
          err: {
            field: 'full_reduce_price',
            tip: "请输入正确格式的满额包邮金额"
          }
        }
      });
      if (valReg !== true) {
        that.formValTip(valReg);
        return;
      }
    }
    let valReg1 = A.validateFrom({
      first_num: baseinput[2], // 首件数量
      price: baseinput[3], // 首件运费
      add_num: baseinput[4], // 续件数量
      add_price: baseinput[5], // 续件运费
    }, {
      first_num: {
        exp: 'positiveInt',
        err: {
          field: 'first_num',
          tip: "请输入正确格式的收件数量"
        }
      },
      price: {
        exp: 'price1',
        err: {
          field: 'price',
          tip: "请输入正确格式的运费金额"
        }
      },
      add_num: {
        exp: 'positiveInt',
        err: {
          field: 'add_num',
          tip: "请输入正确格式的续件数量"
        }
      },
      add_price: {
        exp: 'price1',
        err: {
          field: 'add_price',
          tip: "请输入正确格式的续费金额"
        }
      }
    });
    if (valReg1 !== true) {
      that.formValTip(valReg1);
      return;
    }
    var thatId = that.data.thatId;
    var urlInter = thatId==0?'StoreFreight/add_freight':'StoreFreight/edit_freight';
    http._post1(urlInter,{
      freight_id:thatId,
      unionid:unionid,
      name:baseinput[0] || '',
      is_start:allFlageArr[0]?1:0,
      first_num:baseinput[2] || '',
      price:baseinput[3] || 0,
      add_num:baseinput[4] || '',
      add_price:baseinput[5] || '',
      is_full_reduce:allFlageArr[1]?0:1,
      full_reduce_price:baseinput[1]?baseinput[1]:'',
      delivery_first_num:allfirst1 || '',
      delivery_price:allfirstPrice1 || '',
      delivery_add_num:allfirstAdd1 || '',
      delivery_add_price:allfirstPriceAdd1 || '',
      delivery_city:cityId1 || '',
      delivery_city_name:allear1 || '',
    },res=>{
      var data = res.data;
      if(data.status==1){
        http.showModal(data.info,false,()=>{
          wx.navigateBack({
            delta: 1
          })
        })
      }else{
        http.showModal(data.info,false,()=>{})
      }
    },res=>{})
  },
  onShow() {
  
  },

  onHide() {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
  
  },

}))