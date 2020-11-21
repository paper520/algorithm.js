QUnit.test('xhtmlToJson', 3, function () {

    var data = algorithm.xhtmlToJson(" <div>            <h2 class='title'>标题</h2>            <p class='item' isFirst=yes>                段落1                <a href=''>链接</a>            </p>            <p>                段落2            </p>            <p>                段落3            </p>            <div>                <i>[1]</i>                句子            </div>        </div>");

    deepEqual(data[0], {
        attrs: {},
        childNodes: [1, 3, 7, 9, 11],
        name: "div",
        nextNode: null,
        parentNode: null,
        preNode: null,
        type: "tag",
        __deep__: 1,
        __tagType__: "double"
    }, '0');

    deepEqual(data[1], {
        attrs: { class: "title" },
        childNodes: [2],
        name: "h2",
        nextNode: 3,
        parentNode: 0,
        preNode: null,
        type: "tag",
        __deep__: 2,
        __tagType__: "double"
    }, '1');

    deepEqual(data[2], {
        childNodes: [],
        content: "标题",
        nextNode: null,
        parentNode: 1,
        preNode: null,
        type: "text",
        __deep__: 3
    }, '2');

});
