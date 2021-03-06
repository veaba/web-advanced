# JavaScript

## 发布订阅模式(观察者模式)

- 一种对象间一对多的依赖关系
- 当一个对象的状态发送改变时，所有依赖它的对象都得到状态改变的通知

### 订阅+发布过程

- 把自己想订阅的**事件**注册(subscribe) 到调度中心(event channel)

- 发布者(publisher) 发布该事件到(publish event) 到调度中心

- 事件触发时，调度中心统一调度订阅者注册到调度中心的处理代码

### 问题

1. 订阅者是如何订阅？

> 调用事件对象中的注册事件，将自己事件名和执行函数，注册到注册中心中。然后出发事件发布即可执行订阅上的事件代码块
