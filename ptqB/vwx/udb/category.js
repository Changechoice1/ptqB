// 保存服务端不太常更新的接口数据
// 如类别信息等
module.exports = {
    // 获取所有数据
    get val() {
        return wx.getStorageSync('s_category');
    },
    // 设置所有数据数据（可用于初始化数据）
    set val(_val) {
        wx.setStorageSync('s_category', _val)
    },
    // 设置接口数据值，_key为接口地址
    set(_key, _val) {
        var _data = wx.getStorageSync('s_category') || {};
        _data[_key] = _val;
        this.val = _data;
    },
    // 查询接口数据
    selector(_val) {
        var _data = wx.getStorageSync('s_category');
        if (_data) {
            return _data[_val];
        } else {
            return false;
        }
    }
}