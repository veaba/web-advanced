---
sidebar: auto
---

# Es6

## let、const

- let  
  - 不可重复声明变量
  - 暂时临时死域
  - 作用域块
- const
  - 必须先赋值
  - 不可重复声明变量
  - 对于纯数字、字符、等基本结构的话，不可更改，但可以更改数组里面的元素、对象里面的key
  - 只能去改变引用类型(object array)，无法取改变基本类型(boolean number string null undefined)

- var  
  - var 声明，存在变量提升问题
  - var 是全局变量声明的方式

```js
  for(var i =0;i<5;i++){}
  console.info(i) // 5

  for(let i=0;i<5;i++){}
  console.info(i) // 抛出未定义 且 for 括号和 大括号是不同的作用域
```


## 箭头函数
> https://www.cnblogs.com/mengff/p/9656486.html

1. 箭头函数this是父作用域的this，不是调用时的this
	- 如何知道当前的父作用域
	
2. 箭头函数不能作为构造函数，不能使用new

3. 箭头函数没有arguments和caller、callee

4. 箭头函数通过call、apply调用不会改变this指向，只会入参

5. 箭头函数没有原型属性

```js

const fn =()=>{
	
};
console.log(fn.prototype)
```

6. 箭头函数不能作为Generator函数，不能使用yield关键字

7. 箭头函数返回对象需要加括号

8. 箭头函数不能在ES6 class中声明的方法为实例方法，不是原型方法

````js

//deom1
class Super{
    sayName(){
        //do some thing here
    }
}
//通过Super.prototype可以访问到sayName方法，这种形式定义的方法，都是定义在prototype上
var a = new Super();
var b = new Super();
a.sayName === b.sayName; //true
//所有实例化之后的对象共享prototypy上的sayName方法


//demo2
class Super{
    sayName =()=>{
        //do some thing here
    }
}
//通过Super.prototype访问不到sayName方法，该方法没有定义在prototype上
var a = new Super();
var b = new Super();
a.sayName === b.sayName; //false
//实例化之后的对象各自拥有自己的sayName方法，比demo1需要更多的内存空间

````

9. 多重箭头函数是高阶函数，相当于内嵌函数，就是闭包函数





## 函数
- 剩余参数(rest参数)的表示法，同样，items是最后一个参数
```js
// 此时的items 是一个数组
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
console.log(a)//[1,2,3]
```
### class 类
> `特殊的函数`=> `类表达式`、`类声明`
- 只能有且只有一个`constructor`方法
- 一个构造函数可以使用`super` 关键字来调用一个父类的构造函数
- `static` 关键字定义一个类的静态方法。可以不需要实例化该类，但不能通过一个`类实例调用静态方法`
```js
//demo1 
class Home{
  //构造函数
  constructor(height,width){
    this.height=height;
    this.width=width
  }
  // getter，隐藏的get属性
  get area(){
    return this.all()
  }
  //methods
  all(){
    return this.height*this.width
  }
}

const h= new Home(360,480);
console.log(h.height);//360
console.log(h.area);//就可以调用
console.log(h.area());//报错。get 的属性值不是一个function


// demo2  `demos` 关键字定义一个类的静态方法。可以不需要实例化该类，但不能通过一个`类实例调用静态方法`
class Point{
  constructor (x,y){
    this.x=x;
    this.y=y
  }
  //demos 关键字，顶一个类的静态方法
  static distance(a,b){
    const dx = a.x-b.x;
    const dy = a.y-b.y;
    return Math.hypot(dx,dy)//参数平方和的平方根
  }
}

const p1 = new Point(5,5);
const p2 = new Point(10,10);
console.log(Point.distance(p1,p2))
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

speak.bind(obj)();//这样就可以了~~

// demo2 ，知道结果可能如下，但不太理解这样的方式
function Animal() { }

Animal.prototype.speak = function() {
  return this;
};

Animal.eat = function() {
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
  class Animal{
    constructor (name){
      this.name=name
    }
    speak(){
      console.log(this.name+'Noise')
    }
  }
  // 子类
  class Dog extends Animal{
    speak(){
      //此处基础父类的this 属性name 值
      console.log(this.name+'by dog')
    }
  }

  //实例化
  const d = new Dog('Lilei');
  d.speak()

```
- species
> 派生数组类。返回Array 对象，允许覆盖默认的构造函数。类似`map()`返回默认构造函数的方法时，希望返回一个父Array 对象，而不是Arr，可以`Symbol.species`

```js
class Arr extends Array{
  static get [Symbol.species](){return Array}
}
const a = new Arr(1,2,3);
const mapped = a.map(x=>x*x);
console.log(mapped instanceof Arr);
console.log(mapped instanceof Array)
```
- supper
> `supper` 关键字用于调用对象的父对象上的函数

```js
// demo1 这个demo 看不出来什么
class Cat{
  constructor(name){
    this.name=name
  }
  speack(){
    console.log(this.name+' makes a noise');
    return 2
  }
}
class Lio extends Cat{
  speak(){
    super.speak();
    console.log(this.name+' for Lio');
    return 111
  }
}
const animal =new  Lio('litter red');

/** demo2 super 简单应用 */
// 声明一个对象
const Family={
  name:'Jo Home'
};
// 再生一个对象，内含一个函数`getName`
const main ={
  getName(){
    return super.name
  }
};
let home = main.getName();
console.log(home);
//以上这样做并没有什么卵用，但是如果使用了Object.setPrototypeOf(要设置在原型上的对象，prototype)
// 在home前面增加
Object.setPrototypeOf(main,Family);
/** demo3 关于class*/
supper.name;
// 等同于 属性
Object.getPrototypeOf(this).name;
// 等同于 方法
Object.getPrototypeOf(this).name.call(this)
```
### Promise 对象
>状态的变更

> 缺点：无法向外抛出错误移除，并主动中断这样的流程结果
```js
 const promise =  new Promose((resolve,reject)=>{
    const a=1;
    if(a===1){
      resolve('ddd')
    }else{
      reject('sss')//最好是返回一个变量，不然某些环境下，会导致警告或者报错，可以是字符串、数组、对象，但只能是一个参数
    }
  });

  promise()
    .then(res=>{
      console.log(res)
    })
    .cacth(err=>{
      console.log()
    })
```
- resolve()
  - 只能入参一个，但可以是`数组`、`对象`

- reject()
  - 只能入参一个，但可以是`数组`、`对象`

- then()

- catch()

- finally()

- all()

- racr()

## Generator

## async await
- generator的语法糖
- Generator 的改进
  - 内置执行器
  - 更好的语义
  - 更广的适用性
  - 返回值是promise
- async 函数的的返回值是Promise 对象，aysnc 表示 该函数内部有异步操作
- await 命令后可以是Promise 对象和原始类型的值（数值，字符串，布尔值，此时等同于同步操作）
- 如果包装成为一个函数，then里面表示当遇到await是执行then然后才执行后面
- 如何使用asyns/await
  - 函数声明
  - 函数表达式
  - 对象的方法
  - class 的方法
  - 箭头函数方法

```js
// demo1
async function all(){
  return new Promise((resolve,reject)=>{
    let time1 = Math.random();
    let time2 =Math.random();
    // 第一个异步
    setTimeout(()=>{
      console.log(1,time1*10*5000);
      resolve(time1*10*5000)
    },time1*10*5000);

    // 第二个异步

    setTimeout(()=>{
      console.log(2,time2*10*5000);
      resolve(time2*10*5000)
    },time2*10*5000)
  })
};
all()
  .then(res=>{
    console.log(3,res)
  })
  .catch(err=>{
    console.log(4,err)
  });

/*************************************************/
// 第一个异步
async function all1 () {
  return new Promise((resolve) => {
    let time1 = Math.random();
    setTimeout(() => {
      console.log(1, time1 * 10 * 1000);
      resolve(time1)
    }, time1 * 10 * 1000)
  })
}

// 第二个异步
async function all2 () {
  return new Promise(() => {
    let time2 = Math.random();
    setTimeout(() => {
      console.log(2, time2 * 10 * 1000)
    }, time2 * 10 * 1000)
  })
}

// 一个普通async 函数里面，执行两个异步函数会怎么样呢?
async function all () {
  console.log('a');
  await all1();
  console.log('b');
  await all2();
  console.log('c') //这个不会执行，以为还在等待promise 的回来
}
all()

```

而以下代码呢？

```js
// 第一个异步
async function all1 () {
  return new Promise((resolve) => {
    let time1 = Math.random();
    setTimeout(() => {
      console.log(1, time1 * 10 * 1000);
      resolve(time1 * 10 * 1000)
    }, time1 * 10 * 1000)
  })
}
// 第二个异步
async function all2 () {
  return new Promise((resolve) => {
    let time2 = Math.random();
    setTimeout(() => {
      console.log(2, time2 * 10 * 1000);
      resolve(time2 * 10 * 1000)
    }, time2 * 10 * 1000)
  })
}

// 一个普通async 函数里面，执行两个异步函数会怎么样呢?
async function all () {
  console.log('a');
  await all1()
    .then(res1 => {
      console.log(res1)
    });
  console.log('b');
  await all2()
    .then(res2 => {
      console.log(res2)
    });
  console.log('c')
}
all()


// 结论是
/*a
Promise {<pending>}
1 2824.509694408435
27 2824.509694408435
29 b
16 2 6266.805712440053
32 6266.805712440053
34 c*/
```

再看一下这个
结论：
a
第0s——10s计时后，打印 1 10
10 异步一函数的then
打印 b
第10s——17s计时后， 打印 2 8
8 异步二函数的then
c
第18s……


```js
// 第一个异步
async function all1 () {
  return new Promise((resolve) => {
    let time1 = 10;
    setTimeout(() => {
      console.log(1, time1);
      resolve(time1)
    }, time1*1000)
  })
}
// 第二个异步
async function all2 () {
  return new Promise((resolve) => {
    let time2 =8;
    setTimeout(() => {
      console.log(2, time2);
      resolve(time2)
    }, time2 * 1000)
  })
}

// 一个普通async 函数里面，执行两个异步函数会怎么样呢?
async function all () {
let i=0;
setInterval(()=>{
  console.log(i++)
},1000);
  console.log('a');
await all1()
.then(res1 => {
  console.log(res1)
});
  console.log('b');
await all2()
.then(res2 => {
  console.log(res2)
});
  console.log('c')
}
all()

```

再看，把async/await 里面有两个普通的定时任务会怎么样?

结论，此时all1 与all2 是异步任务了，
a
b
c
0s-8s计时
2 8
9s
10 s
1 10

```js
// 第一个异步
async function all1 () {
    let time1 = 10;
    setTimeout(() => {
      console.log(1, time1)
    }, time1*1000)
}
// 第二个异步
async function all2 () {
    let time2 =8;
    setTimeout(() => {
      console.log(2, time2)
    }, time2 * 1000)

}

// 一个普通async 函数里面，执行两个异步函数会怎么样呢?
async function all () {
let i=0;
setInterval(()=>{
  console.log(i++)
},1000);
console.log('a');
await all1();
console.log('b');
await all2();
console.log('c')
}
all()
```

```js
// 以下声明都成立
function * a1(){}
function* a2(){}
function *a3(){}
function*a4(){}

a1();
a2();
a3();
a4();


function * hello(){
  yield 'hello'; //yield 表达式
  yield 'world'; //yield 表达式
  return 'hellow and world'
}
```

- 分段执行。`yiled` 表示暂停执行的标志，`next` 表示恢复执行
- es6提供的异步编程解决方案。[阮一峰 Generator 函数的语法](http://es6.ruanyifeng.com/#docs/generator)
- 状态机，封装了多个内部状态
- 有`*`星号function * a(){}
- 函数体内部使用了yield表达式，定义不同的内部状态(yield 产出的意思) function * a(){yield 'hello';};var func = a();

## Symbol 

- 无法计算
- 描述值相同，两个值也是不相同的
- 无法使用`new` 命令，symbol 不是一个对象
- 描述值是一个对象，则调用该对象的toString()方法转为字符
- Symbol 无法与其他类型进行运算
- 每个Symbol值都不相等，保证不会出现同名的属性
- Symbol作为属性名，不会出现在`for...in`、`for...of`循环中
- 无法被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回
- 可通过 `Object.getOwnPropertySymbols`方法,返回一个数组，成员是当前对象的所有用作属性名的Symbol值
- Symbol.for()与Symbol()前者调用返回存在的值，否则每次都新建
### 消除魔术字符串

### 属性名遍历

```js
const obj={
	[Symbol(21)]:8
};
Object.getOwnPropertySymbols(obj)

```
### Symbol.for()

### Symbol.keysFor()


## todo Reflect
> 现阶段一些方法同时部署到Object 、Reflect 对象上，未来某些方法只能从Reflect上获取，比如Object.defineProperty

- 合理化取值。比如Object.defineProperty(obj,name,desc) 在无法定义属性时，报错，但Reflect.defineProperty(obj,name,desc) 会返回false

```js
// 旧的方法
try {
  Object.defineProperty(target,property,attributes)
  // 成功的取值
}catch(e){
  // 失败
}

if (Reflect.defineProperty(target,property,attributes)){
  // 成功
}else {
  // 失败
}
```

- `Object`操作都变成了函数行为，而不是一个操作符

```js
// 旧的写法
'assign' in Object //true
// 新写法
Reflect.has(Object,'assigne')//true

// 旧的delete 操作符
var obj={
  name:"Old"
}
delete obj.name

// 新的函数式操作方法
Reflect.deleteProperty(obj,'name')

```

- Reflect 对象的方法和Proxy对象的方法一一对象，只要在Proxy有，Reflect 就会有。
- 不管Proxy怎么修改默认行为，总可以在Reflect上获取默认行为


```js
var obj=new Proxy(obj,{
  get(target,name){
    console.log('get',target,name)
    return Reflect.get(target,name)
  },
  deleteProperty(target,name){
    console.log('delete ',name)
    return Reflect.deleteProperty(target,name)
  },
  has(target,name){
    console.log('has',name)
    return Reflect.has(target,name)
  }
})
```
- proxy的拦截操作，内部的偶调用对应的Reflect方法，保证原生行为能够正常执行
- 易阅读

```js
// old
Function.prototype.apply.call(Math.floor,undefined,[1.6]) //1

// new 
Reflect.apply(Math.floor,undefined,[1.6]) //1
```
### Reflect 静态方法：一共13个

- **Reflect.apply(target,thisArg,args)**
- **Reflect.construct(target,args)**
- **Reflect.get(target,name,receiver)**
- **Reflect.set(target,name,value,receiver)**
- **Reflect.defineProperty(target,name,dec)**
- **Reflect.deleteProperty(target,name)**
- **Reflect.has(target,name)**
- **Reflect.ownKeys(target)**
- **Reflect.isExtensible(target)**
- **Reflect.prevenExtensions(target)**
- **Reflect.getOwnPropertyDescriptor(target,name)**
- **Reflect.getPrototypeOf(target)**
- **Reflect.setPrototypeOf(target,prototype)**



### 使用Proxy 实现观察者模式

观察者模式（Observer mode）

```js

const queueObservers= new Set()
const observer= fn=>queueObservers.add(fn)

function set(target,key,value,receiver){
  const result= Reflect.set(target,key,value,receiver)
  queueObservers.forEach(ob=>ob())
  return result
}

```
先定义一个Set集合，所有观察者函数都放进这个集合，observable函数返回对象的代理，拦截赋值操作，拦截函数set中，启动执行所有观察者

