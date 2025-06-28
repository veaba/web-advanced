# 内存指向

```js
const obj={}
function A(){
  return obj
}

const a = new A()

const b = new A()

console.log(a===b) ? // true

```

函数每次都返回新的空对象，而不是 `return` 指向的全局变量

```js
function A(){
  return {}
}

const a = new A()

const b = new A()

console.log(a===b) ? // false

```
