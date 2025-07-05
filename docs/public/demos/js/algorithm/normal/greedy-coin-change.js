/**
 * 贪心算法是一种在每一步选择中都采取当前状态下的最优决策，从而希望最终得到全局最优解的算法策略。
 * 虽然贪心算法并不总是能得到全局最优解，但在许多问题上它可以提供高效且近似最优的解决方案。
 * 假设你有无限数量的硬币，硬币面额为 [1, 5, 10, 25]（美分），要找给顾客 amount 美分，求最少需要多少枚硬币。
 */

function coinChange(amount) {
  const coins = [25, 10, 5, 1];
  let count = 0;
  for (let coin of coins) {
    count += Math.floor(amount / coin);
    amount %= coin;
  }
  return count;
}

// 测试
const amount = 63;
console.log(coinChange(amount)); // 输出 6
