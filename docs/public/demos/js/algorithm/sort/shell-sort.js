/**
 * 希尔排序
 *
 * 1. 先将整个待排序的记录序列分割成为若干子序列
 * 2. 分别直接插入序列
 * 希尔排序（Shell Sort）是插入排序的一种改进版本，也称为 “缩小增量排序”。
 * 它通过将原始数据集合分割成若干个较小的子序列，
 * 对每个子序列进行插入排序，从而使数据逐步变得有序。
 */
function shellSort(arr) {
  let n = arr.length;
  let gap = Math.floor(n / 2); // 初始增量

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    gap = Math.floor(gap / 2); // 缩小增量
  }
  return arr;
}

// 测试
let array = [64, 34, 25, 12, 22, 11, 90];
console.log(shellSort(array));
