## 跨域问题

> <https://segmentfault.com/a/1190000011145364>

- JSONP 跨域
  - **缺点：只支持 get、不支持 post**
  - 传递函数名
- document.domain
  > 引入 iframe 时候，无法使用 js 交互操作
  - 使用 document.domain 将主页面和子页面都设置为相同的域名就可以了
  - **缺点：设置成自身或更高一级的父级，且主域必须相同**
  - 原因：
- postMessage 跨文档通信 API，跨窗口通信
- window.name 进行跨域
- 跨资源共享 (CORS)
  - > IE10
  - 依赖服务端改造 header
- nginx 代理跨域
- nodejs 中间件代理跨域
- websocket 协议跨域
  >
