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

- [方式一：原型式继承](/javascript/inherit.html#javascript-实现继承的方式之一-原型链)

- [方式二：构造函数](/javascript/inherit.html#)

- [方式三：实例继承](/javascript/inherit.html#x-js-实现继承的方式四-实例继承)

- [方式四：拷贝函数](/javascript/inherit.html#x-js-实现继承的方式五-拷贝继承)

- [方式五：组合继承](/javascript/inherit.html#√-js-实现继承的方式六-组合继承)

- [方式六：寄生组合式继承](/javascript/inherit.html#√-js-实现继承的方式七-寄生组合)

- [方式七：Object.assign](/javascript/inherit.html#js-实现继承的方式之一-object-assign-own)

- [方式八：class 继承](/javascript/inherit.html#)

### JS 实现继承的方式一：原型链

- 原理：利用原型链让一个引用类型继承另一个引用类型的属性和方法。或者说 `父类的实例等于子类的原型`

- 特点：

  - 实例是子类的实例，也是父类的实例

  - 父类增加的方法、原型属性，子类都可以访问

  - 简单常用

- 缺点：

  - 要为子类新增属性和方法，必须要在 `new Animal()` (实例化) 再添加

  - 无法实现多继承？

  - 来自原型对象的所有属性都被共享，`Animal` 所有都被 `Dog` 共享

  - 创建子类实例时，无法向父类构造函数传参，即 Dog 无法通过 `new Animal(args)`，尽可给自己的实例，此处是 `blackDog`

```js
// Animal 类
function Animal(name) {
  this.sleep = function() {
    console.log("sleep");
  };
}

Animal.prototype.eat = function(food) {
  console.log(this.name + " eat:" + food);
};
function Dog() {}

Dog.prototype = new Animal(); // Animal 实例给Dog 原型

Dog.prototype.name = "Big dog";

const blackDog = new Dog();

console.log(blackDog.name); // 'Big Dog'

console.log(blackDog.eat("beef")); // undefined，实例，无法继承父类 Animal prototype 上的方法

console.log(blackDog.sleep());

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

### JS 实现继承的方式二：构造继承

原理：

- 通过改变子类 `this` 指向来调用父级属性和方法

- 使用父类的构造函数来增强子类实例，等于复制父类的实例属性给子类，没有用到原型。

- 通过改变上下文 `this` 来实现

```js
// 父类
function Animal() {
  this.eat = function(food) {
    console.log("===>", this.DogName, food);
  };
}

// 子类
function Dog(name) {
  Animal.call(this);
  this.DogName = name || "I am Dog";
}

const dog = new Dog();

console.log(dog.DogName);
```

### [x]JS 实现继承的方式三：实例继承

原理：

- 为父类实例添加新特性，做为子类实例范围

- 子类返回父类的实例

特点：

- 不限制调用方式，不管是 `new 子类` 还是直接调用 `子类`

缺点：

- 实例是父类的实例，不是子类的实例

- 不支持多继承

```js
function Animal(name) {
  this.name = name || "I am animal";
  this.sleep = function() {
    console.log("animal sleep");

    return "this.sleep";
  };
}

Animal.prototype.eat = function(food) {
  console.log("Animal eat ===>");
  return "eat:" + food;
};
function Pig(name) {
  const instance = new Animal();

  instance.name = name || "instance";
  return instance;
}

const pig = new Pig();

console.log(pig.name); // instance

console.log(pig.sleep()); // this.sleep

console.log(pig.eat("cao")); //eat:cao
```

### [x]JS 实现继承的方式四：拷贝继承

**原理**：

- 增加了时间复杂度来循环将父类子例的属性和值都给了子类 `prototype`

**特点**：

- 支持多继承

**缺点**：

- 效率低，内存高，多余的时间复杂度

- 无法获取不可枚举的属性和方法，因为 `for in` 的关系

```js
function Animal(name) {
  this.name = name || "I am animal";
  this.sleep = function() {
    console.log("animal sleep");

    return "this.sleep";
  };
}

Animal.prototype.eat = function(food) {
  console.log("Animal eat ===>");
  return "eat:" + food;
};

function Pig(name) {
  const animal = new Animal();

  // 将父类 Animal 可枚举的属性都给子类的 prototype
  for (let p in animal) {
    Pig.prototype[p] = animal[p];
  }

  this.name = name || "佩奇";
}

const pig = new Pig();

console.log(pig.name);

console.log(pig.sleep()); // this.sleep

console.log(pig.eat("cao")); //eat:cao

console.log(pig instanceof Animal); // false

console.log(pig instanceof Pig); // true
```

### [√]JS 实现继承的方式五：组合继承

```js
function A() {}
function B() {
  A.call(this);
}
B.prototype = new A();
B.prototype.constructor = B;
```

**原理**：

- 借用 `this` 改变指向，子类原型等于父类实例，子类原型的构造函数指向它自己

- 通过调用父类构造，继承父类属性并保持传参的优点

- 通过父类实例作为子类的原型，实现函数复用

**特点**：

- 弥补构造继承的缺陷，继承实例属性和方法，继承原型属性和方法

- 子类的实例，也是父类的实例

- 不存在属性共享的问题

- 可传参

- 函数可复用

**缺点**：

- 调用两次父类的构造函数，生成两份实例，增加了部分内存

```js
function Animal(name) {
  this.name = name || "I am animal";
  this.sleep = function() {
    console.log("animal sleep");

    return "this.sleep";
  };
}

Animal.prototype.eat = function(food) {
  console.log("Animal eat ===>");
  return "eat:" + food;
};

function Pig(name) {
  Animal.call(this);
  this.name = name || "Pig name";
}

Pig.prototype = new Animal();

Pig.prototype.constructor = Pig; // 修复构造函数指向

const pig = new Pig();

console.log(pig.name);

console.log(pig.sleep()); // this.sleep

console.log(pig.eat("cao")); //eat:cao

console.log(pig instanceof Animal); // true

console.log(pig instanceof Pig); // true
```

### [√]JS 实现继承的方式六：寄生组合

**原理**：

- 通过寄生方式，砍掉父类的实例属性，减少两次调用父类的构造函数多余的两次实例和属性，避免组合继承的缺陷

- 借用立即执行函数，调用中间辅助类

**特点**：

- 调用执行函数，比较完善

**缺点**：

- 需要借助第三个类来做中间转换，实现复杂

```js
function Animal(name) {
  this.name = name || "I am animal";
  this.sleep = function() {
    console.log("animal sleep");

    return "this.sleep";
  };
}

Animal.prototype.eat = function(food) {
  console.log("Animal eat ===>");
  return "eat:" + food;
};

function Pig(name) {
  Animal.call(this);
  this.name = name || "Pig name";
}
(function() {
  // 创造一个没有实例的类

  const Super = function() {};

  Super.prototype = Animal.prototype;

  // 实例作为子类的原型

  Pig.prototype = new Super();
})();

const pig = new Pig();

console.log(pig.name);

console.log(pig.sleep()); // this.sleep

console.log(pig.eat("cao")); //eat:cao

console.log(pig instanceof Animal); // true

console.log(pig instanceof Pig); // true
```

### [x]JS 实现继承的方式七：Object.assign

这也是自己将之归属到继承里的方式之一

**原理**：使用 `Object.assign` 汇合原型上的方法

- 最简单的继承方法

- `Object.assign`，尽可混入可枚举的属性，不可追溯原型链，可以用 `Object.getOwnPropertyName()` 方法来获取

- `Object.assign` 可以这样处理 `Object.assign(A.prototype,B.prototype)`

**缺点**：

- 仅可实现原型上的方法合并，除非，手动再声明它的属性值

```js
function A() {}
A.theName = "A name property";
```

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

### JS 实现继承的方式八：class 继承

```js
class Animal {
  constructor(name) {
    this.name = name;
    this.type = "animal";
  }

  sayHi(str) {
    console.log("str: ", str);
  }

  getThis() {
    return this.name;
  }
}

class Pig extends Animal {
  constructor(name) {
    super(name);
    this.name = this.name;
  }
  getPig() {
    console.log("get Pig");
  }
  getThis() {
    return this.name;
  }
}

const pig = new Pig("hello");
```
