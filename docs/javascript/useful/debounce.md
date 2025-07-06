# 防抖函数 debounce

## 概念

- 无论触发多少次回调，都只执行最后一次，停止出发后才执行

- 通俗说，抖掉，等新的一次，重新计算的意思

- 注意：这里的抖动停止表示你停止了触发这个函数，从这个时间点开始计算，当间隔时间等于你设定时间，才会执行里面的回调函数。

- 如果你一直在触发这个函数并且两次触发间隔小于设定时间，则一定不会到回调函数那一步。

- 延滞性，最后一个函数触发后，过指定时间才开始执行

## 场景

“适合停顿后触发的场景”，关心最终结果

1. 窗口大小调整 `resize`，窗口大小会频繁触发，可以按照特定时间获取到指定值，节流函数也适用

2. 懒加载监听计算 `scroll` 位置，按一定时间频率获取，节流函数也适用

3. input 查询，确保只有最后一次的更改有效，实际应用中，需要注意时间间隔的差异，并根据实际情况找出最佳数值

4. 防止按钮重复点击，短时间只允许提交一次，防止重复提交

5. 自动保存问题，当富文本编辑器在用户停止不动后，自动保存。

## 实现

重点是在 `clearTimeout`

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

## 同时使用

### 滚动场景

```js
// 示例代码
const handleScroll = () => {
  // 节流：限制检查频率
  throttle(() => {
    // 防抖：当用户停止滚动一段时间后执行
    debounce(checkIfReachBottom, 300)();
  }, 200)();
};

window.addEventListener('scroll', handleScroll);
```

### 实时搜索

```js
const fetchSuggestions = () => {
  // 节流：限制最小请求间隔为500ms
  throttle(() => {
    // 防抖：用户停止输入300ms后执行
    debounce(actualFetch, 300)();
  }, 500)();
};

searchInput.addEventListener('input', fetchSuggestions);
```

```js
const handleResize = () => {
  throttle(() => {
    debounce(calculateLayout, 200)();
  }, 100)();
};

window.addEventListener('resize', handleResize);
```

### 窗口大小调整
