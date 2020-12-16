// 柯里化 Currying

function add() {
  const args = Array.prototype.slice.call(arguments);

  console.log("args=>", args);

  // 闭包特性，收集所有参数值
  const adder = function() {
    args.push(...args);
    return adder;
  };
  console.log("args2=>", args);

  // toString 隐式转换

  console.log("adder==>", adder);
  adder.toString = function() {
    return args.reduce((left, right) => {
      return left + right;
    });
  };
  return adder;
}

const a = add(1, 5454)(1);

const b = add(2, 5454)(1)(8588);
console.log(a, b);
