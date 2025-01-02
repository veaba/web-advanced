/*
当使用 a instanceof b 时，JavaScript 引擎会按照以下步骤进行判断：
首先获取 a 的原型，即 a.__proto__。
然后获取 b 的原型属性，即 b.prototype。
接着检查 a.__proto__ 是否与 b.prototype 相等。如果相等，则 a instanceof b 返回 true。
如果不相等，就继续沿着 a 的原型链向上查找，即检查 a.__proto__.__proto__ 是否与 b.prototype 相等，以此类推
直到找到相等的情况或者到达原型链的顶端（null）。如果到达原型链顶端仍未找到相等的情况，则 a instanceof b 返回 false。
*/
function myInstanceOf(a, b) {
  let proto = Object.getPrototypeOf(a);
  let prototype = b.prototype;

  while (true) {
    debugger
    if (proto === null) {
      return false;
    }
    if (proto === prototype) {
      return true;
    }
    debugger
    proto = Object.getPrototypeOf(proto);
  }
}

// 测试
let arr = [];
// console.log(myInstanceOf(arr, Array)); // true
// console.log(myInstanceOf(arr, Object)); // true
console.log(myInstanceOf(arr, Function)); // false
