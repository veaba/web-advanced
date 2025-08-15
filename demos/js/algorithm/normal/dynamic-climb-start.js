/**
 * 动态规划（Dynamic Programming，DP）是一种通过把原问题分解为相对简单的子问题，
 * 并保存子问题的解来避免重复计算，从而解决复杂问题的算法策略。
 */


function climbStairs(n) {
  if (n <= 2) {
      return n;
  }
  let dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// 测试
console.log(climbStairs(5));