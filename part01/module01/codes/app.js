
// homework-03
var arr = [12, 34, 32, 89, 4];
const min = Math.min(...arr);
console.log(min);  // 4




// homework-09
function delay(time) {
    const start = new Date();
    while(new Date() - start < time){}
}

const promise = new Promise((resolve, reject) => {
    delay(10);
    resolve('hello');
});
promise.then((value) => {
    delay(10);
    return `${value}lagou`;
}).then((value) => {
    delay(10);
    const result = `${value}I ❤️ U`;
    console.log(result)
}).catch((err) => {
    console.log(err);
});
