/**
 * 贪心算法是一种在每一步选择中都采取当前状态下的最优决策，从而希望最终得到全局最优解的算法策略。
 * 虽然贪心算法并不总是能得到全局最优解，但在许多问题上它可以提供高效且近似最优的解决方案。
 * 
 * 有一群孩子和一堆饼干，每个孩子有一个饥饿度，每个饼干都有一个大小。每个孩子只能吃一个饼干，
 * 且只有当饼干的大小大于等于孩子的饥饿度时，孩子才能吃饱。求最多能有多少个孩子吃饱。
 */

function findContentChildren(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let childIndex = 0;
  let cookieIndex = 0;
  while (childIndex < g.length && cookieIndex < s.length) {
    if (s[cookieIndex] >= g[childIndex]) {
      childIndex++;
    }
    cookieIndex++;
  }
  return childIndex;
}

// 测试
const g = [1, 2, 3];
const s = [1, 1];
console.log(findContentChildren(g, s)); // 输出 1
