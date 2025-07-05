/**
 * 回溯算法 -组合问题
 * 回溯算法是一种通过尝试所有可能的路径来解决问题的算法策略。在遇到不可行的路径时，
 * 它会回退到上一个决策点，尝试其他路径，直到找到解决方案或遍历完所有可能的路径。
 */
function combine(n, k) {
  const result = [];
  const path = [];

  function backtrack(start) {
    if (path.length === k) {
      result.push([...path]);
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(1);
  return result;
}

// 测试
const n = 4;
const k = 2;
console.log(combine(n, k));
