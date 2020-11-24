import { isString, isNull, isUndefined } from '@hai2007/tool/type';

let getExpressValue = value => {
    // 这里是计算的内部，不需要考虑那么复杂的类型
    if (typeof value == 'string') return value.replace(/@string$/, '');
    return value;
};

export default function (expressArray) {

    let express = "";
    for (let i = 0; i < expressArray.length; i++) {

        // 字符串
        if (isString(expressArray[i]) && /@string$/.test(expressArray[i])) express += JSON.stringify(expressArray[i].replace(/@string$/, ''));

        // 特殊字符
        else if (isNull(expressArray[i])) express += "null";
        else if (isUndefined(expressArray[i])) express += "undefined";

        // 默认
        else express += expressArray[i];
    }

    console.log(JSON.stringify(expressArray));

    // 采用按照优先级顺序归约的思想进行

    // 需要明白，这里不会出现括号
    // （小括号或者中括号，当然，也不会有函数，这里只会有最简单的表达式）
    // 这也是我们可以如此归约的前提

    // + - * / %
    // && || !
    // ? :
    // [ ] ( )
    // > < >= <= == === != !==

    // 先去掉!
    // 因为合并以后数组长度一定越来越短，我们直接复用以前的数组即可
    let length = 0, i = 0;
    for (; i < expressArray.length; i++) {
        if (expressArray[i] == '!') {
            // 由于是逻辑运算符，如果是字符串，最后的@string是否去掉已经没有意义了
            expressArray[length] = !expressArray[++i];
        }
        length += 1;
    }
    if (length == 1) return getExpressValue(expressArray[0]);
    expressArray.length = length;

    // 去掉* /
    length = 0;
    for (i = 0; i < expressArray.length; i++) {
        if (expressArray[i] == '*') {
            // 假设不知道一定正确，主要是为了节约效率，是否提供错误提示，再议
            expressArray[length - 1] = getExpressValue(expressArray[i - 1]) * getExpressValue(expressArray[++i]);
        } else if (expressArray[i] == '/') {
            expressArray[length - 1] = getExpressValue(expressArray[i - 1]) / getExpressValue(expressArray[++i]);
        } else if (expressArray[i] == '%') {
            expressArray[length - 1] = getExpressValue(expressArray[i - 1]) % getExpressValue(expressArray[++i]);
        } else

            // 上面不会导致数组增长
            length += 1;
    }
    if (length == 1) return getExpressValue(expressArray[0]);
    expressArray.length = length;

    // todo

    console.error(expressArray);

    // 此次采用了eval，待修改
    return eval(express);

};
