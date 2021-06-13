import tree from './tree';
import xhtmlToJson from './xhtmlToJson';
import { evalExpress, getValue, setValue } from './value';
import scss from './scss';

// 导出
var algorithm = {
    tree: tree,
    xhtmlToJson: xhtmlToJson,
    evalExpress: evalExpress,
    getValue: getValue,
    setValue: setValue,
    scss: scss
};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = algorithm;
} else {
    window.algorithm = algorithm;
}
