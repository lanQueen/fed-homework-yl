// code01-03：使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式实现

const fp = require('lodash/fp');
const { cars } = require('./basic');

// 无须改动
let _average = function(xs) {
    console.log(xs)
    return fp.reduce(fp.add, 0, xs) / xs.length;
}


let averageDollarValue = function (cars) {
    let dollar_values = fp.map(
        function(car) {
            return car.dollar_value
        },
        cars
    );
    return _average(dollar_values);
}
// console.log(averageDollarValue(cars));  // 790700


// Me
const getAverageValue = fp.flowRight(_average, fp.map(v => v.dollar_value));
console.log(getAverageValue(cars));  // 790700