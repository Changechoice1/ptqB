var http = require('../../../../../utils/http.js');
var util = require('../../../../../utils/util.js');
var unionid = wx.getStorageSync('thisCode');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperTip: '由于国家严禁监管原因，近期医疗美容、地产教育、金融股票、出国留学等行业会发送短信受限。      ',
        scrollLeft: 0,
        initScrollLeft: false,
        paging: 1,
        bottomF: false,
        bottomF1: false,
        imgUrl: http.imgUrl,
        due_time: null,
        // qfsyNum: 1, // 剩余群发次数
        qfNum: 0, // 剩余群发次数
        clickPower: false,
        is_authentication: '1',
        headerShow: true,
        chooseDpActive: [],
        chooseDpActive1: [],
        chosenNav: 0,
        goodsListArr: [],
        goodsListArr1: [],
        sortNumArr: [],// 已选活动数组
        sortNum: null,
        goods_ids: [],
        goods_ids1: [],
        changeQfArr: [1],
        messAdd: ['1', ''],
        nullData: {
            img: '/images/qf_none.png',
            txt: '店铺暂无活动',
            w: 287,
            h: 254,
            tt: 50

        },
        nullData1: {
            img: '/images/qf_none_1.png',
            txt: '联盟商家暂无活动',
            w: 414,
            h: 414,
            t: -200,
            tt: -50
        },
        data_list: [],
        modelData: {
            titleHide: false,
            con: '确定群发消息吗？',
            onceConfirm: false,
            cancelEvent: '',
            confirmEvent: '',
        },
        fansBinArr: [{
            title: '【什么是粉丝群发】',
            content: '1.对关注您店铺的用户推送您店铺的活动或商盟店铺的活动。用户会在用户版首页看到您群发的活动。\n2.如果这些用户同时关注了公众号，也会在拼团趣公众号收到您群发的活动。'
        }, {
            title: '【怎么使用粉丝群发】',
            content: '在“店铺活动”或“联盟活动”下选择任意一个活动后，点击右下角“发送”按钮，即可将活动群发给粉丝。'
        }, {
            title: '【为什么无法发送】',
            content: '1.您的群发次数已用尽，商家每日可群发3次，每次群发1个活动。\n2.您店铺内没有进行中的活动。\n3.您还未选中活动。'
        }],
        khBinArr: [{
            title: '【什么是客户群发】',
            content: '客户群发是指对所有在店铺生成订单的用户的默认手机号码发送短信进行通知。'
        }, {
            title: '【怎样客户群发】',
            content: '在文本框中输入不超过规定字数限制的内容，输入后点击右下角的短信群发即可。系统会在你编写的内容中自动生成店铺名和网址链接。'
        }, {
            title: '【短信条数怎么获取，为什么无法发送】',
            content: '短信条数在店铺认证后会免费赠送店铺100条，使用完后可点击短信群发右侧的短信充值，对短信条数进行充值。'
        }, {
            title: '',
            content: '为什么无法发送?\n1.是因为没输入发送内容。\n2.是因为可用短信条数不足，需进行短信充值后才可发送。'
        }],
        areaTxtNum: 0,
        storeName: '',
        storeUrl: '',
        allTxtNum: 64,
        areaTxt: '',
        isMessShow: false,
        messgObj: {},
        fansNum: '加载中',
        areaFlag: true,
        is_sub: 0,
        clickF: true,
        canSendMsg: true, // 是否可点击短信群发
    },
    onShow() {
        this.scrollTipTimer();
    },
    // 滚动提示计时器
    scrollTipTimer() {
        const _that = this,
            _d = _that.data;
        var tipTimer = setInterval(function() {
            _that.setData({ scrollLeft: _d.scrollLeft + 2 });
            if (_d.scrollLeft == 1100) {
                _that.setData({ scrollLeft: -750, initScrollLeft: true })
            }
        }, 50)
        _that.setData({ tipTimer: tipTimer })
    },
    // 短信内容输入
    areaInput(e) {
        let messAdd = this.data.messAdd;
        let areaTxtNum = Number(e.detail.cursor);
        console.log()
        if (messAdd[0]) {
            // areaTxtNum += Number(this.data.storeName.length) + 2
        }
        if (messAdd[1]) {
            areaTxtNum += Number(this.data.storeUrl.length) + 4
        }
        this.setData({
            areaTxt: e.detail.value,
            areaTxtNum: areaTxtNum
        })
    },
    // 关闭提示框
    modelHide() {
        app.modelHide(this);
    },
    // 点击更换提示
    binInfoBtn(e) {
        let index = http.dataIndex(e)[0];
        this.showDialog();
        index == 1 ? this.setData({
            modelData: {
                titleHide: true,
                bindArr: this.data.fansBinArr,
                onceConfirm: true,
                zstype: '2',
                txtAlign: 'left'
            }
        }) : this.setData({
            modelData: {
                titleHide: true,
                bindArr: this.data.khBinArr,
                onceConfirm: true,
                zstype: '2',
                txtAlign: 'left'
            }
        })
    },
    // 改变大的群发模块
    changeQf(e) {
        let index = http.dataIndex(e)[0];
        let nowTime = new Date()
        let minTime = [nowTime.getHours(), nowTime.getMinutes()]
        let messgObj = this.data.messgObj;
        var unionid = wx.getStorageSync('thisCode');
        let messAdd = this.data.messAdd;
        let weekDay = nowTime.getDay();
        let changeQfArr = [];
        changeQfArr[index] = '1';
        if (index == 0) {
            this.khObjFn();
        } else if (index == 1) {
            this.storeDataFn(1);
        }
        this.setData({
            changeQfArr: changeQfArr
        })
    },
    dpNav() {
        this.setData({
            chosenNav: '0'
        })
    },

    lmNav() {
        if (this.data.is_authentication == 0) {
            http.showModal('抱歉您暂无使用权限', false, () => {})
            return
        }
        this.setData({
            chosenNav: '1'
        })
    },
    onReady: function() {
        //获得dialog组件

    },
    showDialog() {
        this.diyMoadel.showDialog();
        this.setData({
            areaFlag: false
        })
    },
    hideDialog() {
        this.diyMoadel.hideDialog();
        this.setData({
            isMessShow: false,
            areaFlag: true,
            clickF: true
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    // 获取粉丝数
    obtainFans(store_id) {
        let url = 'listFans';
        http._post1(url, { storeId: store_id, page: 1 }, res => {
            let data = res.data;
            if (data.status == 1) {
                this.setData({
                    fansNum: data.info.effect_num
                })
            }
        }, res => {})
    },
    onLoad(options) {
        var that = this;
        this.diyMoadel = this.selectComponent("#diyMoadel");
        var unionid = wx.getStorageSync('thisCode');
        let changeQfArr = ['1'];
        let store_id = options.store_id || 0;
        if (store_id > 0) {
            this.obtainFans(store_id);
        }
        changeQfArr = options.tab == 1 ? ['', '1'] : ['1'];
        if (options.tab == 1) {
            // let nowTime = new Date()
            // let minTime = [nowTime.getHours(), nowTime.getMinutes()]
            // let weekDay = nowTime.getDay();

            // if ((minTime[0] > 12 || (minTime[0] == 12 && minTime[1] > 0)) && weekDay < 7) {
            //     this.showDialog();
            //     changeQfArr = ['1']
            //     that.setData({
            //         modelData: {
            //             titleHide: true,
            //             onceConfirm: true,
            //             con: '短信群发功能只在周一到周六的0：00 - 12：00开放，如遇特殊情况时间顺延。',
            //             confirmEvent: 'goBack'
            //         },
            //     })
            // }
        }
        var paging = that.data.paging;
        var phoneH1 = ((Number(util.nowPhoneWH()[1]) - 125) * 100) / 100;
        that.setData({
            scrollScroll: phoneH1,
            changeQfArr: changeQfArr
        })
        // 获取初始客户数据
        this.khObjFn();
        this.storeDataFn(1);
        // // 发信息次数接口
        // 群发详情信息
        http._post1('StoreWeChat/index', {
            unionid: unionid
        }, res => {
            var data = res.data;
            let clickPower = false;
            let headerShow = true;
            let due_time = data.due_time
            if (data.status == 1) {
                var timeStare = "";
                var qfNum = '';
                qfNum = data.num
                if (data.due_time > 0) {
                    var bb = res.data.due_time
                    timeStare = util.dayTime(bb);
                    that.setData({
                        timeStare: timeStare,
                        bb: bb
                    });
                    var timeClear = setInterval(() => {
                        bb--;
                        if (bb <= 0) {
                            clearInterval(timeClear);
                            that.setData({
                                timeClear: ""
                            })
                            return
                        }
                        timeStare = util.dayTime(bb);
                        that.setData({
                            timeStare: timeStare,
                            bb: bb,
                            qfNum: qfNum
                        });
                    }, 1000)
                }
                if (data.is_authentication == 1 && data.num >= 1) {
                    clickPower = true
                } else if (data.is_authentication == 0 && data.due_time < 0) {
                    this.showDialog();
                    this.setData({
                        modelData: {
                            titleHide: true,
                            onceConfirm: true,
                            con: '未认证商家不能使用客户群发功能！请前往认证！',
                            confirmText: '前往认证',
                            confirmEvent: 'navAut'
                        },
                    })
                } else {
                    clickPower = false
                }

                // 获取商盟数据
                if (data.is_authentication == 1) {
                    this.busDataFn(1)
                }
                that.setData({
                    qfNum: data.num,
                    due_time: data.due_time,
                    timeStare: timeStare,
                    due_time: due_time,
                    clickPower: clickPower,
                    headerShow: headerShow,
                    is_authentication: data.is_authentication
                })
            } else {
                http.showModal(data.info, false, () => {})
            }
        }, res => {})
    },
    // 返回上一页: cxj
    goBack() {
        app.G('navigateBack://');
    },
    // 获取客户数据
    khObjFn() {
        // 初始获取短信数据
        var unionid = wx.getStorageSync('thisCode');
        let requireOver = setTimeout(() => {
            this.showDialog();
            clearTimeout(requireOver)
            this.setData({
                modelData: {
                    titleHide: true,
                    onceConfirm: true,
                    con: '请求中断,请返回上级页面后重新进入',
                    confirmEvent: 'backnav',
                    confirmText: '退出当前页面'
                },
            })
        }, 15000)
        this.setData({
            requireOver: requireOver
        })
        let gmP = new Promise((resolve, reject) => {
            let url = 'sms/store';
            http._post1(url, {
                unionid: unionid
            }, res => {
                let data = res.data;
                clearTimeout(requireOver)
                resolve(data.store_id)
                if (data.status == 1) {

                    this.setData({
                        storeName: data.name,
                        storeUrl: data.short_link,
                        allTxtNum: Number(data.limit_count) - Number(data.name.length) - 2,
                        messgObj: data,
                        is_sub: data.is_sub || 0,
                    })
                } else {
                    this.setData({
                        modelData: {
                            titleHide: true,
                            onceConfirm: true,
                            con: data.info,
                            confirmEvent: 'backnav',
                            confirmText: '退出当前页面'
                        },
                    })
                    this.showDialog();
                }
            }, res => {})
        })
        gmP.then(val => {
            this.obtainFans(val);
        })
    },
    // 获取店铺活动数据
    storeDataFn(paging) {
        console.log(paging)
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreWeChat/goods_list', {
            unionid: unionid,
            paging: paging,
        }, res => {
            let data = res.data;
            if (data.status == 1) {
                //  var goodsListArr = this.data.goodsListArr;
                //  for (let i in res.data.goods_list) {
                //      goodsListArr[i] = ''
                //  }
                let goods_list = []
                if (paging > 1) {
                    goods_list = this.data.goods_list
                }
                res.data.goods_list.find(item => {
                    goods_list.push(item)
                })
                this.setData({
                    goods_list: goods_list,
                    all_paging: data.all_paging,
                    paging: paging,
                })
            }
        }, res => {})
    },
    // 获取商盟活动数据
    busDataFn(paging) {
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreWeChat/ally_goods', {
            unionid: unionid,
            paging: paging
        }, res => {
            let data = res.data;
            if (res.data.status == 1) {
                let data_list = this.data.data_list || []
                data.data_list.find(item => {
                    data_list.push(item)
                })
                this.setData({
                    paging1: paging,
                    all_paging1: data.all_paging,
                    data_list: data_list,
                })
            }
        }, res => {});
    },
    // 商品点击排序
    shareGoods(e) {
        // 多选：每天最多1次，每次最多4个活动
        // var index = http.dataIndex(e)[0];
        // var goodsId = http.dataIndex(e)[1];
        // let sortNumArr = this.data.sortNumArr;
        // let chearNear = 0;
        // let chearIndex = 0;
        // sortNumArr.find((item, index) => {
        //     if (item == goodsId) {
        //         chearNear++;
        //         chearIndex = index;
        //     }
        // })
        // if (chearNear > 0) {
        //     sortNumArr.splice(chearIndex, 1)
        // } else if (sortNumArr.length < 4) {
        //     sortNumArr.push(goodsId)
        // } else {
        //     this.showDialog();
        //     this.setData({
        //         modelData: {
        //             titleHide: true,
        //             onceConfirm: true,
        //             con: '亲，最多可发送4个活动',
        //         },
        //     })
        // }
        // this.setData({
        //     sortNumArr,
        // })

        // 单选：每天最多3次，每次最多1个活动
        var goodsId = http.dataIndex(e)[1];
        let sortNumArr = [goodsId];
        console.log(sortNumArr);
        this.setData({
          sortNumArr: sortNumArr
        })
    },

    onReady() {

    },
    navAut() {
        wx.redirectTo({
          url: '/pages/myshop/my/qualificationCert/index'
        })
    },
    // 群发提示
    confirmBtn(e) {
      if(this.data.clickF){
        this.setData({ clickF: false });
        var thatId = Number(e.target.dataset.id);
        var index = e.target.dataset.index;
        var sortNumArr = this.data.sortNumArr;
        this.showDialog();
        if (this.data.is_authentication != 1) {
          wx.hideLoading()
          this.setData({
            modelData: {
              titleHide: true,
              onceConfirm: true,
              con: '您没有群发权限!',
            },
            clickF: true
          })
          return
        }
        // if (this.data.qfsyNum == 0) {
        if (this.data.qfNum == 0) {
          wx.hideLoading()
          this.setData({
            modelData: {
              titleHide: true,
              onceConfirm: true,
              con: '抱歉!今日群发次数已经用完了!',
            },
            clickF: true
          })
          return
        }
        if (sortNumArr.length <= 0) {
            wx.hideLoading()
            this.setData({
                modelData: {
                    titleHide: true,
                    onceConfirm: true,
                    con: '感谢您的配合，请先选择商品!',
                },
                clickF: true
            })
            return
        }
        this.setData({
            modelData: {
                titleHide: true,
                zstype: '3',
                nodesStr: '<div style="color:#333font-size:14px;text-align:center;line-height:2;">确定对' + this.data.fansNum + '位粉丝发送吗？</div><div style="color:#666;font-size:12px;text-align:left;">(因微信公众号机制，只有48小时内活跃的部分粉丝能收到)</div>',
                onceConfirm: false,
                cancelEvent: 'hideDialog',
                confirmEvent: 'clickGroup',
            }
        })
      }
    },
    // 点击确认进行群发
    clickGroup(thatId) {
        var that = this;
        var goods_ids = that.data.goods_ids;
        var goods_ids1 = that.data.goods_ids1;
        var sortNumArr = that.data.sortNumArr;
        var unionid = wx.getStorageSync('thisCode');
        var bb = sortNumArr.join(',');
        var showModalTime = setTimeout(() => {
          http.showModal('群发成功!', false, () => {
            that.setData({
              clickF: true,
              notMData: {
                show: false
              }
            })
          });
          clearTimeout(showModalTime)
        }, 20000);
        that.setData({
          showModalTime: showModalTime
        })

        wx.showLoading({
          title: '加载中',
          mask: true
        })
        http._post1('StoreWeChat/group_sending', {
          unionid: unionid,
          goods_ids: bb
        }, res => {
          wx.hideLoading();
          var data = res.data;
          if (data.status == 1) {
            that.setData({
              qfNum: this.data.qfNum - 1,
              clickF: true,
              notMData: {
                show: false
              },
              modelData: {
                titleHide: true,
                onceConfirm: true,
                con: data.info || '群发成功！',
              },
            })
            clearInterval(showModalTime)

          } else {
            that.setData({
              clickF: true,
              notMData: {
                show: false
              },
              modelData: {
                titleHide: true,
                onceConfirm: true,
                con: data.info || '数据获取失败',
              },
            })
            clearInterval(showModalTime)
          }
        }, res => { 
          wx.hideLoading();
          that.setData({ clickF: true })
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    backnav() {
        wx.navigateBack({
            delta: 1
        })
    },
    // 本店商品的上拉加载
    infoData1() {

    },
    onHide() {
        this.hideDialog();
        clearInterval(this.data.showModalTime);
        clearTimeout(this.data.requireOver)
        clearInterval(this.data.tipTimer);
        clearTimeout(this.data.waitTimer)
    },
    onUnload() {
        this.hideDialog();
        clearInterval(this.data.showModalTime);
        clearTimeout(this.data.requireOver)
        clearInterval(this.data.tipTimer);
        clearTimeout(this.data.waitTimer)
    },
    // 附加条件的函数
    messChareBtn(e) {
        let index = http.dataIndex(e)[0];
        let messAdd = this.data.messAdd;
        let areaTxtNum = this.data.areaTxtNum;
        let allTxtNum = this.data.allTxtNum;
        let addNum1 = 0;
        if (index == 0) {
            addNum1 = !messAdd[0] ? Number(this.data.storeName.length) + 2 : 0;
        } else {
            addNum1 = !messAdd[1] ? Number(this.data.storeUrl.length) + 4 : 0;
        }
        if (Number(areaTxtNum + addNum1) > allTxtNum) {
            this.showDialog();
            this.setData({
                modelData: {
                    titleHide: true,
                    onceConfirm: true,
                    con: '无法附加！内容字数已超出，请删除文字后附加',
                },
            })
            return
        }
        messAdd[index] = messAdd[index] ? '' : '1';
        if (index == 0) {
            areaTxtNum = messAdd[index] ? areaTxtNum + Number(this.data.storeName.length) + 2 : areaTxtNum - Number(this.data.storeName.length) - 2
        } else {
            areaTxtNum = messAdd[index] ? areaTxtNum + Number(this.data.storeUrl.length) + 4 : areaTxtNum - Number(this.data.storeUrl.length) - 4
        }
        this.setData({
            areaTxtNum: areaTxtNum,
            messAdd: messAdd
        })

    },
    // 短信预览
    showMessBtn() {
        if (!this.data.areaTxt) {
            this.showDialog();
            this.setData({
                modelData: {
                    titleHide: true,
                    onceConfirm: true,
                    con: '亲，预览前请先填写群发内容！',
                },
            })
            return
        }
        this.hideDialog()
        this.setData({
            isMessShow: true,
        })
    },
    // 前往充值
    navaRecharge() {
        this.hideDialog();
        wx.navigateTo({
            url: 'recharge/recharge'
        })
    },
    messRecharge() {
        this.hideDialog();
        let is_sub = this.data.is_sub;
        if (is_sub == 1) {
            this.showDialog();
            this.setData({
                modelData: {
                    titleHide: true,
                    onceConfirm: true,
                    con: '亲，子账号无充值权限，请联系主账号充值！',
                },
            })
            return
        }
        wx.navigateTo({
            url: 'recharge/recharge'
        })
    },
    // 判断是否提交

    upMessBtnPd() {
        let nowTime = new Date()
        let minTime = [nowTime.getHours(), nowTime.getMinutes()]
        let messgObj = this.data.messgObj;
        var unionid = wx.getStorageSync('thisCode');
        let messAdd = this.data.messAdd;
        let weekDay = nowTime.getDay();
        this.showDialog();
        if ((minTime[0] > 12 || (minTime[0] == 12 && minTime[1] > 0)) && weekDay < 7) {
          this.setData({
            modelData: {
              titleHide: true,
              onceConfirm: true,
              con: '短信群发功能只在周一到周六的0：00-12：00开放，如遇特殊情况时间顺延。',
            },
          })
          return
        }
        if (messgObj.status != 1) {
          this.setData({
            modelData: {
              titleHide: true,
              onceConfirm: true,
              con: '客户数据正在加载中，请稍后',
            },
          })
          this.khObjFn();
          return
        }

        if (Number(messgObj.usable_qty) < Number(messgObj.customer_qty)) {
          this.setData({
            modelData: {
              titleHide: true,
              onceConfirm: false,
              confirmEvent: 'navaRecharge',
              con: '可用短信条数不足，是否确定充值',
            },
          })
          return
        }

        this.setData({
          modelData: {
            titleHide: true,
            onceConfirm: false,
            confirmEvent: 'upMessBtn',
            con: '确定对' + this.data.messgObj.customer_qty + '名客户发送',
          },
        })
    },
    // 点击群发短信
    upMessBtn() {
      if(this.data.canSendMsg) {
        this.setData({ canSendMsg: false });
        let nowTime = new Date()
        let minTime = [nowTime.getHours(), nowTime.getMinutes()]
        let messgObj = this.data.messgObj;
        var unionid = wx.getStorageSync('thisCode');
        let messAdd = this.data.messAdd;
        let storeName = messAdd[0] ? "【" + this.data.storeName + "】" : '';
        let storeUrl = messAdd[1] ? "点击" + this.data.storeUrl + "#查看" : '';
        let msg = storeName + this.data.areaTxt + storeUrl + '，退订回T';
        if (msg.length > 70) {
            this.setData({ canSendMsg: true });
            this.showDialog();
            this.setData({
                modelData: {
                    titleHide: true,
                    onceConfirm: true,
                    con: '您的总字数已超出发送限制',
                },
            })
            return
        }

        wx.showLoading({
            title: '提交中...',
        })
        this.hideDialog();
        let url = 'sms/submit'
        http._post1(url, {
            unionid: unionid,
            msg: msg,
            storeId: messgObj.store_id
        }, res => {
            this.setData({ canSendMsg: true });
            let data = res.data
            if (data.status == 1) {
                this.showDialog();
                this.setData({
                    modelData: {
                        titleHide: true,
                        onceConfirm: true,
                        con: '，在今日18：00前完成审核，审核成功后会为您发送',
                        redTxt: '已成功提交',
                        txtAlign: 'left',
                    },
                })
                this.khObjFn();
            } else {
                this.showDialog();
                this.setData({
                    modelData: {
                        titleHide: true,
                        onceConfirm: true,
                        con: data.info,
                    },
                })
                this.khObjFn();
            }
          }, res => { this.setData({ canSendMsg: true });})
      }
    },
    onReachBottom() {
        let chosenNav = this.data.chosenNav;
        if (chosenNav == 0) {
            let paging = this.data.paging;
            let all_paging = this.data.all_paging;
            if (paging >= all_paging) {
                return
            }
            paging++;

            this.storeDataFn(paging)
        } else {
            let paging = this.data.paging1;
            let all_paging = this.data.all_paging1;
            if (paging >= all_paging) {
                return
            }
            paging++;
            this.busDataFn(paging)
        }
    }
})