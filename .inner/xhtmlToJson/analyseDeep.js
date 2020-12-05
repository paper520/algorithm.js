// 分析deep
// 我们会在这里校对那些没有结束标签的开始标签
// 这步结束以后，每个都是一个单独的标签
// 也就是不用再区分开始或闭合了
export default function (tagArray) {

    // 闭合标签
    tagArray = closeTag(tagArray);

    var deep = 0, tagDeepArray = [];

    tagArray.forEach(function (tag) {

        if (tag.type == 'beginTag') {

            tagDeepArray.push({
                type: "tag",
                name: tag.tagName,
                attrs: tag.attrs,
                __deep__: ++deep,
                __tagType__: "double"
            });

        } else if (tag.type == 'endTag') {

            deep -= 1;


        } else if (tag.type == 'textcode') {

            // 如果是文本
            tagDeepArray.push({
                type: "text",
                content: tag.tagName,
                __deep__: deep + 1
            });

        } else if (tag.type == 'comment') {

            // 如果是注释
            tagDeepArray.push({
                type: "comment",
                content: tag.tagName,
                __deep__: deep + 1
            });

        } else {

            // 如果是自闭合结点
            tagDeepArray.push({
                type: "tag",
                name: tag.tagName,
                attrs: tag.attrs,
                __deep__: deep + 1,
                __tagType__: "single"
            });

        }

    });

    return tagDeepArray;

};

// 标记所有没有闭合结点的直接自闭合
var closeTag = function (tagArray) {

    var needClose = [];

    tagArray.forEach(function (tag, i) {
        if (tag.type == 'beginTag') {

            needClose.push([i, tag.tagName]);

        } else if (tag.type == 'endTag') {

            while (needClose.length > 0) {

                var needCloseTag = needClose.pop();

                if (needCloseTag[1] == tag.tagName) {
                    break;
                } else {
                    tagArray[needCloseTag[0]].type = 'fullTag';
                }

            }

        }
    });

    return tagArray;
};
