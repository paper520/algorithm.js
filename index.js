import tree from './tree';
import xhtmlToJson from './xhtmlToJson';
import { getValue, setValue } from './value';

// 导出
let algorithm = {
    tree,
    xhtmlToJson,
    getValue,
    setValue
};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = algorithm;
} else {
    window.algorithm = algorithm;
}
