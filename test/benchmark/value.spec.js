JSLitmus.test('设置指定对象上字符串表达式对应的值', function () {

    algorithm.setValue({ a: 10 }, '"a"', 11, {});

});

JSLitmus.test('获取指定对象上字符串表达式对应的值', function () {

    algorithm.getValue({ a: 'flag' }, 'a', { flag: 10 });

});

JSLitmus.test('解析指定对象上字符串表达式', function () {

    algorithm.evalExpress({ a: 'flag' }, 'a', {});

});

JSLitmus.test('new Function', function () {

    var temp = (new Function("return { a: 'flag' }['a']"))();

});

JSLitmus.test('eval', function () {

    eval("{ a: 'flag' }['a']");

});

JSLitmus.test('js', function () {

    let temp = { a: 'flag' }['a'];

});

JSLitmus.test('evalExpress:复杂的', function () {

    algorithm.evalExpress({
        _size: { width: 462 }, data: [
            [20, 30, 10, 35],
            [40, 35, 30, 55],
            [33, 38, 33, 40],
            [40, 40, 32, 42]]
    }, '( _size.width - 100 ) / data.length * ( index + 0.2 ) + 50', {
        index: 2
    });

});
