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
