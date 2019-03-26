var options = {
  data: [],
  legend: '{b}',
  chartRatio: 0,
  style: null,
  showLegend: false,//是否显示图例 比如：xx:23%
  showLabel: false,//是否显示底部注释
  animation: false,
  showTooltip: false,
  tooltip: '{b}',//点击某块是否显示数据
  area: false,//区域是否填充颜色
	showArc:false,//是否显示目标点
	lineColor:'',//蜘蛛网线条颜色雷达图
	xLabel: [],
	centerTxt:{}, 
	noData:false
};
//v1, wcPNAjO2, V3：context, width, height
function initChart(v1, wcPNAjO2, V3) {
	//this[options][style]
  switch (this["\x6f\x70\x74\x69\x6f\x6e\x73"]["\x73\x74\x79\x6c\x65"]) {
		//pie饼状图
    case '\x70\x69\x65':
      {
        A(this, v1, wcPNAjO2, V3);
        break
      }
			//rose玫瑰图
    case '\x72\x6f\x73\x65':
      {
        B(this, v1, wcPNAjO2, V3);
        break
      }
			//line折线图
    case '\x6c\x69\x6e\x65':
      {
        C(this, v1, wcPNAjO2, V3);
        break
      }
			//ring环状图
    case '\x72\x69\x6e\x67':
      {
        D(this, v1, wcPNAjO2, V3);
        break
      }
			//radar雷达图
    case '\x72\x61\x64\x61\x72':
      {
			
        E(this, v1, wcPNAjO2, V3);
				
        break
      }
			//buble气泡图
    case '\x62\x75\x62\x62\x6c\x65':
      {
        F(this, v1, wcPNAjO2, V3);
        break
      }
			//bar柱状图
    case '\x62\x61\x72':
      {
        G(this, v1, wcPNAjO2, V3);
        break
      }
    default:
      break
  }
}
var barDesc = {};

function G(that, context, width, height) {
  let param = that.options;
  const barwidth = width || 200;
  const barheight = height || 200;
  const fontSize = 10;
  const textMinMargin = fontSize / 2;
  const textAxisMargin = fontSize / 2;
  const textRowMargin = fontSize / 4;
  const xWordsCnt = 4;
  const xRows = 2;
  const pdLeft = fontSize * 4 + textAxisMargin;
  const pdBottom = (fontSize + textRowMargin) * xRows + textAxisMargin;
  const pdRight = xWordsCnt * fontSize / 2;
  const pdTop = 15;
  const x0 = pdLeft;
  const y0 = barheight - pdBottom;
  const baseColor = '#333333';
  const time = param.animTime || 1000;
  const bars = param.data || [];
  const xLabel = param.xLabel || [];
  const rectStyle = param.rectStyle;
  const advisedYCnt = 6;
  const accum = param.accum || false;
  let accumArr = new Array();
  for (let i = 0; i < bars.length; i++) {
    for (let j = 0; j < bars[i].data.length; j++) {
      accumArr[j] = 0
    }
  }
  if (rectStyle == 'accum') {
    function Gs(valueArray, color, length, xDesc, yDesc) {
      context.setFillStyle(color);
      let curX = x0;
      let curY = y0;
      let X1, y1, Y1;
      let rectwidth = 15;
      curX = x0 + xDesc.startPosOffset - 0.5 * rectwidth;
      context.beginPath();
      context.setGlobalAlpha(1);
      for (let i = 0; i < length; i++) {
        curY = ((valueArray[i] - yDesc.bottom) / yDesc.range) * (barheight - pdTop - pdBottom);
        X1 = curX;
        y1 = curY;
        curX += xDesc.span;
        Y1 = barheight - y1 - pdBottom - accumArr[i];
        context.rect(X1, Y1, rectwidth, y1);
        context.fill();
        accumArr[i] += curY
      }
      context.closePath()
    }
    var YArray = new Array();
    let bar_length = bars[0].data.length;
    for (let i = 0; i < bar_length; i++) {
      YArray[i] = 0
    }
    for (let i = 0; i < bars.length; i++) {
      for (let j = 0; j < YArray.length; j++) {
        YArray[j] += bars[i].data[j]
      }
    }
    let maxarr = YArray[0];
    for (let i = 1; i < YArray.length; i++) {
      if (YArray[i] > maxarr) {
        maxarr = YArray[i]
      }
    }
    let sumArr = [].concat(...bars.map(function(val) {
      return val.data
    }));
    let yAxis = new YAxis({
      height: (barheight - pdTop - pdBottom),
      width: pdLeft,
      originX: x0,
      originY: y0,
      context: context,
      dataArray: sumArr,
      max: maxarr,
      min: 0
    });
    yAxis.draw();
    let xAxis = new XAxis({
      height: pdBottom,
      width: (width - pdRight - pdLeft),
      originX: x0,
      originY: y0,
      context: context,
      dataArray: xLabel,
      optional: {
        rowWordsCnt: 3,
        startPadding: 50,
        endPadding: 50
      }
    });
    xAxis.draw();
    let xDesc = xAxis.getDescriptor(),
      yDesc = yAxis.getDescriptor();
    for (let i = 0; i < bars.length; i++) {
      Gs(bars[i].data, bars[i].color, xLabel.length, xDesc, yDesc)
    }
    barDesc = {
      xDesc: xDesc,
      yDesc: yDesc,
      paddingLeft: pdLeft,
      paddingRight: pdRight,
      paddingTop: pdTop,
      paddingBottom: pdBottom,
    }
  } else {
    let total_width = 20;

    function Gs(valueArray, color, length, xDesc, yDesc) {
      context.setFillStyle(color);
      let curX = x0;
      let curY = y0;
      let x1, y1;
      let rectwidth = total_width / bars.length;
      curX = x0 + xDesc.startPosOffset - 0.5 * total_width;
      context.beginPath();
      context.setGlobalAlpha(1);
      for (let i = 0; i < length; i++) {
        curY = ((valueArray[i] - yDesc.bottom) / yDesc.range) * (barheight - pdTop - pdBottom);
        x1 = curX;
        y1 = curY;
        curX += xDesc.span;
        context.rect(x1, barheight - y1 - pdBottom, rectwidth, y1);
        context.fill()
      }
      context.closePath()
    }
    let sumArr = [].concat(...bars.map(function(val) {
      return val.data
    }));
    let yAxis = new YAxis({
      height: (barheight - pdTop - pdBottom),
      width: pdLeft,
      originX: x0,
      originY: y0,
      context: context,
      dataArray: sumArr,
    });
    yAxis.draw();
    let xAxis = new XAxis({
      height: pdBottom,
      width: (width - pdRight - pdLeft),
      originX: x0,
      originY: y0,
      context: context,
      dataArray: xLabel,
      optional: {
        rowWordsCnt: 3,
        startPadding: 50,
        endPadding: 50
      }
    });
    xAxis.draw();
    let xDesc = xAxis.getDescriptor(),
      yDesc = yAxis.getDescriptor();
    let j = total_width / bars.length;
    for (let i = 0; i < bars.length; i++) {
      Gs(bars[i].data, bars[i].color, xLabel.length, xDesc, yDesc);
      xDesc.startPosOffset += j
    }
    barDesc = {
      xDesc: xDesc,
      yDesc: yDesc,
      paddingLeft: pdLeft,
      paddingRight: pdRight,
      paddingTop: pdTop,
      paddingBottom: pdBottom,
    }
  }
  context.draw();
}
//雷达图
function E(that, context, width, height) {

	const radar = that;
	if (radar.options.data == undefined || radar.options.xLabel == undefined) {
    context.draw();
    return
  }
	//标签数量即：多边形 边的数量
	var length = radar.options.xLabel.length;
  if (length <= 2) {
    context.draw();
    return
  }
	//图标缩放比例
  var ratio = 0.8;
	if (radar.options.chartRatio > 0 && radar.options.chartRatio <= 1) ratio = radar.options.chartRatio;
	//取宽高中最小值
  var small = width > height ? height : width;
  var radius = small * ratio / 2.0;
  var center = {
    x: width / 2.0,
    y: height / 2.0
  };
  var angle = Math.PI * 2 / length;
  var step = 1;
	//动画速度
	var MaxStep = radar.options.animation ? 90 : 1;
	const xLabel = radar.options.xLabel;
	const lineColor = radar.options.lineColor;
	const showArc = radar.options.showArc;
	const area = radar.options.area;
	const radarData = radar.options.data;
	const centerTxt = radar.options.centerTxt;
  var animation = function() {
    if (step <= MaxStep) {
      for (var layer = 5; layer > 0; layer--) {
        context.beginPath();
        context.setGlobalAlpha(1);
				//所绘线条颜色
				context.setStrokeStyle(lineColor);
				//线条区域填充颜色
        if (layer % 2 != 0) {
          context.setFillStyle("white")
        } else {
					context.setFillStyle("white")
        }
        var currentRad = layer / 5 * radius;
        context.moveTo(center.x, center.y - currentRad);
        var currentAngle = -Math.PI / 2;
				//绘制多边形线条  蜘蛛网
        for (var i = 0; i < length; i++) {
          context.lineTo(center.x + currentRad * Math.cos(currentAngle), center.y + currentRad * Math.sin(currentAngle));
          currentAngle += angle
        }
        context.fill();
        context.closePath();
        context.stroke();
      }
      context.beginPath();
      var currentAngle = -Math.PI / 2;
			//绘制每个角的中线
      for (var i = 0; i < length; i++) {
        context.moveTo(center.x + radius * Math.cos(currentAngle), center.y + radius * Math.sin(currentAngle));
        context.lineTo(center.x, center.y);
        currentAngle += angle;
      }
      context.closePath();
      context.stroke();
      context.beginPath();
			//label字体颜色
      context.setFillStyle("#666666");
      context.setFontSize(12);
      var currentAngle = -Math.PI / 2;
			//绘制标签及所在位置
      for (let i = 0; i < length; i++) {
        var posX = center.x + radius * Math.cos(currentAngle);
        var posY = center.y + radius * Math.sin(currentAngle);
        // if (posX < center.x) context.setTextAlign("right");
        // else context.setTextAlign("left");
        // if (posY > center.y) context.setTextBaseline("top");
        // else context.setTextBaseline("bottom");
				context.setTextAlign("center");
				var curX,curY;
				if (posX < center.x){
					curX = posX - 30
				}else{
					if(i== 0){
						curX = posX
					}else{
						curX = posX + 30
					}
				}
				if (posY > center.y){
					curY = posY + 40
				}else{
					if(i!=0){
						curY = posY+10
					}else{
						curY = posY -10
					}
				}
				context.setFontSize(12);
				context.setFillStyle("#666666");
				context.fillText(xLabel[i].name, curX, curY);
				if (xLabel[i].value){
					context.setTextAlign("center");
					context.setFillStyle("#333333");
					context.setFontSize(16);
					context.fillText(xLabel[i].value, curX, curY - 20);
				}
        currentAngle += angle
      }
      context.closePath();
			var MaxValue = Math.max.call(null, radarData[0].value[0]);
			var MinValue = Math.min.call(null, radarData[0].value[0]);
			radarData[0].value.forEach(function(val) {
        var temp = Math.max.call(null, val);
				var temp1 = Math.min.call(null, val);
        if(temp > MaxValue) MaxValue = temp;
				if(temp1 < MinValue) MinValue = temp1;
      });
			
      if (MaxValue > 10) {
        MaxValue = Math.ceil(MaxValue / 10) * 10
      }
			const MaxValues = MaxValue;
			let yValue = [];//存储点的y坐标值
			//绘制目标多边形区域

			context.beginPath();
			radarData.forEach(function(val) {
        context.setStrokeStyle(val.color);
				var currentRad = radius * val.value[0] / MaxValues * step / MaxStep;
        context.moveTo(center.x, center.y - currentRad);
				var currentAngle = -Math.PI / 2;
        for (var i = 0; i < length; i++) {
					// if (val.value[i] < 60) val.value[i]=60;
					currentRad = radius * val.value[i] / MaxValues * step / MaxStep;
          context.lineTo(center.x + currentRad * Math.cos(currentAngle), center.y + currentRad * Math.sin(currentAngle));
					//绘制目标点
					// if (showArc){
					// 	context.arc(center.x + currentRad * Math.cos(currentAngle), center.y + currentRad * Math.sin(currentAngle) , 2, 0, 2 * Math.PI);
					// }
          currentAngle += angle;
					let y = (center.y + currentRad * Math.sin(currentAngle));
					yValue.push(y);
        }
				currentRad = radius * val.value[0] / MaxValues * step / MaxStep;
        context.lineTo(center.x, center.y - currentRad);
        context.stroke();
			});

			//绘制区域填充渐变色
			if (area) {
				//取y的最大、最小值，设置渐变范围
				var MaxValue = Math.max.call(null, yValue[0]);
				var MinValue = Math.min.call(null, yValue[0]);
				yValue.forEach(function (val) {
					var temp = Math.max.call(null, val);
					var temp1 = Math.min.call(null, val);
					if (temp > MaxValue) MaxValue = temp;
					if (temp1 < MinValue) MinValue = temp;
				});
				const grd = context.createLinearGradient(center.x, MaxValue, center.x, MinValue)
				grd.addColorStop(0, '#FE2E55');
				grd.addColorStop(1, '#FB4217');
				context.setFillStyle(grd);
				context.setGlobalAlpha(0.75);
				context.fill();
				context.draw();
				if (centerTxt.txt1) {
					context.setFontSize(10);
					context.setFillStyle("#ffffff");
					context.setGlobalAlpha(1);
					context.fillText(centerTxt.txt1, center.x, center.y);
					context.fillText(centerTxt.txt2, center.x, center.y + 15);
				}
				context.stroke();
			}
			context.closePath();
      context.draw(true);
      step++
    } else {
      clearInterval(aniName)
    }
  };
  var aniName = setInterval(animation, 10)
}
function getRads(deg){
	return (Math.PI * deg)/180;
}
//环状图
function D(that, context, width, height) {
  if (that.options.data == undefined) {
    context.draw();
    return
  }
  var ratio = width > height ? 0.8 : 0.5;
  if (!that.options.showLegend) ratio = 1;
  if (that.options.chartRatio > 0 && that.options.chartRatio <= 1) ratio = that.options.chartRatio;
  var small = width > height ? height : width;
  var radius = small * ratio / 2.0;
  var center = {
    x: width / 2.0,
    y: height / 2.0
  };
  var total = 0;
  that.options.data.forEach(function(val) {
    total += val.value
  });
  var step = 1;
  var MaxStep = that.options.animation ? 50 : 1;
	const noData = that.options.noData;
	const ringData = that.options.data;
	const showLegend = that.options.showLegend;
	const legend = that.options.legend;
  var animationD = function() { 
    if (step <= MaxStep) {
      var start = 0;
			// if(noData){
			// 	context.beginPath();
			// 	context.setFillStyle('#ffffff');
			// 	context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
			// 	context.fill();
			// 	context.setLineWidth(5);
			// 	const grd = context.createLinearGradient(center.x + radius, center.y, center.x, center.y - radius)
			// 	grd.addColorStop(0, '#FF4A4A');
			// 	grd.addColorStop(0.25, '#7B9CFA');
			// 	grd.addColorStop(0.5, '#FF6C92');
			// 	grd.addColorStop(0.75, '#FFA3F1');
			// 	grd.addColorStop(1, '#FFA82A');
			// 	context.setStrokeStyle(grd);
			// 	context.setGlobalAlpha(0.75);
			// 	context.stroke();
			// 	context.closePath();

			// }
			// else{
				ringData.forEach(function (val, idx) {
					context.beginPath();
					context.arc(center.x, center.y, radius, start, start + val.value / MaxStep * step / total * 2 * Math.PI, false);
					context.setLineWidth(1);
					context.lineTo(center.x, center.y);
					context.setStrokeStyle("#ffffff");
					context.setFillStyle(val.color);
					context.fill();
					context.closePath();
					context.stroke();
					context.beginPath();
					context.setFillStyle("#ffffff");
					//radius * 0.9 控制弧径宽度
					context.arc(center.x, center.y, radius * 0.88, start, start + val.value / MaxStep * step / total * 2 * Math.PI, false);
					context.lineTo(center.x, center.y);
					context.fill();
					context.closePath();
					start += val.value / MaxStep * step / total * 2 * Math.PI;
					if (val.value > 0 && showLegend) {
						var midRad = start - val.value / total * Math.PI;
						var posX = center.x + radius * Math.cos(midRad);
						var posY = center.y + radius * Math.sin(midRad);
						context.beginPath();
						context.setLineWidth(2);
						context.setStrokeStyle(val.color);
						context.moveTo(posX, posY);
						posX = posX + small * 0.05 * Math.cos(midRad);
						posY = posY + small * 0.05 * Math.sin(midRad);
						context.lineTo(posX, posY);
						posX = posX + small * 0.05 * Math.cos(midRad);
						context.lineTo(posX, posY);
						context.setFillStyle(val.color);
						context.setFontSize(14);
						context.setTextBaseline("middle");
						if (posX < center.x) {
							context.setTextAlign("right")
						} else {
							context.setTextAlign("left")
						}
						if (legend === undefined) {
							that.options.legend = '{b}'
						}
						var txt = legend.replace(/{b}/g, val.value);
						txt = txt.replace(/{a}/g, val.name);
						txt = txt.replace(/{c}/g, (val.value / total * 100).toFixed(2) + '%');
						context.fillText(txt, posX, posY);
						context.stroke();
						context.closePath();
					}
				});
			// }
			//绘制总计数量及弧度长方形---中心
			context.beginPath();
			let text = '';
			if (noData){
				text ="暂无数据"
			}else{
				text = total
			}
			const metrics = context.measureText(text)
			let wid = metrics.width/2 + 10;
			context.setFillStyle('#f7f7f7');
			context.moveTo(center.x - wid, center.y);
			context.arc(center.x - wid, center.y , 10, 0.5 * Math.PI, 1.5 * Math.PI);
			context.lineTo(center.x + wid, center.y -10);
			context.arc(center.x + wid, center.y , 10, 1.5 * Math.PI, 0.5 * Math.PI);
			context.lineTo(center.x - wid, center.y + 10);
			context.fill();
			context.closePath();
			context.setFontSize(14);
			context.setFillStyle("#E60012");
			context.setTextAlign("center")
			if (noData){
				context.fillText(text, center.x, center.y + 5);
			}else{
				context.fillText(total, center.x, center.y + 5);
			}
			context.setFillStyle("#ffffff");

      context.draw();
      step++
    } else {
      clearInterval(aniNameD)
    }
  };
	var aniNameD = setInterval(animationD, 10)
}

function B(that, context, width, height) {
  if (that.options.data == undefined) {
    context.draw();
    return
  }
  var ratio = width > height ? 0.8 : 0.5;
  if (!that.options.showLegend) ratio = 1;
  if (that.options.chartRatio > 0 && that.options.chartRatio <= 1) ratio = that.options.chartRatio;
  var small = width > height ? height : width;
  var radius = small * ratio / 2.0;
  var center = {
    x: width / 2.0,
    y: height / 2.0
  };
  var maxValue = that.options.data[0].value;
  var total = 0;
  that.options.data.forEach(function(val) {
    total += val.value;
    maxValue = Math.max(maxValue, val.value)
  });
  var step = 1;
  var MaxStep = that.options.animation ? 50 : 1;
  var animation = function() {
    if (step <= MaxStep) {
      var start = 0;
      that.options.data.forEach(function(val, idx) {
        context.beginPath();
        context.arc(center.x, center.y, radius * val.value / MaxStep * step / maxValue, start, start + 2 * Math.PI / that.options.data.length, false);
        context.setLineWidth(1);
        context.lineTo(center.x, center.y);
        context.setStrokeStyle("#ffffff");
        context.setFillStyle(val.color);
        context.fill();
        context.closePath();
        context.stroke();
        start += 2 * Math.PI / that.options.data.length;
        if (val.value > 0 && that.options.showLegend) {
          var midRad = start - Math.PI / that.options.data.length;
          var posX = center.x + radius * val.value / MaxStep * step / maxValue * Math.cos(midRad);
          var posY = center.y + radius * val.value / MaxStep * step / maxValue * Math.sin(midRad);
          context.beginPath();
          context.setLineWidth(2);
          context.setStrokeStyle(val.color);
          context.moveTo(posX, posY);
          posX = posX + small * 0.05 * Math.cos(midRad);
          posY = posY + small * 0.05 * Math.sin(midRad);
          context.lineTo(posX, posY);
          posX = posX + small * 0.05 * Math.cos(midRad);
          context.lineTo(posX, posY);
          context.setFontSize(14);
          context.setTextBaseline("middle");
          if (posX < center.x) {
            context.setTextAlign("right")
          } else {
            context.setTextAlign("left")
          }
          if (that.options.legend === undefined) {
            that.options.legend = '{b}'
          }
          var txt = that.options.legend.replace(/{b}/g, val.value);
          txt = txt.replace(/{a}/g, val.name);
          txt = txt.replace(/{c}/g, (val.value / total * 100).toFixed(2) + '%');
          context.fillText(txt, posX, posY);
          context.stroke();
          context.closePath()
        }
      });
      context.draw();
      step++
    } else {
      clearInterval(aniName)
    }
  };
  var aniName = setInterval(animation, 10)
}

function A(that, context, width, height) {
  if (that.options.data == undefined) {
    context.draw();
    return
  }
  var ratio = width > height ? 0.8 : 0.5;
  if (!that.options.showLegend) ratio = 1;
  if (that.options.chartRatio > 0 && that.options.chartRatio <= 1) ratio = that.options.chartRatio;
  var small = width > height ? height : width;
  var radius = small * ratio / 2.0;
  var pieCenter = {
    x: width / 2.0,
    y: height / 2.0
  };
  var total = 0;
  that.options.data.forEach(function(val) {
    total += val.value
  });
  var step = 1;
  var MaxStep = that.options.animation ? 50 : 1;
  var animation = function() {
    if (step <= MaxStep) {
      var start = 0;
      that.options.data.forEach(function(val, idx) {
        context.beginPath();
        context.arc(pieCenter.x, pieCenter.y, radius, start, start + val.value / MaxStep * step / total * 2 * Math.PI, false);
        context.setLineWidth(1);
        context.lineTo(pieCenter.x, pieCenter.y);
        context.setStrokeStyle("#ffffff");
        context.setFillStyle(val.color);
        context.fill();
        context.closePath();
        context.stroke();
        start += val.value / MaxStep * step / total * 2 * Math.PI;
        if (val.value > 0 && that.options.showLegend) {
          var midRad = start - val.value / total * Math.PI;
          var posX = pieCenter.x + radius * Math.cos(midRad);
          var posY = pieCenter.y + radius * Math.sin(midRad);
          context.beginPath();
					
          context.setLineWidth(2);
          context.setStrokeStyle(val.color);
          context.moveTo(posX, posY);
          posX = posX + small * 0.05 * Math.cos(midRad);
          posY = posY + small * 0.05 * Math.sin(midRad);
          context.lineTo(posX, posY);
          posX = posX + small * 0.05 * Math.cos(midRad);
          context.lineTo(posX, posY);
          context.setFontSize(14);
          context.setTextBaseline("middle");
          if (posX < pieCenter.x) {
            context.setTextAlign("right")
          } else {
            context.setTextAlign("left")
          }
          if (that.options.legend === undefined) {
            that.options.legend = '{b}'
          }
          var txt = that.options.legend.replace(/{b}/g, val.value);
          txt = txt.replace(/{a}/g, val.name);
          txt = txt.replace(/{c}/g, (val.value / total * 100).toFixed(2) + '%');
          context.fillText(txt, posX, posY);
          context.stroke();
          context.closePath()
        }
      });
      context.draw();
      step++
    } else {
      clearInterval(aniName)
    }
  };
  var aniName = setInterval(animation, 10)
}

function Axis(param) {
  if (!param.optional) param.optional = {};
  this.width = param.width;
  this.height = param.height;
  this.canvasContext = param.context;
  this.dataArray = param.dataArray;
  this.max = param.max;
  this.min = param.min;
  this.originX = param.originX;
  this.originY = param.originY;
	this.baseColor = param.optional.color || '#F19EA6';
  this.lineWidth = param.optional.lineWidth || 1;
  this.shortLineLength = 4;
  this.fontSize = param.optional.fontSize || 10;
  this.orientation = param.orientation || 'horizontal';
  this.dataType = param.dataType || 'string';
  this.textAxisMargin = this.fontSize / 2;
  this.textMargin = this.fontSize / 2;
  this.rowWordsCnt = param.optional.rowWordsCnt ? param.optional.rowWordsCnt : this.orientation == 'horizontal' ? 2 : parseInt((this.width - this.lineWidth / 2 - this.textAxisMargin) / this.fontSize) || 1;
  this.rowMargin = this.fontSize / 4;
  this.startPadding = param.optional.startPadding || 0;
  this.endPadding = param.optional.endPadding || 0;
  this.textWidth = this.orientation == 'horizontal' ? this.fontSize * this.rowWordsCnt : this.width - this.lineWidth / 2 - this.textAxisMargin;
  this.rowCnt = param.optional.rowCnt ? param.optional.rowCnt : this.orientation == 'horizontal' ? parseInt((this.height - this.lineWidth / 2 - this.textAxisMargin + this.rowMargin) / (this.fontSize + this.rowMargin)) || 1 : 1;
  this.textHeight = this.orientation == 'horizontal' ? this.height - this.lineWidth / 2 - this.textAxisMargin : (this.fontSize + this.rowMargin) * this.rowCnt - this.rowMargin
}
Axis.prototype.getDescriptor = function() {
  if (this.descriptor) {
    return this.descriptor
  }
  let totalLength = (this.orientation == 'horizontal' ? this.width : this.height) - this.startPadding - this.endPadding;
  const desc = {};
  if (this.dataType == 'number') {
    let max = 0;
    let min = 0;
    if (this.max != undefined && this.min != undefined) {
      max = this.max;
      min = this.min
    } else if (this.dataArray && this.dataArray.length) {
      max = Math.max(...this.dataArray);
      min = Math.min(...this.dataArray)
    }
    if (max == min && max == 0) {
      return false
    }
    const cnt = this.orientation == 'horizontal' ? parseInt(totalLength / (this.textWidth + this.textMargin)) || 1 : parseInt(totalLength / (this.textHeight + this.textMargin)) || 1;
    let mStep = min >= 0 ? max / cnt : max <= 0 ? -min / cnt : (max - min) / cnt;
    let pow3 = Math.floor(Math.log10(mStep));
    if (mStep < 1) {
      mStep *= Math.pow(10, -pow3)
    }
    let divisor = Math.pow(10, pow3 > 0 ? pow3 : 0);
    let div = mStep / divisor;
    let mod = mStep % divisor;
    desc.step = mod > divisor / 2 ? Math.ceil(div) : mod == 0 ? Math.floor(div) : Math.floor(div) + 0.5;
    desc.step *= Math.pow(10, pow3);
    if (pow3 < 0) desc.fixedPoint = 1 - pow3;
    if (min >= 0) {
      desc.cnt = 1;
      desc.top = desc.step;
      while (desc.top < max) {
        desc.top += desc.step;
        desc.cnt++
      }
      desc.bottom = 0
    } else if (max <= 0) {
      desc.top = 0;
      desc.cnt = 1;
      desc.bottom = -desc.step;
      while (desc.bottom > min) {
        desc.bottom -= desc.step;
        desc.cnt++
      }
    } else {
      desc.cnt = 2;
      desc.top = desc.step;
      while (desc.top < max) {
        desc.top += desc.step;
        desc.cnt++
      }
      desc.bottom = -desc.step;
      while (desc.bottom > min) {
        desc.bottom -= desc.step;
        desc.cnt++
      }
    }
    desc.range = desc.top - desc.bottom;
    desc.space = totalLength / desc.cnt;
    desc.startPosOffset = this.startPadding
  } else if (this.dataType == 'string') {
    if (!this.dataArray || !this.dataArray.length || this.dataArray.length == 1) {
      desc.step = 1;
      desc.span = totalLength;
      desc.startPosOffset = totalLength / 2
    } else {
      desc.span = totalLength / (this.dataArray.length - 1);
      desc.step = this.orientation == 'horizontal' ? Math.ceil((this.textWidth + this.textMargin) / desc.span) : Math.ceil((this.textHeight + this.textMargin) / desc.span);
      desc.startPosOffset = this.startPadding
    }
  }
  desc.endPadding = this.endPadding;
  this.descriptor = desc;
  return desc
};
Axis.prototype.draw = function() {
  if (!this.width || !this.height || !this.canvasContext || (!this.originX && this.originX != 0) || (!this.originY && this.originY != 0)) {
    return
  }
  let context = this.canvasContext;
  let desc = this.getDescriptor();
  let x0 = this.originX,
    y0 = this.originY;
  context.save();
  context.setLineWidth(this.lineWidth);
  context.setFontSize(this.fontSize);
  context.setFillStyle(this.baseColor);
  context.setStrokeStyle(this.baseColor);
  context.setGlobalAlpha(1);
  if (this.orientation == 'horizontal') {
    context.beginPath();
		
    context.moveTo(x0, y0);
    context.lineTo(x0 + this.width, y0);
    context.stroke();
    context.setTextAlign('center');
    context.setTextBaseline('top')
  } else {
    context.beginPath();
		
    context.moveTo(x0, y0);
    context.lineTo(x0, y0 - this.height);
    context.stroke();
    context.setTextAlign('right');
    context.setTextBaseline('middle')
  }
  if (this.dataType == 'string') {
    context.beginPath();
    let curPos = this.orientation == 'horizontal' ? x0 + desc.startPosOffset : y0 - desc.startPosOffset;
    for (let i = 0; i * desc.step < this.dataArray.length; i++) {
      let name = this.dataArray[i * desc.step];
      let itNum = Math.ceil(name.length / this.rowWordsCnt);
      let rowNum = Math.min(itNum, this.rowCnt);
      let sPos = 0,
        ePos = 0;
      for (let j = 0; j < rowNum; j++) {
        ePos = sPos + this.rowWordsCnt;
        if (ePos > name.length) ePos = name.length;
        let text = '';
        if (j == rowNum - 1 && this.rowCnt < itNum) text = name.substring(sPos, ePos - 1) + '…';
        else text = name.substring(sPos, ePos);
        if (this.orientation == 'horizontal') {
          context.fillText(text, curPos, y0 + this.textAxisMargin + j * (this.fontSize + this.rowMargin))
        } else {
          context.fillText(text, x0 - this.textAxisMargin, curPos + j * (this.fontSize + this.rowMargin) - (rowNum - 1) * (this.fontSize + this.rowMargin) / 2)
        }
        sPos = ePos
      }
      if (this.orientation == 'horizontal') {
				
        context.moveTo(curPos, y0);
        context.lineTo(curPos, y0 - this.shortLineLength);
        curPos += desc.step * desc.span
      } else {
        context.moveTo(x0, curPos);
        context.lineTo(x0 + this.shortLineLength, curPos);
        curPos -= desc.step * desc.span
      }
      context.stroke()
    }
  } else if (this.dataType == 'number') {
    context.beginPath();
    if (desc) {
      for (let i = 0; i <= desc.cnt; i++) {
        let text = (desc.bottom + desc.step * i);
        if (desc.fixedPoint && text != 0) text = text.toFixed(desc.fixedPoint);
        let width0 = context.measureText(text).width;
        if (width0 > this.textWidth) {
          let tmp = new Number(text).toExponential(1);
          if (context.measureText(tmp).width < width0) {
            text = tmp
          }
        }
        if (this.orientation == 'horizontal') {
          context.fillText(text, x0 + desc.startPosOffset + desc.space * i, y0 + this.textAxisMargin);
					
          context.moveTo(x0 + desc.startPosOffset + desc.space * i, y0);
          context.lineTo(x0 + desc.startPosOffset + desc.space * i, y0 - this.shortLineLength)
        } else {
          context.fillText(text, x0 - this.textAxisMargin, y0 - desc.startPosOffset - desc.space * i);
					
          context.moveTo(x0, y0 - desc.startPosOffset - desc.space * i);
          context.lineTo(x0 + this.shortLineLength, y0 - desc.startPosOffset - desc.space * i)
        }
        context.stroke()
      }
    } else {
      if (this.orientation == 'horizontal') {
        context.fillText('0', x0 + desc.startPosOffset, y0 + this.textAxisMargin);
        context.moveTo(x0 + desc.startPosOffset, y0);
        context.lineTo(x0 + desc.startPosOffset, y0 - this.shortLineLength)
      } else {
        context.fillText('0', x0 - this.textAxisMargin, y0 - desc.startPosOffset);
        context.moveTo(x0, y0 - desc.startPosOffset);
        context.lineTo(x0 + this.shortLineLength, y0 - desc.startPosOffset)
      }
    }
  }
  context.restore()
};

function YAxis(param) {
  param.orientation = 'vertical';
  param.dataType == undefined ? (param.dataArray instanceof Array && param.dataArray.length > 0) ? param.dataType = typeof param.dataArray[0] : null : null;
  Axis.call(this, param)
}
YAxis.prototype = Axis.prototype;

function XAxis(param) {
  param.orientation = 'horizontal';
  param.dataType == undefined ? (param.dataArray instanceof Array && param.dataArray.length > 0) ? param.dataType = typeof param.dataArray[0] : null : null;
  Axis.call(this, param)
}
XAxis.prototype = Axis.prototype;
var lineDesc = {};

function C(that, context, _width, _height) {
  let param = that.options;
  const width = _width || 200;
  const height = _height || 200;
  const fontSize = 10;
  const xWordsCnt = 3;
  const xRows = 3;
  const lw = param.lineWidth || 1;
  const dotRadius = lw * 2;
  const pdLeft = fontSize * (4 + 0.5) + lw / 2;
  const pdBottom = fontSize * (1 + 0.25 + 0.5) * xRows + lw / 2;
  const pdRight = xWordsCnt * fontSize / 2;
  const pdTop = 15;
  const x0 = pdLeft;
  const y0 = height - pdBottom;
  const time = param.animTime || 1000;
  const lines = param.data || [];
  const xLabel = param.xLabel || [];
  const lineStyle = param.lineStyle || 'line';
  const area = param.area || false;

  function Cs(valueArray, color, length, xDesc, yDesc) {
    context.setFillStyle(color);
    context.setStrokeStyle(color);
    let curX = x0;
    curX = x0 + xDesc.startPosOffset;
    context.beginPath();
    context.setGlobalAlpha(1);
    let x1, y1;
    for (let i = 0; i < length; i++) {
      let curY = yDesc ? (1 - (valueArray[i] - yDesc.bottom) / yDesc.range) * (height - pdTop - pdBottom) + pdTop : height - pdBottom;
      curY = curY || 0;
      if (i == 0) {
        context.moveTo(curX, curY)
      } else {
        if (lineStyle == 'line') context.lineTo(curX, curY);
        else if (lineStyle == 'curve') context.bezierCurveTo(curX - xDesc.span / 2, y1, curX - xDesc.span / 2, curY, curX, curY)
      }
      x1 = curX;
      y1 = curY;
      curX += xDesc.span
    }
    context.stroke();
    if (area) {
      context.setGlobalAlpha(1);
			
      context.lineTo(curX - xDesc.span, height - pdBottom);
      context.lineTo(x0 + xDesc.startPosOffset, y0);
      context.fill();
    }
  }
  let sumArr = [].concat(...lines.map(function(val) {
    return val.data
  }));
  let yAxis = new YAxis({
    height: (height - pdTop - pdBottom),
    width: pdLeft,
    originX: x0,
    originY: y0,
    context: context,
    dataArray: sumArr,
    optional: {
      lineWidth: lw,
      fontSize: fontSize,
    }
  });
  yAxis.draw();
  let xAxis = new XAxis({
    height: pdBottom,
    width: (width - pdRight - pdLeft),
    originX: x0,
    originY: y0,
    context: context,
    dataArray: xLabel,
    optional: {
      lineWidth: lw,
      fontSize: fontSize,
      rowWordsCnt: xWordsCnt,
      rowCnt: xRows,
    }
  });
  xAxis.draw();
  let xDesc = xAxis.getDescriptor(),
    yDesc = yAxis.getDescriptor();
  for (let i = 0; i < lines.length; i++) {
    let length = Math.min(xLabel.length, lines[i].data.length);
    Cs(lines[i].data, lines[i].color, length, xDesc, yDesc)
  }
  context.draw();
  lineDesc = {
    xDesc: xDesc,
    yDesc: yDesc,
    paddingLeft: pdLeft,
    paddingRight: pdRight,
    paddingTop: pdTop,
    paddingBottom: pdBottom
  }
}
var bubble_coor = {};

function F(that, context, _width, _height) {
  if (that.options.data == undefined) {
    context.draw();
    return
  }
  let param = that.options;
  const width = _width || 200;
  const height = _height || 200;
  const fontSize = 10;
  const textMinMargin = fontSize / 2;
  const textAxisMargin = fontSize / 2;
  const textRowMargin = fontSize / 4;
  const xWordsCnt = 2;
  const xRows = 3;
  const lw = param.lineWidth || 1;
  const dotRadius = lw * 2;
  const pdLeft = fontSize * 4 + textAxisMargin;
  const pdBottom = (fontSize + textRowMargin) * xRows + textAxisMargin;
  const pdRight = xWordsCnt * fontSize / 2;
  const pdTop = 15;
  const x0 = pdLeft;
  const y0 = height - pdBottom;
  const data = param.data || [];
  const xLabel = param.xLabel || [];
  let ymin, ymax, numMin, numMax, item, obj, yLabel = [];
  let numArr = [];
  let bubleIndex = 0;
  let points = [];
  let r, h;
  if (!data.length) return;
  for (var i = 0; i < data.length; i++) {
    item = data[i];
    if (!item.value || !item.value.length) {
      data.splice(i--, 1);
      continue
    }
    item.name = item.name || 'unnamed';
    if (item.hide) continue;
    numArr = numArr.concat(item.value);
    yLabel = yLabel.concat(item.yLabel)
  }
  numMax = Math.max.apply(null, numArr);
  numMin = Math.min.apply(null, numArr);
  let yDis = height - pdTop - pdBottom;
  let xDis = width - pdRight - pdLeft;
  let yAxis = new YAxis({
    height: yDis,
    width: pdLeft,
    originX: x0,
    originY: y0,
    context: context,
    dataArray: yLabel
  });
  yAxis.draw();
  let padding = 20;
  let xAxis = new XAxis({
    height: pdBottom,
    width: xDis,
    originX: x0,
    originY: y0,
    context: context,
    dataArray: xLabel,
    optional: {
      rowWordsCnt: 2,
      startPadding: padding,
      endPadding: padding
    }
  });
  xAxis.draw();
  let xDesc = xAxis.getDescriptor();
  let yDesc = yAxis.getDescriptor();
  let xs = xDesc.span;
  ymin = yDesc.bottom;
  ymax = yDesc.top;
  for (var i = 0; i < data.length; i++) {
    item = data[i];
    if (!points[i]) {
      obj = Object.assign({}, {
        i: bubleIndex,
        isStop: true,
        create: true,
        hide: !!item.hide,
        name: item.name,
        color: item.color,
        hsl: item.hsl,
        data: []
      });
      let y = item.yLabel;
      for (var j = 0; j < Math.min.apply(null, [item.value.length, xLabel.length, y.length]); j++) {
        h = Math.floor((y[j] - ymin) / (ymax - ymin) * yDis);
        r = getRadius(numMax, numMin, item.value[j]);
        let point = {};
        point.value = item.value[j];
        point.h = h;
        point.p = h;
        point.x = j * xs + padding;
        point.y = h;
        point.radius = r;
        point.r = 0;
        obj.data.push(point)
      }
      points.push(obj);
      bubleIndex++
    }
  }

  function getRadius(numMax, numMin, num) {
    var r1 = Math.ceil(num / numMax * xs / 3);
    var r2 = Math.ceil(num / numMin * 2);
    return Math.max(r2 > xs / 2 ? r1 : r2, 1)
  }
  context.save();
  context.translate(x0, y0);
  let isStop = true;
  for (var i = 0, l = points.length; i < l; i++) {
    item = points[i];
    item.isStop = true;
    context.strokeStyle = item.color;
    context.shadowColor = item.color;
    let point = {};
    for (var j = 0, jl = item.data.length; j < jl; j++) {
      point = item.data[j];
      context.beginPath();
      context.setGlobalAlpha = 0.75;
      context.fillStyle = item.color;
      context.arc(point.x, -point.y, point.radius, 0, Math.PI * 2, false);
      context.fill();
      context.stroke()
    }
    if (!item.isStop) {
      isStop = false
    }
  }
  context.restore();
  context.draw();
  bubble_coor = {
    xDesc: xDesc,
    yDesc: yDesc,
    paddingLeft: pdLeft,
    paddingRight: pdRight,
    paddingTop: pdTop,
    paddingBottom: pdBottom,
    points: points
  }
}

function requestTooltip(Sv1, $$kLa2, lIvFAZ3, ErTd4) {
  switch (this["\x6f\x70\x74\x69\x6f\x6e\x73"]["\x73\x74\x79\x6c\x65"]) {
    case '\x70\x69\x65':
      {
        return AA(this, Sv1, $$kLa2, lIvFAZ3, ErTd4)
      }
    case '\x72\x6f\x73\x65':
      {
        return BB(this, Sv1, $$kLa2, lIvFAZ3, ErTd4)
      }
    case '\x6c\x69\x6e\x65':
      {
        return CC(this, Sv1, $$kLa2, lIvFAZ3, ErTd4)
      }
    case '\x72\x69\x6e\x67':
      {
        return DD(this, Sv1, $$kLa2, lIvFAZ3, ErTd4)
      }
    case '\x72\x61\x64\x61\x72':
      {
        return EE(this, Sv1, $$kLa2, lIvFAZ3, ErTd4)
      }
    case '\x62\x75\x62\x62\x6c\x65':
      {
        return FF(this, Sv1, $$kLa2, lIvFAZ3, ErTd4)
      }
    case '\x62\x61\x72':
      {
        return GG(this, Sv1, $$kLa2, lIvFAZ3, ErTd4)
      }
    default:
      return {}
  }
}

function calculateEucDis(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}

function calculateAng(x, y, cX, cY) {
  var a = Math.acos((x - cX) / calculateEucDis(x, y, cX, cY));
  if (y < cY) {
    a = 2 * Math.PI - a
  }
  return a
}

function GG(that, posX, posY, width, height) {
  if (!that.options.showTooltip) {
    return {}
  }
  let toolTipInfo = {};
  toolTipInfo.showTooltip = true;
  let top = posY;
  if (posY < barDesc.paddingTop) top = barDesc.paddingTop;
  else if (posY > height - barDesc.paddingBottom) top = height - barDesc.paddingBottom;
  let tranX = posX - barDesc.paddingLeft - barDesc.xDesc.startPosOffset;
  if (posX < barDesc.paddingLeft + barDesc.xDesc.startPosOffset) tranX = 0;
  else if (posX > (width - barDesc.paddingRight)) tranX = (width - barDesc.paddingRight - barDesc.paddingLeft - barDesc.xDesc.startPosOffset);
  let dataIndex = Math.round(tranX / barDesc.xDesc.span);
  let left = parseInt(dataIndex * barDesc.xDesc.span + barDesc.paddingLeft + barDesc.xDesc.startPosOffset);
  toolTipInfo.tooltipPos = 'left:10px;' + 'right:0px;' + 'top:10px;' + 'font-size:14px';
  toolTipInfo.tooltipInfo = '';
  if (that.options && that.options.data) {
    that.options.data.forEach(function(val) {
      if (that.options.tooltip === undefined) {
        that.options.tooltip = '{b}'
      }
      if (val.data[dataIndex]) {
        var txt = that.options.tooltip.replace(/{b}/g, val.data[dataIndex]);
        txt = txt.replace(/{a}/g, val.name);
        toolTipInfo.tooltipInfo += txt + ' '
      }
    })
  }
  if (toolTipInfo.tooltipInfo.length == 0) toolTipInfo.showTooltip = false;
  return toolTipInfo
}

function CC(that, posX, posY, width, height) {
  if (!that.options.showTooltip) {
    return {}
  }
  let toolTipInfo = {};
  toolTipInfo.showTooltip = true;
  toolTipInfo.showHLine = true;
  toolTipInfo.showVLine = true;
  let top = posY;
  if (posY < lineDesc.paddingTop) top = lineDesc.paddingTop;
  else if (posY > height - lineDesc.paddingBottom) top = height - lineDesc.paddingBottom;
  toolTipInfo.crossHLine = 'width:' + (width - lineDesc.paddingLeft - lineDesc.paddingRight) + 'px;' + 'left:' + lineDesc.paddingLeft + 'px;' + 'top:' + top + 'px;';
  let tranX = posX - lineDesc.paddingLeft - lineDesc.xDesc.startPosOffset;
  if (posX < lineDesc.paddingLeft + lineDesc.xDesc.startPosOffset) tranX = 0;
  else if (posX > (width - lineDesc.paddingRight - (lineDesc.xDesc.endPadding || 0))) tranX = (width - lineDesc.paddingRight - lineDesc.paddingLeft - lineDesc.xDesc.startPosOffset - (lineDesc.xDesc.endPadding || 0));
  let dataIndex = Math.round(tranX / lineDesc.xDesc.span);
  let left = parseInt(dataIndex * lineDesc.xDesc.span + lineDesc.paddingLeft + lineDesc.xDesc.startPosOffset);
  toolTipInfo.crossVLine = 'height:' + (height - lineDesc.paddingBottom - lineDesc.paddingTop) + 'px;' + 'left:' + left + 'px;' + 'top:' + lineDesc.paddingTop + 'px;';
  toolTipInfo.tooltipPos = (left > width / 2 ? 'left:0px;' : 'right:0px;') + 'top:0px;' + 'font-size:14px';
  toolTipInfo.tooltipInfo = '';
  if (that.options && that.options.data) {
    that.options.data.forEach(function(val) {
      if (that.options.tooltip === undefined) {
        that.options.tooltip = '{b}'
      }
      if (val.data[dataIndex]) {
        var txt = that.options.tooltip.replace(/{b}/g, val.data[dataIndex]);
        txt = txt.replace(/{a}/g, val.name);
        toolTipInfo.tooltipInfo += txt + ' '
      }
    })
  }
  if (toolTipInfo.tooltipInfo.length == 0) toolTipInfo.showTooltip = false;
  return toolTipInfo
}

function FF(that, posX, posY, canvasWidth, canvasHeight) {
  if (that.options.showTooltip == undefined || that.options.showTooltip == false) {
    return {}
  }
  let ret = {};
  if (posY > bubble_coor.paddingTop && posY < canvasHeight - bubble_coor.paddingBottom && posX > bubble_coor.paddingLeft - 10 && posX < canvasWidth + bubble_coor.paddingLeft) {
    let clicked_point = {
      x: posX - bubble_coor.paddingLeft,
      y: -posY + (canvasHeight - bubble_coor.paddingBottom),
    };
    for (var i = 0, item, l = bubble_coor.points.length; i < l; i++) {
      item = bubble_coor.points[i];
      if (item.hide) continue;
      for (var j = 0, obj, jl = item.data.length; j < jl; j++) {
        obj = item.data[j];
        var dis = calculateEucDis(clicked_point.x, clicked_point.y, obj.x, obj.y);
        if (dis < Math.max(obj.radius, 4)) {
          ret.showTooltip = true;
          let txt = that.options.tooltip.replace(/{b}/g, obj.value);
          txt = txt.replace(/{a}/g, item.name);
          ret.tooltipInfo = txt;
          let position = {
            x: clicked_point.x + bubble_coor.paddingLeft,
            y: -clicked_point.y + (canvasHeight - bubble_coor.paddingBottom),
          };
          ret.tooltipPos = (position.x > canvasWidth / 2 ? 'left:0px;' : 'right:0px;') + 'top:0px;' + 'font-size:14px';
          break
        }
      }
    }
    return ret
  }
}

function BB(that, posX, posY, width, height) {
  if (that.options.showTooltip == undefined || that.options.showTooltip == false) {
    return {}
  }
  var ratio = width > height ? 0.8 : 0.5;
  if (!that.options.showLegend) ratio = 1;
  if (that.options.chartRatio > 0 && that.options.chartRatio <= 1) ratio = that.options.chartRatio;
  var small = width > height ? height : width;
  var radius = small * ratio / 2.0;
  var center = {
    x: width / 2.0,
    y: height / 2.0
  };
  var maxValue = that.options.data[0].value;
  var total = 0;
  that.options.data.forEach(function(val) {
    total += val.value;
    maxValue = Math.max(maxValue, val.value)
  });
  var dis = calculateEucDis(posX, posY, center.x, center.y);
  var ret = {};
  var angle = calculateAng(posX, posY, center.x, center.y);
  var rem = 0;
  for (var i = 0; i < that.options.data.length; i++) {
    var val = that.options.data[i];
    rem += 2 * Math.PI / that.options.data.length;
    if (rem > angle) {
      if (dis < val.value / maxValue * radius) {
        ret.showTooltip = true
      }
      if (that.options.tooltip === undefined) {
        that.options.tooltip = '{b}'
      }
      var txt = that.options.tooltip.replace(/{b}/g, val.value);
      txt = txt.replace(/{a}/g, val.name);
      txt = txt.replace(/{c}/g, (val.value / total * 100).toFixed(2) + '%');
      ret.tooltipInfo = txt;
      break
    }
  }
  if (posX < center.x) {
    ret.tooltipPos = 'left:' + (posX + 10) + 'px;'
  } else {
    ret.tooltipPos = 'right:' + (width - posX + 10) + 'px;'
  }
  ret.tooltipPos += 'bottom:' + (height - posY + 20) + 'px';
  return ret
}

function EE(that, posX, posY, width, height) {
  if (that.options.showTooltip == undefined || that.options.showTooltip == false) {
    return {}
  }
  var length = that.options.xLabel.length;
  var ratio = 0.8;
  if (that.options.chartRatio > 0 && that.options.chartRatio <= 1) ratio = that.options.chartRatio;
  var small = width > height ? height : width;
  var radius = small * ratio / 2.0;
  var center = {
    x: width / 2.0,
    y: height / 2.0
  };
  var angle = Math.PI * 2 / length;
  var dis = calculateEucDis(posX, posY, center.x, center.y);
  if (dis > radius) {
    return {}
  }
  var closeIndex = 0;
  var closeDis = calculateEucDis(posX, posY, center.x, center.y - radius);
  var currentAngle = -Math.PI / 2;
  for (var i = 1; i < length; i++) {
    currentAngle += angle;
    var temp = calculateEucDis(posX, posY, center.x + radius * Math.cos(currentAngle), center.y + radius * Math.sin(currentAngle));
    if (temp < closeDis) {
      closeIndex = i;
      closeDis = temp
    }
  }
  var ret = {};
  ret.showTooltip = true;
  ret.tooltipInfo = '';
  that.options.data.forEach(function(val) {
    if (that.options.tooltip === undefined) {
      that.options.tooltip = '{b}'
    }
    var txt = that.options.tooltip.replace(/{b}/g, val.value[closeIndex]);
    txt = txt.replace(/{a}/g, val.name);
    ret.tooltipInfo += txt + ' '
  });
  var tipPosX = center.x + radius * Math.cos(-Math.PI / 2 + closeIndex * angle);
  var tipPoxY = center.y + radius * Math.sin(-Math.PI / 2 + closeIndex * angle);
  if (tipPosX < center.x) {
    ret.tooltipPos = 'left:' + (tipPosX) + 'px;'
  } else {
    ret.tooltipPos = 'right:' + (width - tipPosX) + 'px;'
  }
  ret.tooltipPos += 'bottom:' + (height - tipPoxY) + 'px';
  return ret
}

function DD(that, posX, posY, width, height) {
  if (that.options.showTooltip == undefined || that.options.showTooltip == false) {
    return {}
  }
  var ratio = width > height ? 0.8 : 0.5;
  if (!that.options.showLegend) ratio = 1;
  if (that.options.chartRatio > 0 && that.options.chartRatio <= 1) ratio = that.options.chartRatio;
  var small = width > height ? height : width;
  var radius = small * ratio / 2.0;
  var center = {
    x: width / 2.0,
    y: height / 2.0
  };
  var total = 0;
  that.options.data.forEach(function(val) {
    total += val.value
  });
  var dis = calculateEucDis(posX, posY, center.x, center.y);
  if (dis > radius || dis < 0.6 * radius) {
    return {}
  }
  var ret = {};
  ret.showTooltip = true;
  var angle = calculateAng(posX, posY, center.x, center.y);
  var rem = 0;
  for (var i = 0; i < that.options.data.length; i++) {
    var val = that.options.data[i];
    rem += val.value / total * 2 * Math.PI;
    if (rem > angle) {
      if (that.options.tooltip === undefined) {
        that.options.tooltip = '{b}'
      }
      var txt = that.options.tooltip.replace(/{b}/g, val.value);
      txt = txt.replace(/{a}/g, val.name);
      txt = txt.replace(/{c}/g, (val.value / total * 100).toFixed(2) + '%');
      ret.tooltipInfo = txt;
      break
    }
  }
  if (posX < center.x) {
    ret.tooltipPos = 'left:' + (posX + 10) + 'px;'
  } else {
    ret.tooltipPos = 'right:' + (width - posX + 10) + 'px;'
  }
  ret.tooltipPos += 'bottom:' + (height - posY + 20) + 'px';
  return ret
}

function AA(that, posX, posY, width, height) {
  if (that.options.showTooltip == undefined || that.options.showTooltip == false) {
    return {}
  }
  var ratio = width > height ? 0.8 : 0.5;
  if (!that.options.showLegend) ratio = 1;
  if (that.options.chartRatio > 0 && that.options.chartRatio <= 1) ratio = that.options.chartRatio;
  var small = width > height ? height : width;
  var radius = small * ratio / 2.0;
  var pieCenter = {
    x: width / 2.0,
    y: height / 2.0
  };
  var total = 0;
  that.options.data.forEach(function(val) {
    total += val.value
  });
  if (calculateEucDis(posX, posY, pieCenter.x, pieCenter.y) > radius) {
    return {}
  }
  var ret = {};
  ret.showTooltip = true;
  var angle = calculateAng(posX, posY, pieCenter.x, pieCenter.y);
  var rem = 0;
  for (var i = 0; i < that.options.data.length; i++) {
    var val = that.options.data[i];
    rem += val.value / total * 2 * Math.PI;
    if (rem > angle) {
      if (that.options.tooltip === undefined) {
        that.options.tooltip = '{b}'
      }
      var txt = that.options.tooltip.replace(/{b}/g, val.value);
      txt = txt.replace(/{a}/g, val.name);
      txt = txt.replace(/{c}/g, (val.value / total * 100).toFixed(2) + '%');
      ret.tooltipInfo = txt;
      break
    }
  }
  if (posX < pieCenter.x) {
    ret.tooltipPos = 'left:' + (posX + 10) + 'px;'
  } else {
    ret.tooltipPos = 'right:' + (width - posX + 10) + 'px;'
  }
  ret.tooltipPos += 'bottom:' + (height - posY + 20) + 'px';
  return ret
}
module.exports = {
  options: options,
  initChart: initChart,
  requestTooltip: requestTooltip,
}