设置或获取指定对象上字符串表达式对应的值
======================

- 解析指定对象上字符串表达式

```js
var value=evalExpress(target, express, scope = {});
```

在指定对象target上求解表达式express的值，一个可选参数scope表示，如果scope有值，会拦截target，下同。

- 获取指定对象上字符串表达式对应的值

```js
var value=getValue(target, express, scope = {});
```

- 设置指定对象上字符串表达式对应的值

```js
var newTarget=setValue(target, express, value, scope = {});
```

虽然会返回新的值，不过旧的值也同步修改了。

[<< 返回首页](../README.md)
