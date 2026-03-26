/**
 * 分治算法（Divide and Conquer Algorithm）是一种常用的算法策略，
 * 它将一个复杂的问题分解成多个规模较小、相互独立且形式相同的子问题，
 * 然后分别解决这些子问题，最后将子问题的解合并起来得到原问题的解。
 *
 * 归并排序是一种典型的分治算法，它将一个数组分成两个子数组，分别对这两个子数组进行排序，然后将排好序的子数组合并成一个有序的数组。
 */

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  // 分割数组
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // 递归排序子数组
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // 合并两个有序子数组
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// 测试
const array = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort(array));
