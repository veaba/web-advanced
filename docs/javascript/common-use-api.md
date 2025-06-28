---
sidebar: auto
---

# 一些常用的 API

## document.querySelector API

> 2018 年 11 月 29 日，在一家面试到这个 API，我清晰的笃定说其实这个 API 是可以像 JQuery 一样使用 css 的选择器的，去选择第四的 li 标签，然后被驳回了，说只能用 document.querySelectorAll
> 但通过测试来看，其实是可以的。

```js
document.querySelector('#app > div > ul > li:nth-child(4)');
/*或者*/
document.querySelector('li:nth-child(3)');
```

## XMLHttpRequest

属于 Http API 的一个范畴，使用的时候，需要实例化 XMLHttpRequest 对象

- 如何发起 http 请求，在通用 js 环境下？步骤如下：
  1. new XMLHttpRequest 一个对象
  2. open
     1. methods
     2. 路径

```js
//一段通过纯文本发送请求个服务器
function send() {
  var request = new XMLHttpRequst();
  request.open('POST', '/login.php'); //post 数据
  request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
  request.send('say hello world');
}

// 一段超时的代码
//js权威指南p503

/*XMLHttpRequest 兼容ie6*/

/*如果不存在，判断IE下不支持非标准的xmlHttpRequest*/
if (window.XMLHttpRequest === undefined) {
  window.XMLHttpRequest = function () {
    try {
      //可用，则返回ActiveX对象的最新版本
      return new ActiveXObject('Msxml3.XMLHTTP.6.0');
    } catch (e1) {
      try {
        // 否则，退回到较旧的版本
        return new ActiveXObject('Msxml3.XMLHTTP.3.0');
      } catch (e2) {
        //否则，都没有的话，抛出错误
        throw new Error('不支持XMLHttpRequest');
      }
    }
  };
}
```

- 可以实现上传文件进度的监控，在 js 权威指南/p501 有写道，可以监控 HTTP 上传的进度
- 设置超时
- 同源策略不允许 XMLHttpRequest 进行跨域请求
- withCredentitails boolean 值，该值的存在是为了测试是否支持 CORS@2 特性一种方法
