# 闭包

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
for (var i=1;i<=5;i++){
       setTimeout((j) => {
      console.log(j);
    }, i * 1000,i);
}
```

**3. 使用 let 声明，形成块级作用域：**

```js
for (let i=1;i<=5;i++){
       setTimeout(() => {
      console.log(i);
    }, i * 1000);
}
```

## 解决与避免
