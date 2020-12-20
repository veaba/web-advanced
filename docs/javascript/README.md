---
sidebar: auto
---

# JavaScript 学习指南/目录

> 基于本人学习经历，尝试写一篇零基础的 JavaScript 新手指南

## 网页中的 JavaScript

## 浏览器控制台中的 JavaScript

## [Node.js 中的 JavaScript ](/node/)

## [有类型注释的 JavaScript 超集 TypeScript](/typescript/)

## [BOM（Browser Object Mode）与浏览器交互的接口](/javascript/bom)

## [DOM（Document Object Mode）与文档交互的接口](/javascript/dom)

## 标准化的核心 ECMAScript

## [基础](base)

## 关键字与保留字

每种编程语言都有自己的关键字，这是必须的，为什么非得要是必须的呢？你猜。

### 关键字、保留字分类

### ECMA-262 保留字

### 第五版非严格模式下缩减为

### 严格模式下，保留字限制

## 作用域

- 什么叫作用域？
- 怎么改变作用域？

## 类型

**基本类型**：

- `null`

- `undefined`

- `string`

- `number`

- `boolean`

- `symbol`

**引用类型**：

- `object`

  - `function` （都是属于 `object`）

  - `array` （都是属于 `object`）

### 类型转换

### 类型判断

```js
const nul = null;
const undefine = undefined;
const bool = true;
const num = 2020;
const str = "hello world";
const sys = Symbol(2020);
```

**typeof 判断**：

```js
const nul = null;
const undefine = undefined;
const bool = true;
const num = 2020;
const str = "hello world";
const sys = Symbol(2020);

const obj = { name: "hello" };
const fn = function() {};
const arr = [2020, 12, 20];

console.log(typeof nul); // object
console.log(typeof undefine); //undefined
console.log(typeof bool); //boolean
console.log(typeof num); // number
console.log(typeof str); // string
console.log(typeof sys); // symbol

console.log(typeof obj); // object
console.log(typeof fn); // function
console.log(typeof arr); // object
```

**instanceof**：

- 用于检测引用类型，如 `array`、`object`、`function`

```js
console.log(obj instanceof Object); // true
console.log(fn instanceof Function); // true
console.log(arr instanceof Array); // true
```

**constructor**：

- 由于`constructor` 是可被改变的，所以在这种方式并不安全

```js
console.log(bool.constructor === Boolean); // true
console.log(num.constructor ===  Number); // true
console.log(str.constructor ===  String); // true
console.log(obj.constructor ===  Object); // true
console.log(fn.constructor ===  Function); // true
console.log(arr.constructor ===  Array); // true
console.log(sys.constructor ===  Symbol); // true

console.log(nul.constructor ===null); // error
console.log(undefine.constructor undefined); // error
```

**Object.prototype.toString.call**：

- 较为安全判断 `js` 数据类型

```js
console.log(Object.prototype.toString.call(nul));      // [object Null]
console.log(Object.prototype.toString.call(undefine)); // [object Undefined]
console.log(Object.prototype.toString.call(bool));     // [object Boolean]
console.log(Object.prototype.toString.call(num));      // [object Number]
console.log(Object.prototype.toString.call(str));      // [object String]
console.log(Object.prototype.toString.call(sys));      // [object Symbol]
console.log(Object.prototype.toString.call(obj));      // [object Object]
console.log(Object.prototype.toString.call(fn));       // [object Function]
console.log(Object.prototype.toString.call(arr));      // [object Array]
```

## [继承](inherit)

## 事件

## 原型

## 公开常用的 API

### Blob 对象

### 多媒体对象

## HTTP

## ajax

## 设计模式

## 数组

## 函数

## 对象

## 字符串

## 数字

## 正则

## this

## 类

## 面向对象

## 声明

## 内置对象

## 常用技巧

## 深浅拷贝

由于 JS 存在值引用的数据类型，如 Object 、Array，存在了赋值过程，被一同改变值的引用

```js
const a = { name: "Li" };

const b = a;

b.name = "Sa";

console.log(a, b); // 两者都是 Sa
```

### 浅拷贝

仅处理第一个层级

**通过 `Object.assign` 解决**：

```js
const a = { name: "Li" };
const b = Object.assign({}, a);
b.name = "Sa";
console.log(a, b);
```

**通过对象展开符 `...`**：

```js
const a = { name: "Li" };
const b = { ...a };
b.name = "Sa";
console.log(a, b);
```

### 深拷贝

**通过`JSON.parse(JSON.stringify(obj))`**：

```js
const a = {
  name: "Li",
  location: {
    country: "China",
  },
};

const b = JSON.parse(JSON.stringify(a));

b.location.country = "Thailand";

console.log(a, b);
```

弊端：

- 忽略 `undefined`
- 忽略 `symbol`
- 无法序列化函数
- 不能解决循环应用的对象

```js
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
};
obj.c = obj.b;
obj.e = obj.a;
obj.b.c = obj.c;
obj.b.d = obj.b;
obj.b.e = obj.b.c;
let newObj = JSON.parse(JSON.stringify(obj));
console.log(newObj);
```

**[lodash deepClone](https://lodash.com/docs##cloneDeep)**：

```js
function structuralClone(obj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = (ev) => resolve(ev.data);
    port1.postMessage(obj);
  });
}

var obj = {
  a: 1,
  b: {
    c: b,
  },
}(
  // 注意该方法是异步的
  // 可以处理 undefined 和循环引用对象
  async () => {
    const clone = await structuralClone(obj);
  }
)();
```

### TODO 手写深拷贝函数

## 柯里化

把接受多个参数的函数变换成为接受一个单一的参数的函数

`foo(a,b,c)` => `foo(abc)`
