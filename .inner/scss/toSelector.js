export default function (preSelectorArray, deep) {

    var selectors = preSelectorArray[0], i, j, k;

    // 一层层深入
    for (i = 1; i < deep; i++) {

        var temp = [];
        // 前置循环
        for (j = 0; j < selectors.length; j++) {

            // 预选循环
            for (k = 0; k < preSelectorArray[i].length; k++) {

                temp.push(selectors[j] + preSelectorArray[i][k]);

            }

        }

        selectors = temp;
    }

    // 最后补充 {
    return "\n" + (selectors.join(',')) + "{\n";
};
