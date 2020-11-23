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
import toPath from './.inner/value/toPath';
import calcValue from './.inner/value/value';
import { isArray } from '@hai2007/tool/type';

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

// 解析一段表达式
export let evalExpress = (target, express, scope = {}) => {
    let expressArray = analyseExpress(target, express, scope);
    let path = toPath(target, expressArray, scope);

    // 如果不是表达式
    if (path.length > 1) throw new Error(`Illegal expression : ${express}
step='evalExpress',path=${path},expressArray=${expressArray}`);

    return path[0];
};

// 获取
export let getValue = (target, express, scope = {}) => {
    let expressArray = analyseExpress(target, express, scope);
    let path = toPath(target, expressArray, scope);
    return calcValue(target, path, scope);
};

// 设置
export let setValue = (target, express, value, scope = {}) => {

    let expressArray = analyseExpress(target, express, scope);
    let path = toPath(target, expressArray, scope);

    let _target = target;
    for (let i = 0; i < path.length - 1; i++) {

        // 如果需要补充
        if (!(path[i] in _target)) _target[path[i]] = isArray(_target) ? [] : {};

        // 拼接下一个
        _target = _target[path[i]];
    }

    _target[path[path.length - 1]] = value;
    return target;
};
