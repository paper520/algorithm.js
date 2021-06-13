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
import toSelector from "./.inner/scss/toSelector";

export default function (source) {

    // 分析出代码块

    var blocks = analyseBlock(source);

    // 根据代码块获得最终代码

    var i, j, cssCode = "", preSelectorArray = [], deep = 0;
    for (i = 0; i < blocks.length; i++) {

        // 注释 double
        if (blocks[i].type == 'comment-double') {

            cssCode += blocks[i].value;

        }

        // 注释 single
        else if (blocks[i].type == 'comment-single') {

            cssCode += "\n/* " + blocks[i].value + " */\n";

        }

        // 开始
        else if (blocks[i].type == 'begin') {

            var preSplit = blocks[i].value.split(',');
            var preSelect = [];
            for (j = 0; j < preSplit.length; j++) {

                // 去掉两端的空格
                preSelect[j] = preSplit[j].trim().replace(/\{$/, '');

                // 判断拼接方式
                if (/^&/.test(preSelect[j])) {
                    preSelect[j] = preSelect[j].replace(/^&/, '');
                } else {
                    preSelect[j] = " " + preSelect[j];
                }

            }

            // 登记到前缀数组
            preSelectorArray[deep] = preSelect;
            deep += 1;
        }

        // 结束
        else if (blocks[i].type == 'end') {

            deep -= 1;

        }

        // 语句
        else if (blocks[i].type == 'statement') {

            // 如果是第一个
            j = 1
            var preType = blocks[i - j].type;
            while (['comment-double', 'comment-single'].indexOf(preType) > -1) {
                j += 1;
                preType = blocks[i - j].type;
            }
            if (['end', 'begin'].indexOf(preType) > -1) {
                cssCode += toSelector(preSelectorArray, deep);
            }

            cssCode += "\n" + blocks[i].value + "\n";

            // 如果是最后一个
            j = 1;
            var nextType = blocks[i + j].type;
            while (['comment-double', 'comment-single'].indexOf(nextType) > -1) {
                j += 1;
                nextType = blocks[i + j].type;
            }
            if (['end', 'begin'].indexOf(nextType) > -1) {
                cssCode += "\n}\n";
            }

        }

    }

    return cssCode;
};
