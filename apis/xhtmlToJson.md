解析xhtml为json对象返回
======================

此算法用于把xhtml字符串变成易于使用的json对象：

```js
// noIgnore为true表示不忽略任何标签，默认false
var xhtmlJSON=xhtmlToJson(template[, noIgnore]);
```

这样我们就获取了包含需要信息的json对象，其实就是模仿浏览器构建的一棵树,每个结点有如下属性：

```js
{

    "type":       ['tag'|'text'] 节点类型

    // 关系属性
    "parentNode": index          父结点
    "childNodes": Array<index>   孩子结点
    "preNode":    index          前一个兄弟结点
    "nextNode":   index          后一个兄弟结点

    // 元素tag结点有效
    "attrs":{}                   当前结点的属性
    "name":                      节点名称

    // 文本text结点有效
    "content":                   文本结点内容

}
```

返回的结果是一个数组，表示一系列结点，通过’关系属性‘辅助串联起来。

> 需要注意的是：如果一个文本结点内容只包含回车，tab，空格等空白字符，会直接被忽视

[<< 返回首页](../README.md)
