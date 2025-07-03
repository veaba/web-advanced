# Bind 函数

## 说明

::: tip
bind 新函数，不会立即执行。
:::

## 特性

- 创建一个新的函数。
- 新函数的 `this` 是 `bind` 的第一个参数
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
const githubObject = {
  setRepo() {
    console.info('hello');
  },
};
// bad case
const ele = document.querySelector('xx');
ele.addEventListener('click', githubObject.setRepo.bind(githubObject));

// good case
const listener = githubObject.setRepo.bind(githubObject);
ele.addEventListener('click', listener);

// 否则无法 remove 事件监听
ele.removeEventListener('click', listener);
```
