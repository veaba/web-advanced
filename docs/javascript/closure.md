# 闭包

- TODO：如何调试闭包函数中返回的变量值，假设已上线，不可更改原始代码

- JavaScript 语言中，只有函数内部的子函数才能读取局部变量。

  - JS 特有链式作用域(chain scope )有关系，子对象会父级以上查找作用域变量。
  - 父作用域对子对象可见，反之不行

- 闭包能够读取其他函数内部变量的函数

## 定义

A 函数返回函数 B，且返回的函数调用 A 的变量

```js
function A() {
  const a = 1;
  return function B() {
    console.log(a);
  };
}

// A()()
```

## 常见

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
```

setTimeout 是异步函数，会先把循环全部执行完毕。

**1. 使用闭包解决：**

```js
for (var i = 1; i <= 5; i++) {
  ((j) => {
    setTimeout(() => {
      console.log(j);
    }, j * 1000);
  })(i);
}
```

**2. setTimeout 第三个参数：**

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(
    (i) => {
      console.log(i);
    },
    i * 1000,
    i
  );
}
```

**3. 使用 let 声明，形成块级作用域：**

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
```

## 解决与避免

## 场景

1. 允许不带参数的函数 `setTimeout` 调用

```js
function fn(a) {
  function f2() {
    console.log(a);
  }
}
const fun = fn(2);

setTimeout(fn, 2000);
```

2. 回调

```js
function onSize(size) {
  return function() {
    document.border.style.fontSize = size + "px";
  };
}

const size16 = onSize(16);
document.body.onclick = size16;
```
