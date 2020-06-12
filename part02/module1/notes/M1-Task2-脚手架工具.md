# Part2 - Module1 - Task2 - 脚手架工具

## 1、脚手架简单介绍
### 脚手架工具是前端工程化的发起者
### 脚手架的本质作用
* 创建项目基础结构、提供项目规范和约定
    - 相同的组织结构
    - 相同的开发范式
    - 相同的模块依赖
    - 相同的工具配置
    - 相同的基础代码


## 2、内容概要
* 脚手架的作用
* 常用的脚手架工具
* 通用脚手架工具剖析
* 开发一款脚手架



## 3、常用的脚手架工具
### 3.1 一种是适用于自身服务框架的项目
* 根据信息创建对应的项目基础结构，如：
    - React 项目 -> create-react-app
    - Vue.js -> vue-cli
    - Angular 项目 -> angular-cli

### 3.2 另一种是通用型项目脚手架工具
* 以 Yeoman 为代表，可以根据一套模板生成对应的项目，这种脚手架工具生成的项目容易扩展，比较灵活

### 3.3 还有一种用于项目开发过程中创建特定类型的文件
* 以Plop为代表
    - 例如创建一个组件/模块所需要的文件，每个文件都有一定的结构


## 4、Yeoman 介绍

### 4.1 Yeoman 简介
* 用于创造现代化 Web 应用的脚手架工具
* 优点即缺点
    - 过于通用，不够专注


### 4.2 Yeoman 基础使用  =》 01_my-module
* 工具版本： 
    - node @10.16.2 
    - npm @6.9.0
    - yarn @1.17.3
* 全局范围安装 yo，yo 是 yeoiman 根据模块的名字 
    - npm install yo --global 或 yarn global add yo
* 安装对应的 generator
    - npm install generator-node --global 或 yarn global add generator-node
* 通过 yo 运行 generator
    - mkdir my-module
    - yo node
        + yo 生成器名称，generator-node生成器的名称是 node
        + 根据问题输入，当问题输入完成后，会根据你的输入生成一个基础的项目结构


### 4.3 Sub Generator
#### 在已有的项目之上创建特定类型的文件，可以使用 yeoman 提供的 sub generator 特性实现
* yo node:cli
    - 运行 Sub Generator的方式是在原有的 generator 名称后面跟上 :sub generator名称
    - cli 是一个 Sub Generator 的生成器名称，yo node:cli 可以生成 cli 应用所需要的文件
    - 完成后，创建了 lib/cli.js文件，package.json 下多出了 "bin": "lib/cli.js" 
    - yarn 安装依赖包
* yarn link 到全局
* 然后就可以使用模块名称运行 my-module --help



### 4.4 Yeoman 使用步骤总结  =》 02_my-web-app
* Yeoman 是一款通用型脚手架工具
* 使用 yeoman 需要遵循的步骤
    - 明确你的需求
    - 找到合适的 Generator
    - 全局范围安装找到的 Generator
    - 通过 Yo 运行对应的 Generator
    - 通过命令行交互填写选项
    - 生成你所需要的项目结构
* 在 yeoman 官网找到 generators 模块，搜索自己需要的 generator   https://yeoman.io/generators/ 
    - 此处创建网页，需要的是 webapp ，安装 yarn global add generator-webapp
    - 创建并进入目录，运行 yo webapp，根据问题输入选项生成对应的项目
        + mkdir my-web-app
        + cd my-web-app, 
    - 最终会得到 web 项目对应的结构



## 5、自定义 Generator
* 不同的 generator 可以生成不同的项目
* 基于 Yeoman 搭建自己的脚手架

### 5.1 创建 Generator 模块
* Generator 本质上就是一个 NPM 模块
    - 创建 generator 实际上是创建一个 npm 模块

#### Generator 基本目录结构
> generators/ ------------------------ 生成器目录
> > app/ ----------------------------- 默认生成器目录
> > > index.js ----------------------- 默认生成器实现

> > component/ --------------------- 其他生成器目录
> > > index.js ----------------------- 其他生成器实现

> package.json ----------------------- 模块包配置文件

#### generator 模块命名
* Yeoman 的 generator 模块必须是 generator-<name> 格式，只有这样才能找到你所提供的生成器模块


#### 创建 Generator 模块步骤演示  =》 03_generator-sample
* mkdir generator-sample，然后 cd generator-sample
* yarn init  初始化 package.json
* yarn add yeoman-generator 
    - 此模块提供了生成器的基类，基类中提供了工具函数，使得创建生成器更加便捷
* generator-sample目录下创建 generators/app/index.js 文件
    
```
    /* 此文件作为 Generator 的核心入口
        1、引入 yeoman-generator 模块
        2、需要导出一个继承自 Yeoman Generator 的类型
            - Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
            - 在这些方法中可以通过调用父类提供的一些工具方法来实现一些功能，例如文件写入
    */
    
    // 引入 yeoman-generator 模块
    const Generator = require('yeoman-generator');
    
    // 2、导出一个继承自 Yeoman Generator 的类型
    module.exports = class extends Generator {
        // 定义 writing 方法；这个方法在 Yeoman 工作时，会在生成文件阶段自动调用此方法
        writing () {
            /* 
            Yeoman 自动在生成文件阶段调用此方法
                通过文件读写的方式往生成目录中写入文件
                this.fs是一个高度封装的 filesystem，功能更强大，不同于 node 中的 fs
                
                this.fs.write(模板输出路径，输出数据内容)
            */
            this.fs.write(
                this.destinationPath('temp.txt'),
                Math.random().toString();
            );
        }
    }
    
```
* yarn link 链接到全局
    - 将此模块链接到全局范围，使之成为全局模块包，使 yeoman 工作时自己找到我们自定义的 generator-sample 模块
* 在根目录下 mkdir my-project，进入文件夹   =》 04-generator-sample-test（用来测试 generator-sample 项目）
* 执行 yo sample 
    - sample 是刚才创建的生成器模块的名字
    - 执行完成会提示 create temp.txt
    - my-project 下会生成 temp.txt 文件，文件内容是刚才代码写入的内容



### 5.2 根据模板创建文件
#### 步骤演示
* 在 generators-sample/app 下添加 templates 目录
* 将需要生成的文件都放入 templates 目录作为模板文件
    - templates/foo.txt
        + 模板中是完全遵循 EJS 模板语法，如
            + <%= title %>
            + <% if (success) { %> 哈哈哈 <% } %>
        + 此时在 generators/app/index.js 文件中，不需要借助于 fs.write 写入文件，而是使用 fs 模板引擎的方式写入文件.copyTemplate
    ```
        /* 此文件作为 Generator 的核心入口
            1、引入 yeoman-generator 模块
            2、需要导出一个继承自 Yeoman Generator 的类型
                - Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
                - 在这些方法中可以通过调用父类提供的一些根据方法来实现一些功能，例如文件写入
        */
        
        // 引入 yeoman-generator 模块
        const Generator = require('yeoman-generator');
        
        // 2、导出一个继承自 Yeoman Generator 的类型
        module.exports = class extends Generator {
            // 定义 writing 方法；这个方法在 Yeoman 工作时，会在生成文件阶段自动调用此方法
            writing () {
                /*
                    通过使用 fs 模板方式写入文件到目标目录
                    fs.copyTpl(模板文件路径，输出目标路径，模板数据上下文)
                    fs.copyTpl() 会自动的将模板文件映射到生成的输出文件上
                */ 
                // 模板文件路径
                const tmpl = this.templatePath('foo.txt');
                // 输出目标路径
                const output = this.destinationPath('foo.txt');
                // 模板数据上下文
                const context = { title: 'Hello World', success: false};
        
                // 传入三个参数
                this.fs.copyTpl(tmpl, output, context);
            }
        }
        
    ```
* yo sample
    - 会将 context 内容自动的输出到模板文件 foo.txt 文件中

#### 模板创建文件优点
* 相对于手动创建每一个文件，模板的方式提高了效率，尤其是在文件比较多又比较复杂的情况下，更能提高效率


### 5.3 接收用户输入
* 动态接收用户输入
```
// bar.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= name %></title>
</head>
<body>
    <h1><%= name %></h1>
</body>
</html>

// index.js
/* 此文件作为 Generator 的核心入口
    1、引入 yeoman-generator 模块
    2、需要导出一个继承自 Yeoman Generator 的类型
        - Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
        - 在这些方法中可以通过调用父类提供的一些根据方法来实现一些功能，例如文件写入
*/
// 引入 yeoman-generator 模块
const Generator = require('yeoman-generator');
// 2、导出一个继承自 Yeoman Generator 的类型
module.exports = class extends Generator {

    prompting () {
        /*
            Yeoman 在询问用户环节会自动调用此方法
            在此方法中可以调用父类的 prompt() 方法发出对用户的命令行询问
            
            this.prompt()是一个 Promise 对象，故需要返回 this.prompt()，这样 Yeoman 在工作是可以有更好的异步流程控制
            this.prompt()：接收一个数组参数，数组的每个元素都是个对象（问题列表），对象可以传入下面这些属性： 
                type: 使用什么方式接收用户提交的信息
                name: 最终得到结果的键名
                message: 界面上给用户的提示，即问题
                default: this.appname  // appname 是父类中自动获取到的当前生成项目的目录的文件夹的名字，作为默认值
        */ 
        return this.prompt([
            {
                type: 'input',  // 采用用户输入的方式接收信息
                name: 'name',
                message: 'Your module name',
                default: this.appname  // appname 是父类中自动获取到的当前生成项目的目录的文件夹的名字，作为默认值
            },
            {
                type: 'input',  // 采用用户输入的方式接收信息
                name: 'content',
                message: 'Your content',
                default: 'Hello World'  
            }
        ]).then(answers => {
            /* answers => {name: 'user input value'}
                answers 是问题接收用户输入的一个结果，以对象的形式出现
                对象里的键名是prompt()里传入的属性，键值是用户输入的 value
                将 answers 挂载到 this对象上，以便在 writing 方法中使用
            */
            // answers => {name: 'user input value'}
            this.answers = answers;
        })
    }

    // 定义 writing 方法；这个方法在 Yeoman 工作时，会在生成文件阶段自动调用此方法
    writing () {
        // fs.write ============================================
        /* Yeoman 自动在生成文件阶段调用此方法
            通过文件读写的方式往生成目录中写入文件
            this.fs是一个高度封装的 filesystem，功能更强大，不同于 node 中的 fs

            this.fs.write(模板输出路径，输出数据内容)
        */
        this.fs.write(
            this.destinationPath('temp.txt'),
            Math.random().toString()
        );


        // 模板创建文件 ============================================
        /*
            通过使用 fs 模板方式写入文件到目标目录
            fs.copyTpl(模板文件路径，输出目标路径，模板数据上下文)
            fs.copyTpl() 会自动的将模板文件映射到生成的输出文件上
        */ 
        // 模板文件路径
        const tmpl = this.templatePath('foo.txt');
        // 输出目标路径
        const output = this.destinationPath('foo.txt');
        // 模板数据上下文
        const context = { title: 'Hello World', success: true};
        // 传入三个参数
        this.fs.copyTpl(tmpl, output, context);

        // 接收用户输入  ============================================

        // 模板文件路径
        const tmpl1 = this.templatePath('bar.html');
        // 输出目标路径
        const output1 = this.destinationPath('bar.html');
        // 模板数据上下文
        const context1 = this.answers;
        // 传入三个参数
        this.fs.copyTpl(tmpl1, output1, context1);
    }
}

```



## 6.4 Vue Generator 案例  =》 05_generator-yuyu-vue  =》  06_generator-yuyu-vue-test
* mkdir generator-yuyu-vue -> cd generator-yuyu-vue -> yarn init
* yarn add yeoman-generator
* generators/app/index.js，拷贝文件到 templates 目录下
* yarn link ，将 generator-yuyu-vue 模块 link 到全局
* mkdir generator-yuyu-vue-test, 并 cd generator-yuyu-vue-test 目录下
* yo yuyu-vue   运行 generator-yuyu-vue 模块
    - 对应文件中的模板表达式会被替换成预先设置的值

```
// 模板中，如果有需要输出模板标记，可以多加一个%进行转义
// 将 <%= BASE_URL %> 进行模板输出，即改为 <%%= BASE_URL %> 即可


const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting () {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your Project Name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'motion',
        message: 'Are you Happy',
        default: 'Happy'
      },
      {
        type: 'input',
        name: 'like',
        message: 'Are you Beautiful',
        default: 'Beautiful'
      }
    ])
    .then(answers => {
      this.answers = answers
    })
  }

  writing () {
    // 把每一个文件都通过模板转换到目标路径

    const templates = [
      '.browserslistrc',
      '.editorconfig',
      '.env.development',
      '.env.production',
      '.eslintrc.js',
      '.gitignore',
      'babel.config.js',
      'package.json',
      'postcss.config.js',
      'README.md',
      'public/favicon.ico',
      'public/index.html',
      'src/App.vue',
      'src/main.js',
      'src/router.js',
      'src/assets/logo.png',
      'src/components/HelloWorld.vue',
      'src/store/actions.js',
      'src/store/getters.js',
      'src/store/index.js',
      'src/store/mutations.js',
      'src/store/state.js',
      'src/utils/request.js',
      'src/views/About.vue',
      'src/views/Home.vue'
    ]

    templates.forEach(item => {
      // item => 每个文件路径
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      )
    })
  }
}

```



## 7 发布 Generator
* Generator 是一个 npm 模块，发布 Generator 实际上是发布一个 npm 模块

#### 一般会将项目源代码托管到公开的源代码仓库
* 创建一个本地仓库
* cd generator-yuyu-vue
* echo node_modules > .gitignore  输出忽略文件
* git init 初始化本地空仓库
* git status
* git add .
* git remote add origin https://github.com/lanQueen/generator-yuyu-vue.git
    - 在 github 上创建一个空仓库，为本地仓库添加一个远端仓库地址
* git push -u origin master
    - 将本地 master 分支代码推送到远端仓库的 master 分支
* npm/yarn publish  发布模块
    - yarn publish --registry=https://registry.yarnpkg.com (防止报镜像错误)
        + 会自动提示输入新的版本号
    - npm publish --registry=https://registry.npmjs.org/
        + 不会提示输入新的版本号，需要发布前手动修改 package.json 的版本号
* 发布成功后 mkdir generator-yuyu-vue-test-publish, cd generator-yuyu-vue-test-publish
    - yarn add yuyu-vue --dev
    - yo yuyu-vue 






## 8、Plop 介绍
* Plop 一个小而美的脚手架工具

### 8.1 Plop 简介
* 用于创建项目中特定类型文件的工具，一般不会独立使用，集成到项目中，用来创建同类型的项目文件

### 8.2 Plop 的基本使用   =》  07_plop-sample
* cd plop-sample  react项目  
* yarn add plop --dev
* 根目录下新建 plopfile.js，定义脚手架任务

```
// plopfile.js 文件
// plop 入口文件，需要导出一个函数
// 此函数接收一个 plop 对象，用于创建生成器任务

module.exports = plop => {
    //plop.setGenerator(生成器的名字， 生成器的配置选项) 
    plop.setGenerator('component', {
        // 生成器的描述
        decription: 'create a component',
        // prompts，生成器的命令行交互配置
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'component name',
                default: 'MyComponent'
            }
        ],
        // 动作
        actions: [
            // 如果需要创建多个文件，就在 actions 内部添加多个对象
            {
                // 添加文件
                type: 'add', 
                // path：添加的路径，可以用插值表达式插入命令行交互的数据
                path: 'src/components/{{name}}/{{name}}.js', 
                // 本次添加文件的模板文件路径，一般会把模板文件放在根目录下的 plop-templates 目录内
                templateFile: 'plop-templates/component.hbs'
            },
            {
                type: 'add', 
                path: 'src/components/{{name}}/{{name}}.css', 
                templateFile: 'plop-templates/component.css.hbs'
            },
            {
                type: 'add', 
                path: 'src/components/{{name}}/{{name}}.test.js', 
                templateFile: 'plop-templates/component.test.hbs'
            }
        ]
    })
}

```
* 编写生成文件类型模板
    - plop-templates/ 目录下
* yarn plop component 
    - 启动 plop 模块提供的 cli 程序, component是生成器的名字
    - yarn 会自动找到 node_modules/bin 目录下的命令行工具

#### 使用 plop 步骤总结
* 将 plop 模块作为项目开发依赖安装
* 在项目根目录下创建一个 plopfile.js 文件
* 在 plopfile.js 文件中定义脚手架任务
* 编写用于生成特定类型文件的模板
* 通过 Plop 提供的 CLI 运行脚手架任务



## 9、脚手架的工作原理
* 使用 node.js 开发小型的脚手架工具，体会脚手架工具的工作过程
* 脚手架工具就是 node cli 应用，创建脚手架工具就是创建 node cli 应用

#### 创建过程介绍   =》 08_cli-sample
* mkdir cli-sample 并且 yarn init 初始化 package.json
* 修改 package.json，添加 "bin": "cli.js"，用于指定 cli 应用的入口文件
* 创建 cli.js
    
    ```
        #!/usr/bin/env node
        
        // Node CLI 应用入口文件必须要有上面展示的文件头
        // 如果系统是 Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755，具体是通过  chmod 755 cli.js 实现修改
        
        console.log('cli working!');
        
    ```
* yarn link 到全局
* 命令行执行 cli-sample
    - 控制台会打印出 cli working
    - 至此，实现了 cli 业务的基础


### 使用脚手架  =》 09_cli-sample-test
* mkdir cli-sample-test, cd cli-sample-test
* 执行 cli-sample 命令，该目录下会添加编译后的模板文件


### generator-yuyu-vue 和 plop 结合的案例  =》 10_plop-yuyu-vue-sample

### 脚手架原理 和 plop 结合的案例  =》 11_cli-plop-sample


### 实现脚手架的具体业务

```
#!/usr/bin/env node


// Node CLI 应用入口文件必须要有上面展示的文件头
// 如果系统是 Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755，具体是通过  chmod 755 cli.js 实现修改 cli.js 的读写权限

// console.log('cli working!');

/*
 *  脚手架的工作过程：
 *      1、通过命令行交互询问用户问题
 *      2、根据用户回答的结果生成文件
 *  具体步骤：
 *      1、node 中发起命令行交互使用 inquirer 模块
 *          1. yarn add inquirer 安装
 *          2. const inquirer = require('inquirer'); 引入
 *          3. inquirer.prompt([])，创建用户命令行交互问题
 *      2、创建 templates 目录，并创建模板文件 index.html 和 style.css
 *  
 */
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const ejs = require('ejs');

// 1、通过命令行交互询问用户问题
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name?'
    },
    {
        type: 'input',
        name: 'title',
        message: 'Your title?'
    },
    {
        type: 'input',
        name: 'content',
        message: 'Your content?'
    },
    {
        type: 'input',
        name: 'color',
        message: 'Your content color?'
    }
])
.then(answers => {
    // console.log(answers); // { name: 'a' }
    // 根据用户回答的结果生成文件
    
    // 模板目录，当前目录下的 templates 目录
    const tmplDir = path.join(__dirname, 'templates');
    
    // 输出目标目录（cwd表示当前的执行目录，一般是命令行在哪里执行就是哪个目录）
    const destDir = process.cwd();
    
    // 将模板下的文件全部转换到目标目录
    // fs.readdir 读取模板目录下的所有文件
    fs.readdir(tmplDir, (err, files) => {
        if (err) throw err; // 如果读取过程中出错，可以抛出异常
        // 回调函数中，files 是读取到的文件列表,
        files.forEach(item => {
            // item 是相对于 templates 目录文件的相对路径
            // console.log(item); // index.html  style.css

            /* 通过模板引擎渲染路径对应的文件，
                1. 安装 EJS 模块 yarn add ejs
                2. 安装完成后，引入 ejs
                    const ejs = require('ejs');
                3. 通过 ejs.renderFile 方法渲染路径对应的文件
                    ejs.renderFile(文件的绝对路径，模板引擎工作时的数据上下文，fn)
                        fn: 渲染成功的回调函数，两个参数：err 和 result
                        err：错误
                        result：通过模板引擎工作过后的结果
            */  
            ejs.renderFile(path.join(tmplDir, item), answers, (err, result) => {
                // err：如果渲染过程中出错了，要抛出错误
                if (err) throw err;
                // console.log(result);  // 此时打印的结果是已经通过模板引擎工作过后的结果
                
                // 通过文件写入的方式，将结果写入目标文件路径
                fs.writeFileSync(path.join(destDir, item), result);
            })
        })
    })
})

```



