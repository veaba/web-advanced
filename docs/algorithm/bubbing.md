---
sidebar: auto
---

# JS 冒泡算法

- 稳定性：a=b，a 前，b 后，a 依然在 b 前面
- 不稳定性：a=b，a 前，b 后，a 可在前也可在后

| 排序算法 | 平均时间复杂度   | 最好的情况            | 最坏的情况            | 空间复杂度 | 排序方式  | 稳定性 |
| -------- | ---------------- | --------------------- | --------------------- | ---------- | --------- | ------ |
| 冒泡排序 | O(n<sup>2</sup>) | O(n)                  | O(n<sup>2</sup>)      | O(1)       | In-place  | 稳定   |
| 选择排序 | O(n<sup>2</sup>) | O(n<sup>2</sup>)      | O(n<sup>2</sup>)      | O(1)       | In-place  | 不稳定 |
| 插入排序 | O(n<sup>2</sup>) | O(n)                  | O(n<sup>2</sup>)      | O(1)       | In-place  | 稳定   |
| 希尔排序 | O(n log n)       | O(n log<sup>2</sup>n) | O(n log<sup>2</sup>n) | O(1)       | In-place  | 不稳定 |
| 归并排序 | O(n log n)       | O(n log n)            | O(n log n)            | O(n)       | Oun-place | 稳定   |
| 快速排序 | O(n log n)       | O(n log n)            | O(n<sup>2</sup>)      | O(log n)   | In-place  | 不稳定 |
| 堆排序   | O(n log n)       | O(n log n)            | O(n log n)            | O(1)       | In-place  | 不稳定 |
| 计数排序 | O(n+k)           | O(n+k)                | O(n+k)                | O(k)       | Oun-place | 稳定   |
| 桶排序   | O(n+k)           | O(n+k)                | O(n<sup>2</sup>)      | O(n+k)     | Oun-place | 稳定   |
| 基数排序 | O(n x k)         | O(n x k)              | O(n x k)              | O(n+k)     | Oun-place | 稳定   |

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
    console.log("j=>", i, j);
    if (arr[i] > arr[j]) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
}

console.log("arr==>", arr);
```

## 选择排序

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
  console.time("selectionSort");
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
  console.timeEnd("selectionSort");
  return arr;
}

var arr = [12, 12, 15, 445, 451, 12, 123456, 61, 20, 136, 4856, 1, 0];

console.log("===>", selectionSort(arr));
```

## 插入排序

```js
/**
 * 插入排序
 *
 * 1. 从第一个元素开始，可以认为已被排序
 * 2. 取出下一个元素，在已排序的元素序列中从后往前扫描
 * 3. 如果该元素（已排序）大于新元素，则将该元素移到下一个位置
 * 4. 重复3，直到找到已排序的元素小于或者等于新元素的位置
 * 5. 新元素插入到下一个位置中
 * 6. 重复步骤2
 */

function insertSort(els) {
  // 从第二个元素开始，即i=1
  for (let i = 1; i < els.length; i++) {
    // 后一个小于前一个，当前的值小于前面的
    if (els[i] < els[i - 1]) {
      const currentItem = els[i];
      let j = i - 1;
      els[i] = els[j]; // 把前面的值给当前的
      // 比大小，找到被插入元素所在的位置
      while (j >= 0 && currentItem < els[j]) {
        els[j + 1] = els[j];
        j--;
      }
      els[j + 1] = currentItem;
    }
  }
  return els;
}

const arr = [12, 12, 15, 445, 451, 12, 123456, 61, 20, 136, 4856, 1, 0];

console.log(insertSort(arr));
```

## 希尔排序

## 归并排序

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
  console.time("mergeSort=>");
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
  console.timeEnd("mergeSort=>");
  return result;
}
var arr = [9, 8, 6, 4, 5, 3, 2];

console.log("===>", mergeSort(arr));
```

## 快速排序

```js
/**
 *  快速排序
 * 对冒泡算法的改进
 * 第一趟：
 *  - 一部分： 比另外部分都要小，递归调用
 *  - 另外一部分：递归调用
 * 在两边都实行快速排序
 *
 */

function fastSort(el) {
  if (el.length <= 1) return el;
  // 向下取整获得中间数
  const halfIndex = Math.floor(el.length / 2);
  const pivot = el.splice(halfIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < el.length; i++) {
    if (el[i] < pivot) {
      left.push(el[i]);
    } else {
      right.push(el[i]);
    }
  }
  console.log("===>", { halfIndex, pivot, left, right });
  return fastSort(left).concat([pivot], fastSort(right));
}

const arr = [12, 12, 15, 445, 451, 12, 123456, 61, 20, 136, 4856, 1, 0];

console.log(fastSort(arr));
```

## 堆排序

@todo 未实现

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
  console.time("counting=>");
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
  console.timeEnd("counting=>");
  return B;
}

var arr = [9, 8, 6, 4, 5, 3, 2];

console.log("===>", countingSort(arr));
```

## 桶排序

略
## 基数排序

略

## 二分查找：其他

```js
/**
 * 二分查找方法1：通过非递归的方式，
 * 1. 先找到中间值
 * 2. 通过中间值比较，大的在右，小的放左
 * 3. 再在两边分别寻找中间值，吃持续以上操作
 * (最多Lon2N)
 * 根据，
 */
function binarySearchTwo(data, dest) {
  let low = 0;
  let high = data.length - 1;

  while (low <= high) {
    const mid = Math.floor((high + low) / 2);
    if (data[mid] == dest) {
      return mid;
    }
    if (dest > data[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return undefined;
}

const arr = [1, 3, 5, 7, 9, 10];

console.log(binarySearchTwo(arr, 5)); // 返回在的索引值
```

## 总结

**基数排序 vs 计数排序 vs 桶排序**：

这三种排序算法都利用了桶的概念，但对桶的使用方法上有明显差异：

基数排序：根据键值的每位数字来分配桶 计数排序：每个桶只存储单一键值 桶排序：每个桶存储一定范围的数值

## 参考

- [js 十大排序算法：冒泡排序]https://www.cnblogs.com/ybygb-geng/p/9355425.html
