# 静态方法

- 疑问：比较 MediaSource.prototype 与 Array.isArray()

Array.isArray() `静态方法?`，可在 chrome 打印出来并不是灰色
![Array.isArray()](/images/isArray.jpg)

MediaSource.isTypeSupported() `静态方法`，在 chrome 打印出来是亮色
![MediaSource.isTypeSupported](/images/isTypeSupported.jpg)

| 类型或者构造函数 | arguments | caller | length | name    | prototype | **proto** | [[Scopes]] |
| ---------------- | --------- | ------ | ------ | ------- | --------- | --------- | ---------- |
| String           |           |        | 1      | String  |           |           |            |
| Boolean          |           |        | 1      | Boolean |           |           |            |
| Number           |           |        | 1      | Number  |           |           |            |
| Object           |           |        | 1      | Object  |           |           |            |
| Array            |           |        | 1      | Array   |           |           |            |
| Symbol           |           |        | 0      | Symbol  |           |           |            |
| MediaSources     |           |        |        |         |           |           |            |
|                  |           |        |        |         |           |           |

## String 方法

- fromCharCode
- raw
- Boolean

## Number

- EPSILON:2.220446049250313e-16
- MAX_SAFE_INTEGER: 9007199254740991
- MAX_VALUE:1.7976931348623157e+308
- MIN_SAFE_INTEGER: -9007199254740991
- MIN_VALUE:5e-324
- NEGATIVE_INFINITY: -Infinity
- NaN: NaN
- POSITIVE_INFINITY: Infinity
- isFinite()
- isInteger()
- isNaN()
- isSafeInteger()
- parseFloat()
- parseInt()

## Object

- assign()
- create()
- defineProperties()
- defineProperty()
- entries()
- freeze()
- getOwnPropertyDescriptor()
- getOwnPropertyDescriptors()
- getOwnPropertyNames()
- getOwnPropertySymbols()
- getPrototypeOf()
- is()
- isExtensible()
- isFrozen()
- isSealed()
- keys()
- preventExtensions()
- seal()
- setPrototypeOf()
- values()

## Array

- from()
- isArray()
- of()
- Symbol(Symbol.species)
- get Symbol(Symbol.species):()

## Symbol

- asyncIterator
- for()
- hadInstance
- isConcatSpreadable
- iterator
- keyFor()
- match
- replace
- search
- species
- split
- toPrimitive
- toStringTag
- unscopables

## WebSocket

- `CLOSED:3`
- `CLOSING:2`
- `OPEN:1`
- `CONNECTING:0`

## MediaSources

- `isTypeSupported()` 静态方法
