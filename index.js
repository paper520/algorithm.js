import tree from './tree';
import xhtmlToJson from './xhtmlToJson';
import { evalExpress, getValue, setValue } from './value';

// 导出
let algorithm = {
    tree,
    xhtmlToJson,
    evalExpress,
    getValue,
    setValue
};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = algorithm;
} else {
    window.algorithm = algorithm;
}
