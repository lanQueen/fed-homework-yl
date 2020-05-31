
# 代码目录结构

> README.md --------- 作业简答题答案

> notes ---------- 课程笔记

> codes --------- 代码文件
> > code01 -----------------  代码题1
> > > + basic.js ------- 基础代码
> > > + 01.js
> > > + 02.js
> > > + 03.js
> > > + 04.js

> > code02 ------------------ 代码题2
> > > + support.js ----- 基础代码
> > > + 01.js
> > > + 02.js
> > > + 03.js
> > > + 04.js



# 一、简答题

## 1. 描述引用计数的工作原理和优缺点

### 解答

* 工作原理： 
    - 引用计数器设置引用数，判断当前引用数是否为 0
    - 引用关系改变时修改引用数值
    - 当引用数字为 0 时，GC 机制开始工作，将其所在对象空间进行释放和回收再使用

* 优点
    - 可以即时回收垃圾对象
    - 最大限度的减少程序暂停

* 缺点
    - 无法回收循环引用的对象
    - 时间开销大，资源消耗较大
        




## 2. 描述标记整理算法的工作流程

### 解答
* 先遍历所有对象找到活动对象进行标记操作
* 然后再执行整理操作，移动对象位置，让它们在低智商连续
* 最后遍历所有对象清除没有标记的对象，释放并回收它们的内存空间，边疆回收的空间放到空闲列表中，方便后面的程序申请使用；同时清除阶段一种设置的标记，以方便下一次 GC 的工作







## 3. 描述 V8 中新生代存储区垃圾回收的流程

### 解答
* 新生代内存区分为两个等大的小空间，From 空间和 To  空间，活动对象存储于 From 空间，在 From 空间应用到一定程度之前，To 空间是空闲的；
* 首先对 Form 空间的活动对象标记整理后，将活动对象拷贝到 To 空间
* 然后直接释放 From 空间，From 与 To 交换空间完成垃圾回收
* 如果一轮 GC 回收后还存活的新生代对象或者To 空间的使用率超过 25%，满足这两个条件之一的对象将会产生晋升，将它们移动至老生代区域



## 4. 描述增量标记算法在何时使用及工作原理

### 解答
* 老生代区域，遍历对象对活动对象进行标记；可能是在遍历查找到第一层的可达对象后，就停下，让程序继续执行；一段时间后 GC 继续遍历完成下一轮的标记操作，然后程序再次执行；就这样交替执行，知道标记完成进行垃圾回收操作；






# 二、代码题一，基于下面的代码完成后面的四个练习
* 基础代码 /codes/code01/basic.js

## 1. 使用函数组合 fp.flowRight() 重新实现下面这个函数

* 解答 /codes/code01/01.js
```
const fp = require('lodash/fp');
const { cars } = require('./basic');


// Me
const getValue = fp.flowRight(fp.prop('in_stock'), fp.last);
console.log(getValue(cars));  // false

```

## 2. 使用 fp.flowRight() ，fp.pop()，fp.first() 获取第一个 car 的 name
* 解答 /codes/code01/02.js

```
const fp = require('lodash/fp');
const { cars } = require('./basic');

// Me
const getName = fp.flowRight(fp.prop('name'), fp.first);
console.log(getName(cars));   // Ferrari FF

```

## 3. 使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式实现
* 解答 /codes/code01/03.js
```
const fp = require('lodash/fp');
const { cars } = require('./basic');

// 无须改动
let _average = function(xs) {
    console.log(xs)
    return fp.reduce(fp.add, 0, xs) / xs.length;
}

// Me
const getAverageValue = fp.flowRight(_average, fp.map(v => v.dollar_value));
console.log(getAverageValue(cars));  // 790700

```


## 4. 使用 flowRight 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串，把数组中的 name 转换为这种形式：例如： sanitizeNames(["HelloWorld"] => ["hello_world"])

* 解答 /codes/code01/04.js
```
const fp = require('lodash/fp');
const { cars } = require('./basic');

// 无须改动，并在 sanitizeNames() 中使用它
let _underscope = fp.replace(/\W+/g, '_'); 


// Me
const sanitizeNames = fp.map(fp.flowRight(_underscope, fp.toLower, fp.prop('name')))
console.log(sanitizeNames(cars));

```





# 三、代码题二，基于下面的代码完成后面的四个练习
* 基础代码 /codes/code02/support.js


## 1. 使用 fp.add(x, y) 和 fp.map(f, x) 创建一个能让 functor 里的值增加的函数 ex1

* 解答 /codes/code02/01.js

```
const fp = require('lodash/fp');
const { Maybe, Container } = require('./support');
let maybe = Maybe.of([5, 6, 1]);

// Me
let ex1 = fp.map(x => fp.add(x, 1));
console.log(ex1(maybe._value));  // [ 6, 7, 2 ]

```


## 2. 实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素

* 解答  /codes/code02/02.js

```
const fp = require('lodash/fp');
const { Maybe, Container } = require('./support');
let  xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);

// Me
let ex2 = xs.map(fp.first);
console.log(ex2._value); // do

```

## 3. 实现一个函数 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母

* 解答 /codes/code02/03.js

```
const fp = require('lodash/fp');
const { Maybe, Container } = require('./support');
let safeProp = fp.curry(function (x) { return Maybe.of[x] });
let user = { id: 2, name: 'Albert' };

// Me
let ex3 = Maybe.of(user)
            .map(x => fp.first(x.name));

console.log(ex3._value);  // A

```


## 4. 使用 Maybe 重写 ex4， 不要有 if 语句

* 解答 /codes/code02/04.js
```
const fp = require('lodash/fp');
const { Maybe, Container } = require('./support');
let ex4 = function (n) {
    if (n) {
        return parseInt(n);
    }
}

// Me
const newFunc1 = Maybe.of('23').map(x => parseInt(x))
const newFunc2 = Maybe.of(null).map(x => parseInt(x))
const newFunc3 = Maybe.of(undefined).map(x => parseInt(x))
console.log(newFunc1._value);  // 23
console.log(newFunc2._value);  // null
console.log(newFunc3._value);  // undefined

```












