module.exports = {
  /**
   * 1 首页
   */
  // 菜单一
  home_menu1: [
    { title: '当前活动', subTitle: '当前活动', unit: '个', field: 'activity_num', subField: 'activity_num', tapEvent: 'goActivity' },
    { title: '钱包余额', subTitle: '提成钱包', unit: '元', field: 'wallet', subField: 'account_wallet', tapEvent: 'goWallet' },
    { title: '专享卡', subTitle: '专享卡', unit: '张', field: 'card_num', subField: 'card_num', tapEvent: 'goExVipCard' },
    { title: '客粉数', subTitle: '客粉数', unit: '人', field: 'fans_num', subField: 'fans_num', tapEvent: 'goFans' }
  ],
  // 菜单二
  home_menu2: [
    { title: '查看店铺', icon: 'icon-pq-storem', iconColor: '#FD6652', iconSize: '36rpx', tapEvent: '' },
    { title: '扫码进店', icon: 'icon-pq-saocode', iconColor: '#FFA257', iconSize: '36rpx', tapEvent: 'goQrcode' }
  ],
  // 菜单三
  home_menu3: [
    {
      title: '营销拓客',
      subMenu: [
        [
          { title: '多人拼团', img: 'https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/merchant/drpt.jpg', active: true, tapEvent: 'goReleaseDrpt' },
          { title: '限时专享', img: 'https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/merchant/xszx.jpg', active: true, tapEvent: 'goReleaseXszx' },
          { title: '拼团立减', img: 'https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/merchant/ptlj.jpg', active: true, tapEvent: 'goReleasePtlj' },
          { title: '刮奖免单', img: 'https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/wxxcx/gjmd.png', active: true, tapEvent: 'goReleaseGjmd' },
          { title: '砍价', img: 'https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/wxxcx/kj.png', active: true, tapEvent: 'goReleaseKj' },
          { title: '赚红包', img: 'https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/merchant/zhb.jpg', active: false, tapEvent: '' }
        ],[]
      ],
    },
    {
      title: '社群运营',
      subMenu: [
        [],
        [
          { title: '客粉管理', icon: 'icon-pq-fansmg', iconColor: '#FD6652', active: true, allowMain: true,  allowSub: true, tapEvent: 'goFans' },
          { title: '商家联盟', icon: 'icon-pq-businessmg', iconColor: '#FD6652', active: true, allowMain: true,  allowSub: false, tapEvent: 'goBusinessUnion' },
          { title: '消息群发', icon: 'icon-pq-Grouphair', iconColor: '#FD6652', active: true, allowMain: true,  allowSub: false, tapEvent: 'goGroupMsg' },
          { title: '全员营销', icon: 'icon-pq-allmeb', iconColor: '#FD6652', active: true, allowMain: true, allowSub: true, tapEvent: 'goStaff' }
        ]
      ],
    },
    {
      title: '营销中心',
      subMenu: [
        [],
        [
          { title: '营销助手', icon: 'icon-pq-Marketing', iconColor: '#FFB452', active: true, allowMain: true,  allowSub: true, tapEvent: 'goMaAssistant' },
          { title: '营销数据', icon: 'icon-pq-Marketdata', iconColor: '#FFB452', active: true, allowMain: true, allowSub: true, tapEvent: 'goMaData' },
          { title: '品牌中心', icon: 'icon-pq-token', iconColor: '#FD6652', active: true, allowMain: true, allowSub: true, tapEvent: 'goBrandCenter' },
          { title: '子账号', icon: 'icon-pq-Subaccount', iconColor: '#FD6652', active: true, allowMain: true, allowSub: false, tapEvent: 'goSubAccount' },
          { title: '运费管理', icon: 'icon-pq-sfreight', iconColor: '#6F8EFF', active: true, allowMain: true, allowSub: true, tapEvent: 'goFreight' },
          { title: '评价管理', icon: 'icon-pq-crown', iconColor: '#6F8EFF', active: true, allowMain: true, allowSub: true, tapEvent: 'goEvaluate' }
        ]
      ],
    },
  ],

  /**
   * 4 我的
   */
  // 菜单
  my_menu: [
    [
      { title: '店铺设置', icon: 'icon-pq-seetingtwo', iconSize: '40rpx', field: '', allowMain: true, allowSub: true, tapEvent: 'goSetting'},
      { title: '认证资质', icon: 'icon-pq-defense', iconSize: '40rpx', field: 'authType', allowMain: true, allowSub: false, tapEvent: 'goQuaCert' }
    ], [
      { title: '常见问题', icon: 'icon-pq-sswh', iconSize: '40rpx', field: '', allowMain: true, allowSub: true, tapEvent: 'goFAQ' },
      { title: '消息中心', icon: 'icon-pq-message', iconSize: '40rpx', field: '', allowMain: true, allowSub: true, tapEvent: 'goMsgCenter' },
      { title: 'PC端管理', icon: 'icon-pq-pc', iconSize: '40rpx', field: '', allowMain: true, allowSub: true, tapEvent: 'goPCManage' }
    ], [
      { title: '退出登录', icon: 'icon-pq-exitlog', iconSize: '40rpx', field: '', allowMain: true, allowSub: false, tapEvent: 'gologout' },
      { title: '解除绑定', icon: 'icon-pq-exitlog', iconSize: '40rpx', field: '', allowMain: false, allowSub: true, tapEvent: 'goUnbind' },
      { title: '切换身份', icon: 'icon-pq-indet', iconSize: '40rpx', field: 'identity', allowMain: true, allowSub: true, tapEvent: 'goSwitchIden' }
    ]
  ],

  /**
   * 5 canvas信息
   */
  // 支付二维码图片
  payQrImgInfo: {
    logo: wx.getStorageSync('storeInfo').store_logo,
    name: wx.getStorageSync('storeInfo').store_name,
    logo1: 'https://ptq.oss-cn-hangzhou.aliyuncs.com/ptq/wxxcx/smallLogo.jpg',
    name1: '拼团趣',
    title: '【刮奖免单专属码】',
    qrImg: '',
    text: '微信扫一扫 进行支付',
    tipTitle: '活动支付二维码',
    tipCont: ''
  }
}