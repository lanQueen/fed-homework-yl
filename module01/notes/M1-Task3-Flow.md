# Module1 - Task2 - Flow 详解




## 二、Flow 详解 https://flow.org/en/docs
### 2.1 Flow 概述

* JavaSript 的类型检查器，2014 年由 Facebook提出的
* 工作原理：在编写代码过程中，通过添加代码注解来标记变量或参数的类型，Flow 根据这些注解检查代码中类型使用的异常，从而实现在开发阶段对类型的检查
* 类型注解： a: number，表示 a 必须接收 number 类型的值
* Flow 类型注解特点
    - 可以在运行之前使用 babel 或 Flow 官方提供的模块将注解自动去除，这些注解不会产生任何影响
    - Flow 并不要求给每个变量都提供注解，可以根据自己的需要，哪里需要就给哪里注解
```
// 类型注解
function sum (a: number, b: number) {
    return  a + b;
}

```


### 2.2 Flow 快速上手
* 使用方法：
    - 使用 flow init 创建 .flowconfig命令
    - 安装：yarn add flow-bin --dev
    - 在代码中使用类型注解的前提，必须在当前文件最开始的位置，用「// @flow 」标记这个文件，这样，flow 才会对当前文件进行检查
    - 在代码中，给要使用 flow 检查的变量添加类型注解，即 a: number
    - 执行 yarn flow 命令，就会进行 flow 检查

```
// @flow
function sum (a: number, b: number) {
    return a + b;
}
sum(100, 100);
sum('100', '100');

```


### 2.3 Flow 编译移除注解
* 类型注解并不是 JavaScript 的标准语法，添加了类型注解会造成 js 代码无法直接运行
* 类型注解只是在编码时帮我们找出类型问题，实际运行环境中没有必要；使用工具在完成编码后自动移除注解
* 移除注解的两种主流方案：
    - 使用 flow 官方提供的 flow-remove-types 模块自动移除
        + 安装：yarn add flow-remove-types --dev
        + 使用：yarn flow-remove-types src -d dist，src是原代码所在目录，dist是输出目录
    - 使用 babel 移除
        + 安装：yarn add @babel/core @babel/cli @babel/preset-flow --dev
        + 在文件根目录下新建.babelrc文件，即 /flow/.babelrc，
        ```
            {
                "presets": ["@babel/preset-flow"]
            }
       ```
       + 使用：yarn babel src -d dist，src是原代码所在目录，dist是输出目录





### 2.4 Flow 开发工具插件
* 前面介绍的注解/移除注解都是在控制台操作的，类型问题都是输出在控制台，对于开发来说并不方便
* 更方便的做法是在开发工具中直接显示出类型使用的问题
    - 安装一个开发工具的小插件: vscode 安装 Flow Language Support
    - 安装完成后，每次修改完代码，保存后，flow 插件便会检测



### 2.5 Flow 类型推断
* Flow 类型注解：标记代码中的类型，
* Flow 类型推断：根据代码调用情况推断变量/参数类型
* 绝大多数情况建议添加类型注解，加强代码的可读性


### 2.6 Flow 类型注解
* Flow 类型注解：标记代码中的类型
* 添加类型注解可以更明确地限制类型，利于维护；建议使用类型注解

```
/**
 * 类型注解
 * @flow
 */
// 类型注解方式 ------------------------------------

// 标记变量 
let num: number = 100;
// num = 'str';  // 提示错误


// 标记函数参数
function square(n: number) {
    return n * n;
}
// square('100');  // 提示错误


// 标记函数返回值，如果函数没有返回值，这样标记也会提示错误
function foo1():number {
    // return '100';  // 提示错误
    // 在 js 中函数没有返回值默认是返回 undefined
    return 100;
}

// 对于没有返回值的函数，将他的返回值类型标记为 void
function foo2():void {
    // 返回值类型标记为 void, 说明该函数没有返回值，此时有返回值会提示错误
    // return 100;
}

```




### 2.7 Flow 类型介绍
#### 2.7.1 原始类型
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
 * 原始类型
 * @flow
 */

// 目前 js 中原始数据类型：string number(NaN，Infinity 也是 number 类型) boolean null undefined symbol ，未来还会出现 bigInt，是指安全存储、操作大整数

const a: string = 'foobar';

// 在 js 中，NaN/NaN，Infinity(无穷大) 都属于 number 类型
const b: number = NaN;  // 200，Infinity

const c: boolean = true;  

const d: null = null;  

// 在 flow 中，undefined 的类型要用 void 表示
const e: void = undefined; 

const f: symbol = Symbol();  

```



#### 2.7.2 数组类型

```
/**
 * 数组类型
 * @flow
 */

// flow 中限制数组类型

// 方式一：:Array<number>，使用 Array 方式，需要泛型参数，表示数组内元素的类型，用 <number> 表示
const arr1: Array<number> = [1, 2, 3];  // 数组内元素用其他类型，会提示语法错误


// 方式二：:类型[]
const arr2: number[] = [1, 2, 3];  // 数组内元素用其他类型，会提示语法错误
 

// 方式三：固定长度数组即元组；当一个函数内返回多个元素时，可以用元组的类型注解
const foo: [string, number, boolean, null, void, symbol, Array<number>, Object]  = ['bar', 123, true, null, undefined, Symbol(), [1], {name: '123'}];


```

#### 2.7.3 对象类型

```
/**
 * 对象类型
 * @flow
 */

// flow 中描述对象类型变量和对象字面量语法类似，支持两种方式表示数组类型

// 方式一：当前对象必须只有 foo 和 bar 属性，且对应类型是 string 和 number
const obj1: {foo: string, bar: number} = {foo: '123', bar: 123};  


// 方式二：属性名称后面添加 ? 表示该属性可有可无
const obj2: {foo?: string, bar: number} = {bar: 123};
 

// 方式三：{[string]: string}，表示对象内可以添加任意个数的键值对，但是键名和键值都必须是 string
const obj3: {[string]: string} = {};
obj3.key1 = '123';
obj3.key2 = '100';
obj3.key3 = 'true';

const obj4: {[number]: string} = {
    [123]: 'str',
    [123]: ''
};
// const obj5 = {};  // 直接 obj={}，表示对象属性可以是任意类型

```

#### 2.7.4 函数类型

```
/**
 * 函数类型
 * @flow
 */

// flow 中对于函数类型限制，一般包括参数类型和返回值类型

// 方式一：当函数参数时值时，限制参数类型，在参数后面标记类型
function sum(num: number) {
    return num * num;
}

// 方式三：当函数参数是回调函数时，需要限制这个回调函数的参数和返回值
// 此处限制这个回调函数必须要有两个参数为 string 和 number 类型，且返回值是 void
function foo(callback: (string, number) => void) {
    callback('string', 100);
}
// 上式代码调用的时候
foo((str: string, num: number):void => {
    console.log(str, num);
});

// 方式二：返回值类型，有返回值，在括号后面标记类型
function sum(num: number):number {
    return num * num;
}
// 无返回值，在括号后面标记 void
function sum(num: number):void {
    // js中，函数无返回值，默认返回 undefined
    // return undefined;
}

```

#### 2.7.5 特殊类型

```
/**
 * 特殊类型
 * @flow
 */

// flow 中特殊类型


// 字面量类型一般不会单独使用，配合联合类型的用法，组合几个特定的值
// 一、字面量类型： a: 'foo' 表示a 是个字符串，且 a 的值只能是 foo，如果是其他任何值或者重新赋值都会报错
const a: 'foo' = 'foo';  
// 如果变量的值类型可能是多种，则用 | 连接
const aa: string | number = 123;
// 如果变量是任意类型，则用 any 表示
const aaa: any = { [123]: 123 };

// 下面表达式表示变量的值必须是它限制的几种，否则会报错
const type: 'success' | 'warning' | 'danger' = 'danger';
const c: true | '123' = '123';  
const d: null | void = undefined;


// 二、通过 type 关键词，设置一个变量 StringOrNumberOrBoolean 限制变量类型，可以多个变量共同使用
type StringOrNumberOrBoolean = string | number | boolean;
const g: StringOrNumberOrBoolean = true;
const h: StringOrNumberOrBoolean = 'bar';



// 三、maybe 类型，再具体类型及基础上扩展了 null 和 undefined，下面表达式中，?前面是空，表示可能是 null 或者 undefined；且问号前面只能代表 null 或 undefined，其他的都会报错
const j: ?number = undefined;
const k: ?number = null;
const l: ?number = 123;
// maybe 类型用法相当于 number | null | void
const m: number | null | void = 123;
 
console.log(a, aa, aaa, c, d, g, h, j, k, l, m);
// foo 123 { '123': 123 } 123 undefined true bar undefined null 123 123

```


#### 2.7.6 Mixed 与 Any
* Mixed
    - 可以接收任意类型，为强类型
    - 强类型，不会根据函数内部的表达式进行隐式转换
* Any
    - 可以接收任意类型
    - 弱类型，会根据函数内部表达式的需要对参数类型进行隐式转换，为了兼容老的代码
    
```
/**
 * Mixed 与 Any
 * @flow
 */



// Mixed -----------------------------------------


// 如果函数内部没有明确 value 的类型，不能把它当某个特定的类型对应使用
function passMixed(value: mixed) {
    // 没有明确参数类型，此表达式吧参数当做 number 使用，会报语法错误
    // const val = value * value;
    console.log('任意类型 Mixed ====》',value);
}
passMixed('str'); 
passMixed(123);


// 函数内部添加类型判断
function passMixedSure(value: mixed) {
    // 判断参数类型后，再执行对应表达式，不会报语法错误
    if (typeof value === 'number') {
        const val = value * value;
        console.log('明确任意类型 Mixed ====》', val);
        return;
    }
    console.log('参数不是 number 类型');
}
passMixed('sure---str');
passMixed(123);



// Any： -----------------------------------------

// 函数内部不需要对参数进行类型判断，就可以做任何操作，但是如果参数是数字，执行 字符串的操作时，在运行阶段会报错
function passAny(value: any) {
    value.substr(1);
    value * value
    console.log('任意类型 Any ====》',value);
}
passAny('str');
passAny(123);

```

#### 2.7.7 类型小结
* 主要用于研读 vue/react源码，会遇到使用 flow 的情况
* Flow 官网类型描述 https://flow.org/en/docs/types
* 第三方类型手册 https://www.saltycrane.com/cheat-sheets/flow-type/latest
* 添加了类型注解的文件, 必须移除注解才能正常运行




### 2.8 Flow 运行环境 API
* 运行环境 API 对应的声明文件
    - JavaScript 标准库： https://github.com/facebook/flow//blob/master/lib/core.js
    - https://github.com/facebook/flow//blob/master/lib/dom.js
    - https://github.com/facebook/flow//blob/master/lib/bom.js
    - https://github.com/facebook/flow//blob/master/lib/cssom.js
    - https://github.com/facebook/flow//blob/master/lib/node.js

```
/**
 * 运行环境 API
 * @flow
 */
 
// 浏览器环境内置 API 对应的类型限制：DOM API 提示下面代码应该传入一个字符串，如果传入其他类型就会报错
// document.getElementById()有可能返回一个 html 元素，也有可能返回 null，HTMLElement就属于运行环境内置 API 所做的类型限制
const element: HTMLElement | null = document.getElementById('id-1');

```






