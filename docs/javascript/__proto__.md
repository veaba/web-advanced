---
sidebar: auto
---

# `**proto**`

```js
const obj = {
  a: 2,
  b: 3,
};
```

## 1. 获取原型 [[getPropertyOf]]

- console.log(obj.`__proto__`)
- console.log(Object.getPropertyOf(obj))
- console.log(Object.prototype)

## 2. 设置原型 [[setPropertyOf]]

- console.log(Object.setPropertyOf(obj,{c:22}))

## 3. 获取对象的可拓展性 [[isExtensible]]

```js
console.log(Object.isExtensible(obj)); // true

Object.freeze(obj);
console.log(Object.isExtensible(obj)); // false

// seal 不可修改、不可删除，可复写，可枚举
Object.seal(obj); //封闭对象
obj.c = 22;
console.log(obj);

// freeze 不可写 只读
```

## 4. 获取自有属性 [[getOwnProperty]]

- 返回自有属性

```js
const obj = {
  a: 2,
  b: 3,
};
Object.setPropertyOf(obj, { c: 22 });
console.log(Object.getOwnPropertyNames(obj)); // ['a','b']
```

## 5. 禁止拓展对象 [[preventExtensions]]

```js
const obj = {
  a: 2,
  b: 3,
};
Object.preventExtensions(obj); // 禁止添加，可删，可改
obj.d = 2;
console.log(obj);
```

## 6. 拦截对象操作 [[defineProperty]]

```js
const obj = {
  a: 2,
  b: 3,
};
Object.defineProperty(obj);
```

## 7. 判断是否是自身属性 [[hasOwnProperty]]

```js
console.log(obj.hasOwnProperty("a")); // 返回布尔值，可用于深拷贝
```

## 8. [[get]]

```js
console.log("c" in obj); // 方法 1
console.log(obj.c); // 方法 2
```

## 9. [[set]]

```js
obj.a = 2; // 方法 1
obj["a"] = 2; // 方法 2
```

## 10. delete
```js
delete obj.a
```

## 11. enum

```js
for (let k in obj){
    console.log(k)
}
```

## 12. 获取键集合 [[ownPropertyKeys]]
```js
Object.keys(obj)
```

## 13. 声明过程
```js
function a (){} 

const a = function(){}
```
## 14. new 过程

```js
function T {}
const t = new T()
```