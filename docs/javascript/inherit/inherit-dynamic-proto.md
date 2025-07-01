# 创建对象-动态原型模式

> 缺点

- 不能使用字面量重写原型，否则会切断联系
  > 通过 if 来判断

## 动态原型

```js
function Fn(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  if (typeof this.sayName !== 'function') {
    Fn.prototype.sayName = function () {
      return this.name;
    };
  }
}
```
