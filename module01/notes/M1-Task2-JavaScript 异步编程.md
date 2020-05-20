# Module1 - Task2 - JavaScript 异步编程



## 实现 JavaScript 异步编程的方法
* 回调函数
* 事件监听
* 发布/订阅
* Promise



# 一、概述
## JavaScript 采用单线程模式工作即执行环境中，负责执行代码的线程只有一个
* 单线程模式
    - 优点：更安全更简单
    - 缺点：耗时任务阻塞执行

* JavaScript 将任务执行模式分成了两种
    - 同步模式（Synchronous）
    - 异步模式（Asynchronous）

* 本节内容概览
    - 同步模式与异步模式各自存在的存在意义和差异
    - 事件循环与消息队列
    - 异步编程的几种方式
    - ES2015 中Promise 异步方案、宏任务/微任务队列
    - ES2015 中Generator 异步方案、ES2017 中Async/Await语法糖





## 同步模式（Synchronous）
* 代码中的任务一次执行，后一个任务必须等待前一个任务执行结束后才能执行，程序执行顺序与代码编写顺序完全一致
* 单线程情况下，大多数任务都会以同步模式执行，同步模式执行并不代表同时执行，而是排队执行

* js 在执行引擎中，维护了一个正在执行的工作表，工作表中的任务排队执行
* 排队执行产生的问题：
    - 如果某一行代码执行时间过长，后面的代码就会延迟执行即阻塞，这种会导致页面停顿或卡死

```
console.log('global begin');
function bar() {
    console.log('bar task');
}

function foo() {
    console.log('foo task');
    bar();
}
foo();
console.log('global end');

// global begin
// foo task
// bar task
// global end

/**
 * 首先会加载整体的代码，在调用栈中压入一个匿名的全局调用，然后依次执行每行代码
 
 * callback(调用栈)
 
 * 代码开始执行后，首先 console.log('global begin')进入调用栈，此时控制台打印出 global begin；执行结束后， console.log('global begin')移出调用栈；
 
 * 紧接着，代码继续执行，定义 bar函数和 foo函数，当代码执行到 foo()时，foo() 进入调用栈，然后 console.log('foo task')进入调用栈，控制台打印出 foo task后，此行代码执行结束，console.log('foo task')移出调用栈；然后 bar()进入调用栈，代码 console.log('bar task') 进入调用栈，此时控制台打印出 bar task 后，console.log('bar task') 移出调用栈；此时 bar()执行结束，bar()移出调用栈；随后 foo() 执行结束，foo()移出调用栈
 
 * 然后执行 console.log('global end')进入调用栈，控制台打印出 global end 后，代码执行结束，console.log('global end')移出调用栈，随后调用栈清空
 
 * 代码进入调用栈叫做压栈，移出调用栈叫做弹栈
 */
 
 
 
// 直接运行 js 文件方法
// package.json
{
    "devDependencies": {
        "html-webpack-plugin": "^3.2.0",
        "webpack": "^4.41.2",
        "webpack-cli": "^3.3.10",
        "webpack-dev-server": "^3.9.0"
      }
}

// webpack.config.js 配置
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'none',
  stats: 'none',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
 
```






## 异步模式（Asynchronous）
* 不会等待这个任务结束后再去执行下一个任务；对于耗时任务，开启过后就立即执行下一个任务，耗时任务的后续逻辑一般会通过回调函数的方式定义
* 没有异步模式，单线程的 JavaScript 语言就无法同时处理大量耗时任务
* javascript是单线程执行（执行代码的线程）的，但是浏览器是多线程的，例如倒计时器，内部有专门的线程进行倒数，这些内部的 API 是多线程的
### 同步/异步模式的异同：
* 同步模式和异步模式指的是：
    - 运行环境提供的 API 是以异步或异步模式的方式工作
* 同步模式的 API是指：
    - 当前任务执行结束，代码才会继续往下执行，如 console.log
* 异步模式的 API 是指：
    - 下达这个任务开始执行的指令后，代码就会继续往下执行，例如 setTimeout

```
console.log('global begin');

setTimeout(function timer1() {
    console.log('timer1 invoke');
}, 1800);


setTimeout(function timer2() {
    console.log('timer2 invoke');

    setTimeout(function inner() {
        console.log('inner invoke');
    }, 1000);
}, 1000);

console.log('global end');

// 执行结果及顺序：
// global begin
// global end
// timer2 invoke
// timer1 invoke
// inner invoke

/**
 * 调用栈（callback）、消息队列（Queue）、事件循环（Event Loop）
 * 
 * 首先依然会加载整体的代码，在调用栈中压入一个匿名的全局调用，然后依次执行每行代码
 * 
 * 首先，console.log('global begin')压栈，控制台打印完成后， console.log('global begin')弹栈
 
 * 然后，timer1压栈，由于它是异步调用，Web API 会为 timer1开启一个1.8s 的倒计时器(这个倒计时器是单独工作的，不会受 js 线程的影响，当开始执行这行代码的时候，这个倒计时器就已经开始倒计时了)，倒计时器开始后，timer2 弹栈

 * 随后，timer2压栈，Web API 会为 timer2开启 另外一个 1s 的倒计时器，这个倒计时器开启后，timer2 弹栈

 * 紧接着，console.log('global end')压栈，控制台打印后，console.log('global end')弹栈；

 * 此时代码的匿名调用就全部完成了，调用栈会被清空


 * Event Loop 负责监听调用栈和消息队列，当调用栈所有任务都结束后，Event Loop 会从消息队列中取出第一个函数压入调用栈，而此时，消息队列暂时是空的，执行相当于暂停了
 
 * 根据倒计时时长，timer2先结束，timer2的倒计时结束后，timer2()会被放入消息队列的第一位；timer1的倒计时结束后，timer1()会被放入消息队列的第 二位
 
 * 一旦消息队列中发生变化，Event Loop 会监听到，就会把消息队列中的第一个函数即 timer2 函数压栈，此时调用栈开始新一轮的执行

 * 当调用栈开始新一轮执行后，执行 timer2 函数，控制台打印timer2 invoke，随后 inner()压栈，inner()是个异步函数，Web API 会为 inner 开启一个 1s 的倒计时，倒计时一旦开始，inner()弹栈，此时 timer2 执行完成，timer2 弹栈

 * 然后 Event Loop把消息队列中的 timer1 压栈，控制台打印 timer1 invoke 后，timer1 弹栈；

 * inner 倒计时结束后，inner()会被放入消息队列，Event Loop监听到，会把消息队列的第一个函数 inner()压栈，由此，调用栈开始第三轮的执行

 * 当控制台打印 inner invoke 后，inner()弹栈，由此全部代码全部执行完成

 * 就这样按照这种重复，直到调用栈和消息队列中都没有需要执行的任务，整体的代码就都结束了

 * 如果说调用栈是正在执行的工作表，消息队列就是待办的工作表，js 执行引擎就是先做完调用栈中所有的任务，再通过Event Loop 从消息队列中再取一个任务，继续放到调用栈中执行，以此类推，随时可以往消息队列中放入任务，这些任务在消息队列中排队等待Event Loop
 
 * 整个过程中，通过内部的消息队列和事件循环执行的，这些步骤不会管其他步骤处于什么情况，它们都是有各自的 time line，各自执行
 
 */

```







## 回调函数
* 所有异步编程方案的根基
* 我想刷油漆->（怎么刷漆）你帮我买油漆-》买完油漆你帮我刷漆
* 我是调用者，你是执行者，怎么刷漆是调用者调用的回调函数，找你帮我买油漆是调用
* 由调用者定义，交给执行者执行的函数
* 回调函数：直接使用传统回调方式完成复杂的异步流程，无法避免大量的回调函数嵌套，产生回调地狱

```
function foo (callback) {
    setTimeout(function() {
        callback();
    }, 3000);
}

foo(function() {
    console.log('这就是一个回调函数');
    console.log('调用者调用这个函数，执行者执行这个函数');
    console.log('其实就是调用者告诉执行者异步任务结束后应该做什么');
});
```






## Promise
### Promise 概述
* Promise是一种更优的异步编程统一方案
* CommonJS 社区提出了 Promise 的规范，在 ES2015 中被标准化，成为语言规范
* 一个对象，用来表示一个异步任务完成后，结果是成功还是失败，对外界做出的承诺
    - Promise -》开始状态是Pending（待定状态） 
        + 执行后，可能是成功，状态就是Pending-》Fulfilled，结果就是 onFulfilled
        + 执行后，可能是失败，状态就是Pending-》Rejected，结果就是 onRejected
    - Promise 的特点，一旦明确结果后，就不可能再发生改变


### Promise 基本语法
* 直接使用 js 在浏览器运行方法：
    - 安装npm install webpack-dev-server -dev
    - yarn webpack-dev-server 04-promise-sample.js --open 

```
const promise = new Promise(function (resolve, reject) {
    // 这里用于"兑现"承诺
    // resolve(100); // 承诺达成

    reject(new Error('promise rejected'));  // 承诺失败
});
promise.then(function(value){
    console.log('resolved', value);
}, function(value){
    console.log('rejected', value);
});
console.log('end');

```
### Promise 使用案例
* 使用 Promise 方式封装 ajax

```
// 使用 Promise 方式封装 ajax
function ajax(url) {
    return  new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        // 设置请求方式
        xhr.open('GET', url);
        // html5请求新特性，在请求完成后直接获取到 json 对象
        xhr.responseType = 'json';
        // html5 提供的新事件，请求完成后执行
        xhr.onload = function() {
            // 状态为 200，请求成功
            if (this.status === 200) {
                resolve(this.response);
            } else { // 否则，请求失败
                reject(new Error(this.statusText));
            }
        }
        // 发生请求
        xhr.send();
    });
}
ajax('/api/users.json').then(function(res){
    console.log(res);
}, function(err) {
    console.log(err);
});


// 下面例子中的 ajax(url)方法都是当前例子中使用 Promise 方式封装的 ajax 方法
```

### Promise 常见误区
* Promise 的本质是使用回调函数的方式，定义的异步任务结束后所需要执行的任务
* 使用 promise 嵌套是使用 promise 的常见误区，应该借用 promise 的链式调用，来尽量保证异步任务的扁平化

```
// promise的误区，回调嵌套
ajax('/api/users.json').then(function(res1){
    console.log(res1);
    ajax('/api/users.json').then(function(res2){
        console.log(res2);
        ajax('/api/users.json').then(function(res3){
            console.log(res3);
            ajax('/api/users.json').then(function(res4){
                console.log(res4);
            }, function(err) {
                console.log(err);
            });
        }, function(err) {
            console.log(err);
        });
    }, function(err) {
        console.log(err);
    });
}, function(err) {
    console.log(err);
});

```
### Promise 链式调用
* Promise 对象的 then 方法返回一个全新的 Promise 对象
* 后面的 then 方法就是在为上一个 then 方法返回的 Promise 对象注册回调
* 前面 then 方法中回调函数的返回值会作为后面 then 方法回调的参数
* 如果回调中返回的是 Promise对象，那后面的 then 方法的回调会等待它的结束
* then/catch 约定接收一个 function 作为参数，传入非函数的参数会发生值穿透情况
* Promise 方法链通过 return 传值，没有 return 就只是相互独立
```
Promise.resolve(1).then(function(){return 2}).then(function(){return Promise.resolve(3)}).then(console.log) // 3
Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log) //1

```





```

const promise = ajax('/api/users.json');
// then(onFulfilled(), onRejected()) 为 promise 对象添加状态明确后的回调函数，
// then()返回的是一个全新的 promise 对象
const promise2 = promise.then(
    // 第一个参数，成功回调
    function onFulfilled (value){
        console.log('onFulfilled', value);
    }, 
    // 第二个参数失败回调，可以省略
    function onRejected (err) {
        console.log('onRejected', err);
    }
);
// console.log(promise2);
// console.log(promise2 === promise); // false

// 链式调用 then，每一个 then()实际上都是在为上一个 then() 返回的 promise 对象去添加状态明确过后的回调，这些 promise 会依次执行，这些 then()回调函数也会依次执行
ajax('/api/users.json')
    .then(function(value) {
        console.log(111);
        return ajax('/api/users.json'); // 此处的 ajax 回调执行后，会自动执行下面的 then()，下面的 then()就是为这个 ajax 添加状态明确过后的回调
    }) // => Promise
    .then(function(value) {
        console.log(222);
        console.log(value); // json 文件的内容
    }) // => Promise
    .then(function(value) {
        console.log(333);
        console.log(value);
        // 如果回调中返回的不是 promise 对象，是一个值，那这个值就是下面 then()接收的值；如果没有 return 任何值，下面 then()接收的值就是 undefined
        return 'foo';
    }) // => Promise
    .then(function(value) {
        console.log(444);
        console.log(value); // foo
    }) // => Promise
```
 
### Promise 异常处理
* catch 方法更适用于链式调用， 建议使用这种方法，分开指定成功和失败回调
* Promise 对象的任何异常都会被一直向后传递，直至被捕获
* catch()相当于 then()的别名，then()参数一传入 undefined
* then方法的参数二中捕获异常和 catch() 捕获异常的区别
    - then方法的参数二的失败回调只是给第一个promise 的指定回调，只能捕获第一个 promise 的错误
    - catch 方法是给它前面 then 方法返回的 promise 对象指定失败回调，而非第一个 promise 对象，但是这是同一个 promise 链条，前面的 promise 对象的异常会一直往后传递

```
// Promise 异常处理

// ajax('/api/users.json')
//     .then(function onFulfilled (value){
//         console.log('onFulfilled', value);
//     }).catch(function onRejected (err){
//         console.log('onRejected', err);
//     });

// ajax('/api/users.json')
//     .then(function onFulfilled (value){
//         console.log('onFulfilled', value);
//     }).then(undefined, function onRejected (err){
//         console.log('onRejected', err);
//     }); // catch()相当于 then()的别名，then()参数一传入 undefined


// ajax('/api/users.json').then(
//     function onFulfilled (value){
//         console.log('onFulfilled', value);
//         return ajax('/api/users111.json');
//     }, 
//     // // 这里的失败回调只是给第一个promise 的指定回调，只能捕获第一个 promise 的错误
//     function onRejected (err){
//         // 这里捕获不到参数一中的异常
//         console.log('onRejected', err);
//     }
// ); 

// catch 方法更适用于链式调用， 建议使用这种方法，分开指定成功和失败回调
// Promise对象的任何异常都会被一直向后传递，直至被捕获
ajax('/api/users.json')
    .then(function onFulfilled (value){
        console.log('onFulfilled', value);
        return ajax('/api/users111.json');
    }) // => 全新的 Promise 对象
    // catch 方法是给它前面 then 方法返回的 promise 对象指定失败回调，而非第一个 promise 对象，但是这是同一个 promise 链条，前面的 promise 对象的异常会一直往后传递，所以这里可以捕获到第一个 promise 的错误
    .catch(function onRejected (err){
        console.log('onRejected', err);
    }); 

```

* 全局对象上注册 unhandledrejection 事件，处理代码中没有被手动捕获的 Promise 异常，但是不推荐全局捕获方式
* 建议在代码中明确捕获每一个可能的异常

```
// 全局处理代码中没有被手动捕获的 Promise 异常 ----------------------------------------------------
// 全局对象上注册 unhandledrejection 事件，处理代码中没有被手动捕获的 Promise 异常, 全局捕获的方式不推荐使用
// 浏览器环境
window.addEventListener('unhandlerrejection', event => {
    const { reason, promise } = event;
    console.log(reason, promise);
    // reason =》Promise 失败原因，一般是一个错误对象
    //  promise =》出现异常的 Promise 对象

    event.preventDefault();
}, false);
// node 环境
process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
    // reason =》Promise 失败原因，一般是一个错误对象
    //  promise =》出现异常的 Promise 对象
});
```


### Promise 静态方法
* Promise.resolve()
    - 快速的把一个值转换为一个成功的 Promise 对象
* Promise.reject()
    - 把一个值转换为一个失败的 Promise 对象

```
// Promise 静态方法

// Promise.resolve() ----------------------------------------------------
// 把一个值转换为一个成功的 Promise 对象，foo 就是这个 Promise 对象成功后返回的值
Promise.resolve('foo')
    .then(function(value) {
        console.log(value); // foo，在这里获取到刚才传入的值 foo
    });
// 上面的代码等价于创建一个 Promise 对象，在执行函数中直接 resolve('foo')
new Promise(function (resolve, reject) {
    resolve('foo');
})
// 如果这个方法接收的是另一个 promise 对象，即 Promise.resolve(promise)，这个接收的 promise 对象会被原样返回
const promise = ajax('/api/users.json');
const promise2 = Promise.resolve(promise);
console.log(promise === promise2);


// 如果传入的是一个对象，这个对象里也有一个和 Promise 一样的 then 方法（即在这个方法中可以接收onFulfilled, onRejected两个回调），也可以作为一个Promise 对象被执行，也可以在他后面的 then 方法中获取到onFulfilled('foo')传入的值
Promise.resolve({
    // 这个then 方法实现了一个 thenable 的接口,这是一个可以被 then 的对象
    then: function(onFulfilled, onRejected) {
        onFulfilled('foo--then')
    }
})
.then(function(value) {
    console.log(value); // foo--then
})


// Promise.reject() ----------------------------------------------------
Promise.reject(new Error('rejected'))
.catch(function(err) {
    console.log(err);
})

```

### Promise 并行执行
* Promise.all()：接收一个数组，可以同时发送多个请求，等待所有的任务结束才会结束（如果所有任务都成功，进入 then 方法，有一个任务失败进入 catch 方法，抛出这个异常）
    - 只有当多个异步操作都成功，结果才是成功的才会进入 then 回调，否则都会进入 catch 回调
    - 请求成功后，多个请求的结果会放到一个数组里返回
    - 请求失败，只要有失败就会进入 catch 方法，抛出异常
* Promise.race()：接收一个数组，可以同时发送多个请求，只会等待第一个结束的任务（不管这个任务是成功还是失败）
* 应用： 验证请求是否超时

```
// Promise 并行执行


// ajax('/api/users.json').then(function(res){
//     console.log(res);
// }, function(err) {
//     console.log(err);
// });


// Promise.all() ------------------------------------------
// const urlArr = [ajax('/api/users.json'), ajax('/api/users.json')];
// Promise.all()，接受一个数组，必须是数组内的所有异步操作都成功，结果才会是成功，有一个失败结果就是失败
// const promise = Promise.all(urlArr);
// promise.then(function(value) {
//     console.log(value);
// }).catch(function(err) {
//     console.log(err);
// });


// Promise.all() 组合使用串行和并行 ------------------------------------------
// 业务：请求 urls.json 获取所有 url，在请求
// ajax('/api/urls.json').then(function(value) {
//     // console.log('请求所有 url 地址', value);
//     const urls = Object.values(value);
//     const tasks = urls.map(url => ajax(url));
//     const timeout = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject(new Error('timeout'))
//     }, 1);
// }) ;
//     tasks.push(timeout)
//     return Promise.all(tasks)
// }).then(function(value) {
//     // console.log('请求 URL地址中的 json 文件', value);
//     console.log(value);
// }).catch(function(err) {
//     console.log('请求失败', err);
// });



// Promise.race(): 接收一个数组，可以同时发送多个请求，只会等待第一个结束的任务 ------------------------------------------
const request = ajax('/api/posts.json');
const timeout = new Promise((resolve, reject) => {
    
    setTimeout(() => {
        resolve('请求未超时');
    },  500);
    
    setTimeout(() => {
        reject(new Error('timeout'))
    }, 1);
});
Promise.race([request, timeout])
.then(value => {
    console.log('race 成功', value)
})
.catch(err => {
    console.log('race 失败', err);
})

```



### 执行时序
* 宏任务：回调队列中的任务
    - 「宏任务」执行过程中可能会加入一些临时额外的需求，这些需求可以选择作为一个新的宏任务进到队列中排队，也可以作为当前任务的「微任务」，直接在当前任务结束后立即执行，而不是到队列中重新排队
* Promise 的回调作为微任务执行，在本轮调用结束的末尾自动执行
* 微任务： 
    - 提高整体的响应能力
* 目前编程中，接触到的绝大多数异步调用都是作为宏任务执行；Promise & MutationObserver & Process.nextTick(node 环境)作为微任务，在本轮调用结束的末尾自动执行

```
// Promise 执行时序
console.log('global start');
setTimeout(() => {
    console.log('setTimeout111');
}, 1000);
const start = new Date();
setTimeout(() => {
    console.log('setTimeout500');
}, 500);
// while (new Date() - start < 3000) {
//     console.log('while cycle');
// }
console.log('global running');
setTimeout(() => {
    console.log('setTimeout222');
}, 0);
Promise.resolve()
    .then(() => {
        console.log('promise111');
    })
    .then(() => {
        console.log('promise222');
    })
    .then(() => {
        console.log('promise333');
    })
    .catch(() => {

    });

setTimeout(() => {
    console.log('setTimeout333');
}, 0);
console.log('global end');

// global start
// global running
// global end
// promise111
// promise222
// promise333
// setTimeout222
// setTimeout333
// setTimeout500
// setTimeout111

```






## Generator 异步方案
* Promise 虽然可以对异步任务进行串并行执行，也可以链式调用，但是仍然无法达到传统同步代码的可读性
* 提供两种更优的异步编程写法
    - ES2015 提供的 Generator
    - Async/Await 异步方案

### Generator 函数基础回顾
```
// Generator 函数运行详解
function * foo () {
    // 使用 try catch 捕获异常
    try {
        const res = yield 'foo'; // 只是暂停函数的执行
        console.log(res);
        yield ' baz';
    } catch (e) {
        console.log(e);
    }
}

// 调用 foo()函数，并不执行 foo函数，只是得到一个生成器对象
const generator = foo();

// 第一次调用 foo 函数的 next()方法，foo函数的函数体才会真正的执行，一直会执行 yield 关键字所在的位置，yield 后面的值会作为返回对象的 value 值返回返回处理；如果 yield 语句执行完了或者没有 yiled 关键字，会返回{ value: undefined, done: true }，然后函数暂停执行
console.log(generator.next());

// 再次执行 next()，foo 函数会从刚才暂停的位置继续执行，如果在 next中传入参数（‘bar’），这个参数的值就会作为yield 语句的返回值，foo 函数会执行到下一个 yield 的位置
console.log(generator.next('bar'));

// 如果外部调用生成器对象的 throw()，也会让 foo 函数继续执行，throw()的作用是抛出异常，foo 函数里可以使用 try...catch 抛出异常
generator.throw(new Error('Generator error'));

```
### Generator 异步方案
* Generator 配合 Promise 的异步方案，使异步调用回归扁平化
```

function * main() {
    try {
        
        const users = yield ajax('/api/users.json');
        console.log('users', users);
        const posts = yield ajax('/api/posts.json');
        console.log('posts', posts);
        const tests = yield ajax('/api/tests.json');
        console.log('tests', tests);
        const urls = yield ajax('/api/urls.json');
        console.log('urls', urls);
    } catch (e) {
        console.log(e);
    }
}

// 调用生成器函数，返回生成器对象
const g = main();



// // 嵌套调用执行 Generator 函数 ------------------------------------------

// // 执行 yield 语句，获取result.value（返回的是一个 Promise对象），即 执行ajax('/api/users.json') 获取Promise 对象
// const result = g.next();
// // 给 Promise 对象设置 then 回调，data 就是请求成功的返回值，传入生成器函数的 next 方法，作为 yield 语句的返回值
// result.value.then(data => {
//     // data 作为 yield 的返回值
//     const result2 = g.next(data);
//     // 判断生成器函数是否结束
//     if (result2.done) return;
//     // result2 是执行第二个 yield 语句的结果
//     result2.value.then(data2 => {
//         const result3 = g.next(data2);
//         if (result3.done) return;
//         result3.value.then(data3 => {
//             g.next(data3);
//         });
//     });
// });




// 递归执行 Generator 函数 ------------------------------------------
// 调用递归函数，只要生成器不结束，递归就不会结束
// handleResult(g.next());
// function handleResult(result) {
//     // 判断生成器函数是否结束
//     if (result.done) return;
//     result.value.then(data => {
//         handleResult(g.next(data));
//     }, error => {
//         // 一旦异常，就会抛出，不会继续执行递归
//         g.throw(error);
//     })
// }



// 公共的 Generator 异步执行器 ------------------------------------------
// http: //github.com/tj/co
function co (generator) {
    const g = generator();
    function handleResult(result) {
        // 判断生成器函数是否结束
        if (result.done) return;
        result.value.then(data => {
            handleResult(g.next(data));
        }, error => {
            // 一旦异常，就会抛出，不会继续执行递归
            g.throw(error);
        })
    }
    handleResult(g.next());
}

co(main);

```





## Async / Await 语法糖
* 语言层面的标准异步编程语法
* Async 函数是 Generator 函数的语法糖
* 相比于 Generator 函数配合 Promise 的异步方案，
    - Async 函数使用更简单，不需要编写 Generator 异步执行器
    - Async 函数，返回的是一个 Promise 对象
    - Await 关键字，暂时只能在 Async 函数内部使用

```

// Generator 函数配合 Promise 的异步方案 ------------------------------------------
function * main() {
    try {
        
        const users = yield ajax('/api/users.json');
        console.log('users', users);
        const posts = yield ajax('/api/posts.json');
        console.log('posts', posts);
        const tests = yield ajax('/api/tests.json');
        console.log('tests', tests);
        const urls = yield ajax('/api/urls.json');
        console.log('urls', urls);
    } catch (e) {
        console.log(e);
    }
}

// 公共的 Generator 异步执行器
function co (generator) {
    const g = generator();
    function handleResult(result) {
        // 判断生成器函数是否结束
        if (result.done) return;
        result.value.then(data => {
            handleResult(g.next(data));
        }, error => {
            // 一旦异常，就会抛出，不会继续执行递归
            g.throw(error);
        })
    }
    handleResult(g.next());
}

// co(main);




// Async / Await 函数 异步方案 ------------------------------------------
async function main() {
    // await 关键字暂时只能在 async 函数内部使用
    try {
        const users = await ajax('/api/users.json');
        console.log('users', users);
        const posts = await ajax('/api/posts.json');
        console.log('posts', posts);
        const tests = await ajax('/api/tests.json');
        console.log('tests', tests);
        const urls = await ajax('/api/urls.json');
        console.log('urls', urls);
    } catch (e) {
        console.log(e);
    }
}
// 直接执行 async 函数，Async 函数返回一个 Promise 对象
const promise = main();
promise.then(v => {
    console.log(v);
    console.log('all completed');
})

```

