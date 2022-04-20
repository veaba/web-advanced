(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{451:function(t,a,s){"use strict";s.r(a);var e=s(62),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"_2020年11月面试题以及常见面试题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2020年11月面试题以及常见面试题"}},[t._v("#")]),t._v(" 2020年11月面试题以及常见面试题")]),t._v(" "),s("h2",{attrs:{id:"使用-vue-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用-vue-3"}},[t._v("#")]),t._v(" 使用 Vue 3")]),t._v(" "),s("h2",{attrs:{id:"vue-2-生命周期-11"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-2-生命周期-11"}},[t._v("#")]),t._v(" Vue 2 生命周期 （11）")]),t._v(" "),s("ul",[s("li",[t._v("beforeCreate\n"),s("ul",[s("li",[t._v("用途：实例初始化后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。")]),t._v(" "),s("li",[t._v("源码：\n"),s("ul",[s("li",[s("code",[t._v("initMixin(Vue)")])]),t._v(" "),s("li",[s("code",[t._v("stateMixin(Vue)")])]),t._v(" "),s("li",[s("code",[t._v("eventsMixin(Vue)")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("$once")])]),t._v(" "),s("li",[s("code",[t._v("$off")])]),t._v(" "),s("li",[s("code",[t._v("$emit")])]),t._v(" "),s("li",[s("code",[t._v("$on")])])])]),t._v(" "),s("li",[s("code",[t._v("lifecycleMixin(Vue)")])]),t._v(" "),s("li",[s("code",[t._v("renderMixin(Vue)")])])])]),t._v(" "),s("li",[t._v("场景：")])])]),t._v(" "),s("li",[t._v("created\n"),s("ul",[s("li",[t._v("用途：实例创建完成后，被立即调用，已完成数据观测和方法的运算，watch/event 回调，但挂载未开始，"),s("code",[t._v("$el")]),t._v(" property 不可用\n"),s("ul",[s("li",[t._v("场景：")])])])])]),t._v(" "),s("li",[t._v("beforeMount\n"),s("ul",[s("li",[t._v("用途：挂载开始之前被调用，相关 render 函数首次被调用")]),t._v(" "),s("li",[t._v("场景："),s("strong",[t._v("服务器渲染期间不可被调用")])])])]),t._v(" "),s("li",[t._v("mounted\n"),s("ul",[s("li",[t._v("用途：\n"),s("ul",[s("li",[t._v("实例挂载 dom，"),s("code",[t._v("el")]),t._v(" 被新创建的 "),s("code",[t._v("vm.$el")]),t._v(" 替换。")]),t._v(" "),s("li",[t._v("但不会保证所有子组件也都被一起被挂载，除非在 mounted 内部使用 vm.$nextTick")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("\tmounted:(){\n\t\tthis.$nextTick(()=>{\n\t\t\t// 整个视图渲染完毕才会运行此代码\n\t\t})\n\t}\n")])])])]),t._v(" "),s("li",[t._v("场景："),s("strong",[t._v("服务器渲染期间不可被调用")])])])]),t._v(" "),s("li",[t._v("beforeUpdate\n"),s("ul",[s("li",[t._v("用途：\n"),s("ul",[s("li",[t._v("数据更新时调用，发生在虚拟 DOM 打补丁之前")]),t._v(" "),s("li",[t._v("适合在更新之前访问现有 DOM，比如移除已添加的事件监听器")])])]),t._v(" "),s("li",[t._v("场景："),s("strong",[t._v("服务器渲染期间不可被调用，因为初次渲染会在服务端进行")])])])]),t._v(" "),s("li",[t._v("updated\n"),s("ul",[s("li",[t._v("用途：\n"),s("ul",[s("li",[t._v("数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后调用此钩子")]),t._v(" "),s("li",[t._v("组件 DOM 已更新，可执行依赖 DOM 的操作")]),t._v(" "),s("li",[t._v("应避免在此期间更改状态，比如对 data 再做更改，通常使用 watcher 和 computed")]),t._v(" "),s("li",[t._v("不保证所有子组件都被一起被重绘，除非：")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("\tupdate:(){\n\t\tthis.$nextTick(()=>{\n\t\t\t// 整个视图渲染完毕才会运行此代码\n\t\t})\n\t}\n")])])])]),t._v(" "),s("li",[t._v("场景："),s("strong",[t._v("该钩子在服务器端渲染期间不被调用。")])])])]),t._v(" "),s("li",[t._v("activated\n"),s("ul",[s("li",[t._v("用途：被 "),s("code",[t._v("keep-alive")]),t._v(" 缓存的组件激活时调用")]),t._v(" "),s("li",[t._v("场景："),s("strong",[t._v("该钩子在服务器端渲染期间不被调用。")])])])]),t._v(" "),s("li",[t._v("deactivated\n"),s("ul",[s("li",[t._v("用途：被 "),s("code",[t._v("keep-alive")]),t._v(" 缓存的组件停用时调用。")]),t._v(" "),s("li",[t._v("场景："),s("strong",[t._v("该钩子在服务器端渲染期间不被调用。")])])])]),t._v(" "),s("li",[t._v("beforeDestroy\n"),s("ul",[s("li",[t._v("用途：实例销毁之前调用，在这一步，实例依然可以使用？")]),t._v(" "),s("li",[t._v("场景：\n"),s("ul",[s("li",[t._v("什么场景下实例被销毁？")]),t._v(" "),s("li",[s("strong",[t._v("该钩子在服务器端渲染期间不被调用。")])])])])])]),t._v(" "),s("li",[t._v("destroyed\n"),s("ul",[s("li",[t._v("用途：\n"),s("ul",[s("li",[t._v("实例被销毁后")]),t._v(" "),s("li",[t._v("所有指令都被解绑")]),t._v(" "),s("li",[t._v("移除所有事件监听器")]),t._v(" "),s("li",[t._v("所有子实例被销毁")])])]),t._v(" "),s("li",[t._v("场景："),s("strong",[t._v("该钩子在服务器端渲染期间不被调用。")])])])]),t._v(" "),s("li",[t._v("errorCaptured\n"),s("ul",[s("li",[t._v("用途：\n"),s("ul",[s("li",[t._v("当捕获子孙组件错误时被调用")]),t._v(" "),s("li",[t._v("三个参数：错误对象，发送错误的组件实例，包含错误来源信息")]),t._v(" "),s("li",[t._v("可返回 false 以阻止继续传播")]),t._v(" "),s("li",[t._v("模板或渲染函数有一个条件判断绕开其他内容，否则无限渲染循环")])])]),t._v(" "),s("li",[t._v("错误规则：\n"),s("ul",[s("li",[s("code",[t._v("config.errorHandler")]),t._v(" 被定义，所有错误仍向它发送")]),t._v(" "),s("li",[t._v("组件的继承或父级从属链路存在多个 "),s("code",[t._v("errorCaptured")]),t._v("，则被相同错误逐个唤起")]),t._v(" "),s("li",[s("code",[t._v("errorCaptured")]),t._v(" 自身抛出一个错误，则会和原本捕获的错误都发送到 "),s("code",[t._v("config.captured")])]),t._v(" "),s("li",[s("code",[t._v("errorCaptured")]),t._v(" 返回 "),s("code",[t._v("false")]),t._v("，意思是：这个错误搞定了可以被忽略，会阻止其他任何被这个错误唤起的 "),s("code",[t._v("errorCaptured")]),t._v(" 钩子和全局 "),s("code",[t._v("config.errorHandler")])])])]),t._v(" "),s("li",[t._v("场景：")])])])]),t._v(" "),s("h2",{attrs:{id:"vue-3-生命周期-13"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-3-生命周期-13"}},[t._v("#")]),t._v(" Vue 3 生命周期 （13）")]),t._v(" "),s("ul",[s("li",[t._v("beforeCreate")]),t._v(" "),s("li",[t._v("created")]),t._v(" "),s("li",[t._v("beforeMount")]),t._v(" "),s("li",[t._v("mounted")]),t._v(" "),s("li",[t._v("beforeUpdate")]),t._v(" "),s("li",[t._v("updated")]),t._v(" "),s("li",[t._v("activated")]),t._v(" "),s("li",[t._v("deactivated")]),t._v(" "),s("li",[s("strong",[t._v("beforeUnmount")]),t._v(" "),s("ul",[s("li",[t._v("用途：以前的beforeDestroy")]),t._v(" "),s("li",[t._v("场景：")])])]),t._v(" "),s("li",[s("strong",[t._v("unmounted")]),t._v(" "),s("ul",[s("li",[t._v("用途：以前的destroyed")]),t._v(" "),s("li",[t._v("场景：")])])]),t._v(" "),s("li",[t._v("errorCaptured")]),t._v(" "),s("li",[s("strong",[t._v("renderTracked")]),t._v(" "),s("ul",[s("li",[t._v("用途：\n"),s("ul",[s("li",[t._v("跟踪虚拟 DOM 重新渲染被调用")]),t._v(" "),s("li",[t._v("接受 "),s("code",[t._v("debugger: event")]),t._v(" 作为参数，并告诉哪个操作跟踪了组件以及操作目标的对象和键")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('\trenderTracked({ key, target, type }) {\n\tconsole.log({ key, target, type })\n\t/* 当组件第一次渲染时，这将被记录下来:\n\t{\n\t\tkey: "cart",\n\t\ttarget: {\n\t\t\tcart: 0\n\t\t},\n\t\ttype: "get"\n\t}\n\t*/\n\t},\n')])])])])])]),t._v(" "),s("li",[s("strong",[t._v("renderTriggered")]),t._v(" "),s("ul",[s("li",[t._v("用途：\n"),s("ul",[s("li",[t._v("虚拟 DOM 重新渲染为 triggered.Similarly 为 "),s("code",[t._v("renderTriggered")]),t._v(" 触发")])])]),t._v(" "),s("li",[t._v("场景：")])])])]),t._v(" "),s("h2",{attrs:{id:"vue-2-与-vue-3-生命周期区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-2-与-vue-3-生命周期区别"}},[t._v("#")]),t._v(" Vue 2 与 Vue 3 生命周期区别")]),t._v(" "),s("h3",{attrs:{id:"选项-api-与-组合式-api-之间映射"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#选项-api-与-组合式-api-之间映射"}},[t._v("#")]),t._v(" 选项 API 与 组合式 API 之间映射")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("beforeCreate -> use setup()")])]),t._v(" "),s("li",[s("p",[t._v("created -> use setup()")])]),t._v(" "),s("li",[s("p",[t._v("beforeMount -> onBeforeMount")])]),t._v(" "),s("li",[s("p",[t._v("mounted -> onMounted")])]),t._v(" "),s("li",[s("p",[t._v("beforeUpdate -> onBeforeUpdate")])]),t._v(" "),s("li",[s("p",[t._v("updated -> onUpdated")])]),t._v(" "),s("li",[s("p",[t._v("beforeUnmount -> onBeforeUnmount")])]),t._v(" "),s("li",[s("p",[t._v("unmounted -> onUnmounted")])]),t._v(" "),s("li",[s("p",[t._v("errorCaptured -> onErrorCaptured")])]),t._v(" "),s("li",[s("p",[t._v("renderTracked -> onRenderTracked")])]),t._v(" "),s("li",[s("p",[t._v("renderTriggered -> onRenderTriggered")])])]),t._v(" "),s("h2",{attrs:{id:"beforecreated-用生命作用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#beforecreated-用生命作用"}},[t._v("#")]),t._v(" beforeCreated 用生命作用")]),t._v(" "),s("h2",{attrs:{id:"mixin-的生命周期"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mixin-的生命周期"}},[t._v("#")]),t._v(" mixin 的生命周期")]),t._v(" "),s("h2",{attrs:{id:"mixin-是怎么执行"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mixin-是怎么执行"}},[t._v("#")]),t._v(" mixin 是怎么执行")]),t._v(" "),s("h2",{attrs:{id:"mixin-的实现原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mixin-的实现原理"}},[t._v("#")]),t._v(" mixin 的实现原理")]),t._v(" "),s("h2",{attrs:{id:"var、let、const-的区别以及使用的场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#var、let、const-的区别以及使用的场景"}},[t._v("#")]),t._v(" var、let、const 的区别以及使用的场景")]),t._v(" "),s("h2",{attrs:{id:"typescript-泛型以及使用场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#typescript-泛型以及使用场景"}},[t._v("#")]),t._v(" TypeScript 泛型以及使用场景")]),t._v(" "),s("h2",{attrs:{id:"scss-变量可以摆覆盖吗"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#scss-变量可以摆覆盖吗"}},[t._v("#")]),t._v(" scss 变量可以摆覆盖吗？")]),t._v(" "),s("h2",{attrs:{id:"网站性能提升"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#网站性能提升"}},[t._v("#")]),t._v(" 网站性能提升")]),t._v(" "),s("h2",{attrs:{id:"动态新增-src-地址的的-js-是异步的吗"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动态新增-src-地址的的-js-是异步的吗"}},[t._v("#")]),t._v(" 动态新增 src 地址的的 js 是异步的吗？")]),t._v(" "),s("h2",{attrs:{id:"如果在上题目加了-defer-呢-如果不加-defer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如果在上题目加了-defer-呢-如果不加-defer"}},[t._v("#")]),t._v(" 如果在上题目加了 defer 呢？如果不加 "),s("code",[t._v("defer")])]),t._v(" "),s("h2",{attrs:{id:"如何实现多行省略号"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何实现多行省略号"}},[t._v("#")]),t._v(" 如何实现多行省略号")]),t._v(" "),s("ul",[s("li",[t._v("css")]),t._v(" "),s("li",[t._v("js 放置图片")])]),t._v(" "),s("h2",{attrs:{id:"说一下-i18n"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#说一下-i18n"}},[t._v("#")]),t._v(" 说一下 i18n")]),t._v(" "),s("h2",{attrs:{id:"了解-promise"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#了解-promise"}},[t._v("#")]),t._v(" 了解 promise")]),t._v(" "),s("ul",[s("li",[t._v("解决了什么问题？")]),t._v(" "),s("li",[t._v("它的三种状态？")])]),t._v(" "),s("h2",{attrs:{id:"webpack-了解吗-是用做什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#webpack-了解吗-是用做什么"}},[t._v("#")]),t._v(" webpack 了解吗？是用做什么？")]),t._v(" "),s("h2",{attrs:{id:"写一个函数实现-12345678-12-345-678"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#写一个函数实现-12345678-12-345-678"}},[t._v("#")]),t._v(' 写一个函数实现 ”12345678“ => "12,345,678"')]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" str "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'12345678'")]),t._v("\nstr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token regex"}},[s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("(\\d)(?=(?:\\d{3})+$)")]),s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("g")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$1,'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 问题1: 如果左边不含数字")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// `(?=)` 匹配校验，但不出现在匹配结果字符串里")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// `(?:)` 匹配校验，出现在匹配结果里")]),t._v("\n")])])]),s("h2",{attrs:{id:"chrome-支持-module"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#chrome-支持-module"}},[t._v("#")]),t._v(" Chrome 支持 module")]),t._v(" "),s("ul",[s("li",[t._v("Chrome 从 61 版本开始支持 es6 module")]),t._v(" "),s("li",[t._v("最开始的版本，需要打开flag JavaScript 的实验性功能")])]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token doctype"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<!")]),s("span",{pre:!0,attrs:{class:"token doctype-tag"}},[t._v("DOCTYPE")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token name"}},[t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("lang")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("en"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("charset")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("UTF-8"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("viewport"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("width=device-width, initial-scale=1.0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("title")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Document"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("title")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("module"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("./ab.js"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}}),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n")])])]),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// a.js")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" aa "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"aaa"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" aa "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// b.js")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" bb "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bbb'")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("bb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ab.js")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" aa "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./a.js"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" bb "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./b.js"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("11111111111")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("aa "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" bb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n")])])]),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("ab.js:4 11111111111\nab.js:5 aaabbb\n")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);