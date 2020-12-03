---
sidebar: auto
---

# 原型与原型链

> 继承是为了方便代码的复用（数值、函数方法、属性），JS 采用了原型方案来实现继承，原型就是继承的实现方式之一！

> 原型与原型链对于一个将走进高级 web 前端来讲，是一个门槛。由于概念性比较多。

**原型**：指的是 JS 函数都有一个叫 `prototype` 的对象属性，用来实现构造函数的实例继承。也就是构造函数的原型，可以为构造函数绑定一些方法和属性，用给实例继承

**`__proto__`**：每个对象都有一个叫 `__proto__` 的内在属性，原型链的对象正是依靠此属性连接

**原型链**：作为一个对象，当访问其中一个属性或方法时，如果当前对象找不到，JavaScript 引擎将会访问这个对象 `__proto__` 属性所指向上一个对象上，一层一层往上找，直至这个链表结束

```js
function A() {} // function 声明

const a = new A(); // A 即为构造函数、a 实例化

console.log(typeof a); // "object"

console.log(typeof A); // "function"

console.log(a.prototype); // undefined

console.log(a.__proto__); // 指向构造函数 A constructor

console.log(a.__proto__ === A.prototype); // true

console.log(a.__proto__.constructor === A); // true

console.log(a.constructor === A); // true
```

## 概念定义

- `prototype`

```js
/*例子demo*/
function Animal(name) {
  this.name = name;
  this.getName = function() {
    return this.name;
  };
}

function Cat(name, age) {
  Animal.call(this, name);
  this.age = age || 1;
  this.meow = function() {
    return "name:" + this.getName() + "\n" + "age:" + this.age;
  };
}
const cat = new Cat("Lily", 2);
console.log(cat.meow());
/**
 *@desc 注释解析 demo
 */
// 声明一个函数Animal，这里一定要入参name 值，否则函数里面的this 是一个undefined
function Animal(name) {
  this.name = name; // 实例会有一个name 属性和 一个getName的方法，会返回name的值
  this.getName = function() {
    return this.name;
  };
  //此时的this > Cat={name:Lily,age:2,getName:function(){},meow:function(){}}
}

// 声明一只猫
function Cat(name, age) {
  //通过call改变上下文的方法，去入参Lily 去调用 Animal方法，此时入参的this 是什么？!!!
  // name 这里传递给函数Animal，而使用function 声明的函数，都是函数对象，它就是一个object
  Animal.call(this, name);
  this.age = age || 1;
  this.meow = function() {
    return "name:" + this.getName() + "\n" + "age:" + this.age;
  };
}
const cat = new Cat("Lily", 2);
console.log(cat.meow());
```

- `__proto__`
- `constructor`

```js
/*定义一个函数test*/

function test() {
  console.log("I am test");
}
test.children = "Leo";

/* 这时候如何取出Leo 的值？*/
test.children;

/* 假如很多呢？*/
test.prototype.constructor.children;
```

## 构造函数

## JS 原型继承的几种方法

## 闭包(closure)`函数`

> 定义：指 有权访问另外一个函数作用域中变量的函数！

- 闭包只能取到包含函数中任何变量的最后一个的值

```js
//闭包，不符合预期
function test() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    arr[i] = function() {
      console.log(i);
    };
  }
  return arr;
}
var myArr = test();
for (var j = 0; j < 10; j++) {
  myArr[j]();
}
```

```js
// 立即执行函数解决闭包
function test() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    (function(j) {
      arr[j] = function() {
        console.log(j);
      };
    })(i);
  }
  return arr;
}
var myArr = test();
for (var j = 0; j < 10; j++) {
  myArr[j]();
}
```

闭包的特点

- 闭包，是指有权访问另外一个函数作用域中变量的函数。a 函数内，创建一个 b 函数。
- 指函数内部保留变量，被另外一个函数访问
- 有权访问另外一个函数作用域内变量的函数都是闭包。
- 变量被引用着，就不会被回收
- 技术上，所有 js 函数都是闭包，都是对象，关联到作用域链
- 造成原始作用域链不释放，造成内存泄露

闭包的场景

- 闭包替代全局变量
- 函数外或其他函数中访问某一个函数内部参数
- 函数执行之前，为要执行后一个函数提供具体的参数
- 为函数执行之前提供质优在函数执行或引用时才能知道的具体参数
- 为节点循环绑定 click 事件，在事件函数中使用档次循环的值或节点，而不是最后一次循环的值或节点

```js
```

- 暂停执行（怎么理解）
- 包装相关功能

```js
function a() {
  function b() {}
}
//1、demo1
function a() {
  var n = 0;
  function b() {
    n++;
    console.info(n);
  }
  b();
  b();
}
a(); // 1 //2
//2、demo2
function f() {
  var n = 0;
  this.inc = function() {
    n++;
    console.info(n);
  };
}

var c = new a();
c.inc(); //1
c.inc(); //2
//3、demo3
function f() {
  var n = 0;
  function inc() {
    n++;
    console.info(n);
  }
  return inc;
}

var c = new f();
c(); //1
c(); //2
```

1. 如何避免闭包?
2. 闭包的应用场景?

---

> Hello world ！以下为技术题目：

---
