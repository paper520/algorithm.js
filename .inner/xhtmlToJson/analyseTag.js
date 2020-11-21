import $RegExp from '../RegExp';

// 分析结点的属性
export default function (attrString) {
    let attr = {}, index = 0;

    attrString = attrString.trim();

    let getOneAttr = function () {

        // 属性名和属性值
        let attrName = "", attrValue = "";

        // 先寻找属性名
        for (; index < attrString.length; index++) {

            // 寻找属性名的时候遇到空白或结尾的时候，肯定没有属性值
            if ($RegExp.blanksReg.test(attrString[index]) || index == attrString.length - 1) {

                attrName += attrString[index];

                // 如果属性名是空白，就不需要记录了
                if (!$RegExp.blanksReg.test(attrName)) {
                    attr[attrName.trim()] = "";
                }
                index += 1;
                break;

            }

            // 如果遇到等号，说明属性名寻找结束了
            else if (attrString[index] == '=') {

                // 接着寻找属性值
                index += 1;

                // 由于属性可能由引号包裹或直接暴露
                let preCode = null, preLeng = -1;

                // 如果是由'或者"包裹
                if (attrString.substr(index, 1) == '"' || attrString.substr(index, 1) == "'") {
                    preCode = attrString.substr(index, 1);
                    preLeng = 1;
                    index += 1;
                }

                // 如果是由\'或\"包裹
                else if (attrString.substr(index, 2) == '\"' || attrString.substr(index, 2) == "\'") {
                    preCode = attrString.substr(index, 2);
                    preLeng = 2;
                    index += 2;
                }

                // 开始正式寻找属性值

                // 如果没有包裹，是直接暴露在外面的
                // 我们寻找到空格或结尾即可
                if (preCode !== null) {

                    for (; index < attrString.length; index++) {
                        if (attrString.substr(index, preLeng) == preCode) {
                            attr[attrName.trim()] = attrValue.trim();
                            index += 2;
                            break;
                        } else {
                            attrValue += attrString[index];
                        }
                    }

                }

                // 如果是包裹的
                // 我们确定寻找到对应的包裹闭合即可
                else {
                    for (; index < attrString.length; index++) {
                        if ($RegExp.blanksReg.test(attrString[index])) {
                            attr[attrName.trim()] = attrValue.trim();
                            index += 1;
                            break;
                        } else {
                            attrValue += attrString[index];
                        }
                    }
                }

                break;

            } else {
                attrName += attrString[index];
            }
        }

        // 如果还有字符串，继续解析
        if (index < attrString.length) {
            getOneAttr();
        }

    };

    getOneAttr();

    return attr;
};
