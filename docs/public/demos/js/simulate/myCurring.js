/**
 * 柯里化
 */

/**
 * 参数复用
 * */ 
function multiply(a, b) {
  return a * b;
}

// 柯里化函数
const curriedMultiply = (a) => (b) => a * b;

// 固定第一个参数为 5
const multiplyBy5 = curriedMultiply(5);

// 多次使用 multiplyBy5
console.log(multiplyBy5(3)); // 输出 15
console.log(multiplyBy5(4)); // 输出 20


/**
 * 柯里化函数
 * 使用场景
 * - 参数复用
 * - 延迟执行
 * - 函数组合
 * - 事件处理
 * - 提高代码可测试性
 */