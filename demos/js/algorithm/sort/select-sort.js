/**
 * 选择排序
 *
 * 1. 在未排序的序列中找到最小（大）的元素，
 * 2. 存放到排序序列的起始位置
 * 3. 再从剩余的未排序元素中继续寻找最小（大）
 * 4. 排到已排序序列的末尾
 *
 */

function selectionSort(data) {
  console.time("selectionSort");
  const len = data.length;
  let minIndex = null;
  let temp = null;
  for (let i = 0; i < len; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      // 前者比后者
      if (arr[j] < arr[minIndex]) {
        // 寻找最小值
        minIndex = j; // 将最小的索引保存
      }
    }
    // 前后两个交换位置
    console.log(
      "交换位置的索引是:(",
      i,
      minIndex + ")======>",
      `所对应的值做交换：（${arr[i]},${arr[minIndex]}）`
    );
    temp = arr[i];
    arr[i] = arr[minIndex];
    // console.log("arr[minIndex]===>", minIndex, arr[minIndex]);
    arr[minIndex] = temp;
    console.info("此时arr==>", arr);
  }
  console.timeEnd("selectionSort");
  return arr;
}

var arr = [9, 8, 6, 4, 5, 3, 2];

console.log("===>", selectionSort(arr));
