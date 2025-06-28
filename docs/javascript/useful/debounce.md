# 防抖函数 debounce

## 概念

- 无论触发多少次回调，都只执行最后一次

- 通俗说，抖掉，等新的一次，重新计算的意思

- 注意：这里的抖动停止表示你停止了触发这个函数，从这个时间点开始计算，当间隔时间等于你设定时间，才会执行里面的回调函数。

- 如果你一直在触发这个函数并且两次触发间隔小于设定时间，则一定不会到回调函数那一步。

- 延滞性，最后一个函数触发后，过指定时间才开始执行

## 场景

1. 懒加载监听计算 `Scroll` 位置，按一定时间频率获取

2. input 查询，确保只有最后一次的更改有效

## 实现

重点是在 clearTimeout`

**方案 1**：

```js
function debounce(fn, wait = 50) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

const betterFn = debounce(() => {
  console.log('go to ==>');
}, 200);

document.addEventListener('scroll', betterFn);
```

**方案 2**：

- 具备立即执行的特性

```js
function debounce(fn, wait = 50, im) {
  let timer = null;
  return function (...args) {
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
    console.log('go to ==>');
  },
  200,
  true
);

document.addEventListener('scroll', betterFn);
```
