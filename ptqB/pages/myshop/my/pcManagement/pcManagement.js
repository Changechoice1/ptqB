const A = getApp();
Page(A.assignPage({
    data: {
        url: 'http://www.pintuanqu.cn/Store'
    },
    // 复制路径到剪贴板
    onload: function(){
       // 关闭分享功能
       wx.hideShareMenu();
    },
    copyUrl() {
        const _that = this,
            _d = _that.data;
        wx.setClipboardData({
            data: _d.url,
            success: function(res) {
                // _that.setData({
                //     tipEle: _that.selectComponent("#diyModal"),
                //     tipText: '已复制到剪贴板，可以去粘贴了',
                //     tipHideCancel: true,
                //     tipSuccess: 'hideDiyModal',
                //     tipConfirmText: '我知道了'
                // });
                // _d.tipEle.showDialog();
            }
        })
    },
    // 隐藏提示框
    hideDiyModal: function() {
        this.data.tipEle.hideDialog();
    }
}))