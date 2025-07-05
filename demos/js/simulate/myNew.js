function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const result = fn.apply(obj, args);
  return typeof result === 'object' ? result : obj;
}

function fn(name) {
  this.name = name;
}

const x = myNew(fn, '6666');

console.log(x.name);
