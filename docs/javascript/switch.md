# switch 语句

- switch
  - case 必须紧接着跟值/变量/简单表达式/&&/function，不确定能使用||

```js
// 以下产生一个 bug，不管怎么样使用关键字 name 声明一个值，只能是 string 类型！！！
var name = '22';
var tt = '22';
var name1 = 22;
var tt1 = 22;
// demo1
switch (name) {
  // 终止错误，合并两个条件
  case '22':
  case 'AbortError':
  default:
    console.info('NotFoundError:找不到满足错误的类型');
}
//demo2
switch (name) {
  // 终止错误，合并两个条件
  case tt:
  case 'AbortError':
  default:
    console.info('NotFoundError:找不到满足错误的类型');
}
//demo3
switch (name1) {
  // 终止错误，合并两个条件,数值为 number 类型时候，无法进入此条件
  case tt1:
  case 'AbortError':
  default:
    console.info('NotFoundError:找不到满足错误的类型');
}
```