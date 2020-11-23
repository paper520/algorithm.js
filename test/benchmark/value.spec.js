JSLitmus.test('设置指定对象上字符串表达式对应的值', function () {

    algorithm.setValue({ a: 10 }, '"a"', 11, {});

});

JSLitmus.test('获取指定对象上字符串表达式对应的值', function () {

    algorithm.getValue({ a: 'flag' }, 'a', { flag: 10 });

});

JSLitmus.test('解析指定对象上字符串表达式', function () {

    algorithm.evalExpress({ a: 'flag' }, 'a', {});

});
