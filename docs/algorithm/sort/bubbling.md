# 冒泡算法

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
    if (arr[j] > arr[j+1]) {
      const temp = arr[j];
      arr[i] = arr[j+1];
      arr[j+1] = temp;
    }
  }
}

console.log('arr==>', arr);
```
