# Bind 函数

## 说明

::: tip
bind 新函数，不会立即执行。
:::

## 特性

- 创建一个新的函数。
- 新函数的 this 是 bind 的第一个参数指定的
- 其余参数作为新函数的参数使用

```js
const bind = function () {
  return function () {
    // do something
  };
};
```

- 因为 bind 每次都生成一个函数。所以需要注意以下：

```js
const o = {
  m() {
    console.info('hello');
  },
};
const ele = document.querySelector('xx');
ele.addEventListener('click', o.m.bind(o));

// 而是

const listener = o.m.bind(o);
ele.addEventListener('click', listener);

// 否则无法remove事件监听

ele.removeEventListener('click', listener);
```

## call 与 apply 区别

- call 入参是列表。
- apply 入参是数组

```js
function a(ob) {
  console.info(ob);
}
var cc = { t: '222' };
var ob = { name1: 'lala' };
a.apply(null, [ob], cc);

// undefined
```
