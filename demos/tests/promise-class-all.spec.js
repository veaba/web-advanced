const PromiseClass = require("../html/promise-class-all");
describe("Promise/then", () => {
  it("1. Promise 实例第一个 then是可以执行", () => {
    const p = new PromiseClass(function(resolve, reject) {
      setTimeout(function() {
        resolve("success!", "这个是忽略的参数");
        // resolve("failed!", "这个是忽略的参数");
      }, 2000);
    });
    p.then((one) => {
      expect(one).to("success!");
    });
  });

  it("2. Promise 实例第二个 then 的值应该是undefined", () => {
    const p = new PromiseClass(function(resolve, reject) {
      setTimeout(function() {
        resolve("success!", "这个是忽略的参数");
        // resolve("failed!", "这个是忽略的参数");
      }, 2000);
    });
    p.then((one) => {
      expect(one).to("success!");
    }).then((two) => {
      expect(two).toBe(undefined);
    });
  });
  it("3. Promise 实例第二个 then 的值应该是 return 到下一个then", () => {
    const p = new PromiseClass(function(resolve, reject) {
      setTimeout(function() {
        resolve("success!", "这个是忽略的参数");
        // resolve("failed!", "这个是忽略的参数");
      }, 2000);
    });
    p.then((one) => {
      expect(one).to("success!");
      return 1;
    }).then((two) => {
      expect(two).toBe(1);
    });
  });

  // TODO 
  it("4. Promise 实例第一个 then 的第二个参数为catch", () => {
    const p = new PromiseClass(function(resolve, reject) {
      setTimeout(function() {
        resolve("success!", "这个是忽略的参数");
        // resolve("failed!", "这个是忽略的参数");
      }, 2000);
    });
    p.then((one) => {
      expect(one).to("success!");
      return 1;
    }).then((two) => {
      expect(two).toBe(1);
    });
  });
});
