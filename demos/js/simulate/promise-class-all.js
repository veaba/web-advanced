/**
 *
 * 1. TODO 如何实现链式调用
 * 2. Promise 实例有三个方法
 *  - then
 *  - catch
 *  - finally
 * 3. Promise 有6个静态方法
 * 4.
 * static #fns 私有静态
 * static fns 公有静态
 *
 */
class PromiseClass {
  static thenList = [];
  static catchList = [];
  constructor(fn) {
    this.fns = [fn];
    this.thenList = [];
    // console.log("fn=>", fn);
    // console.log("typeof fn=>", typeof fn);
    // console.log("typeof fns=>", typeof this.fns);
    // console.log("this=>", this);

    fn.call(null, PromiseClass.resolved); // 通过call 显式转移内部的 param
    fn.call(null, PromiseClass.rejected); // 通过call 显式转移内部的 param
  }
  static resolved(...args) {
    const resolveParam = args[0];
    // PromiseClass.then.call(this, resolveParam);

    PromiseClass.thenList.shift().call(this, resolveParam);

    for (let i = 0; i < PromiseClass.thenList.length; i++) {
      const returnThen = PromiseClass.thenList[i];
      console.log("returnThen=>", returnThen.call(this, returnThen));
    }
  }
  static rejected(...args) {
    const rejectParam = args[0];
    for (let i = 0; i < PromiseClass.catchList.length; i++) {
      PromiseClass.catchList[i].call(this, rejectParam);
    }
  }

  /**
   * @desc promise instance method: then
   * @TODO 这个then 是在 resolve 里面异步后再被动执行的
   *
   */
  then(...args) {
    const thenParam = args[0];
    PromiseClass.thenList.push(thenParam);
    return this;
  }

  /**
   * @desc promise instance method: catch
   * @TODO
   *
   */
  catch(...args) {
    const catchParam = args[0];
    PromiseClass.catchList.push(catchParam);
    return this;
  }

  /**
   * @desc promise instance method: finally
   * @TODO
   *
   */
  finally() {}

  /**
   * @TODO
   *
   */
  static all(arg) {
    console.log("this", arg);
  }
  static resolve() {}
  /**
   * @TODO
   *
   */
  static reject() {}
  /**
   * @TODO
   *
   */
  static race() {}
  /**
   * @TODO
   *
   */
  static any() {}
  /**
   * @TODO
   *
   */
  static finally() {}
  /**
   * @TODO
   *
   */
  static allSettled() {}
}

// PromiseClass.all(11);

// console.log(PromiseClass);

/**
 * Promise 内部的如何调用 resolve 这个两个参数？
 * @Test 如果then里不return res 为undefined
 *
 */

module.exports = PromiseClass;
