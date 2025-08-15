## let、const

- let

  - 不可重复声明变量
  - 暂时临时死域
  - 作用域块

- const

  - 必须先赋值
  - 不可重复声明变量
  - 对于纯数字、字符、等基本结构的话，不可更改，但可以更改数组里面的元素、对象里面的 key
  - 只能去改变引用类型 (object array)，无法取改变基本类型 (`boolean`、`number`、`string`、`null`、`undefined`、`symbol`、`bigint` (Chrome 67+开始))

- var

  - var 声明，存在变量提升问题
  - var 是全局变量声明的方式

```js
for (var i = 0; i < 5; i++) {
}
console.info(i); // 5

for (let i = 0; i < 5; i++) {
}
console.info(i); // 抛出未定义 且 for 括号和 大括号是不同的作用域
```