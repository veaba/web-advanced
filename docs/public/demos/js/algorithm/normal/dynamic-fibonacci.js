/**
 * 动态规划（Dynamic Programming，DP）是一种通过把原问题分解为相对简单的子问题，
 * 并保存子问题的解来避免重复计算，从而解决复杂问题的算法策略。
 * 
 * 0 - 1 背包问题：有 n 个物品，每个物品有重量 weights 和价值 values，背包的容量为 capacity。每个物品只能使用一次，求能装入背包的最大价值。
 */


function fibonacci(n) {
  if (n <= 1) {
      return n;
  }
  let dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// 测试
console.log(fibonacci(10));