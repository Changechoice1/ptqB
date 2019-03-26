// web service api 业务处理
import A from '../vwx/uset.js'
// 此模块用于扩展updata功能
const appsercie = require('appsercie.js');
const userPower = require('userPower.js');
// 1 店铺信息
const register = require('myShop/register.js');
// 1.1 首页
const myShopIndex = require('myShop/home/index.js');
const myShopAnnualFee = require('myShop/home/annualFee.js');
const myShopQrCode = require('myShop/home/qrCode.js');
const myShopSpecialCard = require('myShop/home/specialCard.js');
const myShopWallet = require('myShop/home/wallet.js');
const myShopStaffWallet = require('myShop/home/staffWallet.js');
const myShopGroupMessages = require('myShop/home/groupMessages.js');
const myShopStaff = require('myShop/home/staff.js');
const myShopSubAccount = require('myShop/home/subAccount.js');
const myShopFreight = require('myShop/home/freight.js');
const myShopEvaluation = require('myShop/home/evaluation.js');
const myShopFans = require('myShop/home/fans.js');
const myShopBusinessAlliance = require('myShop/home/businessAlliance.js');
// 1.2 活动
const myShopGoodManagement = require('myShop/activity/goodsManagement.js');
// 1.3 订单
const myShopOrder = require('myShop/order/order.js');
// 1.4 我的
const myShopIdentity = require('myShop/my/identity.js');
const myShopSetting = require('myShop/my/setting.js');
const myShopAuth = require('myShop/my/authentication.js');
const myShopBusinessSchool = require('myShop/my/businessSchool.js');
const myShopMsgCenter = require('myShop/my/msgCenter.js');

// 营销助手
const marketAssistant = require('marketingAssistant/index.js')
const actDetail = require('marketingAssistant/actDetail.js')
const marketingData = require('marketingData/index.js')
const brandCenter = require('brandCenter/index.js')

module.exports = {
   getTData(_val) {
      return new Promise((resolve, reject) => {
         A.RS(_val).then(res => {
            if (!res.status && res.status != A.STATE.STATUS.ERROR) {
               wx.hideLoading();
               A.showTipModal(res.info || A.DF.MSG.RES_NULL, () => {
                  A.goPrower();
               })
               return
            } else if (res.status == A.STATE.STATUS.ERROR) { // 0
               resolve(res);
               A.showTipModal(res.info)
               return
            } else if (res.status == A.STATE.STATUS.TOKEN) { // 600
               wx.hideLoading();
               A.showModal({
                  content: A.DF.MSG.RES_600,
                  showCancel: false,
                  confirmText: '重新登录',
                  success: A.goPrower
               })
               return
            } else if (res.status == 12) {
               wx.hideLoading();
               A.showTipModal(res.info, () => {
                  A.G('reLaunch:///pages/myshop/myshop')
               })
               return
            } else if (res.status == A.STATE.STATUS.IDEN) { // 233
                wx.hideLoading();
                A.showTipModal(res.info || A.DF.MSG.RES_233, () => {
                  A.G('reLaunch:///pages/login/login?upidentity=2')
               })
               return
            } else if (res.status == A.STATE.STATUS.DISABLED) { // 333
               wx.hideLoading();
               A.showTipModal(res.info || A.DF.MSG.RES_333, () => {
                 A.G('reLaunch:////pages/login/login?upidentity=2')
               })
               return
            } else if (res.status == A.STATE.STATUS.AUTH) { // 505
               A.goPrower();
               return;
            } else {
               resolve(res);
            }
         }, err => {
            wx.hideLoading();
            reject(err);
         });
      })
   },
   ...appsercie,
   ...userPower,
   ...register,
   ...myShopIdentity,
   ...myShopIndex,
   ...myShopSetting,
   ...myShopAuth,
   ...myShopQrCode,
   ...myShopOrder,
   ...myShopWallet,
   ...myShopStaffWallet,
   ...myShopBusinessSchool,
   ...myShopMsgCenter,
   ...myShopGoodManagement,
   ...myShopGroupMessages,
   ...myShopAnnualFee,
   ...myShopStaff,
   ...myShopSubAccount,
   ...myShopFreight,
   ...myShopEvaluation,
   ...myShopFans,
   ...myShopBusinessAlliance,
   ...myShopSpecialCard,
  ...marketAssistant,
  ...actDetail,
  ...marketingData,
  ...brandCenter
}