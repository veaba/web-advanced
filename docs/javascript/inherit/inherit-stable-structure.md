# 稳妥构造继承

创建对象-稳妥构造函数模式

## 稳妥构造

> 特点：

1. 遵从寄生构造函数类似模式
2. 新创建对象方法的实例不引用 this
3. 不适用 new 操作调用构造函数
4. 丢掉无关属性或者说是丢掉无效入参
5. 没有其他方式可以访问其数据成员
6. 为安全性考虑的 js 设计模式

```js
function durable(name, age, job) {
  var obj = {};
  // todo 定义私有变量和属性
  obj.sayName = function () {
    console.log(name);
  };
  return obj;
}
// use
var p1 = durable('柳十', '41', 'CFO管钱的');
p1.sayName();
```
