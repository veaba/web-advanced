# 作用域

## 几个作用域

- `函数作用域`
- `全局作用域`
- `暂时性死域`，es6 引入，与 `let`、`const` 关联，创建了块级作用域

## 作用域定义

- 什么叫作用域？
- 怎么改变作用域？

- `js 没有作用域块`，导致 var 声明时是全局作用域。但如果是 let 声明，情况就不一样。let 让变量有了作用域。
- 可以使用过匿名函数来解决，模仿块级作用域

> 以下代码让很感到困惑

```js
if (1) {
  var ha = 'hello,world!';
}
console.log(ha); //得到多少?
```

> 但如果是 let 开头的话，就不一样了

```js
if (1) {
  let ha = 'hello world';
}
console.log(ha);
```

> 这也就是能解释了，为什么当使用 var 声明 for 循环出来后，总是最后一个值的原因 (let 则相反)

```js
for (var i = 0; i < 5; i++) {}
console.log(i);
```

::: tip

所以优秀的代码，其实可以这样去避免，更优秀的就是别用 `var`

:::

```js
for (var i = 0; i < 5; i++) {}
console.log(i);
i = null;
```

::: tip
函数内部，相当于一个作用域
:::

```js
/*demo1*/
const test = function () {
  var t = 'hello';
  return t + ',world!';
};
test();
console.log(t); //

/*demo2*/
const test2 = function () {
  t2 = 'hello';
  return t2 + ',world!';
};
test2();
console.log(t2); //可以访问到
```
