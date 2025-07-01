# 构造函数

- 相同构造函数出来的两个实例不相等，但其子属性、方法相同

```js
class Colors {
  getColor() {
  }
}

const a = new Colors();
const b = new Colors();

console.log("compare instance=>", a === b); // false
console.log("compare  method=>", a.getColor === b.getColor); // true
```
