// 获取当前页面前的页面,_index值是大小表示距离页面位置层级，如 1 表示邻近上一级，2表示上一级的上一级，以此类推
const getParentPage = _index => {
   _index = (_index || _index == 0) ? _index : 1;
   let pages = getCurrentPages();
   if (pages.length > 1) {
      return pages[pages.length - _index - 1];
   } else {
      return pages[0];
   }
}
module.exports = getParentPage;