/**
 * 绘制圆角矩形
 * 1、
 */
let drawRoundRect = function(ctx, x, y, width, height, radius, corner) {
  corner = corner || [1, 1, 1, 1];
  if (corner[0]) {
    ctx.moveTo(x, y + radius);
    ctx.quadraticCurveTo(0, 0, x + radius, y);
    ctx.lineTo(width - radius + x, y);
  }else{
    ctx.moveTo(0, 0);
    if(corner[1]){
      ctx.lineTo(width + x - radius, y);
    }else{
      ctx.lineTo(width + x, y);
    }
  }
  if (corner[1]) {
    ctx.quadraticCurveTo(width + x, y, width + x, y + radius);
    if(corner[2]){
      ctx.lineTo(width + x, height + y - radius);
    }else{
      ctx.lineTo(width + x, height + y);
    }
  } else {
    if (corner[2]) {
      ctx.lineTo(width + x, height + y - radius);
    } else {
      ctx.lineTo(width + x, height + y);
    }
  }
  if (corner[2]) {
    ctx.quadraticCurveTo(width + x, height + y, width + x - radius, height + y);
    ctx.lineTo(width + x + radius, height + y);
    if (corner[3]) {
      ctx.lineTo(x + radius, height + y);
    } else {
      ctx.lineTo(x, height + y);
    }
  } else {
    if (corner[3]) {
      ctx.lineTo(x + radius, height + y);
    } else {
      ctx.lineTo(x, height + y);
    }
  }
  if (corner[3]) {
    ctx.quadraticCurveTo(x, height + y, x, height + y - radius);
  }
  ctx.closePath();
  ctx.setStrokeStyle('#ff1426');
  ctx.setFillStyle('#ffffff');
  ctx.stroke();
  ctx.fill();
}
module.exports= {
  drawRoundRect
}