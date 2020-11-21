import $RegExp from '../RegExp';
import analyseTag from './analyseTag';

export default function (template) {

    let i = -1,

        // 当前面对的字符
        currentChar = null;

    // 如果前面是获取的js或css，还有pre等开始标签，比较特殊，直接寻址闭合的
    let preIsSpecial = false, specialCode = "";
    let specialTag = ['script', 'pre', 'style', 'code'];

    // 获取下一个字符
    let next = function () {
        currentChar = i++ < template.length - 1 ? template[i] : null;
        return currentChar;
    };

    // 获取往后n个值
    let nextNValue = function (n) {
        return template.substring(i, n + i > template.length ? template.length : n + i);
    };

    next();
    // 剔除开头的空白
    while ($RegExp.blankReg.test(currentChar) && i < template.length - 1) next();


    /**
     * 一个Tag存在哪些类型？如下：
     * 1.<tag-name>       { tagName:'tag-name', type:'beginTag', attrs:{} }      开始标签
     * 2.</tag-name>      { tagName:'tag-name', type:'endTag'   }                结束标签
     * 3.<tag-name />     { tagName:'tag-name', type:'fullTag',  attrs:{} }      自闭合标签
     * 4.text             { tagName:'text',     type:'textcode' }                文本结点
     * 5.<!-- text -->    { tagName:'text',     type:'comment'  }                注释
     * 6.<!DOCTYPE text>  { tagName:'text',     type:'DOCTYPE'  }                声明
     *
     *
     */
    return function () {

        let tag = currentChar, tagObj = {};

        if (tag == null) return null;

        /**
         * 特殊标签内容获取
         * ========================================
         */

        // 如果是获取特殊标签里面的内容
        // 先不考虑里面包含'</XXX>'
        if (preIsSpecial) {
            tagObj.type = 'textcode';
            tagObj.tagName = tag;
            while (nextNValue(specialCode.length + 3) != '</' + specialCode + '>' && i < template.length) {
                tagObj.tagName += next();
            }
            tagObj.tagName = tagObj.tagName.replace(/<$/, '');
            preIsSpecial = false;
            return tagObj;
        }

        /**
         * 特殊标签获取
         * ========================================
         */
        // 针对特殊的comment
        if (nextNValue(4) == '<!--') {
            tagObj.type = 'comment';
            tagObj.tagName = tag;
            while (nextNValue(3) != '-->' && i < template.length) {
                tagObj.tagName += next();
            }
            next(); next(); next();
            tagObj.tagName = tagObj.tagName.replace(/^<!--/, '').replace(/-$/, '');
            return tagObj;
        }

        // 针对特殊的doctype
        if (nextNValue(9) == '<!DOCTYPE') {
            tagObj.type = 'DOCTYPE';
            tagObj.tagName = tag;
            while (nextNValue(1) != '>' && i < template.length) {
                tagObj.tagName += next();
            }
            next();
            tagObj.tagName = tagObj.tagName.replace(/^<!DOCTYPE/, '').replace(/>$/, '');
            return tagObj;
        }

        /**
         * 普通的
         * ========================================
         */

        // 如果是期望归结非文本结点
        else if (tag == '<') {

            // 标记是否处于属性值是字符串包裹中
            let isAttrString = false, attrLeftValue = null, attrLeftLen = null;

            // 如果在包裹中或者没有遇到‘>’说明没有结束
            while (isAttrString || currentChar != '>' && i < template.length) {

                tag += next();

                // 如果是包裹里面，试探是否即将遇到了结束
                if (isAttrString) {

                    let next23Value = nextNValue(attrLeftLen + 1).substring(1);
                    if (next23Value == attrLeftValue) {
                        isAttrString = false;
                    }

                }

                // 如果在包裹外面，试探是否即将进入包裹
                else {

                    let next23Value = nextNValue(2);
                    if (next23Value == '="' || next23Value == "='") {
                        attrLeftValue = next23Value.replace('=', '');
                        attrLeftLen = 1;
                        isAttrString = true;
                    }

                    next23Value = nextNValue(3);
                    if (next23Value == '=\"' || next23Value == "=\'") {
                        attrLeftValue = next23Value.replace('=', '');
                        attrLeftLen = 2;
                        isAttrString = true;
                    }

                }


            }

            // 针对特殊的结束标签
            if (/^<\//.test(tag)) {
                tagObj.tagName = tag.replace(/^<\//, '').replace(/>$/, '');
                tagObj.type = 'endTag';
            } else {

                if (/\/>$/.test(tag)) {
                    tagObj.type = 'fullTag';
                    tag = tag.replace(/\/>$/, '');
                } else {
                    tagObj.type = 'beginTag';
                    tag = tag.replace(/>$/, '');
                }

                tag = tag.replace(/^</, '');

                tagObj.tagName = "";
                let i = 0;
                for (; i < tag.length; i++) {
                    if (tag[i] == ' ') break;
                    tagObj.tagName += tag[i];
                }

                let attrString = tag.substring(i);
                if ($RegExp.blanksReg.test(attrString)) {
                    tagObj.attrs = {};
                } else {
                    tagObj.attrs = analyseTag(attrString);
                }

            }

        }

        // 如果是归结文本结点
        // 如果文本中包含<的先忽略考虑
        else {
            tagObj.type = 'textcode';
            tagObj.tagName = currentChar;
            while (nextNValue(1) != '<' && i < template.length) {
                tagObj.tagName += next();
            }
            tagObj.tagName = tagObj.tagName.replace(/<$/, '');
            i -= 1;
        }


        // 如果遇到开始script或者style、pre等特殊标签，标记开始获取特殊文本
        if (tagObj.type == 'beginTag') {
            if (specialTag.indexOf(tagObj.tagName.toLowerCase()) > -1) {
                preIsSpecial = true;
                specialCode = tagObj.tagName;
            }

        }

        // 如果遇到结束script或者style、pre等特殊标签，标记结束获取特殊文本
        else if (tagObj.type == 'endTag') {
            if (specialTag.indexOf(tagObj.tagName.toLowerCase()) > -1) {
                preIsSpecial = false;
            }
        }

        next();

        return tagObj;

    };

};
