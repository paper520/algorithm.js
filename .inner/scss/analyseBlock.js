import $RegExp from '../RegExp';

// 把代码变成代码块
// 比如一个注释就是一块，无论注释的内容有多少
export default function (source) {

    var i = -1,

        // 当前面对的字符
        currentChar = null;

    // 获取下一个字符
    var next = function () {
        currentChar = i++ < source.length - 1 ? source[i] : null;
        return currentChar;
    };

    // 获取往后n个值
    var nextNValue = function (n) {
        return source.substring(i, n + i > source.length ? source.length : n + i);
    };

    var blocks = [];
    var currentBlock = "";

    next();

    while (true) {

        // 先剔除空白字符
        // 保证正式开始的时候匹配的是有效的
        while ($RegExp.blankReg.test(currentChar)) {
            next();
        }

        // 如果匹配的字符没有了
        if (currentChar == null) break;

        // 如果是注释
        // /* 类型一 */
        if (nextNValue(2) == '/*') {

            next(); next();
            currentBlock = "/*";

            while (nextNValue(2) != '*/' && currentChar != null) {
                currentBlock += currentChar;
                next();
            }

            // 对于注释 /* */
            // 如果到结尾都没有闭合，应该提示语法错误
            if (currentChar == null) {
                throw new Error('The comment is not closed.');
            }

            currentBlock += "*/";
            next(); next();

            blocks.push({
                value: currentBlock,
                type: "comment-double"
            });
        }

        // 如果是注释
        // // 类型二
        else if (nextNValue(2) == '//') {
            currentBlock = '';

            while (currentChar != '\n' && currentChar != null) {
                currentBlock += currentChar;
                next();
            }

            blocks.push({
                value: currentBlock,
                type: "comment-single"
            });

        }

        // 如果是结束
        //  }
        else if (currentChar == '}') {

            blocks.push({
                value: "}",
                type: "end"
            });

            next();

        }

        // 余下，只有二种情况：
        // 1.如是是开始
        //  xxx {
        // 2.可能是一个语句
        //  xxx : xxx ;
        // 这两种都需要进一步匹配
        else {

            currentBlock = '';

            // 目前先没有考虑下列情况：
            // 语句 content:";"
            while (currentChar != '{' && currentChar != ';' && currentChar != null) {
                currentBlock += currentChar;
                next();
            }

            if (currentChar == null) {
                throw new Error('Statement or code block missing closure.');
            }

            blocks.push({
                value: currentBlock + currentChar,
                type: {
                    '{': "begin",
                    ';': 'statement'
                }[currentChar]
            });

            next();

        }

    }

    return blocks;
};
