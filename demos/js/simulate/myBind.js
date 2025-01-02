Function.prototype.myBind = function (context, ...args) {
  const self = this;
  return (...innerArgs) => {
    // new 关键字
    if (this instanceof self) {
      console.info('is new');
      return new self(...args, ...innerArgs);
    }

    console.info('no new');
    return self.call(context, ...args, ...innerArgs);
  };
};
const fn = function (a, b) {
  console.info(a, b);
};

const fnBind = fn.myBind(null, 1, 2);

fnBind();
