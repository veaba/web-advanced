/**
 * 伪代码，需要转码才可以执行~
*/
// 装饰器函数
function log(target, name, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    console.log(`调用方法 ${name}，参数为:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`方法 ${name} 执行完毕，结果为:`, result);
    return result;
  };
  return descriptor;
}

class MyClass {
  @log
  add(a, b) {
    return a + b;
  }
}

// 使用
const myClass = new MyClass();
myClass.add(2, 3);
