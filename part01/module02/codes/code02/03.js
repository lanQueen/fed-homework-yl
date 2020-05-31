// code02-03：实现一个函数 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母


const fp = require('lodash/fp');
const { Maybe, Container } = require('./support');
let safeProp = fp.curry(function (x) { return Maybe.of[x] });
let user = { id: 2, name: 'Albert' };



// Me
let ex3 = Maybe.of(user)
            .map(x => fp.first(x.name));

console.log(ex3._value);  // A