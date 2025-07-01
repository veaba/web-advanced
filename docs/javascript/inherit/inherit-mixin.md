# 混淆继承

创建对象-混淆大法！组合使用构造函数 +原型模式！`目前最广泛，最好的方式`

> 构造函数写属性，方法则用原型继承

```js
function Fn(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.test = ['man', 'woman'];
}
Fn.prototype = {
  constructor: Fn,
  sayName() {
    return this.name;
  },
};
var p1 = new Fn('xsa', 'tt', 'te');
var p2 = new Fn('xsa2', 'tt2', 'te2');
p1.test.push('son');
console.info(p1.test === p2.test);
```
