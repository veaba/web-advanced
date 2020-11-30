/**
 * @desc Proxy 代理 实验
 * @todo Proxy第一个参数是干啥的？
 * @param
 *
 */

// const targetObj = {};
// const handler = {
//   get: function(target, propKey, receiver) {
//     console.log('getting===>',propKey);
//     return Reflect.get(target, propKey, receiver);
//   },
//   set: function(target, propKey, value, receiver) {
//     console.log('setting===>',propKey);
//     return Reflect.set(target, propKey, value, receiver);
//     /*
//     set(target,prop,value){
//         target[prop] = value

//     }
//     */
//   },
// };

// const obj = new Proxy(targetObj, handler);
// obj.aa=22
// console.log(obj);


/**  Handler array */
const arrayData = [
    {name:"Lee"},
    {name:"Lisa"},
    {name:"rookie"},
]

const proxy = new Proxy(arrayData,{
    get(target,prop){
        return target[prop]
    },
    set(target,prop,value){
        target[prop]=value
    }
})

console.log(arrayData[1])
console.log(proxy[2])