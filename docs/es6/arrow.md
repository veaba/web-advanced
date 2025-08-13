## 箭头函数

> <https://www.cnblogs.com/mengff/p/9656486.html>

- 箭头函数 this 是父作用域的 this，不是调用时的 this
    - 如何知道当前的父作用域

- 箭头函数不能作为构造函数，不能使用 new

- 箭头函数没有 arguments 和 caller、callee

- 箭头函数通过 call、apply 调用不会改变 this 指向，只会入参

- 箭头函数没有原型属性

```js
const fn = () => {
};
console.log(fn.prototype);
```

- 箭头函数不能作为 Generator 函数，不能使用 yield 关键字

- 箭头函数返回对象需要加括号

- 箭头函数不能在 ES6 class 中声明的方法为实例方法，不是原型方法

```js
//demo1
class Super {
  sayName() {
    //do some thing here
  }
}

//通过Super.prototype可以访问到sayName方法，这种形式定义的方法，都是定义在prototype上
var a = new Super();
var b = new Super();
a.sayName === b.sayName; //true
//所有实例化之后的对象共享 prototype 上的sayName方法

//demo2
class Super {
  sayName = () => {
    //do some thing here
  };
}

//通过Super.prototype访问不到sayName方法，该方法没有定义在prototype上
var a = new Super();
var b = new Super();
a.sayName === b.sayName; //false
//实例化之后的对象各自拥有自己的sayName方法，比demo1需要更多的内存空间
```

- 多重箭头函数是高阶函数，相当于内嵌函数，就是闭包函数
