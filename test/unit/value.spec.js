QUnit.test('value/getValue', 2, function () {

    deepEqual(10, algorithm.getValue({ a: 'flag' }, 'a', { flag: 10 }));
    deepEqual(3, algorithm.getValue([{ 'value-index': [1, 2, 3] }], "[0]['value-index'][index+1]", { index: 1 }));

});

QUnit.test('value/setValue', 2, function () {

    deepEqual({ a: 11 }, algorithm.setValue({ a: 10 }, '"a"', 11, {}));
    deepEqual({ a: { b: { key: 'yes' } } }, algorithm.setValue({}, '["a"].b[c]', 'yes', { c: 'key' }));

});

QUnit.test('value/evalExpress', 11, function () {

    deepEqual('flag', algorithm.evalExpress({ a: 'flag' }, 'a', {}));
    deepEqual(11, algorithm.evalExpress({ flag: 2 }, 'flag+10', { flag: 1 }));
    deepEqual(-9, algorithm.evalExpress({ index: -1 }, "a.b[index+1]-10", { a: { b: [1] } }));
    deepEqual(-8.7, algorithm.evalExpress({ a: 1, b: 2, d: 3 }, "(a+b)/10-c[d]", { c: [6, 7, 8, 9] }));
    deepEqual(104, algorithm.evalExpress([100], "[((a+b)-c)*f]+d", { a: 1, b: 2, c: 3, d: 4, f: 5 }));
    deepEqual(false, algorithm.evalExpress({ flag: false }, "!flag", { flag: true }));
    deepEqual(true, algorithm.evalExpress({ flag: false }, "(a>0 &&b<=1) || !flag", { flag: true, a: 2, b: 1 }));
    deepEqual(true, algorithm.evalExpress({}, '"(flag)" == "("+temp+")"', { temp: 'flag' }));
    deepEqual(false, algorithm.evalExpress({}, '"(flag)" == "("+temp+")"', { temp: 'xxx' }));
    deepEqual('flag2', algorithm.evalExpress({}, 'a>10?"flag1":"flag2"', { a: 1 }));
    deepEqual('flag1', algorithm.evalExpress({}, 'a>10?"flag1":"flag2"', { a: 11 }));

});


QUnit.test('value/实际调试', 3, function () {

    deepEqual(10, algorithm.evalExpress({
        lct: { nodes: [{ position: 10 }] }
    }, "lct.nodes[value.begin].position", {
        value: { begin: 0 }
    }));

    deepEqual(99, algorithm.evalExpress({}, '-1*(_size.height-100)', { _size: { height: 1 } }));
    deepEqual(-4.5, algorithm.evalExpress({}, '-1.5*(_size.height- -2)', { _size: { height: 1 } }))

});
