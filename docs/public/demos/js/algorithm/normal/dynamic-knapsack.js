/**
 * 动态规划（Dynamic Programming，DP）是一种通过把原问题分解为相对简单的子问题，
 * 并保存子问题的解来避免重复计算，从而解决复杂问题的算法策略。
 *
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 */

function knapsack(capacity, weights, values) {
  let n = weights.length;
  let dp = new Array(n + 1).fill(0).map(() => new Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] > w) {
        dp[i][w] = dp[i - 1][w];
      } else {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  return dp[n][capacity];
}

// 测试
let capacity = 5;
let weights = [2, 3, 4, 5];
let values = [3, 4, 5, 6];
console.log(knapsack(capacity, weights, values));
