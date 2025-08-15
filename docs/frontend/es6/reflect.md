
## Reflect

> 现阶段一些方法同时部署到 Object、Reflect 对象上，未来某些方法只能从 Reflect 上获取，比如 Object.defineProperty

- 合理化取值。比如 Object.defineProperty(obj,name,desc) 在无法定义属性时，报错，但 Reflect.defineProperty(obj,name,desc) 会返回 false

```js
// 旧的方法
try {
  Object.defineProperty(target, property, attributes);
  // 成功的取值
} catch (e) {
  // 失败
}

if (Reflect.defineProperty(target, property, attributes)) {
  // 成功
} else {
  // 失败
}
```

- `Object` 操作都变成了函数行为，而不是一个操作符

```js
// 旧的写法
'assign' in Object; //true
// 新写法
Reflect.has(Object, 'assign'); //true

// 旧的delete 操作符
var obj = {
  name: 'Old',
};
delete obj.name;

// 新的函数式操作方法
Reflect.deleteProperty(obj, 'name');
```

- Reflect 对象的方法和 Proxy 对象的方法一一对象，只要在 Proxy 有，Reflect 就会有。
- 不管 Proxy 怎么修改默认行为，总可以在 Reflect 上获取默认行为

```js
var obj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete ', name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has', name);
    return Reflect.has(target, name);
  },
});
```

- proxy 的拦截操作，内部的偶调用对应的 Reflect 方法，保证原生行为能够正常执行
- 易阅读

```js
// old
Function.prototype.apply.call(Math.floor, undefined, [1.6]); //1

// new
Reflect.apply(Math.floor, undefined, [1.6]); //1
```

### Reflect 静态方法：一共 13 个

- **Reflect.apply(target,thisArg,args)**
- **Reflect.construct(target,args)**
- **Reflect.get(target,name,receiver)**
- **Reflect.set(target,name,value,receiver)**
- **Reflect.defineProperty(target,name,dec)**
- **Reflect.deleteProperty(target,name)**
- **Reflect.has(target,name)**
- **Reflect.ownKeys(target)**
- **Reflect.isExtensible(target)**
- **Reflect.preventExtensions(target)**
- **Reflect.getOwnPropertyDescriptor(target,name)**
- **Reflect.getPrototypeOf(target)**
- **Reflect.setPrototypeOf(target,prototype)**

### 使用 Proxy 实现观察者模式

观察者模式 (Observer mode)

```js
const queueObservers = new Set();
const observer = (fn) => queueObservers.add(fn);

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queueObservers.forEach((ob) => ob());
  return result;
}
```

先定义一个 Set 集合，所有观察者函数都放进这个集合，observable 函数返回对象的代理，拦截赋值操作，拦截函数 set 中，启动执行所有观察者
