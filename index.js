import tree from './tree';

// 导出
let algorithm = {
    tree
};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = algorithm;
} else {
    window.algorithm = algorithm;
}
