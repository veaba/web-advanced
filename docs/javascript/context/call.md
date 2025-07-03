# Call 函数

## 说明

::: tip
call 会立即执行。
:::

## 特性

- 入参是一个 `(a,b,c)` 的列表形式，记忆方式，　`C` 类似括号 `(`。
- `call` 的第一个参数就是 `this` 所要指向的那个对象，后面的参数则是函数调用时所需的参数。
- 应用：调用对象的原生方法

```js
var obj = {};
obj.hasOwnProperty('toString'); // false

// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true;
};
obj.hasOwnProperty('toString'); // true

Object.prototype.hasOwnProperty.call(obj, 'toString'); // false
```

## call 与 apply 区别

- call 入参是 `独立参数`，如 `fn("click","touch")`
- apply 入参是 `数组`，如 `fn(["click","touch"])`，否则无法被读取到

```js
function github(param1, param2) {
  console.info(param1, param2);
}
const repoObject = { repo: 'veaba/web-advanced' };
const authorObject = { author: 'veaba' };
fn.apply(null, [authorObject], repoObject); // {author: 'veaba'}, undefined

fn.apply(null, repoObject, [authorObject]); // undefined undefined
```
