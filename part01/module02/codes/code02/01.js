// code02-01：使用 fp.add(x, y) 和 fp.map(f, x) 创建一个能让 functor 里的值增加的函数 ex1


const fp = require('lodash/fp');
const { Maybe, Container } = require('./support');
let maybe = Maybe.of([5, 6, 1]);


// Me
// let ex1 = fp.map(x => fp.add(x, 1));
// console.log(ex1(maybe._value));  // [ 6, 7, 2 ]

// teacher
let ex2 = (maybe) => (y) => maybe.map(fp.map(x => fp.add(x, y)))
// console.log(ex2(maybe)(1))

// 解释，其实是使用了函数柯里化
function curryFn (fn) {
    return function(y) {
        return fn.map(fp.map(x => fp.add(x, y)))
    }
}
const result = curryFn(maybe);
console.log(result(1));
console.log(result(2));
