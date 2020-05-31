# Module1 - Task1 - ES2016


## ES2016 新特性
* ECMAScript2016， 2016 年 6 月发布
* 有两个新功能
    - includes(): 检查数组/字符串中是否包含某个元素，返回 true/false
        + 可以查找 NaN 元素；相比于 indexOf()，indexOf()查找不到 NaN 元素，只能返回-1
    - 指数运算符: 底数 ** 指数
```
// Array.prototype.includes -----------------------------------------
// 检查数组/字符串中是否包含某个元素
const arr = ['foo', 1, NaN, false];
const str = 'fhkfsd';
// 查找数组中是否存在某个元素，找到了返回该元素下标，找不到返回-1；不能用于查找数组中的 NaN
console.log(arr.indexOf('foo')); // 0
console.log(arr.indexOf(false)); // 3
console.log(arr.indexOf(NaN));  // -1
console.log(str.indexOf(9)); // -1
console.log(str.indexOf('s')); // 4

// ES2016 中 arr.includes(NaN)，查找元素，直接返回 true/false；还可以用于查找NaN
console.log(arr.includes(false)); // true
console.log(arr.includes(NaN));  // true
console.log(arr.includes('##'));  // false
console.log(str.includes(9)); // false
console.log(str.includes('s')); // true


// 指数运算符 -----------------------------------------
// 传统方法的指数运算，借助 Math.pow(底数，指数)
console.log(Math.pow(2, 10)); // 1024

// ES2016 指数运算符, 底数 ** 指数
console.log(2 ** 10); // 1024

```




