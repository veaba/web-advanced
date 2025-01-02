/**
 * 分治算法（Divide and Conquer Algorithm）是一种常用的算法策略，
 * 它将一个复杂的问题分解成多个规模较小、相互独立且形式相同的子问题，
 * 然后分别解决这些子问题，最后将子问题的解合并起来得到原问题的解。
 * 
 * 快速排序也是基于分治思想，通过选择一个基准元素，将数组分为两部分，使得左边部分的元素都小于等于基准元素，右边部分的元素都大于等于基准元素，然后分别对左右两部分进行排序。
 */

function quickSort(arr) {
  if (arr.length <= 1) {
      return arr;
  }

  // 选择基准元素
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];

  for (let num of arr) {
      if (num < pivot) {
          left.push(num);
      } else if (num > pivot) {
          right.push(num);
      } else {
          equal.push(num);
      }
  }

  return [...quickSort(left),...equal,...quickSort(right)];
}

// 测试
const array2 = [38, 27, 43, 3, 9, 82, 10];
console.log(quickSort(array2));