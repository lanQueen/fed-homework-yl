// code02-04：使用 Maybe 重写 ex4， 不要有 if 语句


const fp = require('lodash/fp');
const { Maybe, Container } = require('./support');
let ex4 = function (n) {
    if (n) {
        return parseInt(n);
    }
}



// Me
const newFunc1 = Maybe.of('23').map(x => parseInt(x))
const newFunc2 = Maybe.of(null).map(x => parseInt(x))
const newFunc3 = Maybe.of(undefined).map(x => parseInt(x))
console.log(newFunc1._value);  // 23
console.log(newFunc2._value);  // null
console.log(newFunc3._value);  // undefined

// teacher
const ex = fp.flowRight(fp.map(parseInt), Maybe.of)
console.log(ex('5')); // [5]

