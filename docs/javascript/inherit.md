---
sidebar: auto
---

# 继承

- OO 语言概念，两种继承方式 (接口继承、实现继承)。es 只支持 `实现继承`
- JavaScript 主要通过原型链实现继承，原型链的构建是通过将一个 `类型的实例` 赋值给另一个 `构造函数的原型` 实现的
- 使用最多的是 `组合继承`，原型链继承共享的属性和方法，借用构造函数继承实例属性
- 最有效的是寄生组合式继承，集 `寄生式继承` + `组合继承的优点`

---

> 以下摘录来自《JavaScript 高级程序设计》

## JavaScript 继承的几种方式？

- 组合继承

- 原型式继承

- 寄生式继承

- 寄生组合式继承

- [原型链](/javascript/inherit.html#javascript-实现继承的方式之一-原型链)

- [Object.assign](/javascript/inherit.html#js-实现继承的方式之一-object-assign-own)

- TODO：构造函数

- TODO：class 继承

### JS 实现继承的方式之一：原型链

- 原理：利用原型链让一个引用类型继承另一个引用类型的属性和方法

- 特点：

  - 实例是子类的实例，也是父类的实例

  - 父类增加的方法、原型属性，子类都可以访问

  - 简单常用

- 缺点：

  - 要为子类新增新增属性和方法，必须要在 `new Animal()` (实例化) 再添加

  - 无法实现多继承？

  - 来自原型对象的所有属性都被共享，`Animal` 所有都被 `Dog` 共享

  - 创建子类实例时，无法向父类构造函数传参，即 Dog 无法通过 `new Animal(args)`，尽可给自己的实例，此处是 `blackDog`

```js
// Animal 类
function Animal(name) {}

Animal.prototype.eat = function(food) {
  console.log(this.name + " eat:" + food);
};
function Dog() {}

Dog.prototype = new Animal(); // Animal 实例给Dog 原型

Dog.prototype.name = "Big dog";

const blackDog = new Dog();

console.log(blackDog.name); // 'Big Dog'

console.log(blackDog.eat("beef"));

console.log(blackDog instanceof Dog); // true

console.log(blackDog instanceof Animal); // true

console.log(Dog instanceof Animal); //false, 因为Dog 并非是通过 Animal 实例化的
```

```
  Animal        Dog     blackDog

    new Animal
        ----->
                Dog.prototype

                new Dog
                    ----->
                            blackDog

```

axios 里 utils 有一个方法是为了让 Axios prototype 的方法 copy 的实例上面去，如下：

```js
/**
 * Create an instance of Axios
 * @file /lib/axios.js
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// lib/utils.js

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
```

### JS 实现继承的方式之一：Object.assign () (OWN)

- 最简单的继承方法

- `Object.assign`，尽可混入可枚举的属性，不可追溯原型链，可以用 `Object.getOwnPropertyName()` 方法来获取

- `Object.assign` 可以这样处理 `Object.assign(A.prototype,B.prototype)`

以下为关于这个部分的个人理解：

```js
// 父类
function A() {}

A.prototype.hi = () => {
  console.log("hi");
};

// 子类
function B() {}

B.prototype.b1 = () => {
  console.log("b1");
};
B.prototype.b2 = () => {
  console.log("b2");
};

B.getName = function() {
  console.log("getName b"); // 除非这样才就可以
};
var c = Object.assign(A, B);
console.log(c);

// 1. 上面。此时没有合并 prototype 上面的方法。此时 c 指向 a

// 2. 下面。此时d将同时 继承 a和b的prototype的方法
var d = Object.assign(A.prototype, B.prototype);

console.log(d);

d.constructor.prototype.d1 = () => {
  console.log("di");
};
console.log("d:", d);
console.log("a:", A.prototype);

// 3. 为了干净点
var e = Object.assign(Object.create(null), A.prototype, B.prototype); //这样就不会有乱七八糟的东西了
// var e= Object.assign({},A.prototype,B.prototype)// 有乱七八糟的继承
console.log("e:", e);

// 4. 一个干净的对象
var obj1 = { name: "obj1" };
var obj2 = { name1: "obj2", age: 32 };

console.log(Object.assign(Object.create(null), obj1, obj2));
```

## `[x]继承的方式-借用构造函数/伪造对象/经典继承` (很少用)

> 原理：子类型构造函数内部调用超类型构造函数，通过 apply/call 方法执行新创建对象上执行构造函数

> 缺点：

1. 方法都在构造函数中定义，函数无法复用
2. 超类对子类方法不可见

```js
function SuperType() {
  this.colors = ["r", "g", "b"];
}
function SubType() {
  //继承了SuperType,意思是这里执行了构造函数
  SuperType.call(this)`[3]`; //此处应该怎么样去深刻的理解呢？
  // 1 SuperType.apply(this)`[3]`
  // 2 SuperType.bind(this)()`[3]`//再次执行
}
var instance1 = new SubType();
instance1.colors.push("o");
console.log(instance1.colors); //'r,g,b,o'
var instance2 = new SubType();
instance2.colors.push("v");
console.log(instance2.colors);
```

## `[√]继承的方式-组合继承/伪经典继承`

> 原理：将原型链和借用构造函数的技术组合到一起

```js
function SuperType(name) {
  this.name = name;
  this.colors = ["r", "g", "b"];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
};
function SubType(name, age) {
  //继承属性
  SuperType.call(this, name);
  this.age = age;
}
// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
  console.log(this.age);
  return this.age;
};
var instance1 = new SubType("张三", 30);
instance1.colors.push("o");
console.log(instance1.colors);
instance1.sayName();
instance1.sayAge();

var instance2 = new SubType("李四", 40);
instance2.colors.push("v");
console.log(instance2.colors);
instance2.sayName();
instance2.sayAge();
```

## `继承的方式-原型式继承`

> 所给出的 demo

```js
function object(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
```

> 实质上，浅拷贝：

- 这种方式，导致其中一个实例变更，其他实例也会跟着变更，被共享

```js
function object(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
var p1 = {
  name: "张三",
  colors: ["red", "green", "blue"],
};
var anthor = object(p1);
anthor.name = "贾克斯";
anthor.colors.push("voilet");

var other = object(p1);
other.name = "伊泽瑞尔";
other.colors.push("orange");
console.log(p1.colors);
```

> es5 中的 Object.create () 规范原型继承，

```js
//demo1 传入一个参数此时，和object方法行为相同
var p1 = {
  name: "张三",
  colors: ["red", "green", "blue"],
};
var anthor = Object.create(p1);
anthor.name = "贾克斯";
anthor.colors.push("voilet");

var other = Object.create(p1);
other.name = "伊泽瑞尔";
other.colors.push("orange");
console.log(p1.colors); //还是全出来

// demo2 使用第二个参数，与defineProperties方法第二个参数相同，通过自己的描述符定义，会覆盖原型对上上的同名属性
var p2 = {
  name: "李四",
  colors: ["red", "green", "blue"],
};
var anthor = Object.create(p2, {
  name: {
    value: "Orange",
  },
});
console.log(anthor.name); //Orange
```

### `继承的方式-寄生式继承`

> 一个函数返回 prototype，另外一个函数添加方法，并返回该函数。层层合并，最后工厂函数的模式被新函数继承。

> 缺点：

1. 由于不能复用函数，从而效率比较低，与构造函数模式类似

```js
function object(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
function create(obj) {
  var clone = object(obj);
  clone.sayHi = function() {
    console.log("hi");
  };
  return clone;
}
var p1 = {
  name: "李四",
  colors: ["red", "green", "blue"],
};
var anthor = create(p1);
anthor.sayHi();
```

## `[√]继承的方式-寄生组合式继承`

> 特点：

1. 两次超类型构造函数的调用，一次创建子类型原型式，另外次在子类型构造函数内部
2. 被认为是应用类型最理想的继承范式

```js
function object(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
function inhertPrototype(subType, superType) {
  var prototype = object(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "green"];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name); //第一次调用 SuperType
  this.age = age;
}
inhertPrototype(SubType, SuperType);
SubType.prototype.sayAge = function() {
  console.log(this.age);
};
```

---

## 对象之间“非构造函数方法”。 [非构造函数方法实现]

啥是非构造函数继承？因为两个都是普通对象，无法使用构造函数的方式继承

```js
// 中国人对象
var Chinese = {
  nation: "中国",
};
// 一个医生对象
var Doctor = {
  career: "医生",
};
```

## object () 方法

将子对象的 prototype 属性，指向父对象，从而子对象和父对象一起！！
！！！这 ™ 不是用函数的方式 new 一个构造函数嘛？？？

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var Doctor = object(Chinese);
Doctor.career = "医生"; // 加子对象本身的属性？？
console.info(Doctor.nation); //中国
```

### 浅拷贝

将父对象属性，全部拷贝给子对象，实现继承。有问题的是，父对象有被篡改。

```js
function extendCopy(p) {
  var c = {};
  for (var i in p) {
    c[i] = p[i];
  }
  c.uber = p;
  return c;
}

//usage
const Doctor = extendCopy(chinese);
Doctor.carret = "医生";
console.info(Doctor.nation); // 中国
```

### 深拷贝 (JQuery 当前使用的继承方式)

真正意义上的，对象和数组的拷贝。原理是递归调用“浅拷贝”

```js
function extendDeep(p, c) {
  var c = c || {};
  for (var i in p) {
    if (typeof p[i] === "object") {
      c[i] = p[i].constructor === Array ? [] : {};
      extenDeep(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
}
//usage
var Doctor = extenDeep(Chinese);

// chinese.city=['北京']
// Doctor.city.push('天津')
console.info(Doctor.city); // 北京、天津
console.info(Chinese.city); // 北京
```

## 对象之间“继承的五种方法”。[构造函数实现]

- 构造函数绑定
- prototype 模式
- 直接继承 prototype
- 利用空对象作为中介
- 拷贝继承

#### 构造函数绑定

```js
// 定义一个动画的函数对象
function Animal() {
  this.type = "动物";
}
// 定义一个Dog的函数对象
function Dog(name, color) {
  this.name = name;
  this.color = color;
}

// ？ 如何让猫继承动物？？？？
function Dog(name, color) {
  Animal.apply(this, arguments); //此处的用意是什么? 将父对象的构造函数绑定在子对象上。
  this.name = name;
  this.color = color;
}
var dog1 = new Dog("二哈", "白色");
console.info(dog1);
```

### prototype 模式。

- 每一个 prototype 都有一个构造函数的属性 constructor，并指向它的构造函数
- 每一个实例也有一个 constructor
- 如果替换 prototype 之后，必须为 prototype 的构造函数 constructor 指向它本身，否则会导致紊乱

```js
function Animal() {
  this.type = "动物";
}
function Dog(name, color) {
  this.name = name;
  this.color = color;
}
Dog.prototype = new Animal(); // 将Dog 的原型对象【prototype】对象指向Animal 的实例，完全删除原先的值，并赋予新值。
Dog.prototype.constructor = Dog; // 使得Dog 的原型对象的构造函数指向父级的animal
var dog2 = new Dog("三哈", "绿色");
```

### 直接继承 prototype

确定，Animal.prototype.constructor 等于 Dog

```js
function Animal() {}
Animal.prototype.type = "动物";
function Dog(name, color) {
  this.name = name;
  this.color = color;
}
Dog.prototype = Animal.prototype; //直接继承 Animal的原型对象
Dog.prototype.constructor = Dog;
var cat3 = new Dog("四哈", "黒色");
console.info(cat3.type); // 动物
```

### 利用空对象作为中介[略]

### 拷贝继承

```js
function Animal() {}
Animal.prototyoe.type = "动物";

// 实现拷贝的函数。
function extend(Child, Parent) {
  var p = Parent.prototype;
  var c = Child.prototype;
  for (var i in p) {
    c[i] = p[i];
  }
  c.uber.p;
}
//将函数作用，就是将父对象的prototype对象中属性，拷贝给child对象的prototype对象
extend(Dog, Animal);
var dog4 = new Dog("五哈", "棕色");
console.info(dog4.type); // 动物
```
