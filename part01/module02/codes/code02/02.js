// code02-02：实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素


const fp = require('lodash/fp');
const { Maybe, Container } = require('./support');
let  xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);



// Me
let ex1 = xs.map(fp.first);
console.log(ex1._value); // do

// teacher 
let ex2 = xs.map(fp.map(fp.first));
console.log(ex2._value); // ['d', 'r', 'm', 'f', 's', 'l', 't', 'd']