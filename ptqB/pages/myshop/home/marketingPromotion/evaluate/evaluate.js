var http = require('../../../../../utils/http.js');
var unionid = wx.getStorageSync('thisCode');
var util = require('../../../../../utils/util.js');

const A = getApp();
Page(A.assignPage({

    /**
     * 页面的初始数据
     */
    data: {
        evaTabFlag: true,
        imgUrl: http.imgUrl,
        npaging: 1,
        spaging: 1,
        inputArr: [],
        showHf: false,
        nullData: {
            img: '/images/eval_none.png',
            txt: '您还没有评价信息'
        },
        allHeight:0,
        isFocus: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.nowEvaluFn(1)
        this.sinceEvaluFn(1)
    },
    // 已回复待回复的来回切换
    evaTabFlag(e) {
        let index = http.dataIndex(e)[0];
        let evaTabFlag = index == 0 ? true : false;
        this.setData({ evaTabFlag })
    },

    onReady: function () {

    },
    seeImgUrl(e) {
        let url = http.dataIndex(e)[2];
        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: [url] // 需要预览的图片http链接列表
        })
    },
    // 已回复的接口
    nowEvaluFn(paging) {
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreEvaluate/evaluate_list', {
            unionid: unionid,
            paging: paging
        }, res => {
            let data = res.data;
            if (data.status == 1) {
                let nlist = this.data.nlist || [];
                data.evaluate_list.find(item => {
                    nlist.push(item)
                })
                this.setData({
                    npaging: paging,
                    nall_paging: data.all_paging,
                    nlist: nlist
                })
            } else {
                http.showModal(data.info, false, () => { })
            }
        }, res => { })
    },
    // 未回复的接口
    sinceEvaluFn(paging) {
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreEvaluate/evaluate_not_list', {
            unionid: unionid,
            paging: paging
        }, res => {
            let data = res.data;
            if (data.status == 1) {
                let slist = this.data.slist || [];
                data.evaluate_list.find(item => {
                    slist.push(item)
                })
                this.setData({
                    spaging: paging,
                    sall_paging: data.all_paging,
                    slist: slist
                })
            } else {
                http.showModal(data.info, false, () => { })
            }
        }, res => { })
    },
    inputBtn(e) {
        let inputArr = http.inputArr(this.data.inputArr, e);
        this.setData({
            inputArr: inputArr
        })
    },
    // 监听INPUT失焦事件
    endInputBtn(e) {
      // const _that = this;
      // if (!http.endInputArr(e)) {
      //   http.showModal('最小长度为' + e.currentTarget.dataset.minlen + '个字符', false, () => { })
      //   return;
      // }
    },
    // 点击切换状态
    changeTypeBtnNot(e){
        let index = http.dataIndex(e)[0];
        let id = http.dataIndex(e)[1];
        let slist = this.data.slist;
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreEvaluate/conceal_evaluate',{
            unionid:unionid,
            evaluate_id:id,
        },res=>{
            let data = res.data;
            if(data.status == 1){
                slist[index].status = slist[index].status==1?0:1;
                this.setData({
                    slist:slist
                })
            }
        },res=>{})
    },
    // 点击切换状态
    changeTypeBtn(e){
        let index = http.dataIndex(e)[0];
        let id = http.dataIndex(e)[1];
        console.log(id)
        let nlist = this.data.nlist;
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreEvaluate/conceal_evaluate',{
            unionid:unionid,
            evaluate_id:id,
        },res=>{
            let data = res.data;
            if(data.status == 1){
                nlist[index].status = nlist[index].status==1?0:1;
                this.setData({
                    nlist:nlist
                })
            }
        },res=>{})
    },
    replyBuyBtn(e) {
        let that = this
        if (that.data.showHf) {
            let index = http.dataIndex(e)[0];
            let id = http.dataIndex(e)[1];
            let inputArr = this.data.inputArr;
            let slist = this.data.slist;
            let nlist = this.data.nlist;
            var unionid = wx.getStorageSync('thisCode');
          if (/^([A-Za-z0-9\u4E00-\u9FA5\uf900-\ufa2d，,。.；;？\?：:、“”\"‘’'><\+\-\*\/／=（）\(\)\{\}【】\[\]%#\!！\|&￥\$\s]{4,1000})$/.test(inputArr[index])) {
                http._post1('StoreEvaluate/reply', {
                    unionid: unionid,
                    evaluate_id: id,
                    content: inputArr[index]
                }, res => {
                    let data = res.data;
                    if (data.status == 1) {
                        slist[index].is_reply = 1;
                        slist[index].reply_content = inputArr[index]
                        nlist.unshift(slist[index]);
                        slist.splice(index, 1);
                        this.setData({
                            nlist: nlist,
                            slist: slist,
                            inputArr: [],
                        })
                    }
                    http.showModal(data.info, false, () => {
                        that.setData({
                            showHf: false
                        })
                    })
                }, res => { })
            } else {
                http.showModal('请输入正确格式的回复内容（2-200个字）', false, () => { })
            }
        } else {
            that.setData({
                showHf: true
            })
        }

    },
    // 键盘的聚焦事件
    textHeightFocus(e){
        let index = http.dataIndex(e)[0];
        let slist = this.data.slist;
        slist[index].Focus = true;
        this.setData({ slist })

    },
    // 键盘的事件事件
    textHeightBlur(e){
        let index = http.dataIndex(e)[0];
        let slist = this.data.slist;
        slist[index].Focus = false;
        this.setData({ slist })
      console.log(this.data.showHf);
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let evaTabFlag = this.data.evaTabFlag;
        let npaging = this.data.npaging;
        let nall_paging = this.data.nall_paging;
        let spaging = this.data.spaging;
        let sall_paging = this.data.sall_paging;
        if (evaTabFlag) {
            if (npaging >= nall_paging) {
                return
            }
            npaging++;
            this.nowEvaluFn(npaging)
        } else {
            if (spaging >= sall_paging) {
                return
            }
            spaging++;
            this.sinceEvaluFn(spaging)
        }
    },
}))