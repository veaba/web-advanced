# 节流函数 Throttle

## 概念

- 节省的意思

- 跟水龙头一个概念，开一次，流水，关一次，停水，不管后面来了多少

- 某个函数一定时间间隔内（如 3s ）执行一次，在 3s 内无视后来产生的**函数调用请求**

- 马老师被叫去打闪电五连鞭，3s 内打一次，不管叫多少次，他只能 3s 内打一次

## 场景

1. window.onresize()

2. mousemove()

3. 上传进度

4. input 查询

## 实现

```js
const throttle = (fn, wait = 50) => {
  let pre = 0;

  return function(...args) {
    let now = new Date();
    if (now - pre > wait) {
      pre = now;
      fn.apply(this, args);
    }
  };
};

const betterFn = throttle(() => {
  console.log("log");
}, 1000);

// 每 10 毫秒执行一次 betterFn 函数，但是只有时间差大于 1000 时才会执行 fn
setInterval(betterFn, 10);
```
