/**
 * 活动安排问题
 *
 * 设有n个活动的集合{active(1),active(2),...,active(n)}，其中，每个活动都有一个开始和结束时间，
 * 需要知道的是，在同一时刻，只有一个活动可以进行，
 * 如何安排，可以保证最多的活动个数。
 *
 */

// [开始时间,结束时间]
// （已经按照结束时间进行排序）
var active = [
    [1, 4], [3, 5], [0, 6], [5, 7], [3, 8], [5, 9], [6, 10], [8, 11], [8, 12], [2, 13], [12, 14]
];

// 第一个活动一定是可以的
active[0][2] = true;
var preActive = 0;

// 记录可行的个数
var count = 1;

for (var i = 1; i < active.length; i++) {

    // 如果当前活动的开始时间不小于上一个活动的结束时间
    if (active[i][0] >= active[preActive][1]) {

        active[i][2] = true;
        preActive = i;
        count += 1;

    }

    // 否则就不可行
    else {
        active[i][2] = false;
    }

}

console.log(active);
console.log("可行的个数：" + count);
