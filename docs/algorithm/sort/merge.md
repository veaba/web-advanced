# 归并排序

```js
/**
 * 归并排序，一种稳定的排序方法
 * 1. 已有序的子序列合并
 * 2. 得到完全有序的序列
 * 3. 先让每个子序列有序
 * 4. 在让子序列段间有序
 *
 */

function mergeSort(data) {
  let len = data.length;
  if (len < 2) {
    return data;
  }
  var middle = Math.floor(len / 2);
  var left = data.slice(0, middle);
  var right = data.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  var result = [];
  console.time('mergeSort=>');
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  console.timeEnd('mergeSort=>');
  return result;
}
var arr = [9, 8, 6, 4, 5, 3, 2];

console.log('===>', mergeSort(arr));
```
