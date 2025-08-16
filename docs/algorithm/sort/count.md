## 计数排序

```js
/**
 * 计数排序
 * 1. 该方法使用了一个额外的数组C，这意味着增加了内存空间，
 * 2. 第 i 个元素是待排序数组A中值，等于 i 的元素的个数
 * 3. 然后根据C数组 来将 A中的元素排到正确的位置
 * 4. 只能对整数进行排序
 */
function countingSort(data) {
  console.time('counting=>');
  var len = data.length;
  var B = [];
  var C = [];
  var min = (max = data[0]);

  for (let i = 0; i < len; i++) {
    min = min <= data[i] ? min : data[i];
    max = max >= data[i] ? max : data[i];

    C[data[i]] = C[data[i]] ? C[data[i]] + 1 : 1;
  }

  for (let j = min; j < max; j++) {
    C[j + 1] = (C[j + 1] || 0) + (C[j] || 0);
  }

  for (let k = len - 1; k >= 0; k--) {
    debugger;
    B[C[data[k]] - 1] = data[k];
    C[data[k]]--;
  }
  console.timeEnd('counting=>');
  return B;
}

var arr = [9, 8, 6, 4, 5, 3, 2];

console.log('===>', countingSort(arr));
```
