/*!
 * 🔪 - 设置或获取指定对象上字符串表达式对应的值
 * https://github.com/hai2007/algorithm.js/blob/master/value.js
 *
 * author hai2007 < https://hai2007.gitee.io/sweethome >
 *
 * Copyright (c) 2020-present hai2007 走一步，再走一步。
 * Released under the MIT license
 */

import analyseExpress from './.inner/value/analyseExpress';

/**
 * express举例子：
 *
 * [00]  ["a"].b[c]
 * [01]  a
 * [02]  [0]['value-index'][index+1]
 *
 * 如果是getValue,express还可以包含运算符：
 *  + - * / %  数值运算符
 *  && || !    逻辑运算符
 *
 * [03]  flag+10
 * [04]  a.b[index+1]-10
 * [05]  (a+b)/10-c[d]
 * [06]  [((a+b)-c)*f]+d
 *
 * [07]  !flag
 * [08]  (a>0 && b<=1) || !flag
 * [09]  '(flag)' == "("+temp+")"
 * [10]  a>10?"flag1":"flag2"
 *
 */

// 获取
export let getValue = (target, express, scope = {}) => {

    let expressArray = analyseExpress(target, express, scope);
    console.log(expressArray);

};

// 设置
export let setValue = (target, express, value, scope = {}) => {



};
