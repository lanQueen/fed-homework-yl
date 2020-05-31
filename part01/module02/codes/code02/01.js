// code02-01：使用 fp.add(x, y) 和 fp.map(f, x) 创建一个能让 functor 里的值增加的函数 ex1


const fp = require('lodash/fp');
const { Maybe, Container } = require('./support');
let maybe = Maybe.of([5, 6, 1]);


// Me
let ex1 = fp.map(x => fp.add(x, 1));
console.log(ex1(maybe._value));  // [ 6, 7, 2 ]
