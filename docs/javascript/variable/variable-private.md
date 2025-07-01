# 私有变量

> 如何让外部的函数访问到内部的变量和设置

- 通过构造函数的方式

```js
function Main(name) {
  this.getName = function () {
    return name;
  };
  this.setName = function (value) {
    name = value;
  };
}
var p1 = new Main('李四');
console.log(p1.getName());
p1.setName('王五');
console.log(p1.getName());
```
