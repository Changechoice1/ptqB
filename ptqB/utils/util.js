const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day].map(formatNumber).join('-')
}
const minTime = date => {
    const hour = date.getHours()
    const minute = date.getMinutes()
    return [hour, minute]
}

const formatTime18 = date => {
    const year = Number(date.getFullYear()) - 18
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 直接输出倒计时封装
const dayTime = bb => {
    var bb = bb
    var day = parseInt(bb / 86400);
    var time = parseInt((bb - (day * 86400)) / 3600);
    var min = parseInt((bb - (time * 3600 + day * 86400)) / 60)
    var sinTime = time * 3600 + min * 60 + day * 86400
    var sinTimeb;
    var sin1 = parseInt((bb - sinTime))
    var thisTime = addEge(day) + "天" + addEge(time) + ":" + addEge(min) + ":" + addEge(sin1);
    bb <= 0 ? thisTime = "0天00:00:00" : thisTime
    return thisTime
}
const addEge = a => {
    return a < 10 ? a = "0" + a : a = a
}
// 输出数组倒计时封装
const dayTimeArr = bb => {
    var bb = bb
    var day = parseInt(bb / 86400);
    var time = parseInt((bb - (day * 86400)) / 3600);
    var min = parseInt((bb - (time * 3600 + day * 86400)) / 60)
    var sinTime = time * 3600 + min * 60 + day * 86400
    var sinTimeb;
    var sin1 = parseInt((bb - sinTime))
    var timeArr = [addEge(day), addEge(time), addEge(min), addEge(sin1)];
    if (bb <= 0) {
        timeArr = ["00", "00", "00", "00"];
    }
    return timeArr
}
// 检测当前机型的长宽
const nowPhoneWH = () => {
    var a = []
    var res = wx.getSystemInfoSync()
    a[0] = res.windowWidth;
    a[1] = res.windowHeight;
    return a
}
module.exports = {
    formatTime,
    dayTime,
    dayTimeArr,
    nowPhoneWH,
    formatTime18,
    formatNumber,
    minTime,
}