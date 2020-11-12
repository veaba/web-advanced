---
sidebar: auto
---
# HTTP协议

## 特性
- HTTP 协议是应用层协议，底层基于 TCP 连接
- HTTP 协议规定了浏览器与服务器通信的四个步骤：
	1. 建立连接
	2. 发送请求 
	3. 接收响应
	4. 关闭连接
- HTTP 请求报文中，包括：
	1. 请求方式，如 GET、POST 等
	2. 请求的路径
	3. 协议版本
	4. 消息头等
- HTTP 响应报文中，包括：
	1. 状态码
	2. 状态名
	3. 协议版本
	4. 消息头等


## http

- http 请求与响应
  - request，请求
  > key的一般大写开头，也可以小写，一把大写，基本随开发者喜好。
    - 请求头 header
```js
const json ={
  'Accept':'text/plain,text/html',/*指定客户端能够接受的内容类型，也可以是星号  */
  'Accept-Encoding':'gzip, deflate, br',/*指定浏览器可以支持的web服务器返回内容压缩编码类型。*/
  'Accept-Language':'en,zh',/*语言*/
  'Authorization':'Basic xxxx',/*HTTP授权的证书*/
  'Cache-control':'no-cache',/*指定请求和响应遵从的缓存机制*/ 
  'Content-Type':'text/html',
  'Connection':'close',/*是否是持久链接，http1.1默认持久:Keep-Alive*/
  'Content-Length':233,
  'Date':'Tue, 18 Sep 2018 11:05:26 GMT',
  'access-control-allow-origin':'*',/*允许所有域名的脚本访问该资源,保护静态资源么*/
  'Status':200,
  'Cookie':'xx',
  'Host':'www.baidu.com',
  'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36'/*浏览器特征编码*/
}
```
    - 请求体
  - response，响应
    - 响应头 header
```js
const json ={
  'Age':12,//原始服务器到代理缓存形成的估算时间
  'Content-Type':'text/html;charts=utf-8',
  'Cache-Control':'no-cache',/*告诉素有的缓存机制是否可以缓存以及哪种类型*/
  'Content-Languge':'en,zh',
  'Content-Length':2121,/*响应体的长度*/
  'Date':'Tue, 18 Sep 2018 11:05:26 GMT',
  'Expires':'Thu, 01 Dec 2010 16:00:00 GMT'/*响应过期的时间*/,
  'Last-modified':'Thu, 01 Dec 2010 16:00:00 GMT',/*请求资源的最后修改时间*/
  'Server':'IIS/Nginx/Tengine',
  'Set-cookie':'xxxxx设置Cookie'
}
```
- http状态码
>@参考 https://www.jianshu.com/p/760b1b579b0f
  - 1xx 临时响应
    - 100 webSocket 请继续
  - 2xx 成功
    - 200 已成功
    - 201 请求成功，服务器创建了新的资源
    - 202 已接受，服务器已接受，但尚未处理
    - 203 非授权，返回的信息可能来自另一个来源
    - 204 无内容，处理了请求但没有返回任何内容
  - 3xx 重定向
    - 300
    - 301 永久重定向，发生在访问`http://www.baidu.com`时重定向到443端口的`https://www.baidu.com`,可以访问下http://www.baidu.com，看下请求资源情况
    - 302 临时重定向
    - 303
    - 304 未修改，自从上次请求后，网页未修改过。chrome允许缓存就大部分都是304
    - 305
    - 306
    - 307 内部重定向?Internal Redirect
  - 4xx 客户端
    - 400 错误请求
    - 401 未授权，请求要求身份验证，对于需要登录的网页服务器可能返回此响应
    - 402 
    - 403 禁止，服务器拒绝请求 forbidden
    - 404 找不到，服务器未找到网页，网页丢失，not found
  
  - 5xx 服务端
    - 500 服务器内部错误，服务器遇到错误，无法处理
    - 501 无法识别，尚未实施，比如无法处理请求方法
    - 502 错误网关，网关错误，服务器作为网关从上游服务器收到无效响应
    - 503 服务不可用，停机维护，指暂停状态。
    - 504 网关超时
    - 505 HTTP版本不受支持，不支持请求所用的HTTP版本

>一份来自node 的http响应代码 
```js

const http= require('http');
console.log(http.STATUS_CODES);
const httpCode= {
	'100': 'Continue',
	'101': 'Switching Protocols',
	'102': 'Processing',
	'103': 'Early Hints',
	'200': 'OK',
	'201': 'Created',
	'202': 'Accepted',
	'203': 'Non-Authoritative Information',
	'204': 'No Content',
	'205': 'Reset Content',
	'206': 'Partial Content',
	'207': 'Multi-Status',
	'208': 'Already Reported',
	'226': 'IM Used',
	'300': 'Multiple Choices',
	'301': 'Moved Permanently',
	'302': 'Found',
	'303': 'See Other',
	'304': 'Not Modified',
	'305': 'Use Proxy',
	'307': 'Temporary Redirect',
	'308': 'Permanent Redirect',
	'400': 'Bad Request',
	'401': 'Unauthorized',
	'402': 'Payment Required',
	'403': 'Forbidden',
	'404': 'Not Found',
	'405': 'Method Not Allowed',
	'406': 'Not Acceptable',
	'407': 'Proxy Authentication Required',
	'408': 'Request Timeout',
	'409': 'Conflict',
	'410': 'Gone',
	'411': 'Length Required',
	'412': 'Precondition Failed',
	'413': 'Payload Too Large',
	'414': 'URI Too Long',
	'415': 'Unsupported Media Type',
	'416': 'Range Not Satisfiable',
	'417': 'Expectation Failed',
	'418': 'I\'m a Teapot',
	'421': 'Misdirected Request',
	'422': 'Unprocessable Entity',
	'423': 'Locked',
	'424': 'Failed Dependency',
	'425': 'Unordered Collection',
	'426': 'Upgrade Required',
	'428': 'Precondition Required',
	'429': 'Too Many Requests',
	'431': 'Request Header Fields Too Large',
	'451': 'Unavailable For Legal Reasons',
	'500': 'Internal Server Error',
	'501': 'Not Implemented',
	'502': 'Bad Gateway',
	'503': 'Service Unavailable',
	'504': 'Gateway Timeout',
	'505': 'HTTP Version Not Supported',
	'506': 'Variant Also Negotiates',
	'507': 'Insufficient Storage',
	'508': 'Loop Detected',
	'509': 'Bandwidth Limit Exceeded',
	'510': 'Not Extended',
	'511': 'Network Authentication Required' 
  }
```    
## REST API 和客户端库的区别
`来源于一项API服务对比的页面，`

|用例|REST API|客户端库|
|---|---|---|
转换短语音音频，例如无中间结果的命令（音频长度 < 15 秒）|是|是
转换长音频（> 15 秒）|否|是
流式传输具有所需中间结果的音频|否|是
了解使用 LUIS 从音频转换的文本|是|是
是不是HTTP|是|不一定，比如WebSocket


## https 

## http和https 的比较
