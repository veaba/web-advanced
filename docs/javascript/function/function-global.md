# 全局函数

`http://www.w3school.com.cn/jsref/jsref_obj_global.asp`

- Global `ES 内置单体对象` 全局对象

| 属性             | 方法                   | 描述                 |
|----------------|----------------------|--------------------|
|                | isNaN()              |                    |
|                | isFinite()           |                    |
|                | parseInt()           |                    |
|                | parseFloat()         |                    |
|                | encodeURI()          | `对空格转换`            |
|                | decodeURI()          |                    |
|                | encodeURIComponent() | `非标准字符全部编码`        |
|                | decodeURIComponent() |                    |
|                | eval()               |                    |
| undefined      |                      | `特殊值`              |
| NaN            |                      | `not a number 特殊值` |
| Infinity       |                      | `特殊值`              |
| Object         |                      | `构造函数`             |
| Array          |                      | `构造函数`             |
| Function       |                      | `构造函数`             |
| Boolean        |                      | `构造函数`             |
| String         |                      | `构造函数`             |
| Number         |                      | `构造函数`             |
| Date           |                      | `构造函数`             |
| RegExp         |                      | `构造函数`             |
| Error          |                      | `构造函数`             |
| EvalError      |                      | `构造函数`             |
| RangeError     |                      | `构造函数`             |
| ReferenceError |                      | `构造函数`             |
| SyntaxError    |                      | `构造函数`             |
| TypeError      |                      | `构造函数`             |
| URIError       |                      | `构造函数`             |
|                |                      |                    |

- Math `ES 内置单体对象`，比较数组大小

```js
const arr = [11231, 238, 5, 21];
Math.max.apply(Math, arr);
```

等同于：

```js
const arr = [11231, 238, 5, 21]
Math.max(...arr)

// 即
// Math.max(11231, 238, 5, 21)

```

| 属性      | 方法             | 描述                              |
|---------|----------------|---------------------------------|
| E       |                | `自然对数的底数，常量e的值`                 |
| LN10    |                | `10的自然对数`                       |
| LN2     |                | `2的自然对数`                        |
| LOG2E   |                | `2为底的e的对数`                      |
| LOG10E  |                | `10为底的e的对数`                     |
| PI      |                |                                 |
| SQRT1_2 |                | `1/2的平方根，2的平方根的倒数`              |
| SQRT2   |                | `2的平方根`                         |
|         | min()          | `(1,3,9,4)`                     |
|         | max()          | `(9,3,11)`                      |
|         | ceil()         | 向上取舍                            |
|         | floor()        | 向下取舍                            |
|         | round()        |                                 |
|         | random()       | `0-1随机数，技巧：Math.random()*100+1` |
|         | abs(num)       | `绝对值`                           |
|         | exp(num)       | `Math.E的num次幂`                  |
|         | log(num)       |                                 |
|         | pow(num,power) |                                 |
|         | sqrt(num)      | `num的平方根`                       |
|         | acos(x)        | `x的反余弦值`                        |
|         | asin(x)        | `x的反正弦值`                        |
|         | atan()         | `x的反正切值`                        |
|         | atan2(y,x)     | `y/x的反正切值`                      |
|         | cos(x)         | `x的余弦值`                         |
|         | sin(x)         | `x正弦值`                          |
|         | tan(x)         | `x正切值`                          |
|         |                |                                 |

## 全局属性

### Infinity

### NaN

### undefined

## 全局方法

### decodeURL()

### decodeURLComponent()

### encodeURL()

### encodeURLComponent()

### eval()

### isFinite()

### isNaN()

### Number()

### parseFloat()

### String()

### escape() <Badge type="danger">废弃</Badge>

### unescape() <Badge type="danger">废弃</Badge>
