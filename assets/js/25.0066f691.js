(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{434:function(t,s,r){"use strict";r.r(s);var a=r(62),p=Object(a.a)({},(function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"http协议"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#http协议"}},[t._v("#")]),t._v(" HTTP协议")]),t._v(" "),r("h2",{attrs:{id:"特性"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#特性"}},[t._v("#")]),t._v(" 特性")]),t._v(" "),r("ul",[r("li",[t._v("HTTP 协议是应用层协议，底层基于 TCP 连接")]),t._v(" "),r("li",[t._v("HTTP 协议规定了浏览器与服务器通信的四个步骤：\n"),r("ol",[r("li",[t._v("建立连接")]),t._v(" "),r("li",[t._v("发送请求")]),t._v(" "),r("li",[t._v("接收响应")]),t._v(" "),r("li",[t._v("关闭连接")])])]),t._v(" "),r("li",[t._v("HTTP 请求报文中，包括：\n"),r("ol",[r("li",[t._v("请求方式，如 GET、POST 等")]),t._v(" "),r("li",[t._v("请求的路径")]),t._v(" "),r("li",[t._v("协议版本")]),t._v(" "),r("li",[t._v("消息头等")])])]),t._v(" "),r("li",[t._v("HTTP 响应报文中，包括：\n"),r("ol",[r("li",[t._v("状态码")]),t._v(" "),r("li",[t._v("状态名")]),t._v(" "),r("li",[t._v("协议版本")]),t._v(" "),r("li",[t._v("消息头等")])])])]),t._v(" "),r("h2",{attrs:{id:"http"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#http"}},[t._v("#")]),t._v(" http")]),t._v(" "),r("ul",[r("li",[r("p",[t._v("HTTP1.1 有个问题叫线端阻塞(head-of-line blocking)")]),t._v(" "),r("ul",[r("li",[t._v("一个连接一次只提交一个请求的效率比较高，多了就慢")])])]),t._v(" "),r("li",[r("p",[t._v("http 请求与响应")]),t._v(" "),r("ul",[r("li",[t._v("request，请求")])]),t._v(" "),r("blockquote",[r("p",[t._v("key的一般大写开头，也可以小写，一把大写，基本随开发者喜好。")])]),t._v(" "),r("ul",[r("li",[t._v("请求头 header")])])])]),t._v(" "),r("div",{staticClass:"language-js extra-class"},[r("pre",{pre:!0,attrs:{class:"language-js"}},[r("code",[r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" json "),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Accept'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'text/plain,text/html'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*指定客户端能够接受的内容类型，也可以是星号  */")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Accept-Encoding'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'gzip, deflate, br'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*指定浏览器可以支持的web服务器返回内容压缩编码类型。*/")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Accept-Language'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'en,zh'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*语言*/")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Authorization'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Basic xxxx'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*HTTP授权的证书*/")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Cache-control'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'no-cache'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*指定请求和响应遵从的缓存机制*/")]),t._v(" \n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Content-Type'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'text/html'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Connection'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'close'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*是否是持久链接，http1.1默认持久:Keep-Alive*/")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Content-Length'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token number"}},[t._v("233")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Date'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Tue, 18 Sep 2018 11:05:26 GMT'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'access-control-allow-origin'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'*'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*允许所有域名的脚本访问该资源,保护静态资源么*/")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Status'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Cookie'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'xx'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Host'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'www.baidu.com'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'User-Agent'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36'")]),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*浏览器特征编码*/")]),t._v("\n"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),r("div",{staticClass:"language- extra-class"},[r("pre",[r("code",[t._v("- 请求体\n")])])]),r("ul",[r("li",[t._v("response，响应\n"),r("ul",[r("li",[t._v("响应头 header")])])])]),t._v(" "),r("div",{staticClass:"language-js extra-class"},[r("pre",{pre:!0,attrs:{class:"language-js"}},[r("code",[r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" json "),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Age'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token number"}},[t._v("12")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//原始服务器到代理缓存形成的估算时间")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Content-Type'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'text/html;charts=utf-8'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Cache-Control'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'no-cache'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*告诉素有的缓存机制是否可以缓存以及哪种类型*/")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Content-Languge'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'en,zh'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Content-Length'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token number"}},[t._v("2121")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*响应体的长度*/")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Date'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Tue, 18 Sep 2018 11:05:26 GMT'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Expires'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Thu, 01 Dec 2010 16:00:00 GMT'")]),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*响应过期的时间*/")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Last-modified'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Thu, 01 Dec 2010 16:00:00 GMT'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*请求资源的最后修改时间*/")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Server'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'IIS/Nginx/Tengine'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Set-cookie'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'xxxxx设置Cookie'")]),t._v("\n"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),r("ul",[r("li",[t._v("http状态码")])]),t._v(" "),r("blockquote",[r("p",[t._v("@参考 https://www.jianshu.com/p/760b1b579b0f")])]),t._v(" "),r("ul",[r("li",[r("p",[t._v("1xx 临时响应")]),t._v(" "),r("ul",[r("li",[t._v("100 webSocket 请继续")])])]),t._v(" "),r("li",[r("p",[t._v("2xx 成功")]),t._v(" "),r("ul",[r("li",[t._v("200 已成功")]),t._v(" "),r("li",[t._v("201 请求成功，服务器创建了新的资源")]),t._v(" "),r("li",[t._v("202 已接受，服务器已接受，但尚未处理")]),t._v(" "),r("li",[t._v("203 非授权，返回的信息可能来自另一个来源")]),t._v(" "),r("li",[t._v("204 无内容，处理了请求但没有返回任何内容")])])]),t._v(" "),r("li",[r("p",[t._v("3xx 重定向")]),t._v(" "),r("ul",[r("li",[t._v("300")]),t._v(" "),r("li",[t._v("301 永久重定向，发生在访问"),r("code",[t._v("http://www.baidu.com")]),t._v("时重定向到443端口的"),r("code",[t._v("https://www.baidu.com")]),t._v(",可以访问下http://www.baidu.com，看下请求资源情况")]),t._v(" "),r("li",[t._v("302 临时重定向")]),t._v(" "),r("li",[t._v("303")]),t._v(" "),r("li",[t._v("304 未修改，自从上次请求后，网页未修改过。chrome允许缓存就大部分都是304")]),t._v(" "),r("li",[t._v("305")]),t._v(" "),r("li",[t._v("306")]),t._v(" "),r("li",[t._v("307 内部重定向?Internal Redirect")])])]),t._v(" "),r("li",[r("p",[t._v("4xx 客户端")]),t._v(" "),r("ul",[r("li",[t._v("400 错误请求")]),t._v(" "),r("li",[t._v("401 未授权，请求要求身份验证，对于需要登录的网页服务器可能返回此响应")]),t._v(" "),r("li",[t._v("402")]),t._v(" "),r("li",[t._v("403 禁止，服务器拒绝请求 forbidden")]),t._v(" "),r("li",[t._v("404 找不到，服务器未找到网页，网页丢失，not found")])])]),t._v(" "),r("li",[r("p",[t._v("5xx 服务端")]),t._v(" "),r("ul",[r("li",[t._v("500 服务器内部错误，服务器遇到错误，无法处理")]),t._v(" "),r("li",[t._v("501 无法识别，尚未实施，比如无法处理请求方法")]),t._v(" "),r("li",[t._v("502 错误网关，网关错误，服务器作为网关从上游服务器收到无效响应")]),t._v(" "),r("li",[t._v("503 服务不可用，停机维护，指暂停状态。")]),t._v(" "),r("li",[t._v("504 网关超时")]),t._v(" "),r("li",[t._v("505 HTTP版本不受支持，不支持请求所用的HTTP版本")])])])]),t._v(" "),r("blockquote",[r("p",[t._v("一份来自node 的http响应代码")])]),t._v(" "),r("div",{staticClass:"language-js extra-class"},[r("pre",{pre:!0,attrs:{class:"language-js"}},[r("code",[t._v("\n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" http"),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),r("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("http"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),r("span",{pre:!0,attrs:{class:"token constant"}},[t._v("STATUS_CODES")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" httpCode"),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'100'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Continue'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'101'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Switching Protocols'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'102'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Processing'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'103'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Early Hints'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'200'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'OK'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'201'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Created'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'202'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Accepted'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'203'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Non-Authoritative Information'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'204'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'No Content'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'205'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Reset Content'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'206'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Partial Content'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'207'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Multi-Status'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'208'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Already Reported'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'226'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'IM Used'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'300'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Multiple Choices'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'301'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Moved Permanently'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'302'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Found'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'303'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'See Other'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'304'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Not Modified'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'305'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Use Proxy'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'307'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Temporary Redirect'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'308'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Permanent Redirect'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'400'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Bad Request'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'401'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Unauthorized'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'402'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Payment Required'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'403'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Forbidden'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'404'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Not Found'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'405'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Method Not Allowed'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'406'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Not Acceptable'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'407'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Proxy Authentication Required'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'408'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Request Timeout'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'409'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Conflict'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'410'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Gone'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'411'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Length Required'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'412'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Precondition Failed'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'413'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Payload Too Large'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'414'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'URI Too Long'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'415'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Unsupported Media Type'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'416'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Range Not Satisfiable'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'417'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Expectation Failed'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'418'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'I\\'m a Teapot'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'421'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Misdirected Request'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'422'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Unprocessable Entity'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'423'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Locked'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'424'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Failed Dependency'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'425'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Unordered Collection'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'426'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Upgrade Required'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'428'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Precondition Required'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'429'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Too Many Requests'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'431'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Request Header Fields Too Large'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'451'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Unavailable For Legal Reasons'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'500'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Internal Server Error'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'501'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Not Implemented'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'502'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Bad Gateway'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'503'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Service Unavailable'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'504'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Gateway Timeout'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'505'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'HTTP Version Not Supported'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'506'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Variant Also Negotiates'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'507'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Insufficient Storage'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'508'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Loop Detected'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'509'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Bandwidth Limit Exceeded'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'510'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Not Extended'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),r("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'511'")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Network Authentication Required'")]),t._v(" \n  "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),r("h2",{attrs:{id:"rest-api-和客户端库的区别"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#rest-api-和客户端库的区别"}},[t._v("#")]),t._v(" REST API 和客户端库的区别")]),t._v(" "),r("p",[r("code",[t._v("来源于一项API服务对比的页面，")])]),t._v(" "),r("table",[r("thead",[r("tr",[r("th",[t._v("用例")]),t._v(" "),r("th",[t._v("REST API")]),t._v(" "),r("th",[t._v("客户端库")])])]),t._v(" "),r("tbody",[r("tr",[r("td",[t._v("转换短语音音频，例如无中间结果的命令（音频长度 < 15 秒）")]),t._v(" "),r("td",[t._v("是")]),t._v(" "),r("td",[t._v("是")])]),t._v(" "),r("tr",[r("td",[t._v("转换长音频（> 15 秒）")]),t._v(" "),r("td",[t._v("否")]),t._v(" "),r("td",[t._v("是")])]),t._v(" "),r("tr",[r("td",[t._v("流式传输具有所需中间结果的音频")]),t._v(" "),r("td",[t._v("否")]),t._v(" "),r("td",[t._v("是")])]),t._v(" "),r("tr",[r("td",[t._v("了解使用 LUIS 从音频转换的文本")]),t._v(" "),r("td",[t._v("是")]),t._v(" "),r("td",[t._v("是")])]),t._v(" "),r("tr",[r("td",[t._v("是不是HTTP")]),t._v(" "),r("td",[t._v("是")]),t._v(" "),r("td",[t._v("不一定，比如WebSocket")])])])]),t._v(" "),r("h2",{attrs:{id:"https"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#https"}},[t._v("#")]),t._v(" https")]),t._v(" "),r("h2",{attrs:{id:"http-和-https-的比较"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#http-和-https-的比较"}},[t._v("#")]),t._v(" http 和 https 的比较")]),t._v(" "),r("h2",{attrs:{id:"http2-0"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#http2-0"}},[t._v("#")]),t._v(" HTTP2.0")]),t._v(" "),r("ul",[r("li",[t._v("多路传输能够解决线端阻塞问题")])]),t._v(" "),r("h2",{attrs:{id:"http1-1-和-http2-0-比较"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#http1-1-和-http2-0-比较"}},[t._v("#")]),t._v(" HTTP1.1 和 HTTP2.0 比较")]),t._v(" "),r("ol",[r("li",[r("p",[t._v("HTTP2.0 采用二进制格式，而非文本格式")]),t._v(" "),r("ul",[r("li",[t._v("二进制解析更高效")])])]),t._v(" "),r("li",[r("p",[t._v("HTTP2.0 "),r("code",[t._v("完全多路复用")]),t._v("，而非有序并阻塞，仅需一个连接即可并行")]),t._v(" "),r("ul",[r("li",[r("code",[t._v("多路复用是什么意思？")])])])]),t._v(" "),r("li",[r("p",[t._v("使用报头压缩，HTTP2.0 降低了开销")])]),t._v(" "),r("li",[r("p",[t._v("HTTP2.0 让服务器可以将响应主动 “推送” 到客户端缓存中")])])]),t._v(" "),r("h2",{attrs:{id:"spdy"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#spdy"}},[t._v("#")]),t._v(" SPDY")]),t._v(" "),r("p",[t._v("https://blog.csdn.net/qq_41635167/article/details/89484445")]),t._v(" "),r("p",[t._v("https://zhuanlan.zhihu.com/p/50479555")])])}),[],!1,null,null,null);s.default=p.exports}}]);