---
sidebar: auto
---

# 亮点

## 匿名函数、具名函数、箭头函数比较

楼主通过瞎折腾发现的一些特性，仅供参考，

[测试文件](https://github.com/veaba/web-advanced-frond-end/tree/master/demos/js/test_function_name_anonymous_arrow.js)

具名函数：
```js

console.time('具名函数');
var a=[66,99,44].map(function hello(item) {
  return item*2
});
// console.info('                         '+a);
console.timeEnd('具名函数');
```

不清楚和以下有什么区别：
```js
console.time('匿名函数');
var b =[66,99,44].map(function(item) {
  return item*2
});
// console.info('                         '+b);
console.timeEnd('匿名函数');
`````

而如果使用箭头函数，则为：

```js
console.time('箭头函数');
var c=[66,99,44].map(item=>item*2);
// console.info('                         '+c);
console.timeEnd('箭头函数');
```

测试如下：

|测试次数|具名函数|匿名函数|箭头函数|
|---|---|---|---|
|1||
|2||
|3||
|4||
|5||
|6||
|7||
|8||
|9||
|10||

测试结果：
函数执行时间所需时间：箭头函数<匿名函数<具名函数

## 一段axios 上传文件的支持

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>upload file by axios</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

</head>

<body>
    <input type="file" name="files" id="file" multiple="multiple" />

    <button onClick="clickFile()">clickFile</button>
    <script>
        function clickFile() {
            var form = document.querySelector("#file");
            var formData = new FormData();
            formData.append('files', form.files[0]);
            axiosUpload(formData)
        }
        function axiosUpload(formData) {
            axios.post('http://127.0.0.1/file-server/api/resources/files/uploads', formData, {
                    headers: {
                        "token": "123-456-789",
                        "Content-type": "multipart/form-data"
                    }
                })

                .then(res => {
                    console.log(res)
                })
        }
    </script>
</body>

</html>

```

1、入参给formData.append("file",fileInfo)

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
