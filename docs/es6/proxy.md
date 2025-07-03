---
sidebar: auto
---

# Proxy

- 只能是针对 Proxy 实例，如直接访问原对象不会有变化

> 用于修改某些操作的默认行为，等同于在语言层作出修改，属于 “元编程”，meta programming by 阮一峰 <Badge type="info">[es6-proxy](##索引__关于本作知识引用来源sub标签)</Badge>

理解：每当去 12306 去买票，都找一下黄牛哥，至于他干了啥，我们心里是没点数的。形成一个 “代理” 的机制。

在 `JavaScript` 语言世界中，如果我们想去访问一个对象 A (Object 类型、可能是一个 Function)，对象 A 前面搭建了一座桥，这座桥可以过滤访客和改写返回的结果

```js
const obj = new Proxy(
  {},
  {
    get: function (target, propKey, receiver) {
      console.log(`getting ${propKey}!`);
      return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
      console.log(`setting ${propKey}!`);
      return Reflect.set(target, propKey, value, receiver);
    },
  }
);

// obj.name="hello world"
// obj.name
```

## es6 Proxy 定义声明

- this 执行 proxy

```js
var proxy = new Proxy(target, handler);
```

target 参数表示要拦截的目标对象，handler 参数也是一个对象，用来定制拦截行为

#### 把 proxy 实例作为其他对象的原型

- 对象上的原型所有属性都会被改写，比如 construstor、**proto**、
- 一般都会不去改写 propKey：prototype、**proto**、constructor、apply、bind、call

```js
const proxy = new Proxy(
  {},
  {
    get: function (target, propKey) {
      return 'yeeh,I proxy this!';
    },
  }
);

const obj = Object.create(proxy);
```

#### 同一个拦截函数，可以拦截多个操作

```js
var handler = {
  // 代理
  get: function (target, prop) {
    if (prop === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + prop;
  },
  // 普通函数
  apply: function (target, thisBinding, args) {
    return args[0];
  },
  // 构造器
  construct: function (target, args) {
    return { value: args[1] };
  },
};

var fproxy = new Proxy(function (x, y) {
  return x + y;
}, handler);

fproxy(1, 2); //1
new fproxy(1, 2); // {value:1}
fproxy.prototype === Object.prototype; // true
fproxy.foo; //
```

## 拦截属性

- **get(target,propKey,receiver)**：拦截对象属性的读取，比如 proxy.foo
- **set(target,propKey,value,receiver)**：拦截对象属性的设置，比如 proxy.foo=‘hello’，返回一个布尔值
- **has(target,propKey)**：拦截 propKey in proxy 的操作，返回一个布尔值

```js
var obj = new Proxy(
  {},
  {
    get: function (target, propKey, receiver) {
      console.log(`getting ${propKey}!`);
      return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
      console.log(`setting ${propKey}!`);
      return Reflect.set(target, propKey, value, receiver);
    },
    has: function (target, propKey) {
      return true;
    },
  }
);

'22' in obj; //true
```

- **deleteProperty(target,propKey)**：拦截 delete proxy[propKey] 的操作，返回一个布尔值
- **ownKeys(target)**，拦截以下：
  - `Object.getOwnPropertyNames(proxy)`
  - `Object.getOwnPropertySymbols(proxy)`
  - `Object.keys(proxy)` 仅包括对象自身可遍历属性
  - `for ... in`
  - 返回一个数组，
- **getOwnPropertyDescriptor(target,propKey)**拦截 ` Object.getOwnPropertyDescriptor(proxy,proxyKey)`，返回属性的描述对象
- **defineProperty(target,propKey,propDesc)**，拦截 `Object.defineProperty(proxy,propKey,propDesc)`、`Object.definePropertries(proxy,propDescs)` 返回布尔值
- **preventExtensions(target)**，拦截 `Object.preventExtensions(proxy)`，返回布尔值
- **getPrototypeOf(target)**，拦截 `Object.getPrototypeOf(proxy)` 返回一个对象
- **isExtensible(target)**，拦截 `Object.isExtensible(proxy)`，返回一个布尔值
- **setPrototypeOf(target,proto)**，拦截 `Object.setPrototypeOf(proxy,proto)`，返回一个布尔值，如目标对象是个函数，那么还有两种额外操作可以拦截
- **apply(target,objet,args)** 拦截 Proxy 实例作为函数调用的操作，比如 `proxy(...args)`、`proxy.call(object,...args)`、`proxy.apply(...)`
- **constuct(target,args)** 拦截 Proxy 实例作为构造函数调用的操作，比如 `new proxy(...args)`

## web 服务的拦截 Proxy

适合写 web 服务客户端，也可以实现数据库的 ORM 层

```js
function createWebServer(baseUrl) {
  return new Proxy(
    {},
    {
      get(target, propKey, receive) {
        return () => httpGet(baseUrl + '/' + propKey);
      },
    }
  );
}

const service = createWebServer('http://baidu.com');

service.employees().then((res) => {
  console.log(res);
});
```
