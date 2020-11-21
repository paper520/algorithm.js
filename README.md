# 🔪 algorithm.js - 一些前端常用的算法实现合集

<p>
  <a href="https://yelloxing.gitee.io/npm-downloads?interval=7&packages=@hai2007/algorithm"><img src="https://img.shields.io/npm/dm/@hai2007/algorithm.svg" alt="downloads"></a>
  <a href="https://packagephobia.now.sh/result?p=@hai2007/algorithm"><img src="https://packagephobia.now.sh/badge?p=@hai2007/algorithm" alt="install size"></a>
  <a href="https://www.jsdelivr.com/package/npm/@hai2007/algorithm"><img src="https://data.jsdelivr.com/v1/package/npm/@hai2007/algorithm/badge" alt="CDN"></a>
  <a href="https://www.npmjs.com/package/@hai2007/algorithm"><img src="https://img.shields.io/npm/v/@hai2007/algorithm.svg" alt="Version"></a>
  <a href="https://github.com/hai2007/algorithm.js/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@hai2007/algorithm.svg" alt="License"></a>
</p>

## Issues
使用的时候遇到任何问题或有好的建议，请点击进入[issue](https://github.com/hai2007/algorithm.js/issues)，欢迎参与维护！

## How to use?
首先你需要通过命令行安装：

```bash
npm install --save @hai2007/algorithm
```

安装好了以后，然后引入你需要的算法：

- 基本的树结构位置生成算法

```js
import tree from '@hai2007/algorithm/tree.js';
```

[<< 查看文档](./apis/tree.md)

- 解析xhtml为json对象返回

```js
import xhtmlToJson from '@hai2007/algorithm/xhtmlToJson.js';
```

[<< 查看文档](./apis/xhtmlToJson.md)

## Special attention

为了减小打包体积，上面单独引入的方式引入的文件都没有经过babel转义，如果你希望使用转义后的，可以有如下方式引入：

```js
import algorithm from '@hai2007/algorithm';
```

或

```html
<script src='https://cdn.jsdelivr.net/npm/@hai2007/algorithm'></script>
```

如果是node.js环境，请使用这种方式引入：

```js
const algorithm = require('@hai2007/algorithm');
```

## 联系我们

- QQ: 2501482523
- Email: 2501482523@qq.com

开源协议
---------------------------------------
[MIT](https://github.com/hai2007/algorithm.js/blob/master/LICENSE)

Copyright (c) 2020-present hai2007 走一步，再走一步。
