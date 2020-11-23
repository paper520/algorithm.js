export default function (target, expressArray, scope) {
    let value = expressArray[0] in scope ? scope[expressArray[0]] : target[expressArray[0]];
    for (let i = 1; i < expressArray.length; i++) {
        try {
            value = value[expressArray[i]];
        } catch (e) {
            console.error({
                target,
                scope,
                expressArray,
                index: i
            });
            throw e;
        }
    }
    return value;
};
