# Apply 函数

## 说明

::: tip
apply 会立即执行。
:::

## 特性

- 最多入参 65536 个参数
- 假如数组的长度很长。切块后循环传入目标方法

## apply 将数组添加到另一个数组

- 数组 a，数组 b
- a 里面含有 b 的元素

```js
const list1 = [1, 2];
const list2 = [3, 4];
list1.push.apply(list1, list2);
console.info('list1:', list1);
console.info('list2:', list2);
```

## apply 和内置函数，允许 Math.max/Math.min 找出数组中最大值/最小值

```js
// 最大值
const list1 = [12, 1, 456, 6, 16];
const max = Math.max.apply(null, list1);
console.info(max);

// 最小值
const min = Math.min.apply(null, list1);
console.info(min);
```

### 将数组空元素转为 `undefined`

```js
const arr = [54654, , 55];
const result = Array.apply(null, arr);
console.info(result); //[ 54654, undefined, 55 ]
```

## 使用 apply 来链接构造器

### 转换类数组对象

```js
Array.prototype.slice.apply({ 0: 1, length: 1 }); // [1]
Array.prototype.slice.apply({ 0: 1, length: 99 }); // (99) [1, empty × 98]
```

### 绑定回调函数的对象

```js
// TODO
```
