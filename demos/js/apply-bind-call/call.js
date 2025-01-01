Function.prototype.myCall = function (context, [...args]) {
  if (context === null || context === undefined) {
    context = this || window;
  } else {
    context = Object(context); // 如果不是对象类型？则转为对象，以此保证 this 是个 对象
  }
  const fn = Symbol('myCall');
  context[fn] = this;

  let ret = context[fn](...args);
  delete context[fn];
  return ret;
};

const fn = function (a, b) {
  console.info(a, b);
};

const fnBind = fn.myCall(null, [1, 2]);
