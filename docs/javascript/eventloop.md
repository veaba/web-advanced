# EventLoop

## JavaScript 事件

分为两种事件类型：

- 宏任务(macro-task)/Task 中的异步任务：

  - setTimeout
  - setInterval
  - setImmediate (Node)
  - requestAnimationFrame(browser)
  - I/O
  - UI rendering(browser)

- 微任务(micro-task)/jobs 中的异步任务：
  - process.nextTick(node,limit=1000)
  - Promise
  - Object.observe
  - MutationObserve

事件的执行顺序：先`宏任务` ——> `微任务`。

任务中有`同步任务`和`异步任务`:

- ——> 同步的进入主线程
- ——> 异步进入 event table 并注册函数
- ——> 异步完成后
- ——> 将回调放入 event queue（宏任务和微任务是不同的 event queue），此时不执行异步快里的代码
- ——> 同步任务完成后，从 event queue 读取事件放入主线程
- ——> 回调函数可能包含不同的任务，因此循环执行上述

## Node 
- 略

## reference:

- [带你彻底弄懂Event Loop](https://segmentfault.com/a/1190000016278115)

 