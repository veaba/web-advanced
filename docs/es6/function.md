## 函数

- 剩余参数 (rest 参数) 的表示法，同样，items 是最后一个参数

```js
// 此时的items 是一个数组
function push(array, ...items) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);
console.log(a); //[1,2,3]
```

### class 类

> `特殊的函数`=> `类表达式`、`类声明`

- 只能有且只有一个 `constructor` 方法
- 一个构造函数可以使用 `super` 关键字来调用一个父类的构造函数
- `static` 关键字定义一个类的静态方法。可以不需要实例化该类，但不能通过一个 `类实例调用静态方法`

```js
//demo1
class Home {
  //构造函数
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  // getter，隐藏的get属性
  get area() {
    return this.all();
  }

  //methods
  all() {
    return this.height * this.width;
  }
}

const h = new Home(360, 480);
console.log(h.height); //360
console.log(h.area); //就可以调用
console.log(h.area()); //报错。get 的属性值不是一个function

// demo2  `demos` 关键字定义一个类的静态方法。可以不需要实例化该类，但不能通过一个`类实例调用静态方法`
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  //demos 关键字，顶一个类的静态方法
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy); //参数平方和的平方根
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
console.log(Point.distance(p1, p2));
// 相当于Point.distance({x:5,y:10},{x:10,y:5})
```

- 用原型和静态方法包装

```js
class Animal {
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
}

let obj = new Animal();
obj.speak(); // Animal {}
let speak = obj.speak;
speak(); // undefined

Animal.eat(); // class Animal
let eat = Animal.eat;
eat(); // undefined

//当然了。如果小改动了一下

speak.bind(obj)(); //这样就可以了~~

// demo2 ，知道结果可能如下，但不太理解这样的方式
function Animal() {}

Animal.prototype.speak = function () {
  return this;
};

Animal.eat = function () {
  return this;
};

let obj = new Animal();
let speak = obj.speak;
speak(); // global object

let eat = Animal.eat;
eat(); // global object
```

- Object.setPrototypeOf() 继承常规对象
- extends 创建子类

```js
// 父类
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + 'Noise');
  }
}
// 子类
class Dog extends Animal {
  speak() {
    //此处基础父类的this 属性name 值
    console.log(this.name + 'by dog');
  }
}

//实例化
const d = new Dog('LiLei');
d.speak();
```

- species
  > 派生数组类。返回 Array 对象，允许覆盖默认的构造函数。类似 `map()` 返回默认构造函数的方法时，希望返回一个父 Array 对象，而不是 Arr，可以 `Symbol.species`

```js
class Arr extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}
const a = new Arr(1, 2, 3);
const mapped = a.map((x) => x * x);
console.log(mapped instanceof Arr);
console.log(mapped instanceof Array);
```

- supper
  > `supper` 关键字用于调用对象的父对象上的函数

```js
// demo1 这个demo 看不出来什么
class Cat {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a noise');
    return 2;
  }
}
class Lio extends Cat {
  speak() {
    super.speak();
    console.log(this.name + ' for Lio');
    return 111;
  }
}
const animal = new Lio('litter red');

/** demo2 super 简单应用 */
// 声明一个对象
const Family = {
  name: 'Jo Home',
};
// 再生一个对象，内含一个函数`getName`
const main = {
  getName() {
    return super.name;
  },
};
let home = main.getName();
console.log(home);
//以上这样做并没有什么卵用，但是如果使用了Object.setPrototypeOf(要设置在原型上的对象，prototype)
// 在home前面增加
Object.setPrototypeOf(main, Family);
/** demo3 关于class*/
supper.name;
// 等同于 属性
Object.getPrototypeOf(this).name;
// 等同于 方法
Object.getPrototypeOf(this).name.call(this);
```

### Promise 对象

> 状态的变更

:::tip
缺点：无法向外抛出错误移除，并主动中断这样的流程结果
:::

```js
const promise = new Promise((resolve, reject) => {
  const a = 1;
  if (a === 1) {
    resolve('ddd');
  } else {
    reject('sss'); //最好是返回一个变量，不然某些环境下，会导致警告或者报错，可以是字符串、数组、对象，但只能是一个参数
  }
});

promise()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log();
  });
```

- resolve()

  - 只能入参一个，但可以是 `数组`、`对象`

- reject()

  - 只能入参一个，但可以是 `数组`、`对象`

- then()

- catch()

- finally()

- all()

- race()
