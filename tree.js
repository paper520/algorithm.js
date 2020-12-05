/*!
 * 🔪 - 基本的树结构位置生成算法
 * https://github.com/hai2007/algorithm.js/blob/master/tree.js
 *
 * author hai2007 < https://hai2007.gitee.io/sweethome >
 *
 * Copyright (c) 2020-present hai2007 走一步，再走一步。
 * Released under the MIT license
 */


export default function (_config) {

    /**
     * 无论绘制的树结构是什么样子的
     * 计算时都假想目标树的样子如下：
     *  1.根结点在最左边，且上下居中
     *  2.树是从左往右生长的结构
     *  3.每个结点都是一块1*1的正方形，top和left分别表示正方形中心的位置
     */

    var config = _config || {},
        // 维护的树
        alltreedata,
        // 根结点ID
        rootid;

    /**
     * 把内部保存的树结点数据
     * 计算结束后会调用配置的绘图方法
     */
    var update = function () {

        var beforeDis = [], size = 0, maxDeep = 0;
        (function positionCalc(pNode, deep) {

            if (deep > maxDeep) maxDeep = deep;
            var flag;
            for (flag = 0; flag < pNode.children.length; flag++)
                // 因为全部的子结点的位置确定了，父结点的y位置就是子结点的中间位置
                // 因此有子结点的，先计算子结点
                positionCalc(alltreedata[pNode.children[flag]], deep + 1);

            // left的位置比较简单，deep从0开始编号
            // 比如deep=0，第一层，left=0+0.5=0.5，也就是根结点
            alltreedata[pNode.id].left = deep + 0.5;
            if (flag == 0) {

                // beforeDis是一个数组，用以记录每一层此刻top下边缘（每一层是从上到下）
                // 比如一层的第一个，top值最小可以取top=0.5
                // 为了方便计算，beforeDis[deep] == undefined的时候表示现在准备计算的是这层的第一个结点
                // 因此设置最低上边缘为-0.5
                if (beforeDis[deep] == undefined) beforeDis[deep] = -0.5;
                // 父边缘同意的进行初始化
                if (beforeDis[deep - 1] == undefined) beforeDis[deep - 1] = -0.5;

                // 添加的新结点top值第一种求法：本层上边缘+1（比如上边缘是-0.5，那么top最小是top=-0.5+1=0.5）
                alltreedata[pNode.id].top = beforeDis[deep] + 1;

                var pTop = beforeDis[deep] + 1 + (alltreedata[pNode.pid].children.length - 1) * 0.5;
                // 计算的原则是：如果第一种可行，选择第一种，否则必须选择第二种
                // 判断第一种是否可行的方法就是：如果第一种计算后确定的孩子上边缘不对导致孩子和孩子的前兄弟重合就是可行的
                if (pTop - 1 < beforeDis[deep - 1])
                    // 必须保证父亲结点和父亲的前一个兄弟保存1的距离，至少
                    // 添加的新结点top值的第二种求法：根据孩子取孩子结点的中心top
                    alltreedata[pNode.id].top = beforeDis[deep - 1] + 1 - (alltreedata[pNode.pid].children.length - 1) * 0.5;

            } else {

                // 此刻flag!=0
                // 意味着结点有孩子，那么问题就解决了，直接取孩子的中间即可
                // 其实，flag==0的分支计算的就是孩子，是没有孩子的叶结点，那是关键
                alltreedata[pNode.id].top = (alltreedata[pNode.children[0]].top + alltreedata[pNode.children[flag - 1]].top) * 0.5;
            }

            // 因为计算孩子的时候
            // 无法掌握父辈兄弟的情况
            // 可能会出现父亲和兄弟重叠问题
            if (alltreedata[pNode.id].top <= beforeDis[deep]) {
                var needUp = beforeDis[deep] + 1 - alltreedata[pNode.id].top;
                (function doUp(_pid, _deep) {
                    alltreedata[_pid].top += needUp;
                    if (beforeDis[_deep] < alltreedata[_pid].top) beforeDis[_deep] = alltreedata[_pid].top;
                    var _flag;
                    for (_flag = 0; _flag < alltreedata[_pid].children.length; _flag++) {
                        doUp(alltreedata[_pid].children[_flag], _deep + 1);
                    }
                })(pNode.id, deep);
            }

            // 计算好一个结点后，需要更新此刻该层的上边缘
            beforeDis[deep] = alltreedata[pNode.id].top;

            // size在每次计算一个结点后更新，是为了最终绘图的时候知道树有多宽（此处应该叫高）
            if (alltreedata[pNode.id].top + 0.5 > size) size = alltreedata[pNode.id].top + 0.5;

        })(alltreedata[rootid], 0);

        // 传递的参数分别表示：记录了位置信息的树结点集合、根结点ID和树的宽
        return {
            "node": alltreedata,
            "root": rootid,
            "size": size,
            "deep": maxDeep + 1
        };

    };

    /**
     * 根据配置的层次关系（配置的id,child,root）把原始数据变成内部结构，方便后期位置计算
     * @param {any} initTree
     *
     * tempTree[id]={
     *  "data":原始数据,
     *  "pid":父亲ID,
     *  "id":唯一标识ID,
     *  "children":[cid1、cid2、...]
     * }
     */
    var toInnerTree = function (initTree) {

        var tempTree = {};
        // 根结点
        var temp = config.root(initTree), id, rid;
        id = rid = config.id(temp);
        tempTree[id] = {
            "data": temp,
            "pid": null,
            "id": id,
            "children": []
        };

        var num = 1;
        // 根据传递的原始数据，生成内部统一结构
        (function createTree(pdata, pid) {
            var children = config.child(pdata, initTree), flag;
            num += children ? children.length : 0;
            for (flag = 0; children && flag < children.length; flag++) {
                id = config.id(children[flag]);
                tempTree[pid].children.push(id);
                tempTree[id] = {
                    "data": children[flag],
                    "pid": pid,
                    "id": id,
                    "children": []
                };
                createTree(children[flag], id);
            }
        })(temp, id);

        return {
            value: [rid, tempTree],
            num: num
        };
    };

    // 可以传递任意格式的树原始数据
    // 只要配置对应的解析方法即可
    var tree = function (initTree) {

        var treeData = toInnerTree(initTree);
        alltreedata = treeData.value[1];
        rootid = treeData.value[0];

        if (treeData.num == 1) {
            alltreedata[rootid].left = 0.5;
            alltreedata[rootid].top = 0.5;
            return {
                deep: 1,
                node: alltreedata,
                root: rootid,
                size: 1
            };
        }

        return update();
    };

    // 获取根结点的方法:root(initTree)
    tree.root = function (rootback) {
        config.root = rootback;
        return tree;
    };

    // 获取子结点的方法:child(parentTree,initTree)
    tree.child = function (childback) {
        config.child = childback;
        return tree;
    };

    // 获取结点ID方法:id(treedata)
    tree.id = function (idback) {
        config.id = idback;
        return tree;
    };

    return tree;

};
