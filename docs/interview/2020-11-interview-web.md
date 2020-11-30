# 2020年11月面试题以及常见面试题

## 使用 Vue 3

## Vue 2 生命周期 （11）
- beforeCreate
	- 用途：实例初始化后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
	- 源码：
		- `initMixin(Vue)`
		- `stateMixin(Vue)`
		- `eventsMixin(Vue)`
			- `$once`
			- `$off`
			- `$emit`
			- `$on`
		- `lifecycleMixin(Vue)`
		- `renderMixin(Vue)`
	- 场景：
- created
  - 用途：实例创建完成后，被立即调用，已完成数据观测和方法的运算，watch/event 回调，但挂载未开始，`$el` property 不可用
	- 场景：
- beforeMount
	- 用途：挂载开始之前被调用，相关 render 函数首次被调用
	- 场景：**服务器渲染期间不可被调用**
- mounted
	- 用途：
		- 实例挂载 dom，`el` 被新创建的 `vm.$el` 替换。
		- 但不会保证所有子组件也都被一起被挂载，除非在 mounted 内部使用 vm.$nextTick
		```
			mounted:(){
				this.$nextTick(()=>{
					// 整个视图渲染完毕才会运行此代码
				})
			}
		```
	- 场景：**服务器渲染期间不可被调用**
- beforeUpdate
	- 用途：
		- 数据更新时调用，发生在虚拟 DOM 打补丁之前
		- 适合在更新之前访问现有 DOM，比如移除已添加的事件监听器
	- 场景：**服务器渲染期间不可被调用，因为初次渲染会在服务端进行**
- updated
	- 用途：
		- 数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后调用此钩子
		- 组件 DOM 已更新，可执行依赖 DOM 的操作
		- 应避免在此期间更改状态，比如对 data 再做更改，通常使用 watcher 和 computed
		- 不保证所有子组件都被一起被重绘，除非：
		```
			update:(){
				this.$nextTick(()=>{
					// 整个视图渲染完毕才会运行此代码
				})
			}
		```
	- 场景：**该钩子在服务器端渲染期间不被调用。**
- activated
	- 用途：被 `keep-alive` 缓存的组件激活时调用
	- 场景：**该钩子在服务器端渲染期间不被调用。**
- deactivated
	- 用途：被 `keep-alive` 缓存的组件停用时调用。
	- 场景：**该钩子在服务器端渲染期间不被调用。**
- beforeDestroy
	- 用途：实例销毁之前调用，在这一步，实例依然可以使用？
	- 场景：
		- 什么场景下实例被销毁？<!-- TODO -->
		- **该钩子在服务器端渲染期间不被调用。**
- destroyed
	- 用途：
		- 实例被销毁后
		- 所有指令都被解绑
		- 移除所有事件监听器
		- 所有子实例被销毁
	- 场景：**该钩子在服务器端渲染期间不被调用。**
- errorCaptured
	- 用途：
		- 当捕获子孙组件错误时被调用
		- 三个参数：错误对象，发送错误的组件实例，包含错误来源信息
		- 可返回 false 以阻止继续传播
		- 模板或渲染函数有一个条件判断绕开其他内容，否则无限渲染循环
	- 错误规则：
		- `config.errorHandler` 被定义，所有错误仍向它发送
		- 组件的继承或父级从属链路存在多个 `errorCaptured`，则被相同错误逐个唤起
		- `errorCaptured` 自身抛出一个错误，则会和原本捕获的错误都发送到 `config.captured`
		- `errorCaptured` 返回 `false`，意思是：这个错误搞定了可以被忽略，会阻止其他任何被这个错误唤起的 `errorCaptured` 钩子和全局 `config.errorHandler`
	- 场景：
## Vue 3 生命周期 （13）

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- activated
- deactivated
- **beforeUnmount**
	- 用途：以前的beforeDestroy
	- 场景：
- **unmounted**
	- 用途：以前的destroyed
	- 场景：
- errorCaptured
- **renderTracked**
	- 用途：
		- 跟踪虚拟 DOM 重新渲染被调用
		- 接受 `debugger: event` 作为参数，并告诉哪个操作跟踪了组件以及操作目标的对象和键
		```
			renderTracked({ key, target, type }) {
			console.log({ key, target, type })
			/* 当组件第一次渲染时，这将被记录下来:
			{
				key: "cart",
				target: {
					cart: 0
				},
				type: "get"
			}
			*/
			},
		```
- **renderTriggered**
	- 用途：
		- 虚拟 DOM 重新渲染为 triggered.Similarly 为 `renderTriggered` 触发
	- 场景：

## Vue 2 与 Vue 3 生命周期区别

### 选项 API 与 组合式 API 之间映射
- beforeCreate -> use setup()

- created -> use setup()

- beforeMount -> onBeforeMount

- mounted -> onMounted

- beforeUpdate -> onBeforeUpdate

- updated -> onUpdated

- beforeUnmount -> onBeforeUnmount

- unmounted -> onUnmounted

- errorCaptured -> onErrorCaptured

- renderTracked -> onRenderTracked

- renderTriggered -> onRenderTriggered



## beforeCreated 用生命作用

## mixin 的生命周期

## mixin 是怎么执行

## mixin 的实现原理

## var、let、const 的区别以及使用的场景

## TypeScript 泛型以及使用场景

## scss 变量可以摆覆盖吗？

## 网站性能提升

## 动态新增 src 地址的的 js 是异步的吗？

## 如果在上题目加了 defer 呢？如果不加 `defer`

## 如何实现多行省略号

- css
- js 放置图片

## 说一下 i18n

## 了解 promise
- 解决了什么问题？
- 它的三种状态？

## webpack 了解吗？是用做什么？

## 写一个函数实现 ”12345678“ => "12,345,678"

```js
const str = '12345678'
str.replaceAll(/{3}+$/,'$1,')

// 问题1: 如果左边不含数字

// 问题2: (?=) 先断言，(\d)(?=)数字后面必须是数字，会作为匹配bai校验，但不会出现在匹配结du果zhi字符串里面

// 问题3: 会作为匹配校验bai，并出现在匹配结果du字符里面，它跟(...)不同的zhi地方在于，不作为子匹配返。
```

## Chrome 支持 module

- Chrome 从 61 版本开始支持 es6 module
- 最开始的版本，需要打开flag JavaScript 的实验性功能

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script type="module" src="./ab.js" ></script>
  </head>
  <body></body>
</html>

```

```js

// a.js
const aa = "aaa";

export { aa };

// b.js
const bb = 'bbb'

export {bb} 
// ab.js

import { aa } from "./a.js";
import { bb } from "./b.js";

console.log(11111111111)
console.log(aa + bb);

```

```
ab.js:4 11111111111
ab.js:5 aaabbb
```
