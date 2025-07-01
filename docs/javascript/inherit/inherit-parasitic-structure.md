# 寄生构造继承

创建对象-寄生构造函数模式

> 比工厂模式多了一个 new，使用工厂模式 new 出来

## 寄生构造

特点：

1. 返回的对象与构造函数或者与构造函数的原型属性之间没有关系 `[1]`
2. 构造函数 return 的对象与构造函数外部创建的对象没有什么不同 `[2]`
3. 不能使用 instanceof 操作符确定对象类型
4. 在红宝石上书，不推荐此模式

```js
function factory(name, age, job) {
  // const obj=Object.create({})//带有普通对象的__proto__ 类似  const obj = new Object()
  // const obj=Object.create(null)//则没有_proto__！
  const obj = {}; //此处不一定是Object对象，可以是Array对象，具体看业务操作
  obj.age = age;
  obj.name = name;
  obj.job = job;
  obj.sayName = function () {
    return this.name;
  };
  return obj;
}
//use
const p = new factory('张三', '28', '前端狗');
```
