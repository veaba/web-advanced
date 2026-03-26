/**
 * 分治算法（Divide and Conquer Algorithm）是一种常用的算法策略，
 * 它将一个复杂的问题分解成多个规模较小、相互独立且形式相同的子问题，
 * 然后分别解决这些子问题，最后将子问题的解合并起来得到原问题的解。
 * 
 * 给定一个整数数组 nums，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 */

function maxSubArray(nums) {
  if (nums.length === 1) {
    return nums[0];
  }

  let maxEndingHere = nums[0];
  let maxSoFar = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

// 测试
const nums = [-2, 1, -3, 4, -1, 2, 3, -5, 4];
console.log(maxSubArray(nums)); // 输出 6
