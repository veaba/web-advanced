---
sidebar: auto
---

# This

## 概念

- this 总是指向函数的直接调用者 (非间接)
- 有 new 关键字，指 new 出来的那个对象 (构造函数的实例，一般)
- 事件中，指触发这个事件的对象。
- 特殊的。IE 中的 attachEvent 的 this 总是指向全局的 window
- 闭包中 `this` 是 window 对象
- dom 实例，this 指向这个 dom 对象实例

## 立即执行函数中的 this 指向问题

```js
var obj = {
  a: function () {
    console.log('this==>', this);
    return this.b;
  },
  b: 2020,
};
(function () {
  console.log('=======>', typeof arguments[0]()); // 因为这里的this 是windows，windows 没有变量b，所以是undefined
})(obj.a);
```

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
