# 上下文

## 概念

- `apply`、`call`、`bind` 三个方法改变上下文。
- 在 `ES6` 中的箭头函数里，`apply`、`call`、`bind` 不起作用

## apply 方法

`apply` 方法。调用一个函数，具有指定 this 的值，以及作为一个数组提供的参数。[MDN 查看更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

## bind 方法

`bind` 方法。创建一个新的函数。被调用时，其 this 关键字设置为提供的值，在调用时新函数时，在任何提供之前一个给定的参数序列。[MDN 查看更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

## call 方法

`call` 方法。调用一个函数，具有一个指定 this 值和分别地提供参数 [MDN 查看更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

语法 `function.call(thisObj,args...)`，如果 thisObj 是 null，则是全局对象，args 作为参数传递给 `function`

<Catalog base="/javascript/context" />
