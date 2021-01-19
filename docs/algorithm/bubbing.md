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

## 计数排序

## 桶排序

## 基数排序

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

## 参考

- [js 十大排序算法：冒泡排序]https://www.cnblogs.com/ybygb-geng/p/9355425.html
