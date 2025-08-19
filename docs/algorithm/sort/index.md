# JavaScript 排序算法

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

## 冒泡排序
<!--@include: ./bubbling.md{2,}  -->

## 选择排序
<!--@include: ./select.md{2,}  -->

## 插入排序
<!--@include: ./insertion.md{2,}  -->

## 希尔排序
<!--@include: ./hill.md{2,}  -->

## 归并排序
<!--@include: ./merge.md{2,}  -->

## 快速排序
<!--@include: ./quick.md{2,}  -->

## 堆排序
<!--@include: ./head.md{2,}  -->

## 计数排序
<!--@include: ./count.md{2,}  -->

## 桶排序
<!--@include: ./bucket.md{2,}  -->

## 基数排序
<!--@include: ./radix.md{2,}  -->

## 总结

**基数排序 vs 计数排序 vs 桶排序**：

这三种排序算法都利用了桶的概念，但对桶的使用方法上有明显差异：

基数排序：根据键值的每位数字来分配桶计数排序：每个桶只存储单一键值桶排序：每个桶存储一定范围的数值

## 参考

- [js 十大排序算法：冒泡排序] <https://www.cnblogs.com/ybygb-geng/p/9355425.html>
