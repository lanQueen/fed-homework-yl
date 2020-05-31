# Module2 - Task1 - Functor



### 13、Functor（函子）
* 为什么要学函子
    - 目前为止，学习了函数式编程的基础（传函数，柯里化，函数组合），但是没有演示在函数式编程中如何把副作用控制在可控的范围内、异常处理、异步操作等

* 什么是 Functor
    - 容器
        + 包含值和值的变形关系（这个变形关系就是函数）
    - 函子
        + 是一个特殊的容器，通过一个普通的对象来实现，该对象具有 map 方法，map 方法可以调用一个函数对值进行处理（变形关系）

```
/* 
    函子： 
        1、内部维护一个值（value），且不对外公布
        2、对外提供一个 map 方法，map 接收一个处理值（value）的纯函数作为参数，在 map 方法内部由这个纯函数处理值（value），并返回一个新的函子
 */

// 基本语法演示----------------------------------------------------------
class Container {
    // 函子内部要维护一个值，通过构造函数传入，即 value
    constructor (value) {
        // 函子内部要把 value 存储下来，value 是函子内部维护的，，不对外公布
        // 约定所有以_开头的成员都是私有成员，外部无法访问
        this._value = value;
    }

    // 对外提供一个 map 方法，接收一个处理值的纯函数，map 内部由这个纯函数处理值 value，并把处理的结果传递给一个新的函子，由新的函子保存，并返回这个新的函子
    map (fn) {
        // map 方法返回的是一个新的函子对象，在新的函子对象内保存新的值，始终不把值对外公布，想要处理值就需要给 map 方法传入一个处理值函数
        return new Container(fn(this._value));
    }
}


// 每一个函子对象都有一个 map 方法，可以链式操作，在map 方法里继续处理
const box = new Container(5)
    .map(x => x + 1)
    .map(x => x * x);
// console.log(box);// Container { _value: 36 }




// 封装 new 操作，避免每次创建一个函子都要调用 new ----------------------------------------------------------
class Container1 {
    // of 的作用：返回一个函子对象
    // 静态方法 of 里封装了 new 关键字， 返回了一个实例化对象
    static  of(value) {
        return new Container1(value);
    }
    constructor (value) {
        this._value = value;
    }
    map (fn) {
        // 直接返回静态方法 of
        // of 是静态方法，直接用类名来调用
        return Container1.of(fn(this._value));
    }
}


const res = Container1.of(5)
    .map(x => x + 2)
    .map(x => x * x);
console.log(res);// Container { _value: 49 }
    
```

* 函子的总结
    - 函数式编程的运算不直接操作值，而是由函子完成
    - 函子就是一个实现了 map 的契约对象，所有的函子都有一个 map 方法
        + 可以把函子想象成一个盒子，这个盒子封装了一个值
        + 想要处理盒子中的值，需要给盒子的 map 方法传递一个处理值的函数（纯函数），由这个函数对值进行处理
        + 最终 map 方法返回一个包含新值的盒子（函子）

```
// 副作用问题
// 演示 null/undefined导致的问题，此时传入 null/undefined 就是副作用
const result = Container1.of(null)
    .map(x => x.toUpperCase());
console.log(result);// 报错，TypeError: Cannot read property 'toUpperCase' of null
// 下一节介绍如何解决这个副作用

```





### 14、MayBe 函子
* 外部传递空值导致的错误是副作用的表现形式之一
* MayBe 函子作用
    - 可以对外部的空值情况做处理（空值副作用在允许的范围）

```

// MayBe 函子----------------------------------------------------------
class MayBe {
    
    static of (value) {
        return new MayBe(value);
    }

    constructor (value) {
        this._value = value;
    }
    
    map (fn) {
        // 如果是空值，返回一个值为 null 的函子；否则，返回有值的函子
        return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value));
    }
    
    // 定义一个辅助函数，帮助 map 函数判断是否为空值
    isNothing () {
        return this._value === null || this._value === undefined;
    }
}



const res1 =  MayBe.of('hello world')
    .map(x => x.toUpperCase());
console.log(res1);// MayBe { _value: 'HELLO WORLD' }


const res2 =  MayBe.of(null)
    .map(x => x.toUpperCase());
console.log(res2);// MayBe { _value: null }


// MayBe 函子的问题: 虽然可以处理空值的问题，但是多次调用 map 方法时，到底哪一次出现空值，并不明确
const res3 =  MayBe.of('hello world')
    .map(x => x.toUpperCase())
    .map(x => null)
    .map(x => x.split(' '));
console.log(res3);// MayBe { _value: null }

```





### 15、Either 函子
* Either: 两者中的任何一个，类似于 if...else...处理
* 异常会让函数变得不纯，Either 函子可以用来做异常处理

```
// Either 函子----------------------------------------------------------
class Left {
    static of (value) {
        return new Left(value);
    }
    constructor (value) {
        this._value = value;
    }
    
    map (fn) {
        return this;
    }
}

class Right {
    static of (value) {
        return new Right(value);
    }
    constructor (value) {
        this._value = value;
    }
    
    map (fn) {
        return Right.of(fn(this._value));
    }
}

// 创建一个将参数转换成 json 的函数，函数内部根据不同结果调用 Left/Right 函子
// 防止调用parseJSON函数出现异常，函数内部使用 try...catch
function parseJSON (str) {
    try {
        // 把转换的结果给函子，返回一个 Right 函子
        return Right.of(JSON.parse(str))
    } catch (e) {
        // 如果有异常，返回一个 Left 函子
        return Left.of({ error: e.message });
    }
}

// 直接调用 Left/Right 函子
const res1 = Right.of(12)
    .map(x => x + 2);
const res2 =  Left.of(12)
    .map(x => x + 2);
// console.log(res1, res2);// Right { _value: 14 } Left { _value: 12 }

// 通过调用 parseJSON 函数来调用函子
const l = parseJSON('{ name: zs }');
console.log(l); // Left { _value: { error: 'Unexpected token n in JSON at position 2' } }
const r = parseJSON('{ "name": "jack" }')
    .map(x => x.name.toUpperCase())
console.log(r); // Right { _value: { name: 'JACK' } }

```




### 16、IO 函子
* IO: Input/Output
* IO 函子中的 _value 是一个函数，这里是把函数作为值来处理
* IO 函子可以把不纯的操作存储到 _value 中，_value 存储的是函数，IO 函子内部没有调用这个函数，通过 IO 函子延迟执行这些不纯的操作（惰性执行）
    - IO 函子存储的这些函数有可能是不纯的，通过 IO 函子把不纯的函数包装起来，当前的函数就变成了纯函数，等到需要的时候调用
* 把不纯的操作交给调用者来处理，在调用的时候才引发不纯的操作

```
const fp = require('lodash/fp');

// IO 函子----------------------------------------------------------
class IO {
    
    static of (value) {
        // IO 函子接收的是一个函数，故这里返回一个 value 为函数的 IO 函子
        // IO 函子最终的结果仍然是一个值，但是把取值的过程包装到一个函数里，需要的时候执行这个函数取值
        return new IO(function () {
            return value;
        });
    }
    // IO 函子内接收的 _value 是一个函数
    constructor (fn) {
        this._value = fn;
    }

    map (fn) {
        // 把当前函子中的 value 和传入的 fn 组合成一个新的函数
        return new IO(fp.flowRight(fn, this._value));
    }
}


//  用 map 方法传递函数时，这个函数有可能是不纯的函数，无论传入的是否是纯函数，IO 函子执行后 IO.of(process).map(p => p.execPath) 返回的始终是一个纯函数
const res1 =  IO.of(process).map(p => p.execPath);
console.log(res1);// IO { _value: [Function] } 此处Function指的是process 和 p => p.execPath 组合成的新函数
// 当需要的时候调用 IO 返回的纯函数
console.log(res1._value());// IO { _value: [Function] }

```





### 17、Folktale
* 异步任务的实现过于复杂，使用 folktale 中的 task 来演示
* folktale 是一个标准的函数式编程库
    - 和 lodash、ramda不同的是，没有提供很多功能函数
    - 只提供了一些函数式处理的操作，例如： compose、curry 等，一些函子 Task、Either、MayBe 等
* 使用 folktale 模块
    - 安装 npm i folktale --save
    - 引入 const { compose, curry } = require('folktale/core/lambda');

```
const { compose, curry } = require('folktale/core/lambda');
const { toUpper, first } = require('lodash/fp');


// 柯里化函数 curry(arity: any, fn: any)，有两个参数，arity 表示的是参数 fn 函数需要传入多少参数；传入参数一 arity 的目的是为了避免错误
const f = curry(2, (x, y) => x + y);
console.log(f(1, 2)); // 3
console.log(f(1)(2)); // 3

//  函数组合 compose 演示
const com = compose(toUpper, first);
console.log(com(['one', 'two'])); // ONE

```




### 18、Task 函子
* Task 异步执行
    - folktale(2.3.2) 2.x 中的 Task 和 1.0 中的 Task 区别很大，1.0 中的语法更接近现在演示的例子
    - 这里以 2.3.2 来演示

```
const fs = require('fs');
const { task } = require('folktale/concurrency/task');
const { split, find } = require('lodash/fp');


// 异步读取 package.json文件----------------------------------------------------------
function readFile(filename) {
    // task()函数，需要接收一个函数，接收函数的参数时固定的，为 resolver
    // resolver 是一个对象，提供了两个方法 resolve（执行成功后的的方法） 和 reject（执行失败后的方法）
    return task(resolver => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) resolver.reject(err);
            resolver.resolve(data);
        })
    })
}
// readFile('package.json') 只是返回一个 task 函子，.run() 读取文件
const rs = readFile('package.json')
            .map(split('\n'))  
            .map(find(x => x.includes('version')))
            .run()
            .listen({
                onRejected: err => {
                    console.log(err);
                },
                onResolved: value => {
                    // console.log(value); // "version": "1.0.0"
                    const str = split(': "')(value)[1];
                    console.log(split('"')(str)[0]);// 1.0.0
                }
            })

```





### 19、Pointed 函子
* Pointed 函子是实现了 of 静态方法的函子
* of 方法是为了避免使用 new 来创建对象，更深层的含义是用来吧值放到上下文 Context（把值放到容器中，使用 map 来处理值）

```
class Container {
    // 把值包裹到一个新的函子中并返回这个新函子
    static of (value) {
        return new Container(value);
    }
    ...
}

Container.of(2).map(x => x + 5);

```



### 20、IO 函子问题

```
/* 
    IO 函子的问题
 */

const fs = require('fs');

const fp = require('lodash/fp');

// IO 函子----------------------------------------------------------
class IO {
    
    static of (value) {
        return new IO(function () {
            return value;
        });
    }
    constructor (fn) {
        this._value = fn;
    }

    map (fn) {
        return new IO(fp.flowRight(fn, this._value));
    }
}

// linux 环境下，cat 命令读取文件并将文件内容打印出来
// 模拟 linux 环境的 cat 指令

// 读取文件会引起副作用，使函数变得不纯
const readFile = function (filename) {
    // 返回IO 函子，让读取文件的函数延迟执行
    return new IO(function () {
        // 同步读取文件
        return fs.readFileSync(filename, 'utf-8');
    })
}


const print = function (x) {
    return new IO (function () {
        // console.log(x);
        return x;
    })
}
const cat = fp.flowRight(print, readFile);
// cat 是嵌套的函子：IO(IO(x))，内部的 IO 是 print 返回的 IO,外部的 IO 是 readFile 返回的 IO，为什么？？？？？？
const res = cat('package.json')._value()._value();
console.log(res);

// IO 函子的问题在于，调用嵌套函子需要._value()._value()，不方便使用
```



### 21、Monad 函子
* Monad 函子：是可以变扁的 Pointed 函子，IO(IO(x))，变扁就是解嵌套函子的问题
* 一个函子如果具有 join 和 of 两个方法并遵守一些定律就是一个 Monad




## 总结
