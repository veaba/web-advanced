# 深浅拷贝

由于 `JavaScript` 存在值引用的数据类型，如 Object、Array，存在了赋值过程，被一同改变值的引用

```js
const a = { name: 'Li' };

const b = a;

b.name = 'Sa';

console.log(a, b); // 两者都是 Sa
```

## 差异化

||浅拷贝|深拷贝|
|---|---|---|
|基本类型|复制|复制|
|引用类型|只复制引用|复制|
|复制范围|复制对象本身|递归复制对象所有类型的字段|
|与原对象比较|共享数据|完全独立|
|修改应用|会被影响|不会影响|
|适用结构|简单|复杂|
|`Object.assign`|✅|❎|
|`拓展符...`|✅|❎|
|`slice()`|✅|❎|
|`concat()`|✅|❎|

### slice 浅拷贝用法

```js
let originalArray = [1, 2, 3, { value: 4 }];
let copiedArray = originalArray.slice();
 
console.log(copiedArray); // 输出: [1, 2, 3, { value: 4 }]
 
// 修改原始数组
originalArray[3].value = 5;
 
console.log(originalArray); // 输出: [1, 2, 3, { value: 5 }]
console.log(copiedArray); // 输出: [1, 2, 3, { value: 5 }]

// 修改原始数组中的 基本类型
originalArray[3].value = 11;

console.log(originalArray); // 输出: [11, 2, 3, { value: 5 }]
console.log(copiedArray); // 输出: [1, 2, 3, { value: 5 }]
```

## 浅拷贝

仅处理第一个层级

**通过 `Object.assign` 解决**：

```js
const a = { name: 'Li' };
const b = Object.assign({}, a);
// 此时将 a 的值赋给 b
b.name = 'Sa'; // 再改变 b 的值，a 不会被改变
console.log(a, b);
```

**通过对象展开符 `...`**：

```js
const a = { name: 'Li' };
const b = { ...a };
b.name = 'Sa';
console.log(a, b);
```

## 深拷贝

**通过 `JSON.parse(JSON.stringify(obj))`**：

```js
const a = {
  name: 'Li',
  location: {
    country: 'China',
  },
};

const b = JSON.parse(JSON.stringify(a));

b.location.country = 'Thailand';

console.log(a, b);
```

弊端：

- 忽略 `undefined`
- 忽略 `symbol`
- 无法序列化函数
- 不能解决循环应用的对象

```js
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
};
obj.c = obj.b;
obj.e = obj.a;
obj.b.c = obj.c;
obj.b.d = obj.b;
obj.b.e = obj.b.c;
const newObj = JSON.parse(JSON.stringify(obj));
console.log(newObj);
```

### lodash 深克隆

[lodash deepClone](https://lodash.com/docs##cloneDeep)

一种通过浏览器提供的深拷贝机制

```js
function structuralClone(obj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = (ev) => resolve(ev.data);
    port1.postMessage(obj);
  });
}

var obj = {
  a: 1,
  b: {
    c: obj,
  },
}(
  // 注意该方法是异步的
  // 可以处理 undefined 和循环引用对象
  async () => {
    const clone = await structuralClone(obj);
  }
)();
```

实例：

```js
/**
 * deep copy
 * target copy to source
 * 1. 假设都是对象
 */
function deepCopy(target) {
  let result;

  if (typeof target === 'object') {
    // 数组
    if (Array.isArray(target)) {
      // null
    } else if (target == null) {
      result = null;

      // function
    } else if (Object.prototype.toString.call(target) == '[object Function]') {
    } else if (Object.prototype.toString.call(target) === '[object Object]') {
      result = {};

      for (let key in target) {
        result[key] = deepCopy(target[key]);
      }
    }
    // Date
    // RegExp
    else {
      result = target;
    }
    // object
  } else {
    result = target;
  }

  return result;
}

const a = {
  a: 'a object',
  name: 'a',
};

const b = {
  b: 'b object',
  name: 'b',
};

const newOne = deepCopy(a);

console.log('newOne=>', newOne);
```
