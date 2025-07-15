---
sidebar: auto
navbar: auto
---

# 67. 二进制求和

给你两个二进制字符串 a 和 b ，以二进制字符串的形式返回它们的和。

示例 1：

```shell
输入:a = "11", b = "1"
输出："100"
```

```shell
示例 2：

输入：a = "1010", b = "1011"
输出："10101"
``
```

## 解题思路

- 先补齐缺失的位数
- 从后往前索引使用 parseInt 相加，并记录当前进制

```js
var addBinary = function (a, b) {
  const len = Math.max(a.length, b.length); // 获取最大长度是谁

  // 拉齐长度
  if (a.length < b.length) {
    a = '0'.repeat(b.length - a.length) + a;
  } else if (a.length > b.length) {
    b = '0'.repeat(a.length - b.length) + b;
  }

  // 存一下进制
  let radix = 0;

  let ab = '';

  for (let index = len; index > 0; index--) {
    const i = index - 1;
    const aVal = a[i];
    const bVal = b[i];

    const currentVal = parseInt(aVal) + parseInt(bVal);

    // 思考下面的过程，逐个区分所有场景
    if (currentVal === 2 && radix === 1) {
      ab = '1' + ab;
      radix = 1;
    } else if (currentVal === 2 && radix === 0) {
      ab = '0' + ab;
      radix = 1;
    } else if (currentVal === 1 && radix === 1) {
      ab = '0' + ab;
      radix = 1;
    } else if (currentVal === 1 && radix === 0) {
      ab = '1' + ab;
      radix = 0;
    } else if (currentVal === 0 && radix === 1) {
      ab = '1' + ab;
      radix = 0;
    } else if (currentVal === 0 && radix === 0) {
      ab = '0' + ab;
      radix = 0;
    }
    if (i === 0 && radix === 1) {
      ab = '1' + ab;
    }
  }
  return ab;
};
```

代码精简：

- 默认进制为 0
- 先加上进制，如果大于 1 则 进制 留存 1 否则 0
- 计算最后一个索引的进制，如果 i === 0 且 进制为 1 则 加入 1
- `sum % 2`，确认当前的值是什么，获得整除余数
  - `0 % 2 = 0`
  - `1 % 2 = 1`
  - `2 % 2 = 0`
  - `3 % 2 = 1`

```js
var addBinary = function (a, b) {
  const len = Math.max(a.length, b.length); // 获取最大长度是谁

  // 拉齐长度
  if (a.length < b.length) {
    a = '0'.repeat(b.length - a.length) + a;
  } else if (a.length > b.length) {
    b = '0'.repeat(a.length - b.length) + b;
  }

  // 存一下进制
  let radix = 0;

  let ab = '';

  for (let index = len; index > 0; index--) {
    const i = index - 1;
    const sum = parseInt(a[i]) + parseInt(b[i]) + radix;

    ab = (sum % 2) + ab;
    radix = sum > 1 ? 1 : 0;

    if (i === 0 && radix === 1) {
      ab = '1' + ab;
    }
  }
  return ab;
};
```

优化的代码：

```js
var addBinary = function (a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let result = [];

  while (i >= 0 || j >= 0 || carry > 0) {
    const digitA = i >= 0 ? parseInt(a[i--]) : 0;
    const digitB = j >= 0 ? parseInt(b[j--]) : 0;
    const sum = digitA + digitB + carry;

    result.unshift(sum % 2);
    carry = sum >> 1; // 等同于 Math.floor(sum / 2)
  }

  return result.join('');
};
```
