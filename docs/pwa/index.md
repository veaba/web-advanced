---
sidebar: auto
---

# PWA

## Service worker 工作线程，子线程

> 2014 年 5 月提出，前身是 Application Cache `被移除`

- Application Cache 指定缓存策略 app.appcache
- 不能直接访问/操作 DOM 特定的 API
  - `全局`Promise/Fetch API/Cache API
- 生命周期内，需要时，直接唤醒，不需要则自动休眠，不随浏览器窗口关闭、站点的关闭而失效
- 离线内容可控
- 一旦安装，永远存活，除非手动卸载
- 必须 HTTPS，除非本地环境下
- 广泛使用 Promise
- 生命周期
  Register - > Install -> activated
- 组织结构
  - 注册 sw 是一个脚本文件 `延时注册`
  - 工作时候的 sw 又是另外一个脚本文件
