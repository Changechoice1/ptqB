// 正则验证表达式
var exps = {
   // 不能为空白字符，空格、制表符、回车符、换行符，未定义值内容
   empty: {
      exp: {
         test(_val) {
            if (typeof _val == 'undefined' || _val == '') {
               return false
            }
            return /\S/.test(_val);
         }
      },
      err: "请填写内容"
   },
   // 是否数字
   isnumber: {
      exp: /^[0-9]*$/,
      err: "只能填写数字"
   },
   // 至少6位数字
   number6: {
      exp: /^\d{6,}$/,
      err: "至少6位数字"
   },
   // 中文
   iszh: {
      exp: /^[\u4e00-\u9fa5]{0,}$/,
      err: "只能填写中文"
   },
   // 邮箱
   email: {
      exp: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      err: "邮箱格式错误"
   },
   // 手机号码
   phone: {
      exp: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
      err: "手机格式错误"
   },
   // 固定号码
   tel: {
      exp: /0\d{2,3}-\d{7,8}/,
      err: "固定号码错误"
   },
   // 身份证号码(数字、字母x结尾)
   id: {
      exp: /^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$/,
      err: "身份证号码格式错误"
   },
   //帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)
   account: {
      exp: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
      err: "请填写正确的账号格式"
   }

}
const regexp={
   get exp(){
      return exps;
   },
   set exp(val){
      Object.assign(exps,val)
   }
}
module.exports = regexp