/**
 * @desc 无论多少次都是用最后一次
 *
 */
function debounce(fn, wait = 50) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

const betterFn = debounce(() => {
  console.log('go to ==>');
}, 200);

// document.addEventListener('scroll', betterFn);

/** ***************** */

function myDebounce(fn, wait = 50) {
  let timer = null;

  debugger
  return (...args) => {
    debugger
    console.log('hah=>', args);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

const betterFn1 = myDebounce(() => {
  console.log('go to ==>');
}, 200);

betterFn1(111,222)