/*  
    需求：获取根目录下的所有文件的文件名称，并将文件名称导出到 sync-filename.txt.txt 文件

    使用 async/await 将 fs.readdir 和 fs.stat 转换为同步

    运行： node sync-filename.js

 */


const fs = require('fs');
const path = require('path');
const util = require('util');

// 获取指定目录下的所有文件
async function getFileList(filePath) {
  try {
    const readdir = util.promisify(fs.readdir);
    let files = await readdir(filePath);
    const arr = [];
    if (files && files.length) {
      files.forEach(item => {
        arr.push(item)
      });
    }
    return arr;
  } catch (err) {
    console.log(err)
  }
}

// 判断是否是文件, 是就返回 true, 不是就返回 false
async function isFile(filePath) {
  try {
    const stat = util.promisify(fs.stat);
    let stats = await stat(filePath);
    return flag = stats.isFile() ? true : false;
  } catch (err) {
    console.log(err)
  }
}

const listArr = [];
const filPath = path.join(__dirname);
const fn = (data, filPath) => {
    data.forEach((item, i, array) => {
        const routes = filPath + '/' + item;
        isFile(routes).then(val => {
            if (val) {
                if (item.split('.')[0]) {
                    listArr.push(item.split('.')[0]);
                }
            } else {
                getFileList(routes).then(result => {
                    fn(result, routes);
                })
            }
                if (i === data.length - 1) {
                    fs.writeFileSync(path.join(__dirname, 'sync-filename.txt'), [...listArr, listArr.length]);
                }
        })
    })
} 

getFileList(filPath).then(data => {
    fn(data, filPath);
})

