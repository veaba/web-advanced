const PromiseClass = require("../html/promise-class-all");
describe("Promise/then", () => {
  it("1. Promise 实例第一个 then是可以执行", () => {
    const p = new PromiseClass(function(resolve, reject) {
      setTimeout(function() {
        resolve("success!", "这个是忽略的参数");
        // resolve("failed!", "这个是忽略的参数");
      }, 2000);

      p.then((one) => {
        expect(one).to("success!");
      });
    });
  });
});
