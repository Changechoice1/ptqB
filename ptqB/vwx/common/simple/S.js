import getParentPage from './getParentPage.js'
//数据交互提示
const S = {
   toast: _obj => {
      getParentPage(0).wToast(_obj);
   },
   OK: _obj => {
      let _o = {
         icon: 'success',
         duration: 3000,
      }
      Object.assign(_o, _obj);
      wx.showToast(_o);
   },
   loading: _obj => {
      let _o = {
         title: 'loading.'
      }
      if (_obj) Object.assign(_o, _obj);
      wx.showLoading(_o)
   },
   showModal: _obj => {
      wx.showModal(_obj);
   },
   showActionSheet: _obj => {
      wx.showActionSheet(_obj);
   },
   showToast: _obj => {
      wx.showToast(_obj);
   }
}
module.exports = S;