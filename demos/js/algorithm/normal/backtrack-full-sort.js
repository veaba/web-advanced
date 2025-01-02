/**
 * 回溯算法 - 全排列
 * 回溯算法是一种通过尝试所有可能的路径来解决问题的算法策略。在遇到不可行的路径时，
 * 它会回退到上一个决策点，尝试其他路径，直到找到解决方案或遍历完所有可能的路径。
 * 给定一个不包含重复数字的数组，返回所有可能的全排列。
 */
function permute(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);
  const path = [];

  function backtrack() {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      path.push(nums[i]);
      used[i] = true;
      backtrack();
      path.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

// 测试
const nums = [1, 2, 3];
console.log(permute(nums));
