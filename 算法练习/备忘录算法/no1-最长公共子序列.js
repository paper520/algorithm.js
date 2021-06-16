/**
 * 【子序列】
 * 若给定序列 X={x1，x2,...,xm} ，则另一序列 Z={z1,z2,...,zp} ,
 * X的子序列是指存在一个严格递增下标序列 {i1,i2,...,ik}
 * 使得对于所有的 j=1,2,...,k 有zj=x(ij)。
 *
 * 给定两个序列 X={x1，x2,...,xm} 和 Y={y1，y2,...,yn} ，找出X和Y的最长公共子序列。
 *
 * 情况一：若Xi==Xj,
 * 那么直接再次求解 {x(i+1),...,xm} 和 {y(j+1),...,yn} 的即可。
 *
 * 情况二：若Xi!=Yj,
 * 那么就是求解
 * {xi,...,xm} 和 {y(j+1),...,yn}
 * {x(i+1),...,xm} 和 {yj,...,yn}
 * 中较大的即可。
 *
 */

var X = "I Love You,China!", Y = "I Do Love You,China!";

// 记录已经解决的问题
// 比如
// note["1-1"] 记录的是 x1~xm 和 y1~yn 的最优解
// note["4-1"] 记录的是 x4~xm 和 y1~yn 的最优解
var note = {};

function calcMaxSubString(i, j) {

    var key1 = i + "-" + j;
    var key2 = (i + 1) + "-" + j;
    var key3 = i + "-" + (j + 1);
    var key4 = (i + 1) + "-" + (j + 1);

    // 如果最开头的相等，直接取下来使用，最长加1
    if (X[i - 1] == Y[j - 1]) {

        // 如果到头了
        if (i == X.length || j == Y.length) {
            note[key1] = {
                value: 1,
                subString: X[i - 1]
            };
        } else {

            // 判断子问题是否已经求解
            // 如果没有，先求解
            if (!(key4 in note)) calcMaxSubString(i + 1, j + 1);

            note[key1] = {
                value: 1 + note[key4].value,
                subString: X[i - 1] + note[key4].subString
            };

        }
    } else {

        if (i == X.length || j == Y.length) {
            note[key1] = {
                value: 0,
                subString: ""
            };
        } else {

            if (!(key2 in note)) calcMaxSubString(i + 1, j);
            if (!(key3 in note)) calcMaxSubString(i, j + 1);

            // 选择最佳的
            var tempNote = note[key2].value > note[key3].value ? note[key2] : note[key3];

            note[key1] = {
                value: tempNote.value,
                subString: tempNote.subString
            };
        }

    }

}

calcMaxSubString(1, 1);

console.log(note);
console.log('最长子串：' + note['1-1'].subString);
