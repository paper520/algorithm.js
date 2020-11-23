export default {

    // 空白字符:http://www.w3.org/TR/css3-selectors/#whitespace
    blankReg: new RegExp("[\\x20\\t\\r\\n\\f]"),
    blanksReg: /^[\x20\t\r\n\f]{0,}$/,

    // 标志符
    identifier: /^[a-zA-Z_$][0-9a-zA-Z_$]{0,}$/,

};
