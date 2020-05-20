# Module1 - Task3 - TypeScript 详解

## 三、 TypeScript 内容详解

### 3.1 TypeScript 简单介绍
* TypeScript 是 JavaScript 的超集或者说扩展集（superset），在JavaScript的基础上多了一些扩展特性，主要提供了类型系统和对 ES6 的支持
* TypeScript 最终会被编译为 JavaScript
* Angular/Vue.js3.0 都支持

#### 3.1.1 TypeScript 概述

* TypeScript ——前端领域中的第二语言，适用于长周期开发的大型项目
* 优点：
    - 在开发过程中，处理类型异常，提高代码的可靠程度和开发效率
    - 作为一种完整的功能语言，相比于 Flow，功能更强大，生态也更健全、更完善
    - 前端领域中的第二语言，适用于长周期开发的大型项目
    - 任何一种 JavaScript 运行环境都支持
    - 好入手，属于渐进式
* 缺点：
    - 语言本身多了很多概念，如接口、泛型、枚举等
    - 对于小型项目，项目初期，TypeScript 会增加开发成本
    

#### 3.1.2 TypeScript 快速上手
* 基本使用：
    - 初始化 package.json文件 yarn init
    - 安装： yarn add typescript --dev
    - 编译成 js: yarn tsc 01-getting-started.ts 

* 编译后，ts 代码会被转化成 ES2015之前的 js 语法标准，也会自动移除类型注解





### 3.2 TypeScript 配置文件
* tsc 命令不仅可以编译某个 ts 文件，还可以编译整个项目或整个工程
* 配置过程：
    - 在根目录下执行 yarn tsc --init，会新增 tsconfig.json 文件
    - 如果此时编译某个文件，使用 yarn tsc 01-getting-started.ts，tsconfig 的配置时不会生效的
    - yarn tsc 只有编译整个项目，tsconfig 配置才会生效

* tsconfig.json 文件简单介绍
    - target：设置编译后的JS 采用的 ECMAScript版本，原来是 es5，修改为 es2015
    - module：输出代码采用什么方式进行模块化（采用CommonJS 模块化，即把导入导出的文件采用 require 和 module.exports方式导入导出）
    - outDir：设置编译后文件存放目录，默认为根目录下./，修改为 dist
    - rootDir：设置 typescript 代码所存放的目录，默认为./，修改为 src
    - sourceMap：true，不是开启源代码映射
    - strict: true，开启严格模式类型检查，即开启 strict: true 配置下面的所有类型检查



### 3.3 TypeScript 原始类型
* 目前 js 中原始数据类型
    - string 
    - number(NaN，Infinity 也是 number 类型) 
    - boolean 
    - null 
    - undefined 
    - symbol
    - 未来还会出现 bigInt，是指安全存储、操作大整数

```
/**
 * 原始数据类型
 */

// 目前 js 中原始数据类型：string number(NaN，Infinity 也是 number 类型) boolean null undefined symbol ，未来还会出现 bigInt，是指安全存储、操作大整数

const a: string = 'forbar';

// 在 js 中，NaN/NaN，Infinity(无穷大) 都属于 number 类型
const b: number = NaN;  // 200，Infinity

const c: boolean = true;  

// 与 flow 不同的是，在 ts 非严格模式（strict: false）下，string/number/boolean 是可以为null/undefined的
// 如果是 tsconfig 文件 strict: true，下面会报错；strict: false，就可以；配置"strictNullChecks": true 是专门用来检查变量是否为空的
// const d: string = undefined;

// void 在函数声明返回值时标记存放 null/undefined，在严格模式下只能存放 undefined
const e: void = undefined;


const f: null = null;  
const g: undefined = undefined;

// 若target: 'es5'，则 es5以后的特性都是不能使用的；Symbol是 js 中内置的标准对象，是 es2015新增的；这里使用会报错；下面会解决
// const h: symbol = Symbol();


```

### 3.4 TypeScript 标准库声明
* 标准库声明
    - 定义： 内置对象所对应的声明文件，代码中使用内置对象就必须引用对应的标准库，否则 ts 找不到对应的类型，会报错

```
/**
 * tsconfig.json配置的 es 版本是什么，就会引入对应版本的 ECMAScript的标准库声明；若target: 'es5'，则 es5以后的特性都是不能使用的
 * 
 *  解决这种报错的两种方案： 
 *      1、修改 tsconfig.json配置中 target: 'es2015'；   
 *      2、如果必须编译成 es5，且又要使用这个特性，就要修改 tsconfig.json文件中 lib 属性，即 "lib": ["ES2015"]；因为这个特性对应的类型声明文件在 lib 里（lib.es2015.symbol.d.ts）
 *   此时 console.log(),在浏览器环境中，是 BOM 对象提供的，刚才设置 lib 属性只设置了 ES2015，相当于把其他的标准库声明都覆盖了，现在修改为lib: ["ES2015", "DOM"] （ts 中浏览器的 BOM 和 DOM 都归结到一个标准库文件 DOM 里了）
 */
 
// Symbol是 js 中内置的标准对象，是 es2015新增的
const h: symbol = Symbol();
console.log(123);

```


### 3.5 TypeScript 中文错误消息
* 支持中文错误消息
    - yarn tsc --locale zh-CN，如此编译，可显示中文错误消息


### 3.6 TypeScript 作用域问题

```
/** 
 * 不同文件中有同样的变量名称，因为此时 a 变量是定义在全局作用域下的，其他文件中也定义了 变量a，所以会冲突 
 * 
 *  解决方法： 
 *      1、创建立即执行函数 
 *      (function () {
            const a = 123;
        })();
 *      2、export {}，此文件会作为一个模块导出，模块有自己的作用域，不会冲突；{}只是 export 的语法，并不是导出一个对象
 */ 
const a = 123;
console.log(a);

// 确保和其他示例没有成员冲突
export {}


```





### 3.7 TypeScript 类型详解

#### 3.7.1 TypeScript Object 类型
* Object 并不单指普通对象类型，泛指所有的非原始数据类型，即 object、array、function
* 对象的类型限制可以使用类似对象字面量语法的方式
* 关于 typescript 限制对象类型更专业的方式是使用接口，后面会介绍

```
// 类型定义为 object，变量可以接收对象/数组/函数，不能接收原始数据类型
const foo: object = []; // {}, [], function(){}

// 标记普通对象，使用类似字面量方式，要求赋值对象解构和类型结构完全一致；
// 关于 typescript 限制对象类型更专业的方式是使用接口，后面会介绍
const obj: { foo: number, bar: string } = { foo: 123, bar: 'str'};

```


#### 3.6.3 TypeScript 数组类型

```
/**
 * 元组类型
 */


// 确保和其他示例没有成员冲突
export {}

// ts 数组类型和 flow 的数组类型一样
// 方式一：:Array<number>，使用 Array 方式，需要泛型参数，表示数组内元素的类型，用 <number> 表示
const arr1: Array<number> = [1, 2, 3];  // 数组内元素用其他类型，会提示语法错误


// 方式二：:类型[]，更常用
const arr2: number[] = [1, 2, 3];  // 数组内元素用其他类型，会提示语法错误
 


// 案例验证使用强类型的优势 ------------------------------------------------

function sum(...args: number[]) {
    // js中需要判断每个成员是不是都是数字
    // ts 中给参数加个数字数组的类型注解，调用时不符合类型的会报语法错误

    // reduce(callback, 初始值)计算总和，参数一是个回调，参数二是初始值
    // callback(), 有两个参数，参数一 prev：上一次计算的结果；参数二 current 本次循环的当前值
    return args.reduce((prev, current) => prev + current, 0);
}
sum(1, 2, 3);

```


#### 3.6.4 TypeScript 元组类型
* 明确元素数量和每个元素类型的数组，各个元素类型不必要完全相同

```
/**
 * 元组类型
 */


// 确保和其他示例没有成员冲突
export {}

// 元组：明确元素数量和每个元素类型的数组，各个元素类型不必要完全相同

// 固定长度数组即元组；当一个函数内返回多个元素时，可以用元组的类型注解
const arr: [string, number, boolean, null, void, symbol, Array<number>, Object]  = ['bar', 123, true, null, undefined, Symbol(), [1], {name: '123'}];

// 获取数组元素
const tuple: [string, number] = ['jack', 12];
// 法一：用数组下标的方式访问
const name = tuple[0];
const age = tuple[1];

// 法二：用数组解构的方式提取数组元素
const [name1, age1] = tuple;




// 案例 ------------------------------------------------
// React中 Hooke 里 useState 返回的是元组类型
// 使用 ES2017 中 Object.entries()方法，得到的是元组
console.log(Object.entries({ foo: 123, bar: 456 }));  
// [ [ 'foo', 123 ], [ 'bar', 456 ] ]

```


#### 3.6.5 TypeScript 枚举类型
* 用某几个数值代表某种状态
* TypeScript中的大多数类型在编译后会移除，它们只是为了在编译过程中进行类型检查
* 枚举数值优点：
    - 给一组数值取更好的理解
    - 一组枚举数值只会存在几个固定的值，不会出现超出范围的可能性
* 枚举类型不指定值，默认会从 0 累加，如果给第一个成员指定了值，后面的成员就在第一个成员值的基础上累加
* 枚举类型会影响编译后的结果，编译后不会移除，最终会编译为双向键值对对象
    - 如果不想要这种，可以设置常量枚举
```
/**
 * 枚举类型
 */


// 确保和其他示例没有成员冲突
export {}


/**
 * 
 *  const post = {
        title: 'Hello TypeScript',
        content: 'TypeScirpt is a typed superset of JavaScript.',
        status: 2, // 0：草稿，1：未发布， 2：已经发布 
    }
 
 
 * 枚举数值优点：
        1、给一组数值取更好的理解
        2、一组枚举数值只会存在几个固定的值，不会出现超出范围的可能性
 * 枚举类型不指定值，默认会从 0 累加，如果给第一个成员指定了值，后面的成员就在第一个成员值的基础上累加
 */

// const PostStatus = {
//     Draft: 0,
//     Unpublished: 1,
//     Published: 2
// }


//  不设置值的情况下，值默认为 0，1，2；若第一个成员值设置为 6，对应的值是 6，7，8
const enum PostStatusEnum {
    Draft,
    Unpublished,
    Published
} 

const post = {
    title: 'Hello TypeScript',
    content: 'TypeScirpt is a typed superset of JavaScript.',
    // status: PostStatus.Draft
    status: PostStatusEnum.Draft
}


// 枚举会影响编译后的代码 ----------------------------------------------------
// PostStatusEnum[0] // => Draft
// // 常量枚举，在数字枚举关键字 enum 前面 添加 const 关键字，不会影响编译后结果，如：status: 0 /* Draft */
// const enum EnumConst {
//     Draft,
//     Unpublished,
//     Published
// }


// 枚举类型 分类 ------------------------------------------------

// // 常量枚举，在数字枚举关键字 enum 前面 添加 const 关键字
// const enum EnumConst {
//     Draft,
//     Unpublished,
//     Published
// }

// // 数字枚举（编译为双向键值对对象）
// enum EnumNum {
//     Draft = 6,
//     Unpublished,
//     Published
// } 


// // 字符串枚举（不常用）
// enum EnumString {
//     Draft = 'aaa',
//     Unpublished = 'bbb',
//     Published = 'ccc'
// } 


```



#### 3.6.6 TypeScript 函数类型
* 函数类型限制：对函数的输入输出进行类型限制，即限制参数类型和返回值类型
* JS 中有两种函数定义的方式：函数声明和函数表达式

```
/**
 * 函数类型
 */


// 确保和其他示例没有成员冲突
export {}

// 函数声明的类型限制 ------------------------------------------

// 方式一： 指定参数；如下设置，函数的实参和形参的个数和类型必须要相同
function func1(a: number, b: number): string {
    return 'function1';
}
func1(100, 200); 


// 方式二： 可选参数 
/**
 * b?: number，参数后面添加 ? 表示可传可不传,
 * 不传参数的情况下，也可以给参数设置默认值，这样不需要设置?
 
 * 可选参数或者是设置参数默认值，都必须要放在参数列表最后一位；因为参数时按照位置传递的，可选参数或者默认值放在必选参数前面或者，那么必选参数无法获取值
 *
 */
function func2(a: number, b: number = 123): string {
    console.log(a, b);
    return 'function2';
}
func2(100); // 形参个


// 方式二： 任意个数参数，使用 ES6 的...rest: number[]
/**
 * b?: number，参数后面添加 ? 表示可传可不传,
 * 不传参数的情况下，也可以给参数设置默认值，这样不需要设置?
 
 * 可选参数或者是设置参数默认值，都必须要放在参数列表最后一位；因为参数时按照位置传递的，可选参数或者默认值放在必选参数前面或者，那么必选参数无法获取值
 *
 */
function func3(a: number, b: number = 123, ...rest: number[]): string {
    console.log(a, b, rest);
    return 'function3';
}
func3(100, 200, 300, 400);  // 100 200 [ 300, 400 ]
func3(100, 200);  // 100 200 []
func3(100);   // 100 123 []





// 函数表达式的类型限制 ------------------------------------------

// 定义变量接收函数表达式，接收函数的变量也应该定义类型的
// 方式一：ts 自动识别变量 func4 的类型就是函数返回值类型 string，此时 func4 的类型可以省略
const func4 = function (a: number, b: number): string {
    return 'function4';
}

// 方式二：当函数作为参数传入时，例如 func6(func5())；需要给 func5 定义类型，如下所示
const func5: (a: number, b: number) => string = function (a: number, b: number): string {
    return 'function5';
}


```





#### 3.6.7 TypeScript 任意类型
* JS 是弱类型，JS 本身很多内置 API 有很多支持弱类型的东西，TS 是基于 JS的，故 ts 代码中也需要支持设置任意类型
* any 类型属于动态类型，ts 不会对 any 类型执行类型检查，any 类型是不安全的，不建议使用，兼容老代码

```
/**
 * 任意类型（弱类型）
 */


// 确保和其他示例没有成员冲突
export {}

function stringify (value: any) {
    // JSON.stringify()方法本身就可以接收任意类型的参数，故 value 必须是能够接收任意类型的参数
    return JSON.stringify(value);
}
stringify('bar');
stringify(123);
stringify(true);


// any 类型属于动态类型，ts 不会对 any 类型执行类型检查，any 类型是不安全的，不建议使用，兼容老代码
let foo: any = 'string';
foo = 100;
foo.bar(); // ts 不会对 any 类型执行类型检查，故此处不会在编译时报语法错误

```



#### 3.6.8 TypeScript 隐式类型推断
* 定义：如果没有明确通过类型注解标记变量类型，TS 会根据变量的使用情况推断变量类型
* 隐式类型推断的两种情况
    - 变量赋值后，即使没有标记类型注解，ts 也会根据值类型推断变量类型，故后面再对此变量重新赋值其他类型，ts 检查会报语法错误
    - 如果 ts 无法推断变量类型，会把此变量标记为 any
* 建议为每个变量添加明确的类型注解，利于后期维护

```
/**
 * 隐式类型推断
 */


// 确保和其他示例没有成员冲突
export {}


// 变量赋值后，即使没有标记类型注解，ts 也会根据值类型推断变量类型，故后面再对此变量重新赋值其他类型，ts 检查会报语法错误
let age = 18; 
age =  20;



// 如果 ts 无法推断变量类型，会把此变量标记为 any
let foo; 
foo =  20;
foo =  'study';
foo =  true;

```
 



#### 3.6.9 TypeScript 类型断言
* 某些情况下，TS 无法推断变量类型，开发人员可以根据代码使用情况明确知道变量类型
* 类型断言：明确告诉 TS，这个变量的类型
* 类型断言 & 类型转换的区别
    - 类型断言，没有转换变量的类型，只存在于代码编译过程中
    - 类型转换，转换变量的类型，存在于代码运行过程中
* TS 类型断言的两种方式
    - as number 即 as 类型名称
    - <number> 即 <类型名称>
        + 在使用 react的 JSX 语法时，<>会和JSX 语法的标签元素有冲突，JSX 不能使用，建议使用方式一

```
/**
 * 类型断言
 */


// 确保和其他示例没有成员冲突
export {}


// 假定 nums 来自于一个明确的接口
const nums = [110, 120, 119, 112];
const res = nums.find(i => i > 0);

// 由于 nums 没有类型注解，ts 推断 res = number | undefined，此时下面的表达式类型检测会报语法错误（必须明确是 number 类型才能执行）
// const s = res * res;

// 上面的问题可以进行类型断言（即明确告诉 TS，这个变量的类型），类型断言不是类型转换，并没有转换变量的类型，类型断言只存在于代码编译过程中，类型转换存在于代码运行过程中

// TS 类型断言的两种方式
// 方式一、as number 即 as 类型名称
const num1 = res as number;
// 方式二、<number> 即 <类型名称>，在使用 react的 JSX 语法时，<>会和JSX 语法的标签元素有冲突，JSX 不能使用，建议使用方式一
const num2 = <number>res;

```





### 3.7 TypeScript 接口
#### 基础介绍
* 抽象的概念，只约定对象的结构，不包含具体的实现，对象使用了一个接口，就必须要拥有这个接口所有的成员
* 一旦使用接口，必须遵守接口的所有约定
* ts 接口只是在编译时约定对象的结构，运行时没有实际意义

```
/**
 * 接口
 */


// 确保和其他示例没有成员冲突
export {}

// 可以使用逗号或分号分隔，标准语法使用分号分隔，也可以根据 js 语法省略分号
interface Post {
    title: string;
    content: string;
}

// 用接口来表现这种约束
function printPost(post: Post) {
    console.log(post.title);
    console.log(post.content);
}

printPost({
    title: 'Hello TypeScript',
    content: 'A javascript superset'
})

```

#### 接口补充
* 可选成员：对象中，某个成员是可有可无的 subtitle?: string
* 只读成员：对象中，不允许修改，readonly summary: string
* 动态成员，定义时无法知道有哪些成员，不能够指定具体成员名称，[key: string]: string，[属性名称: 属性名称类型]: 属性类型
    - 适用于动态成员的对象，例如缓存对象，在运行过程中会有动态成员变动

```
// 接口补充（可选成员、只读成员、动态成员） ----------------------------------------------------
// 可选成员：对象中，某个成员是可有可无的 subtitle?: string
// 只读成员：对象中，不允许修改，readonly summary: string
interface Post2 {
    title: string;
    content: string;
    subtitle?: string;
    readonly summary: string;
}
const hello: Post2 = {
    title: 'Hello TypeScript',
    content: 'A javascript superset',
    subtitle: 'hello subtitle',
    summary: 'JavaScript'
}
// hello.summary = 'TS'; // 只读成员不允许修改


// 适用于动态成员的对象，例如缓存对象，在运行过程中会有动态成员变动
// 动态成员，定义时无法知道有哪些成员，不能够指定具体成员名称，[key: string]: string，[属性名称: 属性名称类型]: 属性类型
interface Cache {
    [key: string]: string;
}

const cache: Cache = {};
cache.foo = '123';
cache.bar = 'value1';

```



### 3.8 TypeScript 类（Class）
#### class 的基本使用
* 类：用来描述一类具体对象的抽象成员
* ES6 之前，函数 + 原型 模拟实现类
* ES6 之后，JS 有了专门的 class
* TS 增强了class 的相关语法

```
/**
 * 类（Class）的基本使用
 */


// 确保和其他示例没有成员冲突
export {}


// 类的属性，必须要赋初始值或者是在构造函数中赋值
class Person {
    // 在类中直接定义属性，ES2016 提出的
    // 类的属性，必须要赋初始值或者是在构造函数中赋值
    name: string // name: string = 'init name'，可以直接赋值， 一般会在构造函数里面赋值
    age: number
    
    constructor (name: string, age: number) {
        // 类中没有定义 name 时，this.name 会报错
        this.name = name;
        this.age = age;
    }
    sayHi (msg: string):void {
        console.log(`I am ${this.name}, ${msg}`);
    }
}

```


#### class 的访问修饰符
* 控制类成员的可访问级别
* public：公有成员
    - class 中的成员默认就是公有成员，有没有 public 关键字都可以，加上 public代码更好理解；
    - 都可以访问，无访问权限

* private：私有成员
    - 只能在当前Person类内部访问，继承类和实例化对象都不可以访问 

* protected：受保护的成员
    - 只能在当前类 Person 或继承类的内部访问，实例化对象不可以访问;
    - 只能在自身属性和子类中访问

* 对于 constructor，默认是 public；
    - 如果是 private，只能内部调用这个构造函数即 new Stand(name, age)；外部不可以继承或实例化该类
    - 如果是 protected，外部不可以实例化该类，但是可以继承该类
```
/**
 * 类（Class）的访问修饰符
 */


// 确保和其他示例没有成员冲突
export {}



class Person {
    // public：公有成员，class 中的成员默认就是公有成员，有没有 public 关键字都可以，加上 public代码更好理解
    // name: string 
    public name: string 
    // private：私有成员，只能在当前Person类内部访问，继承类和实例化的对象里都不可以访问 
    private age: number

    // protected：受保护的成员，只能在当前类Person或继承类的内部访问，实例化的对象里都不可以访问
    protected gender: boolean
    
    constructor (name: string, age: number) {
        this.name = name;
        this.age = age;
        this.gender = true;
    }
    sayHi (msg: string):void {
        console.log(`I am ${this.name}, ${msg}`);
        console.log(this.age, this.gender);
    }
}


const tom = new Person('tom', 18);

// 报错，age 为 Person类的私有属性，外部不能访问
// console.log(tom.age); 

// 报错，gender 为 Person类的 protected属性，继承类可以访问，实例化对象的不能访问
// console.log(tom.gender);

class Student extends Person {
    constructor(name: string, age: number) {
        super(name, age);
        // age是 Person 类的私有属性，只能 Person 类内部访问，继承类内部也不能访问
        // console.log(this.age);
        console.log(this.gender);
        console.log(this.sayHi('123'));
    }
}
const jack = new Student('jack', 23);
console.log(jack.name);
// 报错，age 为 Person类的私有属性，外部不能访问
// console.log(jack.age);
// 报错，gender 为 Person类的 protected属性，继承类可以访问，实例化对象的不能访问
// console.log(jack.gender);


class Stand extends Person {
    // 构造函数默认是 public，如果设置成 private，外部就不可以继承 Stand 类，也不可以实例化 Stand 类
    private constructor(name: string, age: number) {
        super(name, age);
        console.log(this.gender);
        console.log(this.sayHi('123'));
    }
    
    // 构造函数如果设置成 protected，外部不可以实例化 Stand 类，但是可以继承 Stand 类
    // protected constructor(name: string, age: number) {
    //     super(name, age);
    //     console.log(this.gender);
    //     console.log(this.sayHi('123'));
    // }

    // 对于 private constructor，可以创建一个static方法，返回这个Stand 类的实例化对象
    static create(name: string, age: number) {
        // new 方式创建 Stand 类的实例，new 方式相当于调用了这个类中构造函数的实例
        // 构造函数是私有的，此处属于 Stand 类内部，可以调用其构造函数
        return new Stand(name, age);
    }
}
// 外部可以使用 create 静态方法创建 Stand 类，通过 Stand 类本身调用静态方法
const kate = Stand.create('kate', 25);
console.log(kate.name);

```


#### class 的只读属性
* readonly只读属性，如果该属性已经有了访问修饰符，readonly 要放在访问修饰符后面，
* 对于只读属性，只能在声明时初始化或者是构造函数中初始化，两者只能二选一；初始化之后，不管在哪里都不允许被修改
```
/**
 * 类的只读属性
 */


// 确保和其他示例没有成员冲突
export {}



class Person {
    name: string 
    age: number
    // readonly只读属性，如果该属性已经有了访问修饰符，readonly 要放在访问修饰符后面，
    // 对于只读属性，只能在声明时初始化或者是构造函数中初始化，两者只能二选一；初始化之后，不管在哪里都不允许被修改
    protected readonly gender: boolean
    
    constructor (name: string, age: number) {
        // 类中没有定义 name 时，this.name 会报错
        this.name = name;
        this.age = age;
        this.gender = true; 
    }
    sayHi (msg: string):void {
        console.log(`I am ${this.name}, ${msg}`);
    }
}

const tom = new Person('tom', 18);

console.log(tom.name); 
tom.name = 'kate';
// 报错，gender 是 readonly 属性，不能被修改
// tom.gender = false; 


```

### 3.9 TypeScript 类与接口
* interface 定义接口
    - 接口内部只约定对象的结构，不包含具体的实现
    - 不是每个类都同时需要一个接口内部有多个成员，故尽量每个接口定义一个成员，多个成员定义多个接口，这样每个类可以实现多个接口，提高接口的复用性
* implements 关键字实现接口
    - 一旦实现了接口，类内部必须要有接口的成员
    - 每个类可以同时实现多个接口

```
/**
 * 类与接口
 */


// 确保和其他示例没有成员冲突
export {}


// 不同的类实现了相同的方法，方法内部不同

// interface 定义接口，接口内部只约定对象的结构，不包含具体的实现
interface EatAndRun {
    eat (food: string): void
    run (distance: number): void
}

// 并不是每个类都同时需要多个成员，故尽量每个接口定义一个成员，这样每个类可以实现多个接口，提高接口的复用性
interface Drink {
    drink (water: string): void
}

// 使用 implements 关键字实现接口，一旦实现了接口，类内部必须要有接口的成员；每个类可以同时实现多个接口
class Person implements EatAndRun, Drink {
    eat (food: string): void {
        console.log(`优雅的进餐：${food}`);
    }

    run (distance: number): void {
        console.log(`直立行走：${distance}`);
    }

    drink (water: string): void {
        console.log(`安静的喝水：${water}`);
    }
    
}

class Animal implements EatAndRun, Drink {
    eat (food: string): void {
        console.log(` 呼噜呼噜的吃：${food}`);
    }

    run (distance: number): void {
        console.log(`爬行：${distance}`);
    }
    
    drink (water: string): void {
        console.log(`咕嘟咕嘟的喝水：${water}`);
    }
}


```





### 3.10 TypeScript 抽象类
* 
* 与接口的区别：
    - 抽象类中可以包含具体的实现，大的类目建议使用抽象类，例如动物、蔬菜、水果等
    - 接口不包含具体的实现
* 抽象类：约束子类中必须有某个成员，且包含具体的实现
    - class 前面添加关键字 abstract
    - 抽象类只能被继承，不能被 new 实例化创建对象
    - 抽象方法，不需要方法体（即方法内容），若子类继承了这个抽象类，就必须实现它的抽象方法

```
/**
 * 抽象类
 */


// 确保和其他示例没有成员冲突
export {}


// 这是一个普通类
class Animal1 {
    eat (food: string): void {
        console.log(` 呼噜呼噜的吃：${food}`);
    }
}

// 这是一个抽象类，只能被继承，不能被实例化
abstract class Animal2 {
    eat (food: string): void {
        console.log(` 呼噜呼噜的吃：${food}`);
    }
    // 抽象方法，不需要方法体（即方法内容），子类继承了这个抽象类，就必须实现它的抽象方法
    abstract run (distance: number): void
}

// 抽象类 Animal2 只能被继承，不能被 new 实例化创建对象
// const cat = new Animal2();

class Dog extends Animal2 {
    run(distance: number): void {
        console.log(`爬行：${distance}`);
        throw new Error("Method not implemented.");
    }
}
// Dog 类实例化对象后，会有父类的方法和自身拥有的方法 
const d = new Dog();
d.eat('草');
d.run(300)

```



### 3.11 TypeScript 泛型
* 定义时不指定类型，在使用时指定具体类型的特征
* 声明函数是不定义具体类型，调用时传入具体类型，可以极大程度复用代码
* 泛型参数：定义时不能够明确的类型变成参数，调用时，使用尖括号的形式传入类型参数
    - 定义泛型参数 T，不明确的类型都用 T 表示
    - 调用时，使用尖括号的形式传入类型参数

```
/**
 * 泛型
 */


// 确保和其他示例没有成员冲突
export {}



/**
 * 
 * Array(length).fill(value)，传入指定长度，形成数组并填充数组
   Array 默认创建的是 any[] 类型的数组，故需要对 Array 进行类型断言，创建 number[] 类型数组
   
   TS 中定义 Array 的时候，并不知道使用者需要它存放什么类型的数组，故定义了 any[] 类型，此时就需要使用者在使用的时候进行类型断言
   var Array: ArrayConstructor(arrayLength?: number | undefined) => any[] (+2 overloads)

 
 */

// 创建一个 number 数组
function createNumberArray(length: number, value: number): number[] {
    // Array(length).fill(value)，传入指定长度，形成数组并填充数组
    const arr = Array<number>(length).fill(value);
    // 此时得到的是一个明确了 number 类型的数组
    return arr;
}

createNumberArray(3, 100); // [100, 100, 100]


// 创建一个 string 数组
function createStringArray(length: number, value: string): string[] {
    const arr = Array<string>(length).fill(value);
    return arr;
}

/**
 * 希望能够创建 string 或其他类型的数组
 * 泛型参数：定义时不能够明确的类型变成参数，调用时，使用尖括号的形式传入类型参数
    定义泛型参数 T，不明确的类型都用 T 表示
    调用时，使用尖括号的形式传入类型参数 T
 *
 */

function createArray<T>(length: number, value: T): T[] {
    const arr = Array<T>(length).fill(value);
    return arr;
}
// 调用时，使用尖括号的形式传入类型参数 T
createArray<string>(3, 'foo');

```




### 3.12 TypeScript 类型声明
* 第三方 npm 模块，可能有的模块不是 ts 编写的，那么这个模块就没有提供强类型
* 类型声明: 成员在定义时未声明类型，使用时为此函数声明
    - 为了兼容一些普通的（不提供强类型） JS 模块

* 声明方式，使用 declare 关键字：
    - declare function camelCase (input: string): string

* TS 社区强大，绝大多数常用的 npm 模块都提供了对应的类型声明模块
    - 模块内置了类型声明文件，不需要安装对应类型声明模块时，直接安装，引入就会有类型声明的介绍
        + yarn add query-string --s , 解析 url 中 querystring 字符串
        + import qs from 'query-string'
    - 对于内部没有继承类型声明文件的模块，需要安装对应的类型声明模块，如 @types/lodash => @types/模块名称；（安装后，对应文件夹中的.d.ts文件就是 ts 中专门用来的类型声明的文件）
    
```
/**
 * 类型声明
 */


/**
 * 类型声明为了兼容一些普通的（不提供强类型） JS 模块
 * 类型声明: 成员在定义时未声明类型，使用时为此函数声明
 * 没有内置的类型声明文件且没有安装 lodash 对应的类型声明模块时，使用 declare 关键字声明类型
 * 
 * 类型声明模块：
    1、模块内置了类型声明文件，不需要安装对应类型声明模块时，直接安装，引入就会有类型声明的介绍
        yarn add query-string --s 
        import qs from 'query-string'
    2、对于内部没有继承类型声明文件的模块，需要安装对应的类型声明模块，如 @types/lodash => @types/模块名称；（安装后，对应文件夹中的.d.ts文件就是 ts 中专门用来的类型声明的文件）
 * 
 */

// yarn 安装 lodash 模块，并引入 camelCase 成员
import { camelCase } from 'lodash'
//  没有安装 lodash 对应的类型声明模块时，使用 declare 关键字声明类型
// declare function camelCase (input: string): string

// camelCase: 把字符串转换为驼峰写法
const res = camelCase('hello typed');
console.log(res);

// query-string 模块 解析 url 中 querystring 字符串
// query-string模块已经在内部集成了类型声明文件，直接导入就有类型声明的介绍
import qs from 'query-string';
qs.parse('?key=value&key2=value2');


// 确保和其他示例没有成员冲突 
export {}

```

