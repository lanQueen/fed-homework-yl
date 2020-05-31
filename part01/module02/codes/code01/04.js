// code01-04：使用 flowRight 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串，把数组中的 name 转换为这种形式：例如： sanitizeNames(["HelloWorld"] => ["hello_world"])

const fp = require('lodash/fp');
const { cars } = require('./basic');

// 无须改动，并在 sanitizeNames() 中使用它
let _underscope = fp.replace(/\W+/g, '_'); 



// Me
const sanitizeNames = fp.map(fp.flowRight(_underscope, fp.toLower, fp.prop('name')))
console.log(sanitizeNames(cars));

/* 
[
  'ferrari_ff',
  'spyker_c12_zagato',
  'jaguar_xhr_s',
  'audi_r8',
  'aston_martin_one_77',
  'pagani_huayra'
] 
*/