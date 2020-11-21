JSLitmus.test('解析xhtml为json对象返回', function () {

    algorithm.xhtmlToJson(" <div>            <h2 class='title'>标题</h2>            <p class='item' isFirst=yes>                段落1                <a href=''>链接</a>            </p>            <p>                段落2            </p>            <p>                段落3            </p>            <div>                <i>[1]</i>                句子            </div>        </div>");

});
