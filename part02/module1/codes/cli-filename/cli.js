#!/usr/bin/env node


// 上述代码是 Node CLI 应用入口文件必须要有的文件头
// linus/macOS 系统下要修改当前文件的读写权限  chmod 755 cli.js



/*  
    需求：获取根目录下的所有文件的文件名称，并将文件名称导出到 filename.txt.txt 文件

    使用 fs.readdirSync 和 fs.statSync 同步读取文件

    运行： node sync-filename.js

 */



// 引入 fs 模块，用于读写文件
const fs = require('fs');
const path = require('path');


const arr = [];

function getFilesname(path) {
  // 同步读取当前 path 的所有文件，得到一个数组
  const files = fs.readdirSync(path);
  // 遍历数组
  files.forEach(item => {
    let src = path + '/' + item;
    // 同步读取元素信息，并判断该元素是否是文件
    let flag = fs.statSync(src).isFile();
    if (flag) { // 如果是文件，获取文件名称，并追加到数组
      if (item.split('.')[0]) {
        arr.push(item.split('.')[0]);
      }
    } else { // 如果不是文件，继续循环读取当前目录
      getFilesname(src);
    }
  })
}

getFilesname(__dirname);
// console.log(arr);
// 通过文件写入的方式，将模板引擎工作的结果渲染到指定的输出目录
fs.writeFileSync(path.join(__dirname, 'filename.txt'), [...arr, arr.length]);

/*
[
  'README',        'babel',
  'cli',           'filename',
  'package',       'postcss',
  'favicon',       'index',
  'App',           'logo',
  'HelloWorld',    'main',
  'router',        'actions',
  'getters',       'index',
  'mutations',     'state',
  'request',       'About',
  'Home',          'sync-filename',
  'sync-filename', 'yarn'
]
*/
