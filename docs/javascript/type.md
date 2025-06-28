# 类型

**基本类型**：

- `null`

- `undefined`

- `string`

- `number`

- `boolean`

- `symbol` 新的

- `bigint` 新的

**引用类型**：

- `object`

  - `function` (都是属于 `object`)

  - `array` (都是属于 `object`)

## 类型转换

### 类型判断

```js
const nul = null;
const undefine = undefined;
const bool = true;
const num = 2020;
const str = 'hello world';
const sys = Symbol(2020);
```

**typeof 判断**：

```js
const nul = null;
const undefine = undefined;
const bool = true;
const num = 2020;
const str = 'hello world';
const sys = Symbol(2020);

const obj = { name: 'hello' };
const fn = function () {};
const arr = [2020, 12, 20];

console.log(typeof nul); // object
console.log(typeof undefine); //undefined
console.log(typeof bool); //boolean
console.log(typeof num); // number
console.log(typeof str); // string
console.log(typeof sys); // symbol

console.log(typeof obj); // object
console.log(typeof fn); // function
console.log(typeof arr); // object
```

**instanceof**：

- 用于检测引用类型，如 `array`、`object`、`function`

```js
console.log(obj instanceof Object); // true
console.log(fn instanceof Function); // true
console.log(arr instanceof Array); // true
```

**constructor**：

- 由于 `constructor` 是可被改变的，所以在这种方式并不安全

```js
console.log(bool.constructor === Boolean); // true
console.log(num.constructor ===  Number); // true
console.log(str.constructor ===  String); // true
console.log(obj.constructor ===  Object); // true
console.log(fn.constructor ===  Function); // true
console.log(arr.constructor ===  Array); // true
console.log(sys.constructor ===  Symbol); // true

console.log(nul.constructor ===null); // error
console.log(undefine.constructor undefined); // error
```

**Object.prototype.toString.call**：

- 较为安全判断 `js` 数据类型

```js
console.log(Object.prototype.toString.call(nul)); // [object Null]
console.log(Object.prototype.toString.call(undefine)); // [object Undefined]
console.log(Object.prototype.toString.call(bool)); // [object Boolean]
console.log(Object.prototype.toString.call(num)); // [object Number]
console.log(Object.prototype.toString.call(str)); // [object String]
console.log(Object.prototype.toString.call(sys)); // [object Symbol]
console.log(Object.prototype.toString.call(obj)); // [object Object]
console.log(Object.prototype.toString.call(fn)); // [object Function]
console.log(Object.prototype.toString.call(arr)); // [object Array]
```
