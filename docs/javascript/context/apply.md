# Apply 函数

## 说明

::: tip
apply 会立即执行。
:::

## 特性

- 最多入参 `65536` 个参数，即 `2^16`
- 假如数组的长度很长。切块后循环传入目标方法

## 数组添加到另一个数组

- 数组 `list1`，数组 `list2`
- `list1` 里面含有 `list2` 的元素，`list2` 不变

```js
const list1 = [1, 3];
const list2 = [2, 4];
list1.push.apply(list1, list2);
console.info('list1:', list1);
console.info('list2:', list2);
```

## 变更入参类型

```js
// 最大值
const waitSortedList = [12, 1, 456, 6, 16];
const max = Math.max.apply(null, waitSortedList);
console.info(max);

// 最小值
const min = Math.min.apply(null, waitSortedList);
console.info(min);
```

### 将数组空元素转为 `undefined`

```js
const arr = [54654, , 55];
const result = Array.apply(null, arr);
console.info(result); //[ 54654, undefined, 55 ]
```

等同于下面几种方式：

`Array.from()` 实现

```js
const arr = [54654, , 55];
const result = Array.from(arr);
```

`...` 拓展符实现：

```js
const arr = [54654, , 55];
const result = [...arr];
```

`concat()` 实现：

```js
const arr = [54654, , 55];
const result = [].concat(arr);
```

## 链接构造器

### 转换类数组对象

```js
Array.prototype.slice.apply({ 0: 1, length: 1 }); // [1]
Array.prototype.slice.apply({ 0: 1, length: 99 }); // (99) [1, empty × 98]
```

### 绑定回调函数的对象

```js
// TODO
```

## call 与 apply 区别

- call 入参是 `独立参数`，如 `fn("click","touch")`
- apply 入参是 `数组`，如 `fn(["click","touch"])`，否则无法被读取到

```js
function github(param1, param2) {
  console.info(param1, param2);
}
const repoObject = { repo: 'veaba/web-advanced' };
const authorObject = { author: 'veaba' };
fn.apply(null, [authorObject], repoObject); // {author: 'veaba'}, undefined

fn.apply(null, repoObject, [authorObject]); // undefined undefined
```
