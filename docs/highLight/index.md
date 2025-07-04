---
sidebar: auto
---

# 亮点

## 匿名函数、具名函数、箭头函数比较

通过瞎折腾发现的一些特性，仅供参考，

[测试文件](https://github.com/veaba/web-advanced-frond-end/tree/master/demos/js/test_function_name_anonymous_arrow.js)

具名函数：

```js
console.time('具名函数');
var a = [66, 99, 44].map(function hello(item) {
  return item * 2;
});
// console.info('                         '+a);
console.timeEnd('具名函数');
```

不清楚和以下有什么区别：

```js
console.time('匿名函数');
var b = [66, 99, 44].map(function (item) {
  return item * 2;
});
// console.info('                         '+b);
console.timeEnd('匿名函数');
```

而如果使用箭头函数，则为：

```js
console.time('箭头函数');
var c = [66, 99, 44].map((item) => item * 2);
// console.info('                         '+c);
console.timeEnd('箭头函数');
```

测试如下：

| 测试次数 | 具名函数 | 匿名函数 | 箭头函数 |
| -------- | -------- | -------- | -------- |
| 1        |          |
| 2        |          |
| 3        |          |
| 4        |          |
| 5        |          |
| 6        |          |
| 7        |          |
| 8        |          |
| 9        |          |
| 10       |          |

测试结果：
函数执行时间所需时间：箭头函数 `>` 匿名函数 `>` 具名函数

## 一段 axios 上传文件的支持

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>upload file by axios</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </head>

  <body>
    <input type="file" name="files" id="file" multiple="multiple" />

    <button onClick="clickFile()">clickFile</button>
    <script>
      function clickFile() {
        var form = document.querySelector('#file');
        var formData = new FormData();
        formData.append('files', form.files[0]);
        axiosUpload(formData);
      }
      function axiosUpload(formData) {
        axios
          .post('http://127.0.0.1/file-server/api/resources/files/uploads', formData, {
            headers: {
              token: '123-456-789',
              'Content-type': 'multipart/form-data',
            },
          })

          .then((res) => {
            console.log(res);
          });
      }
    </script>
  </body>
</html>
```

1、入参给 formData.append (“file”，fileInfo)

```text
{
	lastModified:1569222661942,
	lastModifiedDate:Mon Sep 23 2019 15:11:01 GMT+0800 (中国标准时间)
	name:"文件名.png",
	size:7777,/kb
	type:"image/png",
	webkitRelativePath:""
}

2. 外面一般包裹着数组里面
3. 如果是从dom取得，特定字段是dom.files

```

## for i 与 for in 的比较

```js
let n = Array(100).fill(1);
let iN = 0;
let jN = 0;
console.time('for1:' + n.length);
for (let i = 0; i < n.length; i++) {
  iN++;
}
console.timeEnd('for1:' + n.length);
console.time('for2:' + n.length);

for (let j in n) {
  jN++;
}
console.timeEnd('for2:' + n.length);
```

对比结果：

| `n`        | `for i` 执行时间     | `for in` 执行时间     |
| ---------- | -------------------- | --------------------- |
| `n=10`     | `0.003173828125 ms`  | `0.005859375 ms`      |
| `n=100`    | `0.011962890625 ms`  | `0.0078125 ms`        |
| `n=1000`   | `0.037109375 ms`     | `0.079833984375 ms`   |
| `n=100000` | `1.8818359375 ms`    | `10.97705078125 ms`   |
| `10000000` | `15.690185546875 ms` | `1873.72314453125 ms` |

**结论**：

- 随着 `n` 的拉长，`for in` 的执行时间与 `for i` 的执行时间比较更加明显慢

**遗留**：

- 那么，为什么 `for in` 比 `for i` 慢呢？

- 可能的原因之一：`for in` 在执行的过程中，内部在做检索

## 巧用 `&` 与操作

| 对比    | 结果 |
| ------- | ---- |
| `0&0`   | `0`  |
| `0&1`   | `0`  |
| `0&-1`  | `0`  |
| `-1&0`  | `0`  |
| `1&0`   | `1`  |
| `-1&-1` | `-1` |
| `-1&1`  | `1`  |
| `-1&-5` | `-5` |
| `1&1`   | `1`  |
| `1&5`   | `5`  |
| `1&-5`  | `1`  |
