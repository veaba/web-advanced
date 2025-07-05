/**
 * 贪心算法是一种在每一步选择中都采取当前状态下的最优决策，从而希望最终得到全局最优解的算法策略。
 * 虽然贪心算法并不总是能得到全局最优解，但在许多问题上它可以提供高效且近似最优的解决方案。
 * 假设有一组活动，每个活动都有开始时间和结束时间，你需要选择尽可能多的活动，使得这些活动之间没有时间冲突。
 */

function activitySelection(activities) {
  activities.sort((a, b) => a.end - b.end);
  let selected = [];
  let lastEnd = -1;
  for (let activity of activities) {
      if (activity.start >= lastEnd) {
          selected.push(activity);
          lastEnd = activity.end;
      }
  }
  return selected;
}

// 测试
const activities = [
  { start: 1, end: 3 },
  { start: 2, end: 4 },
  { start: 3, end: 5 },
  { start: 5, end: 7 },
  { start: 3, end: 8 }
];
const result = activitySelection(activities);
console.log(result);