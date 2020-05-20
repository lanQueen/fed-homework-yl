# 一、简答题
## 1. 请说出下列最终的执行结果，并解释为什么？

```
var a = [];
for (var i = 0; i < 10; i ++) {
    a[i] = function () {
        console.log(i);
    }
}
a[6]();

```
### 解答
* 执行结果： 10
* 结果解释：var 定义的变量 i 是全局变量，所以打印的 i 始终是全局作用域中的 i，循环结束后，全局变量 i 被累加到 10，故打印结果是 10






## 2. 请说出下列最终的执行结果，并解释为什么？

```
var tmp = 123;
if (true) {
    console.log(tmp);
    let tmp;
}

```
### 解答
* 执行结果：控制台报错
* 结果解释：if 大括号里面的块级作用域，let 声明变量不会出现变量提升，在 {} 里面的打印属于未声明先使用，所以会报错








## 3. 结合 ES6 新语法，用最简单的方式找出数组中的最小值？

```
var arr = [12, 34, 32, 89, 4];

```
### 解答
* 代码如下

```
var arr = [12, 34, 32, 89, 4];
const min = Math.min(...arr);
console.log(min);  // 4

```







## 4. 请详细说明 var，let，const 三种声明变量的方式之间的具体差别？
### 解答
* let
    - 具有块级作用域
    - 不会产生变量提升问题
    - 不能重复声明
    - 可以重复赋值
* const
    - 具有块级作用域
    - 不会产生变量提升问题
    - 不能重复声明
    - 声明变量时就要赋值，不能重复赋值，指的是不允许修改该变量指向的内存地址
* var
    - var 定义的变量属于全局变量
    - 有变量提升问题，可以未声明先使用
    - 可以重复声明，重复赋值





## 5. 请说出下列最终的执行结果，并解释为什么?

```
var a = 10;
var obj = {
    a: 20,
    fn () {
        setTimeout(() => {
            console.log(this.a);
        });
    }
}
obj.fn();

```
### 解答
* 执行结果：20
* 结果解释：定时器是一个箭头函数，箭头函数不会影响内部的 this 指向，这个箭头函数的 this 指向继承自上一级的上下文，定时器的上一级是 fn 函数，fn 是个普通函数，普通函数的 this 指向是谁调用，指向谁，故定时器的 this 指向 obj 对象，因此 this.a = 20；打印结果是 20。







## 6. 简述 Symbol 类型的用途？
### 解答
* 1、为对象创建唯一的属性名，避免对象属性名重复产生的问题
* 2、模拟对象的私有成员，因为 Symbol() 创建的值是唯一的，所以对象内用 Symbol() 创建的私有成员，外部获取不到（此处注意，不能将 Symbol() 赋值给变量，再将此变量设置成对象属性，这种情况下，外部是能够获取到的）





## 7. 说说什么是浅拷贝，什么是深拷贝？
### 解答
* 浅拷贝：只复制变量的数值，不复制变量指向的地址，新旧变量仍然共享同一块内存，修改新变量，旧变量也会被更改

* 深拷贝：既复制变量的数值，也复制变量指向的地址，新旧变量不共享内存，修改新变量不会影响旧的变量







## 8. 谈谈你是如何理解 JS 异步编程的，Event Loop 是做什么的，什么是宏任务，什么是微任务？
### 解答
* JS 异步编程：JS 在执行异步任务时，不需要一直等待响应返回了才执行其他任务，而是可以一边等待响应返回一边执行其他任务；

* Event Loop：为了解决 js 遇到耗时任务无法响应的问题，采用事件循环机制负责主线程和其他线程通信，是其他线程的任务进入主线程开始运行的一个中转站；

* 宏任务：绝大多数的异步调用都是作为宏任务；

* 微任务：Promise、MutationObserver、Process.nextTick(node 环境)属于微任务；







## 9. 将下面异步代码使用 Promise 改进？

```
setTimeout(function () {
    var a = "hello";
    setTimeout(function () {
        var b = "lagou";
        setTimeout(function () {
            var c = "I ❤️ U";
            console.log(a + b + c);
        }, 10);
    }, 10);
}, 10);

```
### 解答

* 代码如下
```

function delay(time) {
    const start = new Date();
    while(new Date() - start < time){}
}

const promise = new Promise((resolve, reject) => {
    delay(10);
    resolve('hello');
});
promise.then((value) => {
    delay(10);
    return `${value}lagou`;
}).then((value) => {
    delay(10);
    const result = `${value}I ❤️ U`;
    console.log(result)
}).catch((err) => {
    console.log(err);
});

```






## 10. 请简述 TypeScript 与 JavaScript 之间的关系？
### 解答
* TypeScript 是 JavaScript 的超集，在 JavaScript 基础上多了一些扩展特性，主要提供了类型系统和对 ES6 的支持
* TypeScript 最终会编译为 JavaScript







## 11. 请谈谈你所认为的 TypeScript 优缺点？
### 解答
* 优点：
    - 功能强大，生态健全完善，拥有强大的社区，很多 npm 模块都提供了类型声明文件
    - 在开发过程中，可以处理类型异常，提高代码的可靠程度和开发效率
    - 增加了代码的可读性和可维护性
    - 任何一种 JavaScript 运行环境都支持

* 缺点：
    - 语言本身有很多概念，增加了学习成本
    - 小项目使用需要开发成本