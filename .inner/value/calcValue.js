import { isString, isNull, isUndefined } from '@hai2007/tool/type';
export default function (expressArray) {
    let express = "";
    for (let i = 0; i < expressArray.length; i++) {

        // 字符串
        if (isString(expressArray[i]) && ['==', '+', '-', '*', '/', '!'].indexOf(expressArray[i]) < 0) express += JSON.stringify(expressArray[i]);

        // 特殊字符
        else if (isNull(expressArray[i])) express += "null";
        else if (isUndefined(expressArray[i])) express += "undefined";

        // 默认
        else express += expressArray[i];
    }
    console.log(express);
    return eval(express);
};
