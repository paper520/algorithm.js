JSLitmus.test('基本的树结构位置生成算法', function () {

    algorithm.tree({

        // 获取根结点
        root: function (initTree) {
            return initTree[0];
        },

        // 获取孩子结点
        child: function (parentTree, initTree) {
            var children = [], i;
            for (i = 0; i < initTree.length; i++) {
                if (initTree[i][1] == parentTree[0])
                    children.push(initTree[i]);
            }
            return children;
        },

        // 获取结点标志id
        id: function (initTree) {
            return initTree[0];
        }

    })([

        // 结点名称、父节点名称
        ["手绘", null],
        ["水粉", "手绘"],
        ["油画", "手绘"],
        ["素描", "手绘"],
        ["中国画", "手绘"],
        ["空间透视", "素描"],
        ["色彩五大调", "素描"]

    ]);

});
