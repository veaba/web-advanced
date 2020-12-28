---
sidebar: auto
---

# This

## 立即执行函数中的 this 指向问题

```js
var obj = {
  a: function() {
    console.log("this==>", this);
    return this.b;
  },
  b: 2020,
};
(function() {
  console.log("=======>", typeof arguments[0]()); // 因为这里的this 是windows，windows 没有变量b，所以是undefined
})(obj.a);
```
