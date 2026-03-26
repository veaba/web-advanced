function myObjectCreate(proto, propertiesObject) {
  if (typeof proto!== 'object' && typeof proto!== 'function') {
      throw new TypeError('The first argument must be an object or null');
  }

  // 创建一个临时构造函数
  function F() {}

  // 将临时构造函数的原型指向 proto
  F.prototype = proto;

  // 使用临时构造函数创建新对象
  let obj = new F();

  // 如果提供了 propertiesObject，则为新对象定义属性
  if (propertiesObject!== undefined) {
      Object.defineProperties(obj, propertiesObject);
  }

  // 如果 proto 为 null，则手动设置 obj 的 __proto__ 为 null
  if (proto === null) {
      Object.setPrototypeOf(obj, null);
  }

  return obj;
}

// 测试
let parent = {
  name: 'parent',
  sayHello: function () {
      console.log('Hello from parent');
  }
};

let child = myObjectCreate(parent, {
  age: {
      value: 10,
      writable: true,
      enumerable: true,
      configurable: true
  }
});

console.log(child.name); // 输出 'parent'
child.sayHello(); // 输出 'Hello from parent'
console.log(child.age); // 输出 10