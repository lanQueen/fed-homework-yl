# Module1 - Task1 - ES2016



## ES2017 新特性
* ECMAScript2017， 2017 年 6 月发布
* 包含新功能
    - Object.values()：返回对象的所有键值组成的数组
        + Object.keys()，ES2015中发布的返回对象的所有键名组成的数组
    - Object.entries：返回对象中的所有键值对组成的数组
    - Object.getOwnPropertyDescriptors：获取对象的属性完整的描述信息
    - String.prototype.padStart / String.prototype.padEnd：
    - 在函数中添加尾逗号，并不影响实际功能层面的东西
        + 重新排列数组中元素顺序，因为每个元素后面都有逗号，源代码调整起来比较容易
        + 向数组中添加新元素，只需要新建一行，元素放到新一行
    - Async / Await，放到异步编程课程中介绍
```
const obj = {
    foo: 'value1',
    bar: 'value2'
}


// Object.values，返回对象的所有键值组成的数组 -----------------------------------
// Object.keys(obj)，ES2015中发布的返回对象的所有键名组成的数组
console.log(Object.keys(obj)); // [ 'foo', 'bar' ]
// Object.values(obj)，ES2017中发布的返回对象的所有键值组成的数组
console.log(Object.values(obj)); // [ 'value1', 'value2' ]


// Object.entries，返回对象中的所有键值对组成的数组-----------------------------------
console.log(Object.entries(obj)); // [ [ 'foo', 'value1' ], [ 'bar', 'value2' ] ]
for (const [key, value] of Object.entries(obj)) {
    console.log(key, value);
    // foo value1
    // bar value2
}
// Map { 'foo' => 'value1', 'bar' => 'value2' }
console.log(new Map(Object.entries(obj)));


// Object.getOwnPropertyDescriptors，获取对象的属性完整的描述信息 -----------------------------------
const p1 = {
    firstName: 'Lei',
    lastName: 'Li',
    // 这种方法不能通过Object.assign()方法复制
    // 为外界提供只读属性
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
console.log(p1.fullName);

const p2 = Object.assign({}, p1);
p2.firstName = 'jack';
console.log(p2.fullName); // Lei Li，本来应该是 jack Li， 说明Object.assign()复制时把 fullName 当成普通属性复制

const descriptors = Object.getOwnPropertyDescriptors(p1);
const p22 = Object.defineProperties({}, descriptors);
p22.firstName = 'kate';
console.log(p22.fullName); // Kate Li




// String.prototype.padStart / String.prototype.padEnd: 由给定的字符串填充目标字符串的开始或结束位置，直到目标字符串达到指定长度 -----------------------------------
const books = {
    html: 5,
    css: 2124,
    javascript: 12893
}
//这样直接打出来，控制台很乱
for (const [name, count] of Object.entries(books)) {
    console.log(name, count);
    // html 5
    // css 2124
    // javascript 12893
}

// 对齐元素
for (const [name, count] of Object.entries(books)) {
    console.log(`${name.padEnd(16, '-')} | ${count.toString().padStart(5, '0')}`);
    // html------------ | 00005
    // css------------- | 02124
    // javascript------ | 12893
}




// 在函数中添加尾逗号，并不影响实际功能层面的东西 -----------------------------------
// 对于源代码而言，让源代码管理工具更精确的定位代码实际发生变化的位置
// ES2017允许定义函数参数和调用函数参数时使用尾逗号
function foo (bar, baz, ) {

}
const newArr = [100, 200, 300,]

```


