// Reference :https://segmentfault.com/a/1190000038433512

class PromiseClass {
  constructor(exec) {
    this.status = "pending"; // 等待中
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilled = undefined;
    this.onRejected = undefined;
    this.onFulFilledList = []; // 等待的函数与列表？
    this.onRejectedList = []; // 拒绝的列表

    try {
      // todo
      exec(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  // resolve 函数
  resolve(value) {
    if (this.status === "pending") {
      this.status = "fulfilled";
      this.value = value;
      this.onFulFilledList.forEach((item) => item()); //每项函数都是执行
    }
  }
  // reject 函数
  reject(reason) {
    if (this.status === "pending") {
      this.status = "rejected";
      this.reason = reason;
      this.onRejectedList.forEach((item) => item());
    }
  }

  // then

  then(onFulfilled, onRejected) {
    let result = null;
    if (this.status === "fulfilled" && onFulfilled) {
      result = onFulfilled(this.value);
      return PromiseClass.resolve(result); //返回新的一个promise
    }

    if (this.status === "rejected" && onRejected) {
      result = onRejected(this.reason);
      return PromiseClass.resolve(result);
    }

    if (this.status === "pending") {
      onFulfilled && this.onFulFilledList.push(() => onFulfilled(this.value)); // 如果存在，则到栈里
      onRejected && this.onRejectedList.push(() => onRejected(this.reason));
    }
  }
}

PromiseClass.resolve = function(value) {
  if (typeof value === "object" && value.then) {
    return value;
  } else {
    return new PromiseClass((resolve) => {
      resolve(value);
    });
  }
};

PromiseClass.all = function(list) {
  return new PromiseClass((resolve, reject) => {
    let result = [];
    let count = 0;
    for (let i = 0; i < list.length; i++) {
      if (typeof list[i] === "object" && list[i].then) {
        PromiseClass.resolve(list[i]).then((data) => {
          result[i] = data;
          count++;
        }, reject);
      } else {
        result[i] = list[i];
        count++;
      }
    }

    if (count === list.length) {
      resolve(result);
    }
  });
};

// TODO:PromiseClass.race 只要一个成功，全部resolve

// TODO:PromiseClass finally，不管成功失败，回调都执行，执行之后，依然可以then
