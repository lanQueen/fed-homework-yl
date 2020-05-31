// code01-01：使用函数组合 fp.flowRight() 重新实现下面这个函数
const fp = require('lodash/fp');
const { cars } = require('./basic');



// 原代码
let isLastInStock = function(cars) {
    // 获取最后一条数据
    let last_car = fp.last(cars);
    // 获取最后一条数据的 in_stock 属性值
    return fp.prop('in_stock', last_car);
}
// console.log(isLastInStock(cars));  // false



// Me
const getValue = fp.flowRight(fp.prop('in_stock'), fp.last);
console.log(getValue(cars));  // false