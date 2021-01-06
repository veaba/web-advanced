# 防抖函数 debounce

## 概念

- 无论触发多少次回调，都只执行最后一次

- 通俗说，抖掉，等新的一次，重新计算的意思

## 场景

- 1. 懒加载监听计算 `Scroll` 位置，按一定时间频率获取

## 实现

**方案 1**:

```js
function debounce(fn, wait = 50) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

const betterFn = debounce(() => {
  console.log("go to ==>");
}, 200);

document.addEventListener("scroll", betterFn);
```

**方案 2**:

- 具备立即执行的特性

```js
function debounce(fn, wait = 50, im) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    if (!timer && im) {
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

const betterFn = debounce(
  () => {
    console.log("go to ==>");
  },
  200,
  true
);

document.addEventListener("scroll", betterFn);
```
