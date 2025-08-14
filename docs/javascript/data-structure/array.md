# 数组 Array

- 能用 `forEach()` 做到的，`map()` 同样可以。反过来也是如此。
- `map()` 会分配内存空间存储新数组并返回，forEach() 不会返回数据。
- `forEach()` 允许 `callback` 更改原始数组的元素。`map()` 返回新的数组。
- `forEach` 跳过空元素，但不跳过 `undefined`

## 不改数组

| 函数名    | 描述               | 版本 |
| --------- | ------------------ | ---- |
| `concat`  | 数组连接           |      |
| `entries` | 数组迭代器         |      |
| `every`   | 检测数组都符合条件 | es6  |
| `filter`  | 过滤数组           |      |
| `find`    | 查找数组           | es6  |
| `map`     | 过滤数组           |      |
| `forEach` | 过滤数组           |      |

- `Array.prototype.concat(arr1, arr2,...,arr)`

  - 入参必填，可以是数组对象
  - 返回新数组
  - 链接数组

  ```js
  const left = [1, 2, 3];
  const right = [4, 5, 6];

  console.log(left.concat(right)); // [1, 2, 3, 4, 5, 6]
  ```

- `Array.prototype.entries()` <Badge type="info">es6</Badge>

  ```js
  const fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
  const fruitEntries = fruits.entries();
  for (const item of fruitEntries) {
    console.log(item); /*[key,value]*/
  }
  console.log(fruitEntries); /*/Array Iterator {}*/
  console.log(fruits); /*不改变*/
  ```

- `Array.prototype.every(function(currentValue,index,arr){},thisArr)` <Badge type="info">es6</Badge>

  - 检测数组所有元素都符合指定条件，通过函数条件
  - 如果有一个不满足条件，则会返回 false，且剩余不再检测
  - 如果全部都满足条件则返回 true

  ```js
  const ages = [32, 33, 16, 40];
  function checkAdult(age) {
    console.log(age); /*如果没有return 则返回第一个，然后打断*/
    /*     return age >= 18;*/
  }
  ages.every(checkAdult);
  ```

- `Array.prototype.filter(function(){currentValue,index,arr},thisValue)`

  - 过滤数组
  - 检查指定数组中符合条件的所有元素
  - 不检测空数组
  - 不改变原数组

- `Array.prototype.find(function(){currenValue,index,arr},thisValue)` <Badge type="info">es6</Badge>

  - 查找的意思
  - 判断数组第一个元素的值
  - 每个元素都调用一次函数
  - 如果条件满足 true，则返回符合条件的元素，之后的不再执行
  - 如果都没有符合条件则返回 undefined

- `Array.prototype.map(function(currentValue,index,arr){},thisValue)`

  - 返回新数组，比如对每个数组都\*2
  - 返回新数组，数组元素为原始数组元素调用函数处理后的值
  - 原始数组次序依次处理元素
  - 不对空数组进行检测
  - 不改变原数组，返回新数组

  ```js
  /*demo1*/
  const arr = [99, 103, 46, 12, 12, 42, 45, 23, 5];
  const arrT = arr.map(function (value, index, arr) {
    console.log(value);
    /*/ return value *2*/
  });
  console.log(
    arrT
  ); 
  /*/[undefined, undefined, undefined, undefined, undefined, undefined, 
  undefined, undefined, undefined]*/

  /*demo2*/
  const ages = [32, 33, 16, 40];

  function checkAdult(age) {
    return age >= 18;
  }
  const mapTemp = ages.map(checkAdult);
  console.log(mapTemp); /*[true,true,false,true]*/
  const filterTemp = ages.filter(checkAdult);
  console.log(filterTemp); /*[32,33,40] 返回如何条件原数组的元素*/
  ```

- `Array.prototype.forEach(function(currentValue,index,arr){},thisValue)`

  - 常用方法，逐个做事情，打印，写入数据库
  - forEach() 方法对数组每个元素执行一次提供的函数
  - 对空数组不会执行回调函数
  - `es3` 开始
  - 返回值 undefined
  - 不能使用 return，只针对每个元素调用函数

  ```js
  const arr = [561531, 1231, 112, 12, 2];
  arr.forEach(function (currentValue, index, arr2r) {
    console.log(this); // String {"ttt"}
  }, 'ttt');
  ```

## 改变数组

一般改变索引值的，都会改变原始数组

- `Array.prototype.copyWithin()`copyWithin

  - 从数组指定元素拷贝元素到数组的另外一个指定位置

  ```js
  const fruits = ['西瓜', '橘子', '苹果'];
  const temp = fruits.copyWithin(2, 1); // 将 “橘子” 拷贝到索引为 2 的位置，即替换掉 “苹果”
  console.log(fruits); // ["西瓜", "橘子", "橘子"]
  console.log(temp); // ["西瓜", "橘子", "橘子"]
  ```

- `Array.prototype.fill('火龙果',start,end)`

  - 填充数组

  ::: script-preview
  const fruits = ['西瓜', '橘子', '苹果'];
  const temp = fruits.fill('火龙果'); // 不入参的话其他不变
  console.log(fruits); // 火龙果,火龙果,火龙果
  console.log(temp); // 火龙果,火龙果,火龙果
  :::
