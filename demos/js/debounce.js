function debounce(fn, wait = 50) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

const betterFn = debounce(() => {
  console.log("go to ==>");
}, 200);

document.addEventListener("scroll", betterFn);
