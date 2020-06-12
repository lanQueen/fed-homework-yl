# Part2 - Module1 - Task3 - 自动化构建


## 1、自动化构建简介
### 1.1 一切重复工作都应自动化
* 自动化：通过机器代替手工，完成一些工作
* 构建：转换，把一个东西转换成另外一个东西

### 1.2 自动化工作流 
* 把开发阶段写出来的源代码，自动化的转换成生产环境中可以运行的代码，这个过程叫做自动化工作流

* 作用：脱离运行环境兼容带来的问题，使用一些提高效率的语法、规范和标准
    - ECMAScript Next、Sass、模板引擎等大多，浏览器都不能直接支持
    - 使用自动化构建，就是构建转换那些不被支持的「特性」，转换成能够运行的代码



## 2、自动化构建初体验
### 2.1 代码中使用 Sass，需要将 sass 转换成 css
* 安装 yarn add sass --dev
    - 安装完成后，node_modules/.bin/ 目录下有一个 sass 命令文件

* ./node_modules/.bin/sass，执行完会打印出帮助信息
    - 需要指定 sass 输入路径和将 sass 转换成 css 的输出路径

* ./node_modules/.bin/sass scss/main.scss css/style.css 
    - scss/main.scss 为 sass 输入路径
    - css/style.css 为 css 输出路径
    - 将 sass 转换成 css 文件，并添加了 sourceMap 文件
    - 这样操作每次命令行执行的东西太多了，且不利于维护


### 2.2 使用 NPM Scripts 解决开发阶段重复执行的命令
#### NPM Scripts 是实现自动化构建工作流的最简方式
* package.json中添加 scripts 字段，是一个对象
    - 键名是 scripts 的名称，键值是需要执行的命令
    - scripts 可以自动发现 node_modules 的命令
    
    ```
        "scripts": {
          "build": "sass scss/main.scss css/style.css"
        }
    ```

* 使用 npm run build 或 yarn build 命令运行


### 2.3 使用 NPM Scripts 实现自动化构建
* yarn add browser-sync --dev
    - 安装 browser-sync 模块，用于启动测试服务器，运行项目
* 在 package.json 中添加 serve 命令，

* yarn serve  运行当前目录
    - browser 会自动启动web 服务器，运行当前网页

#### 启动 Web 服务之前自动构建 Sass

* 使用 NPM Scripts 的钩子机制定义 preserve，直接执行 yarn serve，就可以 在 serve 命令之前先执行 build 
    - 如果在 serve 工作之前，没有生成样式文件，此时 serve 工作的时候页面没有样式文件，需要在启动 yarn serve 命令前让 build 命令工作
    - 设置了 preserve，可以 serve 的时候先执行 build，构建出样式文件，然后在执行 yarn serve
    
    ```
        "scripts": {
            "build": "sass scss/main.scss css/style.css",
            "preserve": "yarn build",
            "serve": "browser-sync ."
        }
    ```

* --watch 监听 sass 文件变化，自动编译
    - "build": "sass scss/main.scss css/style.css --watch",
    - 只添加 --watch 参数，命令行执行 yarn serve，sass 命令工作时，命令行会阻塞等待 sass 文件的变化，导致后面的 serve 无法工作

* yarn add npm-run-all --dev
    - 安装 npm-run-all 模块，使同时执行多个任务

* scripts 内添加 "start": "run-p build serve"
    - 使用 npm-run-all 模块中 run-p 命令同时执行 build 和 serve 命令
    - 此时，preserve 命令就不需要了

* yarn start 
    - 此时 build 和 serve 同时执行
    - 运行后，修改 sass 文件，css 文件也会变化
    
    ```
        "scripts": {
            "build": "sass scss/main.scss css/style.css --watch",
            "serve": "browser-sync .",
            "start": "run-p build serve"
        }
    ```

* "serve": "browser-sync . --files \"css/*.css\"",
    - 给 serve 的 browser-sync 添加 --files 参数，让 browser-sync 启动后监听 css 文件变化，自动更新页面
    - "serve": "browser-sync . --files 'css/*.css'",

    ```
        "scripts": {
            "build": "sass scss/main.scss css/style.css --watch",
            "serve": "browser-sync . --files 'css/*.css'",
            "start": "run-p build serve"
        }
    ```
    
    

## 3、常用的自动化构建工具
* 介绍常用的自动化构建工具（严格来说 webpack 是模块打包工具，不属于自动化构建工具）

### 3.1 Grunt
* 优点：
    - 最早的前端构建系统
    - 它的插件生态完整，几乎可以自动化完成任何想做的操作
缺点：
    - 构建过程基于临时文件实现，构建速度相对较慢
        + 例如：完成 sass 文件的构建，需要 先编译 =》再自动添加私有属性前缀 =》最后压缩代码，Grunt每一步都有磁盘读写操作；文件编译后会将结果写入到临时文件，下一个插件读取临时文件进行下一步，处理的环节越多，文件读写次数越多；项目越大，文件越多，读写次数越多，速度就越慢

### 3.2 Gulp
* 目前市面上最流行的前端构建系统
* 优点：
    - 解决了 Grunt 构建速度慢的问题
        + 基于内存实现，对文件的处理环境都是在内存中完成的
        + 默认支持同时执行多个任务，提高效率
        + 使用方式更加直观易懂，插件生态完善


### 3.3 FIS
* 百度前端团队推出的构建系统
* 相对于前两个构建系统微内核的特点，FIS 像是捆绑套餐，把需求集成在内部


### 3.4 构建工具小结
* 初学者适合 FIS 
* 要求灵活多变适合 Grunt、Gulp 






## 4、Grunt

### 4.1 Grunt 的基本使用
#### 准备工作
    - mkdir grunt-sample
    - cd grunt-sample
    - yarn init --yes 
#### 安装使用
* yarn add grunt
* code gruntfile.js 根目录下添加 gruntfile.js 文件
* 编写 gruntfile.js 文件
* 运行 yarn grunt foo，控制台打印出 hello grunt
    - yarn 会自动找到 node_modules 下的命令
    - foo 是注册的任务名称，grunt 自动执行 foo 任务
* yarn grunt --help 查看 grunt 帮助信息

```
/* Grunt 入口文件
 * 用于定义一些需要 Grunt 自动执行的任务
 *  需要导出一个函数
 *      此函数接收一个 grunt 的形参，内部提供一个创建任务时可以用到的 API
 *   1、简单使用
 *      grunt.registerTask(): 注册任务，可以注册多个任务，两个参数
 *          参数一：foo, 指定任务名称
 *              
 *          参数二：回调，指定任务函数，当任务发生时自动执行的函数
 *              如果该任务有任务描述（是个字符串，出现在该任务帮助信息中），则放在参数二的位置，参数三是任务回调  yarn grunt --help 查看
 *              如果该任务没有任务描述，那么该任务的任务描述默认是 Custom task.
 * 
 *   2、默认任务
 *       如果参数一任务名称是 default，此任务就是 grunt 的默认任务，运行时不需要指定任务名称 yarn grunt，grunt 会自动调用执行默认任务
 *           一般会用 default 映射其他任务，此时不需要传入回调函数
 *               grunt.registerTask('default', '默认任务描述',['foo', 'bar'])
 *               接收一个数组，依次传入其他任务的名称，执行 yarn grunt 会依次执行 grunt 的任务
 *   3、异步任务
 *      直接使用定时器模拟异步任务，console.log 不会执行
 *      grunt 默认支持同步模式，异步操作时要 const done = this.async() 得到回调函数done，必须在异步任务的代码执行完成后执行 done()（注册任务传入的回调函数不能是箭头函数，因为箭头函数没有 this），这样 grunt 才知道这是个异步任务，会等待 done 的执行，done 执行后 grunt 才会结束任务的执行
 */ 

module.exports = grunt => {
    // 注册任务
    grunt.registerTask('foo', () => {
        console.log('hello grunt, 我是 foo 任务');
    });
    grunt.registerTask('bar', '我是任务描述', () => {
        console.log('other task，我是 bar 任务');
    });

    // 默认任务 ====================================================

    // grunt.registerTask('default', () => {
    //     console.log('我是 grunt 的默认任务');
    // }),
    // 用 default 映射其他任务
    // grunt.registerTask('default', '默认任务描述',['foo', 'bar']);
    

    // 异步任务 ====================================================

    // // 直接使用定时器模拟，不会执行异步操作的代码
    // grunt.registerTask('async-task', "我是异步任务", () => {
    //     setTimeout(() => {
    //         console.log('async task working~');
    //     }, 1000);
    // });
    // // 这样直接 this.async()，也是无法执行异步操作的代码
    // grunt.registerTask('async', "异步任务测试", function () {
    //     setTimeout(function () {
    //         console.log('async 测试');
    //         this.async();
    //     }, 1000);
    // });

    // 赋值调用 this.async()，grunt 才知道这是个异步任务，会等待 done 的执行，done 执行后 grunt 才会结束任务的执行
    grunt.registerTask('async-task-execute', "异步任务执行", function () {
        const done = this.async();
        setTimeout(() => {
            console.log('async task real work~');
            done();
        }, 1000);
    })
}


```



### 4.2 Grunt 标记任务失败
* 构建任务失败时，可以标记这个任务为失败任务
* 同步任务
    - 在回调函数中执行 return false;
* 异步任务：
    - 在回调函数的 done 方法传入 false 可以标记失败任务，即 done(false);
#### 在任务列表中，某个任务失败会导致后面的任务都无法执行
 * yarn grunt --force 命令
    - 可以使任务列表中即使有任务失败也会继续强制执行后面的任务



### 4.3 Grunt 的配置方法
* grunt.initconfig(): 添加配置选项
    - 参数：接收一个对象
    - foo: 对象的属性名是任务名称
    - bar: 属性值是任意类型的数据
* 在注册任务的回调中通过 grunt.config('foo) 获取配置中键值
* 在控制台执行对应任务，可以获取配置选项的键值

```
/* 
 * grunt.initConfig(): 添加配置选项
 *      参数：接收一个对象
 *          foo: 对象的属性名是任务名称
 *          bar: 属性值是任意类型的数据
 *      在注册任务的回调中通过 grunt.config('foo) 获取配置中键值
 *      在控制台执行对应任务，可以获取配置选项的键值
 */

module.exports = grunt => {
    grunt.initConfig({
        foo: 'bar',
        baz: {
            bar: 123
        }
    });
    grunt.registerTask('foo', () => {
        const value = grunt.config('foo');
        console.log(value);
    });
    grunt.registerTask('baz', () => {
        const value = grunt.config('baz.bar');
        console.log(value);
    })
}

```



### 4.4 Grunt 多目标任务
* 多目标任务可以让任务根据配置形成多个子任务，用于压缩代码
* grunt.registerMultiTask(taskName, callback): 注册多目标任务

```
/* 
 * Grunt 多目标任务：可以让任务根据配置形成多个子任务
 *  grunt.registerMultiTask(taskName, callback): 注册多目标任务  
 *      在 callback 中，可以通过 
 *          this.target 获取当前执行的目标
 *          this.data 获取当前执行目标对应的数据
 
 *  grunt.initConfig(): 配置多目标任务的目标  
 *      此时多目标任务名称是个对象，taskName: {}
 *      任务对象中除了 options 属性之外，其他的属性都是任务目标；options 的值必须是一个对象
 *          options 的配置信息作为当前任务的配置选项出现，在 registerMultiTask 的 callback 中用 this.options()执行，获取配置选项信息
 *      也可以在目标中配置 options 选项，属性名称和任务下的 options 选项相同时，会覆盖
 * 
 
 *  yarn grunt build： 同时运行 css 和 js 两个目标，相当于一两个子任务的形式运行
 
 *  yarn grunt build:css  运行 build 任务中的某个子目标
 * 
 */

module.exports = grunt => {
    // 配置 build 任务的目标名称
    grunt.initConfig({
        build: {
            options: {
                foo: 'bar',
                suceess: false
            },
            // build 下的目标
            css: {
                // 在单个目标中也可以设置 options 选项，如果 options 中出现和任务中的 options 选项的属性名一样，则会覆盖任务下的 options
                options: {
                   foo: '我是 css 目标的配置选项',
                   info: 'css 目标的其他配置选项'
                },
                value: 'css 目标的数据'
            },
            js: 'js 目标的数据'
        }
    })
    // 注册多目标任务
    grunt.registerMultiTask('build', function () {
        console.log(this.options());
        console.log(`target: ${this.target}, data: ${this.data}`);
    })
}

```



### 4.5 Grunt 插件的使用
* 插件是 grunt 的核心

#### 使用插件构建任务
* 安装插件yarn add grunt-contrib-clean
    - 用来清除在开发过程中产生的文件
* 加载插件：grunt.loadNpmTasks('grunt-contrib-clean');
* 给插件配置任务目标   
    - 有些插件多目标任务，需要配置任务目标     
    
* 运行： yarn grunt clean 
    - 绝大多数情况下，grunt 插件的命名规范都是 grunt-contrib-任务名称
    - clean 任务是一个多目标任务，需要配置任务目标
    - 设置了 clean 的任务目标后，再执行 clean 任务，就会执行任务目标

```
/* 
    Grunt 使用插件、
 *  yarn add grunt-contrib-clean 
        用来清除在开发过程中产生的文件
    
    加载插件：grunt.loadNpmTasks('grunt-contrib-clean'); 

    给插件配置任务目标   
        - grunt 插件大多数是多目标任务，需要配置任务目标     
    
    运行： yarn grunt clean 
        - 绝大多数情况下，grunt 插件的命名规范都是 grunt-contrib-任务名称
        - clean 任务是一个多目标任务，需要配置任务目标
        - 设置了 clean 的任务目标后，再执行 clean 任务，就会执行任务目标
 */

module.exports = grunt => {
    grunt.initConfig({
        // 任务名称
        clean: {
            // 目标名称：tmp，目标是清除 tmp/app.js
            // tmp: 'tmp/app.js'
            // 可以使用通配符设置删除符合配置的多个文件
            // tmp: 'tmp/*.txt', // 表示 tmp 下所有的 txt 文件
            tmp: 'tmp/**' // 表示 tmp 目录（包括该目录下的所有子文件）
        }
    })
    grunt.loadNpmTasks('grunt-contrib-clean');
}

```




### 4.6 Grunt 常用插件及总结
#### grunt-sass 编译 sass 文件
* 安装 yarn add grunt-sass sass --dev
    - 安装 sass 模块是指定 grunt-sass 中使用 sass 编译 sass 文件

#### grunt-babel 编译 ES6+ 语法
*  yarn add grunt-babel @babel/core @babel/preset-env --dev

#### load-grunt-tasks 模块，帮助加载 grunt 插件
* 安装 yarn add load-grunt-tasks --dev
    - 随着使用插件的增多，加载插件使用次数会增多
    - 此模块帮助加载 grunt 插件
* 使用 
    - 导入 const loadGruntTasks = require('load-grunt-tasks');
    - loadGruntTasks(grunt);
        + 传入 grunt，会自动加载所有的 grunt 插件中的任务

#### grunt-contrib-watch 监控文件并编译
* 安装 yarn add grunt-contrib-watch --dev
* 启动 yarn grunt watch 
    - 刚启动时，不会立即编译要监控的文件，只有在改变对应文件时才会执行对应任务
    - 注册默认任务，映射到需要执行的任务，可以在 watch 一启动时就先执行一次编译，然后启动监听


```

// 引入 sass 模块编译 sass文件
const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks');
module.exports = grunt => {
    grunt.initConfig({
        // 给 sass 插件配置任务目标
        sass: {
            options: {
                // 编译时同时生成 sourceMap 文件
                sourceMap: true,
                // 指定 grunt-sass 中使用哪个模块编译 sass
                implementation: sass,
            },
            // sass 任务的目标
            main: {
                // 使用files 属性指定输入输出文件路径
                // files 是一个对象，键名是输出路径，键值是输入路径
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        babel: {
            options: {
                // 编译时同时生成 sourceMap 文件
                sourceMap: true,
                // 设置需要转换哪些特性，设置preset-env 会根据最新的特性进行转换
                presets: ['@babel/preset-env'],
            },
            main: {
                files: {
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        watch: {
            // 监控目标，监视 js 文件
            js: {
                // files 是一个数组，表示要监控的文件
                // files: ['src/js/app.js']
                files: ['src/js/*.js'],
                // tasks 表示要执行的任务
                tasks: ['babel']
            },
            // 监控目标，监控 样式文件
            css: {
                // .scss 是 sass 新的语法规范中设置的扩展名，就是表示 sass 文件
                files: ['src/scss/*.scss'],
                tasks: ['sass']
            },
        }
    })
    // grunt.loadNpmTasks('grunt-sass');
    // 传入 grunt，会自动加载所有的 grunt 插件中的任务
    loadGruntTasks(grunt);


    // 注册默认任务，映射到 sass、babel 任务，可以在 watch 一启动时就先执行一次编译，然后启动监听
    grunt.registerTask('default', ['sass', 'babel']);
}

```




## 5、Gulp
* 核心特点： 高效、易用

### 5.1 Gulp 的基本使用   =》  01_gulp-sample
* mkdir gulp-sample，cd gulp-sample
* yarn init --yes
* 安装 yarn add gulp --dev
    - 会同时安装 gulp-cli，在 node_modules下会出现 gulp 命令，后面通过命令运行构建任务

```
// gulpfile.js

/* gulp 的入口文件
 *  此文件运行在 node 环境，可以使用 node的 commonJS 规范
 
 * 定义构建任务的方式就是通过导出函数成员的方式定义
 *      使用 yarn gulp foo 运行该函数
 
 * 最新的 gulp 中，取消了同步代码模式，约定了每一个任务都是异步任务，任务执行完成需要标记这个任务完成
 *        - 任务完成后手动调用一个回调，标识任务完成
  
 *  默认任务 default
 *      直接运行 yarn gulp， 不需要跟任务名称
 
 *  gulp 4.0之前，定义任务需要使用 gulp 的 task 方法注册任务， gulp 4.0以后保留了 gulp.task API，仍然能用
 *      
 */

exports.foo = done => {
    console.log('foo task working~');

    // 标识任务完成
    done();
}

// 默认任务
exports.default = done => {
    console.log('default task working~');
    done();
}

// gulp4.0之前，构建任务的方式
const gulp = require('gulp');
gulp.task('bar', done => {
    console.log('bar task !');
    done();
})
 
```




### 5.2 Gulp 的组合任务     =》  02_gulp-compose
* 使用 gulp 的 serie、parallel 模块创建组合任务
    - series：执行串行任务
    - parallel：执行并行任务

```
/* Gulp 组合任务
    series 和 parallel 是函数，接收多个参数，参数可以是任务
    series: 执行串行任务（任务依次执行）
        执行后会依次执行函数内从参数任务
        适合用于部署，先执行编译任务，再执行部署任务
    
    parallel: 执行并行任务（任务同时执行）
        执行后会同时启动所有的参数任务，互不干扰
        适合用于同时编译互不干扰的任务（js, css），提高构建效率
 */

const { series, parallel } = require('gulp');

const task1 = done => {
    setTimeout(() => {
        console.log('task1 working~');
        done();
    }, 1000);
}

const task2 = done => {
    setTimeout(() => {
        console.log('task2 working~');
        done();
    }, 1000);
}

const task3 = done => {
    setTimeout(() => {
        console.log('task3 working~');
        done();
    }, 1000);
}
// foo 方法执行后，会三个任务会依次启动执行
exports.foo = series(task1, task2, task3);

// bar 方法一启动，三个任务会同时启动
exports.bar = parallel(task1, task2, task3);

```




### 5.3 Gulp 的异步任务       =》  03_gulp-async

```
/* Gulp 异步任务的三种方式
    gulp 中的任务都是异步任务
    
    方式一： 常用方式
        1.1 调用回调函数的形式
            sucess: done();
                通过回调函数的方式解决，任务完成后执行回调函数
            error: done(new Error('callback_error task failed'));
                当想在执行过程中报告错误，阻止剩下的任务继续执行,在回调函数中第一个参数传入一个错误

        1.2 返回 Promise回调函数
            sucess: return Promise.resolve();
                一旦返回的 Promise 对象 resolved，表示任务结束
                resolve() 不需要返回任何值，gulp 会自动忽略这个值
            error:  return Promise.reject(new Error('promise_error failed'));
                返回 Promise 对象的失败状态，同样会结束后续任务的执行

        1.3 async/await 方式，只受限于 node 环境，只要 node 环境支持 async/await 语法，就可以使用
            sucess: await timeout(1000);
                await 一个成功的 Promise 对象
                等待 timeout(1000) 执行完成后才会执行后面代码
            error:  await timeout_error(1000);
                await 一个 失败的 Promise 对象
                等待 timeout(1000) 执行完成后才会执行后面代码
                如果 timeout_error(1000) 执行失败了，后面的代码不会执行；后续的任务也不会执行
    
    方式二： 通过 node 的 fs 模块中读取/写入文件流的方式
        
 */


// 1.1 调用回调函数的形式
// success => done()
exports.callback = done => {
    console.log('callback working~');
    done();
}

// error => done(new Error('callback_error task failed'))
exports.callback_error = done => {
    console.log('callback_error working~');
    // 运行后会抛出错误，不会执行后面的任务
    done(new Error('callback_error task failed'));
}

// 1.2 返回 Promise回调函数
// success => Promise.resolve()
exports.promise = done => {
    console.log('promise working~');
    // 一旦返回的 Promise 对象 resolved，表示任务结束
    // resolve() 不需要返回任何值，gulp 会自动忽略这个值
    return Promise.resolve();
}

// error => Promise.reject()
exports.promise_error = done => {
    console.log('promise_error working~');
    // 返回 Promise 对象的失败状态，同样会结束后续任务的执行
    return Promise.reject(new Error('promise_error failed'));
}

// 1.3 async/await 方式
// success => await timeout(1000)
// 返回一个成功的 Promise 对象，把 setTimeout 函数包装成一个 Promise 对象
const timeout = time => {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })
}
exports.async = async () => {
    // 等待 timeout(1000) 执行完成后才会执行后面代码
    await timeout(1000);
    console.log('async working~');
}
//  error => await timeout_error(1000)
// 返回一个失败的 Promise 对象，把 setTimeout 函数包装成一个 Promise 对象
const timeout_error = time => {
    return new Promise((resolve, reject) => {
        setTimeout(reject(new Error('async_error failed')), time);
    })
}
exports.async_error = async () => {
    // 等待 timeout_error(1000) 执行完成后才会执行后面代码
    // 如果 timeout_error(1000) 执行失败了，后面的代码不会执行；后续的任务也不会执行
    await timeout_error(1000);
    console.log('async_error working~');
}

// 方式二：通过读取/写入文件流的方式
const fs = require('fs');
exports.stream = () => {
    const readStream = fs.createReadStream('package.json');
    const writeStream = fs.createWriteStream('tmp.txt');
    // 通过 pipe 方式，把 readStream 导到 writeStream，文件复制
    readStream.pipe(writeStream);
    // 当 readStream end 时，任务结束，，readStream 中有个 end 事件，当读取文件流读取完成后，gulp 就知道任务已经完成了
    return readStream;
}

exports.stream_end = done => {
    const readStream = fs.createReadStream('package.json');
    const writeStream = fs.createWriteStream('tmp.txt');
    readStream.pipe(writeStream);
    // 手动调用 readStream 中 end 事件，模拟 gulp 任务完成后的操作
    readStream.on('end', () => {
        done();
    })
}

```





### 5.4 Gulp 构建过程核心工作原理   =》  04_gulp-build-process
* 读取文件（输入） =》 压缩文件（加工） =》写入文件（输出）

#### Gulp 官方定义：The Streaming build system 基于流的构建系统
* gulp 实现构建管道的方式

```
/* gulp 构建过程核心的工作原理
    读取文件（输入） =》 压缩文件（加工） =》写入文件（输出）

    压缩文件的过程
        读取流（输入） =》 转换流（加工） =》写入流（输出）

 */

const fs = require('fs');
const { Transform } = require('stream');
// 使用文件读取流的方式
exports.default = () => {
    // 文件读取流
    const read = fs.createReadStream('normalize.css');
    // 文件写入流
    const write = fs.createWriteStream('normalize.min.css');
    // 文件转换流
    const transform = new Transform({
        // 转换流的核心转换过程
        transform: (chunk, encoding, callback) => {
            // chunk => 读取流中读取到的内容（Buffer）,chunk 读出来是字节数组，使用 toString() 转换成字符串
            const input = chunk.toString();
            // 替换掉空格和 css 注释
            const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '');

            // callbak 是一个错误优先的函数，发生错误传入一个错误对象，没有错误传入 null
            callback(null, output);
        }
    })

    // 把读取出来的文件流导入转换流，然后再导入写入文件流
    read
        .pipe(transform)  // 转换
        .pipe(write);  // 写入

    // 返回文件读取流， gulp 可以根据流的状态判断任务十分完成
    return read;
}

```



### 5.5 Gulp 文件操作 API   =》  05_gulp-files-api

```
/* Gulp 文件操作 API + 插件的使用
        使用 src() 读取文件流
        使用 dest() 写入文件流
        使用插件 gulp-clean-css 转换压缩
        使用多个插件，可以添加多个 pipe() 操作
 */
const { src, dest } = require('gulp');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
exports. default = () => {
    // return src('src/normalize.css')
    //     .pipe(dest('dist'));

    // 批量操作，使用通配符
    return src('src/*.css')
        .pipe(cleanCss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('dist'));

}

```



### 5.6 Gulp 案例      =》  06_gulp-demo
* 脚本编译
* 页面模板编译
* 图片和字体文件转换
* 其他文件及文件清除
* 自动加载插件
* 开发服务器
* 监视变化以及构建优化
* useref 文件引用处理
* 文件压缩
* 重新规划构建过程
* yarn gulp 任务名称，执行各个任务

```
/*  
    Gulp 案例-其他文件及文件清除 =================================
        del(['dist'])  清除指定文件 
            del 模块返回的是一个 promise 对象，gulp 支持使用 Promise
            ['dist']
                接收一个数组，数组内可以放多个要清除的路径


    Gulp 案例-样式编译 =========================================
    
    gulp-sass 会自动安装 sass 的核心转换模块 node-sass
    sass 工作时，默认下划线开头的样式文件是主样式文件依赖的文件，会被忽略掉，不会被转换，不是下划线开头的样式文件会被准换
        src('src/assets/styles/*.scss', { base:  'src' })   设置输入文件
            { base:  'src' }
                设置基准目录，输出文件会保留 src 后面的目录
        sass({ outputStyle: 'expanded' })   转换流，将 scss 文件转换成 css
            { outputStyle: 'expanded' } 
                设置样式文件压缩后输出的类型（}是跟在样式后面还是独占一行）
        bs.reload({ stream: true })
                浏览器重新加载，以流的形式传输


    Gulp 案例-脚本编译 =========================================
    
    gulp-baebl 转换 ES6+ 语法转换成 ES5
        babel({ presets: ['@babel/preset-env'] })' }) 转换流，转换 ECMAScript 语法
            { presets: ['@babel/preset-env'] } 
                设置需要转换哪些特性，设置 preset-env 会根据最新的特性进行转换
                没有这个配置选项，会导致转换没有作用，相当于没有转换
    

    Gulp 案例-页面模板编译 ======================================
    
    gulp-swag 是模板引擎转换插件
        swig({ data, defaults: { cache: false }   }) 转换流，设置模板引擎转换
            data 页面内需要提供一些网页数据信息，此处模拟数据
            defaults: { cache: false }
                将 swig 模板引擎缓存机制默认值 true 改为 false，即不缓存


    Gulp 案例-图片和字体文件转换 =================================
    
        gulp-imagemin 插件，只压缩支持压缩的文件，不能压缩的会


    Gulp 案例-热更新开发服务器 ==================================
        初始化 web 服务器的配置
        bs.init({
            notify: false,  // 关闭提示
            port: 2080,    // 指定端口号，默认是 3000
            open: false,   // 启动后是否自动打开浏览器，默认 true
            files: 'dist/**',   // 监控 dist 下文件，一旦修改页面就更新
            // 网页核心配置, 请求文件路径配置
            server: {
                // 启动浏览器后，会根据 baseDir 目录查找文件
                baseDir: 'dist',     
                // 路由映射，routes 下配置的目录优先于 baseDir 配置的目录
                routes: {
                    '/node_modules': 'node_modules',  // 键名是需要匹配的路径，键值是匹配到的路径
                }
            }
        })

        watch: gulp 的监视模块
            源代码修改后，自动监视并编译，更新页面
            这里可能会因为 swig 模板引擎缓存的机制导致页面不会变化，
            此时需要额外将 swig 选项中的 cache 设置为 false
            
            开发阶段 watch 监控图片、字体和额外文件并没有意义，
                只需要在项目发布上上线的时候构建一次
            修改监控方法：baseDir 改成数组，
                每一次修改文件后会依次在数组里寻找该路径是否有需要请求的文件


    Gulp 案例-useref 文件引用处理 ==========================================================
        
        // 构建注释，将 node_modules 的 bootstrap.css 合并到 vendor.css，已经存在 vendor.css，就合并，没有此文件就添加
        <!-- build:css assets/styles/vendor.css -->
        <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
        <!-- endbuild -->
        <!-- build:css assets/styles/main.css -->
        <link rel="stylesheet" href="assets/styles/main.css">
        <!-- endbuild -->

        build 后，index.html 文件编译后，有很多使用到 node_modules 目录下的文件，在线上是无法引用成功，需要单独处理，使用 useref 来处理文件中的构建注释
        develop 环境下可以呈现是因为在 bs.init 里配置了路由映射

        plugins.useref({ searchPath: ['.', '..'] })
            使用 gulp-useref 设置转换流，转换指定文件中的构建注释
            { searchPath: ['.', '..'] }
                指定文件查找路径，针对.css 文件要在 dist 下面找，
                    针对 /node_modules 目录，要在跟目录下查找
        
        useref 帮助生成的css,js 文件没有进行压缩，还需要对文件进行压缩
            压缩 html 文件：gulp-htmlmin
            压缩 js 文件：gulp-uglify
            压缩 css 文件：gulp-clean-css
        
        此处压缩三种文件，需要 gulp-if 插件进行判断
            plugins.if(/\.js$/, plugins.uglify()) 
                判断是否是 .js 结尾，使用 plugins.uglify 插件压缩
            
            plugins.if(/\.css$/, plugins.cleanCss()) 
                判断是否是 .css 结尾，使用 plugins.cleanCss 插件压缩
            
            plugins.if(/\.html$/, plugins.htmlmin({ collapseWhitespace: true, minifyJS: true, minifyCSS: true })) 
                判断是否是 .html 结尾，使用 plugins.htmlmin 插件压缩
                { collapseWhitespace: true, minifyJS: true, minifyCSS: true }
                    折叠空白符，并压缩代码里的 js 和 css，
                        gulp-htmlmin 默认只删除空格，如果要压缩其他的东西，需要手动指定指定
                            还可以删除注释，空属性什么的，可以根据官方文档自己设置
        
        useref 的 src() 和 dest() 操作都在一个文件，一边读一边写，读写没有区分开，可能会导致读写文件写不进去
            解决方法：写入文件目录更换成 dest('release')
        
        正常情况是应该将构建后的文件都放在 dist 目录下，
            但是现在压缩后的文件都在 release 目录下，release 下没有 images 和 fonts，
            所以需要做些调整
        解决方法： 设置临时目录 temp, 将useref 涉及到的编译生成的文件（style, script, page）都放到 temp 目录下，压缩后的文件放入 dist 目录，清除文件再添加一个临目录 temp 选项

    
    
*/

/* 手动引入 gulp 插件
    // scss 文件转换
    const sass = require('gulp-sass');
    // ECMAScript 语法转换
    const babel = require('gulp-babel');
    // 模板引擎转换插件
    const swig = require('gulp-swig');
    // 图片和字体文件转换
    const imagemin = require('gulp-imagemin');
*/ 


// 引入需要使用的 gulp 模块 ，dest 表示目标
const {src, dest, series, parallel, watch} = require('gulp');
// 自动加载全部的 gulp 插件
const loadPlugins = require('gulp-load-plugins');
// loadPlugins() 返回的是一个对象，使用 plugins.sass 使用插件，如果有多个连接符，采用驼峰命名法使用插件
const plugins = loadPlugins();
// 清除文件模块
const del = require('del');
// 热更新模块
const browserSync = require('browser-sync');
// browserSync.create() 用于创建服务器
const bs = browserSync.create();

// 清除指定文件 
const clean = () => {
    return del(['dist', 'temp'])
}

// 转换 scss 文件，先放到临时目录 temp
const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(plugins.sass({ outputStyle: 'expanded' }))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }));
}

// 转换 js 文件，先放到临时目录 temp
const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }));
}

// 页面内需要的模板数据
const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

// 转换 page 文件，替换模板数据，将 swig 模板引擎缓存机制设置为不缓存，先放到临时目录 temp
const page = () => {
    // 'src/**/*.html'：匹配 src 下任意子目录下的 html 文件
    return src('src/*.html', { base: 'src' })
        .pipe(plugins.swig({ data, defaults: { cache: false }  }))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }));
}

// 压缩图片
const image = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'));
}
// 压缩字体文件
const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'));
}

// 拷贝额外文件
const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('dist'));
}


// 开发阶段需要执行的任务：热更新开发服务器
const serve = () => {
    
    // 开发阶段需要监控 html/js/css 文件，一旦变化立即执行对应任务
    // 对应任务里设置了 bs.reload，任务一旦执行就会触发浏览器重新加载
    watch('src/assets/styles/*.scss', style),
    watch('src/assets/scripts/*.js', script),
    watch('src/*.html', page),
    // watch('src/assets/images/**', image),
    // watch('src/assets/fonts/**', font),
    // watch('public/**', extra),

    // 开发阶段不需要压缩 image、 fonts 和拷贝 public 目录，不需要执行对应任务
    // 此处只需要监控这些文件，这些文件一旦变化，浏览器就重新加载
    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
    ], bs.reload);

    // 初始化服务器
    bs.init({
        notify: false, // 关闭提示
        open: false,  // 启动后手动打开浏览器
        port: 2080,
        // 如果对应任务里使用 bs.reload，浏览器会自动重新加载，此处的 files 可以不需要
        // files: 'temp/**',   // 监控 dist 下文件，一旦修改页面就更新
        server: {
            baseDir: ['temp', 'src', 'public'],
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}

// 生产环境需要的任务：文件引用处理，此处只需要处理临时目录下的 html 页面内的文件引用处理
// 此处只压缩了 html 页面文件引用的 js 和 css 文件，其他的 js,css 文件也需要压缩
const useref = () => {
    return src('temp/*.html', { base: 'temp' })
                .pipe(plugins.useref({ searchPath: ['.', '..'] }))
                .pipe(plugins.if(/\.js$/, plugins.uglify()))
                .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
                .pipe(plugins.if(/\.html$/, plugins.htmlmin({
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true 
                })))
                .pipe(dest('dist'))
}




// 并行组合 编译 src 下的所有文件
// const compile = parallel(style, script, page, image, font);
// 并行组合 编译 src 下的需要经常变动的文件
const compile = parallel(style, script, page);


// 串行任务：开发阶段执行的任务
const develop = series(compile, serve);


// 组合任务：上线之前执行的任务 
const build = series(
    clean, 
    parallel(
        series(compile, useref), 
        image, 
        font, 
        extra
    )
);

// 需要导出的三个模块，把操作放入 package.json 文件中，.gitignore 需要添加忽略目录
module.exports = {
    clean,
    serve,
    build,
    develop,
}

```


### 5.7 补充      =》  07_gulp-demo（直接在 gulp-demo 项目中整理）
* 整理案例中 gulpfile.js 文件中需要导出的文件
* 在 package.json 文件 scripts 对象内添加 gulpfile.js 文件中导出的 gulp 任务，以实现自动化构建工作流的最简方式
* .gitignore 文件中需要添加忽略目录 dist temp





## 6、封装工作流
* 提取可复用自动化构建工作流
* Gulpfile + Gulp = 构建工作流

### 6.1 封装工作流-准备   =》  08_yuyu-flow（工作流脚手架）   =》  09_gulp-flow-demo（本地 link 测试 yuyu-flow）   =》  10_gulp_flow-use（yarn add yuyu-flow --dev 测试）
* github 创建一个项目, yuyu-flow是构建的工作流项目

* yarn global add zce-cli  安装脚手架

* zce init nm yuyu-flow  初始化模板（nm 是模板名称）

* yuyu-flow 目录下，git init 初始化 git, git remote add origin git仓库地址

* 提交初始化的代码 git push -u origin master


### 6.2 封装工作流-提取 gulpfile
* 将 gulp-flow-demo 中 package.json 中 devDependencies 的 gulp 插件依赖拷贝到 yuyu-flow 中 package.json 的 dependencies 中；

* 将 gulp-flow-demo 的 gulpfile.js 内容从容拷贝到yuyu-flow/lib/index.js 文件下

* yuyu-flow 目录下, yarn 安装依赖，随后 yarn link

* gulp-flow-demo 目录下，移除 node_modules 目录，gulpfile.js 内容修改为 module.exports = require('yuyu-flow')，执行 yarn link "yuyu-flow", 随后 安装依赖，执行 yarn build，控制台提示缺什么依赖就安装什么依赖
    - 导出从 yuyu-flow 导入的内容，先导入再导出
    - 本文件中没有显示任务名称，故 yarn build 时终端不会列出任务名称，想要展示可以通过解构，再导出

```
// gulpfile.js
// 导出从 gulp-work-flow 导入的内容，先导入再导出
// 本文件中没有显示任务名称，故 build 时终端不会列出任务名称，想要展示可以通过解构，再导出
module.exports = require('yuyu-flow');

```



### 6.3 封装工作流-解决模块中的问题

* gulp-flow-demo 目录下,创建 pages.config.js 文件，将 gulp-work-demo/lib/index.js 下模板引擎数据 data 移出到 pages.config.js 文件下导出，在 gulp-work-demo/lib/index.js 文件内导入 gulp-flow-demo/pages.config.js文件定义的模板引擎数据


```
// index.js, 模板引擎数据 data 存放于 pages.config.js
// cwd 表示通过 node 的 process 模块从项目当前目录开始查找
const cwd = process.cwd();
let config = {
    // default config
};
// 引入 pages.config.js，防止引入错误设置默认配置和 try...catch
try {
    const loadConfig = require(`${cwd}/pages.config.js`);
    config = Object.assign({}, config, loadConfig);
} catch (e) {} 

```

* yuyu-flow/lib/index.js 下，编译 js 的 babel 任务中 presets: ['@babel/preset-env']，改为 presets: [require('@babel/preset-env')]
    - presets: ['@babel/preset-env'] 直接会从根目录找，项目 gulp-flow-demo 的 node_modules 目录没有 @babel/preset-env 模块，找不到
    - presets: [require('@babel/preset-env')] 会先在 lib 目录下找，找不到会在依次向上一层查找，上一层的 node_modules 下有 @babel/preset-env 模块

```
const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

```

### 6.4 封装工作流-抽象路径配置

#### 将 index.js 中涉及到路径的配置抽象出来
* 在执行项目 gulp-flow-demo 的 pages.config.js 中配置抽象路径
* 并将 yuyu-flow/lib/index.js 文件中的路径修改成抽象路径配置形式

```
// 抽象路径配置
build: {
    src: 'src',
    dist: 'release',
    temp: '.tmp',  // .开头的目录属于隐藏目录，临时文件可以放到隐藏目录中
    public: 'public',
    paths: {
        styles: 'assets/styles/*.scss',
        scripts: 'assets/scripts/*.js',
        pages: '*.html',
        images: 'assets/images/**',
        fonts: 'assets/fonts/**',
    }
}
// 举例说明
// cwd 表示从当前项目所在目录找路径，哪里运行项目哪里找
const style = () => {
  return src(config.build.paths.styles, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true }))
}

```


### 6.5 封装工作流-包装 Gulp CLI
#### 手动执行
* gulp-flow-demo/gulpfile.js 下, 只是导出从 yuyu-flow 导入的内容，可以删除此文件以进行优化
    - module.exports = require('yuyu-flow');
* yarn gulp build --gulpfile ./node_modules/yuyu-flow/lib/index.js --cwd .
    - 没有 gulpfile.js 文件，可以手动设置
    - yarn gulp build 表示执行后面设置的 gulpfile 文件的 build 任务
    - --gulpfile 路径 表示指定 gulpfile 文件
    - --cwd . 表示指定工作目录为当前目录，不知道会认为指定的 gulpfile 所在的目录为工作目录

#### yuyu-flow 下包装 gulp-cli
* yuyu-flow 目录下创建 bin/yuyu-flow.js 文件
* package.js中添加 bin 属性
    
    ```
        // 两种形式：字符串或者对象形式
        
        // "bin": "bin/gulp-work-flow.js",
        
        "bin": {
            "gulp-work-flow": "bin/gulp-work-flow.js"
        },
    ```
* 编写 yuyu-flow.js 测试代码
    - 编写完成后需要在 yuyu-flow目录下，先 yarn unlink，然后重新 yarn link 到全局
    
    ```
        #!/usr/bin/env node

        // Node CLI 应用入口文件必须要有上面展示的文件头
        // 如果系统是 Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755，具体是通过  chomd 755 cli.js 实现修改
        console.log('gulp-work-flow cli 测试');
    ```
* yuyu-flow 目录下 执行 yuyu-flow 命令，即可执行 yuyu-flow.js 文件
* yuyu-flow/bin/yuyu-flow.js 真正的内容编写完成后，进入 gulp-flow-demo 执行 yuyu-flow build 命令 即可

```
// yuyu-flow/bin/yuyu-flow.js 文件内容

#!/usr/bin/env node

// Node CLI 应用入口文件必须要有上面展示的文件头
    // 如果系统是 Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755，具体是通过  chomd 755 cli.js 实现修改

process.argv.push('--cwd');
process.argv.push(process.cwd());
process.argv.push('--gulpfile');
// require.resolve('../lib/index')，由于 package.json 中设置了 主入口文件为 lib/index.js，路径可以简写为 ..
process.argv.push(require.resolve('..'));
require('gulp/bin/gulp');




// console.log(process.argv); 
// [
//   '/usr/local/bin/node',
//   '/usr/local/bin/gulp-work-flow',
//   'build'
//   '--cwd',
//   '/Users/yuling/program/myFiles/ECMAScript/frontend/P2/M1-AutoBuild/gulp/yuyu-flow',
//   '--gulpfile',
//   '/Users/yuling/program/myFiles/ECMAScript/frontend/P2/M1-AutoBuild/gulp/yuyu-flow/lib/index.js'
// ]

```



### 6.6 封装工作流-发布并使用模块
* 由于 yuyu-flow下添加了 bin 目录，发布之前需要在 package.json 文件的 files 属性中添加 bin 元素

    ```
        "files": [
            "bin",
            "lib"
        ]
    ```
* yuyu-flow 目录下执行 yarn publish --registry https://registry.yarnpkg.com

#### 使用步骤
* 安装 yarn add yuyu-flow --dev
* 运行 yarn yuyu-flow build
* package.json 中添加 scripts 后
    可以使用 yuyu-flow build 运行
```
"scripts": {
  "clean": "yuyu-flow clean",
  "build": "yuyu-flow build",
  "develop": "yuyu-flow develop"
},

```

### 6.7 封装工作流-总结



## 7、FIS

### 7.1 FIS 的基本使用
* 安装
    - 全局安装 yarn global add fis3 
        + 可以直接使用 fis3 指令操作
    - 局部安装 yarn add fis3 --dev
        + 使用 yarn fis3 指令操作

* mkdir fis-sample, cd fs-sample,创建文件
* fs3 release -d output 
    - 将项目需要构建的文件自动构建到一个临时目录，默认构建在用户目录下，-d 是指定输出目录

* fis 资源定位
    - 将资源文件输出到 output/assets 目录下
    - code fis-config.js
    
    ```
        // fis.config.js
        /* fis 是该文件特有的全局对象，使用 fis.match 资源定位
            fis.match 用来匹配文件添加到指定目录中
                $0 指的是当前文件的原始目录文件
                 执行 fis3 release -d output 命令，输出的文件就在 output/assets/ 目录下
         */
        fis.match('*.{js,scss,png}', {
            release: '/assets/$0'
        })
    ```

### 7.2 FIS 编译与压缩
* 安装 fis-parser-node-sass 插件
    

```

/* fis 是该文件特有的全局对象，使用 fis.match 资源定位
    
    fis.match('*.{js,scss,png}', {
        release: '/assets/$0'
    })
        用来匹配文件添加到指定目录中
        $0 指的是当前文件的原始目录文件
         执行 fis3 release -d output 命令，输出的文件就在 output/assets/ 目录下
    
    匹配任意目录下的 scss 文件, 使用 fis-parser-node-sass 插件
        {
            parser: fis.plugin('node-sass'),
            rExt: '.css',
            optimizer: fis.plugin('clean-css')
        }
            fis.plugin('node-sass') 自动载入 node-sass 插件
            rExt: '.css' 修改扩展名
            optimizer: fis.plugin('clean-css') 使用 clean-css 插件压缩 css
    
 */

// 匹配文件到指定目录
fis.match('*.{js,scss,png}', {
    release: '/assets/$0'
})
// 匹配任意目录下的 scss 文件, 使用 fis-parser-node-sass 插件 将 scss 文件转换成 css
fis.match('**/*.scss', {
    rExt: '.css',
    parser: fis.plugin('node-sass'),
    optimizer: fis.plugin('clean-css')
})

// 匹配任意目录下的 scss 文件, 使用 babel-6.x 插件 转换 js
fis.match('**/*.js', {
    parser: fis.plugin('babel-6.x'),
    optimizer: fis.plugin('uglify-js')
})




```
