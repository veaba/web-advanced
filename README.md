
> 进阶web高级前端知识体系：来自个人的面试经历、学习笔记、参考大神们的blog，以及常见面试题！不代表内容的正确性！！！！有一部分还在带着问号！以下内容是随手记下的笔记，还在学习中，等哪天觉得成熟了，才会整理更好的内容梳理。 by@veaba
-----------------------------------------------------------------
# 目录 web-advanced-frond-end
- [比较难的部分_尚未掌握](#比较难的部分_尚未掌握)
- [Canvas](#Canvas)
- [vue源码学习](#vue源码学习)
- [Vue技术栈](#Vue技术栈)
- [Http协议](#Http协议)
- [业务技巧相关_尚未](#业务技巧相关)
- [Web安全问题](#Web安全问题)
- [性能提升](#性能提升)
- [Css部分](#Css部分)
- [Js概念_基础知识](#Js概念_基础知识)
- [JavaScript设计模式](#JavaScript设计模式)
- [BOM对象](#BOM对象)
- [DOM对象](#DOM对象)
- [PWA](#PWA)
- [Nginx](#Nginx)
- [Nuxt](#Nuxt)
- [TypeScript_尚未](#TypeScript_尚未)
- [Lavas](#Lavas_尚未)
- [Es6](#Es6)
- [Node.js](#Node.js)
- [继承](#继承)
- [原型与原型链](#原型与原型链)
- [一些流行的技术题目](#一些流行的技术题目)
- [附1__2018年阿里资深web前端面试题_未附](#附1__2018年阿里资深web前端面试题_未附)
- [附2__2018年网易高级web前端面试题_未附](#附2__2018年网易高级web前端面试题_未附)
- [附3__2018年中级/高级web前端面试题_未附](#附3__2018年中级/高级web前端面试题_未附)
- [附4__2018年8月15日电话面试基础题_未附](#附4__2018年8月15日电话面试基础题_未附)
- [附5__2018年8月17日面试题](#附5__2018年8月17日面试题)
- [附6__2018年8月31日面试题](#附6__2018年8月31日面试题)
- [附7__2018年9月11日面试题](#附7__2018年9月11日面试题)
- [附8__2018年9月18日面试题](#附8__2018年9月18日面试题)
- [附9__2018年9月19日面试题](#附9__2018年9月19日面试题)
- [附10__2018年12月份面试题](#附10__2018年12月份面试题)
- [描述__关于术语描述sup标签](#描述__关于术语描述sup标签)
- [索引__关于本作知识引用来源sub标签](#索引__关于本作知识引用来源sub标签)
------------------------------------------------------------------

## 比较难的部分_尚未掌握

### 未来需要了解的内容 
>一个不错的web前端知识体系梳理   https://www.jikexueyuan.com/zhiye/web
- this
- 冒泡算法
- 继承
- react
- 小程序/微信/百度/快应用/支付宝
- 闭包
- 深拷贝
- 浅拷贝
- class
- Generator
- webgl
- canvas
- proxy
## Canvas 
### RequestAnimationFrame

## vue源码学习

- [勾三股四 Vue.js 源码学习笔记](http://jiongks.name/blog/vue-code-review/)
- [HcySunYang Vue2.1.7源码学习](http://hcysun.me/2017/03/03/Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/)
- [Vue技术内幕-HcySunYang](http://hcysun.me/vue-design/)
- [Vue.js 技术揭秘-ustbhuangyi](https://ustbhuangyi.github.io/vue-analysis/ )
### vue3.0 `先占坑`
>https://www.bilibili.com/video/av36787459/ vue.js 3.0 最新进展，来自 Vue Conf 杭州

#### 模板编译、Virtual Dom runtime性能
  - Virtual DOM 实现 `完全重构，100%，减少运行时开销（潜在），编译时来提供性能`
    - 重构原生HTML标签的判断逻辑，编译时，判断标签，在运行时生成响应的标签或组件
    - 生成虚拟Node，保持“形状一致”，同样个数的参数，利于JavaScript引擎优化
    - 运行时留下Hint，静态分析元素包含的子元素类型，以便跳过不必要分支判断
  - 优化Slots 生成
    - 拆分父组件和子组件的耦合关系，引入生成函数，scope、slot统一称为一个函数，由子组件决定是否调用函数，并把传入的内容分配给子组件来完成收集，避免不要的组件渲染
    - 真正依赖某个数据的组件，才会可能重新渲染，不存在手动优化组件过度重绘问题
  - 静态内容提取
    - 检测到一部分模板不会变，直接提取，在之后更新中，直接复用 Virtual dom，甚至可以在比对过程跳过整个树
    - 包含深度动态内容时，如果元素所有的属性都是静态的，提取属性对象，比对元素时，发现data都一样，便可跳过，去比对children即可
  - 内联事件函数提取
    `<Com @event="count++">`
    - 重新渲染时会生成新函数，Cache后，以便重用，避免子组件无谓更新的效果
#### 数据监听系统
  - 把Object.defineProperty 改为 proxy
  - 全语言特性支持
    - 新属性增加
    - 属性的删除
    - 数组index
    - 数组length 的修改
    - Map
    - Set
    - WeakMap
    - WeakSet
    - 大规模数据帧听性能提升
  - 利用proxy 内部判断，减少组件实例初始化开销
  - 实测，内存减半，性能提升100%
#### 减少runtime 体积，目测测试10kb左右
  - tree-shaking代码结构，按需引入 import
    - 内置组件
      - keep-alive
      - transition
    - 指令运行时
      - v-model
      - v-for
    - 工具函数
      - async component
      - mixins
      - memoize`new 新的工具函数`

#### 更易维护
  - flow 迁移 typeScript
    - 降低源码阅读能力，引入了类型信息
    - 内部模块解耦，如独立observer
    - 让更多的开发者参与进来
  - 编译器重构
    - 插件化设计
    - 带位置信息的parser（source maps）
    - 铺路 IDE工具链，如 vetur 作者作为vscode团队成员参与vue 3.0的开发 
#### 多端渲染支持
  - 场景
    - `vue native`
    - `wexx`
    - `mpvue` 小程序
  - vue作为runtime编译到多端
    - 独立出真正的 customer render API，在 `import {createRenderer} from '@vue/runtime-core'`，平台无关vue runtime
    - vue组件和 Virtual Dom 直接渲染到元素的对象上去
#### 响应式数据监听API
  - 实现跨组件的状态共享
  - 排查组件更新的触发原因
    - 提供新的 renderTriggered API
#### 更好的typeScript 支持以及原生的Class API 和 TSX
  - 甚至不需要babel
#### 更好的警告信息
  - 组件堆栈包含函数式组件
  - 可以在警告信息中查看组建的props
  - 在更新的警告中提供组件堆栈信息

####  Experimental Hooks API，逻辑重用机制，可能取代mixins
  - Hooks 替代mixins
  - Time Slicing Support 切割JavaScript 计算，一帧一帧去处理，预留每16ms yield给浏览器让用户事件重新进来，允许中间有机会让用户添加进事件
#### 关于IE
  - IE11自动降级为旧的getter/setter机制
  - 并引入增加不支持IE的语法警告
### 启动

```mpm
cnpm install -g karma (运行时test 是基于 Karma 的)
cnpm install --save mime-db
cnpm install (安装依赖)
cnpm run dev:test

```

### 源码项目结构

[vue官方开发文档](https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md#development-setup)

- `scripts` 一般不需要关注，不过熟悉以下两个文件会更好
  - `scripts/alias.js`  所有源码和测试中使用模块导入的别名
  - `scripts/config.js` 包含生成`dist/`的所有文件的配置，查找入口文件，都在这个`dist`都在里面
- `dist` 包含用户发布的内置文件。此目录只会在发布的时候更新，并不能说明当前开发的最新特性变化。
  - 关于dist的信息请查看 [更多](https://github.com/vuejs/vue/blob/dev/dist/README.md)
- `flow` 包含flow 的类型声明。全局加载的，可以在普通源码中看到他们在注释中的使用
- `packages` 包含 vue ssr 和 vue 模板编译 包。vue的依赖包
- `test` 包含所有测试。单元测试是Jasmine写的，运行是用Karma。e2e 是Nighwatch.js 编写和运行的。
- `src` 包含源代码。基本代码是es2015编写的，并用flow 来做类型注释
  - `compiler` 编译器。包含模板转函数编译器的代码。
  - `parse` 解析器（将字符串模板转为抽象语法树AST）
  - `optimizer` 优化器（检测用于`vdom`呈现优化的静态树）
  - `code generator`代码生成器（将抽象语法树生成渲染函数代码）

  代码生成器直接从抽象语法树生成字符串，这样做的代码规格较小，因为编译器在独立构建中，发送给浏览器的
  - `core` 包含通用，无关平台运行时的代码。
    - vue2.0开始 core 就与平台无关。这意味着，你可以运行在浏览器、nodejs、或者嵌入式js里面。
    - `observer` 观察者。包含与响应式系统相关的代码。
    - `vdom` 虚拟dom。 包含虚拟dom 创建元素的相关代码和补丁。
    - `instance` 实例。包含Vue 实例构造函数和原型对象(prototype)方法。
    - `global-api` 顾名思义，就是全局的api
    - `components` 通过抽象组件，目前 keep-alive 是唯一的一个。
  - `server`　包含ssr（服务端渲染 server-side rendering）相关代码
  - `platforms` 包含特定平台的代码。

  来自 `dist/build`的入口文件位于各自平台的目录中。
  每个平台模块包含三个部分：编译器compiler、运行时runtime、服务器server。对应上面的三个目录，每个部分都包含特定的平台的 模块/实用 程序，然后导出并注入到平台特定的目录文件中的core项中。例如，实现v-bind:class 背后的逻辑的核心就是在 `platforms/web/runtime/modules/class.js` ——这个入口是在`entries/web-runtime.js` ，用于创建特定浏览器的vdom的修补功能。
  - `sfc` 包含单文件组件(*.vue)解析逻辑。用到 package 中的 vue-template-compiler 依赖包。
  - 包含整个代码库中共享的实用程序。

## Vue技术栈
- [更多关于VUE API人工整理手记，见 /docs/vue-api.md @veaba](./docs/vue-api.md)

```vue
<div id="app" @click="send">
{{message}}
</div>
```
```js
var app = new Vue({
  el:"#app",/*可以是class？*/
  data:{
    message:"hello world!"
  },
  methods:{
    send(){
      this.message="change something ha?"
    }
  }

})

```

###  疑问点
- vue 里面的打补丁 扮演何种角色？
- vue如何处理定时器或者销毁定时器的？
> 在`beforeDestroy`里面处理
```ecmascript 6
export default {
	
  data(){
    return {
      second:5,
      timer:null
    }
  },
  mounted:function(){
    this.timer=setInterval(()=>{
      if(this.second===0) this.backPre();
      else this.second--
    },1000)
  },
  beforeDestroy(){
    clearInterval(this.timer)
  },
  methods:{
    backPre(){
      return 'Do you want what me to do,ha?'
    }
  }
}

```
### vue 基础知识

| 英文 | 建议翻译 |
| --- | --- |
| observe/observer | 侦听/侦听器 |
| watch/watcher | 侦听/侦听器 |
| subs |订阅|
| patch |打补丁？|
| deps |依赖关系|

- Vue 响应式原理分析

  - 核心 Object.defineProperty 在一个对象上定义一个新属性，修改一个对象的现有属性，并返回这个对象。[mdn了解defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
    - 语法
 
	```js
	/**
	*@obj 要定义属性的对象
	*@prop 要定义或修改的属性的名称
	*@descriptor 定义或修改的属性描述符，一个对象。核心的是get/set
	* get 给属性提供一个getter方法，访问该属性则触发getter方法
	* set 给属性提供一个setter方法，当对属性修改时触发setter方法
	*/ 
	Object.defineProperty(obj,prop,descriptor)
	  
	```
    - 一旦对象拥有了getter和setter，可以认为这个对象是响应式对象
  
  - vue 把什么对象变成响应式对象?
    - initState。初始化就是props、data变成响应式对象
      - _init 方法执行时候，会执行initState(vm)方法，定义在src/core/instance/state.js
      - initProps
      - initMethods
      - initData
      - initComputed
      - initWatch

  - proxy 代理
    - 作用时将props 和data上的属性都代理到vm实例上。
    
	```js
	let comP={
	  props:{
	    msg:"hello"
	  },
	  methods:{
	    say(){
	      /*
	      *@desc  say函数通过this.msg访问到定义在props上的msg，这个过程就发生在proxy
	      */
	      console.log(this.msg)
	    }
	  }
	};
	
	const sharePropertyfinition={
	  enumerable:true,
	  configurable:true,
	  get:noop,
	  set:noop
	};
	 /*
	 *@desc proxy函数
	 *@desc 通过Object.defineProperty 把target[sourceKey][key]读写变成target[key]
	 */
	export function proxy(target,sourceKey,key){
	  sharePropertyDefinition.get=function proxyGetter(){
	    return this[sourceKey][key]
	  };
	  sharePropertyDefinition.set=function proxySetter(val){
	    this[sourceKey][key]=val
	  };
	  Object.defineProperty(target,key,sharePropertyDefinition)
	}

	```
  - observe 
    - 监测数据的变化，定义在src/core/observer/index.js
    - 给非vnode对象类型数据添加一个Observer，添加或已有返回，否则满足一定情况下，实例化一个？Observer对象实例
  - getter: 依赖收集
    - const dep = new Dep() 实例化一个Deo的的实例
    - 通过dep.depend 收集依赖
    - Dep 整个getter依赖收集的核心
    - 依赖收集的目的是当这些响应式数据发送变化时，触发他们的setter的时候，能够知道通知哪些订阅者去做响应的逻辑处理，这过程叫派发更新。

  - setter: 派发更新。收集的目的是为了修改数据时候，对相关的依赖派发更新
    - 如果shallow 为false 对新设置的值变化成一个响应式对象
    - dep.notify()通知所有订阅者。
      - 遍历所有订阅者subs，也就是watcher的实例数组，然后调用watcher的update方法
      - queueWatcher  放在nextTick队列，等待flushSchedulerQueue
        - flushSchedulerQueue 队列排序。
          - 先父到子
          - 用户watcher 优先render watcher
          - 执行期间被销毁则跳过
        - flushSchedulerQueue 队列遍历
          - watcher.run()每次都是queue.length求值。
            - this.getAndInvoke方法，并传入watcher的回调函数。
        - 状态恢复。
          - resetSchedulerState  函数。
            - 变量恢复到初始值，清空watcher队列

  - Dep
    - 一个依赖就是一个watcher
    - 是一个class，有一个target静态属性，全局唯一Watcher,被认为是一个巧妙的设计，保证同一时间只有一个全局的watcher被计算。另外自身属性subs 也是watcher的数组。
        - Dep 是watcher的一种管理，脱离watcher单独存在没有意义
        - 触发getter时候，会调用dep.depend()方法，也会执行Dep.target.addDep(this)
        - Dep.target已经被赋值为渲染watcher，会执行addDep方法，保证同一数据不会被添加多次。执行dep.addSub(this)，执行this.subs.push(sub)。把watcher订阅到这个数据持有的dep的subs中，为后续数据变化时候能通知到哪些subs做准备
        - 完成依赖收集之后，再递归访问value，触发所有子项的getter—— popTarget()
        - Dep.target=targetStack.pop() 返回成上一个状态，因为当前vm的数据依赖收集已完成。对应的Dep.target也需要改变，最后执行this.cleanUpDeps()
        - this.cleanUpDeps()
          - 变量deps，移除对dep的订阅。交换newDepIds 和depIds，newDeps和deps，并把newDepIds和newDeps清空
  - defineReactive 方法 
    - 定义一个响应式对象，给对象添加getter/setter，src/core/observer/index中
    - 初始化Dep对象实例
    - 对子对象递归调用observe方法，保证无论访问多少层的属性都能触发getter/setter
    - 最后利用Object.defineProperty方法对obj属性的key 添加getter/setter

  - Observer 通过Object.defineProperty实现对属性变化的监听。
    - 是一个类
    - 作用是，给对象的属性添加一个getter、setter，用于依赖收集和派发更新
    - 构造函数逻辑：实例化Dep对象
    - 为对象添加一个__ob__属性，调用def(封装的Object.defineProperty)
    - 对value判断
      - 是数。调用observeArray 方法——先遍历数组再调用observe方法
      - 是纯对象。调用walk方法——先
      遍历对象，再调用defineReactive方法

  - Watcher 订阅者。observe和compile之间，负责将变化的数据更新到视图
    - 是一个class 。  
    - this.deps Watcher实例持有Dep实例的数组
    - this.newDeps Watcher实例持有Dep实例的数组
    - this.desIds —— this.deps id Set结构
    - this.newDepIds —— this.newDeps id Set结构
    - 至于为什么有两个实例数组？
    ```js
      this.deps = [];
      this.newDeps = [];
      this.depIds = new Set();
      this.newDepIds = new Set()
    ```
- 生命周期，选项？？？这个在Vue构造器的传参中何种方式？
  - beforeCreate 实例初始化后 data observer 和event/watcher 事件配置之前被调用
  - created 实例创建完成被立即调用（data observe，属性和方法的运损，watch/event事件回调），此时`挂载`还没有开始,`$el`目前不可见。当然此时也是可以通过nextTick()来取到document的
  - beforeMount 挂载之前被调用，render函数首次被调用，该钩子在服务端渲染器件不被调用
  - mounted `el`被新创建的`vm.$el`替换，并挂载到实例上调用，无法确保所有子组件都一起挂载。ssr不被调用。希望等到整个视图都渲染完毕，可以：
  ```ecmascript 6
    export default {
	 mounted(){
          this.$nextTick=function(){
            //拉拉
          }
        }
  }
  ```
  - beforeUpdate 数据更新时，发生在爱DOM`打补丁`之前，适合更新之前访问现有的DOM，如手动移除已添加的事件监听器。SSR渲染期间不可用
  - updated 数据更新导致虚拟DOM重新渲染和`打补丁`，DOM已更新，无法确保所有子组件全都一起被重绘。SSR渲染器件不可用。可以这样做：
  ```ecmascript 6
  export default {
    updated(){
          this.$nextTick=function(){  
        	  // do something
			}
        }
      }
  ```
  - activated keep-alive 组件激活时被调用，SSR渲染期间不可用
  - deactivated keep-alive 组件停用时调用，SSR渲染期间不可用
  - beforeDestroy 实例销毁之前调用，在这一步实例依然完全可以用，SSR渲染期间不可用
  - destroyed 实例销毁后被调用，调用后实例指示所有东西解绑，所有事件移除，子实例也被销毁，SSR渲染期间不可用
  - errorCaptured 当捕获一个来自子孙组件的错误时被调用，(errorObj、发生错误组件实例、一个错误来源信息的字符串)，可以返回false阻止该错误向上传播

- 组件通信

  - 父传子
    - $props

  - 子传父
    - $emit
- api
### api

- el 
可以是css 选择器，可以是HTMLElement 实例<sub>[HTMLElement实例是什么?](http://www.w3school.com.cn/xmldom/dom_htmlelement.asp)</sub>

- 全局
```js
  const Vue={
  //config、全局配置
  config:{
      silent:false,//boolean 取消vue所有的日志的警告
      optionMergeStrategies:{_test:function(){}},//{[key:string]:Function}//自定义合并策略的选项
      devtools:true,//生产false,允许vue-devtools检查代码
      errorHandle:function(err,vm,info){},//默认undefined，
      warnHandler:function(msg,vm,trace){},//警告处理函数，开发环境下生效
      ignoredElements:[],//Array<string|RegExp> 忽略vue之外定义的元素
      keyCodes:{},//{ [key: string]: number | Array<number> }
      performance:false,// true浏览器开发者工具性能跟踪
      productionTip:true,//false 阻止vue启动时生成生产提示
  },
  //extend
  extend:{},//使用vue构造器创建一个子类，拓展构造器！！！
  // nextTick
  nextTick:function(){},
  // set
  set:{target,key,value},//确保响应式更新
  delete:{target,key},//避免被删除无法触发更新，但尽量少用它
  directive:(id,[definition]),//指令
  filter:(id,[defintion]),//注册或获取全局过滤器
  component:(id,[definition]),//注册或获取全局组件
  use:(object| Function),//安装vue 插件
  mixin:{Object},//混入
  compile:{string},//template 编译字符
  version:string//版本号
}
```

### vue-cli 3.0
- 则选择typescript+vue的开始模式
- 也支持预装
#### 开发者注意以下问题

- product 环境下，关闭sourceMap
- product 环境下，尽量关闭console
- 配置devServer
- 多页应用,会导致页面重复大一倍

### vue-router  路由
- vue router 懒加载
- vue 路由的几种模式，history 和hash 的原理是什么？
### vue 相关面试题

- 为什么vue 的data 是一个函数?

  - 由于js语法特性决定来使用一个函数赋值。
### 基于vue-cli 3.0 demo项目框架 

## Http协议
### http

- http 请求与响应
  - request，请求
  > key的一般大写开头，也可以小写，一把大写，基本随开发者喜好。
    - 请求头 header
```js
const json ={
  'Accept':'text/plain,text/html',/*指定客户端能够接受的内容类型，也可以是星号  */
  'Accept-Encoding':'gzip, deflate, br',/*指定浏览器可以支持的web服务器返回内容压缩编码类型。*/
  'Accept-Language':'en,zh',/*语言*/
  'Authorization':'Basic xxxx',/*HTTP授权的证书*/
  'Cache-control':'no-cache',/*指定请求和响应遵从的缓存机制*/ 
  'Content-Type':'text/html',
  'Connection':'close',/*是否是持久链接，http1.1默认持久:Keep-Alive*/
  'Content-Length':233,
  'Date':'Tue, 18 Sep 2018 11:05:26 GMT',
  'access-control-allow-origin':'*',/*允许所有域名的脚本访问该资源,保护静态资源么*/
  'Status':200,
  'Cookie':'xx',
  'Host':'www.baidu.com',
  'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36'/*浏览器特征编码*/
}
```
    - 请求体
  - response，响应
    - 响应头 header
```js
const json ={
  'Age':12,//原始服务器到代理缓存形成的估算时间
  'Content-Type':'text/html;charts=utf-8',
  'Cache-Control':'no-cache',/*告诉素有的缓存机制是否可以缓存以及哪种类型*/
  'Content-Languge':'en,zh',
  'Content-Length':2121,/*响应体的长度*/
  'Date':'Tue, 18 Sep 2018 11:05:26 GMT',
  'Expires':'Thu, 01 Dec 2010 16:00:00 GMT'/*响应过期的时间*/,
  'Last-modified':'Thu, 01 Dec 2010 16:00:00 GMT',/*请求资源的最后修改时间*/
  'Server':'IIS/Nginx/Tengine',
  'Set-cookie':'xxxxx设置Cookie'
}
```
- http状态码
>@参考 https://www.jianshu.com/p/760b1b579b0f
  - 1xx 临时响应
    - 100 webSocket 请继续
  - 2xx 成功
    - 200 已成功
    - 201 请求成功，服务器创建了新的资源
    - 202 已接受，服务器已接受，但尚未处理
    - 203 非授权，返回的信息可能来自另一个来源
    - 204 无内容，处理了请求但没有返回任何内容
  - 3xx 重定向
    - 300
    - 301 永久重定向，发生在访问`http://www.baidu.com`时重定向到443端口的`https://www.baidu.com`,可以访问下http://www.baidu.com，看下请求资源情况
    - 302 临时重定向
    - 303
    - 304 未修改，自从上次请求后，网页未修改过。chrome允许缓存就大部分都是304
    - 305
    - 306
    - 307 内部重定向?Internal Redirect
  - 4xx 客户端
    - 400 错误请求
    - 401 未授权，请求要求身份验证，对于需要登录的网页服务器可能返回此响应
    - 402 
    - 403 禁止，服务器拒绝请求 forbidden
    - 404 找不到，服务器未找到网页，网页丢失，not found
  
  - 5xx 服务端
    - 500 服务器内部错误，服务器遇到错误，无法处理
    - 501 无法识别，尚未实施，比如无法处理请求方法
    - 502 错误网关，网关错误，服务器作为网关从上游服务器收到无效响应
    - 503 服务不可用，停机维护，指暂停状态。
    - 504 网关超时
    - 505 HTTP版本不受支持，不支持请求所用的HTTP版本

>一份来自node 的http响应代码 
```js

const http= require('http');
console.log(http.STATUS_CODES);
const httpCode= {
	'100': 'Continue',
	'101': 'Switching Protocols',
	'102': 'Processing',
	'103': 'Early Hints',
	'200': 'OK',
	'201': 'Created',
	'202': 'Accepted',
	'203': 'Non-Authoritative Information',
	'204': 'No Content',
	'205': 'Reset Content',
	'206': 'Partial Content',
	'207': 'Multi-Status',
	'208': 'Already Reported',
	'226': 'IM Used',
	'300': 'Multiple Choices',
	'301': 'Moved Permanently',
	'302': 'Found',
	'303': 'See Other',
	'304': 'Not Modified',
	'305': 'Use Proxy',
	'307': 'Temporary Redirect',
	'308': 'Permanent Redirect',
	'400': 'Bad Request',
	'401': 'Unauthorized',
	'402': 'Payment Required',
	'403': 'Forbidden',
	'404': 'Not Found',
	'405': 'Method Not Allowed',
	'406': 'Not Acceptable',
	'407': 'Proxy Authentication Required',
	'408': 'Request Timeout',
	'409': 'Conflict',
	'410': 'Gone',
	'411': 'Length Required',
	'412': 'Precondition Failed',
	'413': 'Payload Too Large',
	'414': 'URI Too Long',
	'415': 'Unsupported Media Type',
	'416': 'Range Not Satisfiable',
	'417': 'Expectation Failed',
	'418': 'I\'m a Teapot',
	'421': 'Misdirected Request',
	'422': 'Unprocessable Entity',
	'423': 'Locked',
	'424': 'Failed Dependency',
	'425': 'Unordered Collection',
	'426': 'Upgrade Required',
	'428': 'Precondition Required',
	'429': 'Too Many Requests',
	'431': 'Request Header Fields Too Large',
	'451': 'Unavailable For Legal Reasons',
	'500': 'Internal Server Error',
	'501': 'Not Implemented',
	'502': 'Bad Gateway',
	'503': 'Service Unavailable',
	'504': 'Gateway Timeout',
	'505': 'HTTP Version Not Supported',
	'506': 'Variant Also Negotiates',
	'507': 'Insufficient Storage',
	'508': 'Loop Detected',
	'509': 'Bandwidth Limit Exceeded',
	'510': 'Not Extended',
	'511': 'Network Authentication Required' 
  }
```    
### REST API 和客户端库的区别
`来源于一项API服务对比的页面，`

|用例|REST API|客户端库|
|---|---|---|
转换短语音音频，例如无中间结果的命令（音频长度 < 15 秒）|是|是
转换长音频（> 15 秒）|否|是
流式传输具有所需中间结果的音频|否|是
了解使用 LUIS 从音频转换的文本|是|是
是不是HTTP|是|不一定，比如WebSocket


### https 

### http和https 的比较

## 业务技巧相关
###  RESTful 与 GraphQL 比较
### 跨域问题
>@https://segmentfault.com/a/1190000011145364
  - JSONP 跨域
    - **缺点：只支持get、不支持post**
    - 传递函数名
  - document.domain
    > 引入iframe 时候，无法使用js交互操作
    - 使用document.domain 将主页面和子页面都设置为相同的域名就可以了
    - **缺点：设置成自身或更高一级的父级，且主域必须相同**
    - 原因：
  - postMessage 跨文档通信API，跨窗口通信
  - window.name 进行跨域
  - 跨资源共享（CORS）
    - > IE10 
    - 依赖服务端改造 header
  - nginx 代理跨域
  - nodejs中间件代理跨域
  - websocket 协议跨域
  > 
### 微信支付开发
> 已申请了微信开发者账号 9-17，有空再去看看。
### 支付宝支付开发
> 已申请了支付宝开发者账号 9-17，有空再去看看。
### github 授权登录

## web安全问题
### CSRFs
### XSS
### DDOS
### SQL注入
### DNS劫持
## 性能提升
网页性能管理详解 ——阮一峰 http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html 

### 前端常见的性能优化请求手段/加快资源的加载速度/减少白屏事件
  - CDN 内容分发
  - css Sprite  图片合并
  - Compress/Gzip 资源文件压缩
  - Async/Defer 异步加载
  - HTTP Cache HTTP 缓存
  ....
### html/css 重绘回流(Repaint、Reflow)

- display:none 不会发生回流和重绘

回流(reflow)：布局引擎为frame(框架)计算图形的过程,一个frame回流会导致所有父节点以及后续元素都会回流。
  - 理论上发生回流的原因
    - 初始化(initial)。dom载入后第一次回流，遍历所有frame
    - 渐进(incremental)。一个frame发生渐进reflow时，前面没变，自己内部发生变化。
    - 改变大小。容器边界发生变化，内部没变，复用内部状态
    - 样式改变。整个frame都会遍历
    - dirty。（脏的）已缓存了多个子元素的渐进回流时。
  - 具体的操作原因：
    - 窗口大小变化
    - 更改文档默认字体
    - 样式表改变
    - 元素内容变化，尤其是输入控件
      - input textarea 
    - dom操作
    - 渐进回流，会使浏览器将渐进队列冲洗，立即执行回流
      - offsetWidth、offsetHeight计算。 整个可视区域大小，包括border scrollBar在内
      - width、height计算。
      - clientWidth计算 内部可视区域大小。
      - scrollTop计算。元素内容向上滚动了多少像素。
      - scrollHeight计算。元素内容的高度，包括溢出的部分
  - 避免回流
    - 避免逐项更改style
    - 避免循环操作dom 
    - 避免循环读取offsetLeft 等属性，并在循环之前存起来
    - 绝对定位具有复杂变化的动画元素。position:absolute 脱离文档流，否则会引起父元素以及后续元素的大量回流。css3 transition 性能不错
```js
// 一次bad 的demo

var dom = document.body.style;
dom.padding="2px";// 回流+重绘
dom.border="1px solid";//回流+重绘
dom.border="blue";//重绘
dom.backgroundColor="#ccc";//重绘
dom.fontSize="14px";//重绘+回流
document.body(document.createTextNode('abcdev!'));
```
解决办法

1. 写style 更改class

```js
document.body.className="dom"
```

```html
.dom {
  padding:2px;
  border:1px solid;
  background-color:#ccc;
  font-size:14px
}
```

2. 一次添加全部的style操作

```js
var dom = document.body.style;
dom="padding:2px;border:1px solid;background-color:#ccc;font-size:14px";
```
重绘(repaint)：发生在元素的可见性发生变化时产生重新渲染的现象，回流必然引起重绘:
  - background
  - color


### 常见的内存泄露问题的
#### 闭包在IE9之前的版本会导致一些特殊的问题。

```js

  // 内存泄漏
  function click1(){
    let element = document.querySelector('.test');
    element.onclick=function(){
      console.log(element.id)
    }
  }
  // fix 版本
  function click2(){
    let element2 = document.querySelector('.test');
    let id = element2.id;// 引用赋值，消除变量循环引用
    element2.onclick=function(){
      console.log(id)
    };
    // 设置为null，解除对DOM对象的引用，减少计数
    element2=null
  }
  
```
## Css部分

- zoom与transform scale区别
- CSS IFC inline formatting context
  > 内联格式上下文
- CSS BFC block formatting context
  > 块级格式上下文。里面子元素不会影响到外面的元素

### CSS实现水平垂直居中的1010种方式（史上最全）https://segmentfault.com/a/1190000016389031

## js概念/基础知识
### 静态方法
> xxx.prototype  在 constructor里面就看到了,
### 数据类型构造属性及方法(静态)
- 疑问：比较MediaSource.prototype 与Array.isArray()
> Array.isArray() `静态方法?`，可在chrome打印出来并不是灰色
![Array.isArray()](./static/images/isArray.jpg)
> MediaSource.isTypeSupported() `静态方法` ,在chrome打印出来是亮色
![MediaSource.isTypeSupported](./static/images/isTypeSupported.jpg)

> 共性

|类型或者构造函数|arguments|caller|length|name|prototype|__proto__|[[Scopes]]|
|----|----|----|----|----|----|----|----|
String|||1|String||||
Boolean|||1|Boolean||||
Number|||1|Number||||
Object|||1|Object||||
Array|||1|Array||||
Symbol|||0|Symbol||||
MediaSources||||||||
||||||||
- String
  - fromCharCode
  - raw
- Boolean 
- Number
  - EPSILON:2.220446049250313e-16
  - MAX_SAFE_INTEGER: 9007199254740991
  - MAX_VALUE:1.7976931348623157e+308
  - MIN_SAFE_INTEGER: -9007199254740991
  - MIN_VALUE:5e-324
  - NEGATIVE_INFINITY: -Infinity
  - NaN: NaN
  - POSITIVE_INFINITY: Infinity
  - isFinite()
  - isInteger()
  - isNaN()
  - isSafeInteger()
  - parseFloat()
  - parsetInt()
- Object
  - assign()
  - create()
  - defineProperties()
  - defineProperty()
  - entries()
  - freeze()
  - getOwnPropertyDescriptor()
  - getOwnPropertyDescriptors()
  - getOwnPropertyNames()
  - getOwnPropertySymbols()
  - getPrototypeOf()
  - is()
  - isExtensible()
  - isFrozen()
  - isSealed()
  - keys()
  - preventExtensions()
  - seal()
  - setPrototypeOf()
  - values()
- Array
  - from()
  - isArray()
  - of()
  - Symbol(Symbol.species)
  - get Symbol(Symbol.species):()
- Symbol
  - asyncIterator
  - for()
  - hadInstance
  - isConcatSpreadable
  - iterator
  - keyFor()
  - match
  - replace
  - search
  - species
  - split
  - toPrimitive
  - toStringTag
  - unscopables
- WebSocket
  - `CLOSED:3`
  - `CLOSING:2`
  - `OPEN:1`
  - `CONNECTING:0`
- MediaSources 
  - `isTypeSuported()` 静态方法
### 概念
- JavaScript
  - ECMAScript
  - DOM
  - BOM
### 关键字
  - 如果使用关键字name 声明一个值，只能是string 类型！！！
### 语句
  - switch
    - case 必须紧接着跟值/变量/简单表达式/&&/function，不确定能使用||
  ```js
  // 以下产生一个bug，不管怎么样使用关键字name 声明一个值，只能是string 类型！！！
  var name = '22';var tt='22';
  var name1 =22;var tt1=22;
  // demo1
  switch (name) {
        // 终止错误，合并两个条件
        case '22':
        case 'AbortError':
        default:
          console.info('NotFoundError:找不到满足错误的类型');
      }
  //demo2
    switch (name) {
        // 终止错误，合并两个条件
        case tt:
        case 'AbortError':
        default:
          console.info('NotFoundError:找不到满足错误的类型');
      }
  //demo3
    switch (name1) {
        // 终止错误，合并两个条件,数值为number 类型时候，无法进入此条件
        case tt1:
        case 'AbortError':
        default:
          console.info('NotFoundError:找不到满足错误的类型');
      }
  ```
### 函数
>特点：
- 函数声明提升

#### 声明函数的几种函数，目前三种
- 函数声明
- 函数表达式
- 匿名函数/拉姆达函数，`name` 是空字符串
```js
/*1 函数声明*/
function test(){
  //todo
}
/*2 函数表达式*/
const test1=  function(){
  //todo 
};
/*3 匿名函数/立即执行*/
(function(){
   //todo
 })()
```
#### 一种危险的函数使用
为什么说它危险？
> 应该使用函数表达式

```js
if(true){
  function say(){
    console.log('hi')
  }
}else{
  function say2(){
    console.log('no hi!')
  }
}
```

#### 递归

-----------------------------------------------------------------------------------------
> 以下来自红宝石：
- 使用`arguments.callee`，指向正在执行函数的指针
```js

function factorial(num){
if(num<=1){
  return 1
}else{
  return num*factorial(num-1)
  }
}
// ①如果设置中途转了一层
var anthorFactorial= factorial;
factorial=null;
console.log(anthorFactorial(4));//error
// ② 上面可以变为
function factorial1(num){
  if(num<=1){
    return 1
  }else{
    return num*arguments.callee(num-1)//但是在严格模式下，无法访问这个属性，所以会导致错误
  }
}
// ③ 更有效的方案，匿名函数的方式
var factorial2=(function f(num){
  if(num<=1){
    return 1
  }else{
    return num*f(num-1)
  }
})
```
-----------------------------------------------------------------------------------------
> 以下来自自己的摸索和总结：

`函数自己调用自己,就是递归`，由于递归需要具备超前的临时计算能力，对于我来讲，是很难一个学习难点。随后在网络上找到一个方法、函数来加深理解。

```js

// 用递归 来求 5 的阶乘 ，翻译过来就是 1*2*3*4*5 =120
// n! = n * (n-1)!

// 定义一个函数，用于求 n 的阶乘
function func(n)
{
    if (n === 1)
    {
        return 1;
    }

    // func(n-1) 因为传递的参数是 n-1,那么就是求 (n-1) 的阶乘
    return n * func(n-1);
}
console.log(func(5));

// 所以计算的结果是
// 第一步 return 5 *(func(4))
// 第二步 return 5 *(4*(func(3)))
// 第二步 return 5 *(4*3*2(func(2)))
// 第二步 return 5 *(4*3*2(*1*func(1)))
// 第二步 return 5 *(4*3*2*1) = 120
```

> 再看一个斐波那契数列的递归数列，加深对递归概念的理解，小于2则return 1, 公式 f[n]=f[n-1]+f(n-2) 递归结束条件f[1]=1;f[2]=1

- 基本规则

 |序列|值|
 |----- | ---- |
 0 | 1
 1 | 1
 2 | 2
 3 | 3
 4 | 5
 5 | 8
 6 | 13
 7 | 21
 8 | 34
 9 | 55
 |||

 ```js
 /**
  * @desc for 循环实现 ，借用三个变量来存放
  * */
var fibFor =function(n){
let n1=1,n2=1,n3=0
  if(n<2){
    return 1
    }
    for(let i =0;i<n-1;i++){
      n3=n1+n2;
      n1=n2;
      n2=n3
      }
      return n3
}
 console.info(fibFor(9))

/**
 * @desc 斐波那契数列 学习，递归函数解析
 *
*/
var fib= function(n){
  if(n<2){
  return 1
    }
    return fib(n-1)+fib(n-2)
}
 console.info(fib(9))
fib(8)
// 入参 8

```

|序列|值|
| ---- | ---- |
第一步 | fib(7)+fib(6)
第二步 | fib(6)+fib(5) + fib(5)+fib(4)
第三步 | fib(5)+fib(4) + fib(4)+fib(3) + fib(4)+fib(3) + fib(3)+fib(2)
第四步 | fib(4)+fib(3) + fib(3)+fib(2) + fib(3)+fib(2) + fib(2)+fib(1) + fib(3)+fib(2) + fib(2)+fib(1) + fib(2)+fib(1) + fib(1)+fib(0)
第五步 | fib(3)+fib(2) + fib(2)+fib(1) + fib(2)+fib(1) + fib(1)+fib(0) + fib(2)+fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(2)+fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1)+ fib(1)+fib(0) + fib(1) + fib(1) + fib(0)
第六步 | fib(2)+fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) +fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1)+ fib(1)+fib(0) + fib(1) + fib(1) + fib(0)
第七步 | fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) +fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1)+ fib(1)+fib(0) + fib(1) + fib(1) + fib(0)
第八步 | 1     +     1 +     1  +     1 +    1  +     1 +    1  +     1  +     1 +    1  +     1  +     1 +    1  +     1 +    1  +     1  +     1 +    1  +     1 +    1  +     1  +     1 +    1  +    1  +     1 +    1  +     1 +    1  +     1 +     1 +    1  +     1  +     1  +     1  
第九步 | 去掉空格之后 我们得到一个结果  1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1 = 34

![斐波那契数列](./static/images/fib.jpg "斐波那契数列")

#### 立即执行
> 因为立即执行函数和外部的全局作用域的命名空间不同，于是name1 和 this.name1 属于不同的空间,私有命名空间


```js

/*立即函数的几种声明方式 1  匿名函数包括在一个括号运算符*/
(function(test){
  console.log(test)
})(123)

/*立即函数的几种声明方式 2  匿名函数跟一个效果好。并包括一个原算法*/
(function(test){
  console.log(test)
}(123))

/*demo*/
  var name1 ='World!';
(function(window){
	console.log(window.name1,this.name1,name1)//window,window,undefined
	if(typeof name1 === 'undefined'){
		var name1 ='JACK';
		console.log('hello,'+name1)
	}else{
		console.log('Goodbye' + name1)
	}
})(window)

```
### 事件
#### 焦点事件
> 判断浏览器是否支持：`document.implementation.hasFeature("FcousEvent"),"3.0"`

|触发次序|冒泡事件|非冒泡事件|描述|用例|
|----|----|----|----|----|
|1|focusout||失去焦点大多浏览器||
|2|focusint||获得焦点，大多浏览器||
|3||`blur`|元素失去焦点，浏览器都支持||
|4|DOMFocusOut||失去焦点,Opera支持||
|5||`focus`|不冒泡，获得焦点触发|
|6|DOMFocusIn||冒泡,Opera支持||
||||||

> 郁闷，2018年10月31日 这一天面试，其实我都有做过，而且自然而然的做过，竟然答不上来，知识体系全部混乱。
这样下去，如果面试一些基础题，我真的可能找不到工作了。
之前也没怎么考虑是事件委托还是代理，自然而然就这样处理事件了。 比如之前人工写的 轮播 在那个智能官网里面的，也没多想了，可谁知道那就是事件委托，哔了狗。


- 如何去声明和使用事件，以点击事件来说
```html
<!--onclick--->
<button>button</button>  

<script>
  const btn = document.querySelector('button');
  function changeColorA() {}
  function changeColorB() {}
  function changeColor (){
    btn.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16)
  }
  //方式1
  btn.onclick=changeColor;
  //方式2  以添加addEventListener 函数来完成。具名函数方式
  btn.addEventListener('click',changeColor);

  //方式3 匿名函数来指代一下也是可以的
  btn.addEventListener('click',,function(){
      btn.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16)
  });
  // 移除事件
  btn.removeEventListener('click',changeColor);
 // 添加多个事件
  
 //  无法实现并存的方式，后者会覆盖前者
  btn.onclick=changeColorA;
  btn.onclick=changeColorB;

  //使用事件监听器注册的话，就可以实现了!!兼容性，addEventListener只支持到IE9
  btn.addEventListener('click',changeColorA);
  btn.addEventListener('click',changeColorB)
  //有些情况，如submit 事件总会使用preventDefault()阻止默认行为
</script>

```
- 事件委托/事件代理
  - 什么时候用到？for 循环里面 多个点击事件，一次操作就可以完成，减少DOM操作次数
  - 原理：利用事件的`冒泡原理`来实现，
  ```html
    <ul>
      <li> 1</li>
      <li> 2</li>
      <li> 3</li>
      <li> 4</li>
      <li> 5</li>
    </ul>
  ```
  ```js
  // 很蠢的对每个li 标签都循环做点击事件
   window.onload= function(){
     var ul = document.querySelector('ul');
     var li = document.querySeletcor('li');
     for(var i=0;i<li.length;i++){
       li[i].onclick=function(){
         alert(123)
       }
     }
   }
  
  ```

- 事件冒泡
  - 什么是冒泡原理？
  - 什么是事件冒泡？ 
  >事件从最深的节点开始，逐步向上传播事件，div>ul>li>a ，给a添加事件，事件就会一层一层的往外执行，执行顺序为a->li->ul->div
  - 机制
  > 给最外面的div加点击事件，`这里理解？：它的后代都会被点击到`那么 ul li a 做点击的时候，都会冒泡到最外层div，也就是会触发。这就是事件委托，委托父级代为执行事件。反正最后都会被冒泡到？？
  - 事件冒泡和事件捕获

    - 捕获阶段`父级->子级，向里`
      - 检查最外层`html`，是否在捕获阶段注册一个`onclick`事件处理程序，如果是，则运行
      - 然后移动到下一个元素，并执行相同操作，直到实际点击的元素
      - **结论是：事件始终从html层开始？**
      - 顺序：父级——>子级 、外到里
    - 冒泡阶段 `子级->父级，向外`
      - 检查实际点击元素是否在冒泡阶段注册`onclick`事件，如果是则运行
      - 然后移动到直接祖先，然后同上，直至`html`元素
      - 时间处理程序都在冒泡阶段注册  `(但可以使用addEventLisenter(,,true) 在捕获阶段注册`
      ```js
        video.onclick=function(e){
          e.stopProgation();//阻止冒泡链扩大
          video.play()//播放视频
        }
      ``` 
    - 事件委托`由于冒泡而被允许的概念`
      - 通过委托父级，addEventLisenter 设置在父节点上，将事件监听器气泡的影响每个子节点，而不是每个子节点都设置事件监听器


###  前端路由实现
>API，利用两个API修改URL，而不会引起页面的刷新
- 方式一 pushState ajax
  - history.pushState 增加一条新的记录
  - history.replaceState 替换当前的历史记录
- 方式二 hash+ajax
  - "#" 锚点，web不会解析hash，“#”后面，web服务会被自动忽略
  - js可以通过location.hash读取，解析后可以实现响应不同的路径逻辑
  - hashchange 监听hash 变化触发事件


  
### 全局函数
`http://www.w3school.com.cn/jsref/jsref_obj_global.asp`

- Global  `ES 内置单体对象` 全局对象

|属性|方法|描述|
|----|----|----|
||isNaN()||
||isFinite()||
||parseInt()||
||parseFloat()||
||encodeURI()|`对空格转换`|
||decodeURI()||
||encodeURIComponent()|`非标准字符全部编码`|
||decodeURIComponent()||
||eval()||
|undefined||`特殊值`|
|NaN||`not a number 特殊值`|
|Infinity||`特殊值`|
|Object||`构造函数`|
|Array||`构造函数`|
|Function||`构造函数`|
|Boolean||`构造函数`|
|String||`构造函数`|
|Number||`构造函数`|
|Date||`构造函数`|
|RegExp||`构造函数`|
|Error||`构造函数`|
|EvalError||`构造函数`|
|RangeError||`构造函数`|
|ReferenceError||`构造函数`|
|SyntaxError||`构造函数`|
|TypeError||`构造函数`|
|URIError||`构造函数`|
||||

- Math `ES 内置单体对象`
比较数组大小
```js
const arr =[11231,238,5,21];
Math.max.apply(Math,arr)
```
|属性|方法|描述|
|----|----|----|
|E||`自然对数的底数，常量e的值`|
|LN10||`10的自然对数`|
|LN2||`2的自然对数`|
|LOG2E||`2为底的e的对数`|
|LOG10E||`10为底的e的对数`|
|PI|||
|SQRT1_2||`1/2的平方根，2的平方根的倒数`|
|SQRT2||`2的平方根`|
||min()|`(1,3,9,4)`|
||max()|`(9,3,11)`|
||ceil()|向上取舍|
||floor()|向下取舍|
||round()||
||random()|`0-1随机数，技巧：Math.random()*100+1`|
||abs(num)|`绝对值`|
||exp(num)|`Math.E的num次幂`|
||log(num)||
||pow(num,power)||
||aqrt(num)|`num的平方根`|
||acros(x)|`x的反余弦值`|
||asin(x)|`x的反正弦值`|
||atan()|`x的反正切值`|
||atan2(y,x)|`y/x的反正切值`|
||cos(x)|`x的余弦值`|
||sin(x)|`x正弦值`|
||tan(x)|`x正切值`|
||||
- decodeURL

### 正则 RegExp

### 字符串 String

### 数字 Number

- 除法。先转为数字再进行除法操作
```js
   console.log('40'%7); // 等于多少? 取模
   console.log('40'/7) // 等于多少? 取模

```

### 数组 Array

- 能用forEach()做到的，map()同样可以。反过来也是如此。
- map()会分配内存空间存储新数组并返回，forEach()不会返回数据。
- forEach()允许callback更改原始数组的元素。map()返回新的数组。
- forEach 跳过空元素，但不跳过`undefined`


#### 实例方法-不改变原始数组的方法

  - `Array.prototype.concat(arr1, arr2,...,arrn)`
    - 入参必填，可以是数组对象
    - 返回新数组
    - 链接数组
    
  -  <sup>es6</sup>`Array.prototype.entries()`
  
    ```js
    var fruits = ["Banana", "Orange", "Apple", "Mango"];
    var temp=fruits.entries();
    for(let item of temp) {
      console.log(item); /*[key,value]*/
    }
    console.log(temp);/*/Array Iterator {}*/
    console.log(fruits);/*不改變*/
    ```  
  -  <sup>es6</sup>`Array.prototype.every(function(crrrueValue,index,arr){},thisArr)` 
    - 检测数组所有元素都符合指定条件，通过函数条件
    - 如果有一个不满足条件，则会返回false，且剩余不再检测
    - 如果全部都满足条件则返回true

    ```js
      var ages = [32, 33, 16, 40];
      function checkAdult(age) {
        console.log(age)/*如果没有return 则返回第一个，然后打断*/
      /*     return age >= 18;*/
      }
      ages.every(checkAdult)
    ```
  - `Array.prototype.filter(function(){currentValue,index,arr},thisValue)`
  、
    - 过滤数组
    - 检查指定数组中符合条件的所有元素
    - 不检测空数组
    - 不改变原数组

  - <sup>es6</sup>`Array.prototype.find(function(){currenValue,index,arr},thisValue)`
    
    - 查找的意思
    - 判断数组第一个元素的值
    - 每个元素都调用一次函数
    - 如果条件满足true，则返回符合条件的元素，之后的不再执行
    - 如果都没有符合条件则返回undefined
  - `Array.prototype.map(function(currentValue,index,arr){},thisValue)`
    - 返回新数组，比如对每个数组都*2
    - 返回新数组,数组元素为原始数组元素调用函数处理后的值
    - 原始数组次序依次处理元素
    - 不对空数组进行检测
    - 不改变原数组，返回新数组

    ```js
    /*demo1*/
    var arr=[543153,1231,3215,12,12,42,45,4555,5];
    var arrT = arr.map(function(value,index,arr){
      console.log(value)
      /*/ retrun value *2*/
    });
    console.log(arrT);/*/[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]*/

    /*demo2*/
    var ages = [32, 33, 16, 40];

    function checkAdult(age) {
        return age >= 18;
    };
    var mapTemp = ages.map(checkAdult);
    console.log(mapTemp);/*[true,true,false,true]*/
    var filterTemp = ages.filter(checkAdult);
    console.log(filterTemp)/*[32,33,40] 返回如何条件原数组的元素*/
    
    ```
  - `Arrary.prototype.forEach(function(currentValue,index,arr){},thisValue)`
    
    - 常用语，逐个做事情，打印，写入数据库
    - forEach()方法对数组每个元素执行一次提供的函数
    - 对空数组不会执行回调函数
    - es3开始
    - 返回值undefined
    - 不能使用return,只针对每个元素调用函数

    ```js
    var arr=[561531,1231,112,12,2];
    arr.forEach(function(currentValue,index,arr2r){
    console.log(this)//String {"ttt"}
    },'ttt')
    ```
#### 实例方法-改变原始数组的方法(一般改变索引值的，都会改变原始数组)
  - `Array.prototype.copyWithin()`copyWithin
  
    - 从数组指定元素拷贝元素到数组的另外一个指定位置

    ```js
    var arr=['西瓜','赵铁柱','王尼玛'];
    var temp = arr.copyWithin(2,1);
    console.log(arr,temp);//["西瓜", "赵铁柱", "赵铁柱"] ,["西瓜", 西瓜"赵铁柱", "赵铁柱"]
    ```
  - <sup>es6</sup>`Array.prototype.fill('帅哥',start,end)`
    - 填充数组
  ```js
  var arr=['西瓜','赵铁柱','王尼玛'];
  var temp = arr.fill('帅哥');//不入参的话其他不变
  console.log(arr,temp)

  ```
#### 静态方法


### 枚举[`new`] symbol



### 类 class  

### 面向对象,程序设计

> 一个标志，类的概念 

|概念/方法|描述|
|----|----|
|数据属性||
|访问器属性|||
|Object.defineProperty(obj,name,{})|`定义单个`|
|Object.defineProperties(obj,{xx:{value:1}})|`同时编辑多个，定义多个属性`|
|Object.getOwnPropertyDescriptor()|`取得 给定属性的描述符`|
|||

#### 创建对象-工厂模式
> 普通方式，字面量方式，代码量比较多

> 优点：一个函数，即可创建对象
1. 只要一个函数，可多次调用
> 缺点：
1. 没有解决对象识别（知道一个对象的类型？？）
2. 返回默认的，如果不处理则会返回固定的
```js
function factory(name,age,job){
  // const obj=Object.create({})//带有普通对象的__proto__ 类似  const obj = new Object()
  // const obj=Object.create(null)//则没有_proto__！
  const obj= {};
  obj.age=age;
  obj.name=name;
  obj.job=job;
  obj.sayName=function(){
    return this.name
  };
  return obj
}
//use
const p= factory('张三','28','前端狗')
```
#### 创建对象-构造函数
>优点：
1. 没有显示地创建对象
2. 直接将方法和属性赋值给this对象
3. 没有return
>缺点：
1. 每个方法都要在每个实例上重新创建一边，`p1.sayName===p2.sayName` 同样任务，但两遍，两者不等于，证明这一点
>特点：
1. 大写构造函数首字母，惯例
2. 它的实例都有一个`constructor`（构造函数）属性，指向他的构造函数
```js
function ConstractorFn(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
  this.sayName=function(){
    return this.name
  }
}
// use
const p1 = new ConstractorFn('李四6i7','29','后端喵');
// 监测类型
console.log(p1 instanceof ConstractorFn)//true,同样都是Object的实例

```
> 当做构造函数，见上面

> 当普通函数
```js
ConstractorFn('李四6i7','29','后端喵');
window.sayName()
```
> 在另外一个对象的作用域中调用
```js
const ob = {};
ConstractorFn.call(ob,"王五",'30','python');
// ConstractorFn.apply(ob,["王五",'30','python']) 或者这样

on.sayName()
```
> 缺点（原型模式解决）：
1. 在全局作用域下声明函数，只能被某个对象调用，意思是，专属的函数
2. 而如果需要定义多个函数的，那么你需要声明多个函数。。。
3. 如何对构造函数进行优化呢？属性和函数定义区分开,
```js
function ConstractorFn(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
  this.sayName=sayName
}
function sayName(){
  return this.name
}
const p1 = new ConstructorFn('孙六','31','产品汪')
```
#### 创建对象-原型模式
> 特点：
1. 所有实例都共享原型的属性和方法
> 优点：
1. 修改单一个实例，不会影响到其他实例
2. 
> 缺点：
1. 
```js
function Proto(){}
Proto.prototype.name="刘七";
Proto.prototype.age="32";
Proto.prototype.job="设计狮";
Proto.prototype.sayName=function(){
  return this.name
};
var p1 = new Proto();
var p2 = new Proto();
p1.sayName===p2.sayName//true
```
> 理解原型对象
1. 默认情况，原型对象自动取得constructor属性，其他方法和属性都是从Object继承
2. 使用`Person.isPrototypeOf()`测试实例是否有一个纸箱构造函数`prototype`的指针
3. `hasOwnProperty()` 访问的值是不是实例的属性,该方法会忽略从原型链继承到的属性
4. `Objecet.getOwnPrototypeDescriptor()` 用于实例属性
> 原型与in操作符
1. `"name" in p1`查找该实例上的属性，不管是`实例上还是原型上`
2. IE早期版本出现bug，导致无法被`in` 出来，所以替代的方案是 `Object.keys()`，可列出可枚举的字符串数组
> 更简单的原型语法，
1. [x]字面量包装`prototype`，但！`constructor`没有指向构造函数了
```js
function Proto(){}
Proto.prototype={
  name:"xx",
  age:'44',
  job:'ceo',
  sayName(){
    return this.name
  }
}
```
2. [x]字面量包装`prototype`，初始化回来`constructor`。！但是，此时，`constructor` 是可以被枚举的。
```js
function Proto(){}
Proto.prototype={
  constructor:Proto,//重新指向
  name:"xx",
  age:'44',
  job:'ceo',
  sayName(){
    return this.name
  }
}
```
3.[√]所以只能用es5的,Object.defineProperty()
```js
function Proto(){}
Proto.prototype={
  name:"xx",
  age:'44',
  job:'ceo',
  sayName(){
    return this.name
  }
}
/*只允许在支持es5 Object.defineProperty()方法的环境下使用这样的方式*/
Object.defineProperty(Person.prototype,'constructor',{
  enumerable:false,
  value:Person
})
```
> 原型的动态性 **实例中的指针仅指向原型，并不是指向构造函数**，当时`new 出来 的prototype`，即`最初原型`，以下代码说明这一点：
```js
function Proto(){}
var p1 = new Proto()
Proto.prototype={
  name:"xx",
  age:'44',
  job:'ceo',
  sayName(){
    return this.name
  }
}
p1

```
> 原生对象的原型
- 给原型对象，添加方法，再`new` 出来
> 原型对象的问题
1. 忽略构造函数传递初始化参数
2. 所有实例获取相同的属性值
3. `共享`的本质
```js
function Proto(){}
Proto.prototype={
  name:"xx",
  age:'44',
  job:'ceo',
  test:['men','women'],
  sayName(){
    return this.name
  }
}
var p1 = new Proto()
var p2 = new Proto()
p1.test.push('son')
// 此时
p1.test===p2.test //true
```
#### [√]创建对象-混淆大法！组合使用构造函数 +原型模式！`目前最广泛，最好的方式`
> 构造函数写属性，方法则用原型继承
```js
function Fn(name,age,job){
  this.name=name;
  this.age= age;
  this.job=job;
  this.test=['man','woman']
}
Fn.prototype={
  constructor:Fn,
  sayName(){
    return this.name
  }
};
var p1 = new Fn('xsa','tt','te');
var p2 = new Fn('xsa2','tt2','te2');
p1.test.push('son');
p1.test===p2.test

``` 
#### 创建对象-动态原型模式
> 缺点
- 不能使用字面量重写原型,否则会切断联系
> 通过if来判断
```js
function Fn(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
  if(typeof this.sayName !=='function'){
    Fn.prototype.sayName=function(){
      return this.name
    }
  }
}
```
#### [x]创建对象-寄生构造函数模式
> 比工厂模式多了一个new，使用工厂模式new 出来

>特点：
1. 返回的对象与构造函数或者与构造函数的原型属性之间没有关系`[1]`
2. 构造函数return的对象与构造函数外部创建的对象没有什么不同`[2]`
3. 不能使用instanceof操作符确定对象类型
4. 在红宝石上书，不推荐此模式
```js
function factory(name,age,job){
  // const obj=Object.create({})//带有普通对象的__proto__ 类似  const obj = new Object()
  // const obj=Object.create(null)//则没有_proto__！
  const obj= {}; //此处不一定是Object对象，可以是Array对象，具体看业务操作
  obj.age=age;
  obj.name=name;
  obj.job=job;
  obj.sayName=function(){
    return this.name
  };
  return obj
}
//use
const p=new factory('张三','28','前端狗')
```
#### 创建对象-稳妥构造函数模式
>由道格拉斯·克罗克福斯 发明了该模式——稳妥对象（durable obajects）

> 特点：
1. 遵从寄生构造函数类似模式
2. 新创建对象方法的实例不引用this
3. 不适用new操作调用构造函数
4. 丢掉无关属性或者说是丢掉无效入参
5. 没有其他方式可以访问其数据成员
6. 为安全性考虑的js设计模式 

```js
function durable(name,age,job){
  var obj= {};
  // todo 定义私有变量和属性
  obj.sayName=function(){
    console.log(name)
  };
  return obj
}
// use
var p1 = durable('柳十','41','CFO管钱的');
p1.sayName()
```
#### new操作符都干吗了？
1. 创建一个新对象
2. 构造函数的作用域赋值给新对象，this指向这个新对象
3. 执行构造函数代码，为这个新对象添加属性
4. 返回新对象
[查看更多 js中的new()到底做了些什么？？](https://www.cnblogs.com/faith3/p/6209741.html)
### 作用域
- `js 没有作用域块`，导致var 声明时 是全局作用域。但如果是let声明，情况就不一样。let 让变量有了作用域。
- 可以使用过匿名函数来解决，模仿块级作用域

>以下代码让很感到困惑
```js
  if(1){
    var ha = 'hello,world!'
  }
  console.log(ha) //得到多少?
```
>但如果是 let 开头的话，就不一样了
```js
if(1){
	let ha ='hello world'
}
console.log(ha)
```
>这也就是能解释了，为什么 当使用var声明for循环出来后，总是最后一个值的原因（let 则相反）
```js
for(var i=0;i<5;i++){
 
}
 console.log(i)
```
>所以优秀的代码，其实可以这样去避免
```js
for(var i=0;i<5;i++){
 
}
 console.log(i);
 i=null

```
> 函数内部，相当于一个作用域
```js
/*demo1*/
const test=function(){
  var t = 'hello';
  return t+',world!'
};
test();
console.log(t);//

/*demo2*/
const test2=function(){
  t2 = 'hello';
  return t2+',world!'
};
test2();
console.log(t2)//可以访问到
```
### 私有变量
> 如何让外部的函数访问到内部的变量和设置
- 通过构造函数的方式
```js
function Main(name){
  this.getName=function(){
    return name
  };
  this.setName=function(value){
    name=value
  }
}
var p1 = new Main('李四');
console.log(p1.getName());
p1.setName('王五');
console.log(p1.getName())
```
### this

- this 总是指向函数的直接调用者（非间接）
- 有new 关键字，指new 出来的那个对象（构造函数的实例，一般）
- 事件中，指触发这个事件的对象。
- 特殊的。IE中的attachEvent 的this 总是指向全局的window
- 闭包中`this`是window对象
- dom实例，this指向这个dom对象实例


> this 竟然不是上一个函数对象
- 自动取得两个特殊的变量
- 内部搜索到this arguments时，只会搜索到其活动对象为止，因此`永远不可能直接访问外部函数的中的两个变量`
```js
var name = "I am window";
var object={
  name:"I am object",
  getName:function(){
    return function(){
      console.log(this);
      return this.name
    }
  }
};
console.log(object.getName()())//竟然是window！！！
```
> `将外部作用域中的this 对象，保存在一个闭包能够访问到的变量力，就可以让闭包访问到该对象了`!!
```js

var name ="I am window";
var object={
  name:"I am object",
  getName:function(){
    var that=this;
    return function(){
      console.log(this);
      return that.name
    }
  }
};
//demo1 
var object={
  name:"I am object",
  getName:function(){
    return function(){
      console.log(this);
      return that.name
    }.call(this)//bind 、call
  }
}
```

### 以下三个方法都是为了改变上下文存在而是用的

- <sub>[绑定-this-的方法](##索引__关于本作知识引用来源sub标签 )</sub>

- call  方法。调用一个函数，具有一个指定this值和分别地提供参数 [MDN查看更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
  - 语法 `function.call(thisObj,args...)`,如果thisObj 是null，则是全局对象,args作为参数传递给funciton

- apply 方法。调用一个函数，具有指定this 的值，以及作为一个数组提供的参数。 [MDN查看更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

- bind 方法。创建一个新的函数。被调用时，其this关键字 设置为提供的值，在调用时新函数时，在任何提供之前一个给定的参数序列。[MDN查看更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

### call  会立即执行。

- 入参是一个 (a,b,c)的列表形式，记忆方式，“C” 类似括号“（”。
- call的第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数。
- 应用：调用对象的原生方法

```js
var obj = {};
obj.hasOwnProperty('toString'); // false

// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true;
};
obj.hasOwnProperty('toString'); // true

Object.prototype.hasOwnProperty.call(obj, 'toString') // false
```

### apply  会立即执行。
- 最多入参65536个参数
- 假如数组的长度很长。切块后循环传入目标方法

#### apply 讲数组添加到另一个数组
- 数组a，数组b
- a里面含有b的元素

```js
const list1 = [1,2];
const list2 = [3,4];
list1.push.apply(list1,list2);
console.info("list1:",list1);
console.info("list2:",list2);

```

#### apply和内置函数，允许Math.max/Math.min 找出数组中最大值/最小值

```js
// 最大值
const list1=[12,1,456,6,16];
const max = Math.max.apply(null,list1);
console.info(max);

// 最小值
const min= Math.min.apply(null,list1);
console.info(min);


```

#### 将数组空元素转为`undefined`

```js
const arr=[54654,,55];
const result =Array.apply(null,arr);
console.info(result);//[ 54654, undefined, 55 ]

``` 


#### 使用apply来链接构造器

#### 转换类数组对象

```js
Array.prototype.slice.apply({0:1,length:1}); // [1]
Array.prototype.slice.apply({0:1,length:99}) // (99) [1, empty × 98]

```
#### 绑定回调函数的对象
```js

```

### bind 新函数，不会立即执行。
- 创建一个新的函数。
- 新函数的this 是bind的第一个参数指定的
- 其余参数作为新函数的参数使用
```js

const bind= function() {
  return function() {
	// do something    
  }
}

```

- 因为bind每次都生成一个函数。所以需要注意以下：

```js
const o={
	m(){
		console.info("hello");
	}
};
const ele=document.querySelector('xx');
ele.addEventListener('click',o.m.bind(o));

// 而是

const listener= o.m.bind(o);
ele.addEventListener('click',listener);

// 否则无法remove事件监听

ele.removeEventListener('click',listener);


```


### call 与apply区别

- call  入参是列表。
- apply  入参是数组

```js
function a(ob){
  console.info(ob)
};
var cc ={t:'222'};
var ob={name1:'lala'};
a.apply(null,[ob],cc)

// undefined
```
### Blob 对象

- 相互转换的其他平台
	- url
    - URL.CreateObject(stream)//创建一个流的URL对象
	- web(XMLHttpRequest) 异步请求
	- file system 文件系统
	- database 数据库
	- workers 窗口
	- array buffer 二进制
	- text 文本
## JavaScript设计模式 
## BOM对象

### window对象
- 浏览器窗口
### location对象
> 是window 对象也是document对象。其中search不实用，需要改造函数来实现

>  可以去往这个对象增加新属性，但无法对原来的属性值作出随意变更赋值

|属性|方法|值|描述|
|----|----|----|----|
|ancestorOrigins||||
|hash||||
|hostname||`www.baidu.com`||
|href||`https://www.baidu.com/#dsad?dsd=dsd`||
|origin||`https://www.baidu.com`||
|pathname||`/`||
|protocol||`https`||
|search||||
||assign(url)||`生成一个location并跳转`|
||reload()|||
||replace()||`传递true，则强制刷新`|
||toString()|||
### Navigator对象
> 可以去往这个对象增加新属性，但无法对原来的属性值作出随意变更赋值。可以使用 `Object.defineProperty(navigator,'userAgent',{value:'xxoo'})` 来修改
- chrome 和firefox 参数都有自己的，相同的属性或者同属性的值挺少的。

- TODO 制作node去判断用户代理字段的特征值

- 红宝石书中有一段检查浏览器、厂商、平台、操作系统的完全代码

### Screen 对象
> 用处不大，表明客户端的能力，DPI之类 屏幕像素宽高等

### History 对象
> 无法得知浏览过的url，但可以通过实现前进和后退
- go(-)

|属性|方法|值|描述|
|----|-----|----|----|
||go(1)|整数|整数，前进，负数，后退|
||back()||等同于go(负数)|
||forward()||等同于go(正数)|
|length||整数，0就是第一个目标页面|表示历史记录有几条|
|||||

### 存储对象-seesionStorage 回话存储 localStorage 本地存储

|属性|方法|描述|实例|
|----|----|----|----|
|length||||
||key(n)|||
||getItem(keyname)|||
||setItem(keyname,value)|||
||removeItem(keyname)|||
||clear()|||
|||||


## DOM对象

- document对象，文档，window的属性
- xml DOM http://www.w3school.com.cn/xmldom/dom_htmlelement.asp

### Document对象 属性+方法
> http://www.runoob.com/jsref/dom-obj-document.html

|属性|方法|描述
|---|---|---|
|document.activeElement||返回当前获取焦点元素|
||documeent.addEventListener()|向文档添加句柄|
||document.adoptNode(node)||
|document.anchors||`a标签中需要含有name才能获取！`|
|document.baseURI||返回绝对基础URI|
|document.body||返回文档body元素|
||document.close()|关闭document.open的输出流 [document.close](/static/js/document.js#L1)|
|document.cookie||返回所有的cookie字符串|
||document.createAttribute()|创建属性节点|
||document.createComment()|竟然能创建一段注释的节点，亮瞎狗眼|
||document.createDocumentFragment()|创建空DocumentFragment并返回|
||document.createElement()|创建元素节点|
||document.createTextNode()|创建文档节点,不太实际|
|document.doctype|||
|document.documentElement||返回根节点|
|document.documentMode||返回渲染模式|
|document.documentURI|||
|document.domain|||
|document.embeds|||
|document.forms|||
||document.`getElementByClassName()`|返回指定class 的NodeList对象|
||document.`getElementById()`|id 第一个对象引用|
||document.`getElementByName`|名称对象集合|
||document.`getElementByTagName`|标签对象集合|
|document.`images`||返回所有Image对象引用|
|document.implementation||啥玩意|
||document.import()||
|document.inputEncoding||返回文档编码方式，比如`UTF-8`|
|document.lastModified||返回文档最后被修改的时间|
|document.links||返回所有a标签|
||document.normalize()|删除空文本节点，并连接相邻及节点，createTextNode 创建的节点。|
||document.normalizeDocument()||
||document.open()|打开一个流，以收集任何document.write | writenlen()方法的输出 [document.close](/static/js/document.js#L1)|
||`document.querySelector()`|匹配css 选择器的第一个元素|
||`document.querySelectorAll()`|返回匹配css选择的所有元素节点的列表|
|document.readyState||返回文档状态 `uninitialized ` `loading ` `interactive ` `complete `|
|document.referer||返回上一个文档的URL|
||document.removeEventListener()|移除addEventListener()添加的句柄|
|document.scripts||返回所有脚本的集合|
|document.title||返回title|
|document.URL||返回完整的URL|
||document.write()|写html表达式或者js代码，重写整个文档|
||document.writelen()|等同write，但带有换行符|
||||
### HTML DOM 属性对象

|属性|方法|描述
|---|---|---|
|attr.idId||是id，true，否则false|
|attr.name|||
|attr.value|||
|attr.specified||返回被指定的属性，true，否则false|
||nodemap.getNamedItem|`btn.attributes.getNamedItem("onclick").textContent;` 返回onclick|
||nodemap.item()||
||nodemap.length|查看元素带有多少个属性。`error`|
||nodemap.removeNamedItem|移除指定属性节点|
||nodemap.setNamedItem|设置指定属性节点，通过名称|
||||
### HTML DOM 元素对象 
> http://www.runoob.com/jsref/dom-obj-all.html

|属性|方法|描述
|---|---|---|
|element.accessKey||*设置或者返回accessKey一个元素|
|element.attributes||返回一个元素的属性数组|
|element.childNodes||返回一个元素的子元素数组|
|element.childrent||返回一个子元素的集合|
|element.classList||*返回元素的类型，作为DOM Token对象|
|element.className||设置或者返回class名称|
|element.clientHeight||返回整数，浏览器当前视窗的文档高度|
|element.clienWidth||返回整数，浏览器当前视窗的文档宽度|
|element.contentEditable||如果设置为true 则可编辑。false 不可编辑|
|element.dir|||
|element.firstChild|||
|element.id|||
|element.innerHTML|||
|element.isContentEdiable|||
|element.lang|||
|element.lastChild|||
|element.namespaceURL|||
|element.nextSibing|||
|element.nextElementSibing|||
|element.nodeName|||
|element.nodeType|||
|element.nodeValue|||
|element.offsetHeight|||
|element.offsetWidth|||
|element.offsetLeft|||
|element.offsetParent|||
|element.offsetTop|||
|element.ownerDocument|||
|element.parentNode|||
|element.previousSibing|||
|element.previousElementSibing|||
|element.scrollHeight|||
|element.scrollLeft|||
|element.scrollTop|||
|element.scrollWidth|||
|element.style|||
|element.tabInde|||
|element.tagName|||
|element.textContent|||
|nodeList.length|||
||element.addEventListener()|指定元素添加事件句柄？？句柄啥玩意|
||element.`appendChild()`|添加一个子元素|
||element.cloneNode()||
||element.compareDocumentPosition()||
||element.focus()||
||element.getAttribute()||
||element.getAttributeNode()||
||element.getElementsByTagName()||
||element.getElementsByClassName()||
||element.getFeature()||
||element.getUserData()||
||element.hasAttribute()||
||element.hasAttributes()||
||element.hasChildNodes()||
||element.hasFocus()||
||element.`insertBefore()`|插入,已选择的.insertBefore(parentNode,ChildNode) [insertBefore]("/static/js/document.js/#L26)|
||element.isDefaultNamespace()||
||element.isEquaNode()||
||element.isSameNode()||
||element.isSupported()||
||element.normalize()||
||document.querySelector()||
||document.querySelectorAll()||
||element.removeAttribute()||
||element.removeAttributeNode()||
||element.removeChild()||
||element.removeEventLisenter()||
||element.`replaceChild()`|替换|
||element.setAttribute()||
||element.setAttributeNode()||
||element.setIdAttribute()||
||element.setIdAttributeNode()||
||element.setUserData()||
||element.toString()||
||nodeList.item()||
||||
### HTML DOM事件，见 `## DOM事件`
> 单独拎出来

### Console 对象
### cssStyle 对象
|属性|方法|描述|
|----|----|----|
|cssText||style属性,`document.body[0].style.cssText`|
|length|||
|parentRule|||
||getPropertyPriority()|指定是否设置了 `!important` 属性|
||getPropertyValue()|返回指定的css属性值|
||item()|通过索引方式返回css声明的css属性名|
||removeProperty()|移除css声明中的css属性|
||setProperty()|在css声明块中新建或者修改css属性|
||||

## DOM事件`TODO`
> http://www.runoob.com/jsref/dom-obj-event.html

### 事件的传播

- 第一阶段。从window 对象传导到目标节点（上层传递到下层），捕获阶段 capture
- 第二阶段。在目标节点触发，目标阶段 target 
- 第三阶段。目标节点传导回window对象（底层传回下层），冒泡阶段 bubbling


### 事件代理

- 事件在冒泡阶段，始终会传导到父级别，所以，在父级别定义监听函数即可。此行为叫 事件的代理
```js

const ul= document.querySelector('ul');
ul.addEventListener('click',(event)=>{
	if(event.target.tagName.toLowerCase()==='li'){
		console.info('这就是li');
	}
})
```

- 如需要以上代码不需要传播到window，则可以使用stopPropagation方法阻止传播
	- stopPropagation方法，阻止继续向下传播
	- 事件冒泡到p，不再继续向上冒泡


```js
p.addEventListener('click',()=>{
	if(event.target.tagName.toLowerCase()==='li'){
        console.info('这就是li');
        event.stopPropagation()
	}
},true)
```


### 鼠标
|事件|描述|例子|
|----|----|----|
|`onclick`||`document.body.onclick=function(){}`|
|oncontextmenu|对内容右键，firefox支持 contentmenu||
|onmousedown|||
|onmouseenter|||
|onmouseleave|||
|onmousemove|||
|onmouseout|||
|onmouseup|||
||||


### 键盘
|事件|描述|例子|
|----|----|----|
|onkeydown|||
|onkeypress|||
|onkeyup|||
||||
### 框架/对象 事件
|事件|描述|例子|
|----|----|----|
|onabort|||
|`onbeforeload`|||
|`onerror`|图片src加载错误，常用||
|onhashchange|||
|`onload`|||
|onpageshow|一打开页面就出现，一般在body||
|onpagehide|用户离开网页时触发||
|onresize|||
|onscroll|||
|onunload|body frameset||
||||
### 表单事件
|事件|描述|例子|
|----|----|----|
|onblur|||
|onchange|||
|onfocus|||
|onfocusin|||
|onfocusout|||
|oninput|||
|onreset|||
|onsearch|input="search"||
|onselect|选取文档||
|onsubmit|||
||||
### 剪切板
|事件|描述|例子|
|----|----|----|
|oncopy|||
|oncut|||
|onpaste|||
||||
### 打印事件
|属性|描述|例子|
|----|----|----|
|onafterprint|||
|obbeforeprint|||
||||
### 拖动事件
|事件|描述|例子|
|----|----|----|
|ondrag|||
|ondraged|||
|ondragenter|||
|ondragleave|||
|ondragover|||
|ondragstart|||
|ondrop|||
||||
### 多媒体(Media)事件
|事件|描述|例子|
|----|----|----|
|onabort|||
|oncanplay|||
|oncanplaythrough|||
|ondurationchange|||
|onemptied|||
|onended|||
|onerror|||
|onloadeddata|||
|onloadedmetadata|||
|onloadstart|||
|onpause|||
|onplay|||
|onplaying|||
|onprogress|||
|onratechange|||
|onseeked|||
|onstalled|||
|onsuspend|||
|ontimeupdate|||
|onvolumechange|||
|onwaiting|||
||||
### 动画事件
|事件|描述|例子|
|----|----|----|
|animationed|||
|animationteration|重复播放||
|animationstart|||
||||
### 过渡事件
|事件|描述|例子|
|----|----|----|
|transitionend||css过渡后触发|
||||
### 其他事件
|事件|描述|例子|
|----|----|----|
|onmeesage|websocket、 web worker、 event source 、frame||
|onmousewheel->onwheel|||
|ononline|||
|onoffine|||
|onpopstate|||
|onshow|||
|onstorage|||
|ontoggle|`<details>`||
|onwheel|滚轮||
||||
### 事件对象
|属性|方法|静态变量|描述|例子|
|----|----|----|----|----|
|||CAPTURING-PHASE|当前事件阶段为——捕获阶段||
|||AT-TARGET|当前事件时目标阶段，在评估目标事件||
|||BUBBLING-PHASE|当前的事件为——冒泡阶段||
|bubbles|||||
|cancelable|||||
|currentTarget|||||
|eventPhase|||||
|target|||||
|timeStamp|||||
|type|||||
||initEvent()||||
||`prevenDefault()`||||
||`stopPropation()`||||
|||||||
### 目标事件对象

|属性|方法|描述|例子|
|----|----|----|----|
||`addEventListener()`|允许在目标事件中监听事件（IE8=attachEvent()）||
||dispatchEvent()|发送事件到监听器(IE8=fireEvent())||
||removeEventListener()|运行一次注册在事件目标上的监听事件（IE8=detachEvent()）||
|||||
### 事件监听对象

|属性|方法|描述|例子|
|----|----|----|----|
||handleEvent()|把任意对象注册为事件处理程序||
|||||

### 文档事件对象

|属性|方法|描述|例子|
|----|----|----|----|
||createEvent()|||
|||||
### 鼠标/键盘事件对象

|属性|方法|描述|例子|
|----|----|----|----|
|altKey||||
|button||event.button可以知道是鼠标的那个按键 左、右、中||
|clientX||||
|clientY||||
|ctrlKey||||
|Location||||
|charCode||||
|key||||
|keyCode||||
|which||||
|metaKey||||
|relatedTarget||||
|screenX||||
|screenY||||
|shiftKey||||
||initMouseEvent()|初始化鼠标事件对象|||
||initKeyboardEvent()|初始化键盘事件对象|||
||||||
## HTML5
## 一些常用的 API

### document.querySelector API

>2018年11月29日，在一家面试到这个API，我清晰的笃定说其实这个API是可以像JQuery一样使用css的选择器的，去选择第四的li标签，然后被驳回了，说只能用document.querySelectorAll
但通过测试来看，其实是可以的。

```js
  document.querySelector('#app > div > ul > li:nth-child(4)') 
  /*或者*/
  document.querySelector('li:nth-child(3)') 
```
### XMLHttpRequest

属于Http API 的一个范畴，使用的时候，需要实例化XMLHttpRequest对象

- 如何发起http请求，在通用js环境下？步骤如下：
    1. new XMLHttpRequest 一个对象
    2. open
        1. methods
        2. 路径

```js
//一段通过纯文本发送请求个服务器
function send(){
  var request = new XMLHttpRequst ;
  request.open("POST","/login.php");//post 数据
  request.setRequestHeader('Content-Type','text/plain;charset=UTF-8')
  request.send('say hello world')

}

// 一段超时的代码
//js权威指南p503

/*XMLHttpRequest 兼容ie6*/

/*如果不存在，判断IE下不支持非标准的xmlHttpRequest*/
if(window.XMLHttpRequest===undefined){
    window.XMLHttpRequest=function() {
      try {
          //可用，则返回ActiveX对象的最新版本
        return new ActiveXObject('Msxml3.XMLHTTP.6.0')
      }
      catch (e1) {
        try {
            // 否则，退回到较旧的版本
          return new ActiveXObject('Msxml3.XMLHTTP.3.0')
        }
        catch (e2) {
          //否则，都没有的话，抛出错误
          throw new Error('不支持XMLHttpRequest')
        }
      }
    }
}

```


- 可以实现上传文件进度的监控，在js权威指南/p501有写道，可以监控HTTP上传的进度
- 设置超时
- 同源策略不允许XMLHttpRequest 进行跨域请求
- withCredentitails boolean值，该值的存在是为了测试是否支持CORS@2特性一种方法

### js三大对象

[SegmentFault 查看更多，作者Adrain](https://segmentfault.com/a/1190000011467723)

#### 本地对象
  - 与宿主无关，独立于宿主环境的ECMAScript 实现提供的对象
  - ECMA-262 定义的类（引用类型）
  - 该类引用类型在运行过程中需要通过new 创建所需的实例对象
  - 包含 `Object`、`Array`、`Date`、`RegExp`、`Function`、`Boolean`、`Number`、`String` 等
#### 内置对象
  - 与宿主无关，独立于宿主环境的ECMAScript实现提供的对象
  - EMCAScript 程序开始执行前就存在，本身就是实例化内置对象，无需实例化
  - 内置对象是本地对象的子集
  - 包含`Global` 和`Math`
  - ECMAScript 5中新增了`JSON`这个存在于全局的内置对象
#### 宿主对象
  - 由ECMAScript 实现的宿主环境提供的对象，包含两个大类，一个是宿主提供，一个是自定义类对象
  - 所有非本地对象都是宿主对象
  - 嵌入网页的js 来讲，宿主就是浏览器提供的对象，包括`window` 和`Document`
  - 所有DOM 和 BOM 对象都属于宿主对象

## PWA
### Service worker 工作线程，子线程
>2014年5月提出，前身是Application Cache`被移除`
  - Application Cache 指定缓存策略 app.appcache
  - 不能直接访问/操作 DOM 特定的API
    - `全局`Promise/Fetch API/Cache API
  - 生命周期内，需要时，直接唤醒，不需要则自动休眠，不随浏览器窗口关闭、站点的关闭而失效
  - 离线内容可控
  - 一旦安装，永远存活，除非手动卸载
  - 必须HTTPS，除非本地环境下
  - 广泛使用Promise
  - 生命周期
    Register - > Install -> activated
  - 组织结构
    - 注册sw 是一个脚本文件`延时注册`
    - 工作时候的sw 又是另外一个脚本文件
## Nginx
> https://blog.csdn.net/tsummerb/article/details/79248015 对nginx 正向、反向带来写的比较好的文章
### nginx 的正向代理？
> 我忘记是2018年在哪一家公司面试了，面试官问我，你知道什么是nginx 正向代理？我楞了下，说不知道，后面想一直知道这个知识点。直到我直到这个知识点后，傻楞了，我一个前端知道个锤子nginx 正向代理啊，我去！ 算了，本着学习的心态，不想回忆起这个沙雕面试官了。
- 正向代理最大的特点是客户端非常明确要访问的服务器地址；服务器只清楚请求来自哪个代理服务器，而不清楚来自哪个具体的客户端；正向代理模式屏蔽或者隐藏了真实客户端信息。
-  内网服务 主动要求请求外网的地址服务， 内网服务->访问->外网 。（(⊙_⊙)?，所以我ssh 到服务器 curl 百度 ，也算了）
- (`应该可以本来按着a 页面返回给用户，结果我让百度页面返回给用户？恩？`)
- 以 通过代理软件访问facebook 这样的例子，比较形象
```txt
  server{
    resolver 8.8.8.8
  }
```
### nginx 的反向代理？
- proxy_pass
- upstream
- 外网 主动请求内网服务， 外网->请求->内网服务
- 请求的来源也就是客户端是明确的，但是请求具体由哪台服务器处理的并不明确了，nginx扮演的就是一个反向代理角色
- 用户去访问淘宝，但返回给用户的内容的服务器，可能来自浙江，可能来自北京
### nginx负载均衡
- 硬件负载均衡
- 软件负载均衡
> 与硬件主机实现一种消息队列分发机智

- 负载均衡调度算法
  - weight轮询
  > 皇帝翻牌子比较形象了！可以设定一些权重，来增加获得宠幸的几率，被打入冷宫的out 出局。。。
  - ip_hash
  > 客户端ip的hash匹配，一个固定ip从会访问到同一个后端，一定程度解决了集群下，session共享问题
  - fair
  > 智能调整算法调度？动态的 根据后端服务器的请求处理处理的响应时间，进行均衡的分配，响应时间短的，分配到的几率高，长的，分配的少！需要安装upstream_fair 模块
  - url_hash 
  > 根据url+hash 结果，每次请求的url都指定到后端固定服务器，nginx作为静态服务器下，提高缓存效率。需要安装hash 软件包
### 一段基于vue项目nginx 配置文件
```txt
{
  worker_processes  1;
  events {
      worker_connections  1024;
  }
  http {
      include       mime.types;
      default_type  application/octet-stream;
      sendfile        on;
      keepalive_timeout  65;
      server {
          listen       80;
          server_name  localhost;
        
      location / {
              root   F:\baidu\dist;
              try_files $uri $uri/ @router;
              index  index.html;
      }
    
      location @router {
              rewrite ^.*$ /index.html last;
      }
      location ^~/api/{
        proxy_pass http://www.baidu.com/;
        }
      }
  }
}

```
### 一段基于nuxt项目的nginx 配置文件

## Nuxt

### AsyncData()

- 导致session id不一直
- 刷新都没有了

### Nuxt.conf.js

## TypeScript_尚未

## Lavas_尚未

## Es6

### let、const

- let  
  - 不可重复声明变量
  - 暂时临时死域
  - 作用域块
- const
  - 必须先赋值
  - 不可重复声明变量
  - 对于纯数字、字符、等基本结构的话，不可更改，但可以更改数组里面的元素、对象里面的key
  - 只能去改变引用类型(object array)，无法取改变基本类型(boolean number string null undefined)

- var  
  - var 声明，存在变量提升问题
  - var 是全局变量声明的方式

```js
  for(var i =0;i<5;i++){}
  console.info(i) // 5

  for(let i=0;i<5;i++){}
  console.info(i) // 抛出未定义 且 for 括号和 大括号是不同的作用域
```
### 函数
- 剩余参数(rest参数)的表示法，同样，items是最后一个参数
```js
// 此时的items 是一个数组
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
console.log(a)//[1,2,3]
```
### class 类
> `特殊的函数`=> `类表达式`、`类声明`
- 只能有且只有一个`constructor`方法
- 一个构造函数可以使用`super` 关键字来调用一个父类的构造函数
- `static` 关键字定义一个类的静态方法。可以不需要实例化该类，但不能通过一个`类实例调用静态方法`
```js
//demo1 
class Home{
  //构造函数
  constructor(height,width){
    this.height=height;
    this.width=width
  }
  // getter，隐藏的get属性
  get area(){
    return this.all()
  }
  //methods
  all(){
    return this.height*this.width
  }
}

const h= new Home(360,480);
console.log(h.height);//360
console.log(h.area);//就可以调用
console.log(h.area());//报错。get 的属性值不是一个function


// demo2  `static` 关键字定义一个类的静态方法。可以不需要实例化该类，但不能通过一个`类实例调用静态方法`
class Point{
  constructor (x,y){
    this.x=x;
    this.y=y
  }
  //static 关键字，顶一个类的静态方法
  static distance(a,b){
    const dx = a.x-b.x;
    const dy = a.y-b.y;
    return Math.hypot(dx,dy)//参数平方和的平方根
  }
}

const p1 = new Point(5,5);
const p2 = new Point(10,10);
console.log(Point.distance(p1,p2))
// 相当于Point.distance({x:5,y:10},{x:10,y:5})
```
- 用原型和静态方法包装
```js
class Animal { 
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
}

let obj = new Animal();
obj.speak(); // Animal {}
let speak = obj.speak;
speak(); // undefined

Animal.eat(); // class Animal
let eat = Animal.eat;
eat(); // undefined

//当然了。如果小改动了一下

speak.bind(obj)();//这样就可以了~~

// demo2 ，知道结果可能如下，但不太理解这样的方式
function Animal() { }

Animal.prototype.speak = function() {
  return this;
};

Animal.eat = function() {
  return this;
};

let obj = new Animal();
let speak = obj.speak;
speak(); // global object

let eat = Animal.eat;
eat(); // global object
```
- Object.setPrototypeOf() 继承常规对象
- extends 创建子类
```js
  // 父类
  class Animal{
    constructor (name){
      this.name=name
    }
    speak(){
      console.log(this.name+'Noise')
    }
  }
  // 子类
  class Dog extends Animal{
    speak(){
      //此处基础父类的this 属性name 值
      console.log(this.name+'by dog')
    }
  }

  //实例化
  const d = new Dog('Lilei');
  d.speak()

```
- species
> 派生数组类。返回Array 对象，允许覆盖默认的构造函数。类似`map()`返回默认构造函数的方法时，希望返回一个父Array 对象，而不是Arr，可以`Symbol.species`

```js
class Arr extends Array{
  static get [Symbol.species](){return Array}
}
const a = new Arr(1,2,3);
const mapped = a.map(x=>x*x);
console.log(mapped instanceof Arr);
console.log(mapped instanceof Array)
```
- supper
> `supper` 关键字用于调用对象的父对象上的函数

```js
// demo1 这个demo 看不出来什么
class Cat{
  constructor(name){
    this.name=name
  }
  speack(){
    console.log(this.name+' makes a noise');
    return 2
  }
}
class Lio extends Cat{
  speak(){
    super.speak();
    console.log(this.name+' for Lio');
    return 111
  }
}
const animal =new  Lio('litter red');

/** demo2 super 简单应用 */
// 声明一个对象
const Family={
  name:'Jo Home'
};
// 再生一个对象，内含一个函数`getName`
const main ={
  getName(){
    return super.name
  }
};
let home = main.getName();
console.log(home);
//以上这样做并没有什么卵用，但是如果使用了Object.setPrototypeOf(要设置在原型上的对象，prototype)
// 在home前面增加
Object.setPrototypeOf(main,Family);
/** demo3 关于class*/
supper.name;
// 等同于 属性
Object.getPrototypeOf(this).name;
// 等同于 方法
Object.getPrototypeOf(this).name.call(this)
```
### Promise 对象
>状态的变更

> 缺点：无法向外抛出错误移除，并主动中断这样的流程结果
```js
 const promise =  new Promose((resolve,reject)=>{
    const a=1;
    if(a===1){
      resolve('ddd')
    }else{
      reject('sss')//最好是返回一个变量，不然某些环境下，会导致警告或者报错，可以是字符串、数组、对象，但只能是一个参数
    }
  });

  promise()
    .then(res=>{
      console.log(res)
    })
    .cacth(err=>{
      console.log()
    })
```
- resolve()
  - 只能入参一个，但可以是`数组`、`对象`

- reject()
  - 只能入参一个，但可以是`数组`、`对象`

- then()

- catch()

- finally()

- all()

- racr()

### Generator

### async await
- generator的语法糖
- Generator 的改进
  - 内置执行器
  - 更好的语义
  - 更广的适用性
  - 返回值是promise
- async 函数的的返回值是Promise 对象，aysnc 表示 该函数内部有异步操作
- await 命令后可以是Promise 对象和原始类型的值（数值，字符串，布尔值，此时等同于同步操作）
- 如果包装成为一个函数，then里面表示当遇到await是执行then然后才执行后面
- 如何使用asyns/await
  - 函数声明
  - 函数表达式
  - 对象的方法
  - class 的方法
  - 箭头函数方法

```js
// demo1
async function all(){
  return new Promise((resolve,reject)=>{
    let time1 = Math.random();
    let time2 =Math.random();
    // 第一个异步
    setTimeout(()=>{
      console.log(1,time1*10*5000);
      resolve(time1*10*5000)
    },time1*10*5000);

    // 第二个异步

    setTimeout(()=>{
      console.log(2,time2*10*5000);
      resolve(time2*10*5000)
    },time2*10*5000)
  })
};
all()
  .then(res=>{
    console.log(3,res)
  })
  .catch(err=>{
    console.log(4,err)
  });

/*************************************************/
// 第一个异步
async function all1 () {
  return new Promise((resolve, reject) => {
    let time1 = Math.random();
    setTimeout(() => {
      console.log(1, time1 * 10 * 1000);
      resolve(time1)
    }, time1 * 10 * 1000)
  })
}

// 第二个异步
async function all2 () {
  return new Promise((resolve, reject) => {
    let time2 = Math.random();
    setTimeout(() => {
      console.log(2, time2 * 10 * 1000)
    }, time2 * 10 * 1000)
  })
}

// 一个普通async 函数里面，执行两个异步函数会怎么样呢?
async function all () {
  console.log('a');
  await all1();
  console.log('b');
  await all2();
  console.log('c') //这个不会执行，以为还在等待promise 的回来
}
all()

```

而以下代码呢？

```js
// 第一个异步
async function all1 () {
  return new Promise((resolve, reject) => {
    let time1 = Math.random();
    setTimeout(() => {
      console.log(1, time1 * 10 * 1000);
      resolve(time1 * 10 * 1000)
    }, time1 * 10 * 1000)
  })
}
// 第二个异步
async function all2 () {
  return new Promise((resolve, reject) => {
    let time2 = Math.random();
    setTimeout(() => {
      console.log(2, time2 * 10 * 1000);
      resolve(time2 * 10 * 1000)
    }, time2 * 10 * 1000)
  })
}

// 一个普通async 函数里面，执行两个异步函数会怎么样呢?
async function all () {
  console.log('a');
  await all1()
    .then(res1 => {
      console.log(res1)
    });
  console.log('b');
  await all2()
    .then(res2 => {
      console.log(res2)
    });
  console.log('c')
}
all()


// 结论是
/*a
Promise {<pending>}
1 2824.509694408435
27 2824.509694408435
29 b
16 2 6266.805712440053
32 6266.805712440053
34 c*/
```

再看一下这个
结论：
a
第0s——10s计时后，打印 1 10
10 异步一函数的then
打印 b
第10s——17s计时后， 打印 2 8
8 异步二函数的then
c
第18s……


```js
// 第一个异步
async function all1 () {
  return new Promise((resolve, reject) => {
    let time1 = 10;
    setTimeout(() => {;
      console.log(1, time1);
      resolve(time1)
    }, time1*1000)
  })
}
// 第二个异步
async function all2 () {
  return new Promise((resolve, reject) => {
    let time2 =8;
    setTimeout(() => {
      console.log(2, time2);
      resolve(time2)
    }, time2 * 1000)
  })
}

// 一个普通async 函数里面，执行两个异步函数会怎么样呢?
async function all () {
let i=0;
setInterval(()=>{
  console.log(i++)
},1000);
  console.log('a');
await all1()
.then(res1 => {
  console.log(res1)
});
  console.log('b');
await all2()
.then(res2 => {
  console.log(res2)
});
  console.log('c')
}
all()
```

再看，把async/await 里面有两个普通的定时任务会怎么样?

结论，此时all1 与all2 是异步任务了，
a
b
c
0s-8s计时
2 8
9s
10 s
1 10

```js
// 第一个异步
async function all1 () {
    let time1 = 10;
    setTimeout(() => {
      console.log(1, time1)
    }, time1*1000)
}
// 第二个异步
async function all2 () {
    let time2 =8;
    setTimeout(() => {
      console.log(2, time2)
    }, time2 * 1000)

}

// 一个普通async 函数里面，执行两个异步函数会怎么样呢?
async function all () {
let i=0;
setInterval(()=>{
  console.log(i++)
},1000);
console.log('a');
await all1();
console.log('b');
await all2();
console.log('c')
}
all()
```

```js
// 以下声明都成立
function * a1(){}
function* a2(){}
function *a3(){}
function*a4(){}

a1();
a2();
a3();
a4();


function * hello(){
  yield 'hello'; //yield 表达式
  yield 'world'; //yield 表达式
  return 'hellow and world'
}
```

- 分段执行。`yiled` 表示暂停执行的标志，`next` 表示恢复执行
- es6提供的异步编程解决方案。[阮一峰 Generator 函数的语法](http://es6.ruanyifeng.com/#docs/generator)
- 状态机，封装了多个内部状态
- 有`*`星号function * a(){}
- 函数体内部使用了yield表达式，定义不同的内部状态(yield 产出的意思) function * a(){yield 'hello';};var func = a();

### Symbol 

- 无法计算
- 描述值相同，两个值也是不相同的
- 无法使用`new` 命令，symbol 不是一个对象
- 描述值是一个对象，则调用该对象的toString()方法转为字符
- Symbol 无法与其他类型进行运算
- 每个Symbol值都不相等，保证不会出现同名的属性
- Symbol作为属性名，不会出现在`for...in`、`for...of`循环中
- 无法被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回
- 可通过 `Object.getOwnPropertySymbols`方法,返回一个数组，成员是当前对象的所有用作属性名的Symbol值
- Symbol.for()与Symbol()前者调用返回存在的值，否则每次都新建
#### 消除魔术字符串

#### 属性名遍历``

```js
const obj={
	[Symbol(21)]:8
};
Object.getOwnPropertySymbols(obj)

```
#### Symbol.for()

#### Symbol.keysFor()


## Node.js
- [如何正确的学习Node.js](https://cnodejs.org/topic/5ab3166be7b166bb7b9eccf7)
### fs

> 不建议在调用 fs.open()、fs.readFile() 或 fs.writeFile() 之前使用 fs.access() 检查文件的可访问性。 这样做会引入竞争条件，因为其他进程可能会在两个调用之间更改文件的状态。 相反，用户代码应该直接打开、读取或写入文件，并处理在文件无法访问时引发的错误。
- `.unlink()`  删除文件 异步
  ```js
    const fs= require("fs");
    fs.unlink('./tmp/hello.js',(err)=>{
      if(err) throw err;
      console.log('删除成功')
    })
  ```
- `.unlinkSync()` 删除文件 ，同步
  ```js
    const fs = require('fs');
    try{
      fs.unlinkSync('./tmp/hello.js');
      console.log('删除成功')
    }catch(err){
      console.log(err,'删除失败')
    }
  ```
- `.rename()`
```js
  fs.rename('./tmp/hello.js','./tmp/world.js',(err)=>{
    if(err) throw err;
    console.log('rename done')
  })
```

- `.open()` 完成操作后，需要关闭描述符，否则可能导致内存泄漏
  - `wx` flag 
  -  `r`

线程池
> 除了fs.FSWatcher() 和 显式同步的方法之外，都使用了`libuv` 线程池，这对于某些应用程序可能会产生其他负面性能问题，详见 http://nodejs.cn/api/cli.html#cli_uv_threadpool_size_size
- `fs.FSWatcher()`
>成功调用一个fs.watch 方法都会返回一个新的fs.FSWatcher对象
- `fs.access(path,[.mode],callback)`
- `fs.Dirent`类
  - `.dirent.isBlockDevice()` boolean

```js
  const fs = require('fs');
  fs.open('./tmp/hello.js','r',(err,fd)=>{
    if(err) throw err;
    fs.fstat(fd,(err1,stat)=>{
      if(err1) throw err1;
      //文件属性
      console.log(stat) ;

      //关闭文件描述符
      fs.close(fd,(errC)=>{
        if(errC) throw errC;
        console.loh('关闭')
      })
    })
  })
```
- `fs.ReadStream` 类
- `fs.WriteSteam`类
- `fs.Stats` 类  
  - `fs.stat()`
    ```js
      fs.stat('./tmp/world.js',(err,stats)=>{
        if(err) throw err;
        conosle.log(stats)
      })
    ```
  - `fs.lsate()`
  - `.fstat`
  ```js
    fs.fstat(fd,(err1,stat)=>{
        if(err1) throw err1;
      //文件属性
        console.log(stat) ;
        //关闭文件描述符
        fs.close(fd,(errC)=>{
        if(errC) throw errC;
          console.log('关闭')
        })
    })
  ```
- `fs.close()`
- `fs.appendFile(path,data[,options],callback)` 
> 异步地将数据追加到文件中，如果文件不存在，则创建该文件，`data`可以使字符串或者`Buffer`
```js
  fs.appendFile('/tmp.append.txt','hello world append file for node.js fs.appendFile function'+new Date(),(err)=>{
    if(err) throw err
  })
```

> 异步方法，顺序无法保证

```js
  fs.rename('./tmp/hello.js','./tmp/world.js',(err)=>{
    if(err) throw err;
    console.log('rename done')
  });
  //stat可能在rename 之前，
  fs.stat('./tmp/world.js',(err,stats)=>{
    if(err) throw err;
    conosle.log(stats)
  })
```
> 方法时，在回调内部

### Comet 技术/SSE,基于服务器推送事件的Comet技术/SSE
EventSource对象
```js
  var ticket =  new EventSource('source.php');
  ticker.onmessage=function(e){
    var type = e.type;
    var data = e.data;
    // todo
  }

```
## 继承
- OO语言概念，两种继承方式（接口继承、实现继承）。es 只支持`实现继承`
- JavaScript 主要通过原型链实现继承，原型链的构建是通过将一个`类型的实例`赋值给另一个`构造函数的原型`实现的
- 使用最多的是 `组合继承`，原型链继承共享的属性和方法，借用构造函数继承实例属性
- 最有效的是寄生组合式继承，集 `寄生式继承`+`组合继承的优点`
--------------------------------------------------------
> 以下摘录来自《JavaScript 高级程序设计》

### js继承的几种方式？
- 原型链
- 借用构造函数
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承

### `继承的方式-原型链`
> 原理：利用原型让一个引用类型继承另一个引用类型的属性和方法
> 疑问：通过原型继承有什么缺点?
1. 包含引用类型值的原型
2. 因为包含引用类型的值的原型属性会被所有实例给共享
### `[x]继承的方式-借用构造函数/伪造对象/经典继承`（很少用）
> 原理：子类型构造函数内部调用超类型构造函数，通过apply/call方法执行新创建对象上执行构造函数

> 缺点：
1. 方法都在构造函数中定义，函数无法复用
2. 超类对子类方法不可见
```js
  function SuperType(){
    this.colors=['r','g','b']
  }
  function SubType(){
    //继承了SuperType,意思是这里执行了构造函数
    SuperType.call(this)`[3]` //此处应该怎么样去深刻的理解呢？
    // 1 SuperType.apply(this)`[3]`
    // 2 SuperType.bind(this)()`[3]`//再次执行
  }
  var instance1 =new SubType();
  instance1.colors.push('o');
  console.log(instance1.colors); //'r,g,b,o'
  var instance2 = new SubType();
  instance2.colors.push('v');
  console.log(instance2.colors)
```
### `[√]继承的方式-组合继承/伪经典继承`
>原理：将原型链和借用构造函数的技术组合到一起
```js
  function SuperType(name){
    this.name=name;
    this.colors=['r','g','b']
  }
  SuperType.prototype.sayName=function(){
    console.log(this.name)
  };
  function SubType(name,age){
    //继承属性
    SuperType.call(this,name);
    this.age=age
  }
  // 继承方法
  SubType.prototype= new SuperType();
  SubType.prototype.constructor=SubType;
  SubType.prototype.sayAge=function(){
    console.log(this.age);
    return this.age
  };
  var instance1 = new SubType('张三',30);
  instance1.colors.push('o');
  console.log(instance1.colors);
  instance1.sayName();
  instance1.sayAge();

  var instance2 = new SubType('李四',40);
  instance2.colors.push('v');
  console.log(instance2.colors);
  instance2.sayName();
  instance2.sayAge()
```
### `继承的方式-原型式继承`
> 所给出的demo
```js
function object(obj){
  function F(){}
  F.prototype=obj;
  return new F()
}
```
> 实质上,浅拷贝:
- 这种方式，导致其中一个实例变更，其他实例也会跟着变更,被共享
```js
function object(obj){
  function F(){}
  F.prototype=obj;
  return new F()
}
var p1 ={
  name:"张三",
  colors:['red','green','blue']
};
var anthor =object(p1);
anthor.name="贾克斯";
anthor.colors.push('voilet');

var other=object(p1);
other.name="伊泽瑞尔";
other.colors.push('orange');
console.log(p1.colors)
```
>es5 中的Object.create()规范原型继承，
```js
//demo1 传入一个参数此时，和object方法行为相同
var p1 ={
  name:"张三",
  colors:['red','green','blue']
};
var anthor =Object.create(p1)
anthor.name="贾克斯";
anthor.colors.push('voilet');

var other=Object.create(p1);
other.name="伊泽瑞尔";
other.colors.push('orange');
console.log(p1.colors)//还是全出来

// demo2 使用第二个参数，与defineProperties方法第二个参数相同，通过自己的描述符定义，会覆盖原型对上上的同名属性
var p2= {
    name:"李四",
    colors:['red','green','blue']
};
var anthor=Object.create(p2,{
  name:{
    value:"Orange"
  }
});
console.log(anthor.name)//Orange
```
### `继承的方式-寄生式继承`
> 一个函数返回prototype，另外一个函数添加方法，并返回该函数。层层合并，最后工厂函数的模式被新函数继承。

> 缺点：
1. 由于不能复用函数，从而效率比较低，与构造函数模式类似
```js
function object(obj){
  function F(){}
  F.prototype=obj;
  return new F()
}
function create(obj){
  var clone = object(obj);
  clone.sayHi=function(){
    console.log('hi')
  };
  return clone
}
var p1 ={
    name:"李四",
    colors:['red','green','blue']
};
var anthor=create(p1)
anthor.sayHi()
```
### `[√]继承的方式-寄生组合式继承`
>特点：
1. 两次超类型构造函数的调用，一次创建子类型原型式，另外次在子类型构造函数内部
2. 被认为是应用类型最理想的继承范式
```js
  function object(obj){
    function F(){}
    F.prototype=obj;
    return new F()
  }
  function inhertPrototype(subType,superType){
    var prototype= object(superType.prototype);
    prototype.constructor=subType;
    subType.prototype=prototype
  }
  function SuperType(name){
    this.name=name;
    this.colors=['red','green']
  }
  SuperType.prototype.sayName=function(){
    console.log(this.name)
  };
  function SubType(name,age){
    SuperType.call( this,name)//第一次调用 SuperType
    this.age=age
  }
  inhertPrototype(SubType,SuperType);
  SubType.prototype.sayAge=function(){
    console.log(this.age)
  }
```
--------------------------------------------------------

### 对象之间“非构造函数方法”。 [非构造函数方法实现]

啥是非构造函数继承？因为两个都是普通对象，无法使用构造函数的方式继承

```js
// 中国人对象
var Chinese={
  nation:'中国'
};
// 一个医生对象
var Doctor={
  career:'医生'
}
```

#### object()方法

将子对象的prototype属性，指向父对象，从而子对象和父对象一起！！
！！！ 这™不是用函数的方式 new 一个构造函数嘛？？？

```js
function object(o){
  function F(){}
  F.prototype=o;
  return new F()
}

var Doctor= object(Chinese);
Doctor.career='医生'; // 加子对象本身的属性？？
console.info(Doctor.nation);//中国
```

#### 浅拷贝

将父对象属性，全部拷贝给子对象，实现继承。有问题的是，父对象有被篡改。

```js
function extendCopy(p){
  var c = {};
  for(var i in p){
    c[i]=p[i];
  }
  c.uber=p;
  return c;
}

//usage
const Doctor= extendCopy(chinese);
Doctor.carret='医生';
console.info(Doctor.nation); // 中国
```

#### 深拷贝 （JQuery当前使用的继承方式）

真正意义上的，对象和数组的拷贝。原理是递归调用“浅拷贝”

```js
function extendDeep(p,c){
  var c=c||{};
  for(var i in p){
    if(typeof p[i] ==='object'){
      c[i]=(p[i].constructor===Array)?[]:{};
      extenDeep(p[i],c[i])
    }else{
      c[i]=p[i]
    }
  }
  return c
}
//usage
var Doctor= extenDeep(Chinese);

// chinese.city=['北京']
// Doctor.city.push('天津')
console.info(Doctor.city); // 北京、天津
console.info(Chinese.city) // 北京
```

### 对象之间 “继承的五种方法”。[构造函数实现]

- 构造函数绑定
- prototype模式
- 直接继承prototype
- 利用空对象作为中介
- 拷贝继承

#### 构造函数绑定

```js
// 定义一个动画的函数对象
function Animal(){
  this.type='动物'
}
// 定义一个Dog的函数对象
function Dog(name,color){
  this.name=name;
  this.color=color
}

// ？ 如何让猫继承动物？？？？
function Dog(name,color){
  Animal.apply(this,arguments); //此处的用意是什么? 将父对象的构造函数绑定在子对象上。
  this.name=name;
  this.color=color
}
var dog1 = new Dog('二哈','白色');
console.info(dog1)
```

#### prototype 模式。

- 每一个prototype都有一个构造函数的属性constructor，并指向它的构造函数
- 每一个实例也有一个constructor
- 如果替换prototype之后，必须为prototype的构造函数constructor指向它本身，否则会导致紊乱

```js
function Animal(){
  this.type='动物'
}
function Dog(name,color){
  this.name=name;
  this.color=color;
}
Dog.prototype=new Animal(); // 将Dog 的原型对象【prototype】对象指向Animal 的实例，完全删除原先的值，并赋予新值。
Dog.prototype.constructor=Dog;// 使得Dog 的原型对象的构造函数指向父级的animal
var dog2 = new Dog('三哈','绿色')

```

#### 直接继承prototype

确定，Animal.prototype.constructor等于Dog

```js
function Animal(){}
Animal.prototype.type='动物';
function Dog(name,color){
  this.name=name;
  this.color=color
}
Dog.prototype = Animal.prototype; //直接继承 Animal的原型对象
Dog.prototype.constructor=Dog;
var cat3= new Dog('四哈','黒色');
console.info(cat3.type) // 动物

```

#### 利用空对象作为中介[略]

#### 拷贝继承

```js
function Animal(){}
Animal.prototyoe.type='动物';

// 实现拷贝的函数。
function extend(Child,Parent){
  var p= Parent.prototype;
  var c = Child.prototype;
  for(var i in p){
    c[i]=p[i]
  }
  c.uber.p
}
//将函数作用，就是将父对象的prototype对象中属性，拷贝给child对象的prototype对象
extend(Dog,Animal);
var dog4 = new Dog('五哈','棕色');
console.info(dog4.type) ;// 动物

```

## 原型与原型链
> 继承是为了方便代码的复用（数值、函数方法、属性），JS采用了原型方案来实现继承，原型就是继承的实现方式之一！

> 原型与原型链对于一个将走进高级web前端来讲，是一个门槛。由于概念性比较多，截止目前2018年10月31日13:58:06，我依然还是比较模糊。

### 概念定义
  - `prototype`
```js
/*例子demo*/
function Animal(name){
  this.name =name;
  this.getName= function(){
    return this.name
  }
}

function Cat(name,age){
  Animal.call(this,name);
  this.age=age||1;
  this.meow= function(){
    return 'name:'+this.getName() + '\n'+'age:'+ this.age
  }
}
 const cat = new Cat('Lily',2);
 console.log(cat.meow());
/**
*@desc 注释解析 demo
*/
// 声明一个函数Animal，这里一定要入参name 值，否则函数里面的this 是一个undefined
function Animal(name){
  this.name =name;// 实例会有一个name 属性和 一个getName的方法，会返回name的值
  this.getName= function(){
    return this.name
  }
  //此时的this > Cat={name:Lily,age:2,getName:function(){},meow:function(){}}
}

// 声明一只猫
function Cat(name,age){
  //通过call改变上下文的方法，去入参Lily 去调用 Animal方法，此时入参的this 是什么？!!!
  // name 这里传递给函数Animal，而使用function 声明的函数，都是函数对象，它就是一个object
  Animal.call(this,name);
  this.age=age||1;
  this.meow= function(){
    return 'name:'+this.getName() + '\n'+'age:'+ this.age
  }
}
 const cat = new Cat('Lily',2);
 console.log(cat.meow())
```


  - `__proto__`
  - `constructor`
```js

/*定义一个函数test*/

function test(){
  console.log('I am test')
}
test.children='Leo';

/* 这时候如何取出Leo 的值？*/
test.children;

/* 假如很多呢？*/
test.prototype.constructor.children
```

### 构造函数

### JS原型继承的几种方法

### 闭包(closure)`函数`
>定义：指 有权访问另外一个函数作用域中变量的函数！
- 闭包只能取到包含函数中任何变量的最后一个的值
```js
//闭包，不符合预期
	function test(){
		var arr = [];
		for(var i = 0; i < 10; i++){
			arr[i] = function(){
			console.log(i);
			}
		}
		return arr;
	}
	var myArr = test();
	for(var j = 0;j<10;j++){
		myArr[j]();
	}
```
```js
// 立即执行函数解决闭包
	function test(){
		var arr = [];
		for(var i = 0; i < 10; i++){
			(function(j){
				arr[j] = function(){
					console.log(j);
				}
			}(i));
		}
		return arr;
	}
	var myArr = test();
	for(var j = 0;j<10;j++){
		myArr[j]();
	}

```
闭包的特点
- 闭包，是指有权访问另外一个函数作用域中变量的函数。a函数内，创建一个b函数。
- 指函数内部保留变量，被另外一个函数访问
- 有权访问另外一个函数作用域内变量的函数都是闭包。
- 变量被引用着，就不会被回收
- 技术上，所有js函数都是闭包，都是对象，关联到作用域链
- 造成原始作用域链不释放，造成内存泄露

闭包的场景
- 闭包替代全局变量
- 函数外或其他函数中访问某一个函数内部参数
- 函数执行之前，为要执行后一个函数提供具体的参数
- 为函数执行之前提供质优在函数执行或引用时才能知道的具体参数
- 为节点循环绑定click 事件，在事件函数中使用档次循环的值或节点，而不是最后一次循环的值或节点
```js

```
- 暂停执行（怎么理解）
- 包装相关功能
```js
function a(){
  function b(){
  }
}
	//1、demo1
	function a(){
		var n=0;
		function b(){
			n++;
			console.info(n);
		}
		b();
		b();
	}
	a(); // 1 //2
	//2、demo2
	function f() {
	  var n=0;
	  this.inc=function() {
	    n++;
	    console.info(n);
	  }
	}
	
	var c= new a();
	c.inc()//1
	c.inc()//2
	//3、demo3
	function f() {
	      var n=0;
	      function inc(){
	        n++;
	        console.info(n);
	      }
	      return inc;
	    }
	    
    var c= new f();
    c()//1
    c()//2
```

1. 如何避免闭包?
2. 闭包的应用场景?

---------------------------------------------------------------------------------------------------
>  Hello world ！以下为技术题目：
---------------------------------------------------------------------------------------------------
## 一些流行的技术题目
### 所有类型，string|number|NaN|boolean|array|object|function|，共用的属性是什么？除了，null、undefined。(自己出的)
> toString()、valueOf()
### 哪些数据类型有length 这个属性？(自己出的)
|string|number|NaN|null|undefined|boolean|array|object|function|
|------|------|---|----|---------|-------|-----|------|--------|
|`success`|error|undefined|error|error|undefined|`success`|undefined|0,始终是0|
### 双等于号比较
>结论：
1. 字符串和布尔值 是一组，空字符串 和false
2. null 和undefined 是一组，以上两组互不相等，同组的组员或者自己相等
3. NaN属于Number，自称一派 

> 如果按书写字符长度分布，用以下记忆表格
- 前两个，后两个交叉
- NaN全false

|    |    |    |    |    |
|----|----|----|----|----|
|a==a|`''`|`null`|`false`|`undefined`|
|`''`|true|`false`|true|`false`|`false`
|`null`|`false`|true|`false`|true|
|`false`|true|`false`|true|`false`
|`undefined`|`false`|true|`false`|true|

> 如何按分布可以用一些记忆表格(这个比较好记忆)

|    |    |    |    |    |
|----|----|----|----|----|
|a==a|`''`|`false`|`null`|`undefined`|
|`''`|true|true|`false`|`false`|`false`
|`false`|true|true|`false`|`false`|`false`
|`null`|`false`|`false`|true|true
|`undefined`|`false`|`false`|true|true
||||||

### 三等于号比较

|-|-|-|-|-
|----|----|----|----|----|
|三等于比较a===a|`''`|`false`|`null`|`undefined`|
|`''`|`true`|false|false|false|
|`false`|false|`true`|false|false|
|`null`|false|false|false|`true`|false|
|`undefined`|false|false|false|false|`true`|
||||||

- ["1", "2", "3"].map(parseInt) 答案是多少？

[详细解析](http://blog.csdn.net/justjavac/article/details/19473199)

###  map 用法考察

```js
  //map 一定会执行funtion，必须会执行这个currentValu,index,arr
  // thisValue 对象作为该执行回调时使用，传给函数,用作this 值，省略。this 为 undefined
  array.map(function(currentValue,index,arr){
  	
  })
  ```

###  parseInt 考察

```js
// map:
["1","2","3"].map(function(value,index){
  console.info(value,index)
});
//1 0
//2 1
//3 2
//于是，对于map后面加了一个方法parseInt，就相当于
parseInt('1',0); // 1 此时radix 0以10位基础
parseInt('2',1); // NaN redix 为1，小于2，NaN
parseInt('3',2); // NaNredix 为2，小于2不成立，但2进制不满足3
/*********************************************************/
parseInt(string,radix); ////string 必填,radix(2~36)如果 radix 为0，则以10为基础解析，如果0x， 0X开头，以16位基数，如果小于2,、大于36 则返回 `NaN`
parseInt("1", 0); // 十进制 1
parseInt("2", 1); // 第二个参数不在 2-36 直接
parseInt("3", 2); // 二进制 NaN，因为二进制中，不存在3，所以报错
parseInt("4", 3); // 三进制，4的3禁止，11，不含4
parseInt("5", 4); // 四进制，5的4禁止，11，不含5
parseInt("6", 5); // 五进制，6的5禁止，11，不含6
parseInt("7", 6); // 六进制，7的6禁止，11，不含7
parseInt("8", 7); // 七进制，8的7禁止，11，不含8
parseInt("9", 8); // 9的八进制=11 因为八进制中，不存在9，所以报错
parseInt("10", 9);  // 九进制 （1*9+0 = 9） 10的九进制=11
parseInt("11", 10); // 十进制 （1*10+1 = 11）
parseInt("12", 11); // 十一进制 （1*11+2 = 13）
parseInt("13", 12); // 十二进制 （1*12+3 = 15）
parseInt("14", 13); // 十三进制 （1*13+4 = 17）
parseInt("15", 14); // 十四进制 （1*14+5 = 19）
parseInt("16", 15); // 十五进制 （1*15+6 = 21）
```

###  判断对象为空？

```js
var b = {};

/* 判断是否是空对象*/
JSON.stringify(b) === '{}'

```

###  如何阻止冒泡？ [*]
  e.stopPropagation()
  旧的IE e.cancelButton=true
###  firfox 与 IE的事件机制
  IE 事件冒泡
  FF 同时支持捕获型事件、冒泡型事件

###  js延迟加载
  defer、async，动态创建dom方式【最多】，按需异步加载
###  ajax 异步传输 （html+js）
###  ajax 缓存问题
###  跨域问题
  jsonp 利用script标签不跨域的方式，让js文件发挥json格式的文件。
  ```js
  //jsonp 意味着需要信任远程服务器的脚本，否则会炸鸡。
  // 请求jsonp
    getSome({say:'hello'})
  
  ```
  iframe
  window.name
  window.postMessage
  服务商设置代码页面
###  模块化开发
  立即执行函数，不暴露私有成员
###  CommonJS （通用环境）node的实现、webpack也是
###  AMD-require.js/curl.js（异步模块定义，一开始写好，前置，适合浏览器环境） [AMD（异步模块定义，一开始写好，前置）](https://github.com/amdjs/amdjs-api/wiki/AMD)
###  CMD （sea.js实现-）[require.js就近模式](https://github.com/seajs/seajs/issues/242) [require.js就近模式1](http://annn.me/how-to-realize-cmd-loader/)
###  异步加载js
-  defer {IE}
-  async
-  创建script
###  document.write
###  document.innerHTML
###  ECMAScript 与 Javascript
- Javascript 是  ECMAScript 所实现的一个标准
- Javascript 是  ECMAScript的一种实现
- 一般讲js ：dom+bom+ECMAScript

## 附1__2018年阿里资深web前端面试题_未附

## 附2__2018年网易高级web前端面试题_未附

## 附3__2018年中级/高web前端面试题_未附

## 附4__2018年8月15日的电话面试基础题_未附

## 附5__2018年8月17日的面试题

`地址是在滨江，两个妹纸面试，问的问题都是些基础题，我比较差。
她们说这次的要求是，招一尊大神，当顾问，解决疑难杂症，会android+ios开发。
我尴尬的笑了笑，这个就算了吧。
以下是面试问到的问题，有些还没来得及写答案，有些不知道，有些重新梳理了知识：`
1. 你了解http吗？讲一些http吧
2. http 和 https 的区别
3. http 有哪些方法？

[MDN http定义的请求方法](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)

 - head
    - 与get相似，没有响应体
    - 请求头，放置参数
  - get
    - 应用请求指定资源，用于获取数据
    - 请求头，放置参数
  - post 
    - 将实体提交到指定资源，状态或服务器的副作用更改，通俗讲，提交数据，或发送，并得到结果
    - 请求体，放置参数
  - put (放的意思)
    - 请求有效载荷替换目标资源的所有当前表示
    - 传输文件，自身不带验证机制
    - 更新资源，幂等（多次提交更新 结果都和一次执行的一样）。
    - 类似post
    - 请求体，放置参数
  - patch (补丁)
    - 对资源应用部分修改
  - `*`delete
    - 删除指定资源。
    - 请求参数放在哪？*
    - 很少出现
  - `*`connect (链接)
    - 建立一个到由目标资源标识到服务器的隧道
    - 请求链接转换到tcp/ip 通道
  - `*`trace (追踪)
    - 沿着目标资源的路径执行一个消息环回测试  
  - options
    - 返回服务器支持的http方法
4. get和post的区别

	|操作|get|post|
	|---|---|---|
	|后退/刷新|无害|重复提交|
	|编码类型|application/x-www-form-urlencoded|application/x-www-form-urlencoded/multipart/form-data/二进制|
	|历史|参数保留在浏览器history里|参数不会保留|
	|数据类型限制|ASCII字符|没有限制|
	|安全性|与post相比，比较差，敏感信息不要用get|post比get安全，参数不保留的缘故，在客户端和服务端|
	|可见性|所有人在url可见|在url中不可见

5. put 和post 的区别 
	
	|操作|put|post|
	|---|---|---|
	|特性|幂等|非幂等|
	|场景|更新资源，修改密码（因为提交参数不同，但结果一样，重复结果，多次不同请求的场景）|注册账号|
6. 讲一下IE下碰到的那些内存泄露问题<sub>#IE内存泄漏问题总结</sub>

	`参考@3`
	
	|泄露描述|解决方案|
	|---|---|
	|动态刷新||
	|页面f5反复刷新，内存biubiu||
	|退出变量占用内存的页面,内存依然无法回收||
	|退出变量占用内存iframe,内存依然无法回收||
	|span/td/js 变量||
	|同作用域内，js对象引用dom对象，dom又引用同作用域内的js对象，将发生泄露||
	|同作用域内，dom对象应用一个在函数内的闭包函数，如事件绑定，且闭包又引用上层对象||
7. 讲一下 碰到的兼容性问题
8. 讲下闭包
  - 原理
  - 应用场景
  - 如何解决闭包
9. 跨域问题
10. 布局问题，css 选择器有哪些?
11. 布局问题，css左右布局，如何让右边自适应，左边固定？
  - 垂直居中有哪几种方式？分别怎么实现
12. vue 响应式原理
  - defineprotoperty 的get 和set 分别做了什么？
      - get 依赖收集
        - 处理哪些订阅者去做响应式变化处理，
      - set 派发更新
        - 数据发送变化中触发setter逻辑，把依赖过程中订阅的所有观察者也就是watcher都触发update 过程，优化队列，在nextTick后执行素有watcher 的run
  - 观察者
13. 如何用原生js+css 选择
```html
<div>
  <div></div>
  <p></p><!-- css 选择这个，用js 选择这个-->
  <p></p> 
</div>

```     
14. 原型链
15. 前端缓存问题(这是那个脸红的妹纸问题的，其实她想问的是localstorage、和sessionstorage 和cookie的知识，但其实有多种)
比较，彼此之间的异同。
- Storage 存储
  - cookie
  - sessionStorage
  - localstorage
 - indexedDB还有这个

- cache 缓存
  - application Cache 我也说道这个
  - cache storage
16. setTimeout 设置执行时间，一定会执行吗？
  - 属于EventLoop部分的问题，假如栈里面没有其他任务的话，就会执行。
  - 先执行stack 的普通console之类的
  - 碰到setTimeout会放到 web Api中，交给浏览器的timer模块
  - 执行引起处理其他之后，才会回来执行timer
  - 基本流程如下：
    1. 同步任务
      - console 之类 主逻辑线
    2. 微任务
      - process.nextTick(node)
      - promise
      - mutataionObserver
    3. 宏任务
      - script 全局
      - setTimeout
      - setInterval
      - setImmedidate
      - I/O
      - UI渲染


17. setTimeout 会引起内存泄露吗？
```js
/*1 反复点击的代码~~*/
function leap(){
  var li = document.getElementsByClassName('li');
  console.log('li');
  for(var i=0;i<li.length;i++){
    li[i].onclick=function(){
      console.log('leap boooooooom')
    }
  }
}

/*2 避免卵用，以下代码可以保证不重复引用或者死循环*/
var test = function(){
		setTimeout(function(){
			test();
		},1000);
	};
	test();
```
### css 部分

- 什么是标准盒子模型？
  - 即对doctype 定义时，默认是标准盒子模型，块的总宽度=width+margin(左右)+padding(左右)+border(左右)怪异模式下的，IE模型：总宽度=width+margin(左右)  =》(左右width包含padding+border)
- 什么是IE盒子模型？
  - 即不对doctype定义时，是
- 如何将标准模型改为IE盒子模型？
  - box-sizing:content-box 采。用标准模型解析计算，默认的
  - box-sizing:border-box，采用怪异模型
- 如何实现垂直居中?
  - https://www.cnblogs.com/hutuzhu/p/4450850.html  稍后验证下这部分
- 如果加一个背景，会影响盒子模型的哪部分?

- absolute 和relative（仔细一看，突然了解了relative 的用法！！）
  - absolute 绝对定位，相对于static定位以外的第一个父元素定定位，如果没有，那会是html？有left top right bottom 值。会超越overflow
  - fixed 相对于窗口定位 类似absolute
  - relative 相对定位，相对于自身的基础位置进行定位，left、top、right、bottom相对于其正常位置定位，lefy 20  则向元素left 位置添加20。【尽量避免用relative】
  - static，默认值，没有定位 忽略top left right bottom z-index
  - inherit 继承 

### js 部分

- js 基础类型与引用类型

> typeof 操作符区分 基本类型

> instanceof 操作符区分 引用类型


  - 基本类型
> 什么叫堆内存？自己买菜做饭，就是堆，主动的
    - 有undefined、boolean、number、string、null。按值访问的意思。
    - 任何方法都无法给边基本类型的值，比如一个字符串

```js
var name ='Veaba';
name.toUpperCase();
console.log(name)/*Veaba ，说明无法给边原始变量里面的值 */ 
```

- 不能给基本类型添加属性和方法
- 基本类型的比较是值的比较，只有他们的值相同的比较，最好使用三等号符
- 基本类型的变量是存放在栈区，内存里面的栈内存（那堆呢？）
- 赋值不影响

  - 引用类型
> 去菜馆吃饭，叫栈，被动

- 对象。属性和方法的集合
- 引用类型可以拥有属性和方法，属性又可以包含基本类型和引用类型
- 引用类型的值是可以变的。
- 引用类型的值是同时保存在栈内存和堆内存的对象
  - 操作对象的引用
  - 栈区内存保存变量和标识符 和 指向堆内存中该对象的指针(该对象在对内存的地址)
- 引用类型的比较是引用的比较。
- 赋值会影响指向同一个对象

- typeof null ？object
- typeof array？ object
- 如何判断array 的方法？
  - Array.prototype.isPrototypeOf(obj) 原型
    - Array.prototype.isPrototypeOf([])
    - Array.prototype.isPrototypeOf({})
  - obj instanceof Array 构造函数
    - 'ff' instanceof Array
    - [] instanceof Array
  - class 属性，跨原型链调用toString()
    - Object.prototype.toString.call([]) '[object Array]'
    - Object.prototype.toString.call({}) '[object Object]'
    - Object.prototype.toString.call(null) '[object Null]'
  - Array.isArray()//es6提供的
### js 的异步机制

- js 是单线程的

- 任务队列 和事件循环(queue、eventLoop)
- 定时器t
- 异步机制
- 总结

JavaScript单线程和其异步机制就如上所述。所谓的单线程并不孤单，它的背后有浏览器的其他线程为其服务，其异步也得靠其他线程来监听事件的响应，并将回调函数推入到任务队列等待执行。
单线程所做的就是执行栈中的同步任务，执行完毕后，再从任务队列中取出一个事件（没有事件的话，就等待事件），然后开始执行栈中相关的同步任务，不断的这样循环。

### 浏览器的100

- 101 webSocket  (size 0B)

### 浏览器的200状态的区别

- 灰色的 200  from disk cache（来自磁盘缓存），比如f5百度之后的，某个js，或者 (from memory cache) （使用该功能，必须在chrome里面 Network取消勾选Disable cache）
- 正常 200

### 了解chrome 控制台工具

- Elements 元素
- Console  控制台
- Sources  源
- Network 网络
- Performance 性能
- Memory内存
- Application 应用程序
- Security 安全
- Audits 审计/审查

### 浏览器的300状态

- 304 （意义：原来缓存的文档还可以使用）png document。依然会与服务器通信。如果cache-control:max-age>0 直接从浏览器提取。否则，向服务器发送http请求，确认该资源是否修改，有200，无修改304

### svg 与canvas

- svg 数量小，静态，不失真，dom绘制，类似图片，logo，简单
- canvas 数量大，密集，js绘制。像素级。可塑性高，可添加各类事件。处理处理重绘。效率高，复杂度高。

### base64 图片 与 src 引用图片

- base64 好处。小文件嵌入，不需要额外的请求。
- base64 坏处。浏览器不会缓存。

- 根据 base64AndSrcImage.html 测试结果来看
  - width 1200px 下
  - base 编译的代码 灰色200，从内存取缓存 from memory cache
  - src ，正常200，从网络取 /304 产生7ms

  - width 750px 下
  - base 编译的代码 灰色200，从内存取缓存 from memory cache
  - src，正常200.从网络取 /304 产生7ms

- 得出的结论是，base占用内存，速度快。
  - css 响应式，src 按需加载。base64

### css 有间隙

- 当使用inline-block  父级设置font-size:0
- 或者letter-spacing:0

### css l v h f a 记忆方法 ，倒叙记忆

### css 纯css 无法实现父选择器

- 目前的实验上去测试了，发现以往的记忆是JQuery来实现的，纯css 无法实现该效果

### 二叉树

- 特殊的二叉树，满二叉树。深入k且含有2^k - 1的节点，深度3，节点为2^3-1=7。满二叉树，一定是完全二叉树。
            ①
            ②        ③
          ④   ⑤    ⑥  ⑦
        ⑧ ⑨ ⑩ ⑪  ⑫ ⑫ ⑫ ⑫
- 完全二叉树。 最后一层左边是满的，右边可能满或不满，其余层是满的。
                ①
            ②       ③
          ④   ⑤    ⑥  ⑦
        ⑧ ⑨ ⑩ ⑪  ⑫
- 二叉树第i层最多有2^(i-1) 个节点，i>=1
- 二叉树 深度为k 最多有 2^k-1个节点kk>=1

- 遍历。 前序遍历(DLR)，D根L左R右。
- 遍历。 中序遍历(LDR)，L左D根R右
- 遍历。 后序遍历(LRD)，L左R右D根

### Number方法 （2018年4月10日 面试遇到该类型的题目，简直日了狗的难受）

- 原始值 NaN （not a number）
- 原始值 undefined
- 原始值 null
- 原始值 boolean
- 原始值 string
- 原始值 number

- 如果对象的值无法转为数字，则Number的函数返回NaN
- 加法有两种情况，数字与数字相加；字符串与字符串相加。
- 加法会触发三种类型转换，转换为原始值；转为数字；转为字符串
- 结论1、先两个两个操作数，转为原始值
- 结论2、如果存在一个任意字符串，则也将另外一个也转为字符串，然后返回两个字符串链接结果
- 结论3、否则将两个值转为数字类型，并返回和
- 结论4、任何数字与NaN 相加都是NaN

|toNumber|将值转为数字|
|----|----|
undefined   | NaN
null        | 0
boolean     | true/1 false/0
number      | 无需转换
string      | 由字符串解析为数组 '324' ->324
[]          | 0

|toString|将值转为数字|
|----|----|
undefined   | 'undefined'
null        | 'null'
boolean     | 'true'/'false'
number      | 数字转字符串
string      | 无需转换
function(){}| 'function(){}'

```js
console.info(1+1); //2 typeof number
console.info(1+'1'); // 11 typeof stirng
console.info('1'+1); // 11 typeof string
console.info(1+''); // '1'
console.info(''+1); // '1'
console.info(1+undefined); //NaN
console.info(''+undefined); //undefined
console.info(true+undefined); // NaN  Number(true)+Number(undefined)=NaN,String(true)+String(undefined)='trueundefined'
console.info(false+undefined); // NaN
console.info(''+true); // 'true'
console.info(' ' + true); // ' true'
console.info(''+false);//'false'
console.info(' '+false);//' false'
console.info(1+function (){}); //'1function(){}'
console.info(1+Object());//'1[object Object]'
console.info('' +Object()); // [object object]
console.info(1+Array()); // 1+Array().toString()=>1 +[].toString()
console.info(1+Array); //1 +Array.toString()= >1+function Array(){[native code]}
console.info(1+NaN); // NaN
console.info(''+NaN); //'NaN'
console.info('1'+NaN); //'1+NaN'
console.info(true+false); //1
console.info(true+true); //2
console.info(true+undefined); //NaN
console.info(true+NaN); //NaN
console.info(true+function(){}); //'truefunction(){}'

```

### replace 理解

```js
let string='22dda';
// $1   找到的
// $2   找到所在的索引
// $3   替换前的源码
string.replace('要替换的正则、字符等',function($1,$2,$3){
  return $2
});

'我是{{name}} ,年龄{{age}},性别{{sex}}'.replace(/\{{(.+?)\}}/g,function($1,$2,$3){
  console.info($1)
})
// {{name}}{{age}}{{sex}}
```

### sort 理解

- sort 数组元素排序，排序可以使字母或者数字，并按升续降序
- 默认是字母升序
- 【注意】：数字是按字母顺序排序时 40 在 5前面
- 【注意】：使用数字排序，必须通过一个函数作为参数调用
- 函数是指定数字是升序还是降序
- 会改变原始数组

语法

```js
let array=[];
array.sort(sortFunction); //可选，但排序顺序，必须是函数
function  sortFunction() {
  return Math.round(Math.random())?1:-1
}
// Math.round(0)// 0  四舍五入，向上取舍
// Math.round(0.49)// 0  
// Math.round(0.2)// 0
// Math.round(0.5)// 1
// 返回值
// Array 对数组的引用，数组在原数组进行排序，不生成副本
```

### 冒泡算法

- 有几种冒泡算法？
- 分别实现冒泡算法?

### typeof 常见类型

|typeof|值|
| ----- | ---- |
typeof null | "object"
typeof undefined|"undefined"
typeof [] |"object"
typeof [''] |"object"
typeof ['a']|"object"
typeof {} | "object"
typeof {a:['test']}|"object“
typeof NaN | "number"
typeof true | "boolean"
typeof false | "boolean"
typeof new Date()|"object"
typeof function(){alert('22')} |"function"
typeof console.info('tt')|"tt" "undefined"
typeof console|"object"
typeof 1|"number"
typeof '2'|"string"
typeof ''|"string"

### 用一行代码将[1,2,3,4]随机打乱

```js
[1,2,3,4].sort(function(){return  Math.round(Math.random())?1:-1})
```

### typeof null

```js
"object"
```

### let domList = document.querySelectorAll('div')，一句话将domlist转为数组

```js
Array.from(domList)
```

### 哪个http response header 不会影响浏览器缓存行为

a.cache-control   b.etag   c.age     d.last-modified

通用首部字段（请求头报文+响应报文）

- Cache-Control  控制缓存的行为
- Pragma http1.0 遗留，no-cache时禁用缓存

请求首部字段

- If-Match 比较ETag是否一致
- IF-None-Match 同上
- If-Modified-Since 比较资源最后更新的时间是否一致
- IF-Unmodified-Since 比较资源最后更新的时间是否一致

响应首部字段

- ETag 资源的匹配信息

实体首部字段

- Expires http1.0的遗留物，实体主体过期的时间
- Last-Modified 资源的最后一次修改时间

[详见 浅谈浏览器http 的缓存机制](https://www.cnblogs.com/vajoy/p/5341664.html)

### 合理的前端项目结构分层

### 挑选自己或者公司项目，遇到的问题、解决的思路简单阐述下

### 全面解析一个任意url的所有参数为object，注意边界条件

```js
var url = 'https://www.baidu.com/?user=admin&id=23&id=555&city=%E9%A2%9C%E8%89%B2&status=disabled';
var newUrl  = url.replace(/^.+(\?)/,'');
var url1 = newUrl.split('&');
var ob={}
url1.map((item,index)=>{
var temp=[];
temp = item.split('=');
keys.push(temp[0]);
values.push(temp[1])
if(ob[temp[0]]){
  ob[temp[0]]=[ob[temp[0]]].concat(temp[1]) //如果存在 则合并成为数组
}else{
  ob[temp[0]]=temp[1];
}
});
console.info(ob)
```

```js
ob={
  user:'admin',
  id:[23,555],//合并id相同的为数组
  city:'颜色', //中文编码
  enabled:true // 未指定的key约定值为true
}
```

### 实现一个最简单的模板渲染引擎(这是一道在杭州2018年4月16面试一家的笔试题，遗憾没写出来，今天用机器写了记下才写出来，加深了对replace的理解和正则，)

- 要点一 replace 的用法 第一个替换的，第二回调函数，回调函数有三个参数，第一个要找到的，第二个找到的索引，第三个原先的字符
- 对象key 转数组
- 正则 从什么到任意的什么 \{{(.+?)\}}
- 正则 这个或者那个 \{{|\}}

结果：我是姓名，年龄18，性别 undefined

```js
let template='我是{{name}} ,年龄{{age}},性别{{sex}}'
let data ={
  name:'姓名',
  age:18,
}
function cover(template,data){
  let arr = Object.keys(data)
  let temp= template.replace(/\{{(.+?)\}}/g,function($1){
    for(let i=0;i<arr.length;i++){
      if($1.indexOf(arr[i])>-1){
        return $1.replace(arr[i],arr[i]).replace(/\{{|\}}/g,'')
      }
    }
  })
  return temp
}
cover(template,data)
```

### 字符串查找

使用最基本遍历实现查找字符串，并返回第一次出现的问题，找不到返回-1
 a='34'  b='1234567'  返回2
 a='35'  b='1234567'  返回-1
 a='355' b=''12354355 返回5

 ```js
 function compare(a,b){
  return b.indexof(a)
 }
 compare(a,b)
 ```

### 数据绑定基本实现(这是一道在杭州2018年4月16面试一家的笔试题，遗憾没写出来，今天用机器写了记下才写出来，加深了Vue 使用Object.defineProperty()这个方法，对对象修改并返回)

 [详见 MDN的 对象Object.defineProperty()方法的使用](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

- 问题一  Object.defineProperty(obj,key,options)的使用
- 其中 option 里面的选项以及主要的get 和set方法

 ```js
 {
	get:function name(){
      return '你要改变的值'
    }
    set:function value (value){
      //set会返回一个value
      //这个value就是变更后的值，怎么处理
      obj.key= value
    }
 }

 ```

- bind()。【与此同类似的需要懂 call bind apply】其次是使用函数时候，怎么给另外一个对象绑定this，因为此题目用到一个返回并返回这个this，的key值，这时候需要处理

 ```js
func.bind(obj)('你的参数'); // func 是函数，里面有this， obj 就是要操作的函数的那个
let obj={
  key_1:1,
  key_2:2
};
function func(key){
  console.info(key+'的值子发生变化'+this[key])
}
 bindData(obj,func);
 obj.key_1=2;//此时自动输出 变化为2
 obje.key_2=1; //此时自动输出变化为1

 let obj={
  key_1:1,
  key_2:2
 };
 function func(key){
  console.info(key+'的值子发生变化'+this[key])
 }

function bindData(obj,func){
  for(let item in obj){
    Object.defineProperty(obj,item,{
      get:function(){
        return obj.item;
      },
      set:function(value){
        obj.item=value;
        func.bind(obj)(item);
      }
    })
  }
}
bindData(obj,func);
obj.key_1=2;//此时自动输出 变化为2
obj.key_2=1 //此时自动输出变化为1

```

### 数据结构处理

输出有多个儿子的人的名字

 ```js
let data={
  name:'jack',
  child:[
    {name:'jack1'},
    {name:'jack2',child:[
      {name:'jack2_1',child:{name:'jack2-1-1'}},
      {name:'jack2_2'}
    ]},
    {name:'jack3',child:{name:'jack3-1'}}
  ]
}
 ```

### 程序题1

 ```js
for(var i=0;i<5;i++){
setTimeout(function(){
  console.info(new Date,i)
},1000)
};
console.info(new Date,i)
 ```

 ```js
function Person(name){
  this.name=name
}
var a =  Person('a');
var b = new Person('b');
var c = Person;
console.info(a.name);
console.info(b.name);
console.info(c.name)
 ```

——————————————————————-

## 附6__2018年8月31日面试题
### 以下代码运行结果符合预期？（还是没看懂这道题目！）
- 目前测试的结果是，入参大于100+300的时候，time span 的打印时间会在0.0x毫秒以下，否则100ms左右
```js
/*demo1*/
function f1() {
  console.time('time span')
}
function f2() {
  console.timeEnd('time span')
}
setTimeout(f1,100);
setTimeout(f2,200);
function waitForMs1(n) {
  var now = Date.now();
  while (Date.now()-now<n) {}
}

waitForMs1(500);
/*demo2*/
function f3() {
  console.time('time span')
}
function f4() {
  console.timeEnd('time span')
}
setTimeout(f3,1000);
setTimeout(f4,2000);
function waitForMs2(n) {
  var now = Date.now();
  while (Date.now()-now<n) {}
}
waitForMs2(500)

```  
`
    当时选的打印是约500.077ms！回来一跑代码还是没看懂。
    可以理解为？？
` 
2. 
3. 
4. 
### 以下哪个结果为真？
	- A. null instanceof Object
	- B. null == undefined
	- C. NaN ==NaN
	- D. false == undefined
1. `instanceof`用法 
	- 用于测试其原型链上是否存在一个构造函数的prototype属性。
	- 检测constructor.prototype 是否存在参数object的原型链
	- 语法`object instanceof constructor`
	- 最好分辨的是，使用关键字`new`出来
	
	```js
		console.info(({}) instanceof Object);/*true*/
		console.info(3 instanceof Number); /*false*/
	```
### 关于dom事件流的表述哪些不正确?
	- A. 事件流包含两个阶段：事件捕获阶段，事件冒泡阶段
	- B. IE跟标准浏览器对于DOM事件流实现不一样
	- C. 假设parentEle是childEle的父节点，绑定事件：parentEl.addEventListener('click',fn1.false),
	和childEle.addEventListener('click',fn2,false)，当点击childEle的时候，fn1先于fn2触发
	- D. addEventListener第三个参数true代表支持捕获，false代表不支持捕获
	
### 关于原形了的说法不正确的是？
```js
function a1(name,age){
	this.name=name;
	this.age=age;
}
a1.prototype={
	name:'children',
	hasOwnproperty:function() {
	  return false
	}
}
```
	- A.js对象用两个不同的属性，一种是自身属性，另外一种是原型链上的继承的属性	`√`
	- B.instance.name == 'xx' 为true `问题应该是这个，因为this指向，导致undefined，除非构造函数的时候入参`
	```js
	var a = new a1('children')就可以
	```
	
	- C.instance.hasOwnproperty('age')结果是false `√`
	- D.所有对象都继承来自Object.prototype `√`
### 写程序
参考 http://www.cnblogs.com/TomXu/archive/2012/03/02/2355128.html
基本相同的题目来源 https://www.cnblogs.com/LoveOrHate/p/4457010.html
1. 对象A直接调用对象B的某个方法，实现交互逻辑。但导致的问题是A和B紧密耦合，修改B可能造成A调用B的方法失效。
2. 为了解决耦合问题，设计为：
	对象A生成消息->将消息通知给一个消息处理器(Observable)->消息处理器将消息传递给B具体的调用过程变成：
		A.emit('message',data);
		B.on('message',function(data){})
	请实现，消息代理功能。补充完成function EventEmitter(){}
### js写一个ajax get 请求
> emm，无数次都会放假的面试题。（再我又重新去补充该部分的时候）
```js
  const xhr = new XMLHttpRequest();
  xhr.open('GET','http://baidu.com',false);
  xhr.send('hello');
  console.log(xhr.responseText)
```
## 附7__2018年9月11日面试题
	首先，这次面试印象很浅，其次对方需求，说不上来，怎么讲，就是有点鄙视对方的意思。有些术语，问到的，看出来对方不严谨。但部分面试题，还是可以学习的
### https://www.cnblogs.com/chenguangliang/p/5856701.html CommonJS AMD CMD
### 前端工程化
### 前端自动化
### vue/的生命周期
### vue/props 是怎么实现的？跨域
### 如何处理文件上传的进度条
### 从零开始构建项目
### webpack了解
### node.js的stream 流?
### 跨域
### http/https/http2.0
>用node.js  启动https 服务
```js
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);
```
>用node.js启动http2服务
```js
const http2 = require('http2');
const fs = require('fs');
const server = http2.createSecureServer({
    key: fs.readFileSync('./localhost-privkey.pem'),
    cert: fs.readFileSync('./localhost-cert.pem')
});
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  // stream is a Duplex
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  });
  stream.end('<h1>Hello world</h1>')
});

server.listen(8443);
```
### 普通函数和构造函数的区别
### web前端安全和常见的web安全问题

## 附8__2018年9月18日面试题
> 这一次面试经历让我大吃一惊，这不是个人能力有问题，是我的记忆出现了严重问题，截止至今，待业了两个月了。有些问题都重复，再重复，结果一面试就是忘记。比如一个请求头有哪些？我记忆力，好像没有一个key 为header，想了想还是没印象，干脆说不知道。而实际上，header就是一个大对象啊！日了狗。很绝望这一天。
## 附9__2018年9月19日面试题
## 附10__2018年12月份面试题
1.阅读代码，立即执行函数
> 运算符的优先级 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
```js
/**1*/
var name1 ='World!';
(function(){
	console.log(this);
	if(typeof name1 === 'undefined'){
		var name1 ='JACK';
		console.log('hello,'+name1)
	}else{
		console.log('Goodbye' + name1)
	}
})();

/**2 运算符的优先级*/
var val = 'smtg';
console.log('Value is ' +(val==='smtg')?'Something':'Nothing');

```
### 为什么其他语言不能使用set?
### transform 和display none 回流问题
## 描述__关于术语描述sup标签

`@1` AST ：抽象语法树。(abstract syntax tree)

`@2` CORS：跨域资源共享。(Cross-Origin Resource Sharing)

## 索引__关于本作知识引用来源sub标签 
1. [搜狐 - 如何减少HTML页面回流与重绘（Reflow & Repaint）](http://www.sohu.com/a/111695367_466959)
2. [闭包的应用场景一林枫山博客](https://www.cnblogs.com/star-studio/archive/2011/06/22/2086493.html)
3. [IE内存泄漏问题总结](https://blog.csdn.net/rootes/article/details/8784240)
4. [绑定-this-的方法](https://wangdoc.com/javascript/oop/this.html#%E7%BB%91%E5%AE%9A-this-%E7%9A%84%E6%96%B9%E6%B3%95)
