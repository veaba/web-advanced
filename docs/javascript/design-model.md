# JavaScript

## 发布订阅模式 (观察者模式)

- 一种对象间一对多的依赖关系
- 当一个对象的状态发送改变时，所有依赖它的对象都得到状态改变的通知

### 订阅+发布过程

- 把自己想订阅的**事件**注册 (subscribe) 到调度中心 (event channel)

- 发布者 (publisher) 发布该事件到 (publish event) 到调度中心

- 事件触发时，调度中心统一调度订阅者注册到调度中心的处理代码

### 问题

1. 订阅者是如何订阅？

> 调用事件对象中的注册事件，将自己事件名和执行函数，注册到注册中心中。然后出发事件发布即可执行订阅上的事件代码块


### 创建对象-工厂模式

> 普通方式，字面量方式，代码量比较多

> 优点：一个函数，即可创建对象

1. 只要一个函数，可多次调用
   > 缺点：
1. 没有解决对象识别 (知道一个对象的类型？？)
1. 返回默认的，如果不处理则会返回固定的

```js
function factory(name, age, job) {
  // const obj=Object.create({})//带有普通对象的__proto__ 类似  const obj = new Object()
  // const obj=Object.create(null)//则没有_proto__！
  const obj = {};
  obj.age = age;
  obj.name = name;
  obj.job = job;
  obj.sayName = function () {
    return this.name;
  };
  return obj;
}
//use
const p = factory('张三', '28', '前端狗');
```

### 创建对象-构造函数

> 优点：

1. 没有显示地创建对象
2. 直接将方法和属性赋值给 this 对象
3. 没有 return
   > 缺点：
4. 每个方法都要在每个实例上重新创建一边，`p1.sayName===p2.sayName` 同样任务，但两遍，两者不等于，证明这一点
   > 特点：
5. 大写构造函数首字母，惯例
6. 它的实例都有一个 `constructor` (构造函数) 属性，指向他的构造函数

```js
function ConstructorFn(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    return this.name;
  };
}
// use
const p1 = new ConstructorFn('李四6i7', '29', '后端喵');
// 监测类型
console.log(p1 instanceof ConstructorFn); //true,同样都是Object的实例
```

> 当做构造函数，见上面

> 当普通函数

```js
ConstructorFn('李四6i7', '29', '后端喵');
window.sayName();
```

> 在另外一个对象的作用域中调用

```js
const ob = {};
ConstructorFn.call(ob, '王五', '30', 'python');
// ConstructorFn.apply(ob,["王五",'30','python']) 或者这样

on.sayName();
```

> 缺点 (原型模式解决)：

1. 在全局作用域下声明函数，只能被某个对象调用，意思是，专属的函数
2. 而如果需要定义多个函数的，那么你需要声明多个函数。。。
3. 如何对构造函数进行优化呢？属性和函数定义区分开，

```js
function ConstructorFn(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = sayName;
}
function sayName() {
  return this.name;
}
const p1 = new ConstructorFn('孙六', '31', '产品汪');
```

#### 创建对象-原型模式

> 特点：

1. 所有实例都共享原型的属性和方法
   > 优点：
1. 修改单一个实例，不会影响到其他实例
1.

> 缺点：

1.

```js
function Proto() {}
Proto.prototype.name = '刘七';
Proto.prototype.age = '32';
Proto.prototype.job = '设计狮';
Proto.prototype.sayName = function () {
  return this.name;
};
var p1 = new Proto();
var p2 = new Proto();
p1.sayName === p2.sayName; //true
```

> 理解原型对象

1. 默认情况，原型对象自动取得 constructor 属性，其他方法和属性都是从 Object 继承
2. 使用 `Person.isPrototypeOf()` 测试实例是否有一个纸箱构造函数 `prototype` 的指针
3. `hasOwnProperty()` 访问的值是不是实例的属性，该方法会忽略从原型链继承到的属性
4. `Object.getOwnPrototypeDescriptor()` 用于实例属性
   > 原型与 in 操作符
5. `"name" in p1` 查找该实例上的属性，不管是 `实例上还是原型上`
6. IE 早期版本出现 bug，导致无法被 `in` 出来，所以替代的方案是 `Object.keys()`，可列出可枚举的字符串数组
   > 更简单的原型语法，
7. [x] 字面量包装 `prototype`，但！`constructor` 没有指向构造函数了

```js
function Proto() {}
Proto.prototype = {
  name: 'xx',
  age: '44',
  job: 'ceo',
  sayName() {
    return this.name;
  },
};
```

2. [x] 字面量包装 `prototype`，初始化回来 `constructor`。！但是，此时，`constructor` 是可以被枚举的。

```js
function Proto() {}
Proto.prototype = {
  constructor: Proto, //重新指向
  name: 'xx',
  age: '44',
  job: 'ceo',
  sayName() {
    return this.name;
  },
};
```

3。[√] 所以只能用 es5 的，Object.defineProperty()

```js
function Proto() {}
Proto.prototype = {
  name: 'xx',
  age: '44',
  job: 'ceo',
  sayName() {
    return this.name;
  },
};
/*只允许在支持es5 Object.defineProperty()方法的环境下使用这样的方式*/
Object.defineProperty(Person.prototype, 'constructor', {
  enumerable: false,
  value: Person,
});
```

> 原型的动态性**实例中的指针仅指向原型，并不是指向构造函数**，当时 `new 出来 的prototype`，即 `最初原型`，以下代码说明这一点：

```js
function Proto() {}
var p1 = new Proto();
Proto.prototype = {
  name: 'xx',
  age: '44',
  job: 'ceo',
  sayName() {
    return this.name;
  },
};
p1;
```

> 原生对象的原型

- 给原型对象，添加方法，再 `new` 出来
  > 原型对象的问题

1. 忽略构造函数传递初始化参数
2. 所有实例获取相同的属性值
3. `共享` 的本质

```js
function Proto() {}
Proto.prototype = {
  name: 'xx',
  age: '44',
  job: 'ceo',
  test: ['men', 'women'],
  sayName() {
    return this.name;
  },
};
var p1 = new Proto();
var p2 = new Proto();
p1.test.push('son');
// 此时
console.info(p1.test === p2.test); //true
```
