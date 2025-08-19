# 插入排序

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
