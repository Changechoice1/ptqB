const A = getApp();
Page(A.assignPage({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: A.config.imgUrl,

    showFilter: false,
    selectTxtArr: ['全部款项', '冻结中款项', '已解冻款项', '已提款款项'],
    selectType: 0,

    pageCount: 0,
    pageNum: 0,
    pageSize: 20,
    isLastPage: false,
    list: [],
    
    noList: false,
    noListData: {
      img: A.config.imgUrl + 'n3_ico3.png',
      txt: '暂无资金明细'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTurnoverList();
  },

  /**
   * 触底函数
   */
  onReachBottom: function () {
    if (!this.data.isLastPage) { 
      this.getTurnoverList(); 
    }
  },

  /**
   * 列表
   */
  // 获取列表
  getTurnoverList: function(){
    const _that = this, _d = _that.data;
    A.updata.getTurnoverList(++_d.pageNum, _d.pageSize, _d.selectType).then(res => {
      if(res.status == A.STATE.STATUS.OK){
        _that.setData({ sum: res.sum });
        if (res.pages == 0){
          _that.setData({ noList: true });
          return;
        }
        if(res.pages <= res.pageNum){
          _that.setData({ isLastPage: true });
        }
        let list = _d.list || [];
        let newList = list.concat(res.data);
        _that.setData({
          pageCount: res.pages,
          pageNum: res.pageNum,
          list: newList
        });
      }else {
        A.showTipModal(res.info || '获取数据失败');
      }
    }, err => {});
  },
  // 到明细详情
  toDetail(e) {
    let id = e.currentTarget.dataset.id
    A.G('../turnoverDetail/turnoverDetail?id=' + id)
  },

  /**
   * 款项筛选
   * 
   */
  // 出现隐藏筛选框
  screenBtn: function () {
    this.setData({ showFilter: !this.data.showFilter });
  },
  // 点击改变隐藏状态
  hideChange: function() {
    this.setData({ showFilter: false });
  },

  // 点击筛选款项
  selectBtn(e) {
    const _that = this, _d = _that.data;
    var index = e.currentTarget.dataset.index;
    _that.setData({
      selectType: index,
      pageCount: 0,
      pageNum: 0,
      isLastPage: false,
      list: [],
      noList: false
    });
    _that.getTurnoverList();
  },


}))