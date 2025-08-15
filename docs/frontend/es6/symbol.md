# ES6 Symbol 枚举

## 概念

- 属于 ES6 新的数据类型，与 `null`、`undefined`、`boolean`、`string`、`number` 这个五个一起被称为 `JavaScript` 六大基本数据类型。

- `symbol` 是一种基本类型，不是对象，不用 `new` 产生。

- 同时，它也不能被添加属性。

**可通过 `Object.prototype.toString.call()`** 来判断其类型：`[object Symbol]`

## 用途

**原因**：`es5` 对象的属性名是字符串，这容易造成属性名冲突。

**解决**：`es6` 引入一种新的方法，确保对象上的每个属性名都是独一无二的

## 用法

参数：`string`、`object`，会被始终转为字符串，这里的参数仅仅作为描述

相同的参数，它的返回值也是不相同的。

```js
const s1 = Symbol("he");
const s2 = Symbol("he");

console.log(s1 == s2); // false
console.log(s1 === s2); // false
```

## 约束

- 无法与其他类型计算

```js
const pluSy = Symbol("plus");

console.log(pluSy + "?");
```

- **可被显式转为字符**

```js
const st = Symbol("hello");
console.log(String(st)); // Symbol(hello)
console.log(st.toString()); // Symbol(hello)
```

- **symbol 值可被转为布尔值，但不能转为数值**

```js
const sy = Symbol();
console.log(Boolean(sy)); // true
console.log(!sy); // false

console.log(Number(sy)); // error
console.log(sy + 2020); // error
```

- **symbol 值作为对象属性名是，无法使用点运算符**

```js
const sy = Symbol();
const obj = {};
obj.sy = "hello world";

console.log(obj["sy"]); // "hello world"
console.log(obj[sy]); // undefined
```

- **始终放在中括号中**

## 场景

**唯一属性值**：

```js
const sy = Symbol();

// 写法 1
const obj = {
  [sy]: "world",
};

// 写法 2
obj[sy] = "hello";

// 写法 3
Object.defineProperty(obj, sy, { value: "define value" });

console.log(obj[sy]);
```

**消除魔术字符串**：

魔术字符串值得是，在代码中多次出现，与代码形成耦合的某个具体的字符或数值。

```js
function getArea(shape, ops) {
  let area = 0;

  switch (shape) {
    case "Triangle": // 魔术字符串
      area = 0.5 * ops.width * ops.height;
      break;
  }
  return area;
}

console.log(getArea("Triangle", { width: 90, height: 60 })); // 两次都出现这个字符串 `Triangle`
```

常用的办法就是写成一个变量。

```js
const obj = {
  triangle: "Triangle",
};
function getArea(shape, ops) {
  let area = 0;

  switch (shape) {
    case obj.triangle: // 魔术字符串
      area = 0.5 * ops.width * ops.height;
      break;
  }
  return area;
}

console.log(getArea(obj.triangle, { width: 90, height: 60 })); // 两次都出现这个字符串 `Triangle`
```

此时，消除了强耦合。

但这里的 `obj.triangle` 等于那个值不重要，只要确保不和其他 `obj` 属性值冲突即可。

所以，这里特别适用 `Symbol`

```js
const obj = {
  triangle: Symbol(),
};
function getArea(shape, ops) {
  let area = 0;

  switch (shape) {
    case obj.triangle: // 魔术字符串
      area = 0.5 * ops.width * ops.height;
      break;
  }
  return area;
}

console.log(getArea(obj.triangle, { width: 90, height: 60 })); // 两次都出现这个字符串 `Triangle`
```

**属性名的遍历**：

## 方法或属性

- `Symbol.prototype.description`

- `Symbol.for()`

- `Symbol.keyFor()`

- `Symbol.hasInstance`

- `Symbol.isConcatSpreadable`

- `Symbol.species`

- `Symbol.match`

- `Symbol.replace`

- `Symbol.search`

- `Symbol.split`

- `Symbol.iterator`

- `Symbol.toPrimitive`

- `Symbol.toStringTag`

- `Symbol.unscopables`
