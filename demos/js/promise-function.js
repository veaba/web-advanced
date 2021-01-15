/***********************
 * @name JS
 * @author Jo.gel
 * @date 2018/4/2
 ***********************/

//P(fn) fn typeof 为function 手写简单的 promise

// 1 3 4 2 5
function P(fn) {
  console.info("P promise");
  var value = null;
  var events = [];
  this.then = function(f) {
    events.push(f);
    return this;
  };
  function resolve(newValue) {
    var f = events.shift();
    f(newValue, resolve);
  }
  fn(resolve);
}

function a() {
  debugger;
  console.info("function a");
  return new P(function(resolve) {
    console.log("ge1");
    setTimeout(function() {
      console.log("get2");
      resolve(1);
    }, 6000);
  });
}
a()
  .then(function(value, resolve) {
    console.log("get3");
    setTimeout(function() {
      console.log("get 4");
      resolve(2);
    }, 3000);
  })
  .then(function(value, resolve) {
    console.log("get 5：" + value);
  });
