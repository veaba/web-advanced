/**
 * 节流函数
 * - 一定时间才执行一次，无论多少次
 * - 上传文件进度
 * - windows.resize
 * - input 查询
 *
 * */

const throttle = (fn, wait = 50) => {
  let pre = 0;

  return function(...args) {
    let now = new Date();
    if (now - pre > wait) {
      pre = now;
      fn.apply(this, args);
    }
  };
};

const fn = throttle(() => {
  console.log(new Date());
});

document.addEventListener("scroll", fn);
