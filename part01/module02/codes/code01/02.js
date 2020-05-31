// code01-02：使用 fp.flowRight() ，fp.prop()，fp.first() 获取第一个 car 的 name


const fp = require('lodash/fp');
const { cars } = require('./basic');



// Me
const getName = fp.flowRight(fp.prop('name'), fp.first);
console.log(getName(cars));   // Ferrari FF