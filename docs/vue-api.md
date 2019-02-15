____________________________________________________________________

- @vue API 文档 en https://vuejs.org/v2/api
- @vue API 文档 cn https://cn.vuejs.org/v2/api
- @desc 以下内容为@veaba 根据自己的理解和参考文档整理
- @疑问 为什么有了en 和cn api文档，我还这么抄一遍人家官方的大纲？
> 答：里面会掺杂 我过去两年使用vue作为企业级开发框架的实践化经验，会以demo的形式 加以解释，以便加深记忆。整理出来的原因是，本人记忆力日渐衰减，我必须以文本形式整理出来加以记忆，不然等于没学没做过项目一样，vue还是有很多我还没用过的地方，有些理解比较薄弱或者新增加的特性，还没实践到实际的企业项目开发中，毕竟还在学习中，如果有理解不对的地方，麻烦提issue，一起进步，一些学习
- @version vue v2 对应2019年2月15日 官方en版本
- @TODO 后续如果内容比较多的话，可能会拆为子 仓库。
____________________________________________________________________
## 从prototype角度 去看`vue函数`的结构
> 在用vue开发的网站上，在console 里输入 Vue.prototype 去看 这个vue 构造函数,vue.version 2.6.6
- 
## 从函数对象角度去看，`vue` 内部属性
> 因为`Vue`实质上，就是一个函数对象，这时候，我们通过`Object.keys(Vue)`去打印出来它本身可枚举属性组成的数组，这和for... in 一样。`Object.keys(Vue)`只能打印属性，无法打印方法，如果是打印Vue的方法呢？
## 基础概念
## 疑问
- 如果把vue 看做一种设计模式，那么 实例化  `const vue = new Vue() `这个过程中，vue 是什么设计模式 的呢？
> 应该是构造函数+原型继承方法，组合继承/伪经典继承。

这意味着，如果让你去写Vue，其实应该是这样写的[*待确认]：
```js
function Vue(options){
    if(typeof options !=='object' &&typeof options!=='function'){
        console.log('error')
        return false
    }
    this.util=options.util
    this.set=options.set
    this.delete=opitions.delete
    // ...
}
Vue.prototyoe.$emit=function(){
    console.log('hello emit')
}

```
- 从main.js中看到。vue
## 重点
____________________________________________________________________
## Global config
## Global API
## Options/Data
## Options/DOM
## Options/Lifecycle Hooks
## Options/Assets
## Options/Composition
## Options/Mics
## Instance Properties
## Instanee Methods/Data
## Instance Methods/Events
## Instance Methods/Lifecle
## Directives
## Special Attributes
## Built-ln Components
## VNode-Interface
## Server-Side Rendering