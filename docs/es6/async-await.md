## async await

- generator 的语法糖
- Generator 的改进
    - 内置执行器
    - 更好的语义
    - 更广的适用性
    - 返回值是 promise
- async 函数的的返回值是 Promise 对象，`async` 表示该函数内部有异步操作
- await 命令后可以是 Promise 对象和原始类型的值 (数值，字符串，布尔值，此时等同于同步操作)
- 如果包装成为一个函数，then 里面表示当遇到 await 是执行 then 然后才执行后面
- 如何使用 `async/await`
    - 函数声明
    - 函数表达式
    - 对象的方法
    - class 的方法
    - 箭头函数方法

```js
// demo1
async function all() {
  return new Promise((resolve, reject) => {
    let time1 = Math.random();
    let time2 = Math.random();
    // 第一个异步
    setTimeout(() => {
      console.log(1, time1 * 10 * 5000);
      resolve(time1 * 10 * 5000);
    }, time1 * 10 * 5000);

    // 第二个异步

    setTimeout(() => {
      console.log(2, time2 * 10 * 5000);
      resolve(time2 * 10 * 5000);
    }, time2 * 10 * 5000);
  });
}
all()
  .then((res) => {
    console.log(3, res);
  })
  .catch((err) => {
    console.log(4, err);
  });

/*************************************************/
// 第一个异步
async function all1() {
  return new Promise((resolve) => {
    let time1 = Math.random();
    setTimeout(() => {
      console.log(1, time1 * 10 * 1000);
      resolve(time1);
    }, time1 * 10 * 1000);
  });
}

// 第二个异步
async function all2() {
  return new Promise(() => {
    let time2 = Math.random();
    setTimeout(() => {
      console.log(2, time2 * 10 * 1000);
    }, time2 * 10 * 1000);
  });
}

// 一个普通async 函数里面，执行两个异步函数会怎么样呢?
async function all() {
  console.log('a');
  await all1();
  console.log('b');
  await all2();
  console.log('c'); //这个不会执行，以为还在等待promise 的回来
}
all();
```

而以下代码呢？

```js
// 第一个异步
async function all1() {
  return new Promise((resolve) => {
    let time1 = Math.random();
    setTimeout(() => {
      console.log(1, time1 * 10 * 1000);
      resolve(time1 * 10 * 1000);
    }, time1 * 10 * 1000);
  });
}
// 第二个异步
async function all2() {
  return new Promise((resolve) => {
    let time2 = Math.random();
    setTimeout(() => {
      console.log(2, time2 * 10 * 1000);
      resolve(time2 * 10 * 1000);
    }, time2 * 10 * 1000);
  });
}

// 一个普通async 函数里面，执行两个异步函数会怎么样呢?
async function all() {
  console.log('a');
  await all1().then((res1) => {
    console.log(res1);
  });
  console.log('b');
  await all2().then((res2) => {
    console.log(res2);
  });
  console.log('c');
}
all();

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
第 0s——10s 计时后，打印 1 10
10 异步一函数的 then
打印 b
第 10s——17s 计时后，打印 2 8
8 异步二函数的 then
c
第 18s……

```js
// 第一个异步
async function all1() {
  return new Promise((resolve) => {
    let time1 = 10;
    setTimeout(() => {
      console.log(1, time1);
      resolve(time1);
    }, time1 * 1000);
  });
}
// 第二个异步
async function all2() {
  return new Promise((resolve) => {
    let time2 = 8;
    setTimeout(() => {
      console.log(2, time2);
      resolve(time2);
    }, time2 * 1000);
  });
}

// 一个普通async 函数里面，执行两个异步函数会怎么样呢?
async function all() {
  let i = 0;
  setInterval(() => {
    console.log(i++);
  }, 1000);
  console.log('a');
  await all1().then((res1) => {
    console.log(res1);
  });
  console.log('b');
  await all2().then((res2) => {
    console.log(res2);
  });
  console.log('c');
}
all();
```

再看，把 async/await 里面有两个普通的定时任务会怎么样？

结论，此时 all1 与 all2 是异步任务了，
a
b
c
0s-8s 计时
2 8
9s
10 s
1 10

```js
// 第一个异步
async function all1() {
  let time1 = 10;
  setTimeout(() => {
    console.log(1, time1);
  }, time1 * 1000);
}
// 第二个异步
async function all2() {
  let time2 = 8;
  setTimeout(() => {
    console.log(2, time2);
  }, time2 * 1000);
}

// 一个普通async 函数里面，执行两个异步函数会怎么样呢?
async function all() {
  let i = 0;
  setInterval(() => {
    console.log(i++);
  }, 1000);
  console.log('a');
  await all1();
  console.log('b');
  await all2();
  console.log('c');
}
all();
```

```js
// 以下声明都成立
function* a1() {}
function* a2() {}
function* a3() {}
function* a4() {}

a1();
a2();
a3();
a4();

function* hello() {
  yield 'hello'; //yield 表达式
  yield 'world'; //yield 表达式
  return 'hello and world';
}
```

- 分段执行。`yield` 表示暂停执行的标志，`next` 表示恢复执行
- es6 提供的异步编程解决方案。[阮一峰 Generator 函数的语法](http://es6.ruanyifeng.com/#docs/generator)
- 状态机，封装了多个内部状态
- 有 `*` 星号 function \* a(){}
- 函数体内部使用了 yield 表达式，定义不同的内部状态 (yield 产出的意思)

```js
function a(){
  yield 'hello'
}

var func = a()
```