# Module1 - Task1 - ES2015


# 内容概要
* ECMAScript 与 JavaScript
* ECMAScript 的发展过程
* ECMAScript 2015 的新特性




## 一、ECMAScript 与 JavaScript比较
    1. ECMAScript ，是 JavaScript 语言本身,缩写为 es;
    2. ECMAScript通常看作是JavaScript的标准化规范；JavaScript 是 ECMAScript的扩展语言
    3. ECMAScript只提供了最基本的语法，只停留在语言层面，并不能直接完成应用中的实际功能开发；JavaScript实现了ECMAScript的语言标准，并在此基础上进行扩展
    4. 在浏览器环境中，JavaScript相当于ECMAScript+Web API（即BOM+DOM）；在Node 环境中，JavaScript相当于ECMAScript+Node内置模块提供的 api(如fs, net, etc)



## 二、ECMAScript 的发展过程
* 2015 年开始，ES 保持每年一个版本的迭代
    - ES5（5），2009 年 12 月
    - ES5.1（5.1），2011 年 6 月
    - ES2015（6），2015 年 6 月，相对重点，包含很多新功能
    - ES2016（7），2016 年 6 月
    - ES2017（8），2017 年 6 月
    - ES2018（9），2018 年 6 月
    - ES2019（10），2019 年 6 月


## 三、ECMAScript2015 新特性
### 1、概述
* 特点：
    - ES2015 是新时代 ECMAScript 标准的代表版本
    - 相比于 ES5.1的变化比较大
    - 标准命名规则发生变化
* 标准缩写：ES2015；用 ES6 泛指所有的新标准
* ES2015标准规范链接 http://www.ecma-international.org/ecma-262/6.0
* 重点介绍在 ES5.1基础之上的变化，包含 4 大类： 
    - 解决原有语法上的一些问题或者不足（如 let/const的块级作用域）
    - 对原有语法进行增强（如解构，展开，参数默认值，模板字符串）
    - 全新的对象、全新的方法、全新的功能（如 Promise, Proxy等）
    - 全新的数据类型和数据结构（如Symbol, Set, Map）

### 2、准备工作（node运行，node 版本：v12.13.0）
* 运行环境：node运行，node 版本：v12.13.0
* 小工具：nodemon，
    - 作用：修改完代码后自动执行代码
    - 安装：yarn add nodemon --dev
    - 执行：yarn nodemon 00-prepare.js，
        + nodemon执行脚本，执行完不会立即退出，脚本一旦变化，会立即运行
        + node 00-prepare.js，执行完会立即退出





### 3、let/const 与块级作用域（最佳实践：不用 var，主用 const，配合 let）
#### 作用域
    - 全局作用域（ES2015 之前）
    - 函数作用域（ES2015 之前）
    - 块级作用域，用{}包裹的,
#### let 声明变量
* 在块级作用域内定义的成员，外部无法访问
* 不会出现变量声明提升问题
* 不能重复声明

```
// ******************** 代码示例 *****************

// if (true) {
//     let foo = 'zce';
//     console.log(foo);
// }

// --------------------------------------------

// for( var i = 0; i < 3; i++) {
//     for( let i = 0; i < 3; i++) {
//         console.log(i);
//     }
//     console.log('内层结束 i = ' + i);
// }

// --------------------------------------------

// var elements = [{}, {}, {}];
// for (var i = 0; i < elements.length; i ++) {
//     elements[i].onclick = function() {
//         console.log(i);
//     }
// }
//  // i 是 var 定义的，打印的 i 始终都是全局作用域中的 i,循环结束后，i 被累加到 3
// elements[0].onclick();

// // 通过建立闭包,借助于函数作用域摆脱全局作用域带来的影响
// var elements = [{}, {}, {}];
// for (var i = 0; i < elements.length; i ++) {
//     elements[i].onclick = (function(i) { 
//         return function () {
//             console.log(i);
//         }
//     })(i)
// }
// elements[0].onclick();

// ***************** let ********************

// // 块级作用域let
// var elements = [{}, {}, {}];
// for (let i = 0; i < elements.length; i ++) {
//     // 相当于闭包的机制
//     elements[i].onclick = function() { 
//         console.log(i);
//     }
// }
// // i 只能在{}块级作用域内被访问
// // onclick执行的时候，循环已经结束，实际的 i 已经销毁
// elements[0].onclick();

// --------------------------------------------

// // for循环有两层嵌套的作用域
// // 条件里声明的 i（小括号()内的 i）和循环里的 i（小花括号{}内的 i）是互不影响的
// for (let i = 0; i < 3; i ++) {
//     console.log('外层作用域', i);
//     let i = 'foo';
//     console.log('内层作用域', i);
// }
// // 上式循环拆解
// depart();
// function depart() {
//     let i = 0;
//     if (i < 3) {
//         let i = 'foo';
//         console.log('内部变量', i);
//     }
//     i ++;
//     console.log('外部变量', i);
//     if (i < 3) {
//         let i = 'foo';
//         console.log('内部变量', i);
//     }
//     i ++;
//     console.log('外部变量', i);
//     if (i < 3) {
//         let i = 'foo';
//         console.log('内部变量', i);
//     }
//     i ++;
//     console.log('外部变量', i);
// }

// --------------------------------------------
// console.log(foo); // undefined，说明 foo 已经声明，但是未赋值；这就是变量声明的提升问题
// var foo = 'zce';

// // console.log(zoo); // 引用错误，ReferenceError: Cannot access 'zoo' before initialization；不能未定义先使用
// let zoo = 'zce';
// let zoo = 'wer'; // 语法错误，SyntaxError: Identifier 'zoo' has already been declared；不能重复声明

```
### const 声明只读的恒量/常量
* 在块级作用域内定义的成员，外部无法访问
* 不会出现变量声明提升问题
* 不能重复声明
* 只读，声明后不允许修改（不允许修改内存地址），指的是不能重新指向一个新的内存地址

```
// ***************** const ********************
// const name = 'zce';
// console.log(name);
// name = 'lcc'; // 类型错误，TypeError: Assignment to constant variable；声明后不允许修改

// const name; // 语法错误，SyntaxError: Missing initializer in const declaration；声明时就要赋初始值
// name = 'lcc'; 

// 声明后不允许修改（不允许修改内存地址），指的是不能重新指向一个新的内存地址
const obj = {};
obj['name'] = 'lcc'; // 没有修改 obj 指向的内存地址
obj['age'] = '25';
console.log(obj);
```




### 4、解构
#### 数组解构
* 根据元素位置提取
* 确保要解构元素位置的格式与数组一致
* ...rest表示从当前位置往后的所有成员，结果是数组，这种形式只能最后一个成员使用
* 解构数组的长度小于被解构的数组长度，会按照从前到后的顺序提取
* 解构数组的长度大于被解构的数组长度，会按照从前到后的顺序提取，多于的为 undefined，相当于获取数组中不存在的下标
* 支持设置默认值
```
// 数组的解构，根据元素位置提取
const arr = [100, 200, 300];
// const foo = arr[0];
// const bar = arr[1];
// const baz = arr[2];
// // 以前，根据索引来取对应值
// console.log(foo, bar, baz); 

// const [foo, bar, baz] = arr;
// // 获取变量对应值
// console.log(foo, bar, baz); 

// const [, , baz] = arr;
// // 提取指定位置的元素，前面的要保留逗号，确保解构位置的格式与数组一致
// console.log(baz); 


// ...rest 表示从当前位置往后的所有成员，最终结果会放到一个数组中，这种形式只能最后一个成员使用
// const [foo,  bar, ...rest] = arr;
// // const [foo,  ...rest, bar] = arr; // SyntaxError: Rest element must be last element
// // 100, 200, [300]，
// console.log(foo, bar, rest); 

// // 解构数组的长度小于被解构的数组长度，会按照从前到后的顺序提取
// const [foo] = arr;
// const [, bar] = arr;
// // 100, 200
// console.log(foo, bar); 
// // 解构数组的长度大于被解构的数组长度，会按照从前到后的顺序提取，多于的为 undefined，相当于获取数组中不存在的下标
// const [foo1, bar1, baz1, more] = arr;
// // 100, 200, 300, undefined
// console.log(foo1, bar1, baz1, more); 

// // 支持给提取到的成员设置默认值
// const [foo1, bar1, baz1, more = 'default'] = arr;
// // 100, 200, 300,  default
// console.log(foo1, bar1, baz1, more); 

// -------------------应用场景----------------------

// 拆分字符串
// 传统做法
const path = '/foo/bar/baz';
const tmp = path.split('/');
const rootdir1 = tmp[1];
console.log(rootdir1);  // foo
// 解构做法
const [, rootdir2] = path.split('/');
console.log(rootdir2);  // foo

```

#### 5、对象解构
* 根据元素的属性名提取
* 用{name: objName}解决结构对象与作用域外的属性名称冲突的问题
* 其他特性与数组解构相同
```
// 对象的解构，根据元素的属性名提取
const obj = { name: 'jack', age: 18 };
// // 解构对象的属性名要与被解构对象的属性名相匹配
// const { name } = obj;
// console.log(name);  // jack
// const { course } = obj;
// console.log(course);  // undefined

// // 也可以设置默认值
// const { name, age, sex, text = {name: 'kate'} } = obj;
// // jack, 18 undefined
// console.log(name, age, sex, text);

// // 当解构对象的属性名和作用域外的属性名有冲突，用{name: objName}解决，name 表示被解构对象的要提取的属性名，objName 表示提取后的值所放入的变量名称
// const name = 'tom';
// const age = '23';
// // height: objHeight = '180'，同样可以设置默认值
// const { name: objName, age: other, height: objHeight = '180' } = obj;
// // tom, 23, jack, 18
// console.log(name, age, objName, other, objHeight);


// -------------------应用场景--------------------
const { log } = console;
log('foo');
log('bar');
log('123');

```





### 6、模板字符串
#### 反引号
* 用反引号，内容支持用\`\`进行转义
* 支持字符串内容里直接换行，有利于输入 html 代码
* 支持通过插值表达式的方式在字符串中嵌入对应的数值，可以嵌入任何 js 语句，比字符串拼接更方便
```
// 传统字符串，用''或""
const str = 'hello ES2015, this is a string';

// 用反引号，内容支持用\`\`进行转义
const str2 = `hello ES2015, this is a \`string\``;
console.log(str2);

// 支持字符串内容里直接换行，有利于输入 html 代码
const str3 = `hello ES2015, 
this is a \`string\``;
console.log(str3);


// 支持通过插值表达式的方式在字符串中嵌入对应的数值，可以嵌入任何 js 语句，比字符串拼接更方便
const name = 'tom';
const msg = `hey, ${name}————${1+2}————${Math.random()}`;
console.log(msg);
```

#### 带标签的模板字符串
* 标签函数，作用是对模板字符串进行加工
```
// 带标签的模板字符串
// const str = console.log`hello world`;


// 定义标签函数，作用是对模板字符串进行加工
const name = 'tom';
const gender = true;
function myTagFunc (strings, name, gender) {
    console.log(strings, name, gender);
    // return '123';
    const sex = gender ? 'man' : 'woman';
    return strings[0] + name + strings[1] + sex + strings[2]; 
}
const result = myTagFunc`hey, ${name} is a ${gender}.`
console.log(result);

```





### 7、字符串的扩展方法
* 常用方法，判断字符串中是否包含指定内容，返回 true/false
    - includes(str)：是否包含 str
    - startsWith(str)：是否以 str 开头
    - endsWith(str)：是否以 str 结尾

```
const message = 'Error: foo is not defined';
console.log(message.startsWith('Error')); // true
console.log(message.endsWith('Error'));// false
console.log(message.includes('Error'));// true
```




### 8、参数默认值
* 没有传入所使用的参数，需要定义的值
```
// function foo(enable) {
//     enable = enable===undefined ? true : enable;
//     console.log('foo invoked - enable: ');
//     console.log(enable);
// }
// foo(); // true

// // 默认值只会在没有传递参数或者实参为 undefined 时起作用
// function foo(enable = true) {
//     console.log('foo invoked - enable: ');
//     console.log(enable);
// }
// foo(); // true

// 如果有多个参数时，带有默认值的形参要放在参数的最后，这样在没有传入对应参数时，默认值才会起作用
function foo( bar, enable = true) {
    console.log('foo invoked - enable: ');
    console.log(enable, bar);
}
foo('abs'); // true

```



### 9、...操作符
#### 剩余参数
* 传入的所有参数都会被放在 args里，用...args表示
* ...args要放在形参的最后一位

```
// function foo() {
//     console.log(arguments);
// }
// foo()传入的所有参数都会被放在 args里，args 接收的是所有参数
// function foo(...args) {
//     console.log(args); // [1, 2, 3, 4]
// }

// ...args要放在形参的最后一位
function foo(first, ...args) {
    console.log(first, args); // 1, [2, 3, 4]
}
foo(1,2,3,4);

```
#### 展开数组，获取数组内的元素
```
// 获取数组元素
const arr = ['foo', 'bar', 'baz'];

// 传统写法
// console.log(
//     arr[0],
//     arr[1],
//     arr[2]
// ); // foo, bar, baz

// apply 写法
// console.log.apply(console, arr); // foo, bar, baz

// ES2015
console.log(...arr); // foo, bar, baz
```







### 10、箭头函数
#### 使用箭头函数优点
* 优点：
    - 极大的简化了回调函数的编写，使代码更简短更易读
    ```
    // 定义函数
    // 传统方法
    // function inc (number) {
    //     return number + 1;
    // }
    // console.log(inc(100)); // 101
    
    // 如果只有一个参数，函数里只有一条语句， ()和 return 可以省略，如下简写
    // const incArrow = n => n + 1;
    // 无/多个参数和多条语句时，参数要用()，语句要用{}
    // const incArrow = (n, m) => {
    //     console.log('incArrow 多参数 多语句');
    //     return n + m;
    // };
    // console.log(incArrow(100, 10)); // 110
    
    
    const arr = [1, 2, 3, 4, 5, 6, 7];
    // 筛选出数组中的奇数
    // 传统写法
    const newArr = arr.filter(function(item) {
        return item % 2;
    });
    
    // 箭头函数写法
    const oddArr = arr.filter(i => i % 2);
    console.log(newArr, oddArr);  // [ 1, 3, 5, 7 ], [ 1, 3, 5, 7 ]
    
    ```
    - 不会改变 this 指向
        + 箭头函数中没有 this 的机制，所以不会改变 this 指向
    ```
    const person = {
        name: 'tom',
        sayHi: function () {
            console.log(this.name); // tom
        },
        // this 在箭头函数外面拿到的是什么，箭头函数内部就是什么，不会发生改变
        sayHiArrow: () => {
            console.log(this.name); // undefined
        },
        sayHiAsync: function() {
            setTimeout(function() {
                console.log(this.name); // undefined
            }, 1000);
            //为了在异步函数里获取到name 属性，传统修改方法
            const _this = this;
            setTimeout(function() {
                console.log(_this.name); // 'tom'
            }, 1000);
        },
        sayHiAsyncArrow: function() {
            // 使用箭头函数，则 this指向 就不会被改变，可以直接取到 name
            setTimeout(() => {
                console.log(this.name); // 'tom'
            }, 1000);
        }
    }
    
    person.sayHi();
    person.sayHiArrow(); 
    person.sayHiAsync(); 
    person.sayHiAsyncArrow(); 
    
    ```




### 11、对象Object新增属性
#### 对象字面量的增强
* 定义对象属性时，如果属性名和对应变量名相同，则可以省略变量名， 即 obj = {bar}
* 计算属性名，即obj = {[Math.random()]: 123}
* 普通方法可以省略冒号和 function 关键字，即 obj = { method(){} }st
```
const bar = '345';
const obj = {
    foo: 123,
    // bar: bar 
    // 如果属性名和对应变量名相同，则可以省略变量名，如下表示
    bar,
    // ES2015之后，可以直接在对象中用[]包裹任意表达式，将表达式的结果作为属性名，即计算属性名
    [Math.random()]: 123,
    method1: function () {
        console.log('method1111');
    },
    // 普通方法可以省略冒号和 function 关键字，此时的方法是普通函数的写法，会改变 this 指向
    method2 () {
        console.log('method222');
        console.log(this);
    }
}
obj.method2(); // 此时 this 会指向当前调用它的对象 obj
// ES2015中，要在 obj 创建之后，用下面的形式动态添加属性
// obj[Math.random()] = '333';
console.log(obj); 
 
```
#### Object.assign
* 将多个源对象中的属性，复制到目标对象中，如果源对象里的属性有与目标对象相同的属性，则会覆盖目标对象的属性
    - 源对象： 从此对象中取出属性
    - 目标对象： 放入此对象
* 使用：const result = Object.assign(target, source1);，返回值是对象，result===target
* 作用：用后面对象（source1）的属性覆盖第一个对象（target）的属性
* 应用： 
    - 返回新对象：const newObj = Object.assign({}, obj);
```
// const source1 = {
//     a: 123,
//     b: 'jack'
// }
// const source2 = {
//     b: 198,
//     d: 'haha'
// }
// const target = {
//     a: 456,
//     c: 'man'
// }

// const result = Object.assign(target, source1, source2);
// console.log(target); 
// console.log(result); 
// console.log(result === target);  //true


function func(obj) {
    // 这样直接改变 obj 的 name 属性，那么func 外部的 obj.name 也会被改变
    // obj.name = 'func obj';
    // console.log(obj.name); 

    // 为避免影响外部变量，返回一个新对象
    // const funcObj = Object.assign({}, obj);
    // console.log(funcObj == obj); // false
    // 为防止源对象中没有name 属性，第一个参数中可设置默认值
    const funcObj = Object.assign({name: 'lilei'}, obj);
    funcObj.name = 'func obj';
    console.log(funcObj);
}
const obj = { name: 'global obj' };
func(obj);
console.log(obj);

```
#### 对象扩展方法，Object.is
* ES2015 中提出了新的同值比较的方法，使用Object.is进行比较
```
console.log(
    // 0 == false // true
    // 0 === false // false
    // +0 === -0   // true
    // NaN === NaN    // false
);

// ES2015 中提出了新的同值比较的方法，使用Object.is进行比较
console.log(
    // Object.is(+0, -0)  // false
    Object.is(NaN, NaN) // true
);
```
* 建议：大多数情况下不会用到，建议使用三等号进行比较



### 12、Proxy
#### Proxy概述及使用
* 专门用来为对象设置访问代理器，通过 proxy 可以轻松监控对象的读写过程
```
const person = {
    name: 'jack',
    age: 20
}

// 通过 new Proxy 为 person 构建代理对象
// 参数一：代理的目标对象，即 person  
// 参数二：代理的处理对象，即 person  
const personProxy = new Proxy(person, {
    // 通过 get()，监视属性的访问
    get(target, property) { 
        // // target: 代理的目标对象
        // // property: 外部所访问的属性的属性名 
        // console.log(target, property);
        // // get()返回值将会作为外部访问这个属性得到的结果
        // return 100;
        //正常使用逻辑时，需要判断目标对象是否含有要访问的属性名
        return property in target ? target[property] : 'default';
         
    },
    // 监视对象设置属性的过程
    set(target, property, value) {
        // target: 代理的目标对象
        // property: 外部写入的属性名 
        //  value: 外部写入的属性值 
        console.log(target, property, value);
        // 正常使用逻辑，可以对写入属性的 value 进行校验
        // 如果属性时 age，当 value 不是数字时，会抛出类型错误
        if (property === 'num') {
            if (!Number.isInteger(value)) {
                throw new TypeError(`${value} is not an int`);
            }
        }
        target[property] = value;
    }
}); 
personProxy.gender = true;
personProxy.num = '23'; // TypeError: 23 is not an int
personProxy.num = 24; 
console.log(personProxy.name); // jack
console.log(personProxy.sex); // default
```
#### Proxy VS. Object.defineProperty()
* Proxy 优势
    - 功能更强大，使用更方便
        + Proxy 能够监视到对象更多的操作，如delete，对象中方法的调用
        + Object.defineProperty()只能监视属性的读写
    - Proxy 的功能总结
    
        handler方法 | 触发方式
        ---|---
        get | 读取某个属性
        set | 读取某个属性
        has | in 操作符
        deleteProperty | Object.deleteProperty()
        getPropertypeOf | Object.getPropertypeOf()
        setPropertypeOf | Object.setPropertypeOf()
        isExtensible | Object.isExtensible()
        preventExtensions | Object.preventExtensions()
        getOwnPropertyDescriptor | Object.getOwnPropertyDescriptor()
        defineProperty | Object.defineProperty()
        ownKeys | Object.getOwnPropertyNames()、Object.getOwnPropertysymbols()
        apply | 调用一个函数
        construct | 用 new 调用一个函数

    - 能更好的支持数组对象的监视，通过重写数组的操作方法，实现思路
        + 通过自定义的方式覆盖数组/对象的原型上的 push,shift等方法，以此劫持方法的调用过程
    - Proxy 是以非侵入的方式监管了整个对象的读写
        + 已经定义的对象，不需要对对象本身做任何 操作，就能监视对象内部的读写

```
// 优势 1：Proxy功能更强大，使用更方便 --------------
// const person = {
//     name: 'jack',
//     age: 20
// }
// console.log(person);
// const personProxy = new Proxy(person, {
//     // 在外部对当前代理对象进行删除操作时会自动执行此方法
//     deleteProperty(target, property) {
//         // target: 代理的目标对象
//         // property: 外部要删除的属性名称
//         console.log('delete', property);
//         delete target[property];
//     }
// }); 
// delete personProxy.age;
// console.log(person);


// // 优势 2：Proxy能更好的支持数组对象的监视 --------------
// // 使用 Proxy 对数组进行监视
// const list = [];
// const listProxy = new Proxy(list, {
//     set (target, property, value) {
//         console.log('set', property, value);
//         target[property] = value;
//         return true;  // 表示设置成功
//     }
// })
// listProxy.push(100); // Proxy 内部会根据 push 的值自动推算出元素的下标
// listProxy.push(101);


// 优势 3：Proxy 不需要侵入对象就能监控整个对象的读写 --------------
// // Object.defineProperty()方式
// const person = {};
// Object.defineProperty(person, 'name', {
//     get () {
//         console.log('name 被访问');
//         return person._name; // 要求用特定的方式单独定义要监视的属性
//     },
//     set (value) {
//         console.log('name 被设置');
//         person._name = value;
//     }
// });
// Object.defineProperty(person, 'age', {
//     get () {
//         console.log('age 被访问');
//         return person._age;
//     },
//     set (value) {
//         console.log('age 被设置');
//         person._age = value;
//     }
// });
// person.name = 'jack';
// person.age = '35';
// console.log(person.name, person.age, person);

// Proxy 方式更为合理
const person2 = {
    name: 'kate',
    age: 19
}
const personProxy = new Proxy(person2, {
    get(target, property) {
        return target[property];
    },
    set(target, property, value) {
        target[property] = value;
    }
});
personProxy.name = 'john';
console.log(personProxy.name);

```



### 13、Reflect（ES2015 中提出的全新的内置对象，现在能够使用的有 13 个方法）
* reflect 属于一个静态类，不能通过 new 方式构建实例对象，只能调用这个静态类的静态方法
* Reflect 成员方法就是对 Proxy 处理对象的默认实现
* Reflect 统一提供了一套用于操作对像的 API
* !!!注意: 以前的对象操作方式还能使用，但是ECMAScript 官方希望经过一段时间过度后，以后的标准会把之前的操作方式废弃掉
```
// const obj = {
//     foo: '123',
//     bar: '456'
// }
// const proxy = new Proxy(obj, {
//     // 在定义 get/set 方法时的标准做法：先实现所需要的监视逻辑，最后返回通过中对应方法的调用结果
//     get(target, property) {
//         console.log('watch logic~');
//         return Reflect.get(target, property);
//     }
// });
// proxy.foo;

const obj = {
    name: 'jack',
    age: 18
}
// // 传统方法
// // 判断 obj 是否含有 name 属性
// console.log('name' in obj);
// // 删除 age 属性
// console.log(delete obj['age']);
// // 获取 obj 中所有的属性名
// console.log(Object.keys(obj));
// console.log(obj);

// Reflect方式
console.log(Reflect.has(obj, 'name'));
console.log(Reflect.get(obj, 'name'));
console.log(Reflect.set(obj, 'gender', 'woman'));
console.log(Reflect.deleteProperty(obj, 'age'));
console.log(Reflect.ownKeys(obj));
console.log(obj);

```



### 14、Promise
* 提供了一种更优的异步编程解决方案
* 通过链式调用的方式解决了传统异步编程中回调函数嵌套过深的问题





### 15、类
#### class 创建类
```
// 传统方法创建类
function Person(name) {
    this.name = name;
}
Person.prototype.say = function () {
    console.log(`hi, my name is ${this.name}`);
}
const p = new Person('tom');
p.say();

// class 方法创建类
class Student {
    // 构造函数
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(this.name);
    }
}
const student = new Student('xiao');
student.say();

```
#### 静态方法
* 类当中的方法分为实例方法和静态方法 
    - 实例方法需要通过类构造的实例对象调用
    - 静态方法需要通过类本身调用
* 传统方法中要实现静态方法，直接在构造函数对象上挂载方法实现
* ES2015 中有一个专门添加静态方法的关键词——static
```
class Person {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`hi, my name is ${this.name}`);
    }

    static create(name) {
        console.log(this);
        // new 方式创建 Person 类的实例，new 方式相当于调用了这个类中构造函数的实例
        return new Person(name);
    }
}

// 调用静态方法
// 静态方法是挂载到类型上的，静态方法内部 this不会指向某个实例对象，而是当前的Person类
// 通过 Person 类本身调用静态方法
const tom = Person.create('tom');
tom.say();

```

#### 类的继承
* 关键字：
    - extends：实现继承
    - super：始终指向父类，调用 super 相当于调用父类的构造函数
```
class Person {
    constructor(name) {
        this.name = name;
    }
    say() {
        console.log(`hi, my name is ${this.name}`);
    }
    static create(name) {
        console.log('123');
    }
}

class Student extends Person {
    constructor(name, number) {
        // super 始终指向父类，调用 super 相当于调用父类的构造函数
        super(name)
        this.number = number;
    }
    hello() {
        super.say();
        console.log(`my school number is ${this.number}`);
    }
    static add() {
        super.create();
    }
}

const s = new Student('jack', 100);
s.hello();
const hah = Student.add('tom');

```



### 16、新增的数据结构：Set & Map
#### Set 数据结构
* 集合，类似于传统数组，内部成员不允许重复
```
const s = new Set();
s.add(1).add(2).add(3).add(4).add(3);
console.log(s);
// 循环遍历
s.forEach(i => console.log(i));

for (const i of s) {
    console.log(i);
}
// s.size：获取 set的长度，类似于array.length 属性
console.log(s.size);

// has()：判断集合中是否有某个特定的值，返回 true/false
console.log(s.has(3)); 
// delete()：删除集合中的元素，返回 true/false， 一次删除一个
// console.log(s.delete(3));
//  clear()：清空集合中的全部元素
console.log(s.clear()); 

// 应用场景：用于去重
const arr = [1, 2, 3, 4, 2, 1];
// // arr 去重，返回一个新的集合
// const result = new Set(arr);
// arr 去重，得到一个数组，ES2015的Array.from()把集合转换成数组
// const result = Array.from(new Set(arr));
// arr 去重，得到一个数组，ES2015的扩展运算符得到一个不重复的数组
const result = [...new Set(arr)];
console.log(result);
```
#### Map 数据结构
* 类似于对象，本质上都是键值对集合
* 键值对集合，用来映射两个任意键值对之间的关系
* Map 数据结构可以用任意类型的数据作为键名，而对象只能使用字符串作为键名
```
const obj = {};
// // 传统方式，给对象添加的属性不是字符串，内部会将其转换成字符串格式作为键名
// obj[true] = '1';
// obj[123] = '2';
// obj[{a: 1}] = '3';
// console.log(Object.keys(obj)); // [ '123', 'true', '[object Object]' ]
// console.log(Object.values(obj)); // [ '2', '1', '3' ]
// console.log(obj); // { '123': '2', true: '1', '[object Object]': '3' }
// //传统方式导致的问题是，如果键名是对象，获取空对象也能获取到上面添加的对象键名对应的值
// console.log(obj[{}]);

const m = new Map();
const tom = { name: 'tom' };
m.set(tom, 90);
console.log(m, m.size);
// m.size: 获取集合的长度
console.log(m.size);
// set()：设置键值对
m.set(3, 'we');
// get()：获取键名对应的键值
console.log(m.get(tom));
// has()：判断集合中是否有某个特定的值，返回 true/false
console.log(m.has(3)); 
// delete()：删除集合中的元素，返回 true/false， 一次删除一个
// m.delete(3);
//  clear()：清空集合中的全部元素
// console.log(m.clear()); 

// Map 结构循环遍历
m.forEach((v, k) => {
    console.log(v, k);
});
```




### 17、原始数据类型 Symbol
#### 基础讲解
* 一种全新的原始数据类型 
* 最大的特点就是独一无二，通过Symbol()创建的值都是唯一的，永远不会重复
    - console.log(Symbol() === Symbol()); // false
* 用途：
    - 避免对象属性名重复产生的问题
    - 模拟对象的私有成员
* 最主要的用法就是为对象创建独一无二的属性名
* 截止到ES2019，共标准化了 7中原始数据类型，未来还会有 BigInt
```
// // 传统对象中，属性名都是字符串，字符串有可能重复，重复会产生冲突，传统方式中解决冲突的方法约定属性名，如 a_foo, b_foo
// // shared.js *******************************
// // 定义一个全局共享的用于存放数据缓存的对象，
// const cache = {}

// // a.js *******************************
// cache['foo'] = Math.random(); 


// // b.js *******************************
// cache['foo'] = '123'; 
// // 此时属性名和 a.js 相同，会覆盖 a.js 缓存的属性
// console.log(cache);

// Symbol概述
const s = Symbol();
console.log(s);
console.log(typeof(s)); // Symbol
console.log(Symbol() === Symbol()); // false
// 考虑到开发过程中的调试，Symbol()允许传入一个字符串来作为当前创建的Symbol的描述，对于多次使用Symbol()的情况，可以再控制台中区分
console.log(Symbol('foo')); // Symbol(foo)
console.log(Symbol('bar')); // Symbol(bar)
console.log(Symbol('baz')); // Symbol(baz)
//  ES2015 中，对象可以直接使用 Symbol 类型的值作为属性名，对象的属性名有两种类型：String 和 Symbol

// Symbol() 应用 ------------------------------------------
// 应用一：避免对象属性名重复产生的问题
const obj = {
    [Symbol('baz')]: '对象字面量的形式'
};
obj[Symbol('foo')] = '123';
obj[Symbol('bar')] = '456';
console.log(obj);

// 应用二：模拟对象的私有成员

// a.js *******************************
const name = Symbol();
const person = {
    [Symbol()]: 'Nancy', // Symbol()创建的私有成员，外部拿不到
    [name]: 'kate', // Symbol()以变量的形式设置成属性，外部可以拿到
    say() {
        console.log(this[name]); // kate
        console.log(this.name); // undefined, name不是属性名，是变量名称
    }
}


// b.js *******************************
console.log(person[Symbol()], person[name]); // undefined kate
person.say();

```
#### Symbol 补充

```
console.log(
    Symbol() === Symbol(),
    Symbol('foo') === Symbol('foo')
); // false, false


// Symbol 全局复用问题 -----------------------------------------------------
// 需要全局复用相同的 Symbol，使用全局变量或者 Symbol()提供的静态方法Symbol.for()实现

// 法一：全局变量
const s = Symbol();


// 法二：Symbol.for()，此方法内部维护了一个全局注册表，为字符串和Symbol()值提供了一一对应的关系
const s1 = Symbol.for('foo');
const s2 = Symbol.for('foo');
console.log(s1 === s2); // true
//由于只提供了字符串的对应关系，如果Symbol.for()传入的描述 不是字符串，它内部会自动转化为字符串
console.log(
    Symbol.for(true) === Symbol.for('true'),
    Symbol.for(123) === Symbol.for('123'),
); // true, true




// Symbol类型内置了很多 Symbol常量,作为内部方法的标识，让自定义对象实现 js 中内置接口 --------------------------------
console.log(Symbol.iterator);
console.log(Symbol.hasInstance);
const obj = {}
console.log(obj.toString()); // [object object], 这样的字符串的结果被称为对象的toString()标签
// 自定义对象的toString()标签，在 obj 中添加特定的成员标识，为了避免与其他字符串属性名相同，ECMAScript 要求用 Symbol 来实现
const obj2 = {
    [Symbol.toStringTag]: 'XObject'
}
console.log(obj2.toString()); // [object XObject], toStringTag就是 Symbol 内置常量

// Symbol类型属性的遍历 -------------------------------------------
const objCycle = {
    [Symbol()]: 'symbol value',
    foo: 'normal value'
}
for (const key in objCycle) {
    if (objCycle.hasOwnProperty(key)) {
        console.log(key); // foo, 无法获取 Symbol 类型的属性
    }
}
// Object.keys()获取的是对象中String 类型的属性名称
console.log(Object.keys(objCycle)); // ['foo'], 无法获取 Symbol 类型的属性
console.log(JSON.stringify(objCycle)); // {"foo":"normal value"}, 只能序列化String 类型的属性，Symbol 类型的属性也会被忽略掉
// Object.getOwnPropertySymbols()获取的是对象中 所有Symbol 类型的属性名称
console.log(Object.getOwnPropertySymbols(objCycle));




```








### 18、for...of循环
* for 循环适用于遍历普通的数组
* for...in循环适用于遍历键值对
* for...of作为遍历所有数据结构统一方式，只要理解for...of内部工作原理，可以用它遍历任何一种自定义的数据结构
    - 可以直接获取到数组中的每个元素,取代 forEach
    - 可以随时 break 终止循环
    - 可以遍历伪数组，如arguments对象，dom 节点列表和 Set/Map数据结构
* for...of 遍历普通对象，会报TypeError: obj is not iterable
```
// for...of 遍历数组，与其他循环比较 ------------------------------------------------

const arr = [100, 200, 300, 400];

// 可以直接获取到数组中的每个元素，可以取代 forEach，且可以随时 break 终止循环
// for (const item of arr) {
//     console.log(item);
//     if (item > 200) {
//         break;
//     }
// }
// // 不能跳出循环
// arr.forEach(item => {
//     console.log(item); 
// })
// // every()，每一个元素都要满足某个条件，返回 true,否则返回 false
// arr.every()
// // some()只要有一个元素都要满足某个条件，返回 true,否则返回 false  
// arr.some() 

// for...of 可以随时终止循环；伪数组也可以使用，如 arguments 、 dom 节点列表、set 和 map 对象
// for...of遍历 Set/Map数据结举例 --------------------------------------------------
// for...of遍历 set
const s = new Set(['foo', 'bar']);
for (const item of s) {
    console.log(item); // foo bar
}

// for...of遍历 map
const m = new Map();
m.set('foo', 123);
m.set('bar', 345);
// 遍历以后，item 是 key-value 组成的数组
for (const item of m) {
    console.log(item); // [ 'foo', 123 ], [ 'bar', 345 ]
}
// 利用数组的解构遍历 map 结构
for (const [key, value] of m) {
    console.log(key, value); // foo 123, bar 345
}


// for...of遍历对象 ----------------------------------------------------
const obj = { foo: 123, bar: 456 }
// for (const item of obj) {
//     console.log(item); 
// }
// 此处会报错，TypeError: obj is not iterable
// for...of遍历对象在下节Iterable 可迭代接口中讲到


// for of在语法上属于命令式执行，Object.entries(obj)属于声明式执行，个人推荐声明式执行
ES2017 提供了 Object.entries()，内部自带了迭代器，使用更方便
for (const item of Object.entries(obj)) {
    console.log(item); 
    // [ 'foo', 123 ]
    // [ 'bar', 456 ]
}

for (const [key, value] of Object.entries(obj)) {
    console.log(key, value); 
    // foo 123
    // bar 345
}

```



### 19、Iterable 可迭代接口
### Iterable解释
* ES中能够表示有结构的数据类型越来越多，为了给各种数据结构提供一种统一的遍历方式，ES2015 提供了 Iterable 接口（接口可以理解为一种规格标准，实现统一规格标准就是实现统一的接口）
* 实现 Iterable接口就是 for...of 的前提，能够被 for...of循环遍历的数据在内部都已经实现了Iterable接口
```
// Iterable接口解释 ----------------------------------
const set = new Set(['foo', 'bar', 'baz']);
const iterator = set[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
// { value: 'foo', done: false }
// { value: 'bar', done: false }
// { value: 'baz', done: false }
// { value: undefined, done: true }
```
#### 实现 Iterable 可迭代接口

```
// 实现Iterable 可迭代接口 ----------------------------------
// // 在 obj 内用对象字面量方式挂载一个名称为Symbol.iterator的属性，实现 iterator 接口
// // 实现 Iterator 接口说明：
// const obj = {
//     // 最外层，实现 Iteratable 接口，即可迭代接口，内部必须拥有一个用于迭代的Symbol.iterator()方法
//     [Symbol.iterator]: function() {
//         // 中间层，实现了 Iterator接口，即迭代器接口，内部必须拥有一个用于迭代的 next()方法
//         return {
//             next: function() {
//                 // 最内层，实现了 IterationResult 接口，即迭代结果接口，必须要有value属性和done属性，value 表示当前被迭代到的数据，值可以是任意类型；done 表示迭代是否结束，用 true 和 false 表示
//                 return {
//                     value: 'jack',
//                     done: true // 表示迭代结束
//                 }
//             }
//         }
//     },

// }


// 举例实现 obj 的 Iterable 可迭代接口
const obj = {
    store: ['foo', 'bar', 'baz'],
    [Symbol.iterator]: function() {
        let index = 0;
        const self = this;
        return {
            next: function() {
                const result = {
                    value: self.store[index],
                    done: index >= self.store.length
                }
                index ++;
                return result;
            }
        }
    },

}

for (const item of obj) {
    console.log(item, '循环');
}

```
#### 迭代器模式
* 是一种设计模式
* ES2015 的 Iterable 可迭代接口是语言层面实现的迭代器模式，适用于任何数据结构，只需要通过代码实现Symbol.iterator方法
```
// 迭代器设计模式: 对外提供统一遍历接口，使外部不用关心数据内部结构 -------------------------------------------
// 场景：你我协同开发一个任务清单应用
// 我的代码，设计一个用于存放所有任务的对象 =========================================
const todos = {
    life: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '英语'],
    work: ['喝茶'],
    // 方法二：利用函数回调帮助你实现罗列
    // 只适用于当前对象的数据结构
    each: function(callback) {
        const all = [].concat(this.life, this.learn, this.work);
        for (const item of all) {
            callback(item);
        }
    },
    // 方法三：利用迭代器模式帮助你实现罗列
    [Symbol.iterator]: function() {
        const all = [...this.life, ...this.learn, ...this.work];
        let index = 0;
        return {
            next: function() {
                return {
                    value: all[index],
                    done: index++ >= all.length
                }
            }
        }
    }
}

// 你的代码，罗列出我定义的任务对象内容 =========================================
// // 方法一：一个一个循环，代码量多，可维护性低，复用性差
// for (const item of todos.life) {
//     console.log(item);
// }
// for (const item of todos.learn) {
//     console.log(item);
// }
// for (const item of todos.work) {
//     console.log(item);
// }

// // 方法二：利用我的对象中提供的方法实现
// todos.each(function (item) {
//     console.log(item);
// })

// 方法三： 利用迭代器模式实现
for (const item of todos) {
    console.log(item);
    // 吃饭
    // 睡觉
    // 打豆豆
    // 语文
    // 数学
    // 英语
    // 喝茶
}
```




### 20、生成器
#### Generator 基础
* 避免异步编程回调嵌套过深，提供更好的异步编程解决方案
* Generator 函数自动返回一个 Generator对象，调用这个生成器对象的 next 方法，才会让这个函数的函数体执行，执行过程中一旦遇到 yield 关键字，函数暂停执行，yield 后面的值作为 next 的结果返回，继续调用 next 方法，函数会从暂停的位置继续执行，周而复始，一直到这个函数完全结束，next 所返回的 done为 true
* 惰性执行
```
// 普通函数
function common() {
    console.log('jack');
    return 100;
}

// Generator 函数 ----------------------------------------------------
// // Generator 函数， 生成器对象也实现了 Iterator 接口的协议
// function * foo() {
//     console.log('jack');
//     return 100;
// }
// const result = foo();
// console.log(result.next()); // { value: 100, done: true }

// yield 关键字
function * foo() {
    console.log('11111');
    yield 100;
    console.log('22222');
    yield 200;
    console.log('33333');
    yield 300;
}
const generator = foo();
console.log(generator.next()); // 11111, { value: 100, done: false }
console.log(generator.next()); // 22222, { value: 200, done: false }
console.log(generator.next()); // 33333, { value: 300, done: false }
console.log(generator.next()); // { value: undefined, done: true }

```

#### Generator 应用
```
// Generator 应用 ----------------------------------------------------
// 案例 1： 发号器， id 自动+1
function * createIdMaker() {
    let id = 1;
    // 不用担心死循环，执行一次 next 会自动暂停
    while (true) {
        yield id++;
    }
}

const idMaker = createIdMaker();
console.log(idMaker.next().value); // 1
console.log(idMaker.next().value); // 2
console.log(idMaker.next().value); // 3


// 案例 2： 使用 Generator 函数实现 iterator 方法，更简单
const todos = {
    life: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '英语'],
    work: ['喝茶'],
    [Symbol.iterator]: function * () {
        const all = [...this.life, ...this.learn, ...this.work];
        for (const item of all) {
            yield item;
        }
    }
}
for (const item of todos) {
    console.log(item);
    // 吃饭
    // 睡觉
    // 打豆豆
    // 语文
    // 数学
    // 英语
    // 喝茶
}

```





### 21、ES Modules
* 在模块化开发的课程中介绍




