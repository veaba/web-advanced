# 节流函数 Throttle

## 概念

- 节省的意思，均匀的执行，固定频率执行

- 跟水龙头一个概念，开一次，流水，关一次，停水，不管后面来了多少

- 某个函数一定时间间隔内 (如 3s) 执行一次，在 3s 内无视后来产生的**函数调用请求**

- 马老师被叫去打闪电五连鞭，3s 内打一次，不管叫多少次，他只能 3s 内打一次

## 场景

关心执行过程

1. window.onresize()，跟防抖一样也可以适用

2. `scroll` 场景下，`mousemove()`，跟防抖一样也可以适用

3. 上传进度

4. input 实时查询，每隔 x s 发送一次请求，服务端是限流 (Rate limit)

5. 游戏帧频率

6. 高频点击，如抢购

## 实现

```js
const throttle = (fn, wait = 50) => {
  let pre = 0;

  return function (...args) {
    let now = new Date();
    if (now - pre > wait) {
      pre = now;
      fn.apply(this, args);
    }
  };
};

const betterFn = throttle(() => {
  console.log('log');
}, 1000);

// 每 10 毫秒执行一次 betterFn 函数，但是只有时间差大于 1000 时才会执行 fn
setInterval(betterFn, 10);
```

或者方案 2：

```js
//
function throttle(f, wait) {
  let timer;
  return (...args) => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      f(...args);
      timer = null;
    }, wait);
  };
}
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
