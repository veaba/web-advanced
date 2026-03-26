Function.prototype.myApply = function (context, ...args) {
  context = Object(context); // 如果不是对象类型？则转为对象，以此保证 this 是个 对象

  // context 创建一个 symbol 的key，并赋值  this
  const fn = Symbol('myApply');
  context[fn] = this;
  // 然后 调用 context[fn]()
  let ret = undefined;

  if (args) {
    ret = context[fn](...args);
  } else {
    ret = context[fn]();
  }

  // 删除这个函数
  delete context[fn];
  // 返回结果
  return ret;
};

const fn = function (a, b) {
  console.info(a, b);
};

fn.myApply(null, 1, 2);
