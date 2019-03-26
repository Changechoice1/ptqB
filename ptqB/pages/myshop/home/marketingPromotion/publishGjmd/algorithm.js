module.exports = {
  calc: function (simulateAmount, cashBackAmount){
    let data = {};
    let totalAmount, cusNum, voucherNum, maxNum, totalCashAmount, freeAmount, average;
    let times = Math.ceil(100 / cashBackAmount);
    if (simulateAmount){
      simulateAmount = Number(simulateAmount), cashBackAmount = Number(cashBackAmount) / 100;
      maxNum = 15;
      cusNum = '10-15';
      // totalAmount = simulateAmount;
      totalAmount = Math.ceil(simulateAmount);//总金额向上取整
      totalCashAmount = Math.ceil(simulateAmount * cashBackAmount);
      // freeAmount = Math.ceil(simulateAmount * (1 - cashBackAmount));
      freeAmount = Math.ceil(totalAmount - totalCashAmount);
      voucherNum = 10;
      average = (freeAmount / voucherNum).toFixed(2);
    }
    data = [
      [{
        title: '总刮奖次数',
        unit: '（次）',
        value: maxNum || '无'
      }, {
        title: '可以吸引客源数',
        unit: '（人）',
        value: cusNum || '无'
      }],
      [{
        title: '奖金池总金额',
        unit: '（元）',
        value: totalAmount || '无'
      },{
        title: '前5次刮奖现金红包总额',
        unit: '（元）',
        value: totalCashAmount || '无'
      }, {
        title: '代金券发放总额',
        unit: '（元）',
        value: freeAmount || '无'
      }],
      [{
        title: '代金券发送数量',
        unit: '（张）',
        value: voucherNum || '无'
      }, {
        title: '代金券平均金额',
        unit: '（元）',
        value: average || '无'
      }]
    ];
    return data;
  }
}