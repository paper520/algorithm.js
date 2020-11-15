QUnit.test('tree', 14, function () {

    var data = algorithm.tree({
        "root": function (initTree) {
            return initTree[0];
        },
        "id": function (treedata) {
            return treedata[0]
        },
        "child": function (parentTree, initTree) {
            var children = [], i;
            for (i = 0; i < initTree.length; i++) {
                if (initTree[i][1] == parentTree[0])
                    children.push(initTree[i]);
            }
            return children;
        }
    })([
        // 结点名称、父节点名称
        ["手绘", null],
        ["水粉", "手绘"],
        ["油画", "手绘"],
        ["素描", "手绘"],
        ["中国画", "手绘"],
        ["空间透视", "素描"],
        ["色彩五大调", "素描"],
    ]);

    equal(data.node['手绘'].left, 0.5);
    equal(data.node['水粉'].left, 1.5);
    equal(data.node['油画'].left, 1.5);
    equal(data.node['素描'].left, 1.5);
    equal(data.node['中国画'].left, 1.5);
    equal(data.node['空间透视'].left, 2.5);
    equal(data.node['色彩五大调'].left, 2.5);

    equal(data.node['手绘'].top, 2);
    equal(data.node['水粉'].top, 0.5);
    equal(data.node['油画'].top, 1.5);
    equal(data.node['素描'].top, 2.5);
    equal(data.node['中国画'].top, 3.5);
    equal(data.node['空间透视'].top, 2);
    equal(data.node['色彩五大调'].top, 3);

});
