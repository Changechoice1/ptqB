module.exports = {
    showToast(opts) {
      this.selectComponent("#compage").showToast(opts);
    },
    hideToast() {
      this.selectComponent("#compage").hideToast();
    },
    showModal(opts) {
      this.selectComponent("#compage").showModal(opts);
    },
    hideModal() {
      this.selectComponent("#compage").hideModal();
    },
   showBaseModal(opt1, opt2, opt3, opt4) {
      this.selectComponent("#compage").showBaseModal(opt1, opt2, opt3, opt4);
   },
   showTipModal(opt1, opt2) {
      this.selectComponent("#compage").showTipModal(opt1, opt2);
   },
   showDiyModal(opt1, opt2) {
      this.selectComponent("#compage").showDiyModal(opt1, opt2);
   }
};