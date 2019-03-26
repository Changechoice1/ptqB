//发起支付请求
const P = _obj => {
   wx.requestPayment(_obj);
}
module.exports = P;