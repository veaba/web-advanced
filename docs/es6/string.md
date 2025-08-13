## 字符串

### 模板字符串无法的打印 symbol

```js
const sy1 = Symbol(11);

console.log(sy1);

console.log(`${sy1}`); // `Cannot convert a Symbol value to a string`
```
