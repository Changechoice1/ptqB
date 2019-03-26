module.exports = {
  authInfo: {
    version: 0,
    vNumber: 0,
    isPay: true,
    isAuth: true,
  },
  authInfoArr: [
    {
      lab: '基础体验版试用期',
      txt: '试用期倒计时',
      time: '7天10小时',
      btn: '去支付',
      btnFn: 'goPay2',
      isOverdue: false,
      overdueLab: '试用期已到期',

    },
    {
      lab: '基础体验版',
      txt: '有效期至',
      time: '2019-05-04',
      btn: '升级正式版',
      btnFn: 'goPay3',
      isOverdue: false,
      overdueLab: '基础体验版已到期',
    },
    {
      lab: '基础正式版',
      txt: '有效期至',
      time: '2019-05-04',
      isOverdue: false,
      overdueLab: '基础正式版已到期',
    }
  ],

  // 处理用户版本信息
  setAuthInfo: function (_that) {
    const _d = _that.data;
    let s = _d.authInfoData, n = 0;
    this.authInfo = {
      version: 0,
      vNumber: 0,
      isPay: true,
      isAuth: true,
    }
    for (let i = 0, len = this.authInfoArr.length; i < len; i++){
      this.authInfoArr[i].isOverdue = false;
    }
    this.authInfo.version = s.version;
    this.authInfo.isPay = s.is_pay == 0 ? false : true;
    
    n = s.version ? s.version == 1 ? 1 : s.version == 2 ? 2 : 0 : 0;
    this.authInfo.vNumber = n;
    if (s.is_expire == 0) {
      this.authInfoArr[n].isOverdue = true;
    }else {
      if (s.is_pay == 0) {
        if (n == 0) {
          if (s.is_type == 1) {
            this.authInfoArr[0].time = s.day + '天' + s.hour + '小时';
          } else if (s.is_type == 2) {
            this.authInfoArr[0].time = s.hour + '小时' + s.minute + '分';
          } else if (s.is_type == 3) {
            this.authInfoArr[0].time = s.minute + '分';
          }
        }
      } else if (s.is_pay == 1) {
        this.authInfoArr[n].time = s.auth_end_time;
      }
    }
    this.authInfo.isAuth = s.is_auth == 1 ? true : false;
    _that.setData({
      authInfo: this.authInfo,
      authInfoArr: this.authInfoArr
    });
  },
}