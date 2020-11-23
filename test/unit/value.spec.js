QUnit.test('value/getValue', 1, function () {

    deepEqual(10, algorithm.getValue({ a: 'flag' }, 'a', { flag: 10 }));

});

QUnit.test('value/setValue', 1, function () {

    deepEqual({ a: 11 }, algorithm.setValue({ a: 10 }, '"a"', 11, {}));

});

QUnit.test('value/evalExpress', 1, function () {

    deepEqual('flag', algorithm.evalExpress({ a: 'flag' }, 'a', {}));

});
