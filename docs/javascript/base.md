---
sidebar: auto
---

# 基础

> JavaScript 是起初是运行在浏览器网页里面的代码，后发展为可以跨平台的编程语言。

## 概念

- JavaScript 组成
  - ECMAScript 语法核心
  - DOM 文档模型对象
  - BOM 浏览器模型对象

## 知识点

- 箭头函数不能调用 `Function` 的 `bind`、`call`、`apply`，没有继承 `Function`
- `window.onerror` 方法默认情况下无法获取跨域脚本的报错详情
- 调用拷贝构造函数的三种情况：
  - 用类的一个对象去初始化另一个对象是
  - 当函数的形参是类的对象时，如果是引用传递则不会调用
  - 当函数的返回值是类的对象或引用时

## 语句

- switch
  - case 必须紧接着跟值/变量/简单表达式/&&/function，不确定能使用||

```js
// 以下产生一个 bug，不管怎么样使用关键字 name 声明一个值，只能是 string 类型！！！
var name = '22';
var tt = '22';
var name1 = 22;
var tt1 = 22;
// demo1
switch (name) {
  // 终止错误，合并两个条件
  case '22':
  case 'AbortError':
  default:
  console.info('NotFoundError:找不到满足错误的类型');
}
//demo2
switch (name) {
  // 终止错误，合并两个条件
  case tt:
  case 'AbortError':
  default:
  console.info('NotFoundError:找不到满足错误的类型');
}
//demo3
  switch (name1) {
  // 终止错误，合并两个条件,数值为 number 类型时候，无法进入此条件
  case tt1:
  case 'AbortError':
  default:
  console.info('NotFoundError:找不到满足错误的类型');
}
```

## 数据类型

## 静态方法

> xxx.prototype 在 constructor 里面就看到了，

## 正则 RegExp

## 字符串 String

## 数字 Number

- 除法。先转为数字再进行除法操作

```js
console.log('40' % 7); // 等于多少? 取模
console.log('40' / 7); // 等于多少? 取模
```

## 数组 Array

- 能用 forEach() 做到的，map() 同样可以。反过来也是如此。
- map() 会分配内存空间存储新数组并返回，forEach() 不会返回数据。
- forEach() 允许 callback 更改原始数组的元素。map() 返回新的数组。
- forEach 跳过空元素，但不跳过 `undefined`

### 实例方法-不改变原始数组的方法

- `Array.prototype.concat(arr1, arr2,...,arr)`

  - 入参必填，可以是数组对象
  - 返回新数组
  - 链接数组

- <sup>es6</sup>`Array.prototype.entries()`

  ```js
  var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
  var temp = fruits.entries();
  for (let item of temp) {
    console.log(item); /*[key,value]*/
  }
  console.log(temp); /*/Array Iterator {}*/
  console.log(fruits); /*不改變*/
  ```

- <sup>es6</sup>`Array.prototype.every(function(currentValue,index,arr){},thisArr)`

  - 检测数组所有元素都符合指定条件，通过函数条件
  - 如果有一个不满足条件，则会返回 false，且剩余不再检测
  - 如果全部都满足条件则返回 true

    ```js
    var ages = [32, 33, 16, 40];
    function checkAdult(age) {
      console.log(age); /*如果没有return 则返回第一个，然后打断*/
      /*     return age >= 18;*/
    }
    ages.every(checkAdult);
    ```

- `Array.prototype.filter(function(){currentValue,index,arr},thisValue)`
  、

  - 过滤数组
  - 检查指定数组中符合条件的所有元素
  - 不检测空数组
  - 不改变原数组

- <sup>es6</sup>`Array.prototype.find(function(){currenValue,index,arr},thisValue)`

  - 查找的意思
  - 判断数组第一个元素的值
  - 每个元素都调用一次函数
  - 如果条件满足 true，则返回符合条件的元素，之后的不再执行
  - 如果都没有符合条件则返回 undefined

- `Array.prototype.map(function(currentValue,index,arr){},thisValue)`

  - 返回新数组，比如对每个数组都\*2
  - 返回新数组，数组元素为原始数组元素调用函数处理后的值
  - 原始数组次序依次处理元素
  - 不对空数组进行检测
  - 不改变原数组，返回新数组

  ```js
  /*demo1*/
  var arr = [543153, 1231, 3215, 12, 12, 42, 45, 4555, 5];
  var arrT = arr.map(function (value, index, arr) {
    console.log(value);
    /*/ return value *2*/
  });
  console.log(
    arrT
  ); /*/[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]*/

  /*demo2*/
  var ages = [32, 33, 16, 40];

  function checkAdult(age) {
    return age >= 18;
  }
  var mapTemp = ages.map(checkAdult);
  console.log(mapTemp); /*[true,true,false,true]*/
  var filterTemp = ages.filter(checkAdult);
  console.log(filterTemp); /*[32,33,40] 返回如何条件原数组的元素*/
  ```

- `Array.prototype.forEach(function(currentValue,index,arr){},thisValue)`

  - 常用语，逐个做事情，打印，写入数据库
  - forEach() 方法对数组每个元素执行一次提供的函数
  - 对空数组不会执行回调函数
  - es3 开始
  - 返回值 undefined
  - 不能使用 return，只针对每个元素调用函数

  ```js
  var arr = [561531, 1231, 112, 12, 2];
  arr.forEach(function (currentValue, index, arr2r) {
    console.log(this); //String {"ttt"}
  }, 'ttt');
  ```

### 实例方法-改变原始数组的方法 (一般改变索引值的，都会改变原始数组)

- `Array.prototype.copyWithin()`copyWithin

  - 从数组指定元素拷贝元素到数组的另外一个指定位置

  ```js
  var arr = ['西瓜', '赵铁柱', '王尼玛'];
  var temp = arr.copyWithin(2, 1);
  console.log(arr, temp); //["西瓜", "赵铁柱", "赵铁柱"] ,["西瓜", 西瓜"赵铁柱", "赵铁柱"]
  ```

- <sup>es6</sup>`Array.prototype.fill('帅哥',start,end)`
  - 填充数组

```js
var arr = ['西瓜', '赵铁柱', '王尼玛'];
var temp = arr.fill('帅哥'); //不入参的话其他不变
console.log(arr, temp);
```

### 静态方法

## 数据类型构造属性及方法 (静态)

- 疑问：比较 MediaSource.prototype 与 Array.isArray()

> Array.isArray() `静态方法?`，可在 chrome 打印出来并不是灰色
> ![Array.isArray()](/images/isArray.jpg)

> MediaSource.isTypeSupported() `静态方法`，在 chrome 打印出来是亮色
> ![MediaSource.isTypeSupported](/images/isTypeSupported.jpg)

> 共性

| 类型或者构造函数 | arguments | caller | length | name    | prototype | **proto** | [[Scopes]] |
| ---------------- | --------- | ------ | ------ | ------- | --------- | --------- | ---------- |
| String           |           |        | 1      | String  |           |           |            |
| Boolean          |           |        | 1      | Boolean |           |           |            |
| Number           |           |        | 1      | Number  |           |           |            |
| Object           |           |        | 1      | Object  |           |           |            |
| Array            |           |        | 1      | Array   |           |           |            |
| Symbol           |           |        | 0      | Symbol  |           |           |            |
| MediaSources     |           |        |        |         |           |           |            |
|                  |           |        |        |         |           |           |

- String
  - fromCharCode
  - raw
- Boolean
- Number
  - EPSILON:2.220446049250313e-16
  - MAX_SAFE_INTEGER: 9007199254740991
  - MAX_VALUE:1.7976931348623157e+308
  - MIN_SAFE_INTEGER: -9007199254740991
  - MIN_VALUE:5e-324
  - NEGATIVE_INFINITY: -Infinity
  - NaN: NaN
  - POSITIVE_INFINITY: Infinity
  - isFinite()
  - isInteger()
  - isNaN()
  - isSafeInteger()
  - parseFloat()
  - parseInt()
- Object
  - assign()
  - create()
  - defineProperties()
  - defineProperty()
  - entries()
  - freeze()
  - getOwnPropertyDescriptor()
  - getOwnPropertyDescriptors()
  - getOwnPropertyNames()
  - getOwnPropertySymbols()
  - getPrototypeOf()
  - is()
  - isExtensible()
  - isFrozen()
  - isSealed()
  - keys()
  - preventExtensions()
  - seal()
  - setPrototypeOf()
  - values()
- Array
  - from()
  - isArray()
  - of()
  - Symbol(Symbol.species)
  - get Symbol(Symbol.species):()
- Symbol
  - asyncIterator
  - for()
  - hadInstance
  - isConcatSpreadable
  - iterator
  - keyFor()
  - match
  - replace
  - search
  - species
  - split
  - toPrimitive
  - toStringTag
  - unscopables
- WebSocket
  - `CLOSED:3`
  - `CLOSING:2`
  - `OPEN:1`
  - `CONNECTING:0`
- MediaSources
  - `isTypeSupported()` 静态方法

## 函数

> 特点：

- 函数声明提升

```js
a();
const a = function () {
  console.log('aaa');
};
function a() {
  console.log('bbb');
}
a();
```

### 一种危险的函数使用

为什么说它危险？

> 应该使用函数表达式

```js
if (true) {
  function say() {
    console.log('hi');
  }
} else {
  function say2() {
    console.log('no hi!');
  }
}
```

### 递归

---

> 以下来自红宝石：

- 使用 `arguments.callee`，指向正在执行函数的指针

```js
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
// ①如果设置中途转了一层
var authorFactorial = factorial;
factorial = null;
console.log(authorFactorial(4)); //error
// ② 上面可以变为
function factorial1(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1); //但是在严格模式下，无法访问这个属性，所以会导致错误
  }
}
// ③ 更有效的方案，匿名函数的方式
var factorial2 = function f(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * f(num - 1);
  }
};
```

---

> 以下来自自己的摸索和总结：

`函数自己调用自己,就是递归`，由于递归需要具备超前的临时计算能力，对于我来讲，是很难一个学习难点。随后在网络上找到一个方法、函数来加深理解。

```js
// 用递归 来求 5 的阶乘 ，翻译过来就是 1*2*3*4*5 =120
// n! = n * (n-1)!

// 定义一个函数，用于求 n 的阶乘
function func(n) {
  if (n === 1) {
    return 1;
  }

  // func(n-1) 因为传递的参数是 n-1,那么就是求 (n-1) 的阶乘
  return n * func(n - 1);
}
console.log(func(5));

// 所以计算的结果是
// 第一步 return 5 *(func(4))
// 第二步 return 5 *(4*(func(3)))
// 第二步 return 5 *(4*3*2(func(2)))
// 第二步 return 5 *(4*3*2(*1*func(1)))
// 第二步 return 5 *(4*3*2*1) = 120
```

> 再看一个斐波那契数列的递归数列，加深对递归概念的理解，小于 2 则 return 1，公式 f[n]=f[n-1]+f(n-2) 递归结束条件 f[1]=1;f[2]=1

- 基本规则

| 序列 | 值  |
| ---- | --- |
| 0    | 1   |
| 1    | 1   |
| 2    | 2   |
| 3    | 3   |
| 4    | 5   |
| 5    | 8   |
| 6    | 13  |
| 7    | 21  |
| 8    | 34  |
| 9    | 55  |
|      |     |

```js
/**
 * @desc for 循环实现 ，借用三个变量来存放
 * */
var fibFor = function (n) {
  let n1 = 1,
    n2 = 1,
    n3 = 0;
  if (n < 2) {
    return 1;
  }
  for (let i = 0; i < n - 1; i++) {
    n3 = n1 + n2;
    n1 = n2;
    n2 = n3;
  }
  return n3;
};
console.info(fibFor(9));

/**
 * @desc 斐波那契数列 学习，递归函数解析
 *
 */
var fib = function (n) {
  if (n < 2) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
};
console.info(fib(9));
fib(8);
// 入参 8
```

| 序列   | 值                                                                                                                                                                                                                                                                                    |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 第一步 | fib(7)+fib(6)                                                                                                                                                                                                                                                                         |
| 第二步 | fib(6)+fib(5) + fib(5)+fib(4)                                                                                                                                                                                                                                                         |
| 第三步 | fib(5)+fib(4) + fib(4)+fib(3) + fib(4)+fib(3) + fib(3)+fib(2)                                                                                                                                                                                                                         |
| 第四步 | fib(4)+fib(3) + fib(3)+fib(2) + fib(3)+fib(2) + fib(2)+fib(1) + fib(3)+fib(2) + fib(2)+fib(1) + fib(2)+fib(1) + fib(1)+fib(0)                                                                                                                                                         |
| 第五步 | fib(3)+fib(2) + fib(2)+fib(1) + fib(2)+fib(1) + fib(1)+fib(0) + fib(2)+fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(2)+fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1)+ fib(1)+fib(0) + fib(1) + fib(1) + fib(0)                                                             |
| 第六步 | fib(2)+fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) +fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1)+ fib(1)+fib(0) + fib(1) + fib(1) + fib(0)          |
| 第七步 | fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) +fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1)+ fib(1)+fib(0) + fib(1) + fib(1) + fib(0) |
| 第八步 | 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1                                                                                                                                                 |
| 第九步 | 去掉空格之后 我们得到一个结果 1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1 = 34                                                                                                                                                                                |

![斐波那契数列](/images/fib.jpg '斐波那契数列')

### 立即执行

> 因为立即执行函数和外部的全局作用域的命名空间不同，于是 name1 和 this.name1 属于不同的空间，私有命名空间

```js
/*立即函数的几种声明方式 1  匿名函数包括在一个括号运算符*/
(function (test) {
  console.log(test);
})(123)(
  /*立即函数的几种声明方式 2  匿名函数跟一个效果好。并包括一个原算法*/
  (function (test) {
    console.log(test);
  })(123)
);

/*demo*/
var name1 = 'World!';
(function (window) {
  console.log(window.name1, this.name1, name1); //window,window,undefined
  if (typeof name1 === 'undefined') {
    var name1 = 'JACK';
    console.log('hello,' + name1);
  } else {
    console.log('Goodbye' + name1);
  }
})(window);
```

## 前端路由实现

> API，利用两个 API 修改 URL，而不会引起页面的刷新

- 方式一 pushState ajax
  - history.pushState 增加一条新的记录
  - history.replaceState 替换当前的历史记录
- 方式二 hash+ajax
  - “#” 锚点，web 不会解析 hash，“#” 后面，web 服务会被自动忽略
  - js 可以通过 location.hash 读取，解析后可以实现响应不同的路径逻辑
  - hashchange 监听 hash 变化触发事件

## 全局函数

`http://www.w3school.com.cn/jsref/jsref_obj_global.asp`

- Global `ES 内置单体对象` 全局对象

| 属性           | 方法                 | 描述                  |
| -------------- | -------------------- | --------------------- |
|                | isNaN()              |                       |
|                | isFinite()           |                       |
|                | parseInt()           |                       |
|                | parseFloat()         |                       |
|                | encodeURI()          | `对空格转换`          |
|                | decodeURI()          |                       |
|                | encodeURIComponent() | `非标准字符全部编码`  |
|                | decodeURIComponent() |                       |
|                | eval()               |                       |
| undefined      |                      | `特殊值`              |
| NaN            |                      | `not a number 特殊值` |
| Infinity       |                      | `特殊值`              |
| Object         |                      | `构造函数`            |
| Array          |                      | `构造函数`            |
| Function       |                      | `构造函数`            |
| Boolean        |                      | `构造函数`            |
| String         |                      | `构造函数`            |
| Number         |                      | `构造函数`            |
| Date           |                      | `构造函数`            |
| RegExp         |                      | `构造函数`            |
| Error          |                      | `构造函数`            |
| EvalError      |                      | `构造函数`            |
| RangeError     |                      | `构造函数`            |
| ReferenceError |                      | `构造函数`            |
| SyntaxError    |                      | `构造函数`            |
| TypeError      |                      | `构造函数`            |
| URIError       |                      | `构造函数`            |
|                |                      |                       |

- Math `ES 内置单体对象`
  比较数组大小

```js
const arr = [11231, 238, 5, 21];
Math.max.apply(Math, arr);
```

| 属性    | 方法           | 描述                                   |
| ------- | -------------- | -------------------------------------- |
| E       |                | `自然对数的底数，常量e的值`            |
| LN10    |                | `10的自然对数`                         |
| LN2     |                | `2的自然对数`                          |
| LOG2E   |                | `2为底的e的对数`                       |
| LOG10E  |                | `10为底的e的对数`                      |
| PI      |                |                                        |
| SQRT1_2 |                | `1/2的平方根，2的平方根的倒数`         |
| SQRT2   |                | `2的平方根`                            |
|         | min()          | `(1,3,9,4)`                            |
|         | max()          | `(9,3,11)`                             |
|         | ceil()         | 向上取舍                               |
|         | floor()        | 向下取舍                               |
|         | round()        |                                        |
|         | random()       | `0-1随机数，技巧：Math.random()*100+1` |
|         | abs(num)       | `绝对值`                               |
|         | exp(num)       | `Math.E的num次幂`                      |
|         | log(num)       |                                        |
|         | pow(num,power) |                                        |
|         | sqrt(num)      | `num的平方根`                          |
|         | acos(x)        | `x的反余弦值`                          |
|         | asin(x)        | `x的反正弦值`                          |
|         | atan()         | `x的反正切值`                          |
|         | atan2(y,x)     | `y/x的反正切值`                        |
|         | cos(x)         | `x的余弦值`                            |
|         | sin(x)         | `x正弦值`                              |
|         | tan(x)         | `x正切值`                              |
|         |                |                                        |

- decodeURL

## 枚举 [`new`] symbol

## 面向对象，程序设计

> 一个标志，类的概念

| 概念/方法                                     | 描述                         |
| --------------------------------------------- | ---------------------------- | --- |
| 数据属性                                      |                              |
| 访问器属性                                    |                              |     |
| Object.defineProperty(obj,name，{})           | `定义单个`                   |
| Object.defineProperties(obj，{xx：{value:1}}) | `同时编辑多个，定义多个属性` |
| Object.getOwnPropertyDescriptor()             | `取得 给定属性的描述符`      |
|                                               |                              |

### [√] 创建对象-混淆大法！组合使用构造函数 +原型模式！`目前最广泛，最好的方式`

> 构造函数写属性，方法则用原型继承

```js
function Fn(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.test = ['man', 'woman'];
}
Fn.prototype = {
  constructor: Fn,
  sayName() {
    return this.name;
  },
};
var p1 = new Fn('xsa', 'tt', 'te');
var p2 = new Fn('xsa2', 'tt2', 'te2');
p1.test.push('son');
console.info(p1.test === p2.test);
```

### 创建对象-动态原型模式

> 缺点

- 不能使用字面量重写原型，否则会切断联系
  > 通过 if 来判断

```js
function Fn(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  if (typeof this.sayName !== 'function') {
    Fn.prototype.sayName = function () {
      return this.name;
    };
  }
}
```

### [x] 创建对象-寄生构造函数模式

> 比工厂模式多了一个 new，使用工厂模式 new 出来

> 特点：

1. 返回的对象与构造函数或者与构造函数的原型属性之间没有关系 `[1]`
2. 构造函数 return 的对象与构造函数外部创建的对象没有什么不同 `[2]`
3. 不能使用 instanceof 操作符确定对象类型
4. 在红宝石上书，不推荐此模式

```js
function factory(name, age, job) {
  // const obj=Object.create({})//带有普通对象的__proto__ 类似  const obj = new Object()
  // const obj=Object.create(null)//则没有_proto__！
  const obj = {}; //此处不一定是Object对象，可以是Array对象，具体看业务操作
  obj.age = age;
  obj.name = name;
  obj.job = job;
  obj.sayName = function () {
    return this.name;
  };
  return obj;
}
//use
const p = new factory('张三', '28', '前端狗');
```

### 创建对象-稳妥构造函数模式

> 由道格拉斯·克罗克福斯发明了该模式——稳妥对象

> 特点：

1. 遵从寄生构造函数类似模式
2. 新创建对象方法的实例不引用 this
3. 不适用 new 操作调用构造函数
4. 丢掉无关属性或者说是丢掉无效入参
5. 没有其他方式可以访问其数据成员
6. 为安全性考虑的 js 设计模式

```js
function durable(name, age, job) {
  var obj = {};
  // todo 定义私有变量和属性
  obj.sayName = function () {
    console.log(name);
  };
  return obj;
}
// use
var p1 = durable('柳十', '41', 'CFO管钱的');
p1.sayName();
```

### new 操作符都干吗了？

1. 创建一个新对象
2. 构造函数的作用域赋值给新对象，this 指向这个新对象
3. 执行构造函数代码，为这个新对象添加属性
4. 返回新对象
   [查看更多 js 中的 new() 到底做了些什么？？](https://www.cnblogs.com/faith3/p/6209741.html)

## 私有变量

> 如何让外部的函数访问到内部的变量和设置

- 通过构造函数的方式

```js
function Main(name) {
  this.getName = function () {
    return name;
  };
  this.setName = function (value) {
    name = value;
  };
}
var p1 = new Main('李四');
console.log(p1.getName());
p1.setName('王五');
console.log(p1.getName());
```

### this

- this 总是指向函数的直接调用者 (非间接)
- 有 new 关键字，指 new 出来的那个对象 (构造函数的实例，一般)
- 事件中，指触发这个事件的对象。
- 特殊的。IE 中的 attachEvent 的 this 总是指向全局的 window
- 闭包中 `this` 是 window 对象
- dom 实例，this 指向这个 dom 对象实例

> this 竟然不是上一个函数对象

- 自动取得两个特殊的变量
- 内部搜索到 this arguments 时，只会搜索到其活动对象为止，因此 `永远不可能直接访问外部函数的中的两个变量`

```js
var name = 'I am window';
var object = {
  name: 'I am object',
  getName: function () {
    return function () {
      console.log(this);
      return this.name;
    };
  },
};
console.log(object.getName()()); //竟然是window！！！
```

> `将外部作用域中的this 对象，保存在一个闭包能够访问到的变量力，就可以让闭包访问到该对象了`!!

```js
var name = 'I am window';
var object = {
  name: 'I am object',
  getName: function () {
    var that = this;
    return function () {
      console.log(this);
      return that.name;
    };
  },
};
//demo1
var object = {
  name: 'I am object',
  getName: function () {
    return function () {
      console.log(this);
      return that.name;
    }.call(this); //bind 、call
  },
};
```

## 以下三个方法都是为了改变上下文存在而是用的

- <sub>[绑定-this-的方法](##索引__关于本作知识引用来源sub标签)</sub>

- call 方法。调用一个函数，具有一个指定 this 值和分别地提供参数 [MDN 查看更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

  - 语法 `function.call(thisObj,args...)`，如果 thisObj 是 null，则是全局对象，args 作为参数传递给 `function`

- apply 方法。调用一个函数，具有指定 this 的值，以及作为一个数组提供的参数。[MDN 查看更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

- bind 方法。创建一个新的函数。被调用时，其 this 关键字设置为提供的值，在调用时新函数时，在任何提供之前一个给定的参数序列。[MDN 查看更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

