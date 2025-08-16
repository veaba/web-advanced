# 选择排序

```js
/**
 * 选择排序
 *
 * 1. 在未排序的序列中找到最小（大）的元素，
 * 2. 存放到排序序列的起始位置
 * 3. 再从剩余的未排序元素中继续寻找最小（大）
 * 4. 排到已排序序列的末尾
 *
 * selectionSort: 15.938ms
 *
 */

function selectionSort(data) {
  console.time('selectionSort');
  const len = data.length;
  let minIndex = null;
  let temp = null;
  for (let i = 0; i < len; i++) {
    minIndex = i;
    // 这个技巧让 当前向后，减少搜索范围
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        // 寻找最小值
        minIndex = j; // 将最小的索引保存
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  console.timeEnd('selectionSort');
  return arr;
}

var arr = [12, 12, 15, 445, 451, 12, 123456, 61, 20, 136, 4856, 1, 0];

console.log('===>', selectionSort(arr));
```
