/**
 * deep copy
 * target copy to source
 * 1. 假设都是对象
 */
function deepCopy(target) {
  let result;

  if (typeof target === "object") {
    // 数组
    if (Array.isArray(target)) {
      // null
    } else if (target == null) {
      result = null;

      // function
    } else if (Object.prototype.toString.call(target) == "[object Function]") {
    } else if (Object.prototype.toString.call(target) === "[object Object]") {
      result = {};

      for (let key in target) {
        result[key] = deepCopy(target[key])
      }
    }
    // Date
    // RegExp
    else {
      result = target;
    }
    // object
  } else {
    result = target;
  }

  return result;
}

var a = {
  a: "a object",
  name: "a",
};

var b = {
  b: "b object",
  name: "b",
};

const newOne = deepCopy(a);

console.log("newOne=>", newOne);
