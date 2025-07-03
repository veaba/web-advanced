---
sidebar: auto
navbar: auto
---

# 14. 最长公共前缀

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 “”。

示例 1：

```shell

输入：strs = ["flower","flow","flight"]
输出："fl"
```

示例 2：

```shell
输入：strs = ["dog","panda","car"]
输出：""
```

解释：输入不存在公共前缀。

提示：

- 1 <= strs.length <= 200
- 0 <= strs[i].length <= 200
- strs[i] 如果非空，则仅由小写英文字母组成

## 解题思考

1. 必须全部满足
2. 首先处理边界问题，如果数组为空，则返回空字符串
3. 在实际例子中，如果先查找最短的字符串作为基准，通常来说是一个安全的做法

### 暴力解法

```js
/**
 * 查找字符串数组中的最长公共前缀
 * @param {string[]} strs - 字符串数组
 * @return {string} 最长公共前缀
 */
function longestCommonPrefix(strs) {
  if (!strs || strs.length === 0) return '';

  // 以第一个字符串作为基准
  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    // 逐个比较当前字符串与prefix的公共部分
    while (strs[i].indexOf(prefix) !== 0) {
      // 如果不匹配，则缩短prefix
      prefix = prefix.substring(0, prefix.length - 1);
      // 如果prefix为空，则直接返回
      if (prefix === '') return '';
    }
  }

  return prefix;
}
```

### 最小字符串作为基准

```js
function longestCommonPrefixOptimized(strs) {
  if (!strs || strs.length === 0) return '';

  // 找到数组中最短的字符串
  let shortest = strs.reduce((min, str) => (str.length < min.length ? str : min), strs[0]);

  // 从最短字符串开始比较
  for (let i = 0; i < shortest.length; i++) {
    const char = shortest[i];
    for (const str of strs) {
      if (str[i] !== char) {
        return shortest.substring(0, i);
      }
    }
  }

  return shortest;
}
```
