
---
sidebar: auto
---

____________________________________________________________________

- @vue API 文档 en https://vuejs.org/v2/api
- @vue API 文档 cn https://cn.vuejs.org/v2/api
- @desc 以下内容为@veaba 根据自己的理解和参考文档整理
- @疑问 为什么有了en 和cn api文档，我还这么抄一遍人家官方的大纲？
> 答：里面会掺杂 我过去两年使用vue作为企业级开发框架的实践化经验，会以demo的形式加以解释，以便加深记忆。整理出来的原因是以为，本人记忆力日渐衰减，我必须以文本形式整理出来加以记忆，不然等于没学没做过项目一样，vue还是有很多我还没用过的地方，有些理解比较薄弱或者新增加的特性，还没实践到实际的企业项目开发中，毕竟还在学习中。如果有理解不对的地方，麻烦提issue，一起进步，一起学习
- @version vue v2 对应2019年2月15日 官方en版本
- @TODO 后续如果内容比较多的话，可能会拆为子 仓库。
- @TODO 翻写 一个vue框架！2020 Flag
____________________________________________________________________
## 从prototype角度 去看`vue函数`的结构
> 在用vue开发的网站上，在console 里输入 Vue.prototype 去看 这个vue 构造函数，vue.version 2.6.6

![vue-prototype](/images/vue-prototype.png)

- `$delete`: function del(target,key)
- `$destroy`: funcion()
- `$emit`: function(event)
- `$forceUpdate`:function()
- `$inspect`:function()
- `$mount`:function(el,hydrating)
- `$nextTick`:function(fn)
- `$off`:function(event,fn)
- `$on`:function(event,fn) 
- `$once`:function(event,fn)
- `$set`:funtion(target,key,val)
- `$watch`:function(expOrFn,cb,options)
- `__patch__`:patch(oldVnode,vnode,hydrating,removeOnly)
- `_b`:function bindObjectProps(data,tag,value,asProp, isSync)
- `_d`:function bindDynamicKeys(baseObj,values)
- `_e`:function (text)
- `_f`:funtion resolveFilter(id)
- `_g`:bindObjectListeners(data,value)
- `_i`:function looseIndexOf(val,render)
- `_init`:function options()
- `_k`:checkKeyCodes(eventKeyCode,key,builtKeyCode,eventKeyName,builtKeyName)
- `_l`:function renderList(val,render)
- `_m`:function renderStatic(index,isInFor)
- `_n`:function toNumber(val)
- `_o`:function markOnce(tree,index,key)
- `_p`:function prependModifier(value,symbol)
- `_q`:function looseEqual(a,b)
- `_render`:function()
- `_s`:function toString(val)
- `_t`:function renderSlot(name,fallback,props,bindObject)
- `_u`:function resolveScopedSlots(fns,res)
- `_update`:function (vnode,hydrating)
- `_v`:createTextVNode(val)
- `$data`:undefined
- `$isServer`:false
- `$props`:undefined
- `$ssrContent`:undefined
## 从函数对象角度去看，`vue` 内部属性
> 因为`Vue`实质上，就是一个函数对象，这时候，我们通过`Object.keys(Vue)`去打印出来它本身可枚举属性组成的数组，这和for... in 一样。`Object.keys(Vue)`只能打印属性，无法打印方法，如果是打印Vue的方法呢？
- `util`
    - `defineReactive`
    - `extend`
    - `mergeOptions`
    - `warn`
- `set`: fn 
- `delete`: fn 
- `nextTick`: fn 
- `observable`: fn 
- `options`
    - `components`
    - `directives`
    - `filters`
    - `_base`
- `use`: fn 
- `mixin`: fn 
- `cid`: 0
- `extend`: fn 
- `component`: fn 
- `directive`: fn 
- `filter`: fn 
- `version`:"2.6.6"
- `compile`: fn 
## 基础概念
## 疑问
- 如果把vue 看做一种设计模式，那么 实例化  `const vue = new Vue() `这个过程中，vue 是什么设计模式 的呢？
> 应该是构造函数+原型继承方法，组合继承/伪经典继承。

这意味着，如果让你去写Vue，其实应该是这样写的[*待确认]：
```js
function Vue(options){
    if(typeof options !=='object' &&typeof options!=='function'){
        console.log('error');
        return false
    }
    this.util=options.util;
    this.set=options.set;
    this.delete=opitions.delete
    // ...
}
Vue.prototyoe.$emit=function(){
    console.log('hello emit')
}

```
- 从main.js中看到。vue

- [疑问]为什么在`vue.prototype` 找不到`config`呢？

## 重点
____________________________________________________________________
## Global config `为什么有这个，Vue函数里面找不到，或者说应该怎么找，如果不看文档情况下~`
### `config.silent`
### `config.optionMergeStrategies`
### `config.devtools`
### `config.errorHandler`
### `config.warnHangdler`
### `config.ignoreElements`
### `config.keyCodes`
### `config.preformance`
### `config.productionTip`
## Global API
### `Vue.extend`
### `Vue.nextTick`
### `Vue.set`
### `Vue.delete`
### `Vue.directive`
### `Vue.filter`
### `Vue.component`
### `Vue.use`
### `Vue.mixin`
### `Vue.compile`
### `Vue.observable`
### `Vue.version`
## Options/Data
### `data`
### `props`
### `propsData`
### `computed`
### `methods`
### `watch`
## Options/DOM
### `el`
### `template`
### `render`
### `renderError`
## Options/Lifecycle Hooks
### beforeCreate
### created
### beforeMount
### mounted
### beforeUpdate
### updated
### activated
### deactivated
### beforeDestroy
### destroyed
### errorCaptured
## Options/Assets
### directives
### filters
### components
## Options/Composition
### parent
### mixins
### extends
### provide/inject
## Options/Mics
### name
### delimiters
### functional
### model
### inheriAttrs
### comments
## Instance Properties
### `vm.$data`
### `vm.$props`
### `vm.$el`
### `vm.$options`
### `vm.$parent`
### `vm.$root`
### `vm.$children`
### `vm.$slots`
### `vm.$copedSlots`
### `vm.$refs`
### `vm.$isServer`
### `vm.$attrs`
### `vm.$listeners`
## Instance Methods/Data
### `vm.$watch`
### `vm.$set`
### `vm.$delete`
## Instance Methods/Events
### `vm.$on`
### `vm.$once`
### `vm.$off`
### `vm.$emit`
## Instance Methods/Lifecle
### `vm.$mount`
### `vm.$forceUpdate`
### `vm.$nextTick`
### `vm.$destroy`
## Directives
### `v-text`
### `v-html`
### `v-show`
### `v-if`
### `v-else`
### `v-else-if`
### `v-for`
### `v-on`
### `v-bind`
### `v-model`
### `v-slot`
### `v-pre`
### `v-cloak`
### `v-once`
## Special Attributes
### key
### ref
### is
### slot
### slot-scope
### scope
## Built-ln Components
### component
### transtion
### transtion-group
### keep-alive
### slot
## VNode-Interface
## Server-Side Rendering

## 根据vue的打印数据，其他应该是这样的 见 https://github.com/veaba/web-advanced-frond-end/blob/master/demos/js/aVue.js
