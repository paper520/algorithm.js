import tree from './tree';
import xhtmlToJson from './xhtmlToJson';
import { evalExpress, getValue, setValue } from './value';

// 导出
var algorithm = {
    tree: tree,
    xhtmlToJson: xhtmlToJson,
    evalExpress: evalExpress,
    getValue: getValue,
    setValue: setValue
};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = algorithm;
} else {
    window.algorithm = algorithm;
}
