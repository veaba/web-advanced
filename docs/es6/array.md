## 数组

以下 为 es6 引入的新特性

| 特性   | 静态方法           | 实例方法              | 描述                               |
|------|----------------|-------------------|----------------------------------|
|      | `Array.from()` |                   |                                  |
|      | `Array.of()`   |                   | 替代 `Array()` 方法，强化一致性            |
|      |                | `copyWithin()`    | 会修改原始数组<br/> - 性能优化 <br/> - 音频处理 |
|      |                | `find()`          | 返回查找的第一项，存在 `undefined`          |
|      |                | `findIndex()`     | 找到返回索引值，否则 `-1`                  |
|      |                | `findLast()`      |                                  |
|      |                | `findLastIndex()` |                                  |
|      |                | `fill()`          |                                  |
|      |                | `entries()`       |                                  |
|      |                | `keys()`          |                                  |
|      |                | `values()`        |                                  |
|      |                | `includes()`      |                                  |
|      |                | `flat()`          |                                  |
|      |                | `flatMap()`       |                                  |
|      |                | `at()`            |                                  |
|      |                | `toReversed()`    |                                  |
|      |                | `toSorted()`      |                                  |
|      |                | `toSpliced()`     |                                  |
|      |                | `width()`         |                                  |
|      |                | `group()`         |                                  |
|      |                | `groupToMap()`    |                                  |
| 数组空位 |                |                   |                                  |
|      |                |                   |                                  |

### Array.from()

### Array.of()

### find()

和下面方法是一组类似的函数：

- `findIndex()`
- `findLast()`
- `findLastIndex()`

同样的，`filter()` 及其相近，只是 `filter()` 返回数组，存在多个，`find()` 返回第一个匹配的元素。

和 `filter()` 区别：

|       | filter()  | find()              |
|-------|-----------|---------------------|
| 时间复杂度 | O(n)      | 最佳 `O(1)`、最差 `O(n)` |
| 链式调用  | 更具有多段处理能力 | 单个                  |
| 返回值   | 始终数组      | `undefined` 的额外判断   |
| 性能考虑  | 性能差       | 性能优先                |

### findIndex()

返回匹配得第一项的索引值，否则 `-1`。

|       | indexOf() | find() |
|-------|-----------|--------|
| 查找简单  | 最佳✅       | ⚠️一般   |
| 查找属性  | ❎         | ✅      |
| 复杂度条件 | ❎         | ✅      |
| 返回值   | 一样        | 一样     |

### findLast()

从后往前，其他跟 `find()`一样

### findLastIndex()

从后往前，其他跟 `findIndex()`一样

### fill()

用于填充数组。填充的元素可以是任意类型，

参数：

- `value`
- `start`
- `end`

```js
[1, , 2, 3, 4, 5, 6, 7, 8, 9, 10].fill(7)
// [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]

new Array(3).fill(6)
// [6, 6, 6]

Array.of(1, 2, 3).fill(8)
// [8, 8, 8]
```

### keys()

- 返回迭代器，`for ... of` 语句可以遍历

```js

const a = ['a', 'b'].keys()

console.log(a)
// Array Iterator {}...

Array.from(a)
// [0,1]

```

### values()

- 返回迭代器，`for ... of` 语句可以遍历

```js

const b = ['a', 'b'].values()

console.log(b)
// Array Iterator {}...

console.log(b.next())
// {value:"b",done:false}

Array.from(b)
// ["a","b"]

console.log(b.next())
// {value:undefined,done:true}

```

### entries()

```js
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

// 也可以适用 next() 方法获取
console.log(entries.next().value); // [0, 'a']
```

### includes

与字符串引入的 `includes` 一样，返回布尔值，表示是否包含给定的值。

- 更加严格，比如 `NaN` 误判

参数：

- `value`
- `start`

es5 之前达到判断效果的方法：

```js
const arr = [1, 2, 3];
const el = 2;
if (arr.indexOf(el) !== -1) {
  // ...
}

// or

if (~arr.indexOf(el)) {
  // ...
}

```

兼容性方案：

```js
const constains = (() => {
  return Array.prototype.includes
    ? (arr, value) => err.includes(value)
    : (arr, value) => arr.some(el => el === value)
})

constains(['a', 'b'], ' a')
```

### flat()

拍平数组，默认拍平一层，无限层，则入参是 `Infinity`。

- 默认自动跳过空位
- 不改变原数组

### flatMap()

执行一次 `map()` 函数，然后对返回值再 `flat()`，返回新数组。

处理嵌套数据结构：

```js

const books = [
  {title: "Book 1", tags: ["fantasy", "adventure"]},
  {title: "Book 2", tags: ["sci-fi"]}
];

// 获取所有标签的扁平数组
const allTags = books.flatMap(book => book.tags);
// ["fantasy", "adventure", "sci-fi"]
```

字符串处理：

```js
const sentences = ["Hello world", "Goodbye universe"];
const words = sentences.flatMap(sentence => sentence.split(' '));
// ["Hello", "world", "Goodbye", "universe"]
```

### at()

允许使用负数索引，超出返回，返回 `undefined`。

```js
const arr = [1, 2, 3]

arr.at(2) // 3

arr.at(-1) // 3

```

### toReversed()

不改变原始数组，返回一个新数组。

| 对比 | es6            | es5         |
|----|----------------|-------------|
|    | `toReversed()` | `reverse()` |

### toSorted()

不改变原始数组，返回一个新数组。

| 对比 | es6          | es5      |
|----|--------------|----------|
|    | `toSorted()` | `sort()` |

### toSpliced()

执行位置，删除指定数量成员，并插入心智，不改变原始数组，返回一个新数组。

| 对比 | es6           | es5        |
|----|---------------|------------|
|    | `toSpliced()` | `splice()` |

### with()

用来将指定位置成员替换为新值，不改变原始数组，返回一个新数组。

| 对比 | es6      | es5                     |
|----|----------|-------------------------|
|    | `with()` | `splice(index,1,value)` |

### group() <Badge type="danger">暂不兼容</Badge>

数组成员分组，返回一个新对象，字符串分组，使用 `group()`。

```js
const array = [1, 2, 3, 4, 5];

array.group((num, index, array) => {
  return num % 2 === 0 ? 'even' : 'odd';
});
// { odd: [1, 3, 5], even: [2, 4] }

```

### groupToMap() <Badge type="danger">暂不兼容</Badge>

数组成员分组，返回一个新 Map 对象，key 可以是各种值，对象分组使用 `groupToMap()`。

```js
const array = [1, 2, 3, 4, 5];

const odd = {odd: true};
const even = {even: true};
array.groupToMap((num, index, array) => {
  return num % 2 === 0 ? even : odd;
});
```

### 空位处理

es5 中：
| | 跳过空位 |
|--------------|----------------------------------|-
| `forEach()`  | ✅ |
| `filter()`   | ✅ |
| `reduce()`   | ✅ |       
| `every()`    | ✅ |       
| `some()`     | ✅ |        
| `map()`      | ✅ 跳过保留 <br /> -✅保留这个值 |
| `join()`     | 视为 `undefined`, 和 `null` 处理为空字符串 |
| `toString()` | 视为 `undefined`, 和 `null` 处理为空字符串 |

es6 中，空位视为 `undefined`。

处理空位的方法或语句：

- `Array.from()`
- `...拓展符`
- `copyWithin()`
- `fill()`
- `for ... of`

将空位视为 `undefined`:

- `entries()`
- `keys()`
- `values()`
- `find()`
- `findIndex()`

### sort 稳定性

```js
const arr = [
  { id: 1, val: 2 },
  { id: 2, val: 2 },
  { id: 3, val: 1 }
];
```

- 稳定排序：关键字相同项目后，排序前后的顺序不变，默认
```js
// 结果可能为：
// [
//   {id: 3, val: 1},
//   {id: 2, val: 2}, // id: 2 跑到 id: 1 前面
//   {id: 1, val: 2}
// ]
```
- 不稳定排序：关键字排序后，再排序
  - 多重排序有问题
```js
// 新版引擎输出（稳定）：
arr.sort((a, b) => a.val - b.val);
// 结果保证：
// [
//   {id: 3, val: 1},
//   {id: 1, val: 2}, // id: 1 和 id: 2 顺序不变
//   {id: 2, val: 2}
// ]
```