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

console.log(binarySearchTwo(arr, 5));
