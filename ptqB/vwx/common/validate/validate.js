import exps from './regexp.js';
import _ from '../babel.js';
/* 
 * 表单验证
 * 如果验证配置不存在，表示验证所有内容为必填项目
 * @param _obj {object|string} 验证数据对象，字符串表示单组字符串进行验证
 * @parma _cfg {object|string} 验证规则 - 参数值{key:{exp,err}} 验证的参数，验证类型，错误说明--字符串类型可以是正则规则，也可以是默认名称
 * @returns {string} 验证的报错说明
 * @example
 * A.validateFrom("wag@qq.com", "email");
 * A.validateFrom({em:"wag@qq.com"}, {em:"email"});
 * A.validateFrom({em:"wag@qq.com"}, {em:{exp:"email"}});
 * A.validateFrom({em:"wag@qq.com"}, {em:{exp:"email",err:"邮箱格式错误"}});
 * A.validateFrom({em:"wag@qq.com"}, {em:{exp:["email","empty"],err:"邮箱格式错误"}});
 */
const validateFrom = function(_val, _cfg, _options) {
   var vad = exps.exp;
   // 配置信息
   const ops = {
      errObj: false,
      errAll: false
   }
   const errs = {};
   Object.assign(ops, _options);
   if (typeof _cfg == 'undefined') {
      // 默认验证所有数据是否必填
      if (_.isEmpty(_val)) {
         return errMessage(_val, "请填写内容", ops);
      } else {
         for (let k in _val) {
            if (_.isEmpty(_val[k])) {
               if (ops.errAll) {
                  errs[k] = errMessage(k, "请填写完整内容", ops);
               } else {
                  return errMessage(k, "请填写完整内容", ops)
               }
            }
         }
      }
   } else if (typeof _val == 'object') {
      for (let key in _val) {
         if (typeof _cfg[key] == 'undefined') {
            // 参数不存在跳过不验证
            continue;
         } else {
            if (typeof _cfg[key] == 'string') {
               let test = validate(key, _val[key], _cfg[key], null, vad, ops);
               if (ops.errAll) {
                  if (test !== true) errs[key] = test;
               } else {
                  if (test !== true) return test;
               }
            } else if (typeof _cfg[key] == 'object') {
               // 自定义方法
               try {
                  // 验证失败返回错误
                  if (typeof _cfg[key].exp == 'object' || typeof _cfg[key].exp == 'string') {
                     if (_cfg[key].exp instanceof Array) {
                        let exps = _cfg[key].exp;
                        for (let k in exps) {
                           let test = validate(key, _val[key], exps[k], _cfg[key].err, vad, ops);
                           if (ops.errAll) {
                              if (test !== true) errs[key] = test;
                           } else {
                              if (test !== true) return test;
                           }
                        }
                     } else {
                        let test = validate(key, _val[key], _cfg[key].exp, _cfg[key].err, vad, ops);
                        if (ops.errAll) {
                           if (test !== true) errs[key] = test;
                        } else {
                           if (test !== true) return test;
                        }
                     }
                  } else {
                     console.warn(key + ' 验证方法无效');
                  }
               } catch (error) {
                  console.warn(key + ' 验证方法无效');
               }
            } else {
               console.warn(key + ' 验证方法无效')
            }
         }
      }
   } else {
      if (typeof _cfg == "string") {
         let test = validate(_val, _val, _cfg, null, vad, ops);
         if (test !== true) return test;
      } else {
         try {
            return _cfg.test(_val)
         } catch (error) {
            console.warn(_val + ' 无验证方法')
         }
      }
   }
   if (ops.errAll) {
      if (Object.keys(errs).length > 0) return errs;
   } else {
      return true;
   }
}
// key属性名，val验证内容，exp验证规则，err错误提示，vad默认验证规则
const validate = function(_key, _val, _exp, _err, _vad, _ops) {
   let exp = _exp;
   let vad = _vad || vad;
   if (typeof _exp == 'string') {
      // 是否默认定义正则
      if (vad[_exp]) {
         exp = vad[_exp].exp;
      } else {
         // 创建正则
         exp = new RegExp(_exp)
      }
   }
   try {
      if (exp.test(_val)) {
         return true
      } else {
         if (_err) {
            return errMessage(_key, _err, _ops);
         } else if (vad[_exp]) {
            return errMessage(_key, vad[_exp].err, _ops);
         } else {
            return errMessage(_key, "内容无效", _ops);
         }
      }
   } catch (error) {
      console.warn(_key + ' 无验证方法')
   }

}
// 错误提示处理
const errMessage = function(_key, _err, _ops) {
   if (_ops.errObj) {
      return {
         key: _key,
         err: _err
      }
   } else {
      return _err;
   }
}
module.exports = validateFrom