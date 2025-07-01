---
sidebar: auto
---

# `__proto__`

```js
const obj = {
  a: 2,
  b: 3,
};

console.log(obj.__proto__);
```

::: details 如下：

![obj-__proto__](/images/javascript/__proto__/obj-__proto__.png)

:::

## 获取原型 `[[getPrototypeOf]]`

- console.log(obj.`__proto__`)
- console.log(Object.getPrototypeOf(obj))
- console.log(Object.prototype)

## 设置原型 `[[setPrototypeOf]]`

```js
Object.setPrototypeOf(obj, { c: 22 });
```

重新打印：

```js
console.log(obj); // { a: 2, b: 3 }

// 在原型链上，则可以获得 c 属性
console.log(obj.c); // 22
```

## 获取对象的可拓展性 `[[isExtensible]]`

```js
console.log(Object.isExtensible(obj)); // true

Object.freeze(obj);
console.log(Object.isExtensible(obj)); // false

// seal 不可修改、不可删除，可复写，可枚举
Object.seal(obj); //封闭对象
obj.c = 999;
console.log(obj); // 此时不会被写入

// freeze 不可写 只读
```

## 获取自有属性 `[[getOwnProperty]]`

- 返回自有属性

```js
const obj = {
  a: 2,
  b: 3,
};
Object.setPrototypeOf(obj, { c: 22 });
console.log(Object.getOwnPropertyNames(obj)); // ['a','b']
```

## 禁止拓展对象 `[[preventExtensions]]`

```js
const obj = {
  a: 2,
  b: 3,
};
Object.preventExtensions(obj); // 禁止添加，可删，可改
obj.d = 2;
console.log(obj);
```

## 拦截对象操作 `[[defineProperty]]`

```js
const obj = {
  a: 2,
  b: 3,
};
Object.defineProperty(obj);
```

## 判断是否是自身属性 `[[hasOwnProperty]]`

```js
console.log(obj.hasOwnProperty('a')); // 返回布尔值，可用于深拷贝
```

## [[get]]

```js
console.log('c' in obj); // 方法 1
console.log(obj.c); // 方法 2
```

## [[set]]

```js
obj.a = 2; // 方法 1
obj['a'] = 2; // 方法 2
```

## delete

```js
delete obj.a;
```

## enum

```js
for (let k in obj) {
  console.log(k);
}
```

## 获取键集合 `[[ownPropertyKeys]]`

```js
Object.keys(obj);
```

## 声明过程

```js
function a() {}

const a = function () {};
```

## new 过程

```js
function T {}
const t = new T()
```
