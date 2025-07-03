---
sidebar: auto
---

# 流行常见前端面试技术题

## 所有类型，string|number|NaN|boolean|array|object|function|，共用的属性是什么？除了，null、undefined。(自己出的)

> toString()、valueOf()

## 哪些数据类型有 length 这个属性？(自己出的)

| string    | number | NaN       | null  | undefined | boolean   | array     | object    | function   |
| --------- | ------ | --------- | ----- | --------- | --------- | --------- | --------- | ---------- |
| `success` | error  | undefined | error | error     | undefined | `success` | undefined | 0,始终是 0 |

## 双等于号比较

> 结论：

1. 字符串和布尔值是一组，空字符串和 false
2. null 和 undefined 是一组，以上两组互不相等，同组的组员或者自己相等
3. NaN 属于 Number，自称一派

> 如果按书写字符长度分布，用以下记忆表格

- 前两个，后两个交叉
- NaN 全 false

|             |         |         |         |             |
| ----------- | ------- | ------- | ------- | ----------- | ------- |
| a==a        | `''`    | `null`  | `false` | `undefined` |
| `''`        | true    | `false` | true    | `false`     | `false` |
| `null`      | `false` | true    | `false` | true        |
| `false`     | true    | `false` | true    | `false`     |
| `undefined` | `false` | true    | `false` | true        |

> 如何按分布可以用一些记忆表格 (这个比较好记忆)

|             |         |         |         |             |
| ----------- | ------- | ------- | ------- | ----------- | ------- |
| a==a        | `''`    | `false` | `null`  | `undefined` |
| `''`        | true    | true    | `false` | `false`     | `false` |
| `false`     | true    | true    | `false` | `false`     | `false` |
| `null`      | `false` | `false` | true    | true        |
| `undefined` | `false` | `false` | true    | true        |
|             |         |         |         |             |

## 三等于号比较

| -                | -      | -       | -      | -           |
| ---------------- | ------ | ------- | ------ | ----------- |
| 三等于比较 a===a | `''`   | `false` | `null` | `undefined` |
| `''`             | `true` | false   | false  | false       |
| `false`          | false  | `true`  | false  | false       |
| `null`           | false  | false   | `true` | false       |
| `undefined`      | false  | false   | false  | `true`      |
|                  |        |         |        |             |

- [“1”，“2”，“3”]。map(parseInt) 答案是多少？

[详细解析](http://blog.csdn.net/justjavac/article/details/19473199)

## map 用法考察

```js
// map 一定会执行function，必须会执行这个currentValue,index,arr
// thisValue 对象作为该执行回调时使用，传给函数,用作this 值，省略。this 为 undefined
array.map(function (currentValue, index, arr) {});
```

## parseInt 考察

```js
// map:
['1', '2', '3'].map(function (value, index) {
  console.info(value, index);
});
//1 0
//2 1
//3 2
//于是，对于map后面加了一个方法parseInt，就相当于
parseInt('1', 0); // 1 此时radix 0以10位基础
parseInt('2', 1); // NaN redix 为1，小于2，NaN
parseInt('3', 2); // NaNredix 为2，小于2不成立，但2进制不满足3
/*********************************************************/
parseInt(string, radix); ////string 必填,radix(2~36)如果 radix 为0，则以10为基础解析，如果0x， 0X开头，以16位基数，如果小于2,、大于36 则返回 `NaN`
parseInt('1', 0); // 十进制 1
parseInt('2', 1); // 第二个参数不在 2-36 内，
parseInt('3', 2); // 二进制 NaN，因为二进制中，不存在3，所以报错
parseInt('4', 3); // 三进制，4的3进制，11，不含4；3进制[0,1,2] ‘4’=>4，4不在3进制里面
parseInt('5', 4); // 四进制，5的4进制，11，不含5
parseInt('6', 5); // 五进制，6的5进制，11，不含6
parseInt('7', 6); // 六进制，7的6进制，11，不含7
parseInt('8', 7); // 七进制，8的7进制，11，不含8
parseInt('9', 8); // 9的八进制=11 因为八进制中，不存在9，所以报错
parseInt('10', 9); // 九进制 （1*9+0 = 9） 10的九进制=11
parseInt('11', 10); // 十进制 （1*10+1 = 11）
parseInt('12', 11); // 十一进制 （1*11+2 = 13）
parseInt('13', 12); // 十二进制 （1*12+3 = 15）
parseInt('14', 13); // 十三进制 （1*13+4 = 17）
parseInt('15', 14); // 十四进制 （1*14+5 = 19）
parseInt('16', 15); // 十五进制 （1*15+6 = 21）
```

## 判断对象为空？

```js
var b = {};

/* 判断是否是空对象*/
JSON.stringify(b) === '{}';
```

## 如何阻止冒泡？[*]

e.stopPropagation()
旧的 IE e.cancelButton=true

## firfox 与 IE 的事件机制

IE 事件冒泡
FF 同时支持捕获型事件、冒泡型事件

## js 延迟加载

defer、async，动态创建 dom 方式【最多】，按需异步加载

## ajax 异步传输 (html+js)

## ajax 缓存问题

## 跨域问题

jsonp 利用 script 标签不跨域的方式，让 js 文件发挥 json 格式的文件。

```js
//jsonp 意味着需要信任远程服务器的脚本，否则会炸鸡。
// 请求jsonp
getSome({ say: 'hello' });
```

- iframe
- window.name
- window.postMessage
- 服务商设置代码页面

## 模块化开发

立即执行函数，不暴露私有成员

## CommonJS (通用环境) node 的实现、webpack 也是

## AMD-require.js/curl.js (异步模块定义，一开始写好，前置，适合浏览器环境) [AMD (异步模块定义，一开始写好，前置)](https://github.com/amdjs/amdjs-api/wiki/AMD)

## CMD (sea.js 实现-) [require.js 就近模式](https://github.com/seajs/seajs/issues/242) [require.js 就近模式 1](http://annn.me/how-to-realize-cmd-loader/)

## 异步加载 js

- defer {IE}
- async
- 创建 script

## document.write

## document.innerHTML

## ECMAScript 与 JavaScript

- JavaScript 是 ECMAScript 所实现的一个标准
- JavaScript 是 ECMAScript 的一种实现
- 一般讲 js：dom+bom+ECMAScript
