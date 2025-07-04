---
sidebar: auto
---

# 流行常见前端面试技术题

## 所有类型，共用的属性是什么？

| 数据类型 |
| -------- |
| string   |
| number   |
| NaN      |
| boolean  |
| array    |
| object   |
| function |

除了，`null`、`undefined`

- toString()
- valueOf()

## 哪些数据类型有 `.length`

| 数据类型  | 结果        |
| --------- | ----------- |
| string    | `success`   |
| number    | `error`     |
| NaN       | `undefined` |
| null      | `error`     |
| undefined | `error`     |
| boolean   | `undefined` |
| array     | `success`   |
| object    | `undefined` |
| function  | `0`         |

## 双等于号比较

:::tip

1. 字符串和布尔值是一组，空字符串和 false
2. null 和 undefined 是一组，以上两组互不相等，同组的组员或者自己相等
3. NaN 属于 Number，自称一派

:::

> 如何按分布可以用一些记忆表格 (这个比较好记忆)

- 空字符串和 false 等同
- `NaN` 和谁都是 `false`，包括它自己本身。

| 双等于号    | `''`    | `false` | `null`  | `undefined` | `NaN`   |
| ----------- | ------- | ------- | ------- | ----------- | ------- |
| `''`        | true    | true    | `false` | `false`     | `false` |
| `false`     | true    | true    | `false` | `false`     | `false` |
| `null`      | `false` | `false` | true    | true        | `false` |
| `undefined` | `false` | `false` | true    | true        | `false` |
| `NaN`       | `false` | `false` | `false` | `false`     | `false` |

## 三等于号比较

- 必须严格等于自己
- `NaN` 不等于自己

| 三等于号    | `''`    | `false` | `null`  | `undefined` | `NaN`   |
| ----------- | ------- | ------- | ------- | ----------- | ------- |
| `''`        | `true`  | false   | false   | false       | `false` |
| `false`     | false   | `true`  | false   | false       | `false` |
| `null`      | false   | false   | `true`  | false       | `false` |
| `undefined` | false   | false   | false   | `true`      | `false` |
| `NaN`       | `false` | `false` | `false` | `false`     | `false` |

- [“1”，“2”，“3”].map(parseInt) 答案是多少？

[详细解析](http://blog.csdn.net/justjavac/article/details/19473199)

## map 用法考察

```js
// map 一定会执行function，必须会执行这个currentValue,index,arr
// thisValue 对象作为该执行回调时使用，传给函数,用作this 值，省略。this 为 undefined
array.map(function (currentValue, index, arr) {});
```

## parseInt

解析一个字符串，返回一个指定基数的十进制整数。

- @param string
- @param radix `2-36` 整数，支持进制专用字符，比如十六进制 `0xff` 或 `16`

这意味着，`string` 里面单个数字，必须在 `radix` 范围内，比如 `radix=10` 时候，`string` 不等于 `a`，需要 `radix > 10`。

- `parseInt('a', 10)` ❎
- `parseInt('a', 11)` ✅

```js
// map:
['1', '2', '3'].map(function (value, index) {
  console.info(value, index);
});
//1 0
//2 1
//3 2
//于是，对于map后面加了一个方法parseInt，就相当于
parseInt('1', 0); // 1 此时 radix 0 以 10 位基础
parseInt('2', 1); // NaN radix 为 1，小于 2，NaN
parseInt('3', 2); // NaN radix 为 2，小于 2 不成立，但 2 进制不满足3
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

## 判断对象为空

```js
const b = {};

/* 判断是否是空对象*/
JSON.stringify(b) === '{}';
```

在 `lodash` 中有 `isEmpty` 方法：

```js
function isEmpty(value) {
  if (isArrayLike(value) && (isArray(value) || isString(value) || isFunction(value.splice) || isArguments(value))) {
    return !value.length;
  }
  return !nativeKeys(value).length;
}
```

- 对于 `数字`、`布尔值`、`null`、`undefined`、`NaN`、`''`、`Symbol()` 都是 `true`
- 对于 `空对象`、`空数组`、`空字符串` 时候，返回 `true`
- 对于 `非空对象`、`非空数组` 返回 `false`

## 如何阻止冒泡

```js
e.stopPropagation();
// 旧的 IE
e.cancelButton = true;
```

## firefox 与 IE 的事件机制

IE 事件冒泡
FF 同时支持捕获型事件、冒泡型事件

## js 延迟加载

`defer`、`async`，动态创建 `dom` 方式【最多】，按需异步加载

## ajax 异步传输 (html+js)

## ajax 缓存问题

## 跨域问题

jsonp 利用 script 标签不跨域的方式，让 js 文件发挥 json 格式的文件。

```js
// jsonp 意味着需要信任远程服务器的脚本，否则会炸鸡。
// 请求jsonp
getSome({ say: 'hello' });
```

### `iframe` 跨域

仅适合主主域名相同情况，比如 `http://tieba.baidu.com` 与 `http://music.baidu.com`，此时可以设置他们的 `document.domain` 为 `baidu.com`。

可以直接跨域调用函数、获取 dom 元素等等。

```js
// 在 tieba.baidu,com  页面中，设置 document.domain 为 baidu.com

// tieba.baidu.com 使用了 iframe 套娃 `music.baidu.com` 页面，需要将这个 iframe 页面的 document.domain 设置为 baidu.com

// 现在在 tieba.baidu.com 页面中，获取 music.baidu.com 页面中的 dom 元素 了
const iframe = document.getElementById('musicIframe');
iframe.contentWindow.document.body.innerHTML = 'hello world';

// 或者调用 music.baidu.com 页面中的方法
```

现在的 web 开发中，已不推荐使用此方法。

### `window.name`

利用 `window.name` 这个关键的属性，实现跨域。

- `window.name` 具有持久性特性
- 存储数据大小 `2MB`
- 跳转过程不会被重置，作为中间属性进行存储通信，就跟个蜂巢快递柜一样

现代 web 技术中，已不再推荐使用，适用于老旧浏览器。

### `window.postMessage`

::: code-group

```html [server.html]
<!-- 127.0.0.1:8080 -->
<!DOCTYPE html>
<html>
  <head>
    <title>消息发送页面</title>
  </head>
  <body>
    <h1>消息发送页面</h1>
    <button id="sendButton">发送消息到iframe</button>
    <iframe id="receiverFrame" src="http://127.0.0.1:8081/receiver.html" width="400" height="200"></iframe>
    <div id="response"></div>

    <script>
      document.getElementById('sendButton').addEventListener('click', function () {
        const receiverFrame = document.getElementById('receiverFrame');
        const message = {
          type: 'GREETING',
          data: '你好，来自父页面的问候！',
          timestamp: new Date().toISOString(),
        };

        // 向iframe发送消息，指定目标源以确保安全
        receiverFrame.contentWindow.postMessage(message, 'http://127.0.0.1:8081');
      });

      // 监听来自iframe的响应
      window.addEventListener(
        'message',
        function (event) {
          // 验证消息来源
          if (event.origin !== 'http://127.0.0.1:8081') return;

          document.getElementById('response').innerHTML = `<p>收到来自 ${event.origin} 的响应: ${JSON.stringify(
            event.data
          )}</p>`;
        },
        false
      );
    </script>
  </body>
</html>
```

```html [receiver.html]
<!DOCTYPE html>
<html>
  <head>
    <title>消息接收页面</title>
  </head>
  <body>
    <h1>消息接收页面</h1>
    <div id="messageContainer"></div>

    <script>
      // 监听来自父窗口的消息
      window.addEventListener(
        'message',
        function (event) {
          // 验证消息来源
          if (event.origin !== 'http://127.0.0.1:8080') return;

          const messageContainer = document.getElementById('messageContainer');
          messageContainer.innerHTML = `<p>收到来自 ${event.origin} 的消息: ${JSON.stringify(event.data)}</p>`;

          // 发送响应回父窗口
          const response = {
            status: 'success',
            receivedData: event.data,
            reply: '消息已成功接收！',
          };

          event.source.postMessage(response, event.origin);
        },
        false
      );
    </script>
  </body>
</html>
```

:::

打开 <http://127.0.0.1:8080/server.html> 验证下

### `BoardCastChannel` 跨窗口通信

- 可跨同一个浏览器的不同窗口之间通信，比如开 2 个 Chrome 窗口，分别打开 `server.html` 和 `receiver.html` 页面
- 本质上还是借助浏览器的 IPC 进程中通信实现。
- 可以是本地文件也可以通信，不用开启 HTTP server

::: code-group

```html [server.html]
<!DOCTYPE html>
<html>
  <head>
    <title>消息发送页面</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      input,
      button {
        padding: 8px;
        margin: 5px 0;
      }
      #messages {
        margin-top: 20px;
        padding: 10px;
        border: 1px solid #ddd;
        min-height: 100px;
      }
    </style>
  </head>
  <body>
    <h1>消息发送页面</h1>

    <input type="text" id="messageInput" placeholder="输入消息内容" />
    <button id="sendBtn">发送消息</button>

    <div id="messages">
      <p>发送的消息将显示在这里...</p>
    </div>

    <script>
      // 创建一个名为 'my-broadcast-channel' 的广播频道
      const channel = new BroadcastChannel('my-broadcast-channel');

      // 监听按钮点击事件
      document.getElementById('sendBtn').addEventListener('click', () => {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();

        if (message) {
          // 向频道发送消息
          channel.postMessage({
            type: 'chat-message',
            content: message,
            timestamp: new Date().toISOString(),
          });

          // 在发送端显示已发送的消息
          appendMessage('Sent: ' + message);
          messageInput.value = '';
        }
      });

      // 也监听来自频道的消息（用于双向通信）
      channel.onmessage = (event) => {
        appendMessage('Received: ' + event.data.content);
      };

      // 辅助函数：添加消息到显示区域
      function appendMessage(text) {
        const messagesDiv = document.getElementById('messages');
        const messageElement = document.createElement('p');
        messageElement.textContent = text;
        messagesDiv.appendChild(messageElement);
      }

      // 页面关闭时关闭频道
      window.addEventListener('beforeunload', () => {
        channel.close();
      });
    </script>
  </body>
</html>
```

```html [receiver.html]
<!DOCTYPE html>
<html>
  <head>
    <title>消息接收页面</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      #messages {
        margin-top: 20px;
        padding: 10px;
        border: 1px solid #ddd;
        min-height: 100px;
      }
    </style>
  </head>
  <body>
    <h1>消息接收页面</h1>

    <div id="messages">
      <p>等待接收消息...</p>
    </div>

    <script>
      // 创建相同名称的广播频道以接收消息
      const channel = new BroadcastChannel('my-broadcast-channel');

      // 监听频道消息
      channel.onmessage = (event) => {
        appendMessage(`[${new Date(event.data.timestamp).toLocaleTimeString()}] ${event.data.content}`);

        // 可选：发送确认消息
        if (event.data.type === 'chat-message') {
          console.log('Sending acknowledgment...');
          channel.postMessage({
            type: 'acknowledgment',
            content: event.data.content + '_加个小尾巴~',
            timestamp: new Date().toISOString(),
          });
        }
      };

      // 辅助函数：添加消息到显示区域
      function appendMessage(text) {
        const messagesDiv = document.getElementById('messages');
        const messageElement = document.createElement('p');
        messageElement.textContent = text;
        messagesDiv.appendChild(messageElement);
      }

      // 页面关闭时关闭频道
      window.addEventListener('beforeunload', () => {
        channel.close();
      });
    </script>
  </body>
</html>
```

:::

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
