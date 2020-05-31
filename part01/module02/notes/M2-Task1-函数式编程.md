# Module2 - Task1 - FP

# 函数式编程（Functional Programmimg, 简称 FP）

## 课程介绍
* 为什么要学习函数式编程以及什么是函数式编程
* 函数式编程的特性（纯函数、柯里化、函数组合等）
* 函数式编程的应用场景
* 函数式编程库 Lodash

### 1、为什么要学习函数式编程
* 函数式编程是一个古老的概念，早于第一台计算机的诞生， 函数式编程的历史
* 函数式编程式随着 React 的流行受到越来越多的关注
* Vue3 也可以拥抱函数式编程
* 函数式编程可以抛弃 this
* 打包过程中可以更好地利用 tree shaking 过渡无用代码
* 方便测试、方便并行处理
* 有很多库可以帮助我们进行函数式开发：lodash、underscore、ramda



### 2、什么是函数式编程
* 面向过程编程：按照事件的步骤来实现编程

* 面向对象编程：抽象现实世界中的事物
    - 把现实世界中的事物抽象成程序世界中的类和对象，通过封装、继承和多态来演示事物事件的联系

* 函数式编程，是一种编程范式，对运算过程的抽象
    - 把现实世界的事物和事物之间的联系抽象到程序世界
    - 程序的本质：根据输入通过某种运算获得相应的输出，程序开发过程中会涉及很多有输入和输出的函数
    - x -> f（联系、映射）-> y, 用 y=f(x) 描述这个运算过程
    - 函数式编程中的函数指的不是程序中的函数（方法），而是数学中的函数即映射关系，例如 y = sin(x), x 和 y 的关系，当 x 确定了，y 的值也是固定的
    - 相同的输入始终要得到相同的输出（纯函数）
    - 函数式编程用来描述数据（函数）之间的映射

* 函数式编程核心思想：
    - 把运算过程抽象成函数，在任何地方都可以复用

* 函数式编程优点
    - 可以让代码最大程度的重用
    - 使代码更简洁
 
```
// 非函数式，通过步骤一步一步一步实现，面向过程
let num1 = 2;
let num2 3;
let sum = num1 + num2;
console.log(sum);


// 函数式，要有输入和输出
function add (n1, n2) {
    return n1 + n2;
}
let sum = add(2, 3);
console.log(sum);

```



### 3、函数式一等公民（MDN First-class Function）
* 前置知识
    - 函数是一等公民
    - 高阶函数
    - 闭包
* 函数是一等公民特性
    - 函数可以存储在变量中，
        + 函数就是一个普通的对象（可以通过 new Function()创建）
    ```
        // 把函数赋值给变量
        let fn = function() {
            console.log('Hello First-class Function')
        }
        fn();
        
        // 示例
        const BlogController = {
            index (posts) {
                return Views.index(posts)
            },
            show (post) {
                return Views.shows(post)
            },
            create (attrs) {
                return Db.create(attrs)
            },
            update (post, attrs) {
                return Db.update(post, attrs)
            },
            destroy (post) {
                return Db.destroy(post)
            }
        }
        
        // 优化，直接把方法赋值给变量本身
        const BlogController = {
            index: Views.index,
            show: Views.shows,
            create: Db.create,
            update: Db.update,
            destroy: Db.destroy
        }
    ```

    - 函数作为参数
        + 还可以作为另一个函数的参数和返回值，甚至可以在程序运行的时候通过 new function('alert(1)') 来构造一个新的函数
    - 函数作为返回值
    
 
 
### 4、高阶函数-函数作为参数
* 高阶函数（Higher-order function），至少满足下列条件之一，才是高阶函数
    - 把函数作为参数传递给另一个函数
    - 把函数作为另一个函数的返回结果

#### 4.1 函数作为参数传递给另一个函数

```
// 函数作为参数 ------------------------------------------------------------------

// 1、示例一：模仿 forEach，array 是要处理的数组，fn 是处理数组元素的函数
function forEach (array, fn) {
    for (let i = 0; i < array.length; i ++) {
        
        fn(array[i]);
    }
}
// forEach 测试
let arr = [1, 3, 4, 7, 8];
forEach(arr, function (item) {
    console.log('自定义 forEach 方法测试', item);
});


// 2、示例二：模仿 filter，array 是要过滤的数组，fn 是处理数组元素的函数
function filter (array, fn) {
    let results = [];
    for (let i = 0; i < array.length; i ++) {
        if (fn(array[i])) {
            results.push(array[i]);
        }
    }
    return results;
}

// filter 测试
let arrFilter = [1, 3, 4, 7, 8];
> const res = filter(arrFilter, function (item) {
    return item % 2 === 0
});
console.log(res);  // [4, 8]


```


#### 4.2 函数作为返回值

```
// 函数作为返回值 ------------------------------------------------------------------

// 1、基本语法演示：生成函数
function makeFn () {
    let msg = 'Hello function';
    return function () {
        console.log(msg);
    }
}
// 调用方式 1： 利用闭包的形式，先将函数赋值给变量，再调用变量
// 先将 makeFn 赋值给变量 fn，此时 fn 是个函数，执行 fn() 才是执行 makeFn 内部返回的匿名函数
const fn = makeFn();
fn(); 

// 调用方式 2：自运行函数，直接调用
makeFn()();



// 2、 函数作为返回值示例：模仿 lodash 中的 once 函数，对一个函数只执行一次
// 使用场景：支付时，无论用户点击支付按钮多少次，只让它执行一次，此处是使 fn 只执行一次
function once (fn) {  //  once()函数的 arguments 是 fn 函数
    let done = false;
    // const pay = once(fn); 调用  pay(5) 函数就是要返回这个匿名函数，就相当于调用这个匿名函数
    // arguments 是调用这个匿名函数时传递的参数，匿名函数的 arguments 是 5
    return function () { 
        if (!done) {
            done = true;
            // 调用 fn 时，返回调用此函数的结果，匿名函数内只调用一次 fn
            return fn.apply(this, arguments);
        }
    }
}
let pay = once(func); // 此处调用了 once 函数，调用完成后，once() 移出调用栈，后面不再调用 once 函数
pay(5); // 5就是 once 函数内部调用匿名函数传的参数
pay(5);
pay(5);
pay(5);
// 只会执行一次： 支付：5 RMB 

once(func)(500);
once(func)(500);
once(func)(500);
once(func)(500);
// 执行了 4 次，每次输出都是：  支付：500 RMB


/* 
pay(5)：
    在 let pay = once(func); 赋值的时候就调用了 once 一次，锁定了 pay 里面，done 为false了，所以调用返回的匿名函数 fn 就是 pay 第一次把 done 转为true，后面都不调用了；once 函数只调用了这一次

    这个调用四次，只执行一次的原因：
        once 函数执行完毕后，done 变为 true，once 函数内存被释放，移出调用栈，而外部有对 done 的调用，所以 done 的内存还没有被销毁；
        pay(5) 调用匿名函数时，done = true, 无法进入 if 判断里，同样，后面三个函数的判断条件是 done = true，没法进去 if 条件的代码块中，故不会再有输出；
        once 函数只在赋值的时候执行一次，内部匿名函数执行 4 次，但是只有第一次进入了 if 判断

once(func)(500)：
    没有赋值，因为外部没有对 once 函数内部成员的调用，每次执行完后，once 函数的内存都会被销毁，每一次的执行都是重新开始，每次执行 done 都会重新赋值为 false，每次都会进去 if语句
    once 函数被调用了 4 次，每次都执行，内部匿名函数执行 4 次，每次都进入 if 判断

总结：
    并不是所有的业务场景都可以用两种调用方式中的任意一种，要根据业务场景来判断；本题适合用方式一赋值变量的方式来调用
*/

```

#### 4.3 使用高阶函数的意义
* 抽象可以帮我们屏蔽细节，只需要关注我们要实现的目标
* 高阶函数可以用来抽象通用的问题
* 高阶函数可以让函数变得灵活
* 函数式编程的核心
    - 把运算过程抽象成函数，在任何地方都可以复用

```
// 面向过程的方式：关注的是整个循环的过程
let array = [1, 3, 4, 7, 8];
for (let i = 0; i < array.length; i ++) {
    console.log(array[i]);
}


// 高阶函数
let arr = [1, 3, 4, 7, 8];

// forEach函数的作用是把循环过程抽象成函数，使用 forEach 函数时，不需要关注循环的细节和循环变量如何控制，只需要知道 forEach 内部帮助我们完成了循环

forEach (array, item => {
    console.log(item)
})


const res = filter(arr, function (item) {
    return item % 2 === 0
});

```


#### 4.4 常用的高阶函数
* 下面示例中创建的函数就是高阶函数
    - 函数作为参数形式的高阶函数
    - 示例中，array 是要处理的数组，fn 是处理数组元素的函数

* forEach

```
// 1、示例一：模仿 forEach
function forEach (array, fn) {
    for (let i = 0; i < array.length; i ++) {
        fn(array[i]);
    }
}
// forEach 测试
let arr1 = [1, 3, 4, 7, 8];
forEach(arr1, function (item) {
    console.log('自定义 forEach 方法测试', item);
});

```

* filter

```
// 2、示例二：模仿 filter
function filter (array, fn) {
    let results = [];
    for (let i = 0; i < array.length; i ++) {
        if (fn(array[i])) {
            results.push(array[i]);
        }
    }
    return results;
}

// filter 测试
let arr2 = [1, 3, 4, 7, 8];
const res2 = filter (arr2, function (item) {
    return item % 2 === 0
});
console.log(res2);

```

* map

```
// 3、示例三： 模仿 map 函数：要求数组中的元素都执行 fn 函数内的操作，然后返回一个新的数组
const map = (array, fn) => {
    let results= [];
    for (let value of array) {
        results.push(fn(value));
    }
    return results;
}

// 测试 map 函数
let arr3 = [1, 2, 3, 4];
const res3 = map(arr3, (v) => v * v);
// console.log(res3);

```

* every

```
// 4、示例四： 模仿 every 函数：要求数组中每个元素都符合 fn 条件，才返回 true，有一个元素不符合条件就返回 false
const every = (array, fn) => {
    let result= true;
    for (let value of array) {
        result = fn(value);
        // 如果有一个元素的 result 为 false，则跳出循环
        if (!result) {
            break;
        }
    }
    return result;
}

// 测试 every 函数
let arr4 = [11, 22, 33, 44];
const res4 = every(arr4, (v) => v > 10);
// console.log(res4);

```

* some

```
// 5、示例五： 模仿 some 函数：要求数组中 有一个元素符合 fn 条件，就返回 true，都不符合条件，返回 false
const some = (array, fn) => {
    let result= false;
    for (let value of array) {
        result = fn(value);
        // 如果有一个元素的 result 为 false，则跳出循环
        if (result) {
            break;
        }
    }
    return result;
}

// 测试 some 函数
let arr5 = [10, 21, 31, 13];
const res5 = some(arr5, (v) => v % 2 === 0);
// console.log(res5);

```

* find

```
// 6、示例六： 模仿 find 函数：要求返回数组中第一个符合 fn 条件的元素，都不符合条件，返回 undefined；如果 array 是空数组，则不执行 find 函数
const find = (array, fn) => {
    let result= undefined;
    if (array.length) {
        for (let value of array) {
            const flag = fn(value);
            if (flag) {
                result = value;
                break;
            }
        }
    }
    return result;
}

// 测试 find 函数
let arr6 = [10, 21, 31, 13];
const res6 = find(arr6, (v) => v > 20);
// console.log(res6);

```

* findIndex

```
// 7、示例七： 模仿 findIndex 函数：要求返回数组中第一个符合 fn 条件的元素的索引位置，都不符合条件，返回 -1；如果 array 是空数组，则不执行 findIndex 函数
const findIndex = (array, fn) => {
    let result= -1;
    if (array.length) {
        for (let key in array) {
            const flag = fn(array[key]);
            if (flag) {
                result = key;
                break;
            }
        }
    }
    return result;
}

// 测试 findIndex 函数
let arr7 = [10, 21, 31, 13];
const res7 = findIndex(arr7, (v) => v > 40);
// console.log(res7);

```

* reduce
* sort






### 5、闭包
#### 5.1 闭包概念
* 概念：函数和其周围的状态（词法环境）的引用捆绑在一起形成闭包
    - 可以在另一个作用域中调用一个函数 A 的内部函数 fn，并访问到该函数 A 的作用域中的成员
        + 在 A 中返回 fn，且 fn 内部调用了 A 中的成员，并在 A 外部调用 fn

* 产生闭包的两种情况：
    - 函数作为返回值
    - 函数作为参数

* 核心作用：
    - 延长了外部函数的内部成员的作用范围

* 本质：
    - 函数在执行的时候会放到一个执行栈上，当函数执行完毕之后会从执行栈上移除，但是堆上的作用域成员因为被外部引用不能释放，因此内部函数依然可以访问它外部的成员
    - 当闭包发生的时候，外部函数会从调用栈移除，跟闭包有关的变量会被保存下来

```
// 函数作为返回值 -----------------------------------

/**
 * 
 * 闭包的演示语法
 * fn()
        在另一个作用域调用 makeFn 函数的内部函数 function；
        在调用内部函数的时候，可以访问到 makeFn 函数作用域内的成员
    闭包的核心作用：
        延长了外部函数（ makeFn ）的内部成员的作用范围
    
    正常情况下，
        如果 makeFn 没有返回一个函数，makeFn 执行完毕后，makeFn 的内存（即内部成员 msg）会被销毁；
        如果 makeFn 内部返回一个成员（即匿名函数），且 makeFn 外部对该成员有引用，这种情况下，makeFn 执行完毕后，内部成员 msg 不会被销毁

    once函数案例中，多次调用 pay() 函数， 其实就是多次调用 once 内的匿名函数，而匿名函数内部又有对它外部变量 msg 的引用；即使 makeFn 函数执行完毕从执行栈上移除，而 msg 因为外部的引用，并没有释放内存
 */
function makeFn() {
    let msg = 'Hello function';
    return function () {
        console.log(msg);
    }
}
const fn = makeFn();
fn();


// once 
function once (fn) {  
    // 
    let done = false;
    return function () { 
        if (!done) {
            done = true;
            return fn.apply(this, arguments);
        }
    }
}
const func = function(money) {
    console.log(`支付：${money} RMB`);
}

// 外部作用域对 once 函数内部成员 done 有引用，once 执行完毕后，done 不会被销毁，多次调用 pay(),pay 就是 once 内返回的匿名函数，当调用这个匿名函数时，可以访问该函数外部的成员 msg
let  pay = once(func);
pay(5); 
pay(5);
pay(5);
pay(5);

```


#### 5.2 闭包案例

```
// 案例一：求数字的次幂 ------------------------------------------------
// 二次方/三次方
// Math.pow(4, 2)
// Math.pow(4, 5)
// 求数字的次幂
function makePower(power) {
    return function (number) {
        return Math.pow(number, power)
    }
}
// makePower 调用完之后，会从 call stack 移除，但是跟闭包相关变量 power 不会被销毁，会被保留下来，这样外部调用 makePower 返回的匿名函数时，才能获取到 power
let power2 = makePower(2);
let power3 = makePower(3);
console.log(power2(4));
console.log(power2(5));
console.log(power3(4));


// 案例二：求员工工资 ------------------------------------------------
// 员工工资 = 基本工资 + 绩效工资
// 对不同级别的员工生成一个计算总工资的函数
function makeSalary(base) {
    return function (performance) {
        return base + performance;
    }
}
// 求平方
let salaryLevel1 = makeSalary(12000);
let salaryLevel2 = makeSalary(15000);
console.log(salaryLevel1(3000));
console.log(salaryLevel2(5000));

```





### 6、纯函数
#### 6.1 纯函数概念
* 纯函数要满足一下两点：
    - 函数的返回结果只依赖于它的参数。
    - 函数执行过程里面没有副作用

* 纯函数：对相同的输入永远会得到相同的输出，而且没有任何可观察的副作用
    - 纯函数类似数学中的函数（用来描述输入和输出之间的关系），y = f(x)
    - lodash   https://www.lodashjs.com/      
        + 是一个纯函数的功能库，提供了对数组、数字、对象、字符串、函数等操作的一些方法
    - 数组的 slice 和 splice 分别是：纯函数和不纯的函数
        + slice（纯函数） 返回数组中的指定部分，不会改变原数组
        + splice（不纯的函数） 对数组进行操作并返回该数组，会改变原数组
    - 函数式编程不会保留计算的中间结果，所以变量是不可变的（无状态的）
    - 可以把一个函数的执行结果交给另一个函数去处理

* 纯函数要有参数和返回值，即有输入和输出，这样才能对相同的输入的到相同的输出    
```
    // 引入 lodash 模块
    const _ = require('lodash');

    let array = [1, 2, 3, 4, 5];

    // 纯函数 slice()：多次调用，相同的输入得到相同的输出
    console.log(array.slice(0, 3)); // [ 1, 2, 3 ]
    console.log(array.slice(0, 3)); // [ 1, 2, 3 ]
    console.log(array.slice(0, 3)); // [ 1, 2, 3 ]
    
    
    // 不纯的函数 splice()：多次调用，相同的输入得到不同的输出
    console.log(array.splice(0, 3)); // [ 1, 2, 3 ]
    console.log(array.splice(0, 3)); // [ 4, 5 ]
    console.log(array.splice(0, 3)); // []
    
    
    //自定义纯函数
    function sum(n1, n2) {
        return n1 + n2;
    }
    console.log(sum(1, 2)); // 3
    console.log(sum(1, 2)); // 3
    console.log(sum(1, 2)); // 3

```


#### 6.2 Lodash 函数式编程库的使用
* Lodash ———— 纯函数的代表，lodash 中的大多数方法都是纯函数
* lodash 使用
    - npm init -y    初始化 package.json
    - npm i lodash --save
    - const _ = require('lodash');

```
const _ = require('lodash');
const arr = ['jack', 'tom', 'lucy', 'kate'];


console.log(_.first(arr));
console.log(_.last(arr));
console.log(_.toUpper(_.first(arr)));
console.log(_.reverse(arr));
console.log(_.reverse(arr));
// js 数组中的 reverse()不是纯函数，arr.reverse() 没有参数，就没有输出

// each方法返回的是数组本身
const res = _.each(arr, (v, index) => {
    console.log(v, index);
});
console.log(res);

// js 在 ES6之后才有 /includes/find/findIndex，ES6 之前可以自己手写或者用 lodash 库实现
const res2 = _.find(arr, (v) => {
    return v.length < 4;
})
console.log(res2); // tom

```


#### 6.3 纯函数的好处
* 可缓存：提高程序的性能
    - 因为纯函数对相同的输入始终有相同的输出，故可以把纯函数的结果缓存起来
* 可测试
    - 纯函数让测试更方便
* 并行处理
    - 在多线程环境下并行操作共享的内存数据很可能会出现意外情况
    - 纯函数不需要访问共享的内存数据，在并行环境下可以任意运行纯函数（Web Worker）
    
```
    
// 引入 lodash 模块
const _ = require('lodash');

// 1、记忆函数：lodash 提供的_.memoize
// 计算圆面积，并缓存计算结果
function getArea(r) {
    console.log('半径：', r);
    return Math.PI * r * r;
}
// _.memoize()：接收一个纯函数，内部对纯函数处理并把这个纯函数的结果缓存下来，会返回一个带有记忆功能的函数
let getAreaWithMemory = _.memoize(getArea);
// 多次调用，只执行一次，后面的调用都是从缓存里获取圆面积，然后输出
// console.log(getAreaWithMemory(4));
// console.log(getAreaWithMemory(4));
// console.log(getAreaWithMemory(4));
// console.log(getAreaWithMemory(4));
// 半径： 4
// 50.26548245743669
// 50.26548245743669
// 50.26548245743669
// 50.26548245743669


// 模拟 lodash 中的 memoize 方法的实现
// _.memoize()的特点：接收一个函数并返回一个函数
function memoize(fn) {
    // 创建一个对象存储结果，参数fn 是纯函数，故将 fn 的输入作为对象的键名，输出作为对象的键值
    let cache = {};
    return function () {
        // 判断 chache是否有值：根据 fn 的参数从 cache里取结果，如果获取到就返回cache；如果没获取到，就调用 fn，并缓存到 cache 对象里
        // JSON.stringify(arguments)：将 arguments 转换成字符串
        let key = JSON.stringify(arguments);
        cache[key] = cache[key] || fn.apply(fn, arguments)
        return cache[key];
    }
}

let getAreaSelfMemory = memoize(getArea);
console.log(getAreaSelfMemory(5));
console.log(getAreaSelfMemory(5));
console.log(getAreaSelfMemory(5));
console.log(getAreaSelfMemory(5));
// 半径： 5
// 78.53981633974483
// 78.53981633974483
// 78.53981633974483
// 78.53981633974483
    
```






### 7、副作用
* 纯函数没有任何可观察的副作用
* 副作用让一个函数变得不纯（如下例），纯函数是根据相同的输入返回相同的输出，如果函数依赖与外部的状态就无法保证输出相同，就会带来副作用
* 副作用来源
    - 配置文件
    - 数据库
    - 获取用户的输入（可能会带来脚本攻击）
* 所有的外部交互都有可能代理副作用，副作用也使得方法通用性下降，不利于程序的扩展和可重用性，同时副作用会给程序带来安全隐患和不确定性，但是副作用不可能完全禁止，尽可能控制他们在可控范围内发生
```
// 不纯的函数，当 mini 变化，相同的输入就会导致不同的输出
let mini = 18;
function checkAge(age) {
    return age >= mini;
}

// 纯函数（有硬编码，后续可以通过柯里化解决）
function checkAge(age) {    
    // 此处 mini是写死的，属于硬编码，后面有介绍的可以通过柯里化解决
    let mini = 18;
    return age >= mini;
}

```




### 8、柯里化（Haskell Brooks Curry）
* 首先是要柯里化解决上一个案例中硬编码的问题

```
// 此处 mini是写死的，属于硬编码
function checkAge(age) { 
    let mini = 18;
    return age >= mini;
}

```

#### 8.1 柯里化概念
* 当函数有多个参数时，对此函数进行改造：
    - 当一个函数有多个参数的时候，先传递一部分参数调用它（这部分参数以后永不变化） 
    - 然后返回一个新的函数接收剩余的参数，并返回结果

```
/**
 * 柯里化演示
   函数柯里化：当函数有多个参数时，可以对此函数进行改造，调用一个函数 A，只传递部分的参数，并且让这个函数 A 返回一个函数 B，返回的函数 B 内接收剩余的参数，并且返回相应的结果
 */
function checkAge(age) { 
    // 基准值 mini 被写死，属于硬编码
    let mini = 18;
    return age >= mini;
}


// 普通的纯函数，不再依赖外部变量，函数内部也没有硬编码
function checkAge1 (mini, age) { 
    return age >= mini;
}
// console.log(checkAge1(18, 20));
// console.log(checkAge1(18, 24));
// console.log(checkAge1(22, 24));



// 利用函数柯里化：解决函数硬编码问题
function checkAge2 (mini) {
    return function (age) {
        return age >= mini;
    }
}

// const checkAge18 = checkAge2(18);
// const checkAge20 = checkAge2(20);
// console.log(checkAge18(17));
// console.log(checkAge18(24));


// 使用 ES6 的箭头函数对上例进行函数柯里化
let checkAgeES6 = mini => (age => age>= mini);

const checkAge18 = checkAgeES6(18);
const checkAge20 = checkAgeES6(20);
console.log(checkAge18(17));
console.log(checkAge18(24));

```


#### 8.2 lodash 中的柯里化方法
* lodash.curry(func)，curry方法本身就是一个纯函数，如果 func 也是纯函数，那么返回的就是一个纯函数
    - 功能：
        + 创建一个函数，该函数接收一个或多个 func 的参数，如果传入了 func 所需要的所有参数，则执行 func 并返回执行的结果；如果没有传入 func 所需要的所有参数，则继续返回该函数并等待接收剩余的参数
    - 参数
        + 需要柯里化的函数
    - 返回值
        + 柯里化后的函数
* lodash.curry()可以把任意一个多元函数转换为一元函数

```
const _ = require('lodash');


function getSum (a, b, c) {
    return a + b + c;
}

// 通过 lodash 的 curry 方法，得到一个柯里化函数
const curried = _.curry(getSum);

// 如果传入 getSum 所需要的所有参数，则会立即调用并返回结果
console.log(curried(1, 2, 4)); // 7

// 如果只传入 getSum 1个参数，会返回一个新的函数，并且这个新函数等待接收 getSum 中剩余的2个参数
console.log(curried(1)(2, 4)); // 7

// 如果传入 getSum  2个参数，会返回一个新的函数，并且这个新函数等待接收 getSum 中剩余的1个参数
console.log(curried(1, 2)(4)); // 7


// 利用 curry 函数改造上一节 checkAge 函数
function checkAge (mini, age) { 
    return age >= mini;
}
const curriedAge = _.curry(checkAge);
console.log(curriedAge(5)(2));  // false

```

#### 8.3 柯里化案例

```
/* 
    柯里化案例： 匹配字符串中空白字符或数字字符
    /\s+/g：全局匹配字符串中任意多个空白字符
    /\d+/g：全局匹配字符串中任意多个数字
 */

// 判断字符串是否有空白字符或者提取字符串中的所有空白字符
const str = '123 dfbbagkf378-   3; 23DA';

// 面向过程的方式
// console.log(str.match(/\s+/g)); // [' ', '   ', ' ']
// console.log(str.match(/\d+/g)); // ['123', '378', '3', '23']


// 函数式编程的方式
function match (reg, str) {
    return str.match(reg);
}


// 函数柯里化方式：改造match 函数，步骤如下

// 引入 lodash 模块
const _ = require('lodash');

// 直接给_.curry()传入一个匿名函数和_.curry(match)效果是一样的  const matchCurry = _.curry(match);
const matchCurry = _.curry(function (reg, str) {
    return str.match(reg);
})

// 查找字符串中是否有空白字符的函数
const haveSpace = matchCurry(/\s+/g)
console.log(haveSpace('hello world'));// [' ']
console.log(haveSpace('helloworld'));// null

// 查找字符串中是否有数字字符的函数
const haveNumber = matchCurry(/\d+/g)
console.log(haveNumber('123 world'));// ['123']
console.log(haveNumber('hello world'));// null



// 示例：过滤数组，找出数组中所有具有空白字符的元素,返回一个数组
const filter = _.curry(function (fn, array) {
    return array.filter(fn);
})

// 上式改为箭头函数
// const filterES6 = _.curry((fn, array) => (array.filter(fn)));

// 这样写，可以查找数组特定字符的元素，查找不同的字符，传入不同的函数
console.log(filter(haveSpace, ['John Conner', 'Kate_NaNa'])); // ['John Conner']
console.log(filter(haveNumber, ['John Conner', 'Kate_NaNa'])); // []

// 定义变量，查找数组空白字符的元素
const findSpace = filter(haveSpace);
console.log(findSpace(['Quan Luosen', 'Kate_NaNa'])); // ['Quan Luosen']

```


#### 8.4 柯里化原理模拟

```
const _ = require('lodash');


function getSum (a, b, c) {
    return a + b + c;
}

/* 

const curried = _.curry(getSum);

形式一：如果 curried 函数传入的实参个数和柯里化函数 getSum 所需要的形参个数相同，则会立即调用并返回结果
    console.log(curried(1, 2, 3)); // 6

形式二：如果 curried 函数传入的实参个数为1，即小于柯里化函数 getSum 所需要的形参个数，会返回一个新的函数，并且这个新函数等待接收 getSum 中剩余的2个参数
    console.log(curried(1)(2, 3)); // 6

形式二：如果 curried 函数传入的实参个数为2，即小于柯里化函数 getSum 所需要的形参个数，会返回一个新的函数，并且这个新函数等待接收 getSum 中剩余的1个参数
    console.log(curried(1, 2)(3)); // 6

形式三：如果 curried 函数传入的实参个数小于柯里化函数 getSum 所需要的形参个数，便会返回一个新的函数，并且这个新函数等待接收 getSum 中剩余参数；
    就这样，直到每一次调用传入的实参总个数等于柯里化函数 getSum 所需要的形参个数，才会执行 getSum 函数；否则会一直调用下去，直到实参个数和形参个数相同才会执行 getSum 函数
    console.log(curried(1)(2)(3)); // 6
    console.log(curried(1)()(2)(3)); // 6

*/

// 模拟实现 lodash 中的 curry 方法 ------------------------------------------------------------------

function curry (func) {
    /* 
        第一次调用 curried(1) 时，相当于调用 curriedFn，传入的参数 1 会被记录到 args 里缓存下来，curriedFn 内部返回了一个匿名函数 fn2，此处形成一个闭包，可以在 fn2 中获取到调用 curriedFn 传入的所有参数 args；
        第二次调用(2, 3) 相当于调用 fn2，在fn2 内部用 arguments 获取，故在 fn2 内部要获取到第一次调用传入的参数 args 和第二次调用传入的参数arguments
    */
    return function curriedFn (...args) { 
        /*  
            形参个数: 调用 getSum 方法需要的参数个数，getSum.length，即 func.length，func 函数就是要柯里化的函数（指的是 getSum 函数）
            实参个数: 实际调用 curriedFn 函数时传入的参数个数，即args 的长度
        */
        // 比较形参个数和实参个数是否相同
        if (args.length < func.length) {

            // 当传入的实参个数小于 func 函数的形参个数时，要返回一个新的函数 fn2，fn2 等待接收 getSum 中剩余的参数
            return function fn2() { 
                /*
                    arguments 就是第二次调用传入的参数，即调用 fn2 传入的参数

                    最终要调用 func 函数（即 getSum）才能达到目的
                        当第二次调用接收的剩余参数和第一次调用传入的参数合并传入 curriedFn，并返回；此时 curriedFn会再次比较形参个数和实参个数，发现二者一致了，会返回 func(...args)
                */ 
                // 将两次调用传入的参数拼接成一个数组，并展开传入 funccurriedFn
                const params = args.concat(Array.from(arguments));
                return curriedFn(...params);
                // apply 的方式，...params 是 E2015的方式
                // return curriedFn.apply(this, params);
            }
        }
        // 当传入的实参个数大于等于 func 函数的形参个数，直接调用 getSum 函数，并返回结果；此处就是直接调用 func 函数，并传递第一次传入的所有参数
        return func(...args);
        // apply 的方式，...args 是 E2015的方式
        // return fn.apply(this, args);
    }
}


const curried = _.curry(getSum);
console.log(curried(1, 2, 3)); // 6
console.log(curried(1)(2, 3));  // 6
console.log(curried(1, 2)(3)); // 6 
console.log(curried(1)(2)(3, 4)); // 6 
console.log(curried(1)()(2)(3));  // 6


```

#### 8.5 柯里化总结
* 柯里化可以给一个函数传递较少的参数，得到一个已经记住了某些固定参数的新函数
* 函数柯里化内部使用了闭包，对函数参数进行缓存
* 优点
    - 可以让函数变得更灵活，让函数的粒度更小
    - 可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能
    - 可以对函数参数进行缓存





### 9、函数组合
* 纯函数和柯里化很容易写出洋葱代码`h(g(f(x)))`
    - 获取数组的最后一个元素再转换成大写字母
        + _.toUpper(_.first(_.reverse(array)))
    
    - 函数组合可以把细粒度的函数重新组合生成一个新的函数

#### 9.1 函数组合的概念

* 管道：对输入的数据进行处理，得到相应的结果
    - 给 fn 函数输入参数 a， 返回结果 b；函数 fn 就相当于管道，使用函数 fn 处理数据
    - 当 fn 函数比较复杂的时候，可以将函数 fn 拆分成多个小函数如 fn1, fn2...，多个小函数就相当于多个小管道，输入参数通过多个管道得到最终结果 b
        + fn = compose(f1, f2, f3)
        + b = fn(a)

* 函数组合
    - 如果一个函数要经过多个函数处理才能得到最终值，此时可以把中间过程的函数合并成一个函数
        + 函数就相当于数据的管道，函数组合就是把这些管道连接起来，让数据穿过多个管道形成最终结果
        + 函数组合默认是从右到左执行
        + 函数组合组合的都是纯函数

* 函数组合基本语法演示

```

// 函数组合组合的都是纯函数，f、g 都是纯函数
function compose(f, g) {
    return function (value) {
        return f(g(value));
    }
}


// 获取数组的最后一个元素
function reverse (array) {
    return array.reverse();
}

function first (array) {
    return array[0];
}

const last = compose(first, reverse);
console.log(last([1, 2, 3, 4])); // 4

```


#### 9.2 lodash 中的组合函数
* lodash 中组合函数 flow() 或者 flowRight，都可以组合多个函数，flow 是指数据流动的方向
    - flow() 是从左到右运行
    - flowRight() 是从右到左运行，使用的更多一些

```
const _ = require('lodash');


// 获取数组的最后一个元素，并转换成大写
const reverse = arr => arr.reverse();
const first = arr => arr[0];
const toUpper = str => str.toUpperCase();


const f = _.flowRight(toUpper, first, reverse);
console.log(f(['foo', 'bar', 'baz'])); // BAZ

```


#### 9.2 组合函数原理模拟
* 模拟 lodash 的 flowRight 方法

```
const _ = require('lodash');


// 获取数组的最后一个元素，并转换成大写
const reverse = arr => arr.reverse();
const first = arr => arr[0];
const toUpper = str => str.toUpperCase();


const f = _.flowRight(toUpper, first, reverse);
// console.log(f(['foo', 'bar', 'baz'])); // BAZ


// 自定义普通函数形式的组合函数 compose，模拟 lodash.flowRight()
function compose (...args) { // 可以接收多个参数，不确定多少个参数，用 ...args 接收所有参数
    // 调用组合函数，最终要返回一个函数，返回的这个函数要对数据处理，接收一个 value
    return function (value) {
        const arr = args.reverse();
        /* 
            value：作为第一次调用 callback 的第一个参数，此处的 value 是调用customCompose(['foo', 'bar', 'baz']) 传入的数组
            acc： 是上一次调用回调返回的值，
            fn：数组中当前要被处理的元素，由于数组中的元素都是函数，要将上一次调用回调的返回值 acc 传入到 fn 中再次调用并返回
        */
        return arr.reduce(function (acc, fn) {
            return fn(acc)
        }, value)
    }
}
const customCompose = compose(toUpper, first, reverse);
// console.log(customCompose(['foo', 'bar', 'baz'])); // BAZ


// 自定义箭头函数形式的组合函数  arrowCompose，模拟 lodash.flowRight()
const arrowCompose = (...args) => (value) => args.reverse().reduce((acc, fn) => fn(acc), value);

const customArrowCompose = arrowCompose(toUpper, first, reverse);
console.log(customCompose(['foo', 'bar', 'baz'])); // BAZ

```


#### 9.2 函数组合-结合律
* 函数组合要满足的特点
    - 结合律（associativity）
        + 既可以把 g 和 h组合，还可以把 f 和 g 组合，结果都是一样的
```
// 结合律
let fn = compose(f, g, h);
let associative = compose(compose(f, g), h) == compose(f, compose(g, h))  // true

```
* 函数组合结合律演示

```
const _ = require('lodash');


// 这三个函数 lodash 里面都有，可以用 lodash 里面封装的

const fn = _.flowRight(_.toUpper, _.first, _.reverse);
const fn1 = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse);
const fn2 = _.flowRight(_.toUpper, _.flowRight(_.first, _.reverse));
console.log(fn(['foo', 'bar', 'baz'])); // BAZ
console.log(fn1(['foo', 'bar', 'baz'])); // BAZ
console.log(fn2(['foo', 'bar', 'baz'])); // BAZ

```





#### 9.2 函数组合-调试
* 如何调试组合函数
* 下面案例是将 NEVER SAY DIE 转换成 never-say-die

```
/* 
    _.split 有三个参数，只考虑前两个参数————字符串和分隔符
        用函数柯里化把多元函数转换成一元函数
    _.toLower() 只有一个参数
    _.join() 有两个参数————数组和分割符，用函数柯里化把多元函数转换成一元函数
    _.map() 有两个参数————数组和 fn，fn 表示数组中每个元素要执行的方法
    
    函数组合的两个重要的点：
        1、要用一个参数的函数,
        2、流动数据要最后传递

    const f = _.flowRight(join('-'), map(_.toLower), split(' '));
        split/map/join 使用_.curry 时，把参数前后转换位置的原因是，_.flowRight 是从右向左执行的，split(' ') 返回的是一个数组，该数组传入 map函数，map(_.toLower) 返回的是一个小写的数组，该数组传入 join函数，join('-') 返回的是想要的字符串
    在组合里，最后一个参数永远必须是管道了流动的数据
*/

// const split = _.curry(function (sep, str) {
//     return _.split(str, sep);
// })
const split = _.curry((sep, str) => _.split(str, sep));
const join = _.curry((sep, array) => _.join(array, sep));
const map = _.curry((fn, array) => _.map(array, fn));


// 调试，通过辅助函数观察中间函数的结果 -----------------------------------------------------------------  
// 打印日志：这种直接调用，同时使用多个 log 函数，会导致打印结果不清晰，不知道是打印 的哪个阶段执行的结果
const log = v => {
    console.log('执行日志',v);
    return v;
}
// const f = _.flowRight(join('-'), log, map(_.toLower),  log, split(' '));


// 打印跟踪结果 trace(参数一, 参数二)：参数一描述打印的 log 是在哪个函数之后打印；参数二是要打印的数据；调用的时候要传入参数一
const trace = _.curry((tag, v) => {
    // v 就是右边函数执行完毕后的返回值
    console.log( tag, v);
    return v;
});

const f = _.flowRight(join('-'), trace('map 之后打印'), map(_.toLower), trace('split 之后打印'), split(' '));
console.log(f('NEVER SAY DIE')); 
// split 之后打印 [ 'NEVER', 'SAY', 'DIE' ]
// map 之后打印 [ 'never', 'say', 'die' ]
// never-say-die

```



### 10、Lodash-fp模块
* lodash 的 fp 模块提供了实用的对函数式编程友好的方法
* FP 模块提供的方法具备以下特点：
    - 不可变
    - 已经被柯里化（auto-curried）
    - 多个参数时，要求函数优先，数据之后（iteratee-first data-last）

```

// lodash 提供的方法 -----------------------------------------------
const _ = require('lodash');

// 数据优先，函数之后
_.map(['a', 'b', 'c'], _.toUpper)  // ['A', 'B', 'C']
_.map(['a', 'b', 'c'])  // ['a', 'b', 'c']
_.split('Hello World', ' ')  // ['Hello', 'World']

// lodash 方法实现 NEVER SAY DIE 转换成 never say die
const split = _.curry((sep, str) => _.split(str, sep));
const join = _.curry((sep, array) => _.join(array, sep));
const map = _.curry((fn, array) => _.map(array, fn));
const f = _.flowRight(join('-'), map(_.toLower), split(' '));
// console.log(f('NEVER SAY DIE')); 





// lodash/fp 模块 -----------------------------------------------
const fp = require('lodash/fp');
// 多个参数时，函数优先，数据之后
fp.map(fp.toUpper, ['a', 'b', 'c']);
fp.split(' ', 'Hello World')
// 已经被柯里化的函数
fp.map(fp.toUpper)(['a', 'b', 'c']);
fp.split(' ')('Hello World')

// lodash-fp 模块方法实现 NEVER SAY DIE 转换成 never say die
const lodashFp = fp.flowRight(fp.join('-'), fp.map(fp.toLower), fp.split(' '));
console.log(lodashFp('NEVER SAY DIE')); 

```
    





### 11、Lodash-map 方法的小问题
* lodash 和 lodash/fp 模块中 map 方法的区别

```
// lodash 实现 -----------------------------------------------
const _ = require('lodash');

// const res1 = _.map(['23', '8', '10'], parseInt); // [ 23, NaN, 2 ]
// 输出结果为 [ 23, NaN, 2 ]，_.map()中，parseInt作为函数，需要接收的参数有三个，为value, index|key, collection，即 parseInt 接收三个参数，如下所示 
// parseInt('23', 0, array)  
// parseInt('8', 1, array)
// parseInt('10', 2, array)
// console.log(parseInt('23', 0)); // 23
// console.log(parseInt('8', 1)); // NaN
// console.log(parseInt('10', 2)); // 2
const res1 = _.map(['23', '8', '10'], (v) => parseInt(v));
console.log(res1);  // [23, 8, 10]
console.log(parseInt('143', 33));  // [23, 8, 10]



// lodash/fp 模块实现 -----------------------------------------------
const fp = require('lodash/fp');

// fp 中的方法函数优先，数据之后，fp.map 方法中的函数，此时 parseInt作为函数只需要接收一个参数
const res2 = fp.map(parseInt, ['23', '8', '10']);
console.log(res2); // [23, 8, 10]

```




### 12、Point Free
* Pointfree 是一种编程风格，具体的实现是函数的组合


#### 12.1 Point Free 的概念
* 可以把数据处理的过程定义成与数据无关的合成运算，不需要用到代表数据的那个参数，只要把简单的运算步骤合并到一起，在使用之中模式之前需要定义一些辅助的基本运算函数
    - 不需要指明处理的数据
    - 只需要合成运算过程
    - 需要定义一些辅助的基本运算函数
    
    ```
    const f = fp.flowRight(fp.join('-'), fp.map(_.toLower), fp.split(' '))
    
    ```
* 案例

```
/* 
    Point Free 模式
    
    函数式编程的核心：把运算过程抽象成函数

    Point Free: 就是把抽象出来的函数再合成一个新的函数，合成的过程是抽象的过程，在这个抽象的过程中不需要关心数据

    Hello   World 转换成 hello_world
 */

// 非 Point Free 模式

function fn(word) {
    // 匹配所有空格 /\s+/g
    return word.toLowerCase().replace(/\s+/g, '-');
}

// Point Free 模式
const fp = require('lodash/fp');
const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower);
console.log(f('Hello   World')); // hello_world

```

#### 12.2 Pointfree-案例

```
// 实现：一个字符串中的首字母提取并转换成大写，使用. 作为分隔符，如：world wild web => W. W. W

// Point Free 模式
const fp = require('lodash/fp');

// 切割字符串，返回一个数组 => 得到的数组遍历，每一项转换成大写，返回一个新的数组 => 得到的新数组遍历，获取每一项的首字母，又返回一个新数组 => 得到的新数组用. 连接，返回一个字符串
const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.first), fp.map(fp.toUpper), fp.split(' '));
console.log(firstLetterToUpper('Hello   World')); // H. W

// fp.map(fp.first), fp.map(fp.toUpper)对数组执行了两次 map，影响性能，合并
const firstLetterToUpper2 = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '));
console.log(firstLetterToUpper2('Hello World You')); // H. W. Y

```



