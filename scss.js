/*!
 * 🔪 - 把 SCSS 解析成 CSS 的算法实现
 * https://github.com/hai2007/algorithm.js/blob/master/scss.js
 *
 * author hai2007 < https://hai2007.gitee.io/sweethome >
 *
 * Copyright (c) 2021-present hai2007 走一步，再走一步。
 * Released under the MIT license
 */

import analyseBlock from "./.inner/scss/analyseBlock";

export default function (source) {

    var blocks = analyseBlock(source);

    console.log(blocks);

};
