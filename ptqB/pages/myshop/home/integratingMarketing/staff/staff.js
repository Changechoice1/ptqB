var unionid = wx.getStorageSync('thisCode');
var http = require('../../../../../utils/http.js');
var util = require('../../../../../utils/util.js');
var date = new Date()
var years = []
var months = [];
var app = getApp()

for (var i = date.getFullYear()-8; i <= date.getFullYear(); i++) {
    years.push(i)
}
for (var i = 1; i <= date.getMonth()+1; i++) {
    months.push(i)
}


Page({

    /**
     * 页面的初始数据
     */
    data: {
        nav: '2',
        imgUrl: http.imgUrl,
        status: '0',
        timeNow:'',
        chooseTime: false,
        years: years,
        year: date.getFullYear(),
        months: months,
        month: 1,
        value: [1999, date.getMonth()],
        idArr:[],
        editRemark: '0',
        editStatus: '0',
        allSelectFlag: false,
        onceRadArr: [''],
        inputArr: [],
        is_account:0
    },

    // 开启时间选择
    openChoose() {
        this.setData({
            chooseTime: true
        })
    },

    // 关闭时间选择
    closeChoose() {
        this.setData({
            chooseTime: false
        })
    },

    // 选择年月
    bindChange(e) {
        const val = e.detail.value;
        let months = [];
        var date = new Date()
        if(val[0]>=8){
            for (var i = 1; i <= date.getMonth()+1; i++) {
                months.push(i)
            }
        }else{
            for (var i = 1; i <= 12; i++) {
                months.push(i)
            }
        }
        this.setData({
            year: this.data.years[val[0]],
            month: this.data.months[val[1]],
            value:val,
            months:months
        })
    },
    // 点击确认
    confirmTimeBtn(){
        let year = this.data.year;
        let month = this.data.month;
        let timeNow = year+'-'+month;
        this.rankingList(timeNow);
        this.setData({
            timeNow:timeNow,
            chooseTime:false,
        })
    },
    // 分类切换
    changeNav(e) {
        let nav = http.dataIndex(e)[0];
        this.setData({
            nav: nav
        })
      if (nav==2){
          this.rankingList(this.data.timeNow);
        }else if(nav == 1){
        this.abonusActiveFn(1)
        }else{
        this.staffFn()
        }
    },

    // 到员工提成详情
    toStaffingDetail(e) {
        let id = http.dataIndex(e)[1];
        wx.navigateTo({
            url: 'staffDetail/staffDetail?id='+id,
        })
    },

    // 添加员工
    addStaff() {
        wx.navigateTo({
            url: 'addStaff/addStaff',
        })
    },

    // 编辑
    changeEdit() {
        this.setData({
            status: '1'
        })
    },
    cancelEdit() {
        this.setData({
            status: '0'
        })
    },
    // 员工设置的函数
    staffFn(){
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreStaff/staff_list',{unionid:unionid},res=>{
            let data = res.data;
            if(data.status == 1){
                this.setData({
                    staffList:data.staff_list
                })
            }else{
                http.showModal(data.info,false,()=>{})
            }
        },res=>{})
    },
    // 点击加入id
    pushIdBtn(e){
        let id = http.dataIndex(e)[1];
        let index = http.dataIndex(e)[0];
        let idArr = this.data.idArr;
        idArr[index] = idArr[index]?'':id;
        this.setData({idArr:idArr})

    },
    modelHide() {
        app.modelHide(this);
    },
    // 模板删除
    confirmBtn(e) {
        this.setData({
            notMData: {
                show: true,
                txt: '确定删除员工吗',
                cancel: 'modelHide',
                ok: 'delStaffBtn',
                data: {
                }
            }
        })
    },
    // 删除
    delStaffBtn(){
        let idArr = this.data.idArr;
        let upArr = [];
        var unionid = wx.getStorageSync('thisCode');
        idArr.find(item=>{
            item?upArr.push(item):''
        })
        http._post1('StoreStaff/del_staff',{
            unionid:unionid,
            account_ids:upArr.join(','),
        },res=>{
            let data = res.data;
            if(data.status == 1){
                this.setData({
                    notMData: {
                        show: false,
                    },
                    status:0
                })
                this.staffFn();
            }else{
                http.showModal(data.info,false,()=>{})
            }
        },res=>{})
    },
    // 获取分红的活动
    abonusActiveFn(paging){
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreAccount/goods_list',{
            unionid:unionid,
            paging:paging,
        },res=>{
            let data = res.data;
            if(data.status == 1){
                let aaData = [];
                if(paging > 1){
                  aaData = this.data.aaData || [];
                  data.list.find(item => {
                    console.log(item.is_group)
                    aaData.push(item)
                  })
                } else if(paging == 1){
                  aaData = data.list;
                }
                this.setData({
                    aaData:aaData,
                    paging:paging,
                    all_paging:data.all_paging,
                })
            }else{
                http.showModal(data.info,false,()=>{})
            }
        },res=>{})
    },
    // 排行榜
    rankingList(time){
        var unionid = wx.getStorageSync('thisCode');
        http._post1('StoreAccount/account_ranking_list',{
            unionid:unionid,
            time:time,
        },res=>{
            let data = res.data;
            this.setData({
                rlData:data.list
            })
        },res=>{})
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let is_account = options.is_account || this.data.is_account;
        let nav = is_account==1?1:0;
        this.setData({
            is_account:is_account,
            nav:nav
        })
        this.abonusActiveFn(1);
    },
    // 获取所有INPUT的数据
    inputTxt(e) {
        var that = this
        var inputArr = that.data.inputArr
        var aa = http.inputArr(inputArr, e)
        // console.log(aa)
        that.setData({
            inputArr: aa,
            groupPriceF: false,
        })
    },
    // 修改备注
    openEditRemark(e) {
        console.log(e)
        let account_idEidt = http.dataIndex(e)[1];
        let status = e.currentTarget.dataset.status
        if (status == '0') {
            this.data.inputArr[0] = ''
        } else {
            this.data.inputArr[0] = e.currentTarget.dataset.remark
        }
        console.log(account_idEidt)
        this.setData({
            editRemark: '1',
            inputArr: this.data.inputArr,
            account_idEidt:account_idEidt
        })
    },

    // 关闭修改备注
    closeEditRemark() {
        this.setData({
            editRemark: '0'
        })
    },
    // 确认修改备注
    confirmEditRemark(e) {
        var that = this
        var unionid = wx.getStorageSync('thisCode');
        var remark = that.data.inputArr[0];
      if (remark.length < 2) {
         wx.showModal({ title: '温馨提示', content: '请输入正确格式的姓名（2-8个字）', showCancel: false });
         return;
      }
        http._post1('StoreAccount/remark', { unionid: unionid, account_id: this.data.account_idEidt, remark: remark }, res => {
            var data = res.data
            if (data.status == 1) {
                wx.showToast({
                    title: data.info,
                    icon: 'success',
                    duration: 1000,
                    mask: true,
                })
                this.staffFn();
                that.setData({
                    editRemark: '0'
                })
            } else {
                
            }
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let mon = Number(new Date().getMonth())+1
        let timeNow = new Date().getFullYear()+'-'+mon;
        this.setData({
            timeNow:timeNow,
        })
        this.rankingList(timeNow);
        this.staffFn();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        let all_paging = this.data.all_paging;
        let paging = this.data.paging;
        if(all_paging<=paging){
            return
        }
        paging++;
        this.abonusActiveFn(paging);
    }
})