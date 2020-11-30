---
sidebar: auto
---

# 面试题

## 个人总结

- 知所以然，不知所以然。（必须在常见的问题上，得到深入的理解和应用）
- 必须需要作足准备（几次的面试都很被动，打个措手不及）
- 深入你使用主流框架的源码来理解


## css

- 两种盒子模型分别说一下

- 如何垂直居中

- flex 怎么用？常用属性有什么？

- BFC 是什么？

- css 选择器优先级

- 清除浮动
  - 原因？
  - 解决方案

## js
- ES6 语法有什么？分别怎么用？
- 必考:ES 6语法知道哪些，分别怎么用?
- 必考Promise、Promise.all、Promise.race分别怎么用?3.必考:手写函数防抖和函数节流
- 必考:手写AJAX
- 必考:这段代码里的this是什么?6.必考:闭包/立即执行函数是什么?
- 必考:什么是JSONP，什么是 CORS，什么是跨域?8.常考: async/await怎么用，如何捕获异常?
- 常考:如何实现深拷贝?
- 常考:如何用正则实现trim()?
- 常考:不用class 如何实现继承?用class 又如何实现?12.常考:如何实现数组去重?
- 放弃:==相关题目(反着答)
- 送命题:手写一个Promise
- (a==1&&a==2&&a==3) 可能为true吗？为什么
- js 垃圾回收机制
- EventLoop
- apply call bind
- [『JS方法的源码实现』更新完毕](https://www.bilibili.com/read/cv7903371)
- 手写原生 call bind apply
- defineProperty 和 Proxy 区别 ?
	- defineProperty   劫持数据 -> 对象做拓展
		- obj 是空对象
		- 单个处理 property
	- proxy 返回代理对象 数据劫持 -> 代理
		- target 是已有的 property
		- 无属性名
		- 全局性处理 property
		- 代理改，被代理也会被改
		- 支持对数组的代理
		- 支持对函数的代理

- [【前端面试必备】Vue2与Vue3核心之『响应式原理』 ](https://www.bilibili.com/video/BV1Dk4y127Ha?p=1)
- [前端进阶之道](https://yuchengkai.cn/docs/frontend/#%E5%86%85%E7%BD%AE%E7%B1%BB%E5%9E%8B)

## DOM

1.必考:事件委托
⒉曾考:用mouse事件写一个可拖曳的div


## HTTP

1.必考:HTTP状态码知道哪些?分别什么意思?2.大公司必考:HTTP缓存有哪几种?
3.必考:GET和POST的区别
4.Cookie v.s.LocalStorage v.s. SessionStorage V.S. Session

## 框架 Vue

1.必考: watch 和computed和methods区别是什么?
2.必考: Vue有哪些生命周期钩子函数?分别有什么用?
3.必考: Vue如何实现组件间通信?
4.必考: Vue数据响应式怎么做到的?
5.必考:Vue.set是做什么用的?
6.Vuex你怎么用的?
7.VueRouter你怎么用的?8.路由守卫是什么?


## 框架 React

1.必考:受控组件v.S.非受控组件
⒉必考: React有哪些生命周期函数?分别有什么用?(Ajax请求放在哪个阶段?)
3.必考:React 如何实现组件间通信?
4.必考: shouldComponentUpdate有什么用?
5.必考:虚拟DOM是什么?
6.必考:什么是高阶组件?
7.React diff 的原理是什么?
8.必考Redux是什么?


## TypeScript

- 说一下泛类型
1.never类型是什么?
2.TypeScript 比起JavaScript有什么优点?


## Webpack

1.必考:有哪些常见 loader和plugin，你用过哪些?2.英语题:loader 和plugin的区别是什么?
3.必考:如何按需加载代码?
4.必考:如何提高构建速度?5.转义出的文件过大怎么办?
上面五题请看这个不错的参考: https://zhuanlan.zhihu.com/p/44438844


## 安全

- 什么是 XSS ?
 - 解决：

- 什么是 CSRF 
 - 解决：

## 