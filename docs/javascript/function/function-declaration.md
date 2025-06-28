# 实例构造函数

- 相同构造函数出来的两个视力不相等，但其子属性、方法相同

```js
class A {
  getName() {}
}
const a = new A();
const b = new A();

a === b; // false
a.getName === b.getName; // true
```
