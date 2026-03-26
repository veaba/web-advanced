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
