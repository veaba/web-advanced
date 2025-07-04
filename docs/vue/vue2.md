---
sidebar: auto
---

# Vue

- [更多关于 VUE API 人工整理手记，见 /docs/vue-api.md @veaba](/vue/vue2-api)

```vue
<div id="app" @click="send">
{{message}}
</div>
```

```js
var app = new Vue({
  el: '#app' /*可以是class？*/,
  data: {
    message: 'hello world!',
  },
  methods: {
    send() {
      this.message = 'change something ha?';
    },
  },
});
```

## 疑问点

- vue 里面的打补丁扮演何种角色？
- vue 如何处理定时器或者销毁定时器的？
  > 在 `beforeDestroy` 里面处理

```js
export default {
  data() {
    return {
      second: 5,
      timer: null,
    };
  },
  mounted: function () {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPre();
      else this.second--;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    backPre() {
      return 'Do you want what me to do,ha?';
    },
  },
};
```

## vue 基础知识

| 英文             | 建议翻译    |
| ---------------- | ----------- |
| observe/observer | 侦听/侦听器 |
| watch/watcher    | 侦听/侦听器 |
| subs             | 订阅        |
| patch            | 打补丁？    |
| deps             | 依赖关系    |

- Vue 响应式原理分析

  - 核心 Object.defineProperty 在一个对象上定义一个新属性，修改一个对象的现有属性，并返回这个对象。[mdn 了解 defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
    - 语法

  ```js
  /**
   *@obj 要定义属性的对象
   *@prop 要定义或修改的属性的名称
   *@descriptor 定义或修改的属性描述符，一个对象。核心的是get/set
   * get 给属性提供一个getter方法，访问该属性则触发getter方法
   * set 给属性提供一个setter方法，当对属性修改时触发setter方法
   */
  Object.defineProperty(obj, prop, descriptor);
  ```

  - 一旦对象拥有了 getter 和 setter，可以认为这个对象是响应式对象

  - vue 把什么对象变成响应式对象？

    - initState。初始化就是 props、data 变成响应式对象
      - \_init 方法执行时候，会执行 initState(vm) 方法，定义在 src/core/instance/state.js
      - initProps
      - initMethods
      - initData
      - initComputed
      - initWatch

  - proxy 代理
    - 作用时将 props 和 data 上的属性都代理到 vm 实例上。

  ```js
  let comP = {
    props: {
      msg: 'hello',
    },
    methods: {
      say() {
        /*
         *@desc  say函数通过this.msg访问到定义在props上的msg，这个过程就发生在proxy
         */
        console.log(this.msg);
      },
    },
  };

  const sharePropertyfinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop,
  };
  /*
   *@desc proxy函数
   *@desc 通过Object.defineProperty 把target[sourceKey][key]读写变成target[key]
   */
  export function proxy(target, sourceKey, key) {
    sharePropertyDefinition.get = function proxyGetter() {
      return this[sourceKey][key];
    };
    sharePropertyDefinition.set = function proxySetter(val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharePropertyDefinition);
  }
  ```

  - observe
    - 监测数据的变化，定义在 src/core/observer/index.js
    - 给非 vnode 对象类型数据添加一个 Observer，添加或已有返回，否则满足一定情况下，实例化一个？Observer 对象实例
  - getter：依赖收集

    - const dep = new Dep() 实例化一个 Deo 的的实例
    - 通过 dep.depend 收集依赖
    - Dep 整个 getter 依赖收集的核心
    - 依赖收集的目的是当这些响应式数据发送变化时，触发他们的 setter 的时候，能够知道通知哪些订阅者去做响应的逻辑处理，这过程叫派发更新。

  - setter：派发更新。收集的目的是为了修改数据时候，对相关的依赖派发更新

    - 如果 shallow 为 false 对新设置的值变化成一个响应式对象
    - dep.notify() 通知所有订阅者。
      - 遍历所有订阅者 subs，也就是 watcher 的实例数组，然后调用 watcher 的 update 方法
      - queueWatcher 放在 nextTick 队列，等待 flushSchedulerQueue
        - flushSchedulerQueue 队列排序。
          - 先父到子
          - 用户 watcher 优先 render watcher
          - 执行期间被销毁则跳过
        - flushSchedulerQueue 队列遍历
          - watcher.run() 每次都是 queue.length 求值。
            - this.getAndInvoke 方法，并传入 watcher 的回调函数。
        - 状态恢复。
          - resetSchedulerState 函数。
            - 变量恢复到初始值，清空 watcher 队列

  - Dep
    - 一个依赖就是一个 watcher
    - 是一个 class，有一个 target 静态属性，全局唯一 Watcher，被认为是一个巧妙的设计，保证同一时间只有一个全局的 watcher 被计算。另外自身属性 subs 也是 watcher 的数组。
      - Dep 是 watcher 的一种管理，脱离 watcher 单独存在没有意义
      - 触发 getter 时候，会调用 dep.depend() 方法，也会执行 Dep.target.addDep(this)
      - Dep.target 已经被赋值为渲染 watcher，会执行 addDep 方法，保证同一数据不会被添加多次。执行 dep.addSub(this)，执行 this.subs.push(sub)。把 watcher 订阅到这个数据持有的 dep 的 subs 中，为后续数据变化时候能通知到哪些 subs 做准备
      - 完成依赖收集之后，再递归访问 value，触发所有子项的 getter—— popTarget()
      - Dep.target=targetStack.pop() 返回成上一个状态，因为当前 vm 的数据依赖收集已完成。对应的 Dep.target 也需要改变，最后执行 this.cleanUpDeps()
      - this.cleanUpDeps()
        - 变量 deps，移除对 dep 的订阅。交换 newDepIds 和 depIds，newDeps 和 deps，并把 newDepIds 和 newDeps 清空
  - defineReactive 方法

    - 定义一个响应式对象，给对象添加 getter/setter，src/core/observer/index 中
    - 初始化 Dep 对象实例
    - 对子对象递归调用 observe 方法，保证无论访问多少层的属性都能触发 getter/setter
    - 最后利用 Object.defineProperty 方法对 obj 属性的 key 添加 getter/setter

  - Observer 通过 Object.defineProperty 实现对属性变化的监听。

    - 是一个类
    - 作用是，给对象的属性添加一个 getter、setter，用于依赖收集和派发更新
    - 构造函数逻辑：实例化 Dep 对象
    - 为对象添加一个 **ob** 属性，调用 def (封装的 Object.defineProperty)
    - 对 value 判断
      - 是数。调用 observeArray 方法——先遍历数组再调用 observe 方法
      - 是纯对象。调用 walk 方法——先
        遍历对象，再调用 defineReactive 方法

  - Watcher 订阅者。observe 和 compile 之间，负责将变化的数据更新到视图
    - 是一个 class。
    - this.deps Watcher 实例持有 Dep 实例的数组
    - this.newDeps Watcher 实例持有 Dep 实例的数组
    - this.desIds —— this.deps id Set 结构
    - this.newDepIds —— this.newDeps id Set 结构
    - 至于为什么有两个实例数组？

```js
this.deps = [];
this.newDeps = [];
this.depIds = new Set();
this.newDepIds = new Set();
```

- 生命周期，选项？？？这个在 Vue 构造器的传参中何种方式？

  - beforeCreate 实例初始化后 data observer 和 event/watcher 事件配置之前被调用
  - created 实例创建完成被立即调用 (data observe，属性和方法的运损，watch/event 事件回调)，此时 `挂载` 还没有开始，`$el` 目前不可见。当然此时也是可以通过 nextTick() 来取到 document 的
  - beforeMount 挂载之前被调用，render 函数首次被调用，该钩子在服务端渲染器件不被调用
  - mounted `el` 被新创建的 `vm.$el` 替换，并挂载到实例上调用，无法确保所有子组件都一起挂载。ssr 不被调用。希望等到整个视图都渲染完毕，可以：

  ```js
  export default {
    mounted() {
      this.$nextTick = function () {
        //拉拉
      };
    },
  };
  ```

  - beforeUpdate 数据更新时，发生在爱 DOM `打补丁` 之前，适合更新之前访问现有的 DOM，如手动移除已添加的事件监听器。SSR 渲染期间不可用
  - updated 数据更新导致虚拟 DOM 重新渲染和 `打补丁`，DOM 已更新，无法确保所有子组件全都一起被重绘。SSR 渲染器件不可用。可以这样做：

  ```js
  export default {
    updated() {
      this.$nextTick = function () {
        // do something
      };
    },
  };
  ```

  - activated keep-alive 组件激活时被调用，SSR 渲染期间不可用
  - deactivated keep-alive 组件停用时调用，SSR 渲染期间不可用
  - beforeDestroy 实例销毁之前调用，在这一步实例依然完全可以用，SSR 渲染期间不可用
  - destroyed 实例销毁后被调用，调用后实例指示所有东西解绑，所有事件移除，子实例也被销毁，SSR 渲染期间不可用
  - errorCaptured 当捕获一个来自子孙组件的错误时被调用，(errorObj、发生错误组件实例、一个错误来源信息的字符串)，可以返回 false 阻止该错误向上传播

- 组件通信

  - 父传子

    - $props

  - 子传父
    - $emit

- api

## api

- el
  可以是 css 选择器，可以是 HTMLElement 实例 <sub>[HTMLElement 实例是什么？](http://www.w3school.com.cn/xmldom/dom_htmlelement.asp)</sub>

- 全局

```js
const Vue = {
  //config、全局配置
  config: {
    silent: false, //boolean 取消vue所有的日志的警告
    optionMergeStrategies: { _test: function () {} }, //{[key:string]:Function}//自定义合并策略的选项
    devtools: true, //生产false,允许vue-devtools检查代码
    errorHandle: function (err, vm, info) {}, //默认undefined，
    warnHandler: function (msg, vm, trace) {}, //警告处理函数，开发环境下生效
    ignoredElements: [], //Array<string|RegExp> 忽略vue之外定义的元素
    keyCodes: {}, //{ [key: string]: number | Array<number> }
    performance: false, // true浏览器开发者工具性能跟踪
    productionTip: true, //false 阻止vue启动时生成生产提示
  },
  //extend
  extend: {}, //使用vue构造器创建一个子类，拓展构造器！！！
  // nextTick
  nextTick: function () {},
  // set
  set: { target, key, value }, //确保响应式更新
  delete: { target, key }, //避免被删除无法触发更新，但尽量少用它
  directive: (id, [definition]), //指令
  filter: (id, [defintion]), //注册或获取全局过滤器
  component: (id, [definition]), //注册或获取全局组件
  use: object | Function, //安装vue 插件
  mixin: { Object }, //混入
  compile: { string }, //template 编译字符
  version: string, //版本号
};
```

## vue-cli 3.0

- 则选择 typescript+vue 的开始模式
- 也支持预装

### 开发者注意以下问题

- product 环境下，关闭 sourceMap
- product 环境下，尽量关闭 console
- 配置 devServer
- 多页应用，会导致页面重复大一倍

## vue-router 路由

- vue router 懒加载
- vue 路由的几种模式，history 和 hash 的原理是什么？

## vue 相关面试题

- 为什么 vue 的 data 是一个函数？

  - 由于 js 语法特性决定来使用一个函数赋值。

## 基于 vue-cli 3.0 demo 项目框架

## vue 源码学习

- [勾三股四 Vue.js 源码学习笔记](http://jiongks.name/blog/vue-code-review/)
- [HcySunYang Vue2.1.7 源码学习](http://hcysun.me/2017/03/03/Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/)
- [Vue 技术内幕-HcySunYang](http://hcysun.me/vue-design/)
- [Vue.js 技术揭秘-ustbhuangyi](https://ustbhuangyi.github.io/vue-analysis/)

### vue3.0 `先占坑`

> https://www.bilibili.com/video/av36787459/ vue-v2.5.16.js 3.0 最新进展，来自 Vue Conf 杭州

#### 模板编译、Virtual Dom runtime 性能

- Virtual DOM 实现 `完全重构，100%，减少运行时开销（潜在），编译时来提供性能`
  - 重构原生 HTML 标签的判断逻辑，编译时，判断标签，在运行时生成响应的标签或组件
  - 生成虚拟 Node，保持 “形状一致”，同样个数的参数，利于 JavaScript 引擎优化
  - 运行时留下 Hint，静态分析元素包含的子元素类型，以便跳过不必要分支判断
- 优化 Slots 生成
  - 拆分父组件和子组件的耦合关系，引入生成函数，scope、slot 统一称为一个函数，由子组件决定是否调用函数，并把传入的内容分配给子组件来完成收集，避免不要的组件渲染
  - 真正依赖某个数据的组件，才会可能重新渲染，不存在手动优化组件过度重绘问题
- 静态内容提取
  - 检测到一部分模板不会变，直接提取，在之后更新中，直接复用 Virtual dom，甚至可以在比对过程跳过整个树
  - 包含深度动态内容时，如果元素所有的属性都是静态的，提取属性对象，比对元素时，发现 data 都一样，便可跳过，去比对 children 即可
- 内联事件函数提取
  `<Com @event="count++">`
  - 重新渲染时会生成新函数，Cache 后，以便重用，避免子组件无谓更新的效果

#### 数据监听系统

- 把 Object.defineProperty 改为 proxy
- 全语言特性支持
  - 新属性增加
  - 属性的删除
  - 数组 index
  - 数组 length 的修改
  - Map
  - Set
  - WeakMap
  - WeakSet
  - 大规模数据帧听性能提升
- 利用 proxy 内部判断，减少组件实例初始化开销
- 实测，内存减半，性能提升 100%

#### 减少 runtime 体积，目测测试 10kb 左右

- tree-shaking 代码结构，按需引入 import
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
  - 内部模块解耦，如独立 observer
  - 让更多的开发者参与进来
- 编译器重构
  - 插件化设计
  - 带位置信息的 parser (source maps)
  - 铺路 IDE 工具链，如 vetur 作者作为 vscode 团队成员参与 vue 3.0 的开发

#### 多端渲染支持

- 场景
  - `vue native`
  - `wexx`
  - `mpvue` 小程序
- vue 作为 runtime 编译到多端
  - 独立出真正的 customer render API，在 `import {createRenderer} from '@vue/runtime-core'`，平台无关 vue runtime
  - vue 组件和 Virtual Dom 直接渲染到元素的对象上去

#### 响应式数据监听 API

- 实现跨组件的状态共享
- 排查组件更新的触发原因
  - 提供新的 renderTriggered API

#### 更好的 typeScript 支持以及原生的 Class API 和 TSX

- 甚至不需要 babel

#### 更好的警告信息

- 组件堆栈包含函数式组件
- 可以在警告信息中查看组建的 props
- 在更新的警告中提供组件堆栈信息

#### Experimental Hooks API，逻辑重用机制，可能取代 mixins

- Hooks 替代 mixins
- Time Slicing Support 切割 JavaScript 计算，一帧一帧去处理，预留每 16ms yield 给浏览器让用户事件重新进来，允许中间有机会让用户添加进事件

#### 关于 IE

- IE11 自动降级为旧的 getter/setter 机制
- 并引入增加不支持 IE 的语法警告

### 启动

```shell
cnpm install -g karma (运行时test 是基于 Karma 的)
cnpm install --save mime-db
cnpm install (安装依赖)
cnpm run dev:test

```

### 源码项目结构

[vue 官方开发文档](https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md#development-setup)

- `scripts` 一般不需要关注，不过熟悉以下两个文件会更好
  - `scripts/alias.js` 所有源码和测试中使用模块导入的别名
  - `scripts/config.js` 包含生成 `dist/` 的所有文件的配置，查找入口文件，都在这个 `dist` 都在里面
- `dist` 包含用户发布的内置文件。此目录只会在发布的时候更新，并不能说明当前开发的最新特性变化。
  - 关于 dist 的信息请查看[更多](https://github.com/vuejs/vue/blob/dev/dist/README.md)
- `flow` 包含 flow 的类型声明。全局加载的，可以在普通源码中看到他们在注释中的使用
- `packages` 包含 vue ssr 和 vue 模板编译包。vue 的依赖包
- `test` 包含所有测试。单元测试是 Jasmine 写的，运行是用 Karma。e2e 是 Nighwatch.js 编写和运行的。
- `src` 包含源代码。基本代码是 es2015 编写的，并用 flow 来做类型注释

  - `compiler` 编译器。包含模板转函数编译器的代码。
  - `parse` 解析器 (将字符串模板转为抽象语法树 AST)
  - `optimizer` 优化器 (检测用于 `vdom` 呈现优化的静态树)
  - `code generator` 代码生成器 (将抽象语法树生成渲染函数代码)

  代码生成器直接从抽象语法树生成字符串，这样做的代码规格较小，因为编译器在独立构建中，发送给浏览器的

  - `core` 包含通用，无关平台运行时的代码。
    - vue2.0 开始 core 就与平台无关。这意味着，你可以运行在浏览器、nodejs、或者嵌入式 js 里面。
    - `observer` 观察者。包含与响应式系统相关的代码。
    - `vdom` 虚拟 dom。包含虚拟 dom 创建元素的相关代码和补丁。
    - `instance` 实例。包含 Vue 实例构造函数和原型对象 (prototype) 方法。
    - `global-api` 顾名思义，就是全局的 api
    - `components` 通过抽象组件，目前 keep-alive 是唯一的一个。
  - `server` 包含 ssr (服务端渲染 server-side rendering) 相关代码
  - `platforms` 包含特定平台的代码。

  来自 `dist/build` 的入口文件位于各自平台的目录中。
  每个平台模块包含三个部分：编译器 compiler、运行时 runtime、服务器 server。对应上面的三个目录，每个部分都包含特定的平台的模块/实用程序，然后导出并注入到平台特定的目录文件中的 core 项中。例如，实现 v-bind:class 背后的逻辑的核心就是在 `platforms/web/runtime/modules/class.js` ——这个入口是在 `entries/web-runtime.js`，用于创建特定浏览器的 vdom 的修补功能。

  - `sfc` 包含单文件组件 (\*.vue) 解析逻辑。用到 package 中的 vue-template-compiler 依赖包。
  - 包含整个代码库中共享的实用程序。
