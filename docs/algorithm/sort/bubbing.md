---
sidebar: auto
---

## 冒泡算法

```js
/**
 *  冒泡排序
 * 1. 比较相邻的两个元素，如果前者比后者大
 * 2. 第一轮结束，最后一个是最大值
 * 3. 开始第二轮，最后一个最大的了，可不参与比较，巧用 `arr.length-i-1`
 *
 *
 */

var arr = [12, 12, 15, 445, 451, 12, 123456, 61, 20, 136, 4856, 1, 0];
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - i - 1; j++) {
    console.log('j=>', i, j);
    if (arr[i] > arr[j]) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
}

console.log('arr==>', arr);
```



## 总结

**基数排序 vs 计数排序 vs 桶排序**：

这三种排序算法都利用了桶的概念，但对桶的使用方法上有明显差异：

基数排序：根据键值的每位数字来分配桶计数排序：每个桶只存储单一键值桶排序：每个桶存储一定范围的数值

## 参考

- [js 十大排序算法：冒泡排序] <https://www.cnblogs.com/ybygb-geng/p/9355425.html>
