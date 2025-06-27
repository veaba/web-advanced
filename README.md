> 进阶 web 高级前端知识体系：来自个人的面试经历、学习笔记、参考大神们的 blog，以及常见面试题！不代表内容的正确性！！！！有一部分还在带着问号！以下内容是随手记下的笔记，还在学习..。 by@veaba

---

![web-advanced-frond-end CI](https://github.com/veaba/web-advanced-frond-end/workflows/web-advanced-frond-end%20CI/badge.svg)

使用 Vuepress 重新构建静态网站，舒爽体验阅读，请访问：https://web.veaba.me

部分内容尚未补充完成！！

## todo 翻译工具

- [开发工具，同步官方数据-todo]()
  - https://nodejs.org/dist/latest-v14.x/docs/api/documentation.json 一些 api
  - 自动生成 node 最新版文档目录
  - copy 一份后，自动翻译
  - 参考以前的 Tensorflow-docs 项目
  - 使用 vuepress 自带的在本页面生成目录在文章前面
  - 扫描未翻译的段落、同步更新请求操作

## 目录指南

- [指南](https://web.veaba.me/guide/)
- [Node](https://web.veaba.me/node/)
- [V8](https://web.veaba.me/v8/)
- [Canvas](/canvas/)
- [Css](https://web.veaba.me/css/)
- [Es6](https://web.veaba.me/es6/)
  - [Proxy](https://web.veaba.me/es6/proxy/)
- [Highlight](https://web.veaba.me/highlight/)
- [HTML](https://web.veaba.me/html/)

  - [HTML5](https://web.veaba.me/html/html5/)

- [HTTP](https://web.veaba.me/http/)
  - [http](https://web.veaba.me/http/)
  - [http2](https://web.veaba.me/http2/)
  - [http3](https://web.veaba.me/http3/)
- [面试](https://web.veaba.me/interview/)
  - [2018 年阿里资深 web 前端面试题](https://web.veaba.me/interview/2018alibaba-senior-web/)
  - [2018 年网易高级 web 前端面试题](https://web.veaba.me/interview/2018netease-high-web/)
  - [2018 年中级/高级 web 前端面试题](https://web.veaba.meinterview/interview/2018other-mid-high-web/)
  - [2018 年 8 月 15 日面试题](https://web.veaba.me/interview2018-8-15-interview-web/)
  - [2018 年 8 月 17 日面试题](https://web.veaba.me/interview/2018-8-17-interview-web/)
  - [2018 年 8 月 31 日面试题](https://web.veaba.me/interview/2018-8-31-interview-web/)
  - [2018 年 9 月 11 日面试题](https://web.veaba.me/interview/2018-9-11-interview-web/)
  - [2018 年 9 月 18 日面试题](https://web.veaba.me/interview/2018-9-18-interview-web/)
  - [2018 年 9 月 19 日面试题](https://web.veaba.me/interview/2018-9-19-interview-web/)
  - [2018 年 12 月份面试题](https://web.veaba.me/interview/2018-12-interview-web/)
  - [2020 年 4 月 upyun 高级前端面试](https://web.veaba.me/interview/2020-upyun-interview-web)
  - [2020 年 4 月阿里巴巴前端专家面试题](https://web.veaba.me/interview/2020-alibaba-interview-web/)
- [JavaScript](https://web.veaba.me/javascript/)
  - [**proto**](https://web.veaba.me/javascript/__proto__/)
  - [Prototype](https://web.veaba.me/javascript/prototype/)
  - [基础](https://web.veaba.me/javascript/base/)
  - [DOM](https://web.veaba.me/javascript/dom/)
  - [BOM](https://web.veaba.me/javascript/bom/)
  - [event](https://web.veaba.me/javascript/event/)
  - [继承](https://web.veaba.me/javascript/inherit/)
  - [常用 API](https://web.veaba.me/javascript/common-use-api/)
  - [设计模式](https://web.veaba.me/javascript/design-mode/)
- [Nginx](https://web.veaba.me/nginx/)
  - [Proxy](https://web.veaba.me/nginx/proxy/)
  - [Confit](https://web.veaba.me/nginx/proxy/)
- [Nuxt](https://web.veaba.me/nuxt/)
- [性能](https://web.veaba.me/performance/)
- [流行常见前端面试技术题](https://web.veaba.me/pop/)
- [PWA](https://web.veaba.me/pwa/)
- [Web 安全性问题](https://web.veaba.me/security/)
- [业务技巧相关](https://web.veaba.me/skill/)
- [TypeScript](https://web.veaba.me/typescript/)
- [WebGL](https://web.veaba.me/webgl/)
- [Webpack](https://web.veaba.me/webpack/)
- [Vue](https://web.veaba.me/vue/)
  - [Vue2](https://web.veaba.me/vue/vue2/)
  - [Vue3](https://web.veaba.me/vue/vue3/)
  - [解析 Vue.js 文件](https://web.veaba.me/vue/parser-vue/)
  - [Vue2-api](https://web.veaba.me/vue/vue2-api/)
- [引用](https://web.veaba.me/reference/)
- [关于](https://web.veaba.me/about/)
- [自我驱动](https://web.veaba.me/self/)

## TODO

- 如何修改支持 `README.md => index.md`

### 使用 patch-package 生成补丁文件

- 以支持 `README.md => index.md`

```shell
npm install --package-lock-only # 如果没有则需要生成 lock 文件
pnpx patch-package vitepress # 不然这一步会失败

```
